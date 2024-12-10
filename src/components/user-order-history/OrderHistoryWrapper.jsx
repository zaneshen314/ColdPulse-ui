import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import OrderRecordsList from './OrderRecordsList';
import {getUserTransactionWithTickets} from "../../api/orderHistory";

const OrderHistoryWrapper = ({width}) => {
    const [transactionWithTickets, setTransactionWithTickets] = useState([])
    useEffect(() => {
        getUserTransactionWithTickets(1).then((response) => {
            setTransactionWithTickets(response.data);
        });
    }, []);
    return (
        <Box sx={{
            margin: '1% auto',
            maxWidth: {width},
            boxShadow: 3,
            padding: 2,
            borderRadius: 2,
        }}>
            <Typography variant="h4" sx={{fontWeight: 'bold', marginBottom: 2, marginLeft: "20px"}}>
                Order History
            </Typography>
            <OrderRecordsList orders={transactionWithTickets}/>
        </Box>
    );
};

export default OrderHistoryWrapper;