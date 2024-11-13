
import "./App.css";
import MaxAndMinCrop from "./components/Tables/MaxAndMinCrop";
import AvgYieldAndAvgArea from "./components/Tables/AvgYieldAndAvgArea";

function Analysis() {
  return (
    <div className="app-container">
      <h2 className="title">Indian Agriculture Data Analysis</h2>
      <MaxAndMinCrop />
      <AvgYieldAndAvgArea />
    </div>
  );
}

export default Analysis;
