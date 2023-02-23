import "./AlbumForm.css";
import { useState, useEffect } from "react";

function AlbumForm({formType, closeForm, updateAlbumList, selectedAlbum}) {
    const [id, setId] = useState(null);
    const [artist, setArtist] = useState("");
    const [name, setName] = useState("");
    const [cover, setCover] = useState(null);
    

    let header;
    let submitText;
    if (formType === "add") {
        header = "Add an album"
        submitText = "Add"
    } else if (formType === "update") {
        header = "Update an album"
        submitText = "Update"
    }

    function populateFields() {
        if (selectedAlbum && formType === "update") {
            if (id !== selectedAlbum.id) {
                setId(selectedAlbum.id)
            }
            
            if (artist !== selectedAlbum.artist) {
                setArtist(selectedAlbum.artist)
            }

            if (name !== selectedAlbum.name) {
                setName(selectedAlbum.name)
            }
        }
    }

    useEffect(() => {
        populateFields()
    }, [selectedAlbum])


    function submitForm(event) {
        event.preventDefault()

        const json = {
            artist: artist,
            name: name,
        }
        const form = new FormData();
        form.append("json", JSON.stringify(json));
        form.append("cover", cover);
        
        let request;
        if (formType === "add") {
            request = fetch("http://localhost:8080/albums/new", {
                method: "POST",
                body: form,
            })
        } else if (formType === "update") {
            request = fetch(`http://localhost:8080/albums/${id}/update`, {
                method: "POST",
                body: form,
            })
        }
        request.then(res => updateAlbumList())
        

        closeForm();
    }


    return (
        <dialog className="album-add" open>
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