import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing the required components
import Board from "./containers/Board";
import Quiz from "./containers/Quiz";
import Header from "./components/Header";
import Landing from "./containers/Landing";
import LinearSearch from "./containers/LinearSearch";
import BinarySearch from "./containers/BinarySearch";
// import Website from "./public/CodeSense/CodeSense"

// Importing the CSS File
import "./App.css";
import Choose2 from "./containers/Choose2";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/CodeSense" element={<Choose2 />} />
          <Route path="/CodeSense/Linear-Search" element={<LinearSearch />} />
          <Route path="/CodeSense/Binary-Search" element={<BinarySearch />} />
          <Route path="/assessment/board" element={<Board />} />
          <Route path="/assessment/quiz" element={<Quiz />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
