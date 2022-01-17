import React from 'react'

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center ma' style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="absolute mt2" style={{maxWidth: '75%'}}>
                <img src={imageUrl} alt='' style={{maxHeight: '300px'}} />
            </div>
        </div>
    )
}

export default FaceRecognition