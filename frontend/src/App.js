import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { httpService } from "./http-service";

const socket = io("http://localhost:5001");

function App() {
  const [countSearch, setCountSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    socket.on("search", () => {
      setCountSearch((prevNum) => prevNum + 1);
    });
    httpService.getSearchesCount().then(({ count }) => {
      setCountSearch(count);
    });

    return () => socket.removeAllListeners();
  }, []);

  const handleSearch = async () => {
    const { files } = await httpService.getSearchResult(searchInput);
    setSearchResults(files);
  };

  return (
    <div className="app">
      <div className="header">Search In The Text Files</div>
      <div className="gridContainer">
        <div className="row">
          <span className="left">
            <strong>Search: </strong>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            ></input>

            <button className="btn" onClick={handleSearch}>
              Go!
            </button>
          </span>
          <span className="right">
            <p>Number of searches:</p>
            <p className="count">{countSearch}</p>
          </span>
        </div>
        <div className="card">
          <p className="smallHeader">Text Files Found:</p>
          <hr></hr>
          {searchResults.map((file) => (
            <p key={file}>{file}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
