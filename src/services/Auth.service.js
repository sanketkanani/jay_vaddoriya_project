import axiosInstance from "./config/ApiConfig";

const LOGIN_URL = "/api/login/";
const LOGOUT_URL = "/api/auth/logout/";
const USER_VALID_CHECK_URL = "/test-management/user-valid-check/";
const SIGNUP_URL = "/api/signup/";
const VALIDATE_OTP_URL = "/api/signup/";
const RESEND_OTP_URL = "/api/resend/";
const VERIFY_OTP_URL = "/api/password/verify/";
const SUBMIT_PASSWORD_RESET_URL = "/api/password_reset/";
const EDIT_PROFILE = '/user-management/profile-edit/'
const PROFILE_DATA = '/user-management/profile-data';
const SEND_RESET_PASSWORD_LINK = '/api/reset_password_link/';
const RESET_PASSWORD = '/api/reset_password/'

export const Login = async (payload) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await axiosInstance.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Signup = async (payload) => {
  try {
    const response = await axiosInstance.post(SIGNUP_URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const IsUserValid = async () => {
  try {
    let response = axiosInstance.get(USER_VALID_CHECK_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// OTP function
export const validateOtp = async (payload) => {
  try {
    const response = await axiosInstance.patch(VALIDATE_OTP_URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const resetPassword = async (payload) => {
  try {
    const response = await axiosInstance.post(SEND_RESET_PASSWORD_LINK, payload);
    console.log(">>", response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordSet = async (payload) => {
  try {
    const response = await axiosInstance.post(RESET_PASSWORD, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async (payload) => {
  try {
    const response = await axiosInstance.post(RESEND_OTP_URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (payload) => {
  try {
    const response = await axiosInstance.post(VERIFY_OTP_URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitPasswordReset = async () => {
  try {
    const response = await axiosInstance.post(SUBMIT_PASSWORD_RESET_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProfileData = async () => {
  try {
    let response = axiosInstance.get(PROFILE_DATA);
    return response;
  } catch (error) {
    throw error;
  }
}


export const profileEdit = async (formData) => {
  try {
    const response = await axiosInstance.post(EDIT_PROFILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};