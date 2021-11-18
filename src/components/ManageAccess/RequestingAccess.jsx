import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { Done, ThumbDown, ArrowBack } from '@mui/icons-material';

function RequestingAccess({ store }) {

    const dispatch = useDispatch()

    const handleDelete = (userId) => {
        dispatch({ type: 'REMOVE_USER', payload: userId })
    }

    // const handleDeny = (user_id) => {
    //     dispatch({ type: 'REMOVE_A_REQUESTING_USER', payload: user_id })

    // }
    //console.warn(store)

    const handleApprove = (user_id, role_number) => {
        dispatch({ type: 'ADD_REQUESTING_TO HAS_ACCESS', payload: {user_id: user_id, role_number: role_number} });

    }
    let hasAccessArray = [];
    let requestingAccessArray = []


    console.log("Please what is this", hasAccessArray)
    console.log("And what is this", requestingAccessArray);

    return (
        <div>
          
            <Button onClick={() => history.push('/studentList')} variant="contained" color="secondary"><ArrowBack />Student List</Button>
            <h2>Users With Access</h2>
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
                            {store.hasAccess.map(user => (
                                <TableRow className="users_has_access" key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.access_level}</TableCell>
                                    <TableCell><Button onClick={() => handleDelete(user.id)}><DeleteIcon /></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

            </Paper>
            <h2>Users Requesting Access</h2>
            <Paper elevation={12} sx={{ width: '100%' }}>

                <TableContainer>
                    <Table>
                        <TableHead >
                            <TableRow style={{ top: 57, minWidth: 1700 }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Access Requested</TableCell>
                                <TableCell >Approve</TableCell>
                                <TableCell >Deny</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {store.requesting.map(user => (
                                <TableRow className="users_has_access" key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.access_level}</TableCell>
                                    <TableCell><Button color="primary" onClick={() => handleApprove(user.id, user.role_number)}><Done /></Button ></TableCell>
                                    <TableCell><Button onClick={() => handleDelete(user.id)}><ThumbDown /></Button></TableCell>


                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default RequestingAccess
