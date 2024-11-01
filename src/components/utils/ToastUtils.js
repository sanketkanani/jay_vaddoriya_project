import toast from "react-hot-toast";

const ToastUtils = {
  success: (message) => {
    toast.success(message, {
      icon: "✅",
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
      },
    });
  },

  warning: (message) => {
    toast.error(message, {
      icon: "⚠️",
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
      },
    });
  },
};

export default ToastUtils;
