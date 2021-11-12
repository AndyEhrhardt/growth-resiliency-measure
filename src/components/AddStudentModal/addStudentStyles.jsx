import { makeStyles } from '@material-ui/core/styles';

const addStudentStyles = makeStyles(() => ({
    masterWrap:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColo: 'red',
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
        height: '47%',
        minWidth: 350,
        maxWidth: 500,
        maxHeight: 400,
        minHeight: 340,
        padding: 15,
    }
}));


export default addStudentStyles;