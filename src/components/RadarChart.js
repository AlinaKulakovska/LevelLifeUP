import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ userData }) => {
  const data = {
    labels: ['Hobbies', 'Social', 'Work', 'Self-care', 'Love'],
    datasets: [
      {
        label: 'User Data',
        data: userData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#F6AA1C',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full md:w-[35%] ">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
