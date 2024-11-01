import axios from "axios";

export const handleAxiosError = (setError, err) => {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      setError(err.response.data);
    } else if (err.request) {
      setError("No response received from the server");
    } else {
      setError(err.message);
    }
  } else {
    setError(err.message || "An unexpected error occurred");
  }
};
