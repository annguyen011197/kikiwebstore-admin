import React, { Component } from 'react'
import {
    Modal,
    Dialog,
    IconButton,
    Paper,
    Table,
    TableCell,
    TableFooter,
    TableHead,
    TableBody,
    TableRow,
    Typography,
    Grid
} from '@material-ui/core';
import EditBook from '../Views/EditBook'
import {
    Close as CloseIcon
} from '@material-ui/icons'
import data from '../Others/Data'

export default class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            book: null,
            bookid: null
        }
    }
    handleAction() {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        const { order } = this.props
        console.log(order)
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleAction.bind(this)}
            >
                <IconButton onClick={() => this.handleAction()}><CloseIcon /></IconButton>
                <Grid container spacing={24} style={{
                    marginLeft:20,
                    marginRight:20
                }}>
                    <Grid item xs={12} sm={6}>
                        <Typography>{order ? order.user.id.local.username : ''}</Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>{order ? order.user.id.local.accountInfo.firstName + ' ' + order.user.id.local.accountInfo.secondName : ''}</Typography>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>{order ? order.user.id.local.accountInfo.address : ''}</Typography>

                    </Grid>
                </Grid>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Size</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order ? order.books.map((n, i) => {
                                return (
                                    <TableRow key={n._id}>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell>{n.price}</TableCell>
                                        <TableCell>{n.size}</TableCell>
                                    </TableRow>
                                );
                            }) : <div></div>}
                        </TableBody>
                    </Table>
                </Paper>
            </Dialog>
        )
    }
}
