import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteUser } from "../services/authService";

const Navbar = ({ size }) => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate('/');
  };

  const delUser = async () => {
    const data = {
      id: localStorage.getItem('userID'),
    }
    console.log('Trying to delete: ', JSON.stringify(data));

    const res = await deleteUser(data);
    console.log('delete user result: ', res)
    if (res && res.status === 200) {
      console.log('res delete user: ' + JSON.stringify(res.data));
      logout();
    }
    else {
      console.log(res);
      alert('Failed: ' + res)
    }
  };

  const isLoggedIn = () => {
    if (localStorage.getItem("userID"))
      return true;
    return false;
  }
  return (
    <div className="shadow-lg backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
      <nav className="flex items-center container mx-auto">
        <div>
          <Link to="/" className="text-gray-700 italic text-7xl">
            ITS
          </Link>
        </div>
        <ul className="list-none flex justify-center items-center ml-auto gap-5">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          {!isLoggedIn() &&
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          }
          <li>
            <NavLink to="/stav">Stav</NavLink>
          </li>
          <li>
            <NavLink to="/adar">Adar</NavLink>
          </li>
          <li>
            <NavLink to="/Ido">Ido</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="cart" >
              <span>{size} </span>
              <FaShoppingCart />
            </NavLink>
          </li>
          {isLoggedIn() &&
            <>
              <li>
                <NavLink to="/login" onClick={delUser}>Delete User</NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={logout}>Logout</NavLink>
              </li>
            </>
          }

        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

