// 2023-01-23T02:30:00.302Z
function getTimeing(time) {
    const timeArr = time.split(":");
    let str = ""
    str += timeArr[0][timeArr[0].length - 2] + timeArr[0][timeArr[0].length - 1] + ":"
    str += timeArr[1]
    return str
}


console.log(getTimeing("2023-01-23T02:30:00.302Z"))