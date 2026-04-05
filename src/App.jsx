import { useEffect, useState } from "react";
import supabase from "./supabase";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePost from "./components/UpdatePost";

const App = () => {
    const [blogs, setBlogs] = useState(null);
  const [success, setSuccess] = useState(null);
    // fetchingData();
  const fetchingData = async () => {
    const { data, error } = await supabase.from("blog").select("*");

    error && console.log(error);
    data && setBlogs(data);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home fetch={fetchingData} blogs={blogs} setBlogs={setBlogs} success={success} setSuccess={setSuccess} />} />
        <Route path="/create" element={<CreatePost fetch={fetchingData} />} />
        <Route path="/update/:id" element={<UpdatePost fetch={fetchingData} />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
