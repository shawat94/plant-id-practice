import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import PlantIdService from '../services/plantId'
import CoordinateSubmit from './CoordinateSubmit'

const ImageSubmit = ({ setSelectedImages, selectedImages }) => {

    const [plantIdentity, setPlantIdentity] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    
    const submitImage = async () => {
        let encodedImage = await Promise.all(selectedImages.map((image) => convertImageToBase64(image)))
        console.log(encodedImage)
        let response = await PlantIdService.submitImage(encodedImage, latitude, longitude)
        let suggestions = response.data.suggestions
        setPlantIdentity(suggestions)
    }

    const convertImageToBase64 = (image) => {
            return new Promise((resolve, reject) => {
                var fileReader = new FileReader()
                fileReader.readAsDataURL(image)
                fileReader.onload = () => {
                    resolve(fileReader.result.split(',')[1])
                }
                fileReader.onerror = (error) => {
                    console.log('Error reading image: ', error)
                    reject(error)
                }
            }
        )
    }   

    return (
        <div>
            {selectedImages && (
                <div>
                    {selectedImages.map((image) => <img alt="uploaded image" width={"250px"} src={URL.createObjectURL(image)} />)}
                    <br/>
                    <button onClick={ ()=> {
                        setSelectedImages(null) 
                        setPlantIdentity(null)
                    }}>Remove</button> 
                </div>
            )}
            <br/>

            <input
                type="file"
                multiple
                onChange={(event) => {
                    console.log(Object.keys(event.target.files).map((key) => event.target.files[key]))
                    setSelectedImages(Object.keys(event.target.files).map((key) => event.target.files[key]))
                    console.log(selectedImages)
                }}
            />
            <br/>
            <br/>
            <CoordinateSubmit latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
            <br/>
            <button onClick={()=>submitImage()}>
                Identify
            </button>
            <br/>
            <h2>Predictions:</h2>
            {plantIdentity && plantIdentity.map(suggestion => (
            <div>
                <p>{`Plant name: ${suggestion.plant_name}`}</p>
                <p>{`Probability: ${suggestion.probability}`}</p>
                <br/>
            </div>
        ))}
        </div>
    )
}

export default ImageSubmit