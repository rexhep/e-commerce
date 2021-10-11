import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles, Button } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllUsers } from '../../../actions/userActions';
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
        field: 'name',
        headerName: 'Name',
        minWidth: 170,
        flex: 1
        },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 170,
        flex: 1
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

  const usersList = useSelector(state => {
      console.log("STATE", state);
      return state.allUsersAdminPanel;
  });

  console.log('USERS::::', usersList);

  const { loading, error, orders } = usersList;

  useEffect(() => {
    dispatch(adminAllUsers());
}, [dispatch]);


    return (
        <AdminPage>
        {loading ? (
      <LoadingBox></LoadingBox>
  ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
  ) : (
      <>
        <PageTitle title="All Users" />
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
