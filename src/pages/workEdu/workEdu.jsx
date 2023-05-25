import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';

function WorkEdu() {

  useEffect(() => {
  });

  return (
    <div id='work-edu' className='page'>
      <div className='page-header'>
        <h1 className='header title'>WORK/EDU</h1>
      </div>
      <div className='page-content'>
        <Fade bottom duration={1250} delay={0} opposite cascade>
          <div className='flex-content-col'>
            <div className='subsection'>
              <h2 className='subheader'>Education</h2>
              <div className='entry'>
                <h3 className='entry-title'>Solutions Architect Intern - Ping Identity - Denver, CO</h3>
                <p>
                  I worked as a Solutions Architect intern from June, 2022 to August, 2022 for Ping
                  Identity in their office in Denver, Colorado. While at Ping, I was tasked with some
                  of the following:
                </p>
                <ul>
                  <li>
                    Communicated with customers to help find the correct product or solution for the
                    customer’s issues and use cases.
                  </li>
                  <li>
                    Developed product demonstrations to assist Solutions Architects in communicating
                    our products with customers using HTML, CSS, JS, and the DaVinci platform.
                  </li>
                  <li>
                    Developed NodeJS plugins for Ping Identity’s DaVinci orchestration platform
                    utilizing the Axios HTTP client and Postman libraries to create RESTful API calls
                    to services.
                  </li>
                  <li>
                    Studied Ping Identity products and their use cases to be able to communicate
                    accurate and useful information to customers.
                  </li>
                </ul>
              </div>
            </div>
            <hr className='subsection-break'/>
            <div className='subsection'>
              <h2 className='subheader'>Work History</h2>
              <div className='entry'>
                <h3 className='entry-title'>Solutions Architect Intern - Ping Identity - Denver, CO</h3>
                <p>
                  I worked as a Solutions Architect intern from June, 2022 to August, 2022 for Ping
                  Identity in their office in Denver, Colorado. While at Ping, I was tasked with some
                  of the following:
                </p>
                <ul>
                  <li>
                    Communicated with customers to help find the correct product or solution for the
                    customer’s issues and use cases.
                  </li>
                  <li>
                    Developed product demonstrations to assist Solutions Architects in communicating
                    our products with customers using HTML, CSS, JS, and the DaVinci platform.
                  </li>
                  <li>
                    Developed NodeJS plugins for Ping Identity’s DaVinci orchestration platform
                    utilizing the Axios HTTP client and Postman libraries to create RESTful API calls
                    to services.
                  </li>
                  <li>
                    Studied Ping Identity products and their use cases to be able to communicate
                    accurate and useful information to customers.
                  </li>
                </ul>
              </div>
              <hr />
              <div className='entry'>
                <h3 className='entry-title'>Deli Clerk - Lowes Foods - Mooresville, NC</h3>
                <p>
                  I also worked as a deli clerk in the Lowes Foods grocery store from May 2020 to
                  September 2020
                </p>
                <ul>
                  <li>
                    Provided polite, friendly greetings and interactions with customers.
                  </li>
                  <li>
                    Prepared products for sale through use of deli equipment according to customer
                    request.
                  </li>
                  <li>
                    Maintained product level, quality and freshness.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>

  );
};

export default WorkEdu;
