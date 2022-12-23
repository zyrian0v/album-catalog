import "./AlbumAddForm.css";
import { useState } from "react";

function AlbumAddForm({addFormOpened, closeAddForm, updateAlbumList}) {
    const [artist, setArtist] = useState("");
    const [name, setName] = useState("");
    const [cover, setCover] = useState(null);


    function submitNewAlbum(event) {
        event.preventDefault();
        
        const json = {
            artist: artist,
            name: name,
        }
        const form = new FormData();
        form.append("json", JSON.stringify(json));
        form.append("cover", cover);
        console.log(json)
        fetch("http://localhost:8080/albums/new", {
            method: "POST",
            body: form,
        })
        .then(res => updateAlbumList())

        closeAddForm();
    }

    return (
        <dialog className="album-add-form" open={addFormOpened}>
                <form onSubmit={submitNewAlbum} id="albumAddForm" enctype="multipart/form-data">
                    <article>
                        <a onClick={closeAddForm} href="#close" aria-label="Close" class="close"></a>

                        <h3>Add an album</h3>
                        <label for="artist">Artist</label>
                        <input type="artist" id="artist" name="artist" required
                            onChange={(e) => setArtist(e.target.value)}/>


                        <label for="name">Album name</label>
                        <input type="name" id="name" name="name" required
                            onChange={(e) => setName(e.target.value)}/>

                        <label for="cover">Cover
                            <input accept="image/png, image/jpeg" type="file" id="cover" name="cover"
                                onChange={(e) => setCover(e.target.files[0])}/>
                        </label>

                        <footer>
                            <button>Submit</button>
                            <a onClick={closeAddForm} href="#cancel" className="secondary cancel-button" role="button">Cancel</a>
                        </footer>
                    </article>
                </form>
        </dialog>
    );
}

export default AlbumAddForm;