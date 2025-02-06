import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './Context/DataContext'

const Navbar = () => {
  const {search,setSearch}=useContext(DataContext)
  return (
    <nav>
      <form action="" onSubmit={(e)=>{e.preventDefault()}}>
        <label htmlFor="search">Search Posts  </label>
        <input type="text" placeholder='Search Posts'
        id='search' value={search} onChange={(e)=>{setSearch(e.target.value)}}

        />
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

    </nav>
  )
}

export default Navbar
