import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function ScoreChart({ data }) {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (data.length > 0) {
        const labels = data.map(course => (course.TenMonHoc + " - " + course.courseLevel));
        const assignmentScores = data.map(course => course.assignmentScore);
        const projectScores = data.map(course => course.projectScore);
        const midTermScores = data.map(course => course.midTermScore);
        const finalExamScores = data.map(course => course.finalExamScore);
  
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Assignment Score',
              data: assignmentScores,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
              label: 'Project Score',
              data: projectScores,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
              label: 'Midterm Score',
              data: midTermScores,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'Final Exam Score',
              data: finalExamScores,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 1)',
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
  