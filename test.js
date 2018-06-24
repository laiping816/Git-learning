
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

async function doIt() {
    console.log("start");
    await takeLongTime(1000)
    						.then((value) => {
    							console.log(value)
    							return takeLongTime(1000)
    						 })
    						.then((value) => console.log(value))
    console.log("end");
}

doIt();

console.log("随机");
console.log("mybranch1 操作")
console.log("mybranch1 操作2")
console.log("mybranch1 远程操作")
