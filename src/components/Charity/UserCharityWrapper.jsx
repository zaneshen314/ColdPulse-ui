import React, {useEffect, useState} from 'react';
import {AppBar, Box, Chip, Container, Toolbar, Typography} from '@mui/material';
import UserCharityList from './UserCharityList';
import {getUserCurrentPoints, getUserEventParticipation} from "../../api/charityEvent";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const UserCharityWrapper = ({width}) => {
    const [userCharityEvents, setUserCharityEvents] = useState([]);
    const [currentPoint, setCurrentPoint] = useState(0)
    useEffect(() => {
        getUserEventParticipation(1).then((response) => {
            setUserCharityEvents(response);
        });
        getUserCurrentPoints(1).then((response) => {
           setCurrentPoint(response);
        });
    }, []);
    return (
        <Box sx={{
            margin: '1% 20%',
            maxWidth: {width},
            boxShadow: 3,
            padding: 2,
            borderRadius: 2,
        }}>
            <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent', width: '97%', margin: '10px auto', marginBottom: "20px" }}>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: "bold" }}>
                        Events History
                    </Typography>
                    <Chip
                        label={"Total Points: " + currentPoint + " Points"}
                        variant="outlined"
                        icon={<MilitaryTechIcon />}
                        sx={{
                            backgroundColor: '#fdf1f5',
                            color: '#e8628d',
                            fontWeight: "bold",
                            fontSize: '1.1rem',
                            padding: '0 10px',
                            borderRadius: '20px',
                            border: 'none',
                            '& .MuiChip-icon': {
                                color: '#e8628d',
                            }
                        }}
                    />
                </Toolbar>
            </AppBar>
            <Container>
                <UserCharityList userCharityEvents={userCharityEvents}/>
            </Container>
        </Box>
    );
};

export default UserCharityWrapper;