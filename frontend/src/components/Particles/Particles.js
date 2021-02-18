import Particles from 'react-particles-js';
import React from 'react';
import './Particles.css';
// import feet from '../Logo/feet.png';

class ParticlesBG extends React.Component{
  
    render(){
        return (
            <Particles
              className='particles'    
              params={{
                  particles: {
                    color: {
                        value: "#090909"
                    },
                    shape: {
                        type: "star",
                        // image: {
                        //     src: feet
                        // }
                    },
                    number: {
                        value: 150,
                    },
                      opactiy: {
                          value: .5,
                          random: true,
                          anim: {
                              enable: true
                          }
                      },
                      size: {
                          value: 6,
                          anim: {
                              enable: true,
                              speed: 8
                          }
                      }
            		}
            	}}
            />
        );
    };
 
}

export default ParticlesBG;