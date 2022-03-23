const { expect } = require('@jest/globals')
require('dotenv').config()
const loginAdministrator = require('../controller/authCtrl')
jest.setTimeout(5000);
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
const res = {};
// replace the following () => res
// with your function stub/mock of choice
// making sure they still return `res`
res.status = () => {console.log('status');return res};
res.json = (text) => {console.log('json', text); return res};
var req = {
    body: {
        email:'jgcox4@gmail.com',
        password:'12312345',
    }
}
const next = function(){
    console.log('nextCalled')
}
test('adds 1 + 2 to equal 3', done => {
    res.json({text:'test'})
    loginAdministrator.loginAdministrator(req,res,next)
    expect(res).toBeInstanceOf(Object)
})
