import "./topbar.css"
import {Search,Person ,Chat , Notifications , Logout} from "@mui/icons-material"
import { useContext } from "react";
import {Link, Navigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
export default function Topbar() {
  const {user,dispatch}=useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDOR;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon"/>
          <input placeholder="Search for friend , post and video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcon">
          <div className="topbarIconitem">
            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconitem">
            <Chat/>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconitem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconitem" onClick={()=>{
            localStorage.removeItem("user");
            dispatch({
              type:"LOGIN_SUCCESS",
              payload:null
            })
          }}>
            <Link to="/login">Logout</Link>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture? PF+user.profilePicture: PF+"Person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}
