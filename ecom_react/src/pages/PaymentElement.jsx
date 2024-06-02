import React, { useEffect, useState } from "react";
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Payment from "./Payment";
import { API } from "../config";


const PaymentElement = () => {
    const [stripeApiKey,setStripeApiKey]=useState('')

    useEffect(()=>{
        const getStripeApiKey=async()=>{
            const {data}=await axios.get(`${API}/stripeapi`)
            setStripeApiKey(data.stripeApiKey)
        }

        getStripeApiKey()
    },[])
  return (
  <>
  {stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
    </Elements>
  )}
  </>
  )
};

export default PaymentElement;
