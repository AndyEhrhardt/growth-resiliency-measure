import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function ManageAccess() {
    // accept or reject access request
    // change user roles
    // const [userRole, setUserRole] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    const store = useSelector(store => store.manageAccess);

    useEffect(() =>{
        dispatch({type: 'FETCH_HAS_ACCESS'})
    },[])

    return (
       <div className="manage_access">
           {JSON.stringify(store)}
           {store.map(user =>(
               <div className="users_has_access" key={user}></div>
           ))}
           
           
       </div>
    );
}

export default ManageAccess;