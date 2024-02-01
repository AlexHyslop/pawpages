import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import stateAction from "../store/actions/state.action"; 
import userAction from "../store/actions/user.action";
import '../sass/utilities.scss';
import '../sass/components/button.scss';
import '../sass/components/text-input.scss';
import '../sass/components/dashboard.scss';
import '../sass/components/card.scss'; 

export default function Dashboard(props) { 
    const userDoc = useSelector((state) => state.user.doc);
    const uid = useSelector((state) => state.user.config?.uid); // Use optional chaining to prevent errors
    const redirect = useSelector((state) => state.state.routeFromLogin);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        document.body.style.backgroundColor = '#E9F5F1';
        dispatch(stateAction.updateState({currentFormTitle: "Dashboard"})); 
        ITEM_SERVICE.getItemsByUserId(uid, onGetItems);
        if(redirect){
            navigate(redirect);
        } 
    }, []);
 
    const onGetItems = (response) => {
        if(response && response.length > 0){
            var items = [];
            for(var i=0; i< response.length; i++){
                items.push(response[i].data());
            }
            setItems(items); 
        }
    } 

    function toAccountSettings(){
        navigate("/account");
    } 
     
    return (
    <div className='container' style={{minHeight: '75vh'}}>
        <h2 style={{textAlign:'center'}}>Hi {userDoc ? userDoc.fullName : ""} </h2>
        <p style={{textAlign:'center', paddingLeft:'2rem', paddingRight:'2rem'}}>
            Here you can manage your items, activate new tags, 
            change their status and update your contact details.
        </p>
        <div style={{marginBottom:'3rem', display:'flex', justifyContent:'center'}}> 
            <button className="button" style={{marginRight:'5%'}} onClick={(e) => toActivateTag()}> 
                Activate a Tag
            </button>
            <button className="button" onClick={(e) => toAccountSettings()}> Account Settings</button>
      </div> 
       
     </div>
    );

}
