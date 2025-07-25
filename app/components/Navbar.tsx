import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient pacifico-regular -tracking-normal leading-loose">
          Deby AI
        </p>
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Analyse Ton CV
      </Link>
    </nav>
  );
};

export default Navbar;
