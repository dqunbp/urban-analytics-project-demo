import axios from '../api/client'

export const api = {

    fetchArea(coordinates) {
        const url = `/select`
        return axios.post(url, { coordinates })
    }
}