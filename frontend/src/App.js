import "./App.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
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
            <TextField
              variant="filled"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
              Go!
            </button>
          </span>
          <span className="right">
            <p>Number of searches:</p>
            <p className="count">{countSearch}</p>
          </span>
        </div>
        <Card variant="outlined" sx={{ textAlign: "center", height: 300 }}>
          <p className="smallHeader">Text Files Found:</p>
          <Divider />
          {searchResults.map((file) => (
            <p key={file}>{file}</p>
          ))}
        </Card>
      </div>
    </div>
  );
}

export default App;
