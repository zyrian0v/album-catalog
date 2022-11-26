import "./AlbumAddForm.css";

function AlbumAddForm({addFormOpened, closeAddForm}) {
    
    return (
        <dialog className="album-add-form" open={addFormOpened}>
            <article>
                    <a onClick={closeAddForm} href="#close" aria-label="Close" class="close"></a>

                <h3>Add an album</h3>
                <form enctype="multipart/form-data">
                    <label for="artist">Artist</label>
                    <input type="artist" id="artist" name="artist" required/>


                    <label for="album-name">Album name</label>
                    <input type="album-name" id="album-name" name="album-name"  required/>

                    <label for="cover">Cover
                        <input accept="image/png, image/jpeg" type="file" id="cover" name="cover"/>
                    </label>
                </form>
                <footer>
                    <a onClick={closeAddForm} href="#cancel" role="button" class="secondary">Cancel</a>
                    <a href="#confirm" role="button">Confirm</a>
                </footer>
            </article>
        </dialog>
    );
}

export default AlbumAddForm;