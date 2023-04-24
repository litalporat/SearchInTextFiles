import "./App.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5002");

function App() {
  const [searchesNum, setSearchesNum] = useState();
  const [currentSearch, setCurrentSearch] = useState();

  useEffect(() => {
    socket.on("search", () => {
      setSearchesNum((prevNum) => {
        return prevNum + 1;
      });
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5001/search/searchesnum").then((sn) => {
      setSearchesNum(sn.data);
    });
  }, []);

  const handleSearch = () => {
    const newSearch = document.getElementById("searchField").value;
    axios.get(`http://localhost:5001/textFiles/${newSearch}`).then((tf) => {
      console.log(tf.data);
      setCurrentSearch(tf.data);
    });
    axios.get(`http://localhost:5001/search/${newSearch}`).then((resp) => {
      console.log(resp.data);
    });
  };

  return (
    <div className="App">
      <div className="header">Search In The Text Files</div>
      <div className="grid-container">
        <div className="row">
          <span className="left">
            <strong>Search: </strong>
            <TextField id="searchField" variant="filled" />
            <button className="btn" onClick={handleSearch}>
              Go!
            </button>
          </span>
          <span className="right">
            <p>Number of searches:</p>
            <p className="searches-num">{searchesNum}</p>
          </span>
        </div>
        <Card variant="outlined" sx={{ textAlign: "center", height: 300 }}>
          <p className="small-header">Text Files Found:</p>
          <Divider />
          {currentSearch && currentSearch.map((file) => <p>{file}</p>)}
        </Card>
      </div>
    </div>
  );
}

export default App;
