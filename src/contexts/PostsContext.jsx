import axios from "../utils/axiosClient";
import { createContext, useContext, useEffect, useState } from "react";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {

    const [categories, setCatgories] = useState([]);
    const [tags, setTags] = useState([]);
    
    const getApi = async () => {
        const allCategories = await axios.get('/categories');
        const allTags = await axios.get('/tags');
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