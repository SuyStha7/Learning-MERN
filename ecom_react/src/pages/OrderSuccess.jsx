import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <>
        <div className="container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-6 text-center">
                    <img src="https://www.iconpacks.net/icons/5/free-green-check-mark-verified-circle-icon-16223-thumb.png" alt="" className="img-fluid d-block mx-auto my-5" height={'200'} width={'200'}/>
                    <h2>Your Order has been placed successfully</h2>
                    <Link to=''>Go to Orders</Link>
                </div>
                </div>
             </div>
    </>
  )
}

export default OrderSuccess