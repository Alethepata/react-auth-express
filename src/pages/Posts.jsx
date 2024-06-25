import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/partials/Card";
import { Link } from "react-router-dom";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL

function Posts(){
  const [posts, setPosts] = useState([]);

  const getPosts = async (url) => {
    const data = await axios.get(url);
    setPosts(data.data)
  }
  useEffect(() =>{
    getPosts(`${baseApiUrl}/posts`)
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