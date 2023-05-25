import { useEffect, useState } from 'react';
import Portrait from "../../assets/img/portrait.jpg";
import PingLogo from "../../assets/img/pingidentity.png";
import Resume from "../../assets/files/DAutorio-Resume.pdf";
import Fade from 'react-reveal/Fade';

function AboutMe() {

  useEffect(() => {
  });

  return (
    <>

      <div id='about-me' className='page'>
        <div className='page-header' id='aboutMe-header'>
          <h1 className='header title'>ABOUT ME</h1>
        </div>
        <div className='page-content' id='aboutMe-content'>
          <Fade bottom duration={1250} delay={0} opposite cascade>
            <div className='section' id='aboutMe-greeting'>
              <h2 className='subheader'>Hello!</h2>
              <div className='flex-content-row'>
                <p id='greeting-body'>
                  Hello, and thank you for visiting my site! My name is CJ D’Autorio and
                  I am currently a Computer Science major at the <span className='highlight'>University of North
                    Carolina at Charlotte</span> with a concentration in Web and Mobile Application
                  Development. I’m currently in my last semester of my bachelors degree and
                  will graduate in May, 2023.
                  <br /><br />
                  If you’re in a rush you can quickly download my resume <a href={Resume} target="_blank" rel="noopener noreferrer" className='inline-button'>here</a>.
                </p>
                <img src={Portrait} alt="Me" id="portrait" />
              </div>
            </div>
            <hr />
            <div className='section' id='aboutMe-work'>
              <h2 className='subheader'>Where I’ve Worked</h2>
              <div className='flex-content-row'>
                <img src={PingLogo} alt="Me" id="pinglogo" />
                <p>
                  I spent the summer of 2022 working as a <span className='highlight'>Solutions Architect Intern
                    at Ping Identity in Denver, Colorado</span>. While at Ping, I helped out
                  by developing product demonstrations for the Solutions Architects
                  to use while interfacing with customers while also learning how to
                  talk to and understand customers myself. At the same time, I
                  helped develop plugins for Ping’s DaVinci platform using NodeJS
                  and Axios.
                  <br /><br />
                  During my internship, I was able to both develop my technical skills
                  through actual development as well as learn more about what actual
                  customers and end-users look for in the software and services they
                  are looking to buy.
                </p>
              </div>
            </div>
            <hr />
            <div className='section' id='aboutMe-future'>
              <h2 className='subheader'>What I’m Looking For</h2>
              <div className='flex-content-row'>
                <p>
                  I’m currently looking for a full-time software development position
                  to work at after I graduate to help me develop my skills both as a
                  developer and as a professional.
                  <br /><br />
                  Although I prefer frontend development, I have extensive experience
                  in backend, full-stack, and general software development.
                  <span className='highlight'> I’m happy anywhere as long as I get to write code.</span>
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  )
}

export default AboutMe;
