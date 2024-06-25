import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function PostDetails(){
  const {slug} = useParams();

  const [post, setPost] = useState({});

  const [tags, setTags] = useState([]);

  
  const getPost =  async (url) => {
    const data = await axios.get(url);
    setPost(data.data)
    setTags(data.data.tags)
    
  }
  
  useEffect(() => {
    getPost(`/posts/${slug}`)
  }, [slug])

  return(
    <div className="container">

      <div>
        <h1>{post.title}</h1>
        <figure>
          <img src={post.image} alt={post.title} />
        </figure>
        <div className="text">
          <p>{post.content}</p>
          {
            tags.map((tag, index) => <span key={`form_datails_tag_${index}`}>#{tag.name}</span>)
          } 
        </div>
      </div>

      <div>
        <ul>
          <li>
            <Link to={`/posts/edit/${slug}`}>Modifica</Link>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default PostDetails