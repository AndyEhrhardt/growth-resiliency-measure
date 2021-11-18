import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import RequestingAccess from './RequestingAccess';



function ManageAccess() {
    // accept or reject access request
    // change user roles
    // const [open, setOpen] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const store = useSelector(store => store.manageAccess);
   
    console.log(store[0]);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_HAS_ACCESS' });
        dispatch({ type: 'FETCH_REQUESTING_AND_HAS_ACCESS' });
     
        
    }, [])
    
    return (
        <div className="manage_access">
            <RequestingAccess store= {store}/>
        </div>
    );
}

export default ManageAccess;