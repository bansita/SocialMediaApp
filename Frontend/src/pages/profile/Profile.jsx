import "./profile.css"
import Feedbar from '../../components/feed/Feedbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDOR;
  const [users,setUsers]=useState({});
  const username=useParams().username;
    useEffect(()=>{
        const fetchUser= async()=>{
          const res= await axios.get(`/user?username=${username}`) ;
          setUsers(res.data);
        }
        fetchUser(username);
      },[username])
  return (
    <>
    <Topbar/>
    <div className="profile">
    <Sidebar/>
    <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img src={users.coverPicture? PF+users.coverPicture : PF+"Person/noCover.jpg"} alt="" className="profileCoverImg" />
            <img src={users.profilePicture? PF+users.profilePicture : PF+"Person/noAvatar.png"}  alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{users.username}</h4>
                <span className="profileInfoDesc">{users.desc}</span>
            </div>
        </div>
        <div className="profileRightBottom">
           <Feedbar username={username}/>
           <Rightbar user={users}/>
        </div>
    </div>
    </div>
    </>
  )
}
