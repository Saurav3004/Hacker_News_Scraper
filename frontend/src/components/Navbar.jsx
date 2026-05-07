import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="flex justify-between p-4 shadow ">
      <Link to="/">HN Clone</Link>

      <div className="space-x-4">
        {token && <Link to="/bookmarks" className="cursor-pointer hover:underline">Bookmarks</Link>}
        {token ? (
          <button onClick={logout} className="bg-red-500 text-white rounded-md px-4 py-2 cursor-pointer">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;