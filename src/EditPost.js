import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DataContext from './Context/DataContext';

const EditPost = () => {
    const { posts, editTitle, editBody, setEditTitle, setEditBody, handleEdit}=useContext(DataContext)
    const { id } = useParams()
    const updatedpost = posts.find(post => post.id.toString() === id)
    useEffect(
        () => {
            if (updatedpost) {
                setEditTitle(updatedpost.postTitle)
                setEditBody(updatedpost.postBody)
            }
        },[updatedpost,setEditTitle,setEditBody]
    )

    return (
        <main className='new-post'>
            <h1>Edit Post</h1>

            <article>
                {
                    updatedpost &&
                    <div className='updatedpost'>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <TextField
                                fullWidth
                                label="Title"
                                id="fullWidth"
                                sx={{
                                    '& label': { color: '4b0738' },
                                    '& input': { color: 'black' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'green' },
                                        '&:hover fieldset': { borderColor: 'darkgreen' },
                                        '&.Mui-focused fieldset': { borderColor: '0c6f52' }
                                    }
                                }}
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}

                            />

                            <br /><br />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Post-Content"
                                fullWidth
                                multiline
                                maxRows={4}
                                sx={{
                                    '& label': { color: '4b0738' },
                                    '& input': { color: 'black' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'green' },
                                        '&:hover fieldset': { borderColor: 'darkgreen' },
                                        '&.Mui-focused fieldset': { borderColor: '0c6f52' }
                                    }
                                }}
                                value={editBody}
                                onChange={(e) => { setEditBody(e.target.value) }}
                            />
                            <br /><br />

                            <Button type='submit' onClick={()=>handleEdit(updatedpost.id)}variant="contained" endIcon={<SendIcon />} style={{ color: 'white', backgroundColor: 'green' }}>
                                Re - Post
                            </Button>
                        </form>
                    </div>
                }
                {
                    !updatedpost &&
                    <div>
                        <h2>No Posts Found!!!</h2>


                    </div>
                }
            </article>

        </main>
    )
}

export default EditPost
