// //function randomized idexed letter
// function generateRandomCode(maxIndex,charSet,numberOfIterations){
//     var code = ''
//     var index = 0
//     while(index < numberOfIterations){
//         code = `${code}${charSet[Math.floor(Math.random() * maxIndex)]}`
//         index += 1
//     }
//     return code
// }
// //code generator
// module.exports = ()=>{
//     const charSetRange = process.env.INVITATION_CODE_SEQUENCE
//     const maxIndex = charSetRange.length
//     const dataOne = new Date().getFullYear().toString()

//     return `${process.env.PREFIX_INVITATION_CODE}${dataOne.substring()}_${generateRandomCode(maxIndex,charSetRange,2)}${new Date().getMonth()+1}${generateRandomCode(maxIndex,charSetRange,2)}${new Date().getMilliseconds()}${generateRandomCode(maxIndex,charSetRange,2)}`
// }
//function randomized idexed letter
function generateRandomCode(maxIndex,charSet,numberOfi1){
    var code = ''
    var index = 0
    while(index < numberOfi1){
        code = `${code}${charSet[Math.floor(Math.random() * maxIndex)]}`
        index += 1
    }
    return code
}
//code generator
module.exports = ()=>{
    const charSetRange = process.env.INVITATION_CODE_SEQUENCE
    const maxIndex = charSetRange.length
    const dataOne = new Date().getFullYear().toString()
    const i1 = 1
    const i2 = 2

    return `${process.env.PREFIX_INVITATION_CODE}${dataOne.substring(2)}${charSetRange[parseInt(dataOne.substring(0,2))]}${generateRandomCode(maxIndex,charSetRange,i1)}${charSetRange[new Date().getMonth()]}${charSetRange[new Date().getDate()]}${generateRandomCode(maxIndex,charSetRange,i1)}`
}