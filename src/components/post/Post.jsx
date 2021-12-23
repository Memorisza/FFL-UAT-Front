import { ThumbUp, Message } from "@mui/icons-material"
import "./post.css"
import { useContext, useEffect, useState, useRef } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import "./post.css";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ReactMapGL, { Marker } from 'react-map-gl';


const ITEM_HEIGHT = 48;


const styleModal = {
  position: "relative",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "30%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const styleMapModal = {
  position: "relative",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "60%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalMap, setOpenModalMap] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([])
  const desc = useRef();
  const [openCommentModal, setOpenCommentModal] = useState(false);
  // const [commentStoreForDelete, setCommentStoreForDelete] = useState([]);
  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 13.65004,
    longitude: 100.49449,
    zoom: 16
  });

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    console.log("post");
    console.log(post);
    console.log(post._id);
    console.log(post);
    console.log(post.img);
  }, [post]);

  const likeHandler = () => {
    try {
      axios.put(process.env.REACT_APP_BACKEND_URL + "/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deletePost = async () => {
    if (currentUser._id === post.userId) {
      try {
        setLoading(true);
        await axios.delete(process.env.REACT_APP_BACKEND_URL + "/posts/" + post._id);
        setLoading(false);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("not your post");
    }
  }

  //   useEffect(() => {
  //     {
  //       comments.map((value, index) => {
  //         return (
  //           <li key={index}>
  //           </li >
  //     })
  //     }
  //   };
  // }, [comments])

  const handleCloseEditModal = () => {
    setOpenModalEdit(false);
  };

  const submitEdit = async () => {
    updatePost();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updatePost = async () => {
    if (currentUser._id === post.userId) {
      try {
        await axios.put(process.env.REACT_APP_BACKEND_URL + "/posts/" + post._id, { desc: value });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("not your post");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const checkUserPost = () => {
    if (currentUser._id === post.userId) {
      setOpenModalEdit(true);
    } else {
      alert("not your post!!!");
    }
  };

  const handleCloseMapModal = () => {
    setOpenModalMap(false)
  }

  const updatePin = async () => {
    if (currentUser._id === post.userId) {
      try {
        await axios.put(process.env.REACT_APP_BACKEND_URL + "/posts/" + post._id, { lat: newPlace.lat, long: newPlace.long });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("not your post");
    }
  };
  const handleAddClick = (e) => {
    if (currentUser._id === post.userId) {
      const [longitude, latitude] = e.lngLat;
      setNewPlace({
        lat: latitude,
        long: longitude
      })
    }
  }

  const modalMap = (
    <Modal
      open={openModalMap}
      onClose={handleCloseMapModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleMapModal} className="modal">
        <div onClick={updatePin} style={{ cursor: "pointer", color: "tomato" }} >
          <AddLocationIcon ></AddLocationIcon>
          <span>updatePin</span>
        </div>
        <div className="app">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onDblClick={handleAddClick}
          >
            <>
              <Marker latitude={post.lat} longitude={post.long} offsetLeft={-20} offsetTop={-10}>
                <AddLocationIcon style={{ fontSize: viewport.zoom * 2, color: "slateblue", cursor: "pointer" }}
                />
              </Marker>
            </>
            {newPlace &&
              <>
                <Marker
                  latitude={newPlace.lat}
                  longitude={newPlace.long}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <AddLocationIcon
                    style={{
                      fontSize: viewport.zoom * 2,
                      color: "tomato",
                      cursor: "pointer",
                    }}
                  />
                </Marker>
              </>
            }
          </ReactMapGL>
        </div>
      </Box>
    </Modal>
  );

  const modalEdit = (
    <Modal
      open={openModalEdit}
      onClose={handleCloseEditModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal} className="modal">
        <TextField
          id="outlined-multiline-flexible"
          label="Edit"
          multiline
          maxRows={4}
          style={{ width: "900px", height: "50px" }}
          value={value}
          onChange={handleChange}
        />

        <Button
          className="submitBt"
          variant="contained"
          onClick={() => {
            submitEdit();
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );

  const sendMessageHandler = async () => {
    const newConversation = {
      senderId: currentUser._id,
      receiverId: post.userId,
    };
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + "/conversations", newConversation);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const createComment = async () => {
    const newComment = {
        basePost: post._id,
      commenter: currentUser._id,
      commenterName: currentUser.username,
      desc: desc.current.value,
    }
      try {
        let res = await axios.post(process.env.REACT_APP_BACKEND_URL + "/comments", newComment)
    } catch (err) {
        console.log(err);
    }
  }

  // const deleteComment = async () => {
  //       await axios.delete("/comments/" + comments._id)
  // }

  // const editComment = async () => {
  //       await axios.edit("/comments/")
  //   window.location.reload();
  // };
  const handleCloseCommentModal = () => {
        setOpenCommentModal(false);
      setComments([]);
  };

  const setOpenComment = () => {
        setOpenCommentModal(true);
  }
    
  const commentModal = (
      <Modal
        open={openCommentModal}
        onClose={handleCloseCommentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          {comments.map((value, index) => {
            return (
              <span key={index}>
                Username : {value.commenterName} 
                {/* <Button variant="text" onClick={deleteComment}>DeleteComment</Button> */}
                <br></br> 
                comment : {value.desc} 
                <p key={index}>{console.log(value._id)}</p>
              </span>
            )
          })}
          <Button variant="text" onClick={() => getAllComment()}>Text</Button>
        </Box>
      </Modal>
      );
  const getAllComment = async () => {
    try {
        let res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/comments/post/" + post._id)
      console.log("resComment")
      console.log(res.data)
      setComments(res.data);
    } catch (err) {
        console.log(err)
      }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`} >
              <img className="postProfileImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "person.png"} alt="" />
            </Link>
            <span className="postUserName">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              <Message className="directMessage" onClick={sendMessageHandler}></Message>
            </Link>
            {openModalEdit ? modalEdit : null}
            {loading ? <CircularProgress /> : null}

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem onClick={() => checkUserPost()}>Edit</MenuItem>
              <MenuItem onClick={() => deletePost()}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="postCenter">
          {openModalMap ? modalMap : null}
          <button type="submit" onClick={() => { setOpenModalMap(true) }}>Open location</button>
          <br></br>
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUp className="likeIcon" onClick={likeHandler} htmlColor={isLiked ? "green" : "black"}></ThumbUp>
            <span className="postLikeCounter" onClick={likeHandler}>{like} people</span>
          </div>
          <div className="postBottomRight">
          {openCommentModal ? commentModal : null}
            <input type="text" id="comment" ref={desc} />
            <input type="submit" onClick={() => createComment()} />
            <span className="postCommentText" onClick={() => setOpenComment()}>{post.comment} comment</span>
          </div>
        </div>
      </div>
      </div>
  )
}
