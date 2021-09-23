import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDataLayerValue } from '../DataLayer';
import "./Body.css";
import Header from './Header';
import SongRow from './SongRow';

function Body({ spotify, playPlaylist, play }) {
    const [{ discover_weekly }] = useDataLayerValue();
    return (
        <div className="body">
            <Header spotify={spotify} />

            <div className="body__info">

                <img src={discover_weekly?.images[0].url} alt="" />

                <div className="body__infoText">
                    <strong>PLAYLISTS</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

                <div className="body__songs">
                    <div className="body__icons">
                        <PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist} />
                        <FavoriteIcon  fontSize="large" />
                        <MoreHorizIcon />
                    </div>
                {
                    discover_weekly?.tracks.items.map(item => (
                    <SongRow playSong={play} track={item.track} key={item.id} />
            ))
                }
           </div>
        </div>
    ) 
}

export default Body;
