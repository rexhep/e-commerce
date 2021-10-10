import React from 'react';
// import { useHistory } from "react-router-dom";
// import { Button, makeStyles } from '@material-ui/core';
// import { orange } from '@mui/material/colors';
import OrderDetailsBox from '../components/OrderDetailsBox';

// const useStyles = makeStyles((theme) => ({
//     backButton: {
//       // to make a red delete button
//       color: theme.palette.primary.contrastText,
//       background: orange[700],
//       fontSize: theme.typography.h6.fontSize,
//       fontWeight: theme.typography.h6.fontWeight,
//       letterSpacing: theme.typography.h6.letterSpacing,

//       '&:hover': {
//         background: orange[900],
//         border: 'none !important'
//       }
//     }
//   }));

const MenageOrderDetails = (props) => {
    // let history = useHistory();
    // const classes = useStyles();

    return (
        <>
            {/* <div>
                <Button onClick={() => history.goBack()} className={`${classes.backButton}`} variant="contained">Back</Button>
            </div> */}
            <div>
                <OrderDetailsBox props={props} allowPaying={false} />
            </div>
        </>
    )
}

export default MenageOrderDetails;