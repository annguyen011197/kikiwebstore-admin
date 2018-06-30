import React, { Component } from 'react'
import { 
    Paper,
    Table,
    TableCell,
    TableFooter,
    TableHead,
    TableBody,
    TableRow,
    withStyles,
    TablePagination,
    Divider,
    CircularProgress,
    IconButton,
    Switch,
    Typography
 } from '@material-ui/core';
import data from '../Others/Data'
import ModalOrder from '../Components/ModalOrder'
import { CheckCircle, Search } from '@material-ui/icons';
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

export default class Order extends Component {
    constructor(props){
        super(props)
        this.state={
            listorder: [],
            loading: true,
            offset:1,
            limit:5,
            count:0,
            selected:null,
            type : false
        }
        this.ModalOrder = React.createRef()
    }
    componentWillMount(){
        this.handleData(this.state.offset, this.state.limit)
    }
    renderTable() {
        return (
          this.state.listorder.map((n, i) => {
            return (
              <TableRow key={n._id}>
                <CustomTableCell component="th" scope="row" onClick={()=>{console.log('Clock')}}>
                  {n.user.id.local.accountInfo.firstName+' '+n.user.id.local.accountInfo.secondName}
                </CustomTableCell>
                <CustomTableCell >{n.size}</CustomTableCell>
                <CustomTableCell >{n.total}</CustomTableCell>
                <CustomTableCell >
                  <IconButton disabled={this.state.type} onClick={() => {
                   this.setState({
                       loading:true
                   },()=>data.AcceptCart(n._id).then((result) => {
                    this.handleData(this.state.offset,this.state.limit)
                   }).catch((err) => {
                    this.handleData(this.state.offset,this.state.limit)
                   }))
                  }}>
                    <CheckCircle />
                  </IconButton>    
                  <IconButton onClick={() => {
                   this.setState({
                       selected: n
                   },()=>this.ModalOrder.current.handleAction())
                }}>
                  <Search />
                </IconButton>  
                </CustomTableCell>
              </TableRow>
            );
          })
        )
      }

      handleData(offset, limit) {
       data.GetCartList(offset,limit,this.state.type)
       .then((result) => {
        this.setState({
            listorder: result,
            loading: false
          });
       }).catch((err) => {
        console.log(err);
       });
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
    console.log(this.state)
    const { offset, limit, listorder, count, loading } = this.state
    return (
        <Paper>
          <div style={{
            display:'flex',
            alignItems:'center',
            alignContent:'center'
          }}>
          <Switch
              checked={this.state.type}
              onChange={(event)=>{
                this.setState({
                  type: !this.state.type,
                  loading:true
                },this.handleData(offset,limit))
              }}
            />
            <Typography variant="subheading">Delivered</Typography>
          </div>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>User</CustomTableCell>
              <CustomTableCell>Size</CustomTableCell>
              <CustomTableCell>Total</CustomTableCell>
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
                count={this.state.limit*this.state.offset+10}
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
        <ModalOrder order={this.state.selected} ref={this.ModalOrder}/>
        </Paper>
    )
  }
}
