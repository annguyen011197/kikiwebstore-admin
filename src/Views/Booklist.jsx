import React, { Component } from "react";
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  withStyles,
  TablePagination,
  Divider,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import $ from "jquery";
import utils from "../Others/Utils";
import data from '../Others/Data'
import ModalEditBook from '../Components/ModalEditBook'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listbook: [],
      offset: 1,
      limit: 10,
      count: 0,
      loading: false
    };
    this.EditModal = React.createRef()
  }
  componentWillMount() {
    $.ajax({
      type: "get",
      url: `${utils.serverURL}/api/bookcount`,
      xhrFields: {
        withCredentials: true
      }
    }).done(res => {
      this.setState({
        count: parseInt(res),
      })
    })
      .fail(err => {
        console.log(err);
      });
    this.handleData(this.state.offset, this.state.limit)
  }

  handleData(offset, limit) {
    $.ajax({
      type: "get",
      url: `${utils.serverURL}/api/books`,
      data: {
        offset: offset,
        limit: limit
      },
      xhrFields: {
        withCredentials: true
      }
    })
      .done(res => {
        this.setState({
          listbook: res,
          loading: false
        });
      })
      .fail(err => {
        console.log(err);
      });
  }
  renderTable() {
    return (
      this.state.listbook.map((n, i) => {
        return (
          <TableRow key={n._id}>
            <CustomTableCell component="th" scope="row">
              {n.name}
            </CustomTableCell>
            <CustomTableCell>{n.type.name}</CustomTableCell>
            <CustomTableCell>{n.author.name}</CustomTableCell>
            <CustomTableCell numeric>{n.price}</CustomTableCell>
            <CustomTableCell style={{
              display: 'flex'
            }}>
              <IconButton onClick={() => {
                this.EditModal.current.handleAction(n._id)
              }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => {
                this.setState({
                  loading: true
                }, () => data.DeleteBook(n._id).then((result) => {
                  this.handleData(this.state.offset, this.state.limit)
                }).catch((err) => {
                  console.log(err)
                }))
              }}>
                <DeleteIcon />
              </IconButton>

            </CustomTableCell>
          </TableRow>
        );
      })
    )
  }
  renderLoading() {
    return (
      <TableRow style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 10
      }}>
        <CircularProgress style={{ color: 'red' }} thickness={7} />
      </TableRow>
    )
  }
  render() {
    const { offset, limit, listbook, count, loading } = this.state
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Category</CustomTableCell>
              <CustomTableCell>Author</CustomTableCell>
              <CustomTableCell>Price</CustomTableCell>
              <CustomTableCell></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? this.renderLoading() : this.renderTable()}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={count}
                rowsPerPage={limit}
                page={offset - 1}
                onChangePage={(event, page) => {
                  this.setState({
                    offset: page + 1,
                    loading: true
                  })
                  this.handleData(page + 1, limit)
                }}
                onChangeRowsPerPage={(event) => {
                  console.log(event.target.value)
                  this.setState({
                    limit: event.target.value,
                    loading: true
                  })
                  this.handleData(offset, event.target.value)
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <ModalEditBook
          ref={this.EditModal}
        />
      </Paper>
    );
  }
}
