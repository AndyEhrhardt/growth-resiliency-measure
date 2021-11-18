import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
    const [demoPosted, setDemoPosted] = useState(false);

    useEffect(() => {
        putVerifyUser();
    }, []);
    // page accessed from email click
    // student view/edit demographics
    return (
        <>
            <div className="assessment-Body">
                {JSON.stringify(userStore)}
                {(userStore.first_name && !demoPosted) ? <DemographicsModal demoPosted={demoPosted} setDemoPosted={setDemoPosted} userStore={userStore}/> : ''}
                {(userStore.first_name && demoPosted) ? <AssessmentFormPage userStore={userStore}/> : ''}
            </div>
        </>
    );
}

export default StartAssessment;