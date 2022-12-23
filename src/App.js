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

    function updateAlbumList() {
        setUpdated(updated + 1)
    }

    return (
        <>
            <Header openAddForm={openAddForm}/>
            <main class="container">
                <div className="App">
                    <p>Here are you favorite albums.</p>

                    <AlbumList albums={albums} setAlbums={setAlbums}/>

                    <AlbumAddForm addFormOpened={addFormOpened} 
                                  closeAddForm={closeAddForm} 
                                  updateAlbumList={updateAlbumList}/>
                </div>
            </main>
        </>
    );
}

export default App;
