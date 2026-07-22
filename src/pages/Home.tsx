import Accordion from "../components/Accordion/Accordion";
import ReviewPanel from "../components/ReviewPanel/ReviewPanel";

export default function Home() {
  return (
    <div className="page">
      <div className="layout">
        <Accordion />
        <ReviewPanel />
      </div>
    </div>
  );
}
