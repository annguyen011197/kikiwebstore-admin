import React, { Component } from 'react'
import { Modal,Dialog, IconButton, Icon } from '@material-ui/core';
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
    handleAction(book_id) {
        if(book_id){
            data.DetailsBook(book_id).then((result) => {
                this.setState({
                    bookid:book_id,
                    book: result,
                    open: true
                })
            }).catch((err) => {
                console.log(err)
                return 0
            });
        }else{
            this.setState({
                open: false
            })
        }
    }
    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleAction.bind(this)}
            >   
                <IconButton onClick={()=>this.handleAction()}><CloseIcon/></IconButton>
                <EditBook book={this.state.book} id={this.state.bookid}/>
            </Dialog>
        )
    }
}
