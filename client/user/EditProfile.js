import React,{ useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import auth from '../auth/auth-helper';
import {read,update} from './api-user';
import { Button, Card, CardActions,makeStyles, CardContent, Icon, TextField, Typography, Dialog, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  }))


export default function EditProfile({match})
{
    const classes=useStyles();
   const [values,setValues]=useState({
       name:'',
       email:'',
       password:'',
       redirectToProfile:false,
       error:''
   });

   useEffect(()=>{
        const abortController=new AbortController();
        const signal=abortController.signal;
        const jwt=auth.isAuthenticated();

        read({userId:match.params.userId},{t:jwt.token},signal)
        .then((data)=>{
            if(data && data.error)
                setValues({...values,error:data.error});
            else
                setValues({name:data.name,email:data.email,error:''});
        })

        return function cleanup()
        {
            abortController.abort();
        }

   },[match.params.userId]);

   const handleChange=name=>event=>{
       setValues({
           ...values,
           [name]:event.target.value
       });
   }

   const clickSubmit=()=>{
       const user={
           name:values.name || undefined,
           email:values.email || undefined,
           password:values.password || undefined
       }

       const jwt=auth.isAuthenticated();

       update({userId:match.params.userId},{t:jwt.token},user)
       .then((data)=>{
           if(data && data.error)
           setValues({...values,error:data.error});
           else
           setValues({...values,redirectToProfile:true,userId:jwt.user._id});
       });


   }

   if(values.redirectToProfile)
    return (
        <Redirect to={"/user/"+values.userId} />
    )

    return (
        <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Edit Profile
                    </Typography>
                    <TextField id="name" className={classes.textField} label="Name" value={values.name} onChange={handleChange('name')} />
                    <br/>
                    <TextField id="email" type="email" className={classes.textField} label="Email" value={values.email} onChange={handleChange('email')} margin="normal" />
                    <br/>
                    <TextField id="password" className={classes.textField} label="Password" type="password" value={values.passowrd} onChange={handleChange('password')} margin="normal" /> 
                    {
                        values.error && (
                            <Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>error</Icon>
                                {values.error}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" className={classes.submit} onClick={clickSubmit}>
                        Submit
                    </Button>
                </CardActions>
            </Card>
    )

}