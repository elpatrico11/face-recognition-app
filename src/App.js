import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Nagivation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'

function App() {

  const [input, setInput] = useState('');

  const onInputChange = (event) =>{
    console.log(event.target.value);
  }

  const onButtonSubmit = () =>{
    console.log('click');
    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = '046005d92a954fb18b233e95a94cd304';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'patryk21';       
    const APP_ID = 'my-first-application-l0l4zo';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    //const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    console.log(requestOptions, "yooo");

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={{position: "absolute", zIndex: -1, top: 0, left: 0}} color="#FFFFFF"  num={280}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange = {onInputChange} onButtonSubmit={onButtonSubmit} />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;
