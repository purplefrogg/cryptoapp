import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography, } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  
  Tooltip,
  Legend
);

const { Title } = Typography
const LineChart = ({ currentPrice, coinHistory, coinName }) => {
    const coinPrice = []
    const coinTimestamp = []
     
    for(let i = 0; i < coinHistory?.data?.coin?.sparkline?.length; i++){
        coinPrice.push(coinHistory?.data?.coin?.sparkline[i])
        coinTimestamp.push(i.toString())
    }
    
    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data?.coin?.change}%</Title>
                    <Title level={5} className='current-price'>Current {coinName} Price: ${currentPrice}</Title>
                </Col>
            </Row>
            <Line options={options} data={data} />
        </>
    )
}

export default LineChart