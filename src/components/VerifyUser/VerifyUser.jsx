import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function VerifyUser() {
    const {randomString} = useParams();
    const dispatch = useDispatch();

    const putVerifyUser = () => {
        dispatch({type: 'PUT_VERIFY_USER', payload: randomString});
    }

    useEffect(() => {
        putVerifyUser();
    }, []);

    return(
        <>
        <h1>{randomString}</h1>
        </>
    );
}

export default VerifyUser;