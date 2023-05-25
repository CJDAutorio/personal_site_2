import { useEffect, useState } from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Landing from './pages/landing/landing';
import AboutMe from './pages/aboutMe/aboutMe';
import WorkEdu from './pages/workEdu/workEdu';
import Fade from 'react-reveal/Fade';
import './css/App.css';

function App() {

  useEffect(() => {
  }, []);

  return (
    <>
      <div id='pages'>
        <Landing />
        <Fade bottom duration={1500} delay={0} opposite collapse>
          <div>
            <AboutMe />
          </div>
          <div>
            <WorkEdu />
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
