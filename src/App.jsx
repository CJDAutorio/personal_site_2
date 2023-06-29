import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Particles from './js/pages/landing/components/particles';
import Landing from './js/pages/landing/landing';
import AboutMe from './js/pages/aboutMe/aboutMe';
import WorkEdu from './js/pages/workEdu/workEdu';
import PrevProjs from './js/pages/previousProjects/prevProjects';
import HobbiesInterests from './js/pages/hobbiesInterests/hobbiesInterests';
import ContactMe from './js/pages/contactMe/contactMe';
import Fade from 'react-reveal/Fade';
import './css/App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // useEffect(() => {
  //   const handleLoad = () => {
  //     setIsLoaded(true);
  //   }

  //   window.addEventListener('load', handleLoad);

  //   return () => {
  //     window.removeEventListener('load', handleLoad);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetch('/api/data')
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <>
      <div id='pages'>
        <Particles />
        <Landing />
        <Fade bottom duration={1500} delay={0} opposite>
          <div id='aboutMeContainer'>
            <AboutMe />
          </div>
          <div id='workEduContainer'>
            <WorkEdu />
          </div>
          <div id='prevProjsContainer'>
            <PrevProjs />
          </div>
          <div id='hobbiesInterestsContainer'>
            <HobbiesInterests />
          </div>
          <div id='contactMeContainer'>
            <ContactMe />
          </div>
        </Fade>
      </div>
      <div id='message-overlay'></div>
    </>
  )
}

export default App;
