import {create} from './api-user';
import React, { useState } from 'react';
import { Button, Card, CardActions,makeStyles, CardContent, Icon, TextField, Typography, Dialog, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
export default function Signup()
{
    const classes=useStyles();
    const [values,setValues]=useState({
        name:'',
        password:'',
        email:'',
        open:false,
        error:''
    });

    const handlChange=name=>event=>{
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

        create(user).then((data)=>{
            if(data.error)
                setValues({...values,error:data.error})
            else
            setValues({...values,error:'',open:true});
        })
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" className={classes.textField} label="Name" value={values.name} onChange={handlChange('name')} />
                    <br/>
                    <TextField id="email" type="email" className={classes.textField} label="Email" value={values.email} onChange={handlChange('email')} margin="normal" />
                    <br/>
                    <TextField id="password" className={classes.textField} label="Password" type="password" value={values.passowrd} onChange={handlChange('password')} margin="normal" /> 
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
            <Dialog open={values.open} disableBackdropClick={true}>
                    <DialogTitle>
                        New Account
                    </DialogTitle>
                    <DialogContentText>
                        New Accout successfully created
                    </DialogContentText>
                    <DialogActions>
                        <Link to="/signin">
                            <Button color="primary" autoFocus="autoFocus" variant="contained">
                                Sign In
                            </Button>
                        </Link>
                    </DialogActions>
            </Dialog>
        </div>
    )
}