import * as React from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { signout } from '../../actions/userActions';
import { Link } from 'react-router-dom';

const ClientHeader = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

  const signoutHandler = () => {
    dispatch(signout());
  } 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography className="fontSize-avatar" sx={{ minWidth: 100 }}>{userInfo.name}</Typography>
        <IconButton className="avatar-icon" onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 30, height: 30 }}>{userInfo.name}</Avatar>
          </IconButton>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className="fontSize"
      >
        <MenuItem className="fontSize" onClick={handleClose}><Link to='/profile'>User Profile</Link></MenuItem>
        <MenuItem className="fontSize" onClick={handleClose}><Link to="/orderhistory">Order History</Link></MenuItem>
        <MenuItem className="fontSize" onClick={handleClose}><Link to="#signout" onClick={signoutHandler}>
            Sign Out
        </Link></MenuItem>
      </Menu>
    </div>
  );
}

export default ClientHeader;