import React from "react";
import Banner from "../../components/Program/Banner";
import ProgramMain from "../../components/Program/ProgramMain";
import Service from "../../components/Program/Service";
import ImageBanner from "../../components/allbanner/ImageBanner";
import ProgramCarasol from "../../components/Program/ProgramCarasol";

const Program = () => {
  return (
    <div className="">
      <div
        className="upper_gredient"
        style={{
          background:
            "linear-gradient(rgb(45 124 196 / 10%) 0%, rgba(45, 151, 196, 0) 100%)",
        }}
      >
        {" "}
        <Banner />
      </div>
      <ProgramMain />
      <Service />
      <div className=" relative -top-10 pb-10">
        <ImageBanner />
      </div>

      <ProgramCarasol />
    </div>
  );
};

export default Program;
