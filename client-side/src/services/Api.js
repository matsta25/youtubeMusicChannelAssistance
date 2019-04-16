import axios from 'axios'

// const baseDomain = 'http://localhost:8081'
const baseDomain = '192.168.43.248:8081'

export default() => {
    return axios.create({
        baseURL: `${baseDomain}/api`
    })
}