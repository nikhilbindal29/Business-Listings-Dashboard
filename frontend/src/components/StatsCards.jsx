import { useEffect, useState } from "react";
import axios from "axios";
import { FaBuilding, FaCity, FaFolder } from "react-icons/fa";
import "./StatsCards.css";


function StatsCards() {

  const [stats, setStats] = useState({
    businesses: 0,
    cities: 0,
    categories: 0
  });


  useEffect(() => {

    axios.get("http://127.0.0.1:8000/total-count")
      .then(res => {

        setStats(prev => ({
          ...prev,
          businesses: res.data.total
        }));

      });


    axios.get("http://127.0.0.1:8000/city-count")
      .then(res => {

        setStats(prev => ({
          ...prev,
          cities: res.data.length
        }));

      });


    axios.get("http://127.0.0.1:8000/category-count")
      .then(res => {

        setStats(prev => ({
          ...prev,
          categories: res.data.length
        }));

      });


  }, []);



  return (

    <div className="stats-container">


      <div className="stat-card">

        <div className="icon blue">
          <FaBuilding />
        </div>

        <div>
          <h3>Total Businesses</h3>
          <p>{stats.businesses}</p>
        </div>

      </div>



      <div className="stat-card">

        <div className="icon green">
          <FaCity />
        </div>

        <div>
          <h3>Total Cities</h3>
          <p>{stats.cities}</p>
        </div>

      </div>



      <div className="stat-card">

        <div className="icon orange">
          <FaFolder />
        </div>

        <div>
          <h3>Categories</h3>
          <p>{stats.categories}</p>
        </div>

      </div>


    </div>

  );
}


export default StatsCards;