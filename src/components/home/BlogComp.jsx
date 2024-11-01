import React, { useEffect, useState } from "react";
import blog1 from "../../assets/images/blog/blog1.png";
import blog2 from "../../assets/images/blog/blog2.png";
import blog3 from "../../assets/images/blog/blog3.png";
import blog4 from "../../assets/images/blog/blog4.png";
import share from "../../assets/svg/share.svg";
import Rightarrow from "../../assets/rightarrow.svg";
import Rightarrowgreen from "../../assets/svg/Rightsidearrow/rightarrowgreen.svg";
import img1 from "../../assets/images/gernrelbannergirl.png";
import { GetBlogs } from "../../services/Blog.service";
import { Link } from "react-router-dom";
import dotcircle from "../../assets/svg/dotcircle.svg";
import solidcircle from "../../assets/svg/solidround.svg";
import ring from "../../assets/svg/circle.svg"
import bottomRing from "../../assets/blog-bottom-bot.svg"
import { RWebShare } from "react-web-share";

const BlogComp = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogData = await GetBlogs();
        console.log(blogData);
        const sortedBlogs = blogData?.results.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setBlogs(sortedBlogs.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    };

    getBlogs();
  }, []);

  console.log(blogs);

  const getDate = (dateString) => {
    const date = new Date(dateString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <>
      <section className=" bg-white !pb-0 mb-0 relative ">
        <div className="sub-section ">
          <h1 className=" title">Our Recent Blogs</h1>
          <div className=" flex gap-5 mt-10 justify-center items-start max-md:flex-col     ">
            <div className=" flex-1 text-start">
              <div className=" relative z-10">
                <img
                  src={blogs?.[0]?.photo}
                  alt=""
                  className=" h-full w-full max-h-96 max-w-full rounded-2xl object-top"
                />
                <RWebShare
                  data={{
                    text: blogs?.[0]?.title || "Check out this blog!",
                    url: window.location.href+"blog/" + blogs?.[0]?.id,
                    title: blogs?.[0]?.title || "Blog Details",
                  }}
                  onClick={() => console.log("Shared successfully!")}
                >
                  <a
                    href="javascript:void(0)"
                    className=" h-10 w-10 rounded-full bg-primary absolute top-5 flex justify-center items-center right-5"
                  >
                    <img src={share} alt="" className=" !text-white " style={{ filter: 'invert(1)' }} />
                  </a>
                </RWebShare>
              </div>
              <div className=" py-2 flex flex-col justify-start items-start mt-5 relative z-10">
                <div className=" 2xl:text-base max-2xl:text-sm font-normal text-secondary mb-2">
                  {getDate(blogs?.[0]?.date)} • {blogs?.[0]?.read_time} min
                </div>
                <h1 className="lg:text-3xl md:text-xl font-semibold text-black mb-2">
                  {blogs?.[0]?.title}
                </h1>
                <p className="text-base text-secondary font-normal mt-1 blog_main_paraprapg">
                  {blogs?.[0]?.text}
                </p>
                <a
                  href="javascript:void(0)"
                  className="mt-3 py-1 border-primary px-3 max-2xl:text-[10px] 2xl:text-sm custom-button  text-white bg-primary font-normal mt-5"
                >
                  <Link to={"/blog/" + blogs?.[0]?.id}>Read More</Link> <img src={Rightarrow} alt="" />
                </a>
              </div>
            </div>
            <div className=" flex-1">
              <ul className=" flex flex-col gap-5">
                {" "}
                {blogs?.slice(1)?.map((blog) => {
                  return (
                    <li
                      key={blog.id}
                      className=" text-start flex gap-3 items-start"
                    >
                      {" "}
                      <img
                        src={blog.photo}
                        alt=""
                        className="object-cover max-h-40 max-w-40 w-full rounded-xl h-[140px]"
                      />{" "}
                      <div>
                        <h6 className=" text-sm  font-normal text-secondary mb-1">
                          {getDate(blog?.date)} • {blog?.read_time} min
                        </h6>
                        <h3 className="max-md:text-base text-xl text-cblack font-semibold max-w-[90%] text-ellipsis overflow-hidden">
                          {blog?.title}
                        </h3>
                        <button className=" mt-2 border border-solid border-primary flex py-1 px-3 max-2xl:text-[10px] 2xl:text-sm custom-button  text-white font-normal gap-2 mt-3">
                          <Link className="text-primary" to={"/blog/" + blog?.id}>Read More</Link>{" "}
                          <img src={Rightarrowgreen} alt="" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link to={'/blog'} className="py-2 border-primary px-3 max-2xl:text-[10px] 2xl:text-base custom-button  text-white bg-primary font-normal relative z-10 max-w-[500px] mt-7">
                View All
              </Link>
            </div>
          </div>
        </div>
        <img
          src={solidcircle}
          alt=""
          className="max-md:hidden absolute top-20  right-5 z-50"
        />
        <img
          src={dotcircle}
          alt=""
          className="max-md:hidden absolute top-[5%] left-[5%]"
        />
        <img
          src={ring}
          alt=""
          className=" max-md:hidden absolute bottom-[2%] -left-5"
        />
        <img
          src={bottomRing}
          alt=""
          className=" max-md:hidden absolute bottom-[0] -right-2 w-[180px]"
        />
        <span className="glow_elements_con left-0 bottom-0 !w-[180px] !opacity-[18%] max-md:hidden"></span>
      </section>
    </>
  );
};

export default BlogComp;
