import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Nav from '../../components/nav';
import { LastFmCard } from '../../components/cards';

function HobbiesInterests() {

  return (
    <div id='hobbies-interests' className='page'>
      <div className='page-header'>
        <h1 className='header'>HOBBIES AND INTERESTS</h1>
        <Nav />
      </div>
      <div className='page-content'>
        <div className='flex-content-col'>
          <div className='subsection'>
            <h2 className='subheader'>Music</h2>
            <LastFmCard
              lastFmCardType={1}
            />
          </div>
          <div className='subsection'>
            <h2 className='subheader'>Sports and Activities</h2>
          </div>
        </Fade>
      </div>
    </div>

  );
};

export default HobbiesInterests;
