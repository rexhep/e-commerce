import * as React from 'react';
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/productlist">Products</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/menageOrders">Orders</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/userlist">Users</Link></MenuItem>
      </Menu>
    </div>
  );
}