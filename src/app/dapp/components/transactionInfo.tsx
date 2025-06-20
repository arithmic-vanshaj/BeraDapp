import React from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';

// Demo Web3 transaction data
const transactions = [
  {
    hash: '0x1234abcd...5678',
    amount: 1.2345,
    to: '0xAbC123...def456',
    time: '2025-05-30 14:22',
  },
  {
    hash: '0x9a87fedc...3210',
    amount: 0.678,
    to: '0x9876ab...321def',
    time: '2025-05-30 13:45',
  },
  {
    hash: '0xa1b2c3d4...e5f6',
    amount: 5.01,
    to: '0xCafE...Babe',
    time: '2025-05-30 12:15',
  },
];

export default function TransactionTable() {
  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', mt: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Transaction Hash</strong></TableCell>
                <TableCell align="right"><strong>Amount (ETH)</strong></TableCell>
                <TableCell align="right"><strong>To Address</strong></TableCell>
                <TableCell align="right"><strong>Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.hash} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
                    {tx.hash}
                  </TableCell>
                  <TableCell align="right">{tx.amount}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                    {tx.to}
                  </TableCell>
                  <TableCell align="right">{tx.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
