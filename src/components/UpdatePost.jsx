import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = ({ fetch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {id} = useParams()
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      setError("Please fill in all fields");
      return;
    }
    setError(null);

    const { data, error } = await supabase
      .from("blog")
      .update({ title, description }).eq("id", id).select();
    error && setError(error.message);

    setTitle("");
    setDescription("");
    setSuccess("Blog post updated successfully!");
    setTimeout(() => {
        setSuccess(null)
        navigate("/");
    }, 1000);
    fetch();
  };
  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        setError(error.message);
      } else {
        setTitle(data.title);
        setDescription(data.description);
      }
    };
    fetchBlog();
  }, [id]);


  return (
    <>
      <div className="update_container">
        <h1>Update Blog Post</h1>
        <form className="blog-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button type="submit" onClick={handleUpdate}>
            Update
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </>
  );
};

export default UpdatePost;
