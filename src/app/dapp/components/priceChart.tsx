import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { WBERA_TOKEN_ADDRESS } from './constant';
import { useTokenPriceData } from '../tools/tokenPriceChart';

const chartMargin = { top: 2, bottom: 5, left: 5, right: 5 };

export function TokenPriceChart() {
    const {chartData, error} = useTokenPriceData({
        id: "wbera", contract_address: WBERA_TOKEN_ADDRESS
    });

    if (error) { return <p> {error} </p>}
    if (!chartData) {return <p> Loading Chart... </p>}

    const xLabels = chartData.labels.map((timestamp) => new Date(timestamp).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }))

  return (
    <Card sx={{ maxWidth: '100%', height:"100%" , margin: 'auto', mt: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Token Price (Last 30 Days)
        </Typography>

        <Box sx={{ mt: 2 }}>
          <LineChart
            height={300}
            series={[
              {
                curve: "natural",
                data: chartData.priceData, //price data
                label: 'Token Price (USD)',
              },
            //   {
            //     curve: "natural",
            //     data: chartData.marketCap, //market cap
            //     label: 'Market Cap (USD)',
            //   },
            //   {
            //     curve: "natural",
            //     data: chartData.volume, //volume
            //     label: 'Volume (USD)',
            //   }
            ]}
            xAxis={[
              {
                scaleType: 'point',
                data: xLabels,
                tickLabelStyle: {
                  fontSize: 10,
                  angle: -45,
                  textAnchor: 'end',
                  fill: '#888',
                },
              },
            ]}
            yAxis={[
              {
                width: 70,
                tickLabelStyle: {
                  fontSize: 12,
                  fill: '#444',
                },
                valueFormatter: (value: number) => `$${value.toFixed(2)}`,
              },
            ]}
            grid={{ horizontal: false, vertical: false }}
            margin={chartMargin}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
