import { useEffect, useState } from "react";
import "./App.scss";
import { extractDate } from "./Assets/Functions/Function";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import Fetching from "./Components/Fetching/Fetching";
import BarChart from "./Components/Graphs/BarChart";
import LineChart from "./Components/Graphs/LineChart";
import PieChart from "./Components/Graphs/PieChart";

function App() {
  const [globalDate, setglobalDate] = useState(null);
  const [globalSlot, setglobalSlot] = useState(null);
  const [distributionDate, setdistributionDate] = useState(null);
  const [globalPrimaryRefining, setglobalPrimaryRefining] = useState(null);
  const [globalSecondaryRefining, setglobalSecondaryRefining] = useState(null);

  const [userData, setUserData] = useState({
    labels: [0, 1, 2, 3, 4],
    datasets: [
      {
        label: "Secondary Refining",
        data: [1, 2, 3, 4, 5],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [timeDistribution, setTimeDistribution] = useState({
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "Time Distribution",
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setTimeDistribution({
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          label: "Time Distribution",
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [globalDate]);

  useEffect(() => {
    if (globalPrimaryRefining)
      setUserData({
        labels: globalPrimaryRefining.map((data) =>
          extractDate(data[0].schedule_time)
        ),
        datasets: [
          {
            label: "Primary Refining",
            data: globalPrimaryRefining.map((data) => data.length),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
  }, [globalPrimaryRefining]);

  useEffect(() => {
    if (globalSecondaryRefining)
      setTimeDistribution({
        labels: globalSecondaryRefining.map((data) => data.time),
        datasets: [
          {
            label: "Time Distribution",
            data: globalSecondaryRefining.map((data) => data.objects.length),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
  }, [globalSecondaryRefining]);

  useEffect(() => { }, [globalSecondaryRefining]);

  return (
    <div className="App">
      <ControlPanel dateSetter={setglobalDate} slotSetter={setglobalSlot} />
      <div className="graphPanel">
        <div className="graphWrapper">
          <BarChart chartData={userData} />
        </div>
        <div className="graphWrapper">
          {distributionDate}
          <LineChart
            chartData={timeDistribution}
            options={{ maintainAspectRatio: false }}
            height="300px"
          />
        </div>
        <div className="graphWrapper">
          <PieChart chartData={userData} />
        </div>
      </div>
      <Fetching
        dateInput={globalDate}
        slotInput={globalSlot}
        primarySetter={setglobalPrimaryRefining}
        secondarySetter={setglobalSecondaryRefining}
        distributionSetter={setdistributionDate}
      />
    </div>
  );
}

export default App;
