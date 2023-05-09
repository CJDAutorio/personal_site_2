import { useState } from 'react';
import Particles from '../components/particles';


function Landing() {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
//   particlesJS.load('particles-js', 'assets/particles.json', function () {
//     console.log('callback - particles.js config loaded');
//   });

  return (
    <div id='main'>
      <Particles />
      <div id='title-holder'>
        <h1 id='title' className='header'>Hello~</h1>
        <h2 id='subtitle' className='header'>CJ D'Autorio - Web Designer and Recent Graduate.</h2>
      </div>
    </div>
  )
}

export default Landing;
