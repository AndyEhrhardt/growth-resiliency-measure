import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AssessmentFormPage from "../AssessmentFormPage/AssessmentFormPage";
import userReducer from "../../redux/reducers/user.reducer";

function StartAssessment() {
    const {randomString} = useParams();
    const dispatch = useDispatch();
    console.log(randomString);
    const putVerifyUser = () => {
        dispatch({type: 'GET_START_ASSESSMENT', payload: randomString});
    }
    const userStore = useSelector(state => state.user);

    useEffect(() => {
        putVerifyUser();
    }, []);
    // page accessed from email click
    // student view/edit demographics
    return (
        <>
            <AssessmentFormPage userStore={userStore}/>
        </>
    );
}

export default StartAssessment;