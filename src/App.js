import logo from './logo.svg';
import './App.css';
import './components/ImageSubmit'
import ImageSubmit from './components/ImageSubmit';
import PlantIdService from './services/plantId'
import { useState } from 'react'
import { Container } from '@mui/material'
const config = require('./config')

function App() {

  const [selectedImages, setSelectedImages] = useState(null)

  const textStyle = {
    fontFamily: 'Crimson Text',
    marginBottom: '0px',
    marginTop: '60px',
    fontSize: '10vw'
}

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1 style={textStyle}>Plant Identifier</h1>
        <ImageSubmit selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
      </Container>
    </div>
  );
}

export default App;
