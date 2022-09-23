import logo from './logo.svg';
import './App.css';
import './components/ImageSubmit'
import ImageSubmit from './components/ImageSubmit';
import PlantIdService from './services/plantId'
import { useState } from 'react'
const config = require('./config')

function App() {

  const [selectedImages, setSelectedImages] = useState(null)

  return (
    <div className="App">
      <h1>Plant Identifier</h1>
      <ImageSubmit selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
    </div>
  );
}

export default App;
