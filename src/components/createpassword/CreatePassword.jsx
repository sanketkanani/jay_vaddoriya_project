import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import img1 from "../../assets/images/blog/blog1.png";
import img2 from "../../assets/images/blog/blog2.png";
import img3 from "../../assets/images/blog/blog3.png";
import arrowwhite from "../../assets/svg/whiteArrow.svg";
import resetsuccess from "../../assets/svg/Loginsuccess.svg";
import Button from "../button/Button";
import { resetPasswordSet } from "../../services/Auth.service";

const CreatePasswordComp = () => {
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uidParam = params.get('uid');
    const tokenParam = params.get('token');

    if (uidParam) setUid(uidParam);
    if (tokenParam) setToken(tokenParam);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      uid: uid,
      token: token,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await resetPasswordSet(payload);

      if (response.status === 200) {
        navigate('/resetsuccess');
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center relative items-center">
        <form className="p-4 max-auto flex justify-center items-center" onSubmit={handleSubmit}>
          <div className="mt-4 w-full md:w-[100%] text-center">
            <h4 className="text-center text-cblack text-3xl font-semibold">
              Create your Password
            </h4>
            <p className="text-sm text-secondary text-center font-normal mt-2">
              Create your password
            </p>
            {error && (
              <div className="text-red-500 text-sm mt-4">{error}</div>
            )}
            <div className="text-start mt-8">
              <label className="text-base text-cblack font-semibold">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full"
              />
            </div>
            <div className="text-start mt-4">
              <label className="text-base text-cblack font-semibold">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-cslategray text-sm font-medium py-2 px-4 outline-none mt-2 border-cgray rounded-full border w-full"
              />
            </div>
            <div className="mt-8 w-full">
              <button
                type="submit"
                className="bg-black text-white flex justify-center text-xs p-3 font-semibold rounded-full w-full mx-auto"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePasswordComp;
