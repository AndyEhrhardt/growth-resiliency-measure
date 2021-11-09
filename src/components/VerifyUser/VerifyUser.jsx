import { useParams } from "react-router";

function VerifyUser() {
    const {randomString} = useParams();

    return(
        <>
        <h1>{randomString}</h1>
        </>
    );
}

export default VerifyUser;