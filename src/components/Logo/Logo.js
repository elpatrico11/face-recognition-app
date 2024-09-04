import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () =>{
    return (
       
            <div className='ma4 mt0 ' style={{width:"150px"}}>
                <Tilt className ='Tilt br2 shadow-2' tiltMaxAngleX={40} tiltMaxAngleY={40}>
                    <div className='Tilt-inner pa3' style={{ height: '150px', width: '150px', backgroundColor: 'darkgreen' }}>
                        <img style={{paddingTop: '5px'}} src ={brain} alt='logo'/>
                    </div>
                </Tilt>
            </div>
    )
}

export default Logo;