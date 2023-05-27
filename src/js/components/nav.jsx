import { useEffect } from 'react';
import Scroll from '../utils/scroll';

function Nav() {
  const scroll = new Scroll();

  useEffect(() => {
    const aboutMeButton = document.getElementById('about-me-nav');
    const workEduButton = document.getElementById('work-edu-nav');
    const previousProjectsButton = document.getElementById('projects-nav');
    const hobbiesInterestsButton = document.getElementById('hobbies-nav');
    const contactMeButton = document.getElementById('contact-nav');

    aboutMeButton.addEventListener('click', function () { scroll.scrollToElement('about-me') });
    workEduButton.addEventListener('click', function () { scroll.scrollToElement('work-edu') });
    previousProjectsButton.addEventListener('click', function () { scroll.scrollToElement('prev-proj') });
    hobbiesInterestsButton.addEventListener('click', function () { scroll.scrollToElement('hobbies-interests') });
    contactMeButton.addEventListener('click', function () { scroll.scrollToElement('contact-me') });
  });

  return (
    <div id='home-navbar'>
      <button className='home-nav-button' id='about-me-nav'>About Me</button>
      <button className='home-nav-button' id='work-edu-nav'>Work/Edu</button>
      <button className='home-nav-button' id='projects-nav'>Previous Projects</button>
      <button className='home-nav-button' id='hobbies-nav'>Hobbies/Interests</button>
      <button className='home-nav-button' id='contact-nav'>Contact Me</button>
    </div>
  )
}

export default Nav;
