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

  useEffect(() => {
  }, []);

  return (
    <>
      <div id='pages'>
        <Particles />
        <Landing />
        <Fade bottom duration={1500} delay={0} opposite>
          <div>
            <AboutMe />
          </div>
          <div>
            <WorkEdu />
          </div>
          <div>
            <PrevProjs />
          </div>
          <div id='hobbiesInterestsContainer'>
            <HobbiesInterests />
          </div>
        </Fade>
      </div>

      <Routes>
        <Route path='/aboutme' element={<AboutMe />}/>
      </Routes>
    </>
  )
}

export default App;
