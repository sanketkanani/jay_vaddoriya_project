import axiosInstance from "./config/ApiConfig";

const COURSE_BASE_URL = "/course-management";
const FREE_COURSE_BASE_URL = "/free-course-management";
const TEST_MANAGEMENT_BASE_URL = "/test-management";

const ALL_COURSES_URL = `${COURSE_BASE_URL}/list-courses/`;
const SINGLE_COURSE_URL = `${COURSE_BASE_URL}/list-courses/`;
const USER_BATCH_URL = `${COURSE_BASE_URL}/user-batch/`;
const FREE_ALL_COURSES_URL = `${FREE_COURSE_BASE_URL}/list-free-courses/`;
const FREE_ALL_COURSES_URL1 = `${FREE_COURSE_BASE_URL}/authenticated-user-registered-course-list/`;
const SINGLE_FREE_COURSE_URL = `${FREE_COURSE_BASE_URL}/free-course-view/`;
const VALID_STATUS_CHECK = `${TEST_MANAGEMENT_BASE_URL}/user-valid-check/`;
const COURSE_REGISTER_URL = `${FREE_COURSE_BASE_URL}/student-register-free-course/`;
const GET_EMI_URL = `${COURSE_BASE_URL}/get_emi`;
const GET_STUDENT_EMI_URL = `${COURSE_BASE_URL}/student-emi-details/`;
const GET_COURSE_DATES = `${COURSE_BASE_URL}/get-upcoming-dates/?course_id=`;
const ENROLLMENT_URL = "/course-management/student-enrollment/";
const CREATE_PAYMENT_ORDER = '/course-management/create-payment-order-id/'
const STUDENT_PAYMENT = `${COURSE_BASE_URL}/student-emi-details/`

export const GetAllCourses = async () => {
  try {
    const response = await axiosInstance.get(ALL_COURSES_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching all courses: ${error.message}`);
  }
};

export const GetAllFreeCourses = async () => {
  try {
    const response = await axiosInstance.get(FREE_ALL_COURSES_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching all free courses: ${error.message}`);
  }
};

export const GetCourseUpcomingDates = async (id) => {
  try {
    const response = await axiosInstance.get(GET_COURSE_DATES + id);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching course dates: ${error.message}`)
  }
}


export const GetCourseEmi = async (id) => {
  try {
    const response = await axiosInstance.get(GET_EMI_URL + '/' + id);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching course emi: ${error.message}`);
  }
}

export const GetStudentCourseEmi = async (id) => {
  try {
    const response = await axiosInstance.get(GET_STUDENT_EMI_URL + '?course_id=' + id);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching course emi: ${error.message}`);
  }
}


export const EnrollStudent = async (course_id, emi_id, chosen_date) => {
  try {
    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append("emi_id", emi_id);
    formData.append("chosen_date", chosen_date);

    const response = await axiosInstance.post(
      `${ENROLLMENT_URL}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error enrolling student: ${error.message}`);
  }
};

export const StudentPayment = async (course_id, amount, payment_mode, payment_id, payment_status, payment_url, json_response, emi_number) => {
  try {
    const formData = new FormData();
    formData.append("course_id", course_id);
    formData.append('amount', amount);
    formData.append('payment_mode', payment_mode);
    formData.append('payment_id', payment_id);
    formData.append('payment_status', payment_status);
    formData.append('payment_url', payment_url);
    formData.append('json_response', '');
    formData.append('emi_number', emi_number);
    const response = await axiosInstance.post(
      `${STUDENT_PAYMENT}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error enrolling student: ${error.message}`);
  }
};


export const GetAllFreeCourses1 = async () => {
  try {
    const response = await axiosInstance.get(FREE_ALL_COURSES_URL1);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching all free courses: ${error.message}`);
  }
};

export const GetCourse = async (id) => {
  try {
    const response = await axiosInstance.get(`${SINGLE_COURSE_URL}${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching course with id ${id}: ${error.message}`);
  }
};

export const GetFreeCourse = async (id) => {
  try {
    const response = await axiosInstance.get(`${SINGLE_FREE_COURSE_URL}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching free course with id ${id}: ${error.message}`);
  }
};

export const GetUserBatch = async () => {
  try {
    const response = await axiosInstance.get(USER_BATCH_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user batch: ${error.message}`);
  }
};

export const ValidCheck = async () => {
  try {
    const response = await axiosInstance.get(VALID_STATUS_CHECK);
    return response.data;
  } catch (error) {
    throw new Error(`Error performing valid check: ${error.message}`);
  }
};

export const CourseRegister = async (course_id) => {
  try {
    const formData = new FormData();
    formData.append("course_id", course_id);

    const response = await axiosInstance.post(COURSE_REGISTER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error registering for course with id ${course_id}: ${error.message}`);
  }
};


export const createOrder = async (params) => {
  try {
    const response = await axiosInstance.post(CREATE_PAYMENT_ORDER, params);
    return response.data; // Assuming the API returns the order details in the response data
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
