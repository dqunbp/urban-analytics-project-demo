import axios from 'axios'
const backendServer = process.env.REACT_APP_API_URL || 'http://localhost:8080'

export default axios.create({
    baseURL: `${backendServer}/api`
})