import React from 'react'
import QuillTreeImage from '../assets/quill-tree-sil.png'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  credit = {
    url: 'https://images.unsplash.com/photo-1472448352019-15f4081b66a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1568&q=80',
    credit: 'Nikita Velakanin',
    credit_link: 'https://unsplash.com/@nikita_v'
  }

  componentDidMount() {
    if (this.props.setAppState && this.props.currentPhoto !== this.credit) {
      setTimeout(() => this.props.setAppState({ currentPhoto: this.credit }), 500)
    }
    console.log('currentPhoto is: ', this.props.currentPhoto)
  }

  render() {
    return (
      <div id='home-main'>
        <h1 className='home-title'><img alt='QuillTree' src={QuillTreeImage} /> QuillTree</h1>
        <div className='home-tile-container'>
          <p className='home-info'>QuillTree is a platform where storytellers share their creations. As a storyteller you can write stories, upload images for them, and share those stories with others. <br/><br/>To get started, sign up <Link to='/signup'>here</Link>.</p>
        </div>
      </div>
    )
  }
}

export default Home
