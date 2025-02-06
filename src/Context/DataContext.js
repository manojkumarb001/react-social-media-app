import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";
import { format } from 'date-fns'
import api from '../api/posts'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setsearchResults] = useState([])

    const [postTitle, setPosttitle] = useState('')
    const [postBody, setPostBody] = useState('')

    const [editTitle, setEdittitle] = useState('')
    const [editBody, setEditBody] = useState('')

    const navigate = useNavigate()

    const { width } = useWindowSize()

    /*  useEffect(()=>{
       const fetchPosts=async()=>{
         try{
         const response=await api.get("/posts")
         setPosts(response.data)
       
       }
       catch(err)
       {
         if(err.response){
           console.log(err.response.data)
           console.log(err.response.status)
           console.log(err.response.headers)
         }
         else{
           console.log("Error : "+err.message)
         }
       }
   
       }
       fetchPosts()
     },[]) */


    /* For custom hook demonstration */
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts")
    useEffect(
        () => {
            setPosts(data)
        }, [data]
    )

    /* For Loading search Results */
    useEffect(
        () => {
            const filterResults = posts.filter(post => (
                (post.postTitle.toLowerCase()).includes(search.toLowerCase()) ||
                (post.postBody.toLowerCase()).includes(search.toLowerCase())
            ))
            setsearchResults(filterResults.reverse())
        }
        , [posts, search]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = posts.length ? (Math.max(...posts.map(post => Number(post.id))) + 1).toString() : "1";

        // console.log(posts.length + "  " + id)
        const date = format(new Date(), 'MMMM dd , yyyy pp')
        const newpost = { id, postTitle, date, postBody }
        try {
            const response = await api.post("/posts", newpost)
            const existingPosts = [...posts, response.data]

            setPosts(existingPosts)

            localStorage.setItem("posts", JSON.stringify(existingPosts))
            // console.log("submit "+postTitle+" "+postBody) 

            // console.log(newpost)
            // console.log(posts)

            setPosttitle('')
            setPostBody('')
            navigate('/')
        }
        catch (err) {
            console.log("Error : " + err.message)
        }


    }
    const handleDelete = async (id) => {

        try {
            await api.delete(`/posts/${id}`)
            const item = posts.filter(post => post.id !== id)
            setPosts(item)
            console.log('deleted')
            navigate('/')
        }
        catch (err) {
            console.log("Error : " + err.message)
        }
    }
    const handleEdit = async (id) => {
        const date = format(new Date(), 'MMMM dd , yyyy pp')
        const updatedpost = { id, postTitle: editTitle, date, postBody: editBody }
        try {
            const response = await api.put(`/posts/${id}`, updatedpost)
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
            console.log("edited...")
            setEdittitle('')
            setEditBody('')
            navigate('/')
        }
        catch (err) {
            console.log("Error : " + err.message)
        }

    }
    return (
        <DataContext.Provider value={{
            width, posts, isLoading, fetchError, search, setSearch,
            postTitle, setPosttitle, postBody, setPostBody, handleSubmit,
            handleDelete, editTitle, editBody, setEdittitle, setEditBody, handleEdit, searchResults,
        }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataContext
