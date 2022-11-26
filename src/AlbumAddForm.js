function AlbumAddForm({addFormOpened, closeAddForm}) {
    
    return (
        <dialog open={addFormOpened}>
            <article>
                <h3>Confirm your action!</h3>
                <p>
                Mauris non nibh vel nisi sollicitudin malesuada. 
                Donec ut sagittis erat. Praesent eu eros felis. 
                Ut consectetur placerat pulvinar.
                </p>
                <footer>
                <a onClick={closeAddForm} href="#cancel" role="button" class="secondary">Cancel</a>
                <a href="#confirm" role="button">Confirm</a>
                </footer>
            </article>
        </dialog>
    );
}

export default AlbumAddForm;