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


    return (
        <div className="album-list grid">
            {albums.map(v => <Album key={v.id} data={v} deleteAlbum={deleteAlbum}/>)}
        </div>
    );
}

export default AlbumList;