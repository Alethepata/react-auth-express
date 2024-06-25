import { Link } from "react-router-dom";

function Card({posts}){
  return(
    <div className="card-container">
      {
        posts.map(post =>(
          <div key={`post_${post.id}`} className="card">
            
            <figure>
              <img src={post.image} alt={post.title} />
            </figure>
            
            <div className="text">

              <div className="title">
                <h3>{post.title}</h3>
                {
                    post.published === true ||
                    <span>Bozza</span>
                }
              </div>

              <div className="content margin">
                <p>{post.content}</p>
              </div>

              <div className="category">
                  <span>{post.category.name}</span>
              </div>

              <div className="tags margin">
                {
                  post.tags.map((tag, index) => <span key={`card_tag_${index}`}>#{tag.name}</span>)
                }
              </div>

              <div className="action">
                <Link to={`/posts/${post.slug}`}>Dettaglio</Link>
              </div>

            </div>
          </div>
        ))
      }
  </div>
  )
}
export default Card