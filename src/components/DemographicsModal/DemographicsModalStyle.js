import { makeStyles } from '@material-ui/core/styles';

const demographicsModalStyles = makeStyles(() => ({
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
    formControl: {
        backgroundColor: 'white',
        p: 4,
        height: 380,
        width: 800,
        padding: 15,
    }
}));


export default demographicsModalStyles;