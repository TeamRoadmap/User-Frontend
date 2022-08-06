import Navbar from "../../landing-page/components/navbar";

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}