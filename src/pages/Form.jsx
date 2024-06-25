import { useEffect, useState } from 'react';

import axios from "axios";

import {usePosts} from "../contexts/PostsContext"
import { useParams } from 'react-router-dom';


const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

function Form() {

    const [isPostExists, setIsPostExists] = useState(false);

    const {slug} = useParams();

    const [post, setPost] = useState({});


  
    const getPost =  async (url) => {
      const data = await axios.get(url);
        setPost(data.data)
        if (post) {
            setIsPostExists(true)
        }
      
    }
    
    useEffect(() => {
      getPost(`${apiBaseUrl}/posts/${slug}`)
    }, [slug])


    const { categories, tags } = usePosts();

    // const { title, image, content, categoryId, published} = post;
    
    // const dataDefault = {
    //     title,
    //     image,
    //     content,
    //     categoryId,
    //     published,
    //     tags:[]
    // } 
    // console.log(dataDefault);
    
    const dataDefault = {
        title: '',
        image:'',
        description: '',
        categoryId: '',
        publish: false,
        tags:[],
    } 


    const [postData, setPostData] = useState(dataDefault);

    const addPost = async (url, data) => {
        await axios.post(url, data);
    }
    // const editPost = async (url, data) => {
    //     await axios.put(url, data);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (isPostExists) {
        //     editPost(`${apiBaseUrl}/posts`, postData)
        // }

        addPost(`${apiBaseUrl}/posts`, postData);

        setPostData(dataDefault);

        

        
    }

    const addData = (key, newData) => {
        setPostData(data => ({...data, [key]: newData}))
    }

    const addTags = (tag) => {
        const currentTag = postData.tags;
        const newTags = currentTag.includes(tag) ? currentTag.filter(element => element !== tag) : [...currentTag, tag];
        addData('tags', newTags)
    }
    return (
        <div className="container">

            <h1>{isPostExists ? 'Modifica post':'Nuovo Post'}</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="title">Titolo</label>
                    <input
                        id="title"
                        type="text"
                        value={postData.title}
                        onChange={event => addData('title', event.target.value)}
                    />
                </div>

                <div className="margin">
                    <label htmlFor="image">Url Immagine</label>
                    <input
                        id="image"
                        type="text"
                        value={postData.image}
                        onChange={event => addData('image', event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="content">Descrizione</label>
                    <textarea
                        id="content"
                        value={postData.content}
                        onChange={event => addData('content', event.target.value)}
                    ></textarea>
                </div>

                <div className="margin">
                <label htmlFor="category">Scegli la categoria</label>
                    <select
                        id="category"
                        value={postData.categoryId}
                        onChange={event => addData('categoryId', Number(event.target.value))}
                    >
                        <option selected>Categoria</option>
                        {
                            categories.map((category, index) => (
                                <option
                                    key={`category_${index}`}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="check">
                    {
                        tags.map((tag, index) => (
                            <div key={`tag_${index}`}>
                                <input
                                    id="tags"
                                    type="checkbox"
                                    checked={postData.tags.includes(tag.id)}
                                    onChange={() => addTags(tag.id)}
                                />
                                <label htmlFor="tags">
                                  {tag.name}
                                </label>
                            </div>
                        ))
                    }
                </div>

                <div className="margin">
                    <input
                        id="publish"
                        type="checkbox"
                        checked={postData.published}
                        onChange={(event) => addData('published', event.target.checked)}
                    />
                    <label htmlFor="publish">
                      Pubblica
                    </label>
                </div>

                <button>Invia</button>
            </form>
        </div>
    )
}

export default Form