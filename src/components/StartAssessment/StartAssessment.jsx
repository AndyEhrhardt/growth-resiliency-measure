import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AssessmentFormPage from "../AssessmentFormPage/AssessmentFormPage";

function StartAssessment() {
    const {randomString} = useParams();
    const dispatch = useDispatch();
    console.log(randomString);
    const putVerifyUser = () => {
        dispatch({type: 'GET_START_ASSESSMENT', payload: randomString});
    }
    const userStore = useSelector(store => store.assessmentUser);

    useEffect(() => {
        putVerifyUser();
    }, []);
    // page accessed from email click
    // student view/edit demographics
    return (
        <>
            {userStore.first_name ? <AssessmentFormPage userStore={userStore}/> : 'Loading'}
        </>
    );
}

export default StartAssessment;