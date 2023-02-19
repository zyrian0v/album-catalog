import Album from "./Album";
import "./AlbumList.css";

function AlbumList({albums, setAlbums}) {

    function deleteAlbum(id) {
        const deleteUrl = `http://localhost:8080/albums/${id}/delete`
        fetch(deleteUrl, {
            method: "DELETE"
        })

        setAlbums(albums.filter(v => v.id != id))
    }

    
    let albumList;
    if (albums.length != 0) {
        albumList = albums.map(v => <Album key={v.id} data={v} deleteAlbum={deleteAlbum}/>);
    } else {
        albumList = <p>The list is empty.</p>;
    }

    return (
        <div className="album-list grid">
            {albumList}
        </div>
    );
}

export default AlbumList;