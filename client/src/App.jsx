import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Registration from "./pages/registration/Registration";
import Addmovie from "./pages/addmovie/Addmovie";
import Allmovies from "./pages/allmovies/Allmovies";
import Physical from "./pages/physical/Physical";
import Digital from "./pages/digital/Digital";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MediaProvider } from "./context/MediaContext";

function App() {
  return (
    <div className="App">
      <MediaProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/movie" element={<Addmovie />} />
            <Route path="/allmovies" element={<Allmovies />} />
            <Route path="/physical" element={<Physical />} />
            <Route path="/digital" element={<Digital />} />
          </Routes>
        </Router>
      </MediaProvider>
    </div>
  );
}

export default App;
