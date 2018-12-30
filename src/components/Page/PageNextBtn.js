import React from 'react'
import { Link } from 'react-router-dom'

// Determines whether there's a next page and renders link
const PageNextBtn = (props) => {

  const pageNum = props.page.number
  const nextPage = pageNum ? props.story.pages.find(page => page.number === pageNum - 1 ) : null

  if (pageNum && nextPage) {
    return (
      <Link
      key={nextPage.id}
      to={`/stories/${props.story.id}/page/${nextPage.number}`}
      >Next Page</Link>
    )
  } else { return null }
}

export default PageNextBtn
