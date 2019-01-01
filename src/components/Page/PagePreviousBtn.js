import React from 'react'
import { Link } from 'react-router-dom'

// Determines whether there's a previous page and renders link
const PagePreviousBtn = (props) => {

  const pageNum = props.page.number
  const previousPage = pageNum ? props.story.pages.find(page => page.number === pageNum - 1 ) : null

  if (pageNum && previousPage && !props.edit) {
    return (
      <Link
      className='page-text-paginate'
      key={previousPage.id}
      to={`/stories/${props.story.id}/page/${previousPage.number}`}
      >◁ Previous Page</Link>
    )
  } else { return null }
}

export default PagePreviousBtn
