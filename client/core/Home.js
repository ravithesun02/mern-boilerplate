import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import unicornbikeimg from './../assets/images/unicornbike.jpg';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles=makeStyles(theme=>({
    card:{
        maxWidth:600,
        margin:'auto',
        marginTop:theme.spacing(5)
    },
    title:{
        padding:`${theme.spacing(3)} px ${theme.spacing(2.5)} px ${theme.spacing(2)} px`,
        color:theme.palette.openTitle
    },
    media:{
    minHeight:400
}
}));

export default function Home()
{
    const classes=useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
            Home page
            </Typography>
            <CardMedia className={classes.media}
                image={unicornbikeimg} title="Unicorn Bicycle"/>
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to the SOCIO home page.
                </Typography>
            </CardContent>
        </Card>
    )
}