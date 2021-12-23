import "./message.css"
import {format} from "timeago.js"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Message({message, own}) {
    return(
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={PF+"person.png"} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}