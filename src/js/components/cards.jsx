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
    const [cardType, setCardType] = useState(2);
    const [lastFmData, setLastFmData] = useState({});
    const [lastFmSongText, setLastFmSongText] = useState({ title: "Unknown", artist: "Unknown", playCount: 0, lastListened: 0 });
    const [isSongInfoLoaded, setIsSongInfoLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [imageList, setImageList] = useState([Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder, Placeholder]);
    let lastFmCardId, lastFmCardLoadingId, lastFmCardBgId, params, title, lastFmConfig;
    let maxSongCount = 10;
    const lastFmBaseUrl = process.env.LAST_FM_URL;
    const lastFmUrl = new URL(lastFmBaseUrl);
    const now = Date.now();
    const weekAgo = (Date.now() - (1000 * 60 * 60 * 24 * 7));

    axiosThrottle.use(axios, { requestsPerSecond: 2 });

    // Sets variables based on card type
    function initVariables() {
        switch (cardType) {
            case 1:
                lastFmCardId = 'lastfm-card-recent-tracks';
                params = {
                    'api_key': process.env.LAST_FM_API_KEY,
                    'method': 'user.getRecentTracks',
                    'format': 'json',
                    'user': 'struggle__'
                }
                title = 'Last ' + maxSongCount + ' Tracks Listened To';
                break;
            case 2:
                lastFmCardId = 'lastfm-card-top-tracks';
                params = {
                    'api_key': process.env.LAST_FM_API_KEY,
                    'method': 'user.getWeeklyTrackChart',
                    'format': 'json',
                    'user': 'struggle__',
                    // 'from': weekAgo,
                    // 'to': now
                }
                title = 'Top ' + maxSongCount + ' Tracks This Week';
                break;
            case 3:
                lastFmCardId = 'lastfm-card-top-artists';
                params = {
                    'api_key': process.env.LAST_FM_API_KEY,
                    'method': 'user.getWeeklyArtistChart',
                    'format': 'json',
                    'user': 'struggle__',
                    // 'from': weekAgo,
                    // 'to': now
                }
                title = 'Top ' + maxSongCount + ' Artists This Week';
                break;
            default:
                console.log('Invalid lastFmCardType:', cardType);
                break;
        }
        lastFmCardLoadingId = lastFmCardId + '-progress-bar';
        lastFmCardBgId = lastFmCardId + '-bg';

        lastFmConfig = {
            params: params,
            headers: {
                'user-agent': process.env.LAST_FM_USER_AGENT
            }
        };
    }
    initVariables();

    // Get LastFm music list after delay
    useEffect(() => {
        // initVariables();

        setIsSongInfoLoaded(false);

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        async function getMusicList() {
            await delay(1000);
            switch (cardType) {
                case 1:
                    getRecentTracks();
                    break;
                case 2:
                    getTopTracks();
                    break;
                case 3:
                    getTopArtists();
                    break;
                default:
                    console.log('error in getMusicList() switch');
                    break;
            }
        }

        getMusicList();
    }, [cardType]);

    // Gets recent track list from LastFM API
    function getRecentTracks() {
        axios.get(lastFmUrl.toString(), lastFmConfig)
            .then((response) => {
                if (response.data.recenttracks.track && response.data.recenttracks.track.length > 0) {
                    setLastFmData(response.data.recenttracks.track.slice(0, maxSongCount));
                    // console.log('response.data.recenttracks:', response.data.recenttracks);
                    setLoadingProgress(100);
                    setIsSongInfoLoaded(true);
                } else {
                    // console.log('error with response.data:', response.data);
                }
            })
            .catch((error) => {
                console.log('error:', error);
            });
    }

    // Gets most listened to tracks from LastFM API
    function getTopTracks() {
        axios.get(lastFmUrl.toString(), lastFmConfig)
            .then((response) => {
                if (response.data.weeklytrackchart.track && response.data.weeklytrackchart.track.length > 0) {
                    if (response.data.weeklytrackchart.track.length > maxSongCount) {
                        setLastFmData(response.data.weeklytrackchart.track.slice(0, maxSongCount));
                    } else {
                        setLastFmData(response.data.weeklytrackchart.track);
                    }
                    // console.log('response.data.weeklytrackchart:', response.data.weeklytrackchart);
                    setLoadingProgress(50);
                } else {
                    // console.log('error with response.data.weeklytrackchart:', response.data.weeklytrackchart);
                }
            })
            .catch((error) => {
                console.log('error:', error);
            });
    }

    // Gets top artists from LastFM API
    function getTopArtists() {
        axios.get(lastFmUrl.toString(), lastFmConfig)
            .then((response) => {
                const artistData = response.data.weeklyartistchart.artist;
                if (artistData && artistData.length > 0) {
                    setLastFmData(artistData.slice(0, maxSongCount));
                    // console.log('response.data.weeklyartistchart:', response.data.weeklyartistchart);
                    setLoadingProgress(50);
                } else {
                    // console.log('error with response.data.weeklyartistchart:', response.data.weeklyartistchart);
                }
            })
            .catch((error) => {
                console.log('error:', error);
            });
    }

    // Set initial information and images on lastFmData update
    useEffect(() => {
        if (Object.keys(lastFmData).length > 0) {
            var lastListened;
            if (lastFmData[currentIndex].date && lastFmData[currentIndex].date['#text']) {
                lastListened = lastFmData[currentIndex].date['#text'];
            } else {
                lastListened = 'Now';
            }

            if (cardType === 3) {
                setLastFmSongText({
                    artist: lastFmData[currentIndex].name,
                    playCount: lastFmData[currentIndex].playcount
                });
            } else {
                setLastFmSongText({
                    title: lastFmData[currentIndex].name,
                    artist: lastFmData[currentIndex].artist['#text'],
                    playCount: lastFmData[currentIndex].playcount,
                    lastListened: lastListened
                });
            }

            const newImageList = Array(lastFmData.length).fill(Placeholder);
            setImageList(newImageList);
            switch (cardType) {
                case 1:
                    for (let i = 0; i < lastFmData.length; i++) {
                        newImageList[i] = lastFmData[i].image[3]['#text'];
                    }
                    setImageList(newImageList);
                    setLoadingProgress(100);
                    break;
                case 2:
                    getAlbumCovers();
                    break;
                case 3:
                    getArtistCovers();
                    break;
                default:
                    break;
            }
        } else {
            setIsSongInfoLoaded(false);
        }
    }, [lastFmData]);

    // Get LastFm album covers if not already populated
    async function getAlbumCovers() {

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        if (lastFmData.length > 0) {
            for (let i = 0; i < lastFmData.length; i++) {
                await albumImageSearch(i);
                const newLoadingProgress = Math.round(loadingProgress + ((i + 1) * (100 - loadingProgress) / lastFmData.length));
                setLoadingProgress(newLoadingProgress);
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
                            // console.log('album image found:', response.data.track.album.image[3]['#text']);
                        } else {
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

    // Get LastFm artist covers if not already populated
    async function getArtistCovers() {

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        if (lastFmData.length > 0) {
            for (let i = 0; i < lastFmData.length; i++) {
                await topAlbumSearch(i);
                const newLoadingProgress = Math.round(loadingProgress + ((i + 1) * (100 - loadingProgress) / lastFmData.length));
                setLoadingProgress(newLoadingProgress);
            }
        }

        setIsSongInfoLoaded(true);

        async function topAlbumSearch(index) {
            params = {
                'api_key': process.env.LAST_FM_API_KEY,
                'method': 'artist.getTopAlbums',
                'format': 'json',
                'artist': lastFmData[index].name
            };

            lastFmConfig = {
                params: params,
                headers: {
                    'user-agent': process.env.LAST_FM_USER_AGENT
                }
            };

            axios.get(lastFmUrl.toString(), lastFmConfig)
                .then((response) => {
                    if (response.data.topalbums?.album?.[0].image?.[3]['#text']) {
                        const newImageList = imageList;
                        newImageList[index] = response.data.topalbums.album[0].image[3]['#text'];
                        setImageList(newImageList);
                        console.log('artist image found:', response.data.topalbums.album[0].image[3]['#text']);
                    } else {
                        console.log('artist image not found for artist:', lastFmData[index].name);
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

            if (cardType === 3) {
                setLastFmSongText({
                    artist: lastFmData[currentIndex].name,
                    playCount: lastFmData[currentIndex].playcount,
                });
            } else {
                setLastFmSongText({
                    title: lastFmData[currentIndex].name,
                    artist: lastFmData[currentIndex].artist['#text'] || 'Unknown',
                    playCount: lastFmData[currentIndex].playcount,
                    lastListened: lastListened
                });
            }

            if (document.getElementById(lastFmCardBgId)) {
                const position = (currentIndex * 10);
                document.getElementById(lastFmCardBgId).style.backgroundPosition = position + '%, 0';
            }
        }
    }, [currentIndex]);

    // Update card type
    function updateCardType(direction) {
        if (direction > 0) {
            setLoadingProgress(0);
            if (cardType < 3) {
                setCardType(cardType + 1);
                setCurrentIndex(0);
                const newImageList = Array(lastFmData.length).fill(Placeholder);
                setImageList(newImageList);
            }
        } else {
            if (cardType > 1) {
                setCardType(cardType - 1);
                setCurrentIndex(0);
                const newImageList = Array(lastFmData.length).fill(Placeholder);
                setImageList(newImageList);
            }
        }
    }

    // Handle loading progress
    useEffect(() => {
        if (document.getElementById(lastFmCardLoadingId)) {
            document.getElementById(lastFmCardLoadingId).style.width = loadingProgress + '%';
        }
        console.log('loading progress:', loadingProgress);
    }, [loadingProgress]);

    return (
        <div className='lastfm-card' id={lastFmCardId}>
            <div className='lastfm-card-content'>
                {isSongInfoLoaded ? (
                    <>
                        <div className='lastfm-card-header'>
                            {cardType > 1 && (
                                <button className='lastfm-card-type-button-backward' onClick={() => { updateCardType(0) }}><BsCaretLeftFill /></button>
                            )}
                            <h3 className='lastfm-card-title'>{title}</h3>
                            {cardType < 3 && (
                                <button className='lastfm-card-type-button-forward' onClick={() => { updateCardType(1) }}><BsFillCaretRightFill /></button>
                            )}
                        </div>
                        <div className='lastfm-card-text-wrapper' id={lastFmCardBgId}>
                            <TransitionGroup>
                                <CSSTransition key={currentIndex} classNames='fade' timeout={500}>
                                    <div className='lastfm-card-text'>
                                        {cardType != 3 && (
                                            <h4 className='lastfm-card-songname'>{lastFmSongText.title}</h4>
                                        )}
                                        <h5 className='lastfm-card-artist'>{lastFmSongText.artist}</h5>
                                        <div className='lastfm-card-image-container'>
                                            <img src={imageList[currentIndex]} className='lastfm-card-image' />
                                        </div>
                                        {cardType === 1 ? (
                                            <>
                                                <div className='lastfm-card-details'>
                                                    <p className='lastfm-card-artist'>Last Listened: {lastFmSongText.lastListened}</p>
                                                </div>
                                            </>
                                        ) : (
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
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </>
                ) : (
                    <div className='lastfm-card-text'>
                        <h3 className='lastfm-card-title'>Loading {title}</h3>
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
