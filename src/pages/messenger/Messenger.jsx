import "./messenger.css" ;
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation" ;
import Message from "../../components/message/Message" ;
import ChatOnline from "../../components/chatOnline/ChatOnline" ;
import { useContext, useState, useEffect, useRef} from "react" ;
import { AuthContext } from "../../context/AuthContext" ;
import axios from "axios";
import { io } from "socket.io-client"

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async() => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/conversations/"+ user._id)
                setConversations(res.data) ;
                console.log(res)
            } catch(err) {
                console.log(err) ;
            }
        };
        getConversations() ;
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/messages/" + currentChat?._id) ;
                setMessages(res.data) ;
            } catch(err) {}
        };
        getMessages() ;
    }, [currentChat]) ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        const message = {
            sender: user._id,
            text: newMessage, 
            conversationId: currentChat._id
        };
        
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user.id,
            receiverId,
            text: newMessage,
        });

        try{
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + "/messages", message) ;
            setMessages([...messages, res.data]) ;
            setNewMessage("") ;
        } catch(err) {
            console.log(err)
        }
    };

    // useEffect(() => {
    //     scrollRef.current.scrollIntoView({behavior: "smooth"}) ;
    // }, [messages]);

    return(
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Users" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div className="" onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser = {user}/>
                            </div>
                        ))}            
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                        (<>
                        <div className="chatBoxTop">
                            {messages.map((m) => (
                                <div ref={scrollRef}>
                                    <Message message = {m} own={m.sender === user._id} />
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write something here" 
                            onChange = {(e) => setNewMessage(e.target.value)} value={newMessage} />
                            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                        </div>
                        </>) : (<span className="noConversationText"> Open Conversation to Start Chat</span>) }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline 
                        onlineUsers = {onlineUsers} 
                        currentId = {user._id} 
                        setCurrentChat = {setCurrentChat} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

