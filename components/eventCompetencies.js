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
	competencySectionTitle: {
		fontWeight: "bold",
	},
	competencySectionTitleGrow: {
		flexGrow: 1,
	},
});

function processCompetencies(competencies) {
	var competenciesList = [];
	if (typeof competencies !== "undefined") {
		// COMPETENCY TYPE (SUCH AS Objective Test or Proudction Test)
		for (let competencyType of Object.keys(competencies)) {
			let competencyTypeObj = competencies[competencyType];
			let competencyTypePushObj = {
				key: competencyType,
				title: competencyTypeObj.friendlyName || competencyType,
				sections: [],
			};

			// COMPETENCY SECTION SUCH AS SECTION A FOR JOURANLIZING
			for (let competencySection of Object.keys(competencyTypeObj)) {
				if (competencySection !== "friendlyName") {
					let competencySectionObj = competencyTypeObj[competencySection];
					let competencySectionPushObj = {
						key: competencySection,
						title:
							"Competency " +
							competencySection.toUpperCase() +
							": " +
							competencySectionObj.friendlyName,
						minimum: competencySectionObj.minimum,
						tasks: [],
					};

					// TASKS OF EACH COMPETENCY SECTION
					if (typeof competencySectionObj.tasks !== "undefined") {
						for (let competencyTask of Object.keys(
							competencySectionObj.tasks
						)) {
							let competencyTaskObj =
								competencySectionObj.tasks[competencyTask];
							competencySectionPushObj.tasks.push(competencyTaskObj);
						}
					}

					// push sections to type
					competencyTypePushObj.sections.push(competencySectionPushObj);
				}
			}

			// push types to master list
			competenciesList.push(competencyTypePushObj);
		}
	}
	return competenciesList;
}

export default function EventCompetencies({
	event,
	eventLoading,
	category,
	catLoading,
}) {
	const classes = useStyles();

	if (eventLoading || typeof event.competencies === "undefined") {
		return null;
	}
	var competencies = processCompetencies(event.competencies);

	return (
		<>
			{!eventLoading ? (
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
											<Typography
												className={classes.competencySectionTitleGrow}
											>
												<Box className={classes.competencySectionTitle}>
													{section.title}
												</Box>
											</Typography>

											<Typography>
												{typeof section.minimum !== "undefined" &&
												section.minimum !== ""
													? "Minimum: " + section.minimum
													: null}
											</Typography>
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
			) : (
				<Box marginTop={5} key={type.key}>
					<Typography variant="h4" gutterBottom>
						{type.title}
					</Typography>
					<Box>
						{type.sections.map((section) => (
							<Accordion key={section.key}>
								<AccordionSummary expandIcon={<ExpandMore />}>
									<Typography className={classes.competencySectionTitleGrow}>
										<Box className={classes.competencySectionTitle}>
											{section.title}
										</Box>
									</Typography>

									<div>
										<Typography>
											{typeof section.minimum !== "undefined" &&
											section.minimum !== ""
												? "Minimum: " + section.minimum
												: null}
										</Typography>
									</div>
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
			)}
		</>
	);
}
