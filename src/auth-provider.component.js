import { useState, useEffect } from 'react';
import React, { createContext } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { USER_SERVICE } from './services/user.service';
import { useDispatch } from 'react-redux';
import userAction from './store/actions/user.action';

const AuthContext = createContext();

function AuthProvider(props) {
    const [authed, setAuthed] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const auth = getAuth();
    const [authStateChangedInProgress, setAuthStateChangedInProgress] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!authStateChangedInProgress && user) {
                setAuthStateChangedInProgress(true);
                const userEmail = user.email;
                console.log('User email:', userEmail);
                USER_SERVICE.getUserDocByEmail(userEmail, onGetUserDoc);
                updateUserConfig(user);
            }
        });

        return () => unsubscribe();
    }, [auth, authStateChangedInProgress]);

    function updateUserConfig(user) {
        console.log('Refresh config dashboard:', user);
        dispatch(userAction.updateUser({ authed: true, config: user }));
        USER_SERVICE.checkUserDocExistsOnUserId(user, onCheckUserDocExists);
    }

    const onCheckUserDocExists = (response, user) => {
        if (response) {
            if (response.size === 0) {
                // Uncomment if user creation is necessary
                // USER_SERVICE.createUserDoc(user, onCreateUser);
            } else {
                response.forEach((doc) => {
                    const docData = doc.data();
                    console.log("Dispatching user doc dashboard");
                    dispatch(userAction.updateUser({ doc: docData }));
                });
            }
        }
    };

    const onCreateUser = (response) => {
        if (response) {
            const docData = response.data();
            dispatch(userAction.updateUser({ doc: docData }));
        }
    };

    const onGetUserDoc = (response) => {
        if (response && response.docs) {
            const docData = response.docs[0].data();
            console.log("User doc dispatch dashboard, ", docData);
            // Removed ITEM_SERVICE functionality
            dispatch(userAction.updateUser({ doc: docData }));
        }
    };

    const login = (token, user) => {
        setAuthed(true);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        console.log("Logout auth provider");
        setAuthed(false);
        setToken(null);
    };

    const value = {
        authed,
        token,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
