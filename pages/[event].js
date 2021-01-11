import { useEffect, useState } from "react";
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
import { Skeleton } from "@material-ui/lab";
import firebaseServer from "../utils/firebaseServer";
import firebaseClient from "../utils/firebaseClient";
import EventHeader from "../components/eventHeader";
import EventSidebar from "../components/eventSidebar";
import parseParticipantType from "../helper/parseParticipantType";
import EventGuidelines from "../components/eventGuidelines";
import EventCompetencies from "../components/eventCompetencies";
import EventTopicCase from "../components/eventTopicCase";
import EventFiles from "../components/eventFiles";

export default function Event(/*{ initEvent }*/) {
	const [event, setEvent] = useState({});
	const [eventLoading, setEventLoading] = useState(true);
	const [category, setCategory] = useState();
	const [catLoading, setCatLoading] = useState(true);

	useEffect(() => {
		if (!eventLoading && typeof event.category !== "undefined") {
			const unsub = firebaseClient
				.database()
				.ref("competitiveEvents/categories/" + event.category)
				.on("value", (snapshot) => {
					if (snapshot && snapshot.exists()) {
						setCategory(snapshot.val());
						setCatLoading(false);
					}
				});

			return () => unsub();
		}
	}, [eventLoading, event.category]);

	useEffect(() => {
		const eventName = window.location.pathname.substring(1).toLowerCase();
		const unsub = firebaseClient
			.database()
			.ref("competitiveEvents/events/" + eventName)
			.on("value", (snapshot) => {
				if (snapshot && snapshot.exists()) {
					let modifiedEvent = snapshot.val();
					modifiedEvent.name = eventName;
					modifiedEvent.participantType = parseParticipantType(
						modifiedEvent.participantType
					);
					setEvent(modifiedEvent);
					setEventLoading(false);
				} else if (snapshot && !snapshot.exists()) {
					window.location.replace(
						window.location.protocol + "//" + window.location.host + "/404"
					);
				}
			});

		return () => unsub();
	}, []);

	return (
		<>
			<Head>
				{eventLoading ? (
					<title>FBLA Competitive Events</title>
				) : (
					<title>{event.friendlyName} - FBLA Competitive Events</title>
				)}
			</Head>
			<Grid container spacing={5}>
				<Grid item md={8}>
					<EventHeader
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
					/>
					<EventTopicCase
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
					/>

					<Box marginTop={7}>
						<Typography variant="h4" gutterBottom>
							Overview
						</Typography>
						<Typography variant="body1">
							{!catLoading ? category.overview : <Skeleton />}
						</Typography>
					</Box>

					<EventCompetencies
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
					/>

					<EventGuidelines
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
					/>

					<EventFiles
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
						type="resources"
					/>

					<EventFiles
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
						type="examples"
					/>
				</Grid>
				<Grid item md={4}>
					<EventSidebar
						event={event}
						eventLoading={eventLoading}
						category={category}
						catLoading={catLoading}
					/>
				</Grid>
			</Grid>
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const eventName = String(context.req.url).substring(1).toLowerCase();
// 	if (
// 		![".", "#", "$", "[", "]"].every(
// 			(item) => eventName.split().indexOf(item) === -1
// 		)
// 	) {
// 		console.log("REJECTED");
// 		return { props: { path: context.req.url }, notFound: true };
// 	}

// 	const snapshotEvent = await firebaseServer
// 		.database()
// 		.ref("competitiveEvents/events/" + eventName + "/friendlyName")
// 		.once("value");

// 	if (typeof snapshotEvent !== "undefined" && snapshotEvent.exists()) {
// 		let shallowEvent = {};
// 		shallowEvent.name = eventName;
// 		shallowEvent.friendlyName = snapshotEvent.val();
// 		return {
// 			props: { initEvent: shallowEvent },
// 		};
// 	} else {
// 		//for 404 display
// 		return { props: { path: context.req.url }, notFound: true };
// 	}
// }
