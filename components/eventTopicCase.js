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

export default function EventTopicCase({ event, category }) {
	const classes = useStyles();

	return (
		<>
			{typeof event.topic !== "undefined" &&
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
			{typeof event.case !== "undefined" ? (
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

	if (typeof event.case !== "undefined") {
	} else if (typeof event.topic !== "undefined") {
	} else {
		return null;
	}

	return (
		<>
			{competencies.map((type) => (
				<Box marginTop={5} key={type.key}>
					<Typography variant="h4" gutterBottom>
						{type.title}
					</Typography>
					<Box>
						{type.sections.map((section) => (
							<Accordion key={section.key}>
								<AccordionSummary expandIcon={<ExpandMore />}>
									<Typography>
										<Box className={classes.competencySectionTitle}>
											{section.title}
										</Box>
									</Typography>
									<Box className={classes.competencySectionMinimum}>
										<Typography>
											<Box>
												{typeof section.minimum !== "undefined" &&
												section.minimum !== ""
													? "Minimum: " + section.minimum
													: null}
											</Box>
										</Typography>
									</Box>
								</AccordionSummary>
								<AccordionDetails>
									{section.tasks.length > 1 ? (
										<ol>
											{section.tasks.map((task) => (
												<li key={task}>{task}</li>
											))}
										</ol>
									) : (
										<Typography>Whoops! Tasks not found...</Typography>
									)}
								</AccordionDetails>
							</Accordion>
						))}
					</Box>
				</Box>
			))}
		</>
	);
}
