import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { studentContext } from "../../Student/context";
import OnGoing from "../OnGoing";

function PracticeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { screen, setScreen, setIsShowMiniSidebar, isShowMiniSidebar } =
    useContext(studentContext);
    

  useEffect(() => {
    setIsShowMiniSidebar(true);
    if(location?.state?.courseId && location?.state?.week){
    sessionStorage.setItem("courseId", location?.state?.courseId);
    sessionStorage.setItem("week", location?.state?.week);
    }
  }, []);
  
  return <OnGoing courseId={location?.state?.courseId ? location?.state?.courseId : sessionStorage.getItem("courseId")} week={location?.state?.week ? location?.state?.week : sessionStorage.getItem("week")} key={id} selectedQsId={id} />;
}

export default PracticeDetails;
