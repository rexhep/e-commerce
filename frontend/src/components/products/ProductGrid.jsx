import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Button, makeStyles } from "@material-ui/core";
import { orange } from '@mui/material/colors';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const useStyles = makeStyles((theme) => ({
    backButton: {
      // to make a red delete button
      color: theme.palette.primary.contrastText,
      background: orange[700],
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.h6.fontWeight,
      letterSpacing: theme.typography.h6.letterSpacing,

      '&:hover': {
        background: orange[900],
        border: 'none !important'
      }
    },
    mainGrid: {
      height: '100vh',
      width: '100%',
      fontSize:  theme.typography.h5.fontSize,
    }
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
        field: 'brand',
        headerName: 'Brand',
        minWidth: 170,
        flex: 1,
      },
      {
        field: 'category',
        headerName: 'Category',
        minWidth: 170,
        type: "text",
        align: 'left',
        flex: 1
      },
      {
        field: 'countInStock',
        headerName: 'Count in Stock',
        minWidth: 170,
        type: "text",
        align: 'left',
        flex: 1
      },
      {
        field: 'price',
        headerName: 'Price',
        minWidth: 170,
        align: 'left',
        flex: 1
      },
      {
        field: 'numReviews',
        headerName: 'Review Numbers',
        minWidth: 170,
        align: 'left',
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

export default function ProductGrid(props) {
    const classes = useStyles();
    const [pageSize, setPageSize] = useState(10);
  
    const columns = allCols(classes, props.history);
  
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;

    console.log('PRODUCTS::', products);
  
    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return (
      <>
      {loading ? (
      <LoadingBox></LoadingBox>
  ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
  ) : (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <div className={classes.mainGrid}>
            {products?.length && (
                <DataGrid 
                  rows={products && products} 
                  columns={columns} 
                  getRowId={(row) => row._id} 
                  className={classes.mainGrid} 
                  autoHeight
                  pagination
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 20, 40]}
                  disableColumnFilter 
                />
            )}
          </div>
      </Paper>
    )}
      </>
    )
}
