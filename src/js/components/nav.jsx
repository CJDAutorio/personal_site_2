import { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Scroll from '../utils/scroll';

function Nav() {
  const scroll = new Scroll();

  const [isMobileNavActive, setMobileNavActive] = useState('false');

  const toggleMobileNav = (event) => {
    // console.log('event:', event.target.parentElement.querySelector('.nav-mobile-buttons'));
    // event.target.parentElement.querySelector('.nav-mobile-buttons').toggleClass('no-height auto-height');
    setMobileNavActive(!isMobileNavActive);
  }

  return (
    <>
      <div className='navbar-desktop'>
        <button className='nav-button' id='home-nav' onClick={() => scroll.scrollToElement('landing')}>Home</button>
        <button className='nav-button' id='about-me-nav' onClick={() => scroll.scrollToElement('about-me')}>About Me</button>
        <button className='nav-button' id='work-edu-nav' onClick={() => scroll.scrollToElement('work-edu')}>Work/Edu</button>
        <button className='nav-button' id='projects-nav' onClick={() => scroll.scrollToElement('prev-proj')}>Previous Projects</button>
        <button className='nav-button' id='hobbies-nav' onClick={() => scroll.scrollToElement('hobbies-interests')}>Hobbies/Interests</button>
        <button className='nav-button' id='contact-nav' onClick={() => scroll.scrollToElement('contact-me')}>Contact Me</button>
      </div>
      <div className='navbar-mobile'>
        <button className={isMobileNavActive ? 'nav-mobile-dropdown auto-height' : 'nav-mobile-dropdown no-height'} onClick={toggleMobileNav}><BsChevronDown /></button>
        <div className={isMobileNavActive ? 'nav-mobile-buttons no-height' : 'nav-mobile-buttons auto-height'}>
          <button className='nav-mobile-close' onClick={toggleMobileNav}><BsChevronUp /></button>
          <button className='nav-button' id='home-nav' onClick={() => scroll.scrollToElement('landing')}>Home</button>
          <button className='nav-button' id='about-me-nav' onClick={() => scroll.scrollToElement('about-me')}>About Me</button>
          <button className='nav-button' id='work-edu-nav' onClick={() => scroll.scrollToElement('work-edu')}>Work/Edu</button>
          <button className='nav-button' id='projects-nav' onClick={() => scroll.scrollToElement('prev-proj')}>Previous Projects</button>
          <button className='nav-button' id='hobbies-nav' onClick={() => scroll.scrollToElement('hobbies-interests')}>Hobbies/Interests</button>
          <button className='nav-button' id='contact-nav' onClick={() => scroll.scrollToElement('contact-me')}>Contact Me</button>
        </div>
      </div>
    </>
  )
}

export default Nav;
