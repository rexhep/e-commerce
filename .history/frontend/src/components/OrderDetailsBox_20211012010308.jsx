import React from 'react';
import { makeStyles } from "@material-ui/core";
import ClientNavbar from './clientHeader/ClientNavbar';
import OrderDetailsComponent from './OrderDetailsComponent';
import AdminPage from '../pages/admin/AdminPage';

const useStyles = makeStyles((theme) => ({
    orderDetailsPage: {
        padding: 20
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
