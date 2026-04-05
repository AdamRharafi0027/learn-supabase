import { useState } from "react";
import supabase from "../supabase";
import { Link } from "react-router-dom";

const Home = ({ fetch, blogs, setBlogs, success, setSuccess }) => {

  
  const handleDeleteBlog = async (id) => {
    const { data, error } = await supabase.from("blog").delete().eq("id", id);
    error && console.log(error);
    setSuccess("Blog post deleted successfully!");
    setTimeout(() => setSuccess(null), 2000);
    fetch()
  };

  return (
    <>
     <h1>Blogs</h1>
      {success && <p className="success">{success}</p>}
      <div className="container">
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              <div className="buttons">
                <button onClick={() => handleDeleteBlog(blog.id)}>
                  delete
                </button>
                <Link to={`/update/${blog.id}`}><button>update</button></Link>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home