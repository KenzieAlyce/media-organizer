import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, Grid, Input } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import randomColor from 'randomcolor';
/**=================================================**/
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 225,
    display: "flex",
  },
  control: {
    padding: theme.spacing(2),
  },
  paper: {
    height: 225,
    width: 225,
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  createMuiTheme: {
    float: "right",
  },
  cards: {
    maxWidth: 1200,
    margin: 0,
    spacing: 2,
    display: Grid,
  },
}));
/**=================================================**/
export default function MenuListComposition() {
  const classes = useStyles();
  const [open] = React.useState(false);
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();
  const [mediaType, setMediaType] = useState();
  const [mediaArray, setMediaArray] = useState([]);

  const getAllMedia = async () => {
    let media = await axios.get("/api/media");
    return media;
  }
  // Retrieve media list from database, if any
  useEffect(async () => {
    let media = await getAllMedia();
    console.log("media: ", media);
    setMediaArray(media.data);
  }, []);

  // return focus to the button when we transitioned from !open -> open
  const { loginWithRedirect } = useAuth0();

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("clicked");
    let allMedia;
    console.log('target', e.currentTarget.getAttribute("data-id") );
    const id = e.target.dataset.id;
    console.log('id: ', id);
    axios.delete("/api/media/" + id);
    allMedia = await getAllMedia();
    console.log('all media', allMedia)
    setMediaArray(allMedia.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMediaArray((previousArray) => [
      ...previousArray,
      { 
		  media_name: title, 
		  media_artist: author, 
		  media_location: location, 
		  media_rating: rating, 
		  media_type: mediaType 
	  },
    ]);
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
		  media_name: title, 
		  media_artist: author, 
		  media_location: location, 
		  media_rating: parseInt(rating), 
		  media_type: mediaType 
		}),
    };
    fetch("/api/media", request)
      .then((response) => response.json())
      .then((data) => console.log(data));
    setTitle("");
    setAuthor("");
    setLocation("");
    setRating("");
    setMediaType("");
  };

  let color = randomColor();

  return (
    <>
      <div className={classes.root}>
        {open && (
          <Paper className={classes.paper}>
            <MenuList>
              <MenuItem key="profile">Profile</MenuItem>
              <MenuItem key="my-account">My account</MenuItem>
              <MenuItem key="login" onClick={() => loginWithRedirect()}>
                Login
              </MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Paper>
        )}
      </div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ height: "300px" }}
      >
        <FormControl key="title">
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl key="author">
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input id="author" onChange={(e) => setAuthor(e.target.value)} />
        </FormControl>
        <FormControl key="location">
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input id="location" onChange={(e) => setLocation(e.target.value)} />
        </FormControl>
        <FormControl key="rating">
          <FormLabel htmlFor="rating">Rating</FormLabel>
          <Input id="rating" onChange={(e) => setRating(e.target.value)} />
        </FormControl>
        <FormControl key="type">
          <FormLabel htmlFor="mediaType">Media Type</FormLabel>
          <Input
            id="mediaType"
            onChange={(e) => setMediaType(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid>
        <Button className={classes.createMuiTheme} onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
      <div>{title}</div>
      <div>{author}</div>
      <div>{location}</div>
      <div>{rating}</div>
      <div>{mediaType}</div>
      <div className={classes.cards}></div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            {mediaArray.map((media, index) => (
              <>
                <Card
                  key={index}
                  style={{
                    backgroundColor: `${color}`,
                    shadowOpacity: 0,
                    color: `black`,
                  }}
                  className={classes.root}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Title: {media.media_name}
                    </Typography>
                    <Typography variant="h5" component="h6">
                      Author: {media.media_artist}
                    </Typography>
                    <Typography variant="h5" component="h6">
                      Location: {media.media_location}
                    </Typography>
                    <Typography variant="h5" component="h6">
                      Rating: {media.media_rating}
                    </Typography>
                    <Typography variant="h5" component="h6">
                      Media Type: {media.media_type}
                    </Typography>
					          {/* <Button color="primary" variant="contained" data-id={media.id} onClick={handleDelete}>Delete</Button> */}
                  </CardContent>
                </Card>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
