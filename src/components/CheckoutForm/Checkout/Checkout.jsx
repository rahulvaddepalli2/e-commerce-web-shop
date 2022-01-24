import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { Link } from "react-router-dom"

import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from './AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Billing Information', "Payment Details"]

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [userData, setUserData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                console.log(token)
                setCheckoutToken(token);
            } catch (error) {

            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setUserData(data);

        nextStep();
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank You For Your Purchase, </Typography>
                <Divider />
                <Typography variant="subtitle2">Order ref: ref</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
        </>
        ) : (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          );
        
          if (error) {
            Confirmation = () => (
              <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
              </>
            );
          }

    const Form = () => (activeStep === 0
        ? <AddressForm nextStep={nextStep} next={next} /> 
        : <PaymentForm userData={userData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} />);

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
