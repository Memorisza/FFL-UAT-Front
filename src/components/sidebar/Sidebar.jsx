import { Bookmark, Chat, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed} from "@mui/icons-material"
import "./sidebar.css"

export default function Sidebar() {
    
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="searchbytags">Search by Tags</ul>
                <br></br>
                <hr></hr>
                <br></br>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">APPLIANCES</span>
                    </li>
                    <br></br>
                    <li className="sidebarListItem">
                        <Chat className = "sidebarIcon"></Chat>
                        <span className="sidebarlistItemText">CLOTHES</span>
                    </li>
                    <br></br>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">FURNITURES</span>
                    </li>
                    <br></br>
                    <li className="sidebarListItem">
                        <Group className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">MEDICAL</span>
                    </li>
                    <br></br>
                    <li className="sidebarListItem">
                        <Bookmark className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">STUDY</span>
                    </li>
                    <br></br>  
                    <li className = "sidebarListItem">
                        <HelpOutline className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">OTHERS</span>
                    </li>
                </ul>
                <hr className="sidebarHr"></hr>
            </div>
        </div>
    )
}
