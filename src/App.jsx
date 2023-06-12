import { useEffect, useState } from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Particles from './js/pages/landing/components/particles';
import Landing from './js/pages/landing/landing';
import AboutMe from './js/pages/aboutMe/aboutMe';
import WorkEdu from './js/pages/workEdu/workEdu';
import PrevProjs from './js/pages/previousProjects/prevProjects';
import HobbiesInterests from './js/pages/hobbiesInterests/hobbiesInterests';
import Fade from 'react-reveal/Fade';
import './css/App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    }

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
    {isLoaded ? (
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
        </Fade>
      </div>
    ) : (
      <div id='pages'>
        {/* <p>Loading page...</p> */}
      </div>
    )}
    </>
  )
}

export default App;
