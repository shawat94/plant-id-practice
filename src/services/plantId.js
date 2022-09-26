import axios from 'axios'
const config = require('../config')

const baseUrl = 'https://plant.id/api/v2'

let key = process.env.REACT_APP_PLANTID_KEY

const submitImage = async (images, latitude, longitude) => {
    console.log(images)

    console.log('Submitting image')
    console.log(key)

    const requestConfig = {
        headers: {
            'api-key': key,
            'content-type': 'application/json'
        }
    }

    const requestObj = (latitude & longitude) ? 
    {
        'images': images,
        'latitude': latitude,
        'longitude': longitude
    } : 
    {'images': images}

    const response = await axios.post(`${baseUrl}/identify`, requestObj, requestConfig)
    console.log(response.data.suggestions)
    return response
}

export default { submitImage }