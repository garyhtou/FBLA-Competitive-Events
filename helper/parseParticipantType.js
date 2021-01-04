export default function parseParticipantType(type) {
	let participantType = [];
	let snapshotEventParticipantType = (type || "").toUpperCase();
	if (snapshotEventParticipantType.includes("I")) {
		participantType.push("Individual");
	}
	if (snapshotEventParticipantType.includes("T")) {
		participantType.push("Team");
	}
	if (snapshotEventParticipantType.includes("C")) {
		participantType.push("Chapter");
	}
	return participantType;
}
