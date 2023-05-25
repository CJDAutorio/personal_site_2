import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Animations from './components/animations';
import HomeNav from '../components/homenav';
import Particles from '../components/particles';


function Landing() {
  const animations = new Animations();
  const baseTypeDelay = 2000;
  const emptyTypeDelay = 500;
  const startTypeDelay = 2000;

  useEffect(() => {

  });

  return (
    <div id='landing'>
      <div className='particle-container'>
        <Particles />
      </div>
      <div id='title-holder'>
        <div>
          <TypeAnimation
            sequence={[
              '',
              startTypeDelay,
              'Hello!',
              baseTypeDelay,
              'H',
              emptyTypeDelay,
              'Hi!',
              baseTypeDelay,
              'H',
              emptyTypeDelay,
              'Hello~',
              baseTypeDelay,
              '',
              emptyTypeDelay,
              '<Hello />',
              baseTypeDelay,
              '',
              emptyTypeDelay,
              'Hello?',
              baseTypeDelay,
              '',
              emptyTypeDelay,
              'Yo!',
              baseTypeDelay,
            ]}
            wrapper='div'
            cursor={true}
            repeat={Infinity}
            className='title header'
            style={{
            }}
          />
          <h2 id='subtitle' className='header'>CJ D'Autorio - Web Designer and Recent Graduate.</h2>
        </div>
        <HomeNav />
      </div>
    </div>
  )
}

export default Landing;
