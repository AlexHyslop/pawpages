import { useState, useEffect } from 'react';
import React, { createContext } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { USER_SERVICE } from './services/user.service';
import { ITEM_SERVICE } from './services/item.service';
import { useDispatch, useSelector } from 'react-redux' 
import userAction from './store/actions/user.action';
import stateAction from './store/actions/state.action';
 
const AuthContext = createContext();

function AuthProvider(props) {
    const [authed, setAuthed] = React.useState(false);
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const dispatch = useDispatch();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      console.log('called authstate changed:', user);
        if (user) {
            const userEmail = user.email;
            console.log('User email:', userEmail);
            USER_SERVICE.getUserDocByEmail(userEmail, onGetUserDoc);
            updateUserConfig(user);
        } else {
            console.log('No user is signed in.');
        }
    });

    function updateUserConfig(user) {
        console.log('refresh config dashboard:', user);
        var user2 = user;
        dispatch(userAction.updateUser({ authed: true, config: user2 }));
        USER_SERVICE.checkUserDocExistsOnUserId(user2, onCheckUserDocExists);
    }

    const onCheckUserDocExists = (response, user) => {
        if (response) {
          if (response.size == 0) {
            USER_SERVICE.createUserDoc(user, onCreateUser);
          } else {
            response.forEach((doc) => {
              var docData = doc.data();
              console.log("dispatching user doc dashboard");
              dispatch(userAction.updateUser({ doc: docData }));
            })
          }
        }
      }
    
      const onCreateUser = (response) => {
        if (response) {
          var docData = response.data();
          dispatch(userAction.updateUser({ doc: docData }));
        }
      }

      
    const onGetUserDoc = (response) => {
        var docData = response.docs[0].data(); 
        console.log("userDoc dispatc dashboard, ", docData);
        ITEM_SERVICE.getItemsByUserId(docData.id, onGetItems); 
        dispatch(userAction.updateUser({doc:docData}));   
    }


    const onGetItems = (response) => {
        if(response && response.length > 0){
            var newItems = [];
            for(var i=0; i< response.length; i++){
              newItems.push(response[i].data());
            }
            console.log("refresh auth items", newItems); 
            dispatch(stateAction.updateState({ items: newItems }));
          
        }
    }

    const login = (token, user) => {
        setAuthed(true);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        console.log("logout authprovider");
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