import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import Body from "../../components/body/Body";
import "./home.css";

export default function Home() {
  return (
    <div className="homeContainer">
      <Topbar />
      <Navbar />
      <Body />
    </div>
  );
}