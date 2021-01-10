import Link from "next/link";
import {
	Typography,
	Link as MuiLink,
	Chip,
	Grid,
	Card,
	CardContent,
	makeStyles,
	Box,
	CardHeader,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles({
	//
});

export default function EventTopicCase({
	event,
	eventLoading,
	category,
	catLoading,
}) {
	const classes = useStyles();

	return (
		<>
			{!eventLoading &&
			typeof event.topic !== "undefined" &&
			((typeof event.topic.intro !== "undefined" && event.topic.intro !== "") ||
				(typeof event.topic[0] !== "undefined" && event.topic[0] !== "")) ? (
				<Box marginTop={3}>
					<Typography variant="h5" gutterBottom>
						<Box fontWeight="bold" display="inline-block">
							Topic
						</Box>
					</Typography>
					{typeof event.topic.intro !== "undefined" &&
					event.topic.intro !== "" ? (
						<Typography>{event.topic.intro}</Typography>
					) : null}
					{typeof event.topic[0] !== "undefined" && event.topic[0] !== "" ? (
						<ul>
							{Object.keys(event.topic).map((key) =>
								key !== "intro" ? <li>{event.topic[key]}</li> : null
							)}
						</ul>
					) : null}
				</Box>
			) : null}
			{!eventLoading && typeof event.case !== "undefined" ? (
				<Box marginTop={3}>
					<Typography variant="body1" gutterBottom>
						<Box fontWeight="bold" display="inline-block">
							Case:
						</Box>{" "}
						{event.case}
					</Typography>
				</Box>
			) : null}
		</>
	);
}
