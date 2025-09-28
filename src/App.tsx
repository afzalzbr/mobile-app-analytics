import Chart from "./components/chart/Chart";
import Table from "./components/table/Table";
import "./App.css";
import Loading from "./components/ui/Loading";
import ErrorState from "./components/ui/ErrorState";
import useSalesData from "./hooks/useSalesData";
import { useFilters } from "./hooks/useFilters";
import ControlsBar from "./components/controls/ControlBar";

const App = () => {
  const state = useSalesData();

  const { start, end, measure, setStart, setEnd, setMeasure } = useFilters(
    state.status === "success" ? state.data : undefined,
  );

  if (state.status === "idle" || state.status === "loading") return <Loading />;
  if (state.status === "error") return <ErrorState message={state.error} />;

  // if (state.status === "success" && state.data.length === 0) {
  //   return (
  //     <div className="container">
  //       <EmptyState
  //         title="No data available"
  //         message="The API returned no apps. Please try again later."
  //       />
  //     </div>
  //   );
  // }

  const appSeries = state.status === "success" ? state.data : [];

  return (
    <div className="container">
      <div>
        <ControlsBar
          start={start}
          end={end}
          measure={measure}
          onStartChange={setStart}
          onEndChange={setEnd}
          onMeasureChange={setMeasure}
        />
      </div>

      <Chart data={appSeries} start={start} end={end} measure={measure} />
      <Table data={appSeries} start={start} end={end} />
    </div>
  );
};

export default App;
