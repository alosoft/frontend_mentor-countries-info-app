import { Routes, Route } from "react-router-dom";
import './App.css';
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home"
import Details from './components/Details/Details';
import { ThemeProvider } from './theme';

const App = (props) => {
  console.log(props);

  return (
    <>
      <ThemeProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:code" element={<Details />} />
        </Routes>
      </ThemeProvider>

    </>
  );
}

export default App;
