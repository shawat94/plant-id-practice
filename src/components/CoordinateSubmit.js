import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

const CoordinateSubmit = ({ latitude, longitude, setLatitude, setLongitude}) => {

    const buttonStyle = {
        padding: 10
    }

    const textField = {
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }

    const boxStyle = {
        border: '2px solid grey',
        backgroundColor: '#f0fff7',
        borderRadius: '10px'
    }

    const textStyle = {
        fontFamily: 'Crimson Text',
        fontSize: '3vw'
    }

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setLatitude(latitude)
            setLongitude(longitude)
            console.log(latitude, longitude)
        })
    }

    return (
        <div style={{padding: '8px'}}>
            <Box sx={boxStyle}>
                <p style={textStyle} >Set location lat/lon below to improve results</p>
                <div>
                    <TextField sx={{...textField}} type='text' id='latitude' name='latitude' variant='filled' value={latitude} label='Latitude' onChange={(event)=>setLatitude(event.target.value)} />
                    <TextField sx={{...textField}} type='text' id='longitude' name='longitude' variant='filled' value={longitude} label='Longitude' onChange={(event)=>setLongitude(event.target.value)} />
                </div>
                <div style={buttonStyle}>
                    <Button variant="outlined" onClick={()=>{getCurrentLocation()}}>Locate me</Button>
                </div>
            </Box>
        </div>
    )
}

export default CoordinateSubmit
