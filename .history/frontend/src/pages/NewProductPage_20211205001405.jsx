import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import AdminPage from '../pages/admin/AdminPage';
import { productRegister } from '../actions/productActions';
import { orange } from '@mui/material/colors';
import PageTitle from '../components/PageTitle';

const useStyles = makeStyles((theme) => ({
    productContainer: {
        background: theme.palette.primary.contrastText,
        color: "rgba(0, 0, 0, 0.87)",
        WebkitTransition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "4px",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        width: "100%",
        overflow: "hidden",
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    addProductBtn: {
        backgroundColor: `${orange[700]} !important`,
        width: 200,
        height: 40,
        fontSize: `${theme.typography.h5.fontSize} !important`
    },
    orderTextFields: {
        '& label': {
            fontSize: '1.3rem',
            margin: 0
        },
        '& input': {
            fontSize: '1.25rem',
            '&:focus': {
                outline: 'none'
            }
        }
    }
}));

export default function NewProductPage() {
    const classes = useStyles();
    const [product, setProduct] = useState();
    const [files, setFiles] = useState([]);

    const dispatch = useDispatch();

    const onFileUpload = useCallback((event) => {
        setFiles([...files, ...event.target.files] );
        setProduct({
            ...product,
          image: files
        });

    }, [files, product]);

    const onHandleChange = async (e) => {
        const value = e.target.value;

        setProduct({
            ...product,
          [e.target.name]: value
        });
      };

    const onHandleSubmit = useCallback((e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key of Object.keys(files)) {
            console.log('KEYLL', key);
            // formData.append('imagesArray', this.state.imagesArray[key]);
            data.append('file', files[key]);
        }
        // data.append('file', files);
        data.append('name', product.name);
        data.append('brand', product.brand);
        data.append('category', product.category);
        data.append('description', product.description);
        data.append('price', product.price);
        data.append('countInStock', product.countInStock);
        data.append('rating', product.rating);
        data.append('numReviews', product.numReviews);

        dispatch(productRegister(data))

    }, [dispatch, files, product])

    return (
        <AdminPage>
            <PageTitle title="Add New Product" />
            <form className={`${classes.productContainer} form`} onSubmit={onHandleSubmit}>
                    <div>
                        <TextField
                        label="Name"
                        name="name"
                        id="name"
                        onChange={onHandleChange}
                        className={classes.orderTextFields}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name="file"
                            multiple
                            id="file"
                            className='btn btn-primary btn-block mt-4'
                            onChange={onFileUpload}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Brand"
                            id="brand"
                            name="brand"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div>
                    {/* <div>
                        <TextField
                            label="Category"
                            id="category"
                            name="category"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div> */}
                    <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            // value={age}
                            label="Category"
                            onChange={onHandleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    <div>
                        <TextField
                            label="Description"
                            id="description"
                            name="description"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Price"
                            id="price"
                            name="price"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Count in Stock"
                            id="countInStock"
                            name="countInStock"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Rating"
                            id="rating"
                            name="rating"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Number Reviews"
                            id="numReviews"
                            name="numReviews"
                            onChange={onHandleChange}
                            className={classes.orderTextFields}
                        />
                    </div>
                    <div>
                        <label />
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" type="submit" className={classes.addProductBtn}>Save</Button>
                        </Stack>
                    </div>
                </form>
        </AdminPage>
    )
}
