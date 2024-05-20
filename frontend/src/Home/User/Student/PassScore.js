import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function PassScore({ data }) {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (data.length > 0) {
        const labels = data.map(course => (course.TenMonHoc + " - " + course.courseLevel));
        const Score = data.map(course => course.finalGrade);
  
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Điểm Tổng Kết',
              data: Score,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            
          ],
        };
  
        const chartConfig = {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
  
        const myChart = new Chart(chartRef.current, chartConfig);
  
        return () => {
          myChart.destroy();
        };
      }
    }, [data]);
  
    return <canvas ref={chartRef} />;
  }
  