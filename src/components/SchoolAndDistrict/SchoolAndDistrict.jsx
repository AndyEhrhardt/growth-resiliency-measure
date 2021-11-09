import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
function SchoolAndDistrict() {
  // Allows admin to add schools and districts

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_DISTRICT_SCHOOL' })
  }, []);


  return (
    <div className="schoolDistrict">

    </div>
  );
}

export default SchoolAndDistrict;