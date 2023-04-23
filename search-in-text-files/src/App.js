import "./App.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function App() {
  const [searchesNum, setSearchesNum] = useState(0);
  return (
    <div className="App">
      <div className="header">Search In The Text Files</div>
      <div className="container">
        <div className="row">
          <span className="left">
            <strong>Search: </strong>
            <TextField id="outlined-basic" variant="outlined" />
          </span>
          <span className="right">
            <p>Number of searches</p>
            <p className="searchesNum">{searchesNum}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
