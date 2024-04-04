import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import './Profile.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    navigate('/')
    closeMenu();
  };

    return (
      <div className="profiledivcontainer">
        {!showMenu && (
          <ul className={"profile-dropdown"} ref={ulRef}>
              <>
                <li>Hello, {user.username}!</li>
                <li>{user.email}</li>
                <li>
                  <div className="logoutdivcontainer">
                    <div className="logoutdiv" onClick={logout}>
                      Log out {user.first_name} {user.last_name}
                    </div>
                  </div>
                </li>
              </>
          </ul>
        )}


      </div>
    );
}

export default ProfileButton;
