import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import {
	Typography,
	Link as MuiLink,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import firebase from "../utils/firebase";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function createData(name, friendlyName, type, category, path) {
	let nameElement = (
		<Link href={"/" + path} passHref>
			<MuiLink variant="body1" style={{ cursor: "pointer" }}>
				{friendlyName}
			</MuiLink>
		</Link>
	);
	return { name, nameElement, type, category, path };
}

export default function Home({ events }) {
	const classes = useStyles();

	const rows = [];
	events.map((event) => {
		rows.push(
			createData(
				event.name,
				event.friendlyName,
				event.type,
				event.category,
				event.path
			)
		);
	});

	return (
		<>
			<h1>Home</h1>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Event Name</TableCell>
							<TableCell align="right">Type</TableCell>
							<TableCell align="right">Category</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row.nameElement}
								</TableCell>
								<TableCell align="right">{row.type}</TableCell>
								<TableCell align="right">{row.category}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export async function getServerSideProps(context) {
	const snapshot = await firebase
		.database()
		.ref("competitiveEvents")
		.once("value");

	var events = [];

	for (let category of Object.keys(snapshot.val())) {
		let categoryObj = snapshot.val()[category];
		for (let event of Object.keys(categoryObj.events)) {
			let eventObj = categoryObj.events[event];

			let participantType;
			switch (eventObj.participantType.toUpperCase()) {
				case "I":
					participantType = "Individual";
					break;
				case "T":
					participantType = "Team";
					break;
				case "C":
					participantType = "Chapter";
					break;
				default:
					participantType = "";
			}

			events.push({
				name: event,
				friendlyName: eventObj.friendlyName || event,
				type: participantType,
				category: categoryObj.friendlyName || category,
				path: eventObj.path || event,
			});
		}
	}

	// console.log(events);

	return {
		props: { events },
	};
}
