import React from 'react';
import ClientNavbar from './clientHeader/ClientNavbar';
import OrderDetailsComponent from './OrderDetailsComponent';
import AdminPage from '../pages/admin/AdminPage';


export default function OrderDetailsBox({ props, allowPaying }) {
    return (
        <div>
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
