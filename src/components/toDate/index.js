const toDate = (item) => {
    let date = new Date(item).toLocaleDateString();

    let a = date.split('/');
    let test = a[2] + (a[0] < 9 ? "0" + a[0] : a[0]) + (a[1] < 9 ? "0" + a[1] : a[1]);
    console.log("test",test)
    return test
}


export default toDate