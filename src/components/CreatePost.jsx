import { useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ fetch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (title === "" || description === "") {
      setError("Please fill in all fields");
      return;
    }
    setError(null);

    const { data, error } = await supabase
      .from("blog")
      .insert({ title, description });
    error && setError(error.message);

    setTitle("");
    setDescription("");
    setSuccess("Blog post created successfully!");
    setTimeout(() => {
      setSuccess(null);
      navigate("/");
    }, 1000);

    fetch();
  };

  return (
    <>
      <div className="create_container">
        <h1>Create new Blog Post</h1>
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
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </>
  );
};

export default CreatePost;
