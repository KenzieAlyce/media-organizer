import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Grid, Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/red';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
	root: {
	    flexGrow:1,
		 minWidth: 225,
		display: 'flex',
	},
    control:{
     padding:theme.spacing(2),
	},
	paper: {
		height:225,
		width:225,
		marginRight: theme.spacing(2),
	},
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }, createMuiTheme: {
      float:'right',
  },cards:{
    maxWidth:1200,
	margin:0,
	spacing:2,
	display:Grid,

  },
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = useState();
	const [author, setAuthor] = useState();
	const [location, setLocation] = useState();
	const [rating, setRating] = useState();
	const [mediaType, setMediaType] = useState();
	const [mediaArray, setMediaArray] = useState([]);
	// return focus to the button when we transitioned from !open -> open
	const { loginWithRedirect } = useAuth0();
	const handleSubmit = (e) => {
		e.preventDefault();
		setMediaArray((previousArray) => [
			...previousArray,
			{ title, author, location, rating, mediaType },
		]);
		const Jarrett = {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ title, author, location, rating, mediaType })}
		fetch('/api/media', Jarrett).then(response => response.json()).then(data => console.log(data))
		setTitle('');
		setAuthor('');
		setLocation('');
		setRating('');
		setMediaType('');
	};
	return (
		<>
			<div className={classes.root}>
				{open && (
					<Paper className={classes.paper}>
						<MenuList>
							<MenuItem>Profile</MenuItem>
							<MenuItem>My account</MenuItem>
							<MenuItem>
								<Link href='/SignUp'>Sign Up</Link>
							</MenuItem>
							<MenuItem onClick={() => loginWithRedirect()}>
								Login
							</MenuItem>
							<MenuItem>Logout</MenuItem>
						</MenuList>
					</Paper>
				)}
			</div>
			<Grid
				container
				direction='row'
				justify='space-around'
				alignItems='center'
				style={{ height: '300px' }}
			>
				<FormControl>
					<FormLabel htmlFor='title'>Title</FormLabel>
					<Input
						id='title'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='author'>Author</FormLabel>
					<Input
						id='author'
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='location'>Location</FormLabel>
					<Input
						id='location'
						onChange={(e) => setLocation(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='rating'>Rating</FormLabel>
					<Input
						id='rating'
						onChange={(e) => setRating(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='mediaType'>Media Type</FormLabel>
					<Input
						id='mediaType'
						onChange={(e) => setMediaType(e.target.value)}
					/>
				</FormControl>
			</Grid>
			<Grid>
				<Button className={classes.createMuiTheme}  onClick={handleSubmit}>Submit</Button>
			</Grid>
			<div>{title}</div>
			<div>{author}</div>
			<div>{location}</div>
			<div>{rating}</div>
			<div>{mediaType}</div>
			<div className={classes.cards}>
	        </div>
			<Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
        <Grid container justify="center">
		{mediaArray.map((media, index) => (
				<>
				    <Card className={classes.root} variant="outlined">
					<CardContent>
					  <Typography  variant="h5" component="h2">
					  Title {index + 1}: {media.title}
					  </Typography>
					  <Typography variant="h5" component="h6">
					  Author {index + 1}: {media.author}
					  </Typography>
					  <Typography variant="h5" component="h6">
					  Location {index + 1}: {media.location}
					  </Typography>
					  <Typography variant="h5" component="h6">
					  Rating {index + 1}: {media.rating}
					  </Typography>
					  <Typography variant="h5" component="h6">
					  Media Type {index + 1}: {media.mediaType}
					  </Typography>
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