import "./Album.css";

function Album({data, deleteAlbum, updateAlbum}) {
    

    let cover = "";
    if (data.cover) {
        cover = `http://localhost:8080/covers/${data.cover}`
    } else {
        cover = `http://localhost:8080/covers/missing.jpg`
    }

    return (
        <div className="album">
            <div className="album-settings">
                <a onClick={() => updateAlbum(data.id)} href="#">✎</a>
                <a onClick={() => deleteAlbum(data.id)} href="#">✖</a>
            </div>
            <img className="album-cover" height="250" width="250" src={cover} alt="album cover"></img>
            <div className="artist">{data.artist}</div>
            <div className="album-name">{data.name}</div>
        </div>
    );
}

export default Album;