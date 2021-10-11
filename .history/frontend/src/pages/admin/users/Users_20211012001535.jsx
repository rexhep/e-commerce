import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllUsers } from '../../../actions/userActions';
import AdminPage from '../../../pages/admin/AdminPage';
import LoadingBox from '../../../components/LoadingBox';
import MessageBox from '../../../components/MessageBox';
import PageTitle from '../../../components/PageTitle';

  const allCols = () => (
    [
          {
            field: '_id',
            headerName: 'ID',
            minWidth: 170,
            flex: 1,
          },
          { 
            field: 'isAdmin',
            headerName: 'Status',
            minWidth: 170,
            flex: 1,
            valueGetter: ({ value }) => value === false ? 'Client' : 'Admin',
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

export default function Users() {

    const [pageSize, setPageSize] = useState(5);

  const columns = allCols();

  const dispatch = useDispatch();

  const usersList = useSelector(state => state.allUsersAdminPanel);

  console.log('USERS::::', usersList);

  const { loading, error, users } = usersList;

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
              {users?.length && (
                  <DataGrid 
                    rows={users && users} 
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
