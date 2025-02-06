import React, {  useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DataContext from './Context/DataContext';

const NewPost = () => {
  const {postTitle,setPosttitle,postBody,setPostBody,handleSubmit}=useContext(DataContext)
  return (
    <main className='new-post'>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
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
          value={postTitle}
          onChange={(e) => setPosttitle(e.target.value)}

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
          value={postBody}
          onChange={(e)=>{setPostBody(e.target.value)}}
        />
        <br /><br />

        <Button type='submit' variant="contained" endIcon={<SendIcon />} style={{ color: 'white', backgroundColor: 'green' }}>
          Post
        </Button>
      </form>

    </main>
  )
}

export default NewPost
