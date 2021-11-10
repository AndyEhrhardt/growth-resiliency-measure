import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function StartAssessment() {
    const {randomString} = useParams();
    const dispatch = useDispatch();
    console.log(randomString);
    const putVerifyUser = () => {
        dispatch({type: 'GET_START_ASSESSMENT', payload: randomString});
    }

    useEffect(() => {
        putVerifyUser();
    }, []);
    // page accessed from email click
    // student view/edit demographics
    return (
        <>

        </>
    );
}

export default StartAssessment;