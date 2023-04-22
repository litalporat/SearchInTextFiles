import "./App.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { margin } from "@mui/system";

function App() {
  return (
    <div className="App">
      <div className="header">Search In The Text Files</div>
      <Container maxWidth="lg" fixed sx={{ margin: 10 }}>
        <TextField id="outlined-basic" variant="outlined" />
      </Container>
    </div>
  );
}

export default App;
