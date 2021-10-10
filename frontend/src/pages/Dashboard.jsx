import React from 'react';
import PageTitle from '../components/PageTitle';
import ProductGrid from '../components/products/ProductGrid';
import AdminPage from '../pages/admin/AdminPage'

export default function Dashboard() {
    return (
        <div className="test">
           <AdminPage>
               <PageTitle title="Dashboard" />
               <ProductGrid />
           </AdminPage>
        </div>
    )
}
