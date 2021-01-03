import Head from "next/head";
import Link from "next/link";
import { Typography, Link as MuiLink } from "@material-ui/core";
import firebase from "../utils/firebase";
import EventHeader from "../components/eventHeader";

export default function Event({ event }) {
	return (
		<>
			<Head>
				<title>{event.friendlyName} - FBLA Competitive Events</title>
			</Head>
			<div>
				<Typography variant="h3" component="h1" gutterBottom>
					{event.friendlyName}
				</Typography>
				<Typography variant="subtitle1">Category: {event.category}</Typography>
				<Typography variant="subtitle1">Type: {event.type}</Typography>
			</div>
			<Typography variant="subtitle1">{event.note}</Typography>
		</>
	);
}

export async function getServerSideProps(context) {
	const snapshot = await firebase
		.database()
		.ref("competitiveEvents")
		.once("value");

	var foundEvent;

	for (let category of Object.keys(snapshot.val())) {
		let categoryObj = snapshot.val()[category];
		for (let event of Object.keys(categoryObj.events)) {
			let eventObj = categoryObj.events[event];
			let eventPath = eventObj.path || eventObj.name;

			if (
				eventPath.toUpperCase() ===
				String(context.req.url).substring(1).toUpperCase()
			) {
				foundEvent = eventObj;
				foundEvent.name = event;
			}
		}
	}

	// console.log(foundEvent);

	if (typeof foundEvent !== "undefined") {
		return { props: { event: foundEvent } };
	} else {
		//for 404 display
		return { props: { path: context.req.url }, notFound: true };
	}
}
