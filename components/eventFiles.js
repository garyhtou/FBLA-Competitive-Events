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
import PropTypes from "prop-types";
import { Skeleton } from "@material-ui/lab";

export default function EventFiles({
	event,
	eventLoading,
	category,
	catLoading,
	type,
}) {
	const validTypes = ["resources", "examples"];
	if (!validTypes.includes(type) || typeof event[type] === "undefined") {
		return null;
	}

	var resources = [];
	if (type === "resources" && !eventLoading) {
		for (let file of Object.keys(event.resources)) {
			let fileObj = event.resources[file];
			if (
				typeof fileObj.title !== "undefined" &&
				fileObj.title !== "" &&
				typeof fileObj.url !== "undefined" &&
				fileObj.url !== ""
			) {
				let url = fileObj.url;
				if (!url.match(/^http[s]*:\/\/[\w]+/i)) {
					url = "http://" + url;
				}

				resources.push({
					title: fileObj.title,
					description: fileObj.description || "",
					url,
				});
			}
		}
	}

	var examples = [];
	if (type === "examples" && !eventLoading) {
		for (let project of Object.keys(event.examples)) {
			let projectObj = event.examples[project];
			if (
				typeof projectObj.title !== "undefined" &&
				projectObj.title !== "" &&
				typeof projectObj.files !== "undefined"
			) {
				let pushObj = {
					title: projectObj.title,
					description: projectObj.description || "",
					files: [],
				};
				for (let file of Object.keys(projectObj.files)) {
					let fileObj = projectObj.files[file];
					if (
						typeof fileObj.title !== "undefined" &&
						fileObj.title !== "" &&
						typeof fileObj.url !== "undefined"
					) {
						let url = fileObj.url;
						if (!url.match(/^http[s]*:\/\/[\w]+/i)) {
							url = "http://" + url;
						}

						pushObj.files.push({
							title: fileObj.title,
							description: fileObj.description || "",
							url,
						});
					}
				}
				if (pushObj.files.length !== 0) {
					examples.push(pushObj);
				}
			}
		}
	}

	if (
		!eventLoading &&
		!catLoading &&
		examples.length === 0 &&
		resources.length === 0
	) {
		return null;
	}

	return (
		<>
			{!eventLoading && !catLoading ? (
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
								{type === "resources" ? (
									<>
										{resources.map((file) => (
											<ListItem
												button
												dense
												component="a"
												href={file.url}
												target="_blank"
												rel="noopener noreferrer"
												key={file.title}
											>
												<ListItemIcon>
													<Description />
												</ListItemIcon>
												<ListItemText
													primary={file.title}
													secondary={file.description}
												/>
											</ListItem>
										))}
									</>
								) : type === "examples" ? (
									<>
										{examples.map((project) => (
											<ListItem dense key={project.title}>
												<ListItemText
													primary={
														<Typography variant="h6">
															{project.title}
														</Typography>
													}
													secondary={
														<>
															<Typography variant="body2">
																{project.description}
															</Typography>
															<List>
																{project.files.map((file) => (
																	<ListItem
																		button
																		dense
																		component="a"
																		href={file.url}
																		target="_blank"
																		rel="noopener noreferrer"
																		key={file.title}
																	>
																		<ListItemIcon>
																			<Description />
																		</ListItemIcon>
																		<ListItemText
																			primary={file.title}
																			secondary={file.description}
																		/>
																	</ListItem>
																))}
															</List>
														</>
													}
												/>
											</ListItem>
										))}
									</>
								) : null}
							</List>
						</Box>
					</Paper>
				</Box>
			) : (
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
								{[1, 2, 3].map((loop) => (
									<ListItem
										button
										dense
										component="a"
										href="#"
										target="_blank"
										rel="noopener noreferrer"
										key={"loop" + loop}
									>
										<ListItemIcon>
											<Skeleton>
												<Description />
											</Skeleton>
										</ListItemIcon>
										<ListItemText
											primary={<Skeleton />}
											secondary={<Skeleton />}
										/>
									</ListItem>
								))}
							</List>
						</Box>
					</Paper>
				</Box>
			)}
		</>
	);
}

EventFiles.prototype = {
	type: PropTypes.oneOf(["resources", "examples"]),
};
