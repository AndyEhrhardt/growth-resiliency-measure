import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AssessmentFormPage from "../AssessmentFormPage/AssessmentFormPage";
import DemographicsModal from '../DemographicsModal/DemographicsModal';
import './StartAssessment';

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
            <div className="assessment-Body">
                {/* JSON.stringify(userStore) */}
                {userStore.first_name ? <DemographicsModal userStore={userStore}/> : 'Loading'}
                {userStore.first_name ? <AssessmentFormPage userStore={userStore}/> : 'Loading'}
            </div>
        </>
    );
}

export default StartAssessment;