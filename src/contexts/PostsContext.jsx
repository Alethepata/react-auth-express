import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL


const PostsContext = createContext();


const PostsProvider = ({ children }) => {

    const [categories, setCatgories] = useState([]);
    const [tags, setTags] = useState([]);
    
    const getApi = async () => {
        const allCategories = await axios.get(`${apiBaseUrl}/categories`);
        const allTags = await axios.get(`${apiBaseUrl}/tags`);
        setCatgories(allCategories.data);
        setTags(allTags.data);
    }
    
    useEffect(() => {
        getApi()
    }, [])
    return (
        <PostsContext.Provider value={{
            tags,
            categories
        }}>
            {children}
        </PostsContext.Provider>
    )
}

const usePosts = () => {
    const value = useContext(PostsContext)
    return value
}

export { PostsProvider, usePosts }