import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="absolute mt2" style={{ maxWidth: '75%' }}>
                <img id='inputImage' src={imageUrl} alt='' style={{ maxHeight: '300px' }} />
                <div
                    className='bounding-box'
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                ></div>
            </div>
        </div>
    )
}

export default FaceRecognition