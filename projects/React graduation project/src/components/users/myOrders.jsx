import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid } from '@mui/material';

export const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const userString = sessionStorage.getItem("data");
  const user = JSON.parse(userString);
  const [usersTable, setUsersTable] = useState([]);

  useEffect(() => {
    const userOrders = orders.filter((order) => order.userId === user.id);
    const productsBought = userOrders.flatMap((order) =>
        order.products.map((product) => ({
          Title: product.name,
          Qty: product.qty,
          Total: product.price*product.qty,
          Date: order.date
        }))
   );
   setUsersTable(productsBought);
  }, [orders]);
  return (
    <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold', margin: '10px' }}>
            Orders
            </Typography>
          </Grid>
          <Grid item xs={12}>
      <Table
          titles={['Title', 'Qty','Total' ,'Date']}
          data={usersTable}
          />
          </Grid>
     </Grid>
    </Container>
  )
}
export default MyOrders
