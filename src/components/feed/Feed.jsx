import { useContext, useEffect, useState, useRef } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { Search } from "@mui/icons-material";
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import WeekendIcon from '@mui/icons-material/Weekend';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';

export default function Feed({ username }) {
    const [posts, setPost] = useState([]);
    const { user } = useContext(AuthContext)
    const search = useRef();
    const [searchInput, setSearchInput] = useState("");
    const [filterInput, setFilterInput] = useState("");


    //const fetchSearch = async () => {
    //     try {
    //       const resSearch = await axios.get("/posts/feeds/search/" + searchInput);
    //       console.log("success");
    //       console.log(resSearch);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    // }
    const handleSearch = async () => {
        // setSearchInput(document.getElementById("searchInput").value);
        setSearchInput(search.current.value);
        try {
            const resSearch = await axios.get(process.env.REACT_APP_BACKEND_URL + "/posts/feeds/search/" + searchInput);
            console.log("success");
            console.log(resSearch);
            //   setPost(
            //     resSearch.data.sort((p1, p2) => {
            //       console.log("sort2");
            //       return new Date(p2.createdAt) - new Date(p1.createdAt);
            //     })
            //   );
            setPost(resSearch.data);
        } catch (err) {
            console.log(err);
        }
    };
    // fetchSearch();
    const handleFilter = async () => {
        // setSearchInput(document.getElementById("searchInput").value);
        let APPLIANCES = document.getElementById("1");
        let CLOTHES = document.getElementById("2");
        let FURNITURES = document.getElementById("3");
        let MEDICAL = document.getElementById("4");
        let STUDY = document.getElementById("5");
        let OTHERS = document.getElementById("6");
        if (APPLIANCES.checked === true) {
            setFilterInput("APPLIANCES");
        } if (CLOTHES.checked === true) {
            setFilterInput("CLOTHES");
        } if (FURNITURES.checked === true) {
            setFilterInput("FURNITURES");
        } if (STUDY.checked === true) {
            setFilterInput("STUDY");
        } if (MEDICAL.checked === true) {
            setFilterInput("MEDICAL");
        } if (OTHERS.checked === true) {
            setFilterInput("OTHERS");
        }
        console.log(filterInput);
        try {
            const resSearch = await axios.get(process.env.REACT_APP_BACKEND_URL + "posts/feeds/tag/" + filterInput);
            console.log("filterInput");
            console.log(filterInput);
            //   setPost(
            //     resSearch.data.sort((p1, p2) => {
            //       console.log("sort2");
            //       return new Date(p2.createdAt) - new Date(p1.createdAt);
            //     })
            //   );
            setPost(resSearch.data);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(process.env.REACT_APP_BACKEND_URL + "/posts/profile/" + username)
                : await axios.get(process.env.REACT_APP_BACKEND_URL + "/posts/timeline/" + user._id)
            setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                console.log(res.data)
            })
            )
            // setPost(res.data);
        }
        fetchPosts()
    }, [username, user._id])


    return (


        <div className="feed">
            <div className="sidebar">
            <ul className="searchbytags">Search by Tags</ul>
                <br></br>
                <hr></hr>
                <br></br>
                <div className="sidebarList" onClick={handleFilter}>
                     <ul >
                        <li className="sidebarListItem" >
                            <DevicesIcon className="sidebarIcon"></DevicesIcon>
                            <input type="radio" name="tag" value="APPLIANCES" id="1" />
                            <span className="sidebarlistItemText"> APPLIANCES</span>
                        </li>
                        <br></br>
                        <li className="sidebarListItem" >
                            <CheckroomIcon className="sidebarIcon"></CheckroomIcon>
                            <input type="radio" name="tag" value="CLOTHES" id="2" />
                            <span className="sidebarlistItemText"> CLOTHES</span>
                        </li>
                        <br></br>
                        <li className="sidebarListItem">
                            <WeekendIcon className="sidebarIcon"> </WeekendIcon>
                            <input type="radio" name="tag" value="FURNITURES" id="3" />
                            <span className="sidebarlistItemText"> FURNITURES</span>
                        </li>
                        <br></br>
                        <li className="sidebarListItem">
                            <MedicalServicesIcon className="sidebarIcon" ></MedicalServicesIcon>
                            <input type="radio" name="tag" value="MEDICAL" id="4" />
                            <span className="sidebarlistItemText"> MEDICAL</span>
                        </li>
                        <br></br>
                        <li className="sidebarListItem">
                            <LocalLibraryIcon className="sidebarIcon"></LocalLibraryIcon>
                            <input type="radio" name="tag" value="STUDY" id="5" />
                            <span className="sidebarlistItemText"> STUDY</span>
                        </li>
                        <br></br>
                        <li className="sidebarListItem" >
                            <OtherHousesIcon className="sidebarIcon" ></OtherHousesIcon>
                            <input type="radio" name="tag" value="OTHERS" id="6" />
                            <span className="sidebarlistItemText"> OTHERS</span>
                        </li>
                    </ul>
                    <br></br><br></br>
                    <hr></hr> 
                </div>
            </div>
            {/* <div className="timeline"> */}
                {/* <div className="topWrapper"> */}
                {/* </div> */}
                <div className="feedWrapper">
                    <div className="searchbar">
                        <Search style={{cursor:"pointer"}}className="searchIcon" onClick={handleSearch}/>
                        <input placeholder=" Search !" className="searchInput" ref={search} style={{ backgroundColor: "rgb(202, 196, 196)" }} />
                        {/* <Button variant="text" className="searchInput" onClick={handleSearch} >
                            submit
                        </Button> */}
                    </div>
                    {(!username || username === user.username) && <Share></Share>}
                    {posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>
            {/* </div> */}
        </div>
    )
}
