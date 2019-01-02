import React from 'react'

const UnsplashForm = (props) => {

  const renderImages = () => {
    return (
      props.searchResults.map(result => (
        <img
        key={result.id}
        data-index={props.searchResults.indexOf(result)}
        onClick={props.selectImage}
        alt={result.description}
        src={result.urls.small} />
      ))
    )
  }

  return (
    <div className='unsplash-form-container'>
      <form onSubmit={props.handleSubmit}>

        <input name='searchTerm'
        placeholder=' Type a Search Term'
        type='text'
        value={props.searchTerm}
        onChange={props.handleChange} />

        <button onClick={props.handleSubmit}>Search Unsplash.com</button>
        <br/>
        {props.searchResults.length ? <button onClick={props.handleSubmit}>More</button> : null}
        <button onClick={props.handleToggleForm}>Cancel</button>

        <div className='unsplash-form-image-container'>
        {renderImages()}
        </div>

      </form>
    </div>
  )
}

export default UnsplashForm
