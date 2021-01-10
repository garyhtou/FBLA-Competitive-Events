import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
			</Head>
			<h1>404 - Page Not Found</h1>
			<Link href="/">
				<a>Go back home</a>
			</Link>
		</>
	);
}
