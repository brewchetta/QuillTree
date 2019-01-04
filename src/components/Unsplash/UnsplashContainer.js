import React from 'react'
import UnsplashForm from './UnsplashForm'
import UnsplashButton from './UnsplashButton'
import UnsplashFetch from './UnsplashFetch'
const fetchPhotos = UnsplashFetch.fetchPhotos

export default class UnsplashRouter extends React.Component {

  state = {
    formOpen: false,
    searchTerm: '',
    searchResults: [],
    pageNum: 1
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetchPhotos(this.state.searchTerm, this.state.pageNum)
    .then(r => {console.log(r); return r})
    .then(response => this.setState({ searchResults: response.results, pageNum: this.state.pageNum + 1 }))
  }

  handleToggleForm = () => {
    this.setState({ formOpen: !this.state.formOpen })
  }

  selectImage = (event) => {
    const image = this.state.searchResults[event.target.dataset.index]
    const parsedImage = { url: image.urls.regular, credit: image.user.name, credit_link: image.user.links.html }
    this.props.updateImage(parsedImage)
    this.setState({ formOpen: false, searchTerm: '', pageNum: 1, searchResults: [] })
  }

  renderUnsplashForm = () => {
    if (this.state.formOpen) {
      return (
        <UnsplashForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleToggleForm={this.handleToggleForm}
        searchTerm={this.state.searchTerm}
        searchResults={this.state.searchResults}
        selectImage={this.selectImage}
         />
      )
    } else { return null}
  }

  render() {
    return(
      <div>

        {this.renderUnsplashForm()}

        <UnsplashButton
        className='unsplash-button'
        handleToggleForm={this.handleToggleForm}
        formOpen={this.state.formOpen} />

      </div>
    )
  }
}
