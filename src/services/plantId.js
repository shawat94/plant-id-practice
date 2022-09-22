import axios from 'axios'
const config = require('../config')

const baseUrl = 'https://plant.id/api/v2'

let key = process.env.REACT_APP_PLANTID_KEY

const submitImage = async (images) => {
    console.log(images)

    console.log('Submitting image')
    console.log(key)

    const requestConfig = {
        headers: {
            'api-key': key,
            'content-type': 'application/json'
        }
    }

    const requestObj = {
        'images': [images],
        'api-key': key
    }

    const response = await axios.post(`${baseUrl}/identify`, requestObj, requestConfig)
    console.log(response.data.suggestions)
    return response
}

export default { submitImage }