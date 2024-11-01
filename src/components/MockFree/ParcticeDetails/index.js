import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import OnGoing from "../OnGoing";
import { freeContext } from "../../free/context";

function FreeMockDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { screen, setScreen, setIsShowMiniSidebar, isShowMiniSidebar, sectionId, 
    setSectionId, selectedCourseIdForMock } =
    useContext(freeContext);
    

  useEffect(() => {
    setIsShowMiniSidebar(true);
  }, []);

  useEffect(()=>{
    setSectionId(id);
  },[id])


  useEffect(()=>{
    console.log("===== lelo ======", selectedCourseIdForMock)
  },[selectedCourseIdForMock])
  
  return <OnGoing key={id} sectionId={sectionId} />;
}

export default FreeMockDetails;
