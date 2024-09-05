import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Nagivation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import ParticlesBg from 'particles-bg'

function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [age, setAge] = useState({});

    const guessAge = (data) =>{
    const guessedAge = data.outputs[0].data.concepts[0]
      return {
        name: guessedAge.name,
        value: toPercentage(guessedAge.value)
      }
}

function toPercentage(num, decimalPlaces = 2) {
  return `${(num * 100).toFixed(decimalPlaces)}%`;
}

  const displayAge = (age) =>{
    console.log(age);
    setAge(age);
  }

  const onInputChange = (event) =>{
    setInput(event.target.value);
  }

  const onButtonSubmit = () =>{
    
    
    setImageUrl(input);

    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = '046005d92a954fb18b233e95a94cd304';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'patryk21';       
    const APP_ID = 'my-first-application-l0l4zo';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'age-demographics-recognition';
    //const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = input;

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

    

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => (displayAge(guessAge((result)))))
        .catch(error => console.log('error', error));
        
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={{position: "absolute", zIndex: -1, top: 0, left: 0}} color="#FFFFFF"  num={280}/>
      <Navigation />
      <SignIn />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange = {onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition age={age} imageUrl={imageUrl}/>
    </div>
  );
}

export default App;
