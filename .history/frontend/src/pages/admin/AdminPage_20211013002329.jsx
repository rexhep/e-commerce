import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import ClientHeader from '../../components/clientHeader/ClientHeader';

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: '#1e88e5',
      color: '#fff'
    },
    layoutContainer: {
      height: "calc(100vh - 120px)",
      overflowX: "hidden",
      msFlex: "1 1",
      flex: "1 1",
      padding: "24px 0"
    },
    adminBaseContent: {
      msFlex: "1 1",
      flex: "1 1",
      width: "calc(100% - 256px)"
    },
    adminContentHeader: {
        top: "0",
        flex: "0 0 auto",
        right: "0",
        height: "72px",
        display: "-ms-flexbox, flex",
        padding: "0",
        boxShadow: "4px 4px 40px 0 rgb(0 0 0 / 5%)",
        transition: "width .2s",
        alignItems: "center",
        msFlexPack: "justify",
        msFlexAlign: "center",
        justifyContent: "space-between",
        backgroundColor: "#1e88e5"
    },
    adminRightContainerHeader: {
      display: "flex",
      position: "relative",
      boxSizing: "border-box",
      alignItems: "center",
      msFlexAlign: "center",
      padding: 13,
      width: "auto",
      flexDirection: "row-reverse"
    },
    adminContent: {
      padding: "24px",
      msFlex: "auto",
      flex: "auto",

      '& form': {
          maxWidth: '100%'
      }
    },
    menuList: {
        '& a': {
            width: '100%'
        }
    },
    mobileMenu: {
        '&:hover': {
            background: 'none',
            border: 'none'
        }
    },
    mobileBrand: {
        width: '100%'
    }
  }));

export default function Dashboard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   <>
    <div className={classes.adminMainSection}>
        {size >= 767 && (
            <div className={classes.adminAside}>
                <div className={classes.adminLayout}>
                    <div className={classes.brandAdmin}>
                    Brand
                    </div>
                    <div className={classes.layoutContainer}>
                    <MenuList>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/">Home</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/dashboard">Dashboard</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/productlist">Add New Product</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/menageOrders">Orders</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/userlist">Users</Link></MenuItem>
                    </MenuList>
                    </div>
                </div>
            </div>
        )}
      
      <div className={classes.adminBaseContent}>
        <div className={classes.adminContentHeader}>
          <div className={classes.adminRightContainerHeader}>
              {size <= 767 && (
                <div>
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className={classes.mobileMenu}
                    >
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/">Home</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/dashboard">Dashboard</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/productlist">Add New Product</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/menageOrders">Orders</Link></MenuItem>
                        <MenuItem className={`${classes.menuList} fontSize`}><Link to="/userlist">Users</Link></MenuItem>
                    </Menu>
                </div>
                
              )}
              <ClientHeader />
              {size <= 767 && (
                  <div className={classes.mobileBrand}>Brand</div>
              )}
          </div>
        </div>
        <div className={classes.adminContent}>
          {props.children}
        </div>
      </div>
    </div>
   </>
  );
}