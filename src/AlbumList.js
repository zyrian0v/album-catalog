import Album from "./Album";
import "./AlbumList.css";
import { useState, useEffect } from "react";

function AlbumList() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/albums")
            .then(res => res.json())
            .then(json => setAlbums(json))
    }, []);
    


    return (
        <div className="album-list grid">
            {albums.map(v => <Album key={v.id} data={v}/>)}
        </div>
    );
}

export default AlbumList;