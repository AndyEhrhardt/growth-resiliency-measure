import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@mui/material/TextField";
import { Paper, Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';


function ManageAccess() {
    // accept or reject access request
    // change user roles
    // const [open, setOpen] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const store = useSelector(store => store.manageAccess);

    useEffect(() => {
        dispatch({ type: 'FETCH_HAS_ACCESS' }


        )
    }, [])

    useEffect(() => {
        dispatch({ type: 'FETCH_REQUESTING_ACCESS' })

    }, [])


    const handleDelete = (userId) => {

        dispatch({ type: 'REMOVE_USER', payload: userId })

    }
    return (
        <div className="manage_access">
            <Button onClick={() => history.push('/studentList')} variant="contained" color="secondary">Student List</Button>
            <Paper elevation={12} sx={{ width: '100%' }}>

                <TableContainer>
                    <Table>
                        <TableHead >
                            <TableRow style={{ top: 57, minWidth: 1700 }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Access Level</TableCell>
                                <TableCell >Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {store.map(user => (
                                <TableRow className="users_has_access" key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.access_level}</TableCell>
                                    <Button onClick={() => handleDelete(user.id)}><DeleteIcon /></Button>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

            </Paper>
        </div>
    );
}

export default ManageAccess;