import $ from 'jquery'
import util from './Utils'

const data = {
    GetAllCategory: new Promise((resolve, reject) => {
        $.get(`${util.serverURL}/api/category`)
            .done(resolve)
            .fail(reject)
    }),
    GetAllAuthor: new Promise((resolve, reject) => {
        $.get(`${util.serverURL}/api/author`)
            .done(resolve)
            .fail(reject)
    }),
    GetAllPublisher: new Promise((resolve, reject) => {
        $.get(`${util.serverURL}/api/publisher`)
            .done(resolve)
            .fail(reject)
    }),
    PostNewBook: (data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: `${util.serverURL}/api/book`,
                data: data,
                dataType: "json"
            }).done(res => {
                resolve(res)
            }).fail(err => {
                alert(err)
            })
        });
    },
    EditBook: (data) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: `${util.serverURL}/api/editbook`,
                data: data,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                }
            }).done(res => {
                resolve(res)
            }).fail(err => {
                alert(err)
            })
        });
    },
    DeleteBook: (id) => {
        return new Promise((resolve, reject) => {

            $.ajax({
                type: 'get',
                url: `${util.serverURL}/api/deletebook?id=${id}`,
                xhrFields: {
                    withCredentials: true
                }
            }).done(res => {
                resolve(res)
            }).fail(err => {
                reject(err)
            })
        })
    },
    DetailsBook: (id) => {
        return new Promise((resolve, reject) => {
            $.get(`${util.serverURL}/api/details?id=${id}`)
                .done(resolve)
                .fail(reject)
        })

    },
    PostEvent: (value) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: `${util.serverURL}/api/addEvent`,
                data: value,
                dataType: "json"
            })
                .done(resolve)
                .fail(reject)
        })
    },
    GetCartList: (offset, limit, type) => {
        let typename = type ? "Delivered" : "accept"
        return new Promise((resolve, reject) => {
            $.get(`${util.serverURL}/api/cartlist?offset=${offset}&limit=${limit}&type=${typename}`)
                .done(resolve)
                .fail(reject)
        })
    },
    AcceptCart: (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'get',
                url: `${util.serverURL}/api/cartaccept?id=${id}`,
                xhrFields: {
                    withCredentials: true
                }
            }).done(res => {
                resolve(res)
            }).fail(err => {
                reject(err)
            })
        })

    },
    CreateAccount: (val) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: `${util.serverURL}/users/signup`,
                data: val,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(resolve)
                .fail(reject)
        })
    },
    Logout:(val)=>{
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'get',
                url: `${util.serverURL}/users/logout`,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(resolve)
                .fail(reject)
        })
    }
}

export default data