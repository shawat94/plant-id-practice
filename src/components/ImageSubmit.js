import { Button } from 'react-bootstrap'
import React from 'react'

const ImageSubmit = ({ submitImage }) => {
    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const fileInputRef = React.useRef(null)

    const handleInputChange = (event) => {
        const fileUpload = event.target.files[0]
        submitImage(fileUpload)
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Upload plant Image
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default ImageSubmit