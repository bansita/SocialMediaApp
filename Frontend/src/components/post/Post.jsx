import { MoreVert } from "@mui/icons-material"
import "./post.css"
// import {Users} from "../../dummyData"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    const [like,setLike]=useState(post.likes.length);
    const [isliked,setIsLiked]=useState(false);
    const [users,setUsers]=useState({});
    const PF=process.env.REACT_APP_PUBLIC_FOLDOR;
    const {user}=useContext(AuthContext);
    useEffect(()=>{
        setIsLiked(post.likes.includes(user._id));
    },[user._id,post.likes])
    useEffect(()=>{
        const fetchUser= async()=>{
          const res= await axios.get(`/user?userId=${post.userId}`);
          console.log(res)
          setUsers(res.data);
        }
        fetchUser();
      },[])
    const likehandler=()=>{
        try{
            axios.put("/posts/"+post._id+"/like",{userId:user._id})
        }catch(err){

        }
        setLike(isliked? like-1 :like+1);
        setIsLiked(!isliked)
    }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${users.username}`}>
                    <img className="postProfileImg" src={users.profilePicture? PF+users.profilePicture : PF+"Person/noAvatar.png"} alt="" />
                    </Link>
                    <span className="postUsername">{users.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF+post.img}alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likehandler} alt="" />
                    <img className="likeIcon" src={`${PF}heart.png`} onClick={likehandler} alt="" />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <div className="postCommentText">{post.comment} comments</div>
                </div>
            </div>
        </div>
    </div>
  )
}
