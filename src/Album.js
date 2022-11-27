import cover from "./cover_example.jpg";
import "./Album.css";

function Album({data}) {
    return (
        <div className="album">
            <img className="album-cover" height="250" width="250" src={cover} alt="album cover"></img>
            <div className="artist">{data.artist}</div>
            <div className="album-name">{data.name}</div>
        </div>
    );
}

export default Album;