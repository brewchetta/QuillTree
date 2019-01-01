import React from 'react'
import QuillTreeImage from '../assets/quill-tree-sil.png'
import { Link } from 'react-router-dom'

const Home = (props) => {

  return (
    <div id='home-main'>
      <h1 className='home-title'><img alt='I am tree' src={QuillTreeImage} /> QuillTree</h1>
      <div className='home-tile-container'>
        <p className='home-info'>QuillTree is a platform where storytellers share their creations. As a storyteller you can write stories, upload images for them, and share those stories with others. <br/><br/>To get started, sign up <Link to='/signup'>here</Link>.</p>
      </div>
    </div>
  )
}

export default Home
