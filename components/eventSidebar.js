import Link from "next/link";
import {
	Typography,
	Grid,
	Card,
	CardContent,
	makeStyles,
	Box,
	Slide,
	Fade,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
	cards: {
		// display: "inline-block",
		width: "100%",
	},
	stickyGrid: {
		position: "-webkit-sticky",
		position: "sticky",
		top: "1rem",
	},
});

export default function EventSidebar({
	event,
	eventLoading,
	category,
	catLoading,
}) {
	const classes = useStyles();

	const loading = typeof category === "undefined";

	var cards = [
		{ title: "Eligibility", body: !catLoading ? category.eligibility : "" },
		{ title: "NLC Registration", body: !catLoading ? category.nlcReg : "" },
		{ title: "Finals", body: !catLoading ? category.finals : "" },
	];

	let times = [];
	if (!eventLoading && typeof event.timeLimits !== "undefined") {
		for (let time of Object.keys(event.timeLimits)) {
			let timeObj = event.timeLimits[time];
			times.push({
				name: time,
				friendlyName: timeObj.friendlyName,
				amount: timeObj.amount,
			});
		}
	}
	if (times.length !== 0) {
		cards.push({
			title: "Timeline",
			body: times.map((time) => (
				<>
					{times.length > 1 ? (
						<li key={time.name}>
							<Box fontWeight="bold" display="inline">
								{time.friendlyName}:
							</Box>{" "}
							{time.amount}
						</li>
					) : (
						<>
							<Box fontWeight="bold" display="inline" key={time.friendlyName}>
								{time.friendlyName}:
							</Box>{" "}
							{time.amount}
						</>
					)}
				</>
			)),
		});
	}

	return (
		<>
			<Slide direction="up" in={true} timeout={1000}>
				<div>
					<Fade in={true} timeout={1500}>
						<Grid container spacing={3} className={classes.stickyGrid}>
							{cards.map((card) => (
								<>
									{catLoading ||
									(card.body !== "undefined" && card.body !== "") ? (
										<Grid item className={classes.cards} key={card.title}>
											<Card elevation={3}>
												<CardContent>
													<Typography variant="h5" gutterBottom color="primary">
														{card.title}
													</Typography>
													<Typography varient="body2" component="p">
														{catLoading ? (
															<>
																<Skeleton />
																<Skeleton />
																<Skeleton />
															</>
														) : (
															card.body
														)}
													</Typography>
												</CardContent>
											</Card>
										</Grid>
									) : null}
								</>
							))}
						</Grid>
					</Fade>
				</div>
			</Slide>
		</>
	);
}
