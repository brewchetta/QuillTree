import React from 'react'
import { Link } from 'react-router-dom'

const PageCards = (props) => {

  const renderPageCards = () => {
    return props.pages.map(page => {
      return (
        <Link key={page.id}
          to={`/stories/${props.story.id}/pages/${page.id}`}
          >{page.number}</Link>
      )
    })
  }

  return (
    <div>
      {renderPageCards()}
    </div>
  )

}

export default PageCards
