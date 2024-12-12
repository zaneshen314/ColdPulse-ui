import React, { useState } from 'react';
import { Box, Button, Chip, Grid, Modal, Paper, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteCharityEventParticipation } from "../../api/charityEvent";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { keyframes } from '@mui/system';

const images = [
    '/charity_img/garbage.jpg',
    '/charity_img/garbage2.jpg',
    '/charity_img/shore.jpg',
];

const statusColors = {
    REGISTERED: '#BBDEFB',
    ENROLLED: '#D1C4E9',
    COMPLETED: '#C8E6C9',
    REJECTED: '#E0E0E0',
    ABSENT: '#E0E0E0'
};

const textColors = {
    REGISTERED: '#1976d2',
    ENROLLED: '#673ab7',
    COMPLETED: '#388e3c',
    REJECTED: '#616161',
    ABSENT: '#616161'
};

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const getStatusIcon = (status) => {
    switch (status) {
        case 'COMPLETED':
            return <CheckCircleIcon />;
        case 'REJECTED':
        case 'ABSENT':
            return <CancelIcon />;
        case 'ENROLLED':
        case 'REGISTERED':
            return <CheckCircleIcon />;
        default:
            return null;
    }
};

const UserCharityItem = ({ event, index, setUserCharityEvents }) => {
    const [openQuitModal, setOpenQuitModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const handleQuitCharityEvent = (eventId) => {
        setSelectedEventId(eventId);
        setOpenQuitModal(true);
    };

    const handleQuitModalClose = (confirm) => {
        setOpenQuitModal(false);
        if (confirm && selectedEventId !== null) {
            deleteCharityEventParticipation(selectedEventId).then((response) => {
                setUserCharityEvents((prevEvents) => prevEvents.filter((event) => event.charityEvent.id !== selectedEventId));
            });
        }
    };

    const handleClick = () => {
        handleQuitCharityEvent(event.charityEvent.id);
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, backgroundColor:'rgba(205, 250, 255, 0.2)', boxShadow: "0 0 20px #3a5f7a", color:'white' }}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                    <Box
                        component="img"
                        src={event.charityEvent.imgUrl || images[index % images.length]}
                        alt={event.charityEvent.name}
                        sx={{
                            width: '12rem',
                            height: '12rem',
                            borderRadius: '5%',
                            marginTop: 1,
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 1.3, marginBottom: 2 }}>
                        {event.charityEvent.name}
                    </Typography>

                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, color: 'rgba(228, 219, 233, 0.9)' }}>
                        <DateRangeIcon sx={{ color: 'rgba(228, 219, 233, 0.9)', fontSize: '1.3rem', marginRight: 1 }} />
                        {event.charityEvent.startTime}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, color: 'rgba(228, 219, 233, 0.9)' }}>
                        <LocationOnIcon sx={{ color: 'rgba(228, 219, 233, 0.9)', fontSize: '1.3rem', marginRight: 1 }} />
                        <span style={{ fontSize: '1rem', marginRight: '0.5rem' }}>Venue:</span>
                        {event.charityEvent.location}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'break-all', color: 'rgba(228, 219, 233, 0.9)' }}>
                        <DescriptionIcon sx={{ color: 'rgba(228, 219, 233, 0.9)', fontSize: '1.3rem', marginRight: 1 }} />
                        <span style={{ fontSize: '1rem', marginRight: '0.5rem', wordBreak: 'normal' }}>Description:</span>
                        <span>{event.charityEvent.description.substr(0, 300)}</span>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Chip
                        icon={getStatusIcon(event.charityEventParticipation.status)}
                        label={event.charityEventParticipation.status === 'REGISTERED' ? 'PENDING' : event.charityEventParticipation.status}
                        sx={{
                            backgroundColor: statusColors[event.charityEventParticipation.status],
                            color: textColors[event.charityEventParticipation.status],
                            fontWeight: 'bold',
                            padding: "0 4px",
                            marginBottom: 1,
                            '& .MuiChip-icon': {
                                color: textColors[event.charityEventParticipation.status],
                            }
                        }}
                    />
                    {event.charityEventParticipation.status === 'COMPLETED' && (
                        <Chip
                            icon={<FavoriteIcon sx={{ color: '#e8628d', animation: `${bounce} 1s infinite` }} />}
                            label={`${event.charityEvent.point} Heartbeats`}
                            sx={{
                                backgroundColor: '#fdf1f5',
                                color: '#e8628d',
                                fontWeight: 'bold',
                                padding: '0 0px',
                                marginTop: 1,
                                '& .MuiChip-icon': {
                                    color: '#e8628d',
                                }
                            }}
                        />
                    )}
                    <Button variant="contained" color="primary" sx={{ marginLeft: "5%", marginTop: "80%", textTransform: 'none', backgroundColor: "#CF484A" }} onClick={handleClick}>
                        Leave Event
                    </Button>
                </Grid>
            </Grid>
            <Modal
                open={openQuitModal}
                onClose={() => handleQuitModalClose(false)}
                aria-labelledby="quit-modal-title"
                aria-describedby="quit-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',
                    }}
                >
                    <Typography id="quit-modal-title" variant="h6" component="h2">
                        Quit Event
                    </Typography>
                    <Typography id="quit-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to quit this event?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" onClick={() => handleQuitModalClose(true)}>
                            Yes
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleQuitModalClose(false)}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
};

export default UserCharityItem;