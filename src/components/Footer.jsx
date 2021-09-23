import "./Footer.css";
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { useDataLayerValue } from '../DataLayer';


function Footer({ handlePlayPause, handleSkipToNext, handleSkipToPrevious }) {
    const [{ item, playing }] = useDataLayerValue();

    return (
        <div className="footer">
            <div className="footer__left">
                <img className="footer__albumLogo" src={item?.album.images[0].url} alt={item?.name} />
                {item ? (
                    <div className="footer__songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist, index) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
                </div>

            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon className="footer__icon" onClick={handleSkipToPrevious} />
                {playing ? (
                    <PauseCircleOutlineOutlinedIcon fontSize="large" className="footer__icon" onClick={handlePlayPause} />
                ) : (
                    <PlayCircleOutlineOutlinedIcon fontSize="large" className="footer__icon" onClick={handlePlayPause} />
                )}
                <SkipNextIcon className="footer__icon" onClick={handleSkipToNext}/>
                <RepeatIcon className="footer__green" />

            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
