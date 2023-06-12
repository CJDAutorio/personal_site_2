import { useEffect, useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import axiosThrottle from 'axios-request-throttle';
import { BsCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import Placeholder from '../../assets/img/songimageplaceholder.jpg';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const ProjectCard = (props) => {
    const projectCardId = props.projectId + '-project-card'

    return (
        <div className='project-card' id={projectCardId}>
            <div className='project-card-image-container'>
                <img src={props.projectImage} />
            </div>
            <div className='project-card-overlay' />
            <div className='project-card-text'>
                <h3 className='flex-content-row'>{props.projectName}</h3>
                <div className='project-card-desc'>
                    {props.projectDesc}
                    <div className='project-card-buttons'>
                        <a href={props.projectGitLink} target="_blank" rel="noopener noreferrer" className='project-card-git-link'>Github</a>
                        <a href={props.projectPageLink} target="_blank" rel="noopener noreferrer" className='project-card-page-link'>Live Demo</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const LastFmCard = (props) => {
    const [lastFmData, setLastFmData] = useState({});
    const [lastFmSongText, setLastFmSongText] = useState({ title: "Unknown", artist: "Unknown", playCount: 0, lastListened: 0 });
    const [isSongInfoLoaded, setIsSongInfoLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [imageList, setImageList] = useState([Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder]);
    let lastFmCardId, lastFmCardLoadingId, params, title;
    let maxSongCount = 10;
    const lastFmBaseUrl = process.env.LAST_FM_URL;
    const lastFmUrl = new URL(lastFmBaseUrl);
    const now = Date.now();
    const weekAgo = (Date.now() - (60 * 60 * 24 * 7 * 1000));

    axiosThrottle.use(axios, { requestsPerSecond: 5 });

    switch (props.lastFmCardType) {
        case 1:
            // console.log('from:', (Date.now() - (60 * 60 * 24 * 7 * 1000)), '\nto:', Date.now());
            lastFmCardId = 'lastfm-card-recent-tracks';
            params = {
                'api_key': process.env.LAST_FM_API_KEY,
                'method': 'user.getRecentTracks',
                'format': 'json',
                'user': 'struggle__',
                // 'from': (Date.now() - (60*60*24*7*1000)),
                // 'to': Date.now()
            }
            title = 'Last 10 Tracks Listened To';
            break;
        case 2:
            lastFmCardId = 'lastfm-card-top-tracks';
            params = {
                'api_key': process.env.LAST_FM_API_KEY,
                'method': 'user.getWeeklyTrackChart',
                'format': 'json',
                'user': 'struggle__',
                'from': weekAgo,
                'to': now
            }
            title = 'Top 10 Tracks This Week';
            break;
        default:
            console.log('Invalid lastFmCardType:', props.lastFmCardType);
            break;
    }
    lastFmCardLoadingId = lastFmCardId + '-progress-bar';

    let lastFmConfig = {
        params: params,
        headers: {
            'user-agent': process.env.LAST_FM_USER_AGENT
        }
    };

    // Get LastFm music list after delay
    useEffect(() => {
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        async function getMusicList() {
            await delay(1000);
            switch (props.lastFmCardType) {
                case 1:
                    axios.get(lastFmUrl.toString(), lastFmConfig)
                        .then((response) => {
                            if (response.data.recenttracks.track && response.data.recenttracks.track.length > 0) {
                                setLastFmData(response.data.recenttracks.track.slice(0, maxSongCount));
                                console.log('response.data.recenttracks:', response.data.recenttracks);
                                setLoadingProgress(50);
                            } else {
                                console.log('error with response.data:', response.data);
                            }
                        })
                        .catch((error) => {
                            console.log('error:', error);
                        });
                    break;
                case 2:
                    axios.get(lastFmUrl.toString(), lastFmConfig)
                        .then((response) => {
                            if (response.data.weeklytrackchart.track && response.data.weeklytrackchart.track.length > 0) {
                                setLastFmData(response.data.weeklytrackchart.track.slice(0, maxSongCount));
                                console.log('response.data.weeklytrackchart:', response.data.weeklytrackchart);
                                setLoadingProgress(50);
                            } else {
                                console.log('error with response.data:', response.data);
                            }
                        })
                        .catch((error) => {
                            console.log('error:', error);
                        });
                    break;
                default:
                    console.log('error in getMusicList() switch');
                    break;
            }
        }

        setLoadingProgress(50);
        getMusicList();
    }, []);

    // Set initial information and images on lastFmData update
    useEffect(() => {
        if (Object.keys(lastFmData).length > 0) {
            var lastListened;
            if (lastFmData[currentIndex].date && lastFmData[currentIndex].date['#text']) {
                lastListened = lastFmData[currentIndex].date['#text'];
            } else {
                lastListened = 'Now';
            }
            setLastFmSongText({
                title: lastFmData[currentIndex].name,
                artist: lastFmData[currentIndex].artist['#text'],
                playCount: lastFmData[currentIndex].playcount,
                lastListened: lastListened
            });

            if (props.lastFmCardType === 1) {
                getAlbumCovers();
            } else {
                for (let i = 0; i < lastFmData.length; i++) {
                    const newImageList = imageList;
                    newImageList[i] = lastFmData[i].image[3]['#text'];
                    setImageList(newImageList);
                    console.log('current image:', lastFmData[i].image[3]['#text']);
                }
            }
        }
    }, [lastFmData]);

    // Get LastFm album covers if not already populated
    async function getAlbumCovers() {

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        if (lastFmData.length > 0) {
            for (let i = 0; i < lastFmData.length; i++) {
                const newLoadingProgress = loadingProgress + 5;
                setLoadingProgress(newLoadingProgress);
                await albumImageSearch(i);
            }
        }

        setIsSongInfoLoaded(true);

        async function albumImageSearch(index) {
            params = {
                'api_key': process.env.LAST_FM_API_KEY,
                'method': 'track.getInfo',
                'format': 'json',
                'track': lastFmData[index].name,
                'artist': lastFmData[index].artist['#text']
            }

            lastFmConfig = {
                params: params,
                headers: {
                    'user-agent': process.env.LAST_FM_USER_AGENT
                }
            };
            axios.get(lastFmUrl.toString(), lastFmConfig)
                .then((response) => {
                    if (response.data.track && Object.keys(response.data.track).length > 0) {
                        if (response.data.track.album && Object.keys(response.data.track.album).length > 0 && response.data.track.album.image[3]['#text']) {
                            const newImageList = imageList;
                            newImageList[index] = response.data.track.album.image[3]['#text'];
                            setImageList(newImageList);
                            console.log('album image found:', response.data.track.album.image[3]['#text']);
                        } else {
                            const newImageList = imageList;
                            newImageList[index] = Placeholder;
                            setImageList(newImageList);
                            console.log('album image not found for track:', response.data.track.name);
                        }
                    }
                })
                .catch((error) => {
                    console.log('error:', error);
                });
            await delay(500);
        }
    }

    // Update on index
    function updateIndex(direction) {
        if (direction > 0) {
            if (currentIndex < maxSongCount - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
    }

    // Handle lastListened text on currentIndex change
    useEffect(() => {
        if (Object.keys(lastFmData).length > 0) {
            var lastListened;
            if (lastFmData[currentIndex].date && lastFmData[currentIndex].date['#text']) {
                lastListened = lastFmData[currentIndex].date['#text'];
            } else {
                lastListened = 'Now';
            }
            setLastFmSongText({
                title: lastFmData[currentIndex].name,
                artist: lastFmData[currentIndex].artist['#text'],
                playCount: lastFmData[currentIndex].playcount,
                lastListened: lastListened
            });
        }
    }, [currentIndex]);

    // Handle loading progress
    useEffect(() => {
        document.getElementById(lastFmCardLoadingId).style.width = loadingProgress + '%';
        console.log('loading progress:', loadingProgress);
    }, [loadingProgress]);

    return (
        <div className='lastfm-card' id={lastFmCardId}>
            <div className='lastfm-card-overlay' />
            <div className='lastfm-card-content'>
                {isSongInfoLoaded ? (
                    <>
                        <h3 className='lastfm-card-title'>{title}</h3>
                        <div className='lastfm-card-text'>
                            {/* <TransitionGroup>
                                <CSSTransition key={lastFmSongText.title} classNames='fade' timeout={300}> */}
                                        <h4 className='lastfm-card-songname'>{lastFmSongText.title}</h4>
                                        <h5 className='lastfm-card-artist'>{lastFmSongText.artist}</h5>
                                        <div className='lastfm-card-image-container'>
                                            <img src={imageList[currentIndex]} className='lastfm-card-image' />
                                        </div>
                                        {props.lastFmCardType === 1 && (
                                            <>
                                                <div className='lastfm-card-details'>
                                                    <p className='lastfm-card-artist'>Last Listened: {lastFmSongText.lastListened}</p>
                                                </div>
                                            </>
                                        )}
                                        {props.lastFmCardType === 2 && (
                                            <>
                                                <div className='lastfm-card-details'>
                                                    <p className='lastfm-card-artist'>Place: {currentIndex + 1}</p>
                                                    <p className='lastfm-card-artist'>Play count: {lastFmSongText.playCount}</p>
                                                </div>
                                            </>
                                        )}
                                        <div className='lastfm-card-buttons'>
                                            {currentIndex > 0 && (
                                                <button className='lastfm-card-button-backward' onClick={() => { updateIndex(0) }}><BsCaretLeftFill /></button>
                                            )}
                                            {currentIndex < maxSongCount - 1 && (
                                                <button className='lastfm-card-button-forward' onClick={() => { updateIndex(1) }}><BsFillCaretRightFill /></button>
                                            )}
                                        </div>
                                {/* </CSSTransition>
                            </TransitionGroup> */}
                        </div>
                    </>
                ) : (
                    <div className='lastfm-card-text'>
                        <h3 className='lastfm-card-title'>Loading track information...</h3>
                        <div className='lastfm-card-progress'>
                            <div className='lastfm-card-progress-bar' id={lastFmCardLoadingId}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export const Card = (props) => {
    const cardId = props.cardId + '-card'

    return (
        <div className='card' id={cardId}>
            <div className='card-image-container'>
                <img src={props.cardImage} />
            </div>
            <div className='card-overlay' />
            <div className='card-text'>
                <h3 className='flex-content-row'>{props.cardName}</h3>
                <div className='card-desc'>
                    {props.cardDesc}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;
