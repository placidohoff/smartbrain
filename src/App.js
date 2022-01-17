import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Logo/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'cc768333a086456ca8f0eba2c620850b'
})

const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      imageUrl: ''
    }
  }



  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = async () => {
    await this.setState({ imageUrl: this.state.input })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.imageUrl)
       .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        },
        function (err) {
          console.log(err)
        }
      ).catch(err => console.log('Error'))
  }

  render() {
    return (
      <>

        <Particles
          className="particles"
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          options={{
            background: {
              color: {
                value: "#0d47a1",
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: false,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
        <div className='center' style={{ justifyContent: 'space-between' }}>
          <Logo />
          <Navigation />
        </div>
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          input={this.state.input}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
        />
      </>
    );
  }
}

export default App;
