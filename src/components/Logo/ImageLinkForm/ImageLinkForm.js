import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, input, onSubmit }) => {
    return (
        <div>
            <p className='f3' style={{ textAlign: 'center' }}>
                {'This Magic Brain will detect faces in your pictures. Git it a try.'}
            </p>

            <div className='center form pa4 br3 shadow-5' style={{ maxWidth: '40%' }}>

                <input
                    style={{ backgroundColor: 'white' }}
                    className='f4 pa2 w-80 center'
                    type='text'
                    onChange={onInputChange}
                    value={input}
                />

                <button
                    className='w-50 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onSubmit}
                >
                    Detect
                </button>

            </div>
        </div>
    )
}

export default ImageLinkForm