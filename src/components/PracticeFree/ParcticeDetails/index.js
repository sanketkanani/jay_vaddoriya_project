import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import OnGoing from "../OnGoing";
import { freeContext } from "../../free/context";

function FreePracticeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { screen, setScreen, setIsShowMiniSidebar, isShowMiniSidebar } =
    useContext(freeContext);
    

  useEffect(() => {
    setIsShowMiniSidebar(true);
  }, []);
  
  return <OnGoing key={id} sectionId={id} />;
}

export default FreePracticeDetails;
