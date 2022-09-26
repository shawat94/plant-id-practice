import React, { useState } from 'react'
import PlantIdService from '../services/plantId'
import CoordinateSubmit from './CoordinateSubmit'
import Prediction from './Prediction'
import { Button, Box } from '@mui/material'

const ImageSubmit = ({ setSelectedImages, selectedImages }) => {

    const [plantIdentity, setPlantIdentity] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const fileInput = React.useRef()

    const predTextStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '5vw',
        marginBottom: '0px'
    }

    const inputTextStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '3vw'
    }

    const boxStyle = {
        border: '2px solid grey',
        backgroundColor: '#f0fff7',
        borderRadius: '10px',
        height: '40vh',
        position: 'relative'
    }

    const inputButtonStyle = {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }

    const hiddenInputButtonStyle = {
        display: 'none'
    }

    const identifyButtonStyle = {
        paddingTop: '20px'
    }
    
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
            <br/>
            <div style={{padding: '8px'}}>
                <Box style={boxStyle}>
                    <p style={inputTextStyle}>Select one or more images of the plant to be identified below</p>
                        {selectedImages && (
                        <div>
                            {selectedImages.map((image) => <img alt="uploaded image" width="60px" src={URL.createObjectURL(image)} />)}
                            <br/>
                            <Button variant="outlined" onClick={()=> {
                                setSelectedImages(null) 
                                setPlantIdentity(null)
                            }}>Remove</Button> 
                        </div>
                        )}
                    <Button style={inputButtonStyle} variant="outlined" onClick={()=>fileInput.current.click()}>
                        Upload Photos
                    </Button>
                    <input
                        style={hiddenInputButtonStyle}
                        ref={fileInput}
                        type="file"
                        multiple
                        onChange={(event) => {
                            console.log(Object.keys(event.target.files).map((key) => event.target.files[key]))
                            setSelectedImages(Object.keys(event.target.files).map((key) => event.target.files[key]))
                            console.log(selectedImages)
                        }}
                    />
                </Box>
            </div>
            <CoordinateSubmit latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
            <div style={identifyButtonStyle}>
                <Button variant="contained" onClick={()=>submitImage()}>
                    Identify
                </Button>
            </div>
            {plantIdentity && <h2 style={predTextStyle}>Predictions:</h2>}
            {plantIdentity && plantIdentity.map(suggestion => (
                <div>
                    <Prediction suggestion={suggestion}/>
                </div>
        ))}
        </div>
    )
}

export default ImageSubmit