import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import FormCreate from "./pages/Form";
import PostDetails from "./pages/PostDetails";
import { PostsProvider } from "./contexts/PostsContext";
import { AuthProvider } from "./contexts/AuthContext";
import PrivatePage from "./middlewares/PrivatePage";
import Login from "./pages/Login";

function App() {
  return(
    <BrowserRouter>
      <PostsProvider>
        <AuthProvider>

          <Routes>
            <Route path="/" element={<Layout />}>
              
              <Route index element={<Home />} />

              <Route path="login" element={<Login/>} />
  
              <Route path="posts">
  
                <Route index element={<Posts/>} />
                <Route path=":slug" element={<PostDetails />} />
                
              </Route>

            </Route>

            <Route path="/" element={
              <PrivatePage>
                <Layout />
              </PrivatePage>
            }>
            
              <Route path="posts">

                <Route path="create" element={<FormCreate />} />

                <Route path="edit/:slug" element={<FormCreate />} />
                
              </Route>
              
            </Route>
            
          </Routes>

        </AuthProvider>
      </PostsProvider>
    </BrowserRouter>
  )
}

export default App
