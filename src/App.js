import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AlbumList from "./AlbumList";
import AlbumForm from './AlbumForm';
import { useState, useEffect } from "react";


function App() {
    const [addFormOpened, setAddFormOpened] = useState(false);
    const [updateFormOpened, setUpdateFormOpened] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/albums")
            .then(res => res.json())
            .then(json => setAlbums(json));
    }, [updated]);


    function openAddForm() {
        setAddFormOpened(true)
        document.querySelector("html").classList.add("modal-is-open");
    }

    function closeAddForm() {
        setAddFormOpened(false);
        document.querySelector("html").classList.remove("modal-is-open");
    }


    function openUpdateForm(album) {
        setSelectedAlbum(album);
        setUpdateFormOpened(true);
        document.querySelector("html").classList.add("modal-is-open");
    }

    function closeUpdateForm() {
        setUpdateFormOpened(false);
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

                    <AlbumList albums={albums} setAlbums={setAlbums} openUpdateForm={openUpdateForm}/>

                    <AlbumForm formType="add"
                               formOpened={addFormOpened} 
                               closeForm={closeAddForm} 
                               updateAlbumList={updateAlbumList}/>

                    <AlbumForm formType="update"
                               formOpened={updateFormOpened} 
                               closeForm={closeUpdateForm} 
                               selectedAlbum={selectedAlbum}
                               updateAlbumList={updateAlbumList}/>

                </div>
            </main>
        </>
    );
}

export default App;
