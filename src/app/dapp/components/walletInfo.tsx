import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useAccount, useBalance } from 'wagmi';

export default function WalletInfo() {
    const { address, chain } = useAccount();
    const {
        data: balanceData,
        // isLoading: isBalanceLoading,
        // refetch: refetchBalance,
      } = useBalance({
        address: address,
        chainId: chain?.id || 80094
      });

  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', mt: 4, p: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Wallet Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Address
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {address}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Connected Chain
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {chain?.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Tokens
            </Typography>
            <Box sx={{ pl: 1 }}>
                {balanceData && (<Typography variant="body1">
                  {parseFloat(balanceData.formatted).toFixed(5)} {balanceData.symbol}
                </Typography>)}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
