import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, age }) => {
  return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageUrl}  width='500px' height='auto' />
             {age.name && age.value && (
              <div className="result white f2">
                <p>The age is likely {age.name}</p>
                <p>Guessed with {age.value} accuracy</p>
              </div>)}
        </div>
    </div>
  );
}

export default FaceRecognition;

///Original