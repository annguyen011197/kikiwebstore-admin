module.exports.getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports.serverURL = 'https://kikibookstore.herokuapp.com'
module.exports.getBase64Img = (file) => new Promise((resolve, reject) => {
    console.log(file)
    const reader = new FileReader()
    reader.onload = () => {
        const base64 = reader.result;
        resolve(base64)
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = (error) => {
        reject(error)
    }

    reader.readAsDataURL(file[0]);
})
