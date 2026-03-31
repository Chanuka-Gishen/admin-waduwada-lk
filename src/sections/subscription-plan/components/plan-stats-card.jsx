import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

const PlanStatsCard = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
          {trend && (
            <Typography variant="caption" color="success.main">
              {trend}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default PlanStatsCard;
