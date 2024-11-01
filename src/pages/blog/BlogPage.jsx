import React, { useEffect, useState } from "react";
import BlogDetail from "../../components/blog/BlogDetail";
import Banner from "../../components/Program/Banner";
import SearchBar from "../../components/searchbar/SearchBar";
import TabsComp from "../../components/Tabs/TabsComp";
import BlogsCards from "../../components/blog/BlogsCards";
import WaveBanner from "../../components/blog/WaveBanner";
import BlogReadPagination from "../../components/allcarasol/BlogReadPagination";
import { GetBlogCategory, GetBlogs, GetBlogsByCategory } from "../../services/Blog.service";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const getBlogCategory = async () =>{
      try{
        const blogCategory = await GetBlogCategory();
        setCategory(blogCategory?.results);
      }catch(error){
        console.log(error);
      }
    }

    // getBlogs();
    getBlogCategory();
  }, []);

  useEffect(()=>{
    if(category && category?.length > 0){
      setSelectedCat({
        id: 0,
        group_name: "All"
    })
    }
  },[category])

  const getBlogByCategory = async (id) =>{
    try{
      const blogs = await GetBlogsByCategory(id);
      setBlogs(blogs?.results)
    }catch(error){
      console.log(error);
    }
  }

  const getBlogs = async () => {
    try {
      const blogData = await GetBlogs();
      const sortedBlogs = blogData?.results.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBlogs(sortedBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(selectedCat?.id === 0){
      getBlogs();
    }
  },[selectedCat])

  

  useEffect(()=>{
    getBlogByCategory(selectedCat?.id)
  },[selectedCat])


  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.text.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className=" pb-10">
      <div style={{background: 'linear-gradient(rgb(45 124 196 / 8%) 0%, rgba(45, 151, 196, 0) 100%)'}}>
        <div className="margin_for_header">
          <WaveBanner />
        </div>
      </div>
      <div className=" relative -top-5">
        {" "}
        <SearchBar setSearchQuery={setSearchQuery}/>
      </div>
      <TabsComp category={category} setSelectedCat={setSelectedCat} selectedCat={selectedCat}/>

      <BlogDetail blogs={filteredBlogs} />
      <BlogReadPagination blogs={filteredBlogs} />
    </div>
  );
};

export default BlogPage;
