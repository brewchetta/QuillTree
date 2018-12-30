import React from 'react'

const StoryPageOptions = (props) => {

  const renderPageOptions = () => {
    if (props.pages) {
      return props.pages.sort((a,b) => a.number - b.number).map(page => {
        return (
          <option key={page.id} value={page.number}>{page.number}</option>
        )
      })
    }
  }

  return (
    <>
    <br/>
    <p>Select page: </p>
    <select onChange={props.handlePageSelect}>
      <option value=''></option>
      {renderPageOptions()}
    </select>
    </>
  )

}

export default StoryPageOptions
