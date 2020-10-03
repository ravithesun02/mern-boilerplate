import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React,{ useState } from "react";
import { Redirect } from "react-router-dom";
import auth from '../auth/auth-helper';
import {remove} from './api-user';
import PropTypes from 'prop-types'

export default function Deleteuser(props)
{ 
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState(false);
    //console.log(props);

    const clickButton=()=>{
        setOpen(true);
    }

    const handleRequestClose=()=>{
        setOpen(false);
    }

    const deleteAccount=()=>{
        const jwt=auth.isAuthenticated();

        remove({userId:props.userId},{t:jwt.token}).then((data)=>{
            if(data && data.error)
                console.log(data.error);
            else
            {
                auth.clearJWT(()=>console.log('deleted'));
                
                setValue(true);
                console.log(value);

                handleRequestClose();
            }
        })
    }

    if(value)
       return <Redirect to='/' />
    
    return(
        <span>
            <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
                <Delete />
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>
                    {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Confirm to delte your account
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        </span>
    )
}

Deleteuser.propTypes={
    userId:PropTypes.string.isRequired
}