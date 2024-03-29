import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Nav from '../../components/nav';
import { ProjectCard } from '../../components/cards';
import PawTracksScreen from "../../../assets/img/pawtracks-screenshot.png";
import NinerPickupScreen from "../../../assets/img/ninerpickup_screen.jpg";

function PrevProjs() {

  return (
    <div id='prev-proj' className='page'>
      <div className='page-header'>
        <h1 className='header'>PREVIOUS PROJECTS</h1>
        <Nav />
      </div>
      <div className='page-content'>
        <Fade bottom duration={1250} delay={0} opposite cascade>
          <div className='flex-content-col'>
            <div className='subsection'>
              <div className='flex-content-row'>
                <ProjectCard
                  projectId='pawtracks'
                  projectName='Senior Year Capstone - PawTracks'
                  projectImage={PawTracksScreen}
                  projectGitLink='https://github.com/g445g445/PawTracks'
                  projectPageLink='https://stage.pawtracks.live/'
                  projectDesc={
                    <p>An online petsitter powered by TensorFlow which allows users to monitor their pet through a webcam or a mobile device.</p>
                  }
                />
                <ProjectCard
                  projectId='ninerpickup'
                  projectName='Niner Pickup'
                  projectImage={NinerPickupScreen}
                  projectGitLink='https://github.com/CJDAutorio/NinerPickup'
                  projectPageLink='https://github.com/CJDAutorio/NinerPickup'
                  projectDesc={
                    <p>A "Looking for Group" solution for activities on or near campus.</p>
                  }
                />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>

  );
};

export default PrevProjs;
