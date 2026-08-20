import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);



function CategoryChart() {


  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(()=>{


    axios
      .get("http://127.0.0.1:8000/category-count")

      .then((res)=>{


        console.log("Category API:", res.data);



        const topCategories = [...res.data]

          .filter(item =>
            item.category &&
            item.category !== "nan"
          )

          .sort(
            (a,b)=> b.total - a.total
          )

          .slice(0,10);



        setCategoryData(topCategories);


      })


      .catch((err)=>{

        console.log(err);

      })


      .finally(()=>{

        setLoading(false);

      });



  },[]);






  const chartData = {


    labels: categoryData.map(
      item=>item.category
    ),


    datasets:[

      {

        label:"Category Count",


        data:categoryData.map(
          item=>item.total
        ),



        backgroundColor:[

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


        borderWidth:2,

        borderColor:"#ffffff"

      }

    ]

  };







  const options={


    responsive:true,


    maintainAspectRatio:false,


    plugins:{


      title:{


        display:true,


        text:"Top 10 Business Categories",


        font:{


          size:18,

          weight:"bold"

        }


      },



      legend:{


        position:"right"


      },



      tooltip:{


        callbacks:{


          label:(context)=>{


            return `${context.label}: ${context.raw} Businesses`;

          }


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
        Loading Category Data...
      </h3>


      :

      categoryData.length > 0 ?


      <Pie
        data={chartData}
        options={options}
      />


      :


      <h3>
        No Category Data Found
      </h3>


    }


    </div>

  );

}


export default CategoryChart;