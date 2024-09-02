import axios from 'axios'

const showsFetch = axios.create({
  baseURL: 'http://localhost:3000/shows.json',
  headers: {
    'Content-Type': 'application/json',
  }
})
export default showsFetch;