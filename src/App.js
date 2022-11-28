import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AlbumList from "./AlbumList";
import AlbumAddForm from './AlbumAddForm';
import { useState, useEffect } from "react";


function App() {
    const [addFormOpened, setAddForm] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/albums")
            .then(res => res.json())
            .then(json => setAlbums(json));
    }, [updated]);


    function openAddForm() {
        setAddForm(true)
        document.querySelector("html").classList.add("modal-is-open");
    }

    function closeAddForm() {
        setAddForm(false);
        document.querySelector("html").classList.remove("modal-is-open");
    }

    function submitNewAlbum(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const json = Object.fromEntries(data);
        json.id = albums.length
        fetch("http://localhost:8080/albums/new", {
            method: "POST",
            body: JSON.stringify(json),
        })
        .then(res => setUpdated(updated + 1))

        closeAddForm();
    }


    return (
        <>
            <Header openAddForm={openAddForm}/>
            <main class="container">
                <div className="App">
                    <p>Here are you favorite albums.</p>

                    <AlbumList albums={albums}/>

                    <AlbumAddForm submitNewAlbum={submitNewAlbum} addFormOpened={addFormOpened} closeAddForm={closeAddForm}/>
                </div>
            </main>
        </>
    );
}

export default App;
