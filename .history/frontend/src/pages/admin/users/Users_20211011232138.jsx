import React, { useEffect, useState } from 'react';
import { makeStyles, Button } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { menageOrders } from '../../../actions/orderActions';
import AdminPage from '../../../pages/admin/AdminPage';
import LoadingBox from '../../../components/LoadingBox';
import MessageBox from '../../../components/MessageBox';
import PageTitle from '../../../components/PageTitle';

const useStyles = makeStyles((theme) => ({

  }));

  const allCols = (classes, history) => (
    [
        {
            field: "Actions",
            flex: 1,
            sortable: false,
            renderCell: (cellValues) => (
                <div>
                <Button onClick={() => history.push(`/orderDetails/${cellValues.row._id}`)} className={`${classes.backButton}`} variant="contained">Edit</Button>
            </div>
            )
          },
          {
            field: '_id',
            headerName: 'ID',
            minWidth: 170,
            flex: 1,
          },
      { 
        field: 'isDelivered',
        headerName: 'Status',
        minWidth: 170,
        flex: 1,
        valueGetter: ({ value }) => value === false ? 'Not Delivered' : 'Delivered',
        },
      {
        field: 'isPaid',
        headerName: 'Paid',
        minWidth: 170,
        type: "boolean",
        flex: 1,
        // format: (value) => value.toLocaleString('en-US'),
      },
      {
        field: 'country',
        headerName: 'Country',
        minWidth: 170,
        type: "text",
        align: 'left',
        flex: 1,
        valueGetter: (params) => params.row.shippingAddress.country 
        // format: (value) => value.toLocaleString('en-US'),
      },
      {
        field: 'itemsPrice',
        headerName: 'Price',
        minWidth: 170,
        type: "text",
        align: 'left',
        flex: 1,
        // format: (value) => value.toLocaleString('en-US'),
      },
      {
        field: 'paymentMethod',
        headerName: 'PaymentMethod',
        minWidth: 170,
        align: 'left',
        flex: 1,
        // format: (value) => value.toFixed(2),
      },
      {
        field: 'totalPrice',
        headerName: 'Total Price',
        minWidth: 170,
        align: 'left',
        flex: 1,
        // format: (value) => value.toFixed(2),
      },
      {
        field: 'createdAt',
        headerName: 'Date',
        minWidth: 170,
        align: 'left',
        flex: 1,
        valueGetter: (data) => {
          const momentDate =  moment(data.value);
            return momentDate.format('DD-MM-YYYY');
        },
      },
    ]
);

export default function Users(props) {
    const classes = useStyles();

    const [pageSize, setPageSize] = useState(5);

  const columns = allCols(classes, props.history);

  const dispatch = useDispatch();

  const orderList =useSelector(state => state.allOrderList);

  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(menageOrders());
}, [dispatch]);


    return (
        <AdminPage>
        {loading ? (
      <LoadingBox></LoadingBox>
  ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
  ) : (
      <>
        <PageTitle title="Orders" />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div className={classes.mainGrid}>
              {orders?.length && (
                  <DataGrid 
                    rows={orders && orders} 
                    columns={columns} 
                    getRowId={(row) => row._id} 
                    className={classes.mainGrid} 
                    autoHeight
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableColumnFilter 
                  />
              )}
            </div>
      </Paper>
      </>
    )}
      </AdminPage>
    )
}
