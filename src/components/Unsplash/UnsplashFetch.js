import unsplashAuthKey from '../../secrets'

// Functions that will fetch from Unsplash
const UnsplashFetch = {

  fetchPhotos: (searchTerm, page) => {
    return fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=8`, {
      headers: {
        'Authorization': `Client-ID ${unsplashAuthKey}`
      }
    })
    .then(r=>r.json())
  }

}

export default UnsplashFetch
