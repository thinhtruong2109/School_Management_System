// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// export function LevelScore({ data }) {
//     const chartRef = useRef(null);
  
//     useEffect(() => {
//       if (data.length > 0) {
//         const labels = data.map(course => (course.TenMonHoc + " - " + course.courseLevel));
//         const Score = data.map(course => course.finalGrade);
  
//         const chartData = {
//           labels: labels,
//           datasets: [
//             {
//               label: 'Assignment Score',
//               data: Score,
//               borderColor: 'rgba(255, 99, 132, 1)',
//               backgroundColor: 'rgba(255, 99, 132, 1)',
//             },
            
//           ],
//         };
  
//         const chartConfig = {
//           type: 'bar',
//           data: chartData,
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         };
  
//         const myChart = new Chart(chartRef.current, chartConfig);
  
//         return () => {
//           myChart.destroy();
//         };
//       }
//     }, [data]);
  
//     return <canvas ref={chartRef} />;
//   }


import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function LevelScore({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      // Tạo mảng labels với trình độ của môn học
      const labels = data.map(course => course.courseLevel);
      const uniqueLabels = [...new Set(labels)]; // Lấy các giá trị duy nhất trong labels

      // Tạo mảng data cho mỗi môn học
      const datasets = data.reduce((acc, course) => {
        const existingDataset = acc.find(dataset => dataset.label === course.TenMonHoc);
        if (existingDataset) {
          existingDataset.data.push(course.finalGrade);
        } else {
          acc.push({
            label: course.TenMonHoc,
            data: [course.finalGrade],
            borderColor: '#DB4120', // Màu border
            backgroundColor: 'rgba(219, 65, 32, 1)', // Màu fill với độ mờ 0.5

          });
        }
        return acc;
      }, []);

      const chartData = {
        labels: uniqueLabels,
        datasets: datasets,
      };

      const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            
            y: {
              beginAtZero: false,
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