import React, { useEffect, useState } from "react";
import avtar from "../../assets/images/blog/blog.png";
import eye from "../../assets/svg/eye.svg";
import message from "../../assets/svg/msg.svg";
import liked from "../../assets/svg/likethumb.svg";
import like from "../../assets/svg/likegray.svg";
import loadmore from "../../assets/svg/loadmore.svg";
import rightarrow from "../../assets/rightarrow.svg";
import halfCircle from "../../assets/half-circle.svg";
import dottcircle from "../../assets/svg/dotcircle.svg";
import wave from "../../assets/svg/wave.svg";
import { useNavigate, useParams } from "react-router-dom";
import { GetBlog, GetBlogs } from "../../services/Blog.service";
import { useCookie } from "react-use";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useUserStore } from "../../store/store";
import axiosInstance from "../../services/config/ApiConfig";

const ReadBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, , deleteLoggedIn] = useCookie("maang");
  const isLoggedIn = !!(loggedIn && Object.keys(loggedIn).length > 0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = useUserStore((state) => state.user);

  function getName() {
    if (user && user.user) return user.user.username.split("@")[0];
    else return "";
  }

  const getBlog = async () => {
    try {
      const blogData = await GetBlog(id);
      setBlog(blogData);
      setComments(blogData?.comments || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blogData = await GetBlog(id);
        setBlog(blogData);
        setComments(blogData?.comments || []);
      } catch (err) {
        console.log(err);
      }
    };

    getBlog();
  }, [id]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData = await GetBlogs();
        setBlogs(blogsData?.results || []);
      } catch (err) {
        console.log(err);
      }
    };

    getBlogs();
  }, []);

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
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const sortedTopics = blog?.topics?.sort((a, b) => a.id - b.id);
  const sortedBlogs = blogs
    .filter((b) => b.id !== parseInt(id))
    .sort((a, b) => b.views - a.views);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // const handleCommentSubmit = async () => {
  //   if (isLoggedIn) {
  //     try {
  //       const response = await fetch('https://devdjango.maangcareers.com/website-management/comments/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           name: getName(),
  //           text: newComment,
  //           blog: id
  //         })
  //       });
  //       const data = await response.json();
  //       setComments([...comments, data]);
  //       setNewComment("");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     window.location.href = '/login';
  //   }
  // };

  const handleCommentSubmit = async () => {
    if (isLoggedIn) {
      try {
        const response = await axiosInstance.post(
          "/website-management/comments/",
          {
            name: getName(),
            text: newComment,
            blog: id,
          }
        );

        const data = response.data;
        setComments([...comments, data]);
        setNewComment("");
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/login");
    }
  };

  const handleBlogLike = async () => {
    try {
      if (isLoggedIn) {
        const response = await axiosInstance.post(
          `/website-management/like-blog/${id}/`
        );
        // Handle response as needed
        getBlog();
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      if (isLoggedIn) {
        const response = await axiosInstance.post(
          `/website-management/like_comment/${commentId}/`
        );
        getBlog();
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  useEffect(() => {
    console.log("first", user);
  }, [user]);

  return (
    <div
      className="pt-3 relative"
      style={{
        background:
          "linear-gradient(rgb(45 124 196 / 8%) 0%, rgba(45, 151, 196, 0) 100%)",
      }}
    >
      <section className="sub-section text-start margin_for_header relative z-10">
        <div className="flex justify-between sm:items-center max-sm:flex-col gap-3">
          <div className="flex-1 basis-[50%]">
            <h4 className="md:text-[18px] text-sm text-secondary mb-2">
              General • {blog?.read_time} min
            </h4>
            <h1 className="lg:text-[40px] text-3xl max-md:text-2xl mt-2 font-[600] !leading-[1.2]">
              {blog?.title}
            </h1>
          </div>
          <div className="flex flex-1 sm:justify-end gap-2 items-center max-md:mt-5 items-end">
            <img src={avtar} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <h4 className="text-sm font-medium text-secondary leading-[0]">
                Write By
              </h4>
              <h6 className="text-nowrap text-lg mt-1 font-medium text-cblack">
                {blog?.written_by}
              </h6>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="max-h-[500px] overflow-hidden">
            <img
              src={blog?.photo}
              alt=""
              className="w-full rounded-xl h-[400px] object-cover"
            />
          </div>
        </div>
        <div className="mt-10 md:grid grid-cols-12 max-md:grid-cols-10">
          <ul className="md:col-span-2 col-span-9 max-md:grid grid-cols-3 place-items-baseline justify-between">
            <li className="mb-3">
              <p className="text-sm text-secondary font-normal">Date</p>
              <h4 className="text-base font-semibold">{getDate(blog?.date)}</h4>
            </li>
            {/* Add other social media links here */}
          </ul>
          <div className="md:col-span-10 col-span-9">
            <p className="text-3xl font-semibold mb-6">{blog?.title}</p>
            <h4 className="text-2xl font-semibold">Introduction</h4>
            <p className="my-4 text-base text-secondary font-normal">
              {blog?.text}
            </p>
            <div className="mt-5">
              <div className="max-h-[350px] overflow-hidden w-full object-cover">
                <img
                  src={blog?.photo}
                  alt=""
                  className="w-full h-[250px] rounded-xl object-cover"
                />
              </div>
              <ol className="mt-5 list-none 2xl:text-2xl font-semibold max-2xl:text-lg max-md:ml-5">
                {sortedTopics?.map((topic, idx) => (
                  <li key={topic?.id} className="my-9">
                    <h4 className="text-2xl font-semibold mb-4">
                      {topic?.title}
                    </h4>
                    <p className="text-base text-secondary font-normal">
                      {topic?.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <ul className="text-xs text-primary flex gap-4 justify-start items-center">
              <li className="flex gap-1 items-center">
                <img src={eye} alt="" />{" "}
                <span className="text-xs">{blog?.views}</span>
              </li>
              <li className="flex gap-1 items-center">
                <img src={message} alt="" />{" "}
                <span className="text-xs">{comments.length || 0}</span>
              </li>
              {blog?.like &&
                blog.like.length > 0 &&
                blog.like.map((data) => {
                  if (data?.email === user?.user?.email) {
                    return (
                      <li
                        className="flex gap-1 items-center"
                        onClick={handleBlogLike}
                      >
                        <img src={liked} alt="" />{" "}
                        <span className="text-xs">
                          {blog?.likes_count || 0}
                        </span>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="flex gap-1 items-center"
                        onClick={handleBlogLike}
                      >
                        <img src={like} alt="" />{" "}
                        <span className="text-xs" style={{ color: "grey" }}>
                          {blog?.likes_count || 0}
                        </span>
                      </li>
                    );
                  }
                })}

              {blog?.like && blog?.like.length === 0 && (
                <li
                  className="flex gap-1 items-center"
                  onClick={handleBlogLike}
                >
                  <img src={like} alt="" />{" "}
                  <span className="text-xs" style={{ color: "grey" }}>
                    {blog?.likes_count || 0}
                  </span>
                </li>
              )}
            </ul>
            <div className="mt-5 w-4/6 max-md:w-full object-cover">
              <h4 className="text-lg font-semibold mt-5">Comment</h4>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                rows="5"
                placeholder="Type here"
                className="w-full object-cover p-4 outline-none border-cborder border-2 custom-shadow text-md mt-5 font-normal resize-none h-[180px] !rounded-2xl"
              ></textarea>
              <button
                className="custom-button bg-primary text-white ml-auto mt-5"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
              {comments &&
                comments.length > 0 &&
                comments.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 items-start justify-start mt-16"
                  >
                    <img
                      src={avtar}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover shrink-0"
                    />
                    <div className="w-full">
                      <div className="flex justify-between items-center w-full">
                        <h6 className="text-xl max-md:text-lg font-medium text-cblack">
                          {item.name}
                        </h6>
                        <h6 className="text-xs font-medium text-secondary">
                          {getDate(item.date)}
                        </h6>
                      </div>
                      <p className="text-base text-secondary font-normal mt-2">
                        {item.text} <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sint culpa aspernatur est mollitia dolorum architecto
                        libero soluta assumenda nobis possimus.
                      </p>
                      <div className="text-primary text-sm flex mt-2 gap-2 justify-start items-center">
                        {item?.like &&
                          item.like.length > 0 &&
                          item.like.map((data) => {
                            if (data?.email === user?.user?.email) {
                              return (
                                <li
                                  className="flex gap-1 items-center"
                                  onClick={() => {
                                    handleCommentLike(item.id);
                                  }}
                                >
                                  <img src={liked} alt="" />{" "}
                                  <span className="text-xs">
                                    {item?.likes_count || 0}
                                  </span>
                                </li>
                              );
                            } else {
                              return (
                                <li
                                  className="flex gap-1 items-center"
                                  onClick={() => {
                                    handleCommentLike(item.id);
                                  }}
                                >
                                  <img src={liked} alt="" />{" "}
                                  <span
                                    className="text-xs"
                                    style={{ color: "grey" }}
                                  >
                                    {item?.likes_count || 0}
                                  </span>
                                </li>
                              );
                            }
                          })}

                        {item?.like && item?.like.length === 0 && (
                          <li
                            className="flex gap-1 items-center"
                            onClick={() => {
                              handleCommentLike(item.id);
                            }}
                          >
                            <img src={like} alt="" />{" "}
                            <span className="text-xs" style={{ color: "grey" }}>
                              {item?.likes_count || 0}
                            </span>
                          </li>
                        )}
                        {/* <img src={liked} alt="" /> <span className="text-xs">{item.likes_count || 0}</span> */}
                        {/* <button className="like-button" onClick={() => handleCommentLike(item.id)}>
                        Like
                      </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              {comments && comments.length > 0 && (
                <button className="mt-10 flex justify-center items-center gap-2 !font-medium border-primary custom-button text-secondary mx-auto">
                  <span>
                    <img src={loadmore} alt="" />
                  </span>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h1 className="text-3xl text-start font-semibold text-black pl-6">
            Must read blogs
          </h1>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper mx-auto py-2"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              650: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1120: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            {sortedBlogs?.map((blog) => (
              <SwiperSlide key={blog?.id} className="!col-span-1">
                <div className="custom-shadow mx-auto 2xl:max-w-cardmw max-w-mw350 mt-5 overflow-hidden h-[480px]">
                  <img
                    src={blog?.photo}
                    alt=""
                    className="max-h-[230px] h-full w-full object-cover rounded-xl"
                  />
                  <div className="max-w-96 p-3 relative !bg-white mx-auto">
                    <div className="text-start flex flex-col items-start">
                      <h3 className="text-sm text-secondary font-normal">
                        General {getDate(blog?.date)}
                      </h3>
                      <h4 className="text-xl text-cblack font-semibold">
                        {blog?.title?.slice(0, 50) + "..."}
                      </h4>
                      <p className="text-sm text-secondary font-normal">
                        {blog?.text?.slice(0, 200)}
                      </p>
                      <div className="flex justify-between items-center w-full mt-4">
                        <ul className="text-[10px] text-primary flex gap-2 justify-start items-center">
                          <li className="flex gap-1 items-center">
                            <img src={eye} alt="" />{" "}
                            <span className="text-xs">{blog?.views}</span>
                          </li>
                          <li className="flex gap-1 items-center">
                            <img src={message} alt="" />{" "}
                            <span className="text-xs">
                              {blog?.comments?.length || 0}
                            </span>
                          </li>
                          <li className="flex gap-1 items-center">
                            <img src={liked} alt="" />{" "}
                            <span className="text-xs">{blog?.likes || 0}</span>
                          </li>
                        </ul>
                        <a
                          href=""
                          className="bg-primary px-2 py-1 text-white rounded-full text-[10px] font-medium flex items-center"
                        >
                          <span>Read More</span>
                          <img
                            src={rightarrow}
                            alt=""
                            className="max-h-5 max-w-4"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <img
        src={halfCircle}
        alt=""
        className="absolute max-md:hidden left-0 top-[6%] h-[100px]"
      />
      <img
        src={halfCircle}
        alt=""
        className="absolute max-md:hidden left-0 top-[30%] h-[100px]"
      />
      <img
        src={wave}
        alt=""
        className="absolute max-md:hidden left-0 top-[38%] w-[100px]"
      />
      <img
        src={wave}
        alt=""
        className="absolute max-md:hidden right-0 top-[50%] w-[100px]"
      />
      <img
        src={halfCircle}
        alt=""
        className="absolute max-md:hidden left-0 bottom-[30%] h-[100px]"
      />
      <img
        src={halfCircle}
        alt=""
        className="absolute max-md:hidden right-0 top-[20%] h-[100px] rotate-180"
      />
      <img
        src={dottcircle}
        alt=""
        className="absolute max-md:hidden right-0 top-[15%] h-[100px]"
      />
      <img
        src={halfCircle}
        alt=""
        className="absolute max-md:hidden right-0 bottom-[15%] h-[100px] rotate-180"
      />
      <span className="glow_elements_con right-0 top-[25%] max-md:hidden"></span>
    </div>
  );
};

export default ReadBlogPage;
