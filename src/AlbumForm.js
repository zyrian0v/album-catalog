import "./AlbumForm.css";
import { useState } from "react";

function AlbumForm({formType, formOpened, closeForm, updateAlbumList, selectedAlbum}) {
    const [artist, setArtist] = useState("");
    const [name, setName] = useState("");
    const [cover, setCover] = useState(null);

    if (selectedAlbum && formType === "update") {
        if (artist !== selectedAlbum.artist) {
            setArtist(selectedAlbum.artist)
        }

        if (name !== selectedAlbum.name) {
            setName(selectedAlbum.name)
        }
    }


    let header;
    let submitText;
    if (formType === "add") {
        header = "Add an album"
        submitText = "Add"
    } else if (formType === "update") {
        header = "Update an album"
        submitText = "Update"
    }


    function submitForm(event) {
        event.preventDefault()

        if (formType === "add") {
            submitNewAlbum(event);
        } else if (formType === "update") {
            submitUpdatedAlbum(event)
        } else {
            console.error("incorrect form type");
        }
    }

    function submitNewAlbum(event) {
        
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


        closeForm();


        setArtist("");
        setName("");
    }

    function submitUpdatedAlbum(event) {
        alert("updating album...")
        closeForm();
    }

    return (
        <dialog className="album-add" open={formOpened}>
                <form onSubmit={submitForm} id="albumForm" enctype="multipart/form-data">
                    <article>
                        <a onClick={closeForm} href="#close" aria-label="Close" class="close"></a>

                        <h3>{header}</h3>
                        <label for="artist">Artist</label>
                        <input type="artist" id="artist" name="artist" required
                            onChange={(e) => setArtist(e.target.value)}
                            value={artist}/>
                        <label for="name">Album name</label>
                        <input type="name" id="name" name="name" required
                            onChange={(e) => setName(e.target.value)}
                            value={name}/>

                        <label for="cover">Cover
                            <input accept="image/png, image/jpeg" type="file" id="cover" name="cover"
                                onChange={(e) => setCover(e.target.files[0])}
                                />
                        </label>

                        <footer>
                            <button>{submitText}</button>
                            <a onClick={closeForm} href="#cancel" className="secondary cancel-button" role="button">Cancel</a>
                        </footer>
                    </article>
                </form>
        </dialog>
    );
}

export default AlbumForm;