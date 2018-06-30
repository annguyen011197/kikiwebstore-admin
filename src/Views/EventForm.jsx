import React, { Component } from 'react'
import {
    Grid,
    TextField,
    Paper,
    Button,
    Snackbar,
    Slide,
    Typography,
    Fade,
    LinearProgress
} from '@material-ui/core'
import Dropzone from 'react-dropzone'
import util from '../Others/Utils'
import data from '../Others/Data'


export default class EventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            file: null,
            nameerror: false,
            descriptionerror: false,
            snackbaropen: false,
            message: '',
            loading: false,
            filename:'Drop file here'
        }
    }
    handleNewChange = prop => event => {
        this.setState({
            [`${prop}error`]: false,
            [prop]: event.target.value
        });
    };
    PostEvent() {
        if (this.state.name == '') {
            this.setState({
                nameerror: true
            })
            return
        }
        if (this.state.description == '') {
            this.setState({
                descriptionerror: true
            })
            return
        }
        let value = {
            name: this.state.name.trim(),
            detail: this.state.description.trim()
        }
        if (this.state.image) {
            value.image = this.state.image
        }
        // this.setState({
        //     loading: true
        // }, () => data.PostEvent(data)
        //     .then((result) => {
        //         this.setState({
        //             loading:false,
        //             snackbaropen:true,
        //             message:'Success'
        //         })
        //     }).catch((err) => {
        //         this.setState({
        //             loading:false,
        //             snackbaropen:true,
        //             message:'Erorr'
        //         })
        //     }))
        this.setState({
            loading: true
        }, () => data.PostEvent(value)
            .then((result) => {
                this.setState({
                    loading: false,
                    snackbaropen: true,
                    message: 'Success'
                })
            }).catch((err) => {
                this.setState({
                    loading: false,
                    snackbaropen: true,
                    message: 'Erorr'
                })
            }))
    }
    renderMain() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        label="Tên sự kiện"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("name")}
                        error={this.state.nameerror}
                        value={this.state.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Mô tả"
                        fullWidth
                        multiline
                        type="text"
                        onChange={this.handleNewChange("description")}
                        value={this.state.description}
                        error={this.state.descriptionerror}
                        rows={9}
                        rowsMax={12}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Dropzone
                        onDrop={(accept, reject) => {
                            console.log(accept)
                            util.getBase64Img(accept)
                                .then((result) => {
                                    this.setState({
                                        file: result,
                                        filename: accept[0].name
                                    })
                                }).catch((err) => {
                                    console.log(err)
                                });
                        }}
                    >{this.state.filename}</Dropzone>
                </Grid>
                <Grid>
                    <Button
                        variant="contained" color="primary"
                        onClick={this.PostEvent.bind(this)}
                    >Thêm sự kiện</Button>
                </Grid>
            </Grid>
        )
    }
    render() {
        return (
            <Paper
                style={{
                    padding: 20
                }}
            >
                {this.state.loading ?
                    <LinearProgress color="secondary" /> :
                    this.renderMain()
                }
                <Snackbar
                    open={this.state.snackbaropen}
                    onClose={() => {
                        this.setState({
                            snackbaropen: false
                        })
                    }}
                    TransitionComponent={Fade}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={6000}
                    message={<span id="message-id">{this.state.message}</span>}
                />
            </Paper>
        )
    }
}
