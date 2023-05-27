import { useEffect } from 'react';
import Scroll from '../../../utils/scroll';

function HomeNav() {
  const scroll = new Scroll();

  return (
    <div id='home-navbar'>
      <button className='home-nav-button' id='about-me-nav' onClick={() => scroll.scrollToElement('about-me')}>About Me</button>
      <button className='home-nav-button' id='work-edu-nav' onClick={() => scroll.scrollToElement('work-edu')}>Work/Edu</button>
      <button className='home-nav-button' id='projects-nav' onClick={() => scroll.scrollToElement('prev-proj')}>Previous Projects</button>
      <button className='home-nav-button' id='hobbies-nav' onClick={() => scroll.scrollToElement('hobbies-interests')}>Hobbies/Interests</button>
      <button className='home-nav-button' id='contact-nav' onClick={() => scroll.scrollToElement('contact-me')}>Contact Me</button>
    </div>
  )
}

export default HomeNav;
