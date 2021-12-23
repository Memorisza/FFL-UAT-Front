import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser]= useState({})
    const username = useParams().username

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    },[username])

    return (
        <>
        <Topbar/>
        <div className="profile">
            <div className="profileRight">
            {/* <div className="profileRightTop">
            <div className="profileCover">
                <img className="profileUserImg"src={user.profilePicture ? PF+user.profilePicture : PF+"person.png"} alt="" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <button>change name</button>
            </div>
            </div> */}
            <div className="profileRightBottom">
            <Feed username={username}/>
            </div>
            </div>
        </div>
        </>
    )
}
