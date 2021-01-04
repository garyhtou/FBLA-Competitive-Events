import Link from "next/link";
import {
	Typography,
	Link as MuiLink,
	Chip,
	Grid,
	Box,
	Tooltip,
	Paper,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import { Description } from "@material-ui/icons";

export default function EventFiles({ event, category, type }) {
	const validTypes = ["resources", "examples"];
	if (!validTypes.includes(type) || typeof event[type] === "undefined") {
		return null;
	}

	var files = [];
	for (let file of Object.keys(event[type])) {
		let fileObj = event[type][file];
		if (
			typeof fileObj.title !== "undefined" &&
			fileObj.title !== "" &&
			typeof fileObj.url !== "undefined" &&
			fileObj.title !== ""
		) {
			files.push({
				title: fileObj.title,
				description: fileObj.description || "",
				url: fileObj.url,
			});
		}
	}

	if (files.length === 0) {
		return null;
	}

	return (
		<>
			<Box marginTop={5}>
				<Typography variant="h4" gutterBottom>
					{type === "resources"
						? "Resources"
						: type === "examples"
						? "Examples"
						: "Files"}
				</Typography>
				<Paper>
					<Box padding={2}>
						<List>
							<ListItem
								button
								dense
								component="a"
								href="https://google.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<ListItemIcon>
									<Description />
								</ListItemIcon>
								<ListItemText primary="primary" secondary="secondary" />
							</ListItem>
						</List>
					</Box>
				</Paper>
			</Box>
		</>
	);
}
