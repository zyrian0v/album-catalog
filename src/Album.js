import cover from "./cover_example.jpg";
import "./Album.css";

function Album() {
    return (
        <div className="album">
            <img className="album-cover" height="250" width="250" src={cover} alt="album cover"></img>
            <div className="artist">Trementina</div>
            <div className="album-name">Almost React The Sun</div>
        </div>
    );
}

export default Album;