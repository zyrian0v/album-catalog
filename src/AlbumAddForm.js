import "./AlbumAddForm.css";

function AlbumAddForm({addFormOpened, closeAddForm}) {

    function sendNewAlbum() {
        const form = document.querySelector("#albumAddForm")
        const data = new FormData(form);
        const json = Object.fromEntries(data);
        console.log(json)
        fetch("http://localhost:8080/albums/new", {
            method: "POST",
            body: JSON.stringify(json),
        })

        closeAddForm();
    }
    
    return (
        <dialog className="album-add-form" open={addFormOpened}>
            <article>
                <a onClick={closeAddForm} href="#close" aria-label="Close" class="close"></a>

                <h3>Add an album</h3>
                <form id="albumAddForm" enctype="multipart/form-data">
                    <label for="artist">Artist</label>
                    <input type="artist" id="artist" name="artist" required/>


                    <label for="name">Album name</label>
                    <input type="name" id="name" name="name"  required/>

                    <label for="cover">Cover
                        <input accept="image/png, image/jpeg" type="file" id="cover" name="cover"/>
                    </label>
                </form>
                <footer>
                    <a onClick={closeAddForm} href="#cancel" role="button" class="secondary">Cancel</a>
                    <a onClick={sendNewAlbum} href="#confirm" role="button">Confirm</a>
                </footer>
            </article>
        </dialog>
    );
}

export default AlbumAddForm;