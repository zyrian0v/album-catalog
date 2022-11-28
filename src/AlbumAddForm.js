import "./AlbumAddForm.css";
import { useState } from "react";

function AlbumAddForm({submitNewAlbum, addFormOpened, closeAddForm}) {

    return (
        <dialog className="album-add-form" open={addFormOpened}>
                <form onSubmit={submitNewAlbum} id="albumAddForm" enctype="multipart/form-data">
                <article>

                    <a onClick={closeAddForm} href="#close" aria-label="Close" class="close"></a>

                    <h3>Add an album</h3>
                        <label for="artist">Artist</label>
                        <input type="artist" id="artist" name="artist" required/>


                        <label for="name">Album name</label>
                        <input type="name" id="name" name="name"  required/>

                        <label for="cover">Cover
                            <input accept="image/png, image/jpeg" type="file" id="cover" name="cover"/>
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