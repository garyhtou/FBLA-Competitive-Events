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
	guidelineTitles: {
		fontWeight: "bold",
	},
});

function guidelineBody(intro, bullets) {
	let introExists = typeof intro !== "undefined" && intro !== "";
	let bulletsExists = typeof bullets !== "undefined" && bullets !== "";

	return (
		<Box>
			{introExists ? (
				<Typography variant="body1">
					<Box>{intro}</Box>
				</Typography>
			) : null}
			{bulletsExists ? (
				<Typography variant="body1">
					<ul>
						{bullets.map((bullet) => (
							<li>{bullet}</li>
						))}
					</ul>
				</Typography>
			) : null}
		</Box>
	);
}

function processGuidelines(guidelines, isSpecificGuideline) {
	var guidelinesList = [];
	if (typeof guidelines !== "undefined") {
		if (isSpecificGuideline) {
			guidelinesList.push(processOneGuideline(guidelines));
		} else {
			for (let guideline of Object.keys(guidelines)) {
				let guidelineObj = guidelines[guideline];
				guidelinesList.push(processOneGuideline(guidelineObj));
			}
		}
	}
	return guidelinesList;

	function processOneGuideline(guideline) {
		let introExists =
			typeof guideline.intro !== "undefined" && guideline.intro !== "";
		let bulletsExists =
			typeof guideline[0] !== "undefined" && guideline[0] !== "";

		let bullets = [];
		for (let key of Object.keys(guideline)) {
			if (key !== "friendlyName" && key !== "intro" && !isNaN(key)) {
				bullets.push(guideline[key]);
			}
		}

		if (introExists || bulletsExists) {
			return {
				key: guideline,
				title: isSpecificGuideline
					? "Event Specific Guideline"
					: guideline.friendlyName || guideline,
				body: guidelineBody(guideline.intro, bullets),
			};
		}
		return null;
	}
}

export default function EventGuidelines({ event, category }) {
	const classes = useStyles();

	var guidelines = [];
	if (typeof category.guidelines !== "undefined") {
		guidelines.push(...processGuidelines(category.guidelines, false));
	}
	if (typeof event.specificGuidelines !== "undefined") {
		guidelines.push(...processGuidelines(event.specificGuidelines, true));
	}

	return (
		<>
			<Box marginTop={5}>
				<Typography variant="h4" gutterBottom>
					Guidelines
				</Typography>
				{guidelines.length > 2 ? (
					<>
						<Box>
							{guidelines.map((guideline) => (
								<Accordion key={guideline.key}>
									<AccordionSummary expandIcon={<ExpandMore />}>
										<Typography>
											<Box className={classes.guidelineTitles}>
												{guideline.title}
											</Box>
										</Typography>
									</AccordionSummary>
									<AccordionDetails>{guideline.body}</AccordionDetails>
								</Accordion>
							))}
						</Box>
					</>
				) : (
					<>
						{guidelines.map((guideline) => (
							<Box marginBottom={3} key={guideline.key}>
								<Typography variant="h6" gutterBottom>
									{guideline.title}
								</Typography>
								<Typography>{guideline.body}</Typography>
							</Box>
						))}
					</>
				)}
			</Box>
		</>
	);
}
