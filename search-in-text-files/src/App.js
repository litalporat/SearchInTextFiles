import "./App.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useState } from "react";

function App() {
  const [searchesNum, setSearchesNum] = useState(0);
  return (
    <div className="App">
      <div className="header">Search In The Text Files</div>
      <div className="grid-container">
        <div className="row">
          <span className="left">
            <strong>Search: </strong>
            <TextField id="outlined-basic" variant="filled" />
          </span>
          <span className="right">
            <p>Number of searches</p>
            <p className="searchesNum">{searchesNum}</p>
          </span>
        </div>
        <Card variant="outlined" sx={{ textAlign: "center", height: 400 }}>
          <p>Text Files Found:</p>
          <Divider />
        </Card>
      </div>
    </div>
  );
}

export default App;
