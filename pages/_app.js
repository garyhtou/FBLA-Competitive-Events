import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import {
	AppBar,
	Toolbar,
	Typography,
	Link as MuiLink,
	makeStyles,
	CssBaseline,
	Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	"@global": {
		html: {
			minHeight: "100vh",
		},
	},
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: "wrap",
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	content: {
		padding: theme.spacing(8, 3, 6, 3),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(2, 3),
		},
	},

	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: "auto",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}));

function MyApp({ Component, pageProps }) {
	const classes = useStyles();

	return (
		<>
			<Head>
				{/* required for MUI - Roboto Font */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				{/* required for MUI - Font Icons */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				{/* Suggested by MUI for mobile first */}
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="icon" type="image/png" href="/hazenfbla-square.png"></link>
				<title>FBLA Competitive Events</title>
				<meta
					name="description"
					content="Easily view all of FBLA's Competitive Events and their examples"
				></meta>
			</Head>
			<CssBaseline>
				<div className={classes.root}>
					<AppBar position="static" className={classes.appBar}>
						<Toolbar className={classes.toolbar}>
							<Typography
								variant="h6"
								color="inherit"
								noWrap
								className={classes.toolbarTitle}
							>
								FBLA Competitive Events
							</Typography>
							<nav>
								<Link href="/" passHref>
									<MuiLink
										variant="button"
										color="inherit"
										className={classes.link}
									>
										Home
									</MuiLink>
								</Link>
								<Link href="/about" passHref>
									<MuiLink
										variant="button"
										color="inherit"
										className={classes.link}
									>
										About
									</MuiLink>
								</Link>
							</nav>
						</Toolbar>
					</AppBar>
					<Container maxWidth="lg" component="main" className={classes.content}>
						<Component {...pageProps} />
					</Container>
					<Container
						maxWidth="lg"
						component="footer"
						className={classes.footer}
					>
						<Typography variant="body2" color="textSecondary" align="center">
							Developed by{" "}
							<MuiLink color="inherit" href="https://garytou.com">
								Gary Tou
							</MuiLink>
						</Typography>
					</Container>
				</div>
			</CssBaseline>
		</>
	);
}

export default MyApp;
