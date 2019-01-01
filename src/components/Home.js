import React from 'react'
import QuillTreeImage from '../assets/quill-tree-sil.png'

const Home = (props) => {

  return (
    <div id='home-main'>
      <h1 className='home-title'><img alt='I am tree' src={QuillTreeImage} /> QuillTree</h1>
      <div className='home-tile-container'>
        <p className='home-info'>Welcome to QuillTree, the premier storytelling medium on the internet!<br/> You can sign up 'here!' or log in 'here'!</p>
      </div>
    </div>
  )
}

export default Home
