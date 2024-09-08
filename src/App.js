import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/Nagivation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [age, setAge] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => data); // Not sure if you intended to log or process 'data', but it does nothing currently.
  }, [user.entries]);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const guessAge = (data) => {
    if (!data || !data.outputs || !data.outputs[0].data.concepts) {
      console.log("Invalid API response format");
      return { name: "Unknown", value: "0%" };
    }
    const guessedAge = data.outputs[0].data.concepts[0];
    return {
      name: guessedAge.name,
      value: toPercentage(guessedAge.value),
    };
  };

  function toPercentage(num, decimalPlaces = 2) {
    return `${(num * 100).toFixed(decimalPlaces)}%`;
  }

  const displayAge = (age) => {
    setAge(age);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch("http://localhost:4000/imageurl", {
      // Call your backend API for Clarifai request
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input, // Send image URL to backend
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response); // Log the API response to verify the structure
        if (response) {
          fetch("http://localhost:4000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevUser) => ({
                ...prevUser,
                entries: count,
              }));
            })
            .catch(console.log);
        }
        displayAge(guessAge(response));
      })
      .catch((err) => {
        console.log("Error calling Clarifai API or handling response", err);
      });
  };

  return (
    <div className="App">
      <ParticlesBg
        type="cobweb"
        bg={{ position: "absolute", zIndex: -1, top: 0, left: 0 }}
        color="#FFFFFF"
        num={280}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition age={age} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
