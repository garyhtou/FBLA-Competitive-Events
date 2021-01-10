import { useState, useEffect } from "react";
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
	Tooltip,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import firebaseClient from "../utils/firebaseClient";
import parseParticipantType from "../helper/parseParticipantType";
import customStrings from "../helper/customStrings";

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
				<Tooltip
					title={customStrings.participantType[currentType.toLowerCase()] || ""}
				>
					<Chip label={currentType} />
				</Tooltip>
			</Grid>
		))
	);
	displayType = (
		<Grid container spacing={1} justify="flex-end">
			{displayType}
		</Grid>
	);

	return { name, nameElement, type: displayType, category };
}

export default function Home() {
	const [events, setEvents] = useState([]);
	const [eventsLoading, setEventsLoading] = useState(true);

	useEffect(() => {
		const unsub = firebaseClient
			.database()
			.ref("competitiveEvents/")
			.on("value", (snapshot) => {
				if (snapshot && snapshot.exists()) {
					const snapshotEvents = snapshot.val().events;
					const snapshotCategories = snapshot.val().categories;

					var eventsList = [];

					for (let event of Object.keys(snapshotEvents)) {
						let eventObj = snapshotEvents[event];

						let participantType = parseParticipantType(
							eventObj.participantType
						);
						let eventCategory =
							snapshotCategories[eventObj.category].friendlyName ||
							eventObj.category ||
							eventObj.friendlyName ||
							event;

						eventsList.push({
							name: event,
							friendlyName: eventObj.friendlyName || event,
							type: participantType,
							category: eventCategory,
						});
					}

					setEvents(eventsList);
					setEventsLoading(false);
				}
			});

		return () => unsub();
	}, []);

	const classes = useStyles();

	const rows = [];
	events.map((event) => {
		rows.push(
			createData(event.name, event.friendlyName, event.type, event.category)
		);
	});

	if (eventsLoading) {
		[...Array(10).keys()].map((loop) =>
			rows.push({
				name: loop,
				nameElement: <Skeleton variant="text" />,
				type: <Skeleton variant="text" />,
				category: <Skeleton variant="text" />,
			})
		);
	}

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
