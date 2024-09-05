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
