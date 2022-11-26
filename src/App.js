import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AlbumList from "./AlbumList";
import AlbumAddForm from './AlbumAddForm';
import { useState } from "react";

function App() {
  const [addFormOpened, setAddForm] = useState(false);

  function openAddForm() {
    setAddForm(true)
    document.querySelector("html").classList.add("modal-is-open");
  }

  function closeAddForm() {
    setAddForm(false);
    document.querySelector("html").classList.remove("modal-is-open");
  }
  
  
  return (
    <>
      <Header openAddForm={openAddForm}/>
      <main class="container">
        <div className="App">
          <p>Here are you favorite albums.</p>

          <AlbumList/>

          <AlbumAddForm addFormOpened={addFormOpened} closeAddForm={closeAddForm}/>
        </div>
      </main>
    </>
  );
}

export default App;
