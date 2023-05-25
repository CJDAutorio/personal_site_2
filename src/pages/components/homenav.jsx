import { HashLink } from 'react-router-hash-link';

function HomeNav() {
    return (
      <div id='home-navbar'>
        <HashLink to="/some/path#with-hash-fragment"  className="home-nav-button" id="about-me-nav">
          About Me
        </HashLink>
        <button className="home-nav-button" id="work-edu-nav">Work/Edu</button>
        <button className="home-nav-button" id="projects-nav">Previous Projects</button>
        <button className="home-nav-button" id="hobbies-nav">Hobbies/Interests</button>
        <button className="home-nav-button" id="contact-nav">Contact Me</button>
      </div>
    )
  }
  
  export default HomeNav;
  