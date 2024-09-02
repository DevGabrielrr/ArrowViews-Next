import axios from 'axios'

const axiosFetch = axios.create({
  baseURL: 'http://localhost:3000/serie.json',
  headers: {
    'Content-Type': 'application/json',
  }
})
export default axiosFetch;