import { Logo } from "./Logo";
import { FileDirectory } from "./FileDirectory";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <Logo />
      <FileDirectory />
    </div>
  );
}

export default NavBar;
