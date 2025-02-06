import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DataContext from './Context/DataContext';

const PostPage = () => {
    const {posts, handleDelete }=useContext(DataContext)

    const { id } = useParams()
    const selectedPost = posts.find((post) => post.id.toString() === id)
    return (
        <main>
            <h1>PostPage</h1>

            <article>
                {
                    selectedPost &&
                    <div className='selectedpost'>
                        <h2>{selectedPost.postTitle}</h2><br />
                        <p>{selectedPost.date}</p>
                        <p>{selectedPost.postBody}</p>
                       <Link to={`/edit/${id}`} ><Button variant="outlined" className='editButton' style={{backgroundColor:'green',
                        
                       }} startIcon={<EditSharpIcon />}>
                            Edit
                        </Button></Link>
                        <Button variant="outlined" onClick={()=>handleDelete(selectedPost.id)} className='deleteButton'startIcon={<DeleteIcon />}>
                            Delete
                        </Button>                    
                    </div>
                }
                {
                    !selectedPost &&
                    <div>
                        <h2>No Posts Found!!!</h2>


                    </div>
                }
            </article>

        </main>
    )
}

export default PostPage
