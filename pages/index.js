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
	Chip,
	Grid,
} from "@material-ui/core";
import firebase from "../utils/firebase";
import parseParticipantType from "../helper/parseParticipantType";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function createData(name, friendlyName, type, category) {
	let nameElement = (
		<Link href={"/" + name} passHref>
			<MuiLink variant="body1" style={{ cursor: "pointer" }}>
				{friendlyName}
			</MuiLink>
		</Link>
	);
	let displayType = [];
	displayType.push(
		type.map((currentType) => (
			<Grid key={currentType} item>
				<Chip label={currentType} />
			</Grid>
		))
	);
	displayType = (
		<Grid container spacing={1} justify="flex-end">
			{displayType}
		</Grid>
	);
	console.log(displayType);

	return { name, nameElement, type: displayType, category };
}

export default function Home({ events }) {
	const classes = useStyles();

	const rows = [];
	events.map((event) => {
		rows.push(
			createData(event.name, event.friendlyName, event.type, event.category)
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

	const snapshotEvents = snapshot.val().events;
	const snapshotCategories = snapshot.val().categories;

	var events = [];

	for (let event of Object.keys(snapshotEvents)) {
		let eventObj = snapshotEvents[event];

		let participantType = parseParticipantType(eventObj.participantType);
		let eventCategory =
			snapshotCategories[eventObj.category].friendlyName ||
			eventObj.category ||
			eventObj.friendlyName ||
			event;

		events.push({
			name: event,
			friendlyName: eventObj.friendlyName || event,
			type: participantType,
			category: eventCategory,
		});
	}

	// console.log(events);

	return {
		props: { events },
	};
}
