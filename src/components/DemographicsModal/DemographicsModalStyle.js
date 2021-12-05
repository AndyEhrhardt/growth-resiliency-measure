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
    splitInputWrap2: {
        minWidth: '44%',
        maxWidth: '50%',
        paddingTop: '2.25em'
    },
    formControl: {
        backgroundColor: 'white',
        p: 4,
        height: 380,
        width: 800,
        padding: 15,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    demoContainer: {
        display: 'block',
        zoom: '125%'
    }
}));


export default demographicsModalStyles;