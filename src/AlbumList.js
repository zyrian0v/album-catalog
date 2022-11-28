import Album from "./Album";
import "./AlbumList.css";
import { useState, useEffect } from "react";

function AlbumList({albums}) {

    return (
        <div className="album-list grid">
            {albums.map(v => <Album key={v.id} data={v}/>)}
        </div>
    );
}

export default AlbumList;