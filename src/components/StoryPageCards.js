import React from 'react'
import { Link } from 'react-router-dom'

const PageCards = (props) => {

  const renderPageCards = () => {
    return props.pages.map(page => {
      return (
        <Link key={page.id}
          to='/users'
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
