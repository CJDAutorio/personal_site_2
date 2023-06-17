import { useEffect, useState } from 'react';
import { BsLinkedin } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';
import EmailForm from './components/emailForm';
import Nav from '../../components/nav';

function ContactMe() {

  useEffect(() => {
  });

  return (
    <div id='contact-me' className='page'>
      <div className='page-header'>
        <h1 className='header'>CONTACT ME</h1>
        <Nav />
      </div>
      <div className='page-content'>
        <Fade bottom duration={1250} delay={0} opposite cascade>
          <div className='flex-content-col'>
            <div className='subsection' id='contact-socials'>
              <h3>Connect with me on <span className='highlight'>LinkedIn!</span></h3>
              <a className='contact-button' id='contact-linkedin' href='https://www.linkedin.com/in/cj-dautorio/' target='_blank' rel='noopener noreferrer'><BsLinkedin /></a>
              <p className='contact-subtitle'>@cj-dautorio</p>
            </div>
            <div className='subsection'>
              <h3>Or send me an email directly!</h3>
              <EmailForm />
            </div>
          </div>
        </Fade>
      </div>
    </div>

  );
};

export default ContactMe;
