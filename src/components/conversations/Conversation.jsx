import { useState, useEffect } from "react"
import "./conversation.css"
import axios from "axios"

export default function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios(process.env.REACT_APP_BACKEND_URL + "/users?userId=" + friendId);
                setUser(res.data) ;
                console.log(res) ;
            } catch(err) {
                console.log(err) ;
            }
        };
        getUser() ;
    }, [currentUser, conversation]);

    return(
        <div className="conversation">
             <img className="conversationImg" src=
             {user?.profilePicture ? PF + user.profilePicture : PF +"person.png"} 
             alt="" />
            <span className="conversationName">
            {user?.username}
            </span>
        </div>
    )
}