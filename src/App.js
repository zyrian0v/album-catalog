import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import AlbumList from "./AlbumList";

function App() {
  return (
    <body>
      <Header/>
      <main class="container">
        <div className="App">
          <p>Here are you favorite albums.</p>

          <AlbumList/>
        </div>
      </main>
    </body>
  );
}

export default App;
