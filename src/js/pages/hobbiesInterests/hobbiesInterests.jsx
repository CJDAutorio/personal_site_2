import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Nav from '../../components/nav';
import { BsCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { LastFmCard } from '../../components/cards';

function HobbiesInterests() {
  const [lastFmCardType, setLastFmCardType] = useState(2);

  const updateCardType = (newCardType) => {
    setLastFmCardType(newCardType);
  }

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
            <div className='lastfm-card-buttons'>
              {lastFmCardType > 1 && (
                <button className='lastfm-card-button-backward' onClick={() => { updateCardType(lastFmCardType - 1) }}><BsCaretLeftFill /></button>
              )}
              {lastFmCardType < 3 && (
                <button className='lastfm-card-button-forward' onClick={() => { updateCardType(lastFmCardType + 1) }}><BsFillCaretRightFill /></button>
              )}
            </div>
            <LastFmCard
              lastFmCardType={lastFmCardType}
            />
          </div>
          <div className='subsection'>
            <h2 className='subheader'>Sports and Activities</h2>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HobbiesInterests;
