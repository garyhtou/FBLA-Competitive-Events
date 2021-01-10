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
import { Skeleton } from "@material-ui/lab";

export default function EventHeader({
	event,
	eventLoading,
	category,
	catLoading,
}) {
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
						{catLoading && eventLoading ? (
							<Skeleton>
								<Chip size="small" />
							</Skeleton>
						) : (
							<Chip
								label={
									(!catLoading && category.friendlyName) ||
									(!eventLoading && event.category)
								}
								size="small"
							/>
						)}
					</Grid>
				</Grid>
				<Grid container spacing={1} alignItems="center">
					<Grid item>
						<Typography variant="subtitle1">Type: </Typography>
					</Grid>
					<Grid item>
						<Grid container spacing={1}>
							{!eventLoading ? (
								<>
									{event.participantType.map((type) => (
										<Grid key={type} item>
											<Tooltip
												title={
													customStrings.participantType[type.toLowerCase()] ||
													""
												}
											>
												<Chip label={type} size="small" />
											</Tooltip>
										</Grid>
									))}
								</>
							) : (
								<Grid item>
									<Skeleton>
										<Chip size="small" />
									</Skeleton>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Box>
			{!eventLoading &&
			typeof event.note !== "undefined" &&
			event.note !== "" ? (
				<Typography variant="subtitle1">
					<Box fontStyle="italic" lineHeight={1.5}>
						{event.note}{" "}
					</Box>
				</Typography>
			) : null}
		</>
	);
}
