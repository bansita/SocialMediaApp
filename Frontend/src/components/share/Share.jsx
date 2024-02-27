import { useContext, useRef, useState } from "react"
import "./share.css"
import { EmojiEmotions, Label, PermMedia, Room ,Cancel} from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Share() {
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDOR;
    const desc=useRef();
    const[file,setFile]=useState();
    const submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data=new FormData();
            const FileName=Date.now()+file.name;
            data.append("name",FileName);
            data.append("file",file);
            newPost.img=FileName;
            try{
                await axios.post("/upload",data);
            }catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post("/posts",newPost);
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? PF+user.profilePicture :PF+"Person/noAvatar.png"} alt="" className="shareProfileImg" />
                <input placeholder={"What's on your mind "+user.username + "?"} className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr" />
            {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
            <form className="shareButtom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{
                            setFile(e.target.files[0])
                        }}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                <button className="shareButton" type="submit">Share</button>
                </div>
            </form>
        </div>
    </div>
  )
}
