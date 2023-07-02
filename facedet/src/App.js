import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import ImageLinkForm from "./component/ImageLink/ImageLink";
import Rank from "./component/Rank/Rank";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import { Component } from "react";
import Clarifai from "clarifai";
import SignIn from "./component/SignIn/SignIn";
import Register from "./component/Register/Register";

const returnClarifaiJsonRequest = (image_URL) => {
  const PAT = "e13576e1332544daafd1ff0eb7a0deca";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "tchako";
  const APP_ID = "faceDet";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
  const IMAGE_URL = image_URL;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      image_url: "",
      box: {},
      route: "signin",
      IsSignIn: false,
      user : {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: '',
      }
    };
  }

  loadUser = (data) => {
    this.setState({
      user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  calcualteFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const theImage = document.getElementById("inputImage");
    const width = Number(theImage.width);
    const height = Number(theImage.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };


  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  onButtonSubmit = () => {
    this.setState(
      {
        image_url: this.state.input,
      },
      () => {
        // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
        // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
        // this will default to the latest version_id
        fetch(
          "https://api.clarifai.com/v2/models/face-detection/outputs",
          returnClarifaiJsonRequest(this.state.image_url)
        )
          .then((response) => response.json())
          .then((result) => {
            if(result){
              fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id
                })
              }).then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {
                  entries: count
                }))
              })
            }
            this.displayFaceBox(this.calcualteFaceLocation(result))
      })
          .catch((error) => console.log("error", error));
      }
    );
  };

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({IsSignIn: false})
    }else if( route === 'home'){
      this.setState({IsSignIn: true})
    }

    this.setState({
      route: route,
    });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg num={200} type="circle" bg={true} />

        <Navigation IsSignIn ={this.state.IsSignIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.image_url}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
