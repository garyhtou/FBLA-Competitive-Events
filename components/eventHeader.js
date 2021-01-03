import Link from "next/link";
import { Typography, Link as MuiLink } from "@material-ui/core";

export default function EventHeader({ event }) {
	return (
		<>
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
