import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Divider, Typography, Alert, AppBar, Toolbar, Button, Dialog } from '@mui/material';
import { getEventData, getConcertTicketStrategyByClass } from '../../api/concertSessionEvent';
import ConcertMeta from './ConcertMeta';
import TicketOptions from './TicketOptions';
import Login from '../Login/Login';
import { useAuth } from '../../context/AuthContext';

export default function Ticket() {
    const { authenticated } = useAuth();
    const { concert_id } = useParams();
    const navigate = useNavigate();
    const [concertDetails, setConcertDetails] = useState([]);
    const [concertMeta, setConcertMeta] = useState({});
    const [selectedTickets, setSelectedTickets] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [classWarning, setClassWarning] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);
    const [disableBuy, setDisableBuy] = useState(true);

    const totalPrice = Object.values(selectedTickets).reduce((acc, ticket) => acc + (ticket.price * ticket.quantity), 0);
    const totalSelectedTickets = Object.values(selectedTickets).reduce((acc, ticket) => acc + ticket.quantity, 0);

    const handleTicketChange = (id, className, price, value) => {
        const newTotalSelectedTickets = totalSelectedTickets + value - (selectedTickets[id]?.quantity || 0);
        if (newTotalSelectedTickets <= 3) {
            if (selectedClass === null || selectedClass === className) {
                setSelectedTickets((prev) => ({
                    ...prev,
                    [id]: { price, quantity: value }
                }));
                setSelectedClass(className);
                setShowWarning(false);
                setClassWarning(false);
            } else {
                setClassWarning(true);
            }
        } else {
            setShowWarning(true);
        }
    };

    const handleBuyClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {            
            setLoginOpen(true);
        } else {
            authenticated();
            navigate('/payment', { state: {
                numberOfTickets: totalSelectedTickets,
                time: concertMeta.time,
                venue: concertMeta.venue,
                ticketClass: selectedClass,
                pricePerTicket: concertDetails.find((detail) => detail.className === selectedClass).price}});                
        }
    };

    useEffect(() => {
        getEventData(1,1).then((data) => {
            setConcertMeta(data);
        });
        getConcertTicketStrategyByClass(1).then((data) => {
            setConcertDetails(data);
        });
    }, [concert_id]);

    useEffect(() => {
        console.log(totalSelectedTickets);
        if (totalSelectedTickets > 0 && totalSelectedTickets <= 3) {
            setDisableBuy(false);
        } else {
            setDisableBuy(true);
        }
    }, [totalSelectedTickets]);

    return (
        <Container sx={{ pt: 4 }}>
            <ConcertMeta concertMeta={concertMeta} />
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold'}}>Ticket Option</Typography>
            {showWarning && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Each user can only purchase at most 3 tickets per concert.
                </Alert>
            )}
            {classWarning && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    You can only buy tickets from the same class in one order. Each user can only purchase at most 3 tickets per concert.
                </Alert>
            )}
            <TicketOptions 
                concertDetails={concertDetails} 
                selectedTickets={selectedTickets} 
                handleTicketChange={handleTicketChange} 
            />
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Total Tickets: {totalSelectedTickets} | Total Price: USD{totalPrice.toFixed(2)}
                    </Typography>
                    <Button disabled={disableBuy} variant="contained" color="secondary" onClick={handleBuyClick}>
                        Buy
                    </Button>
                </Toolbar>
            </AppBar>
            <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
                <Login isVisible={loginOpen} onClose={()=>{setLoginOpen(false)}} />
            </Dialog>
        </Container>
    );
}