import Link from "next/link";
import {
	Typography,
	Link as MuiLink,
	Chip,
	Grid,
	Card,
	CardContent,
} from "@material-ui/core";

export default function EventSidebar({ event, category }) {
	return (
		<>
			<Grid container spacing={3}>
				{typeof category.eligibility !== "undefined" &&
				category.eligibility !== "" ? (
					<Grid item>
						<Card>
							<CardContent>
								<Typography variant="h5" gutterBottom color="primary">
									Eligbility
								</Typography>
								<Typography varient="body2" component="p">
									{category.eligibility}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				) : null}
				{typeof category.nlcReg !== "undefined" && category.nlcReg !== "" ? (
					<Grid item>
						<Card>
							<CardContent>
								<Typography variant="h5" gutterBottom color="primary">
									NLC Registration
								</Typography>
								<Typography varient="body2" component="p">
									{category.nlcReg}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				) : null}
			</Grid>
		</>
	);
}
