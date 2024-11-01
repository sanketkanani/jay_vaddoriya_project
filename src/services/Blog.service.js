import axiosInstance from "./config/ApiConfig";

const GET_BLOG_URL = "/website-management/blogs/";
const GET_BLOG_CATEGORY = "/website-management/all-group-blogs";
const GET_BLOGS_BY_CAT = "website-management/blogs-by-group";

export const GetBlogs = async () => {
  try {
    const response = await axiosInstance.get(GET_BLOG_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const GetBlog=async (id)=>{
  try{
    const response=await axiosInstance.get(GET_BLOG_URL+id+"/");
    return response.data;
  }
  catch(error){
    throw error;
  }
}


export const GetBlogCategory = async () =>{
  try{
    const response = await axiosInstance.get(GET_BLOG_CATEGORY);
    return response.data;
  }catch(error){
    throw error;
  }
}

export const GetBlogsByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(GET_BLOGS_BY_CAT + `/?group_id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




