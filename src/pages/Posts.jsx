import axios from "../utils/axiosClient";
import { useState, useEffect } from "react";
import Card from "../components/partials/Card";
import { Link } from "react-router-dom";

function Posts(){
  const [posts, setPosts] = useState([]);

  const getPosts = async (url) => {
    const data = await axios.get(url);
    setPosts(data.data)
  }
  useEffect(() =>{
    getPosts('/posts')
  },[])
  return(
    <div className="container">
      <h1>Posts</h1>
      <Link to="/posts/create">Crea post</Link>
      <Card
        posts={posts}
      />
    </div>
  )
}

export default Posts