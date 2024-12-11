import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function ScheduleMeta({ scheduleMeta }) {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Box flex={1}>
                <img src="/floorPlan.png" alt="Floor Plan" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Box flex={1}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{scheduleMeta.name}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Venue: {scheduleMeta.venue}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Start Time: {scheduleMeta.start_time}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Duration: {scheduleMeta.duration / 60} minutes
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Price Range: ${scheduleMeta.minPrice} - ${scheduleMeta.maxPrice}
                </Typography>
            </Box>
        </Stack>
    );
}