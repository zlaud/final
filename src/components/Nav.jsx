import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-between items-center w-full mb-16 pt-6 px-5">
      <Link to="/">Home</Link>
      <Link to="/create">
        <button>Create Prompt</button>
      </Link>
    </div>
  );
};

export default Nav;
