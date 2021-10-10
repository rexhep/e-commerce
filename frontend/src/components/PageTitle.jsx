import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    console.log('THEME::', theme);
    return ({
        productTitle: {
            '& h1': {
                fontWeight: theme.typography.h1.fontWeight,
                fontFamily: theme.typography.h1.fontFamily,
                fontSize: theme.typography.h2.fontSize,
                textTransform: 'uppercase'
            }
        }
       
      });
});

export default function PageTitle(props) {
    const classes = useStyles();

    return (
        <div className={classes.productTitle}>
            <h1>{props.title}</h1>
        </div>
    )
}
