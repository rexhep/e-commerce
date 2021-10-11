import React from 'react';
import { makeStyles } from "@material-ui/core";
import ClientNavbar from './clientHeader/ClientNavbar';
import OrderDetailsComponent from './OrderDetailsComponent';
import AdminPage from '../pages/admin/AdminPage';

const useStyles = makeStyles((theme) => ({
    backButton: {
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
      fontSize: '14px'
    }
  }));


export default function OrderDetailsBox({ props, allowPaying }) {
    const classes = useStyles();
    
    return (
        <div className={classes.orderDetailsPage}>
            {allowPaying ? (
                <>
                <ClientNavbar />
                <OrderDetailsComponent props={props} allowPaying={allowPaying} />
                </>
            ) : (
                <AdminPage>
                    <OrderDetailsComponent props={props} allowPaying={allowPaying} />
                </AdminPage>
            )}
        </div>
    )
}
