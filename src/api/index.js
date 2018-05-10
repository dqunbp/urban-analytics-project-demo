import axios from '../api/client'

export const api = {

    fetchArea() {
        const url = `/select`
        return axios.post(url)
    }
}