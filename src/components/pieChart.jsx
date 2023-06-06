import React from 'react'
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({data,getData}) => {
   
    const chartRef = useRef(null);
    const createPieChart = () => {
        if (chartRef.current) {
          const ctx = chartRef.current.getContext("2d");
      
          // Extract nutritional values from the data array
          const labels = data.map((item) => item.recipe.label);
          const calories = data.map((item) => Math.floor(item.recipe.calories));
      
          // Create the chart using the extracted data
          new Chart(ctx, {
            type: "pie",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Calories",
                  data: calories,
                  backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#cc65fe",
                    "#ffce56",
                    // Add more colors as needed
                  ],
                },
              ],
            },
          });
        }
      };
    
      useEffect(() => {
        getData();
      }, []);
      
      useEffect(() => {
        console.log("Data:", data);
        createPieChart();
      }, [data]);
      
  return (
    <div>
      <canvas ref={chartRef}></canvas>
    
    </div>
  )
}

export default PieChart
