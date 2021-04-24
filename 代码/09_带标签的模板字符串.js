// const name = "tom";
// const gender = true;

// function myTagFunc(...strings) {
//     const [tpl, ...value] = strings;
//     const sex = value[1] ? "man" : "woman";
//     return tpl[0] + value[0] + tpl[1] + sex;
// }

// const result = myTagFunc`hey, ${name} is a ${gender}`;
// console.log(result);


const a = function (strs, ...args) {
    console.log(strs)
    console.log(args)
}

const name = 'huruji'
const age = 12

const res = a`name: ${name}, age: ${age}`
