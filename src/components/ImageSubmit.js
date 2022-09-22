import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import PlantIdService from '../services/plantId'

const ImageSubmit = ({ setSelectedImage, selectedImage }) => {

    const [plantIdentity, setPlantIdentity] = useState('')
    
    const submitImage = async () => {
        let encodedImage = await convertImageToBase64() 
        let response = await PlantIdService.submitImage(encodedImage)
        let suggestions = response.data.suggestions
        setPlantIdentity(suggestions)
    }

    const convertImageToBase64 = () => {
            return new Promise((resolve, reject) => {
                var fileReader = new FileReader()
                fileReader.readAsDataURL(selectedImage)
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
            {selectedImage && (
                <div>
                    <img alt="uploaded image" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <br/>
                    <button onClick={ ()=> {
                        setSelectedImage(null) 
                        setPlantIdentity(null)
                    }}>Remove</button> 
                </div>
            )}
            <br/>

            <input
                type="file"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0])
                }}
            />
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