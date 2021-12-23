import { Cancel, Label, PermMedia, Room } from "@mui/icons-material"
import { useContext, useRef, useState } from "react"
import "./share.css"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReactMapGL, { Marker } from 'react-map-gl';
import AddLocationIcon from '@mui/icons-material/AddLocation';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

const styleModal = {
  position: "relative",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "60%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleModalTags = {
  position: "relative",
  top: "50%",
  left: "50%",
  height: "25%",
  transform: "translate(-50%, -50%)",
  width: "15%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalTags, setOpenModalTags] = useState(false);
  // const [tags, setTags] = useState({ tag1: "", tag2: "", tag3: "", tag4: "", tag5: "", tag6: "" });
  // const [tag1, setTag1] = useState("");
  // const [tag2, setTag2] = useState("");
  // const [tag3, setTag3] = useState("");
  // const [tag4, setTag4] = useState("");
  // const [tag5, setTag5] = useState("");
  // const [tag6, setTag6] = useState("");
  const [tag, setTag] = useState("");


  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 13.650954,
    longitude: 100.494172,
    zoom: 15
  });

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = { userId: null, desc: null, lat: 0, long: 0, tag: tag}
    if (newPlace == null) {
      newPost.userId = user._id;
      newPost.desc = desc.current.value;
    } else {
      newPost.userId = user._id
      newPost.desc = desc.current.value
      newPost.lat = newPlace.lat
      newPost.long = newPlace.long
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/upload", data);
      } catch (err) { }
      try {
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/posts", newPost);
        window.location.reload();
      } catch (err) { }
    }
  }

  const handleCloseMapModal = () => {
    setOpenModalMap(false)
  }

  const modalMap = (
    <Modal
      open={openModalMap}
      onClose={handleCloseMapModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal} className="modal">
        <div className="app">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onDblClick={handleAddClick}
          >
            {newPlace &&
              <Marker latitude={newPlace.lat}
                longitude={newPlace.long}
                offsetLeft={-20}
                offsetTop={-10}>
                <AddLocationIcon style={{ fontSize: viewport.zoom * 2, color: "slateblue", cursor: "pointer" }}
                />
              </Marker>
            }
          </ReactMapGL>
        </div>
      </Box>
    </Modal>
  );

  const handleCloseTagsModal = () => {
    setOpenModalTags(false);
    // setTags({ tag1: "", tag2: "", tag3: "", tag4: "", tag5: "", tag6: "" });
  }

  const handleSubmitTags =  () => {
    let APPLIANCES = document.getElementById("APPLIANCES");
    let CLOTHES = document.getElementById("CLOTHES");
    let FURNITURES = document.getElementById("FURNITURES");
    let STUDY = document.getElementById("STUDY");
    let MEDICAL = document.getElementById("MEDICAL");
    let OTHERS = document.getElementById("OTHERS");
    if  (APPLIANCES.checked === true) {
       setTag("APPLIANCES");
    } if (CLOTHES.checked === true) {
       setTag("CLOTHES");
    } if (FURNITURES.checked === true) {
       setTag("FURNITURES");
    } if (STUDY.checked === true) {
       setTag("STUDY");
    } if (MEDICAL.checked === true) {
       setTag("MEDICAL");
    } if (OTHERS.checked === true) {
       setTag("OTHERS");
    }
     console.log(tag);

  }
  const modalTags = (
    <Modal
      open={openModalTags}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleCloseTagsModal}
    >
      <Box sx={styleModalTags} className="modal">
        {/* <FormGroup onChange={handleCheckBox} >
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="APPLIANCES" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="CLOTHES" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="FURNITURES" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="STUDY" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="MEDICAL" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="OTHERS" />
        </FormGroup> */}
        <div>
          <input type="radio" name="addtag" value="APPLIANCES" id="APPLIANCES" />
          <label > APPLIANCES</label><br></br>
          <input type="radio" name="addtag" value="CLOTHES" id="CLOTHES" />
          <label > CLOTHES</label><br></br>
          <input type="radio" name="addtag" value="FURNITURES" id="FURNITURES" />
          <label > FURNITURES</label><br></br>
          <input type="radio" name="addtag" value="MEDICAL" id="MEDICAL" />
          <label > MEDICAL</label><br></br>
          <input type="radio" name="addtag" value="STUDY" id="STUDY" />
          <label > STUDY</label><br></br>
          <input type="radio" name="addtag" value="OTHERS" id="OTHERS" />
          <label > OTHERS</label><br></br>
          <input type="submit" value="Submit" onClick={() => handleSubmitTags()}/>
        </div>
      </Box>
    </Modal>
  );

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person.png"} alt="" />
          <input placeholder={"Input your status " + user.username + " ? "} className="shareInput" ref={desc} />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photos/Videos</span>
              <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}></input>
            </label>


            {openModalTags ? modalTags : null}
            <div className="shareOption" onClick={() => { setOpenModalTags(true) }}>
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText" >Tag</span>

            </div>

            <div>
              {openModalMap ? modalMap : null}
              <div className="shareOption" onClick={() => { setOpenModalMap(true) }}>
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText" >Location</span>
              </div>
            </div>
          </div>
          <button className="shareBotton" type="submit"> Share </button>
        </form>
      </div>
    </div>
  )
}