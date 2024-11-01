import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/blog/blog1.png";
import editimg from "../../assets/svg/tabler_edit.svg";
import { useUserStore } from "../../store/store";
import { getProfileData, profileEdit } from "../../services/Auth.service";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import uploadIcon from "../../assets/cloud-upload.svg"

const ProfileComp = () => {
  const { user } = useUserStore((state) => state.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [university, setUniversity] = useState('');
  const [role, setRole] = useState('');
  const [profileData, setProfileData] = useState({})
  const [isOn, setIsOn] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');


  const handleProfileEdit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    // Additional validations can go here (e.g., role, location, etc.)

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('location', location);
    formData.append('university', university);
    formData.append('role', role);
    formData.append('old_password', oldPassword);
    formData.append('password1', newPassword);
    formData.append('password2', confirmPassword);
    try {
      const response = await profileEdit(formData);
      console.log("Profile edit response:", response);
      document.getElementById('editPersonalInfoModal').classList.add('hidden');
      document.getElementById('editModal').classList.add('hidden');
      getProfile();
      if (response?.status === 400) {
        toast.error(response.message);
      } else {
        toast.success("Updated Personal Information");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsOn(false)
      }
      // window.location.reload();
      // if (response.ok) {
      //   const data = await response.json();
      //   console.log('Profile updated successfully:', data);
      //   setEditModalOpen(false); // Close the modal after success
      // } else {
      //   console.error('Failed to update profile:', response.statusText);
      // }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  const getProfile = async () => {
    try {
      const profileData = await getProfileData();
      setProfileData(profileData.data.data);
      setFirstName(profileData.data.data.first_name)
      setLastName(profileData.data.data.last_name)
      setLocation(profileData.data.data.location);
      setUniversity(profileData.data.data.university);
      setRole(profileData.data.data.role);
      setLastName(profileData.data.data.last_name);
    } catch (err) {
      console.log(err)
    }
  }

  const toggle = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <div className="margin_for_header">
      <section className="sub-section !w-[92%] !mt-0 !pt-0">
        <p className=" 2xl:text-2xl md:text-lg font-semibold max-md:text-2xl mt-2 text-start">
          My Profile
        </p>
        <div className=" flex justify-between items-center border-2 border-cborder p-4 mt-5 rounded-3xl">
          <div className=" mt-1 text-start flex justify-start items-center gap-5">
            <img
              src={img1}
              alt=""
              className=" h-[64px] w-[64px] rounded-full object-cover"
            />
            <h4 className="  font-semibold text-lg text-cblack !leading-[1]">
              {profileData?.first_name + " " + profileData?.last_name} <br />{" "}
              <div className="flex items-center gap-1">
                <span className="text-secondary text-sm  font-medium">
                  {profileData?.location}
                </span>{" "}
                <span className="text-sm text-secondary">|</span>
                <span className="text-secondary text-sm  font-medium">{profileData?.role}</span>
              </div>
            </h4>
          </div>
          <div>
            <button
              onClick={() => document.getElementById('editModal').classList.remove('hidden')}
              className="!px-3 !shrink-0 !py-1 flex h-[30px] justify-start items-center gap-1 rounded-full font-semibold text-sm text-secondary border border-secondary"
            >
              Edit{" "}
              <span>
                <img src={editimg} alt="" />
              </span>
            </button>
            <div id="editModal" className="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-[550px] w-full">
                <h2 className="text-xl font-bold mb-4 text-black text-left">Edit Profile</h2>
                <div className="flex flex-wrap gap-5 relative z-10 text-left">
                  <div className="md:basis-[48%] basis-[100%]">
                    <label htmlFor="firstName" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Role ( Student or Employee )</label>
                    <input value={role} type="text" id="firstName" name="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Software Engineer" onChange={(e) => {
                      setRole(e.target.value)
                    }} />
                  </div>
                  <div className="md:basis-[48%] basis-[100%]">
                    <label htmlFor="lastName" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">University</label>
                    <input value={university} type="text" id="lastName" name="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="IIT Delhi" onChange={(e) => {
                      setUniversity(e.target.value)
                    }} />
                  </div>
                  <div className="md:basis-[100%] basis-[100%]">
                    <label htmlFor="lastName" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Upload Profile</label>
                    <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent relative hover:bg-[rgb(45 178 196 / 31%)] ">
                      <input type="file" id="" name="" className="opacity-0 absolute w-full left-0 h-full z-10" placeholder="IIT Delhi" />
                      <span className="absolute inline-block w-[30px] left-1/2 -translate-x-1/2 top-0 flex items-center gap-2 w-full h-full justify-center"><img src={uploadIcon} alt="" className="w-[30px] h-full object-contain" /> <span className="flex-shrink-0">upload your picture</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-7 relative z-10">
                  <button
                    type="button"
                    onClick={() => document.getElementById('editModal').classList.add('hidden')}
                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 max-w-[150px] w-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80 max-w-[150px] w-full"
                    onClick={() => {
                      handleProfileEdit();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-10 border-cborder border-2  rounded-3xl p-4">
          <div className="  flex justify-between">
            <p className=" 2xl:text-2xl md:text-lg font-semibold max-md:text-2xl mt-2 text-start">
              Personal Information
            </p>
            <button
              onClick={() => document.getElementById('editPersonalInfoModal').classList.remove('hidden')}
              className="!px-3 !shrink-0 !py-1 flex h-[30px] justify-start items-center gap-1 rounded-full font-semibold text-sm text-secondary border border-secondary"
            >
              Edit{" "}
              <span>
                <img src={editimg} alt="" />
              </span>
            </button>
            <div id="editPersonalInfoModal" className="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg text-left max-w-[764px] w-full relative">
                <h2 className="text-xl font-bold mb-4 text-black">Edit Personal Information</h2>
                <div>
                  <div className="flex flex-wrap gap-5 relative z-10">
                    <div className="md:basis-[48%] basis-[100%]">
                      <label htmlFor="firstName" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">First Name</label>
                      <input value={firstName} type="text" id="firstName" name="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Subham" onChange={(e) => {
                        setFirstName(e.target.value)
                      }} />
                    </div>
                    <div className="md:basis-[48%] basis-[100%]">
                      <label htmlFor="lastName" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Last Name</label>
                      <input value={lastName} type="text" id="lastName" name="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Mukherjee" onChange={(e) => {
                        setLastName(e.target.value)
                      }} />
                    </div>
                    <div className="md:basis-[48%] basis-[100%]">
                      <label htmlFor="phoneNumber" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input value={'+91' + user.student?.phone_num} type="tel" id="phoneNumber" name="phoneNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="+91 58741269" onChange={(e) => {
                      }} />
                    </div>
                    <div className="md:basis-[48%] basis-[100%]">
                      <label htmlFor="phoneNumber" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Location</label>
                      <input value={location} type="text" id="location" name="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="New demo city, New Street, UK" onChange={(e) => {
                        setLocation(e.target.value)
                      }} />
                    </div>
                    <div className="md:basis-[48%] basis-[100%]">
                      <label htmlFor="phoneNumber" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">  Role (Student or Employee) </label>
                      <input value={role} type="text" id="location" name="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Software Engineer" onChange={(e) => {
                        setRole(e.target.value)
                      }} />
                    </div>
                    <div className="md:basis-[48%] basis-[100%]">
                      <label htmlFor="phoneNumber" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">University</label>
                      <input value={university} type="text" id="location" name="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="National University UK" onChange={(e) => {
                        setUniversity(e.target.value)
                      }} />
                    </div>
                  </div>
                  <div className="flex justify-end mt-7 relative z-10">
                    <button
                      type="button"
                      onClick={() => document.getElementById('editPersonalInfoModal').classList.add('hidden')}
                      className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 max-w-[150px] w-full"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80 max-w-[150px] w-full"
                      onClick={() => {
                        handleProfileEdit();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div>

                </div>
                <span className="glow_elements_con top-0 -right-4 !opacity-[10%] max-md:hidden"></span>
              </div>
            </div>
          </div>
          <form className=" mt-2 sm:w-8/12  ">
            <div className=" mt-4 flex gap-5 justify-between items-start">
              <div className=" text-start mt-2 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  First Name
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {profileData.first_name}
                </h4>
              </div>
              <div className=" text-start mt-2 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  Last Name
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your Last Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {profileData.last_name}
                </h4>
              </div>
            </div>
            <div className=" mt-2 flex gap-5 justify-between items-start">
              <div className=" text-start mt-1 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  Email
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {user.email}
                </h4>
              </div>
              <div className=" text-start mt-1 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  Phone Number
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {user.student?.phone_num}
                </h4>
              </div>
            </div>
            <div className=" mt-2 flex gap-5 justify-between items-start">
              <div className=" text-start mt-1 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  Location
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {profileData?.location ? profileData?.location : 'Not Available'}
                </h4>
              </div>
              <div className=" text-start mt-1 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  Role (Student or Employee)
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {profileData?.role ? profileData?.role : 'Not Available'}
                </h4>
              </div>
            </div>
            <div className=" mt-2 flex gap-5 justify-between items-start">
              <div className=" text-start mt-1 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  University
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {profileData?.university ? profileData?.university : 'Not Available'}
                </h4>
              </div>
              <div className=" text-start mt-1 flex-1">
                <label className=" text-lg text-secondary font-semibold">
                  Course Name
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  {profileData?.free_course_name && profileData?.free_course_name.length > 0 ? profileData?.free_course_name.flat().join(", ") : 'N/A'}
                </h4>
              </div>
            </div>
            <div className=" text-start mt-4 flex-1">
              <span className="text-secondary font-bold text-base flex gap-3 items-center">
                Change Password
                <div className={`toggle-button ${isOn ? "on" : "off"}`} onClick={toggle}>
                  <div className="toggle-knob"></div>
                </div>
              </span>
            </div>
            {/* <div className=" mt-2 flex gap-5 justify-between items-start">
              <div className=" text-start mt-1">
                <label className=" text-lg text-secondary font-semibold">
                  Password
                </label>{" "}
                <h4
                  type="text"
                  placeholder="Your First Name"
                  className=" text-cblack text-sm   font-medium   mt-1  w-full"
                >
                  Jane
                </h4>
              </div>
            </div> */}
          </form>
        </div>
        <ToastContainer />
        {isOn && <div id="changePassword" className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-[764px] w-full relative">
            <h2 className="text-xl font-bold mb-4 text-black text-left">Change your current Password</h2>
            <div className="flex flex-wrap gap-5 relative z-10 text-left">
              <div className="md:basis-[48%] basis-[100%]">
                <label htmlFor="oldpassword" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Old Password</label>
                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="text" id="oldpassword" name="oldpassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Enter your old password" />
                {oldPasswordError && <span style={{ color: 'red' }}>{oldPasswordError}</span>}
              </div>
              <div className="md:basis-[48%] basis-[100%]">
                <label htmlFor="newpassword" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">New Password</label>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="text" id="newpassword" name="newpassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Enter your new password" />
                {newPasswordError && <span style={{ color: 'red' }}>{newPasswordError}</span>}
              </div>
              <div className="md:basis-[48%] basis-[100%]">
                <label htmlFor="confirmpassword" className="block lg:text-lg text-base font-semibold text-gray-700 mb-2">Confrim Password</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" id="confirmpassword" name="confirmpassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-primary border-solid h-10 border px-2 outline-0 focus:border-0 focus:shadow-none transition-all bg-transparent" placeholder="Confrim your new password" />
              </div>
              {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
            </div>
            <div className="flex justify-end mt-7 relative z-10">
              <button
                type="button"
                onClick={() => { document.getElementById('changePassword').classList.add('hidden'); setIsOn(false) }}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 max-w-[150px] w-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80 max-w-[150px] w-full"
                onClick={() => {
                  let hasError = false;
                
                  if (!oldPassword) {
                    setOldPasswordError('Please enter old password');
                    hasError = true;
                    setTimeout(() => setOldPasswordError(''), 2000);
                  }
                
                  if (!newPassword) {
                    setNewPasswordError('Please enter new password');
                    hasError = true;
                    setTimeout(() => setNewPasswordError(''), 2000);
                  }
                
                  if (newPassword !== confirmPassword) {
                    setPasswordError('New Password and Confirm Password must be the same');
                    hasError = true;
                    setTimeout(() => setPasswordError(''), 2000);
                  }
                
                  if (hasError) {
                    return; // Stop execution if any error exists
                  }
                
                  handleProfileEdit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>}
      </section>

    </div>
  );
};

export default ProfileComp;
