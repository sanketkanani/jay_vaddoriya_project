import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import logo from "../../assets/images/Logo_White 1.svg";
import img1 from "../../assets/images/blog/blog1.png";
import downarrow from "../../assets/images/downchevron.svg";
import portal from "../../assets/svg/portal.svg";
import profile from "../../assets/svg/profile.svg";
import blacktrophy from "../../assets/svg/blacktrophy.svg";
import navmenu from "../../assets/svg/navmenu.svg";
import logout from "../../assets/svg/logout.svg";
import white from "../../assets/svg/navmenuwhite.svg";
import { Logout } from "../../services/Auth.service";
import { useUserStore } from "../../store/store";
import { useCookie } from "react-use";
import whitearrow from "../../assets/svg/Rightsidearrow/whiteRightarrow.svg";
import logoWhite from "../../assets/Logo_White-1.png";
import { ValidCheck } from "../../services/Course.service";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const [mobnav, setMobNav] = useState(false);
  const user = useUserStore((state) => state.user);
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [loggedIn, , deleteLoggedIn] = useCookie("maang");
  const isLoggedIn = !!(loggedIn && Object.keys(loggedIn).length > 0);
  const [activeLink, setActiveLink] = useState("home");
  const [validStatus, setValidStatus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  const match = pathname.match(/^\/course\/(\d+)$/);
  const freeMatch = pathname.match(/^\/free-course\/(\d+)$/);
  const isCoursePage = match !== null || freeMatch !== null;

  // Effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    // Close the navigation when the pathname changes
    closenav();
  }, [pathname]); // This dependency ensures the effect runs whenever pathname changes

  useEffect(() => {
    // Set the active link based on the current pathname on reload
    const path = pathname;
    if (path === "/") {
      setActiveLink("home");
    } else if (path === "/program") {
      setActiveLink("program");
    } else if (path === "/works") {
      setActiveLink("works");
    } else if (path === "/contactus") {
      setActiveLink("contactus");
    }
  }, [pathname]);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const header = document.querySelector(".main_header");

      if (currentScroll > lastScroll) {
        setIsScrolled(true);
        header.classList.add("header_fixed");
        header.classList.remove("header_unfixed");
      } else if (currentScroll < lastScroll) {
        setIsScrolled(false);
        header.classList.remove("header_fixed");
        header.classList.add("header_unfixed");
      }

      if (currentScroll === 0) {
        setIsScrolled(false);
        header.classList.remove("header_fixed", "header_unfixed");
      }

      lastScroll = currentScroll;
    };

    const debounceHandleScroll = () => {
      clearTimeout(debounceHandleScroll.timer);
      debounceHandleScroll.timer = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", debounceHandleScroll);

    return () => {
      window.removeEventListener("scroll", debounceHandleScroll);
      clearTimeout(debounceHandleScroll.timer);
    };
  }, []);

  useEffect(() => {
    const getValidStatus = async () => {
      try {
        const validStatus = await ValidCheck();
        setValidStatus(validStatus);
      } catch (err) {
        console.log(err);
      }
    };
    if (loggedIn) {
      getValidStatus();
    }
  }, [loggedIn]);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setIsScrolled(true);
      } else if (currentScroll < lastScroll) {
        setIsScrolled(false);
      }

      lastScroll = currentScroll;
    };

    const debounceHandleScroll = () => {
      clearTimeout(debounceHandleScroll.timer);
      debounceHandleScroll.timer = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", debounceHandleScroll);

    return () => {
      window.removeEventListener("scroll", debounceHandleScroll);
      clearTimeout(debounceHandleScroll.timer);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const smaallNav = () => {
    setMobNav(true);
  };
  const closenav = () => {
    setMobNav(false);
  };
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isContest3Page =
    location.pathname === "/contest3" ||
    location.pathname === "/contest2" ||
    location.pathname === "/bookcourse";

  // const navbarhide = ["/resetsuccess","/createpassword","/otpvarify","/otpsuccess"]

  const contest4 = location.pathname === "/contest4";
  const contest5 = location.pathname === "/nextquestion";

  const [dropdown, setDropDown] = useState(false);

  const DropDown = () => {
    setDropDown(!dropdown);
  };

  if (contest4) {
    return null;
  }
  if (contest5) {
    return null;
  }
  // if (isHideProfile) {
  //   return null;
  // }

  const profilePaths = ["/profile", "/program"];
  const isProfilePage = profilePaths.includes(location.pathname);

  const LogoutHandler = async (e) => {
    try {
      e.preventDefault();
      await Logout();
    } catch (err) {
      console.log(err);
    }
    deleteLoggedIn();
    removeAllUser();
    document.location.replace("/");
  };

  function getName() {
    if (user && user.user) return user.user.username.split("@")[0];
    else return "";
  }
  const resetpass = location.pathname === "/resetsuccess";
  const createpass = location.pathname === "/createpassword";
  const otpvarify = location.pathname === "/otpvarify";
  const otpsuccess = location.pathname === "/otpsuccess";

  // if (resetpass) {
  //   return null;
  // }
  // if (createpass) {
  //   return null;
  // }
  // if (otpvarify) {
  //   return null;
  // }
  // if (otpsuccess) {
  //   return null;
  // }

  const viewPortal = () => {
    Swal.fire({
      title: "You want to go!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Paid Portal",
      cancelButtonText: "Free Portal",
    }).then((result) => {
      if (result.isConfirmed) {
        if (validStatus?.paid_course) {
          navigate("/student");
        } else {
          Swal.fire({
            title: validStatus?.message,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Checkout Courses",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/program");
            }
          });
        }
      } else {
        if (validStatus?.free_course) {
          navigate("/free");
        } else {
          Swal.fire({
            title: validStatus?.free_message,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Checkout Courses",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/program");
            }
          });
        }
      }
    });
  };

  return (
    <div className={`main_header ${isCoursePage ? "blue_bg_header" : ""}`}>
      <div
        className={`flex justify-between items-center top-0 left-0 right-0 z-20 md:px-10 py-5 p-3 lg:px-6 main-section relative `}
      >
        {/* blue_bg_header 1> http://localhost:3000/course/1, for all blue banner page */}
        <div className="h-8 for_blue_bg">
          <img src={logo} alt="" className="h-full w-full logo_black" />
          <img
            src={logoWhite}
            alt=""
            className="h-full w-full logo_white hidden"
          />
        </div>
        <ul
          className={`text-xl pl-12 font-medium flex items-center gap-6 max-lg:hidden ${
            isContest3Page ? "!text-white" : "text-cblack"
          }`}
        >
          <li className="active">
            <Link
              to="/"
              className={` ${
                activeLink === "home" ? "text-primary" : "text-black"
              }`}
              onClick={() => handleLinkClick("home")}
            >
              Home
              <br />
              <div
                className={`text-primary ${
                  activeLink === "home"
                    ? "border-b-2 w-[20%]  border-primary"
                    : ""
                } ${isContest3Page ? "!text-white" : ""}`}
              >
                {" "}
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/program"
              className={` ${
                activeLink === "program" ? "text-primary" : "text-black"
              }`}
              onClick={() => handleLinkClick("program")}
            >
              Program
              <br />
              <div
                className={`text-primary ${
                  activeLink === "program"
                    ? "border-b-2 w-[20%]  border-primary"
                    : ""
                } ${isContest3Page ? "!text-white" : ""}`}
              >
                {" "}
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/works"
              onClick={() => handleLinkClick("works")}
              className={` ${
                activeLink === "works" ? "text-primary" : "text-black"
              }`}
            >
              How it works
              <br />
              <div
                className={`text-primary ${
                  activeLink === "works"
                    ? "border-b-2 w-[20%]  border-primary"
                    : ""
                } ${isContest3Page ? "!text-white" : ""}`}
              >
                {" "}
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/contactus"
              className={` ${
                activeLink === "contactus" ? "text-primary" : "text-black"
              }`}
              onClick={() => handleLinkClick("contactus")}
            >
              Contact Us
              <br />
              <div
                className={`text-primary ${
                  activeLink === "contactus"
                    ? "border-b-2 w-[20%]  border-primary"
                    : ""
                } ${isContest3Page ? "!text-white" : ""}`}
              >
                {" "}
              </div>
            </Link>
          </li>
        </ul>

        {!isLoggedIn && (
          <div
            className={`flex items-center justify-between gap-3 max-lg:hidden `}
          >
            <Link to="/login">
              <button className="custom-button text-primary border-primary border-primary border-solid">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="custom-button bg-primary text-white border-primary">
                Create a free account
              </button>
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <div
            className="mt-1 text-start flex justify-start items-center gap-2 relative name_for_blue_bg max-lg:justify-end max-lg:basis-[80%]"
            ref={dropdownRef}
          >
            <h4
              className={`2xl:text-lg font-semibold max-sm:text-sm max-2xl:text-base text-[#4E5159] ${
                isContest3Page || isCoursePage ? "!text-white" : ""
              }`}
            >
              {getName()}
            </h4>
            <button onClick={DropDown} className="pr-0 pl-2">
              <div className="flex justify-start gap-2 items-center">
                <img
                  src={img1}
                  alt=""
                  className=" h-10 w-10 rounded-full object-cover"
                />
                <img src={downarrow} alt="" className="blue_bg_dropdown" />
              </div>

              {dropdown && (
                <ul className="bg-white absolute top-14 w-[170px] flex flex-col justify-center items-start  z-50 right-0 rounded-md py-2 px-5 custom-shadow text-cblack font-medium text-base for_blue_bg_down">
                  <li
                    className="my-2 hover:text-primary text-primary flex items-center gap-2  justify-start"
                    onClick={viewPortal}
                  >
                    <img src={portal} alt="" /> <span>My Portal</span>
                  </li>
                  <li className="my-2 hover:text-primary flex items-center gap-2  justify-start">
                    <img src={profile} alt="" />{" "}
                    <Link to="/course">Free Courses</Link>
                  </li>
                  <li className="my-2 hover:text-primary flex items-center gap-2  justify-start">
                    <img src={profile} alt="" />{" "}
                    <Link to="/profile">My profile</Link>
                  </li>
                  <li className="my-2 hover:text-primary flex items-center gap-2  justify-start">
                    <img src={blacktrophy} alt="" />{" "}
                    <Link to="/contest1">My contest</Link>
                  </li>
                  <li
                    onClick={LogoutHandler}
                    className="my-2 hover:text-primary flex items-center gap-2  justify-start"
                  >
                    <img src={logout} alt="" />
                    Log out
                  </li>
                </ul>
              )}
            </button>
          </div>
        )}
        {mobnav && (
          <>
            <ul className="2xl:text-f22 text-2xl  mobilenav text-start px-2 -right-14 min-h-screen font-medium fixed h-[100%] top-0  mx-auto bg-primary text-white items-center gap-6 w-[250px]">
              <button
                className=" w-full ml-auto flex justify-start p-3 mt-2"
                onClick={closenav}
              >
                <img
                  src={whitearrow}
                  alt=""
                  className="hidden max-lg:block h-[20px] w-[20px] "
                />
              </button>
              <li className="my-2 p-2 border-b ">
                <Link to="/profile" className="!text-white">
                  Profile <br />
                </Link>
              </li>
              <li className="my-2 p-2">
                <Link to="/" className="!text-white">
                  Home <br />
                </Link>
              </li>
              <li className=" my-2 p-2">
                <Link to="/program" className="!text-white">
                  Program
                </Link>
              </li>
              <li className=" my-2 p-2">
                <Link to="/works" className="!text-white">
                  How it works
                </Link>
              </li>
              <li className=" my-2 p-2">
                <Link to="/contactus" className="!text-white">
                  {" "}
                  Contact Us
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className=" my-2 p-2">
                    <Link to="/login" className="!text-white">
                      Login
                    </Link>
                  </li>
                  <li className=" my-2 p-2">
                    <Link to="/signup" className="!text-white">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </>
        )}
        <div className="hidden max-lg:block shrink-0">
          <button
            onClick={smaallNav}
            className="hidden max-lg:block pl-4 shrink-0"
          >
            {isContest3Page ? (
              <img
                src={white}
                alt=""
                className="hidden max-lg:block shrink-0"
              />
            ) : (
              <img
                src={navmenu}
                alt=""
                className="hidden max-lg:block blue_bg_dropdown shrink-0"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
