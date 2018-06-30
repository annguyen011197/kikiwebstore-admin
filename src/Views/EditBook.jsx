import React, { Component } from "react";
import {
    Paper,
    Grid,
    Button,
    TextField,
    MenuItem,
    InputAdornment,
    CircularProgress
} from "@material-ui/core";
import {
    ArrowDropDown as ArrowDropDownIcon,
    Cancel as CancelIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Clear as ClearIcon
} from "@material-ui/icons";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import data from "../Others/Data";
import util from "../Others/Utils";
import $ from "jquery";
import Dropzone from "react-dropzone";

export default class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            categoryname: "",
            category: [],
            authorname: "",
            author: [],
            publishername: "",
            publisher: [],
            categorylist: [],
            authorlist: [],
            publisherlist: [],
            price: 0,
            publishday: new Date(),
            pages: 0,
            width: 0,
            height: 0,
            weight: 0,
            booktype: "",
            language: "",
            description: "",
            image: null,
            loading: true
        };
    }
    componentWillMount() {
        const { book } = this.props
        console.log(book)
        if (this.props.book) {
            this.setState({
                name: book.name,
                categoryname: book.type.name,
                authorname: book.author.name,
                publishername: book.publisher.name,
                price: parseInt(book.price),
                pages: parseInt(book.pages),
                booktype: book.typebook,
                description: book.description,
                language: book.language,
                width: parseFloat(book.size.width),
                height: parseFloat(book.size.height),
                weight: parseFloat(book.size.weight),
                publishday: new Date(book.date),
                loading: false,
                filename:'Drop file here'
            })
        }
    }

    handleChange = prop => (event, { newValue }) => {
        this.setState({
            [prop]: newValue
        });
    };
    handleNewChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    };
    ValidateCreateBook() {
        const { name, categoryname, authorname, publishername,
            width, height, weight, price, pages, language, description, booktype, publishday
        } = this.state
        if (name.trim() === '') {
            alert('Tên không được để trống')
            return
        }
        if (!price || price==0){
            alert('Giá phải lớn hơn 0')
            return
        }
        let value = {
            _id: this.props.id,
            name: name.trim(),
            price: parseInt(price),
            size: {
                width: parseInt(width),
                height: parseInt(height),
                weight: parseInt(weight)
            },
            typebook: booktype.trim(),
            language: language.trim(),
            date: publishday.toLocaleDateString("sv-SE"),
            pages: pages,
            description: description,
        }
        if (this.state.image) {
            value.image = this.state.image
        }
        this.setState({
            loading: true
        },
            () => data.EditBook(value)
                .then((result) => {
                    this.setState({ loading: false })
                    console.log(result)
                    window.location.reload();
                }).catch((err) => {
                    console.log(err)
                }))
    }
    renderForm() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        label="Tên"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("name")}
                        value={this.state.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Thể loại"
                        fullWidth
                        type="text"
                        value={this.state.categoryname}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Tác giả"
                        fullWidth
                        type="text"
                        value={this.state.authorname}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nhà xuất bản"
                        fullWidth
                        type="text"
                        value={this.state.publishername}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Giá"
                        fullWidth
                        type="number"
                        onChange={this.handleNewChange("price")}
                        value={this.state.price}
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="date"
                        label="Ngày xuất bản"
                        type="date"
                        defaultValue={new Date().toLocaleDateString("sv-SE")}
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={this.handleNewChange("publishday")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Số trang"
                        fullWidth
                        type="number"
                        onChange={this.handleNewChange("pages")}
                        value={this.state.pages}
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Chiều rộng"
                        fullWidth
                        type="number"
                        onChange={this.handleNewChange("width")}
                        value={this.state.width}
                        InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                                <InputAdornment position="start">cm</InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Chiều dài"
                        fullWidth
                        type="number"
                        onChange={this.handleNewChange("height")}
                        value={this.state.height}
                        InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                                <InputAdornment position="start">cm</InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Trọng lượng"
                        fullWidth
                        type="number"
                        onChange={this.handleNewChange("weight")}
                        value={this.state.weight}
                        InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                                <InputAdornment position="start">g</InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Loại bìa"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("booktype")}
                        value={this.state.booktype}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Ngôn ngữ"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("language")}
                        value={this.state.language}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        multiline
                        rowsMax="6"
                        label="Mô tả"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("description")}
                        value={this.state.description}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Dropzone accept="image/jpeg, image/png" multiple={false}
                        onDrop={(accept, reject) => {
                            util.getBase64Img(accept)
                                .then((result) => {
                                    this.setState({
                                        image: result,
                                        filename: accept[0].name
                                    })
                                }).catch((err) => {
                                    console.log(err)
                                });
                        }}
                    >
                      {this.state.filename}
             </Dropzone>
                </Grid>
                <Grid item xs={12} sm={6} style={{
                    display: 'flex',
                    alignContent: 'flex-end',
                    justifyContent: 'flex-end',
                    flexDirection: 'row'
                }}>
                    <Button color="primary"
                        onClick={this.ValidateCreateBook.bind(this)}
                        style={{
                            alignSelf: 'flex-end'
                        }}>Thêm sách</Button>
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
                    <CircularProgress /> :
                    this.renderForm()
                }
            </Paper>
        );
    }
}
