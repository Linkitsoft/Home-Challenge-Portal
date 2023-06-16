const fromDate = (item) => {
    let date = new Date(item).toLocaleDateString();

    let a = date.split('/');
    let test = a[2] + (a[0] < 9 ? "0" + a[0] : a[0]) + (a[1] < 9 ? "0" + a[1] : a[1]);
    return test
}


export default fromDate