import React, { useEffect } from 'react'
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './components/Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {
    const [{ token, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        //runs code based on a given condition
        const hash = getTokenFromUrl();
        window.location.hash = "";

        const _token = hash.access_token;

        if (_token) {
            dispatch({
                type: "SET_TOKEN",
                token: _token,
            })

            spotify.setAccessToken(_token);

            dispatch({
                type: "SET_SPOTIFY",
                spotify: spotify,
            })

            spotify.getMe().then(user => {
                dispatch({
                    type: "SET_USER",
                    user,
                });
            });

            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists,
                });
            });

            //37i9dQZEVXcJZyENOWUFo7
            //4AsTaPUsN2tom06Nw07y9R my own
            spotify.getPlaylist('4AsTaPUsN2tom06Nw07y9R').then(response => {
                dispatch({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: response
                });
            });

            spotify.getMyTopArtists().then(artists => {
                dispatch({
                    type: "SET_TOP_ARTISTS",
                    top_artists: artists

                })
            });
            spotify.getMyCurrentPlaybackState().then((r) => {
                dispatch({
                    type: "SET_ITEM",
                    item: r.item
                })
                dispatch({
                    type: "SET_PLAYING",
                    playing: r.is_playing,
                });
            })
        }
    }, [token, dispatch]);

    const playPlaylist = (id) => {
        spotify.play({
            context_uri: `spotify:playlist:4AsTaPUsN2tom06Nw07y9R`
        }).then(res => {
            spotify.getMyCurrentPlayingTrack().then((res) => {
                dispatch({
                    type: "SET_ITEM",
                    item: res.item,
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
            })
        })
    }

    const playSong = (id) => {
        spotify
            .play({
                uris: [`spotify:track:${id}`],
            }).then((res) => {
                spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                })
            })
        }

    const handlePlayPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    }

    const handleSkipToPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((response) => {
            dispatch({
                type: "SET_ITEM",
                item: response.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        })
    }

    const handleSkipToNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((response) => {
            dispatch({
                type: "SET_ITEM",
                item: response.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        })
    }    

    return (
        <div className="app">
            {
                token ? (
                    token && <Player playPlaylist={playPlaylist} play={playSong} spotify={spotify} handlePlayPause={handlePlayPause} handleSkipToNext={handleSkipToNext} handleSkipToPrevious={handleSkipToPrevious} />
                ) : ( 
                    <Login />
                )
            }
        </div>
    )
}

export default App
