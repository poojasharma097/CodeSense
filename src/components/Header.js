import logo2 from "../assets/logo2.jpg";

import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo2} alt="logo" />
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/CodeSense">CodeSense</Link>
        <Link to="/assessment/quiz">Quiz</Link>
        <Link to="/assessment/board">Game</Link>
      </nav>
    </header>
  );
};

export default Header;