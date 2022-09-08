import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fDate2 } from '../../utils/formatTime';
import { fData } from '../../utils/formatNumber';

export default function App({ widgetHeight, conf, chartData }) {
  const canvasEl = useRef(null);
  const [chartTitle, setChartTitle] = useState();

  const colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };

  useEffect(() => {
    let data, month, value;
    if (conf.chartSource) {
      const { chartSource } = conf;
      const { groupKey, valueKey, title } = chartSource;
      setChartTitle(title);
      console.log('React Chart:', chartData);
      if (chartData && chartData.length > 0 && conf) {
        month = chartData.map((a) => fDate2(a[groupKey]));
        value = chartData.map((a) => a[valueKey]);
        console.log('React Chart Period:', month);
        console.log('React Chart Value:', value);
      }
    }
    const ctx = canvasEl.current.getContext('2d');
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];

    const labels = [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4',
      'Week 5',
      'Week 6',
      'Week 7',
      'Week 8',
      'Week 9',
      'Week 10',
    ];
    if (month && value) {
      data = {
        labels: month,
        datasets: [
          {
            backgroundColor: gradient,
            label: 'My First Dataset',
            data: value,
            fill: true,
            borderWidth: 2,
            borderColor: colors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.purple.default,
            pointRadius: 3,
          },
        ],
      };
    } else {
      data = {};
    }

    const config = {
      type: 'line',
      data: data,
      options: {
        // responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(255, 99, 132)',
            },
          },
        },
        // scaleLabel: "<%= value + ' + two = ' + (Number(value) + 2)   %>",
        // scaleOverride: true,
        // scaleSteps: 10,
        // scaleStepWidth: 10,
        // scaleStartValue: 0,
        // scales: {
        //   y: {
        //     ticks: {
        //       // Include a dollar sign in the ticks
        //       callback: function (value, index, ticks) {
        //         return value / 1000 + 'k';
        //       },
        //     },
        //   },
        // },
      },
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="App" style={{ position: 'relative', height: '300px', width: '100%' }}>
      <span>{chartTitle}</span>
      <canvas id="myChart" ref={canvasEl} />
    </div>
  );
}
