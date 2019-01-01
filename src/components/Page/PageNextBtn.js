import React from 'react'
import { Link } from 'react-router-dom'

// Determines whether there's a next page and renders link
const PageNextBtn = (props) => {

  const pageNum = props.page.number
  const nextPage = pageNum ? props.story.pages.find(page => page.number === pageNum + 1 ) : null

  if (pageNum && nextPage && !props.edit) {
    return (
      <Link
      className='page-text-paginate'
      key={nextPage.id}
      to={`/stories/${props.story.id}/page/${nextPage.number}`}
      >Next Page</Link>
    )
  }

  else if (props.page.number && props.user === props.currentUser && !props.edit) {
    return (
      <Link
      className='page-text-paginate'
      key={pageNum + 1}
      to={`/stories/${props.story.id}/page/${props.page.number}`}
      onClick={props.handleCreatePage}
      data-storyid={props.story.id}
      >Create New Page 🍂</Link>
    )
  }

  else { return null}
}

export default PageNextBtn
