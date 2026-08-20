import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function CityChart() {


  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    axios
      .get("http://127.0.0.1:8000/city-count")

      .then((res)=>{


        console.log("City API:", res.data);


        const topCities = [...res.data]
          .filter(item =>
            item.city &&
            item.city !== "nan"
          )
          .sort(
            (a,b)=> b.total - a.total
          )
          .slice(0,10);



        setCityData(topCities);


      })

      .catch((error)=>{

        console.log(error);

      })

      .finally(()=>{

        setLoading(false);

      });


  }, []);




  const chartData = {


    labels: cityData.map(
      item => item.city
    ),


    datasets:[

      {

        label:"No. of Businesses",

        data: cityData.map(
          item => item.total
        ),


        backgroundColor:

          [
            "#2563eb",
            "#16a34a",
            "#f59e0b",
            "#dc2626",
            "#7c3aed",
            "#0891b2",
            "#db2777",
            "#65a30d",
            "#ea580c",
            "#475569"
          ],


        borderRadius:8,


        borderWidth:1

      }

    ]

  };





  const options = {


    responsive:true,


    maintainAspectRatio:false,


    plugins:{


      title:{


        display:true,


        text:"Top 10 Cities by Business Count",


        font:{


          size:18,


          weight:"bold"

        }

      },



      legend:{


        display:false


      },



      tooltip:{


        callbacks:{


          label:(context)=>{


            return ` Businesses: ${context.raw}`;


          }


        }


      }


    },




    scales:{


      x:{


        ticks:{


          maxRotation:45,


          minRotation:30


        }


      },



      y:{


        beginAtZero:true,


        ticks:{


          precision:0


        },



        title:{


          display:true,


          text:"Number of Businesses"


        }


      }


    }


  };






  return (

    <div
      style={{
        width:"100%",
        height:"400px"
      }}
    >


      {
        loading ?

        <h3>
          Loading City Data...
        </h3>


        :


        cityData.length > 0 ?

        <Bar
          data={chartData}
          options={options}
        />


        :


        <h3>
          No City Data Found
        </h3>

      }



    </div>

  );

}



export default CityChart;