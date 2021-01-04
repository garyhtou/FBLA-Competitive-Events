import Head from "next/head";
import Link from "next/link";
import {
	Typography,
	Link as MuiLink,
	Box,
	Grid,
	Card,
	CardContent,
} from "@material-ui/core";
import firebase from "../utils/firebase";
import EventHeader from "../components/eventHeader";
import EventSidebar from "../components/eventSidebar";
import parseParticipantType from "../helper/parseParticipantType";

export default function Event({ event, category }) {
	return (
		<>
			<Head>
				<title>{event.friendlyName} - FBLA Competitive Events</title>
			</Head>
			<Grid container spacing={5}>
				<Grid item xs={8}>
					<EventHeader event={event} category={category} />
					<Box marginTop={5}>
						<Typography variant="h4" gutterBottom>
							Overview
						</Typography>
						<Typography variant="body1">{category.overview}</Typography>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<EventSidebar event={event} category={category} />
				</Grid>
			</Grid>
		</>
	);
}

export async function getServerSideProps(context) {
	const eventName = String(context.req.url).substring(1).toLowerCase();
	const snapshotEvent = await firebase
		.database()
		.ref("competitiveEvents/events/" + eventName)
		.once("value");

	if (snapshotEvent.exists()) {
		const snapshotCategory = await firebase
			.database()
			.ref("competitiveEvents/categories/" + snapshotEvent.val().category)
			.once("value");

		let modifiedEvent = snapshotEvent.val();
		modifiedEvent.name = eventName;
		modifiedEvent.participantType = parseParticipantType(
			modifiedEvent.participantType
		);
		return {
			props: { event: modifiedEvent, category: snapshotCategory.val() },
		};
	} else {
		//for 404 display
		return { props: { path: context.req.url }, notFound: true };
	}
}
