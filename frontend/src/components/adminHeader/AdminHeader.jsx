import * as React from 'react';
import { Button, makeStyles } from "@material-ui/core";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  console.log('theme', theme);
  return ({
    adminHeader: {
      backgroundColor: theme.palette.primary.contrastText,
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: theme.zIndex.appBar,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center'
    },
    adminMainSection: {
      display: "flex",
      msFlex: "auto",
      flex: "auto",
      msFlexDirection: "column",
      flexDirection: "row",
      minHeight: "0",
      background: "#f0f2f5"
    },
    adminAside: {
      position: "relative",
      background: theme.palette.primary.contrastText,
      transition: "all .2s",
      boxShadow: "0 0 28px 0 rgb(24 144 255 / 10%)",
      height: "100vh",
      minWidth: 300
    },
    adminLayout: {
      display: ["-ms-flexbox", "flex"],
      msFlexDirection: "column",
      flexDirection: "column",
      msFlexPack: "justify",
      justifyContent: "space-between",
      height: "100%",
      marginTop: "-.1px",
      paddingTop: ".1px"
    },
    brandAdmin: {
      zIndex: "1",
      height: "72px",
      display: "flex",
      fallbacks: [
        {
          display: "-ms-flexbox"
        }
      ],
      msFlexAlign: "center",
      alignItems: "center",
      msFlexPack: "center",
      justifyContent: "center",
      padding: "0 24px",
      boxShadow: "0 1px 9px -3px rgb(0 0 0 / 20%)"
    },
    layoutContainer: {
      height: "calc(100vh - 120px)",
      overflowX: "hidden",
      msFlex: "1 1",
      flex: "1 1",
      padding: "24px 0"
    },
    adminBaseContent: {
      height: "100vh",
      msFlex: "1 1",
      flex: "1 1",
      width: "calc(100% - 256px)",
      overflowY: "scroll",
      overflowX: "hidden"
    },
    adminContentHeader: {
      top: "0",
      flex: "0 0 auto",
      right: "0",
      width: "calc(100% - 256px)",
      height: "72px",
      display: "-ms-flexbox, flex",
      padding: "0",
      position: "absolute",
      boxShadow: "4px 4px 40px 0 rgb(0 0 0 / 5%)",
      transition: "width .2s",
      alignItems: "center",
      msFlexPack: "justify",
      msFlexAlign: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff"
    },
    adminRightContainerHeader: {
      display: "flex",
      zIndex: 99999,
      position: "relative",
      boxSizing: "border-box",
      alignItems: "center",
      msFlexAlign: "center",
      cssFloat: "revert",
      width: "auto",
      flexDirection: "row-reverse"
    },
    adminContent: {
      padding: "24px",
      minHeight: 'calc(100% - 72px)',
      msFlex: "auto",
      flex: "auto",
      paddingTop: 72
    }
  });
});

export default function BasicMenu(props) {
  const classes = useStyles();

  return (
   <>
    <div className={classes.adminMainSection}>
      <div className={classes.adminAside}>
        <div className={classes.adminLayout}>
          <div className={classes.brandAdmin}>
            Brand
          </div>
          <div className={classes.layoutContainer}>
          <MenuList>
            <MenuItem><Link to="/dashboard">Dashboard</Link></MenuItem>
            <MenuItem><Link to="/productlist">Products</Link></MenuItem>
            <MenuItem><Link to="/menageOrders">Orders</Link></MenuItem>
            <MenuItem><Link to="/userlist">Users</Link></MenuItem>
          </MenuList>
          </div>
        </div>
      </div>
      <div className={classes.adminBaseContent}>
        <div className={classes.adminContentHeader}>
          <div className={classes.adminRightContainerHeader}>
          primary content
          </div>
        </div>
        <div className={classes.adminContent}>
          zfdsfsdfsf
        </div>
      </div>
    </div>
   </>
  );
}