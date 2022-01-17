import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai'
import ImageLinkForm from './components/Logo/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displaceBoxOnFace = (box) => {
    console.log(box)
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = async () => {
    await this.setState({ imageUrl: this.state.input })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.imageUrl)
      .then(response => this.displaceBoxOnFace(this.calculateFaceLocation(response)))

      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'register' || route === 'signin') {
      this.setState({ isSignedIn: false })
    } else  {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
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
          <Navigation
            onRouteChange={this.onRouteChange}
            isSignedIn={this.state.isSignedIn}
          />
        </div>
        {
          this.state.route === 'home'
            ? <>

              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                input={this.state.input}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition
                box={this.state.box}
                imageUrl={this.state.imageUrl}
              />
            </>
            : (
              this.state.route === 'signin'
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </>
    );
  }
}

export default App;
