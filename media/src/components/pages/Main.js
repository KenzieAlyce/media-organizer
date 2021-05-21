import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Grid, Input } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing(2),
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
					<FormLabel htmlFor='title'>title</FormLabel>
					<Input
						id='title'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='author'>author</FormLabel>
					<Input
						id='author'
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='location'>location</FormLabel>
					<Input
						id='location'
						onChange={(e) => setLocation(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='rating'>rating</FormLabel>
					<Input
						id='rating'
						onChange={(e) => setRating(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='mediaType'>mediaType</FormLabel>
					<Input
						id='mediaType'
						onChange={(e) => setMediaType(e.target.value)}
					/>
				</FormControl>
			</Grid>
			<Grid>
				<Button onClick={handleSubmit}>Submit</Button>
			</Grid>
			<div>{title}</div>
			<div>{author}</div>
			<div>{location}</div>
			<div>{rating}</div>
			<div>{mediaType}</div>
			{mediaArray.map((media, index) => (
				<ul key={index}>
					<li>
						title {index + 1}: {media.title}
					</li>
					<li>
						author {index + 1}: {media.author}
					</li>
					<li>
						location {index + 1}: {media.location}
					</li>
					<li>
						rating {index + 1}: {media.rating}
					</li>
					<li>
						mediaType {index + 1}: {media.mediaType}
					</li>
				</ul>
			))}
		</>
	);
}