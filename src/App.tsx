import './App.css';
import { Header } from "./components/header/Header";
import { Router } from './components/router/Router';
import { Box } from "@chakra-ui/react"

function App() {
  return (
    <>
      <Box margin="auto" >
        <Header />
        <Router />
      </Box>
    </>

  );
}

export default App;
