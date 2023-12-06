

function sequetialPromise(args, index) {
    var a =  [...args];
    a[index].then((resolve, reject) => {
        var data = resolve('true');
        return sequetialPromise(a, index + 1);
    }).catch(err=> {
        reject(err)
    })


}