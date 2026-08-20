import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import CityChart from "./components/CityChart";
import CategoryChart from "./components/CategoryChart";
import SourceChart from "./components/SourceChart";
import BusinessTable from "./components/BusinessTable";
import AddBusiness from "./components/AddBusiness";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />

      <StatsCards />


      <div className="dashboard-grid">

        <div className="chart-card">
          <h2>City Wise Businesses</h2>
          <CityChart />
        </div>


        <div className="chart-card">
          <h2>Category Distribution</h2>
          <CategoryChart />
        </div>


        <div className="chart-card full">
          <h2>Source Distribution</h2>
          <SourceChart />
        </div>

      </div>


      {/* Add button separate from charts */}
      <AddBusiness />


      {/* Table separate from dashboard grid */}
      <BusinessTable />

    </>
  );
}

export default App;