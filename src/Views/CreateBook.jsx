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

function renderInput(inputProps) {
  const { classes, ref, label, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{
        inputRef: ref,
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

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
      loading: true,
      filename:'Drop file name'
    };
  }
  componentWillMount() {

    this.fetchData();

  }
  fetchData() {
    this.setState({
      loading: true
    }, () => {
      Promise.all([data.GetAllCategory, data.GetAllAuthor, data.GetAllPublisher])
        .then(([category, author, publisher]) => {
          this.setState({
            categorylist: category,
            authorlist: author,
            publisherlist: publisher,
            loading: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    })

  }
  getSuggestions(suggestions, value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }
  handleSuggestionsFetchRequested = prop => ({ value }) => {
    this.setState({
      [prop]: this.getSuggestions(this.state[`${prop}list`], value)
    });
  };

  handleSuggestionsClearRequested = prop => () => {
    this.setState({
      [prop]: []
    });
  };

  handleChange = prop => (event, { newValue }) => {
    this.setState({
      [prop]: newValue
    });
  };
  handleNewChange = prop => event => {
    console.log(event.target.value);
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
    if (categoryname.trim() === '') {
      alert('Thể loại không được để trống')
      return
    }
    if (authorname.trim() === '') {
      alert('Tác giả không được để trống')
      return
    }
    if (publishername.trim() === '') {
      alert('Tác giả không được để trống')
      return
    }
    if (!price || price==0){
      alert('Giá phải lớn hơn 0')
      return
  }
    let value = {
      name: name.trim(),
      category: categoryname.trim(),
      price: parseInt(price),
      size: {
        width: parseInt(width),
        height: parseInt(height),
        weight: parseInt(weight)
      },
      publisher: publishername.trim(),
      author: authorname.trim(),
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
      () => data.PostNewBook(value)
        .then((result) => {
          this.setState({ loading: false })
          console.log(result)
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
          <Autosuggest
            renderInputComponent={renderInput}
            suggestions={this.state.category}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested(
              "category"
            )}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested(
              "category"
            )}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              label: "Thể loại",
              value: this.state.categoryname,
              onChange: this.handleChange("categoryname")
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autosuggest
            renderInputComponent={renderInput}
            suggestions={this.state.author}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested(
              "author"
            )}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested(
              "author"
            )}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              label: "Tác giả",
              value: this.state.authorname,
              onChange: this.handleChange("authorname")
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autosuggest
            renderInputComponent={renderInput}
            suggestions={this.state.publisher}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested(
              "publisher"
            )}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested(
              "publisher"
            )}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              label: "Nhà xuất bản",
              value: this.state.publishername,
              onChange: this.handleChange("publishername")
            }}
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
