import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing the required components
import Board from "./containers/Board";
import Quiz from "./containers/Quiz";
import Header from "./components/Header";
import Landing from "./containers/Landing";
<<<<<<< HEAD
import ObjectDetection from "./containers/ObjectDetection";

// Importing the CSS File
import "./App.css";
import Ocr from "./containers/Ocr";
import Choose from "./containers/Choose";
=======
import LinearSearch from "./containers/LinearSearch";
import BinarySearch from "./containers/BinarySearch";
// import Website from "./public/CodeSense/CodeSense"

// Importing the CSS File
import "./App.css";
import Choose2 from "./containers/Choose2";
>>>>>>> a9e7a6b1c754d16dcd8601bc487a111faff6122a

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
<<<<<<< HEAD
          <Route path="/assessment/ocr" element={<Ocr />} />
          <Route path="/assessment/object-detection" element={<ObjectDetection />}/>
          <Route path="/assessment/board" element={<Board />} />
          <Route path="/assessment/quiz" element={<Quiz />} />
          <Route path="/assessment" element={<Choose />}/>
=======
          <Route path="/CodeSense" element={<Choose2 />} />
          <Route path="/CodeSense/Linear-Search" element={<LinearSearch />} />
          <Route path="/CodeSense/Binary-Search" element={<BinarySearch />} />
          <Route path="/assessment/board" element={<Board />} />
          <Route path="/assessment/quiz" element={<Quiz />} />
>>>>>>> a9e7a6b1c754d16dcd8601bc487a111faff6122a
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
