/* import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";
import { format } from 'date-fns'
import api from '../api/posts'
 
const DataContext = createContext({})
*/


// export const DataProvider = ({ children }) => {

/*     const [posts, setPosts] = useState([
        {
            id: 1,
            postTitle: "My First Post",
            date: "February 03, 2025 12:00:00 PM",
            postBody: "This is my first post. Excited to start blogging!"
          },
          {
            id: 2,
            postTitle: "Web Development Tips",
            date: "February 06 , 2025 10:04:30 PM",
            postBody: "Always write clean and maintainable code for better collaboration. It is useful."
          },
          {
            id: 3,
            postTitle: "JavaScript Tricks",
            date: "February 03, 2025 12:15:00 PM",
            postBody: "Use 'const' and 'let' instead of 'var' for better scope management."
          },
          {
            id: 4,
            postTitle: "React Best Practices",
            date: "February 03, 2025 12:20:00 PM",
            postBody: "Keep components small and reusable for better maintainability."
          },
          {
            id: 5,
            postTitle: "hi",
            date: "February 04, 2025 11:08:12 PM",
            postBody: "hello"
          }
         
    ])
    const [search, setSearch] = useState('')
    const [searchResults, setsearchResults] = useState([])

    const [postTitle, setPosttitle] = useState('')
    const [postBody, setPostBody] = useState('')

    const [editTitle, setEdittitle] = useState('')
    const [editBody, setEditBody] = useState('')

    const navigate = useNavigate()

    const { width } = useWindowSize() */

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
   /*  const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts")
    useEffect(
        () => {
            setPosts(data)
        }, [data]
    ) */

    /* For Loading search Results */
  /*   useEffect(
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

         console.log(posts.length + "  " + id)
        const date = format(new Date(), 'MMMM dd , yyyy pp')
        const newpost = { id, postTitle, date, postBody }
        try {
            const response = await api.post("/posts", newpost)
            const existingPosts = [...posts, response.data]

            setPosts(existingPosts)

            localStorage.setItem("posts", JSON.stringify(existingPosts))
         

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
 */

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // Load posts from localStorage if available
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem("posts");
        return savedPosts ? JSON.parse(savedPosts) : [
            {
                id: 1,
                postTitle: "My First Post",
                date: "February 03, 2025 12:00:00 PM",
                postBody: "This is my first post. Excited to start blogging!"
            },
            {
                id: 2,
                postTitle: "Web Development Tips",
                date: "February 06, 2025 10:04:30 PM",
                postBody: "Always write clean and maintainable code for better collaboration."
            }
        ];
    });

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const navigate = useNavigate();

    // Save posts to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    // Filter search results
    useEffect(() => {
        const filteredResults = posts.filter(post =>
            post.postTitle.toLowerCase().includes(search.toLowerCase()) ||
            post.postBody.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? Math.max(...posts.map(post => Number(post.id))) + 1 : 1;
        const date = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, postTitle, date, postBody };

        setPosts([...posts, newPost]);
        setPostTitle('');
        setPostBody('');
        navigate('/');
    };

    const handleDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        navigate('/');
    };

    const handleEdit = (id) => {
        console.log("editing......");
    
        const date = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, postTitle: editTitle, date, postBody: editBody };
    
        const updatedPosts = posts.map(post =>
            post.id === id ? updatedPost : post
        );
    
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    
        console.log("edited......");
    
        setEditTitle('');
        setEditBody('');
        navigate('/');
    };
    

    return (
        <DataContext.Provider value={{
            posts, search, setSearch, searchResults,
            postTitle, setPostTitle, postBody, setPostBody, handleSubmit,
            handleDelete, editTitle, editBody, setEditTitle, setEditBody, handleEdit
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
