import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Nav from '../../components/nav';
import { BsCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { LastFmCard, Card } from '../../components/cards';
import FlagFootball from '../../../assets/video/flagfootball_crop.mp4';
import Gym from '../../../assets/video/gym.mp4';

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
              lastFmCardType={2}
            />
          </div>
          <div className='subsection'>
            <h2 className='subheader'>Sports and Activities</h2>
            <div id='hobby-cards'>
              <Card
                cardId='intramurals'
                cardGraphic={FlagFootball}
                cardName='Intramurals'
                cardDesc={<div><p>Casual league 4v4 and 7v7 flag football demon.</p><br /><p>Shoutout Tom, Codie, Ben M, Ben P, Eric, and Evan.</p></div>}
              />
              <Card
                cardId='gym'
                cardGraphic={Gym}
                cardName='Lifting'
                cardDesc={<div><p><b>Bench:</b>&emsp;235 lbs</p><br /><p><b>Squat:</b>&emsp;1 slipped disc</p><br /><p><b>Deadlift:</b>&emsp;Gym didn't let me</p></div>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HobbiesInterests;
