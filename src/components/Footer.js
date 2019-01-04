import React from 'react'

const Footer = (props) => {

  return (
      <footer>
      <div>
        <p>© Chett Tiller 2019</p>
      </div>
      <div id='photo-credit'>
        <p>Photo: <a
        target='_blank'
        rel="noopener noreferrer"
        href={props.currentPhoto.credit_link}>{props.currentPhoto.credit}</a> | <a
        target='_blank'
        rel="noopener noreferrer"
        href='http://unsplash.com'>Unsplash</a></p>
      </div>
      </footer>
  )
}

export default Footer
