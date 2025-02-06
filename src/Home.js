import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './Context/DataContext'

const Home = () => {
  const {searchResults,isLoading,fetchError}=useContext(DataContext)
  return (
    <div className='home'>
      
      {isLoading && <p> Loading .........</p>}

      {!isLoading &&  fetchError && <p style={{color:'red'}}>{fetchError}</p>}
      {!fetchError && !isLoading && (searchResults.length?<Feed posts={searchResults}/>:
          <p>No posts to display</p>)}
          

    </div>
  )
}

export default Home
