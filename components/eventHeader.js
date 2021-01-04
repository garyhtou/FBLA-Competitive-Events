import Link from "next/link";
import {
	Typography,
	Link as MuiLink,
	Chip,
	Grid,
	Box,
	Tooltip,
} from "@material-ui/core";
import customStrings from "../helper/customStrings";

export default function EventHeader({ event, category }) {
	return (
		<>
			<Box marginBottom={2}>
				<Typography variant="h3" component="h1" gutterBottom>
					{event.friendlyName || event.name}
				</Typography>
				<Grid container spacing={1} alignItems="center">
					<Grid item>
						<Typography variant="subtitle1">Category: </Typography>
					</Grid>
					<Grid item>
						<Chip
							label={category.friendlyName || event.category}
							size="small"
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} alignItems="center">
					<Grid item>
						<Typography variant="subtitle1">Type: </Typography>
					</Grid>
					<Grid item>
						<Grid container spacing={1}>
							{event.participantType.map((type) => (
								<Grid key={type} item>
									<Tooltip
										title={
											customStrings.participantType[type.toLowerCase()] || ""
										}
									>
										<Chip label={type} size="small" />
									</Tooltip>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Box>
			{typeof event.note !== "undefined" && event.note !== "" ? (
				<Typography variant="subtitle1">
					<Box fontStyle="italic" lineHeight={1.5}>
						{event.note}{" "}
					</Box>
				</Typography>
			) : null}
		</>
	);
}
