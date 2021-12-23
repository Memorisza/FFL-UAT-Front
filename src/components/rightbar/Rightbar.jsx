import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"

export default function Rightbar({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const HomeRightbar = ()=>{
        return(
            <>
            <div className="birthdayContainer">
                    <img src="" alt="" />
                    <span className="birthdayText">
                    <img className ="birthdayImg"
                        src={`${PF}CMYK.png`} alt="" />
                        <b>hello</b>and 3 birth
                    </span>
                </div>
                <img className ="rightbarAd"
                        src={`${PF}CMYK.png`} alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=>(
                    <Online key={u.id} user={u}/>))}
                </ul>
            </>
        )
    }
    const ProfileRightBar = () =>{
        return(
        <>
        <h4 className="rightbarTitle">User Infornamtion</h4>
        <div className="rightbarInfo">
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City :</span>
            <span className="rightbarInfoValue"> {user.city}</span>
        </div>
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From :</span>
            <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relation :</span>
            <span className="rightbarInfoValue"> {user.relationship ===1? "married":user.relationship ===1?"single":"-"}</span>
        </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
            <div className="rightbarFollowing">
                <img className="rightbarFollowingImg" src={`${PF}CMYK.png`} alt="" />
                <span className="rightFollowingName">gohn</span>
            </div>
        </div>
        </>
        )
    }
    return (
        <div className = "rightbar">
            <div className="rightbarWrapper">
                {user? <ProfileRightBar/>: <HomeRightbar></HomeRightbar>}
            </div>
        </div>
    )
}
