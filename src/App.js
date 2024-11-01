import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Banner from "./components/Program/Banner";
import Program from "./pages/program/Program";
import Work from "./pages/HowisWork/Work";
import ContactPage from "./pages/contact/ContactPage";
import LoginPage from "./pages/login/LoginPage";
import SignupComp from "./components/Signup/SignupComp";
import ProfilePage from "./pages/profile/ProfilePage";
import DetailSubmit from "./components/detalSubmit/DetailSubmit";
import AboutPage from "./pages/about/AboutPage";
import BookCoursePage from "./pages/bookcourse/BookCoursePage";
import FaqPAge from "./pages/faq/FaqPAge";
import BlogPage from "./pages/blog/BlogPage";
import ReadBlogPage from "./pages/readblogs/ReadBlogPage";
import TermsConditions from "./pages/termsandcondition/TermsConditions";
import FreeCall from "./pages/freecall/FreeCall";
import CareerPortal from "./pages/career/CareerPortal";
import JobDetail from "./pages/jobdetail/JobDetail";
import ApplyApplication from "./pages/applyapplication/ApplyApplication";
import Contest1 from "./pages/contest1/Contest1";
import Contest2 from "./pages/contest2/Contest2";
import Contest3 from "./pages/contest3/Contest3";
import Contest4 from "./pages/contest4/Contest4";
import NextQuestion from "./pages/nextquestion/NextQuestion";
import Contest5 from "./pages/contest5/Contest5";
import Course from "./pages/course/Course";
import { useUserStore } from "./store/store";
import { useCookie } from "react-use";
import { lazy, Suspense, useEffect } from "react";
import ScrollToTop from "./components/utils/ScrollToTop";
import ResetComp from "./components/reset/ResetComp";
import Resetpassword from "./pages/resetpassword/Resetpassword";
import ResetSuccess from "./pages/resetsuccess/ResetSuccess";
import CraetePassword from "./pages/creatpassowrd/CraetePassword";
import OtpComp from "./components/otpvarify/OtpVarifyComp";
import OtpVarify from "./pages/otpvarify/OtpVarify";
import OtpSuccess from "./pages/otpsuccess/OtpSuccess";
import AuthLayout from "./components/layout/AuthLayout";
import { Toaster } from "react-hot-toast";
import FreeCoursePage from "./pages/freecourse/FreeCourse";
import Student from "./components/Student";
import { SearchResultProvider } from "./components/Submission/SearchResultContext ";
import StudentPractice from "./components/Practice";
import PracticeDetails from "./components/Practice/ParcticeDetails";
import { match } from 'path-to-regexp';
import Submission from "./components/Submission/submission.js";
import { RulesProvider } from "./utils/RulesContext.js";
import FreeStudent from "./components/free/index.jsx";
import FreePractice from "./components/PracticeFree/index.js";
import FreePracticeDetails from "./components/PracticeFree/ParcticeDetails/index.js";
import FreeMock from "./components/MockFree/index.js";
import FreeMockDetails from "./components/MockFree/ParcticeDetails/index.js";
import FreeMockResult from "./components/MockFree/MockResult/index.js";
import FreeQuiz from "./components/FreeQuiz/index.js";
import FreeCertificates from "./components/FreeCertificates/index.js";
import FreeProfile from "./components/FreeProfile/index.js";
import FreeDashboard from "./components/FreeDashboard/index.js";
import Privacy from "./pages/termsandcondition/Privacy/index.js";
import Return from "./pages/termsandcondition/Return/index.js";
import Shipping from "./pages/termsandcondition/Shipping/index.js";
import ReportTemplate from "./components/FreeCertificates/ReportTemplate/index.js";
import ResetSuccessEmailComp from "./components/resetsuccessEmail/ResetSuccessEmail.jsx";
import ReportTemplate1 from "./components/Templates/ReportTemplate1/index.js";
import ReportTemplate4 from "./components/Certificates/ReportTemplate3/index.js";
// import FreePracticeDetails from "./components/Practice/ParcticeDetails";

const DashBoard = lazy(() => import("./components/Dashboard"));
const StudentTimetable = lazy(() => import("./components/TimeTable"));
const StudentQuiz = lazy(() => import("./components/Quiz"));
const StudentMockTest = lazy(() => import("./components/MockTest"));
const StudentCertificates = lazy(() => import("./components/Certificates"));
const StudentProfile = lazy(() => import("./components/Profile1"));
const Mentor = lazy(() => import("./components/Mentor/Mentor.js"));
const MentorDashboard = lazy(() =>
  import("./components/Dashboard/MentorDashboard.js")
);
const CourseSyllabus = lazy(() =>
  import("./components/CourseSyllabus/CourseSyllabus.js")
);
const Teaching = lazy(() => import("./components/Teaching/Teaching.js"));
const TeachingPracticeDetails = lazy(() =>
  import("./components/Teaching/TeachingParcticeDetails")
);
const MentorSubmission = lazy(() =>
  import("./components/Submission/MentorSubmission.js")
);
const MentorTimeTable = lazy(() =>
  import("./components/TimeTable/MentorTimeTable.js")
);
const Rules = lazy(() => import("./components/Rules/Rules.js"));
const MentorProfile = lazy(() =>
  import("./components/Profile1/MentorProfile.js")
);

function App() {
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [loggedIn, , deleteLoggedIn] = useCookie("maang");
  const isLoggedIn = !!(loggedIn && Object.keys(loggedIn).length > 0);

  useEffect(() => {
    if (Object.keys(user).length <= 1 && loggedIn) updateUser(JSON.parse(loggedIn));
    if (new Date(user.expiry) <= new Date(Date.now())) {
      removeAllUser();
      deleteLoggedIn();
    }
  }, [user, loggedIn, updateUser, removeAllUser, deleteLoggedIn]);

  const AppContent = () => {
    const location = useLocation();
    const hideHeaderRoutes = ['/student',
      '/student/timetable', '/student/practice', `/student/practice/:id/Problem`,
      '/student/practice/:id/Hint', '/student/practice/:id/Submission',
      '/student/quiz', '/student/mock-test', '/student/submission',
      '/student/certificates', '/student/profile',
      '/mentor', '/mentor/*', '/free', '/free/*'];
    const shouldHideHeader = (currentRoute) => {
      return hideHeaderRoutes.some(route => match(route)(currentRoute));
    };

    return (
      <div className="App overflow-x-hidden">
        <Toaster />
        <ScrollToTop />
        {!shouldHideHeader(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={isLoggedIn ? <Student /> : <Navigate to="/login" />} >
            <Route
              path={`/student`}
              element={isLoggedIn ? <DashBoard /> : <Navigate to="/login" />}
            />
            <Route
              path={`/student/timetable`}
              element={
                isLoggedIn ? <StudentTimetable /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/practice`}
              element={
                isLoggedIn ? <StudentPractice /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/practice/:id/Problem`}
              element={
                isLoggedIn ? <PracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/student/practice/:id/Hint"
              element={
                isLoggedIn ? <PracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/student/practice/:id/Submission"
              element={
                isLoggedIn ? <PracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/quiz`}
              element={isLoggedIn ? <StudentQuiz /> : <Navigate to="/login" />}
            />
            <Route
              path={`/student/mock-test`}
              element={
                isLoggedIn ? <StudentMockTest /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/submission`}
              element={isLoggedIn ? <Submission /> : <Navigate to="/login" />}
            />
            <Route
              path={`/student/certificates`}
              element={
                isLoggedIn ? <StudentCertificates /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/profile`}
              element={
                isLoggedIn ? <StudentProfile /> : <Navigate to="/login" />
              }
            />
          </Route>
          <Route
            path="/mentor"
            element={isLoggedIn ? <Mentor /> : <Navigate to="/login" />}
          >
            <Route
              path={`/mentor`}
              element={
                isLoggedIn ? <MentorDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/courses`}
              element={
                isLoggedIn ? <CourseSyllabus /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/teaching`}
              element={isLoggedIn ? <Teaching /> : <Navigate to="/login" />}
            />
            <Route
              path={`/mentor/teaching/:id/problem`}
              element={
                isLoggedIn ? (
                  <TeachingPracticeDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/mentor/teaching/:id/hint"
              element={
                isLoggedIn ? (
                  <TeachingPracticeDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/mentor/teaching/:id/submission"
              element={
                isLoggedIn ? (
                  <TeachingPracticeDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* <Route
              path="/mentor/whiteboard"
              element={
                isLoggedIn ? (
                  <Whiteboard/>
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}

            <Route
              path={`/mentor/submission`}
              element={
                isLoggedIn ? <MentorSubmission /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/timetable`}
              element={
                isLoggedIn ? <MentorTimeTable /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/rules`}
              element={isLoggedIn ? <Rules /> : <Navigate to="/login" />}
            />
            <Route
              path={`/mentor/profile`}
              element={
                isLoggedIn ? <MentorProfile /> : <Navigate to="/login" />
              }
            />
          </Route>
          <Route path="/free" element={isLoggedIn ? <FreeStudent /> : <Navigate to="/login" />} >
            <Route
              path={`/free`}
              element={isLoggedIn ? <FreeDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path={`/free/practice`}
              element={
                isLoggedIn ? <FreePractice /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/free/quiz`}
              element={isLoggedIn ? <FreeQuiz /> : <Navigate to="/login" />}
            />
            <Route
              path={`/free/mock-test`}
              element={
                isLoggedIn ? <FreeMock /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/free/profile`}
              element={
                isLoggedIn ? <FreeProfile /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/free/practice/:id/Problem`}
              element={
                isLoggedIn ? <FreePracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/free/practice/:id/Hint"
              element={
                isLoggedIn ? <FreePracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/free/practice/:id/Submission"
              element={
                isLoggedIn ? <FreePracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/free/mock-test/:id/Problem`}
              element={
                isLoggedIn ? <FreeMockDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/free/mock-test/:id/Hint"
              element={
                isLoggedIn ? <FreeMockDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/free/mock-test/:id/Submission"
              element={
                isLoggedIn ? <FreeMockDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/free/mock-test/:id/Result"
              element={
                isLoggedIn ? <FreeMockResult /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/free/certificates`}
              element={
                isLoggedIn ? <FreeCertificates /> : <Navigate to="/login" />
              }
            />
          </Route>

          <Route path="/program" element={<Program />} />
          <Route path="/works" element={<Work />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupComp />} />
            <Route path="/resetsuccess" element={<ResetSuccess />} />
            <Route path="/resetsuccessemail" element={<ResetSuccessEmailComp />} />

            <Route path="/createpassword" element={<CraetePassword />} />
            <Route path="/otpvarify" element={<OtpVarify />} />
            <Route path="/otpsuccess" element={<OtpSuccess />} />
          </Route>
          <Route path="/detailsubmit" element={<DetailSubmit />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bookcourse" element={<BookCoursePage />} />
          <Route path="/faq" element={<FaqPAge />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogread" element={<ReadBlogPage />} />
          <Route path="/blog/:id" element={<ReadBlogPage />} />
          <Route path="/terms-condition" element={<TermsConditions />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/return" element={<Return />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/freecall" element={<FreeCall />} />
          <Route path="/careerportal" element={<CareerPortal />} />
          <Route path="/jobdetail" element={<JobDetail />} />
          <Route path="/applyapplication" element={<ApplyApplication />} />
          <Route path="/contest1" element={<Contest1 />} />
          <Route path="/contest2" element={<Contest2 />} />
          <Route path="/contest3" element={<Contest3 />} />
          <Route path="/contest4" element={<Contest4 />} />
          <Route path="/nextquestion" element={<NextQuestion />} />
          <Route path="/contest5" element={<Contest5 />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course/:id" element={<BookCoursePage />} />
          <Route path="/free-course/:id" element={<FreeCoursePage />} />
          <Route path="/certificate" element={<ReportTemplate4/>} />

        </Routes>
        {!shouldHideHeader(location.pathname) && <Footer />}
        {/* <Footer /> */}
      </div>
    );
  };

  return (
    <Suspense fallback={null}>
      <RulesProvider>
        <Router>
          <SearchResultProvider>
            <AppContent />
          </SearchResultProvider>
        </Router>
      </RulesProvider>
    </Suspense>
  );
}

export default App;
