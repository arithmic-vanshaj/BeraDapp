"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAccount } from 'wagmi';
import { Button, CircularProgress } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import WalletInfo from '../components/walletInfo';
import {TokenPriceChart} from '../components/priceChart';
import TransactionInfo from '../components/transactionInfo';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Overlay = () => {
    const { openConnectModal } = useConnectModal();
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
        <div
            style={{
                position: 'relative',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: '30vh',
                backgroundColor: 'rgba(215, 232, 255, 0.36)', // orange with 0.6 opacity
                display: 'flex',
                borderRadius: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
            }}
        >
            <Button
                onClick={() => {
                    if (openConnectModal) openConnectModal();
                }}
                variant="contained"
                sx={{
                    backgroundColor: '#ED5C07',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    padding: '12px',
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: '#DA5407',
                    },
                }}
            >
                Connect Wallet to see your transactions
            </Button>
        </div>
    </div>
  );
}


export function Dashboard() {
    const { isConnected, address } = useAccount();
    // send the address to the backend
    const [sentAddress, setSentAddress] = React.useState(false);

    React.useEffect(() => {
        const sendAddress = async () => {
            if (isConnected && !sentAddress) {
                // Generate a simple session token (for demo, use a random string)
                const session = Math.random().toString(36).substring(2) + Date.now().toString(36);
                await fetch('../../api/walletApi/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ walletAddress: address, session: session })
                }).then(() => setSentAddress(true));
            } else {
                console.log("Error sending the wallet Address");
            }
        };
        sendAddress();
    }, [isConnected, address, sentAddress]);

  return (
    <div className='ml-30 mr-30 mt-4'>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {isConnected ? (
                    <>
                        <Grid size={4}>
                            <WalletInfo/>
                        </Grid>
                        <Grid size={8}>
                              <TransactionInfo />
                        </Grid>
                        <Grid container spacing = {1}>
                            <Grid size={4}>
                                {/* wallet analysis */}
                            </Grid>
                            <Grid size={4}>
                                {/* pool analysis and suggestion */}
                            </Grid><Grid size={4}>
                                {/* Recommended approaches */}
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Grid size={12} sx={{ position: 'relative' }}>
                        <Overlay />
                    </Grid>
                )}
                {/* data grid for the price graph */}
                <Grid size={12}>
                    <TokenPriceChart/>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}