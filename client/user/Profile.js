import { Avatar, Divider,makeStyles, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { CallMissedSharp, Edit, Person } from "@material-ui/icons";
import React,{ useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import auth from '../auth/auth-helper';
import {read} from './api-user';
import Deleteuser from './DeleteUser';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5)
    }),
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle
    }
  }))

export default function Profile({match})
{
    const classes=useStyles();
    const [user,setUser]=useState({
        name:'',
        email:''
    });
    const [redirectToSigin,setRedirectToSignin]=useState(false);
    //console.log(match);
    useEffect(()=>{
        const abortController=new AbortController();
        const signal=abortController.signal;
        const jwt=auth.isAuthenticated();
       // console.log(jwt);
        read({
            userId:match.params.userId
        },{t:jwt.token},signal).then((data)=>{
            if(data && data.error)
                setRedirectToSignin(true);
            else
            setUser(data);

           // console.log(data);
        })

        return function cleanup(){
            abortController.abort();
        }
    },[match.params.userId]);

   // console.log(user);

    if(redirectToSigin)
        return <Redirect to="/signin"/>
    
        return (
            <Paper className={CallMissedSharp.root} elevation={4}>
                <Typography variant="h6" className={classes.title}>
                    Profile
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email} />
                        {
                            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && 
                            (
                                <ListItemSecondaryAction>
                                    <Link to={"/user/edit/"+user._id}>
                                        <IconButton aria-label="Edit" color="primary">
                                            <Edit/>
                                        </IconButton>
                                    </Link>
                                    <Deleteuser userId={user._id} />
                                </ListItemSecondaryAction>
                            )
                        }
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary={"Joined: "+(new Date(user.created).toDateString())} />
                    </ListItem>
                </List>
            </Paper>
        )
}

