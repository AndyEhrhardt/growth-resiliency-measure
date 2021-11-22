import { makeStyles } from '@material-ui/core/styles';

const AssessmentFormPageStyles = makeStyles(() => ({
    formWrap: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zoom: '150%'
    },
    submitButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '2px solid blue',
    }
}));

export default AssessmentFormPageStyles;