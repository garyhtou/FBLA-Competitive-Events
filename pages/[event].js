import Head from "next/head";
import Link from "next/link";
import {
	Typography,
	Link as MuiLink,
	Box,
	Grid,
	Card,
	CardContent,
	Paper,
} from "@material-ui/core";
import firebase from "../utils/firebase";
import EventHeader from "../components/eventHeader";
import EventSidebar from "../components/eventSidebar";
import parseParticipantType from "../helper/parseParticipantType";
import EventGuidelines from "../components/eventGuidelines";
import EventCompetencies from "../components/eventCompetencies";
import EventTopicCase from "../components/eventTopicCase";
import EventFiles from "../components/eventFiles";

export default function Event({ event, category }) {
	return (
		<>
			<Head>
				<title>{event.friendlyName} - FBLA Competitive Events</title>
			</Head>
			<Grid container spacing={5}>
				<Grid item md={8}>
					<EventHeader event={event} category={category} />
					<EventTopicCase event={event} category={category} />

					<Box marginTop={7}>
						<Typography variant="h4" gutterBottom>
							Overview
						</Typography>
						<Typography variant="body1">{category.overview}</Typography>
					</Box>

					<EventCompetencies event={event} category={category} />

					<EventGuidelines event={event} category={category} />

					<EventFiles event={event} category={category} />
				</Grid>
				<Grid item md={4}>
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
