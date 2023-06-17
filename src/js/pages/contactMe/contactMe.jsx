import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
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
            <div className='subsection'>
              <div className='flex-content-row'>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>

  );
};

export default ContactMe;
