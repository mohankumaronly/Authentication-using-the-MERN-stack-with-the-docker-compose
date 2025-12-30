import HealthCheck from "./components/HealthCheck";
import TestApi from "./components/TestApi";

function App() {
  return (
    <>
      <HealthCheck />
      <h1>Frontend is running</h1>
      <TestApi/>
    </>
  );
}

export default App;
