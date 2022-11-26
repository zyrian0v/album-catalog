import Album from "./Album";
import "./AlbumList.css";

function AlbumList() {
    return (
        <div className="album-list grid">
            <Album/>    
            <Album/>
            <Album/>
            <Album/>
        </div>
    );
}

export default AlbumList;