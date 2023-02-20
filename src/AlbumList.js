import Album from "./Album";
import "./AlbumList.css";

function AlbumList({albums, setAlbums, openUpdateForm}) {

    function deleteAlbum(id) {
        const deleteUrl = `http://localhost:8080/albums/${id}/delete`
        fetch(deleteUrl, {
            method: "DELETE"
        })

        setAlbums(albums.filter(v => v.id != id))
    }

    function updateAlbum(id) {
        const album = albums.find(x => x.id == id)
        openUpdateForm(album)
    }

    
    let albumList;
    if (albums.length != 0) {
        albumList = albums.map(v => <Album key={v.id} 
                                           data={v} 
                                           deleteAlbum={deleteAlbum}
                                           updateAlbum={updateAlbum} />);
    } else {
        albumList = <p>The list is empty.</p>;
    }

    return (
        <>
            <div className="album-list grid">
                {albumList}
            </div>

            
        </>
    );
}

export default AlbumList;