import { NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

function Header() {
  
  const { logout, isLoggedIn } = useAuth();

  return(
    <header>
      <nav>
        <menu>

          <div>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/posts">Posts</NavLink></li>
          </div>

          <div>
            {
              isLoggedIn == true &&
              <li><button onClick={logout}>Log out</button></li>
            }
            {
              isLoggedIn == false &&
              <li><NavLink to="/login">Log In</NavLink></li>
            }
          </div>
          
        </menu>
      </nav>
    </header>
  )
}

export default Header