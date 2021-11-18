import { makeStyles } from '@material-ui/core/styles';

const sendAssessmentStyles = makeStyles(() => ({
    masterWrap:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    splitInputWrap: {
        minWidth: '44%',
        maxWidth: '50%',
    },
    innerModalWrap: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        backgroundColor: 'white',
        p: 4,
        height: 150,
        width: 300,
        padding: 15,
    }
}));


export default sendAssessmentStyles;