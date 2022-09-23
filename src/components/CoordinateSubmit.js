import React, { useState } from 'react'

const CoordinateSubmit = ({ latitude, longitude, setLatitude, setLongitude}) => {

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setLatitude(latitude)
            setLongitude(longitude)
            console.log(latitude, longitude)
        })
    }

    return (
        <div>
            <p>Set location lat/lon below to improve results</p>
            <label for='latitude'>Latitude</label>
            <input type='text' id='latitude' name='latitude' placeholder='Latitude' onChange={(event)=>setLatitude(event.target.value)} />
            <label for='longitude'>Longitude</label>
            <input type='text' id='longitude' name='longitude' placeholder='Longitude' onChange={(event)=>setLongitude(event.target.value)} />
            <br/>
            <button onClick={()=>{getCurrentLocation()}}>Locate me</button>
        </div>
    )
}

export default CoordinateSubmit
