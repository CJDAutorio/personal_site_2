import { useEffect, useState } from 'react';
import { BsLinkedin } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';
import EmailForm from './components/emailForm';
import Nav from '../../components/nav';

function ContactMe() {

  function emailLinkUnderline(direction) {
    let underline;
    if (document.getElementById('contact-email-underline-color')) {
      underline = document.getElementById('contact-email-underline-color');
      if (direction > 0) {
        underline.style.width = '100%';
        underline.style.borderColor = 'rgba(var(--primary-color-numbers), 1)';
      } else {
        underline.style.width = '0';
        underline.style.borderColor = 'rgba(var(--primary-color-numbers), 0)';
      }
    }
  }

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
            <div className='subsection' id='contact-email'>
              <h3>Or send me an email directly!</h3>
              {/* <EmailForm /> */}
              <a href='mailto: cjdautorioalt@gmail.com' id='contact-email-link' target='_blank' rel='noopener noreferrer' onMouseOver={() => {emailLinkUnderline(1)}} onMouseOut={() => {emailLinkUnderline(0)}}>
                Contact me here!
                <div id='contact-email-underline'>
                  <div id='contact-email-underline-color'></div>
                </div>
              </a>
            </div>
          </div>
        </Fade>
      </div>
    </div>

  );
};

export default ContactMe;
