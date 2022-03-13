const request = require('supertest')
const app = require('../app.js')
const { encrypt } = require('../helper/bycrypt.js')
const {sequelize} = require ('../models')
const {queryInterface} = sequelize
let jwt = require('jsonwebtoken')

let access_token
let idFriendList

beforeAll((done)=>{
    console.log('kepanggil gk=============');
    queryInterface.bulkDelete('Users', {}, null)
    .then(()=>{
        return queryInterface.bulkInsert("Users", [{
            id: 1,
            username: "fifit",
            email: "fifit.mocap@gmail.com",
            password: encrypt('12345'),
            EctyId:"45829348",
            planStatus:"Basic",
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            id: 2,
            username: "bayu",
            email: "bayuindr2207@gmail.com",
            password: encrypt('12345'),
            EctyId:"72911665",
            planStatus:"Basic",
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    })
    .then(()=>{
        return queryInterface.bulkDelete("FriendLists", {}, null)
    })
    .then(() =>{
        access_token = jwt.sign({ id: 1, email: 'fifit.mocap@gmail.com' }, 'Rahasia')
        done()
    })
    .catch(err => done(err))
})

describe('POST /friendList/:ectyId', function () {
    it('Add Friend Success', function (done) {
        // let input = {
        //     username: "fifit",
        //     email: "fifit.mocap@gmail.com",
        //     password: "12345",
        // }
        request(app)
            .post("/friendList/72911665")
            //.send(input)
            .set('Accept', 'application/json')
            .set({ access_token: access_token })
            .then(response => {
                idFriendList = response.body.id
                console.log(response.body,'add Friend++++++++');
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("FriendId", "72911665")
                done()
            })
            .catch(err => done(err))
    })

})
describe('GET /friendList', function () {
    it("get all data Friend List User", function (done) {
        request(app)
            .get("/friendList")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                const { status, body } = res;
                console.log(res.body, 'user===========');
                expect(status).toBe(200); 
                //expect(body).toHaveProperty("FriendId", 72911665)
                //expect(body.Bookmark.length).toBe(2)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})
describe('DELETE /friendList/:id', function () {
    it("Delete Friend List", function (done) {
        request(app)
            .delete(`/friendList/${idFriendList}`)
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", `Friend with id ${idFriendList} delete success`)
                //expect body. name ===
                //expect(body.transportation.name === "Fortuner").toBe(true)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
    it("Delete User id not found", function (done) {
        request(app)
            .delete("/friendList/2")
            .set("Accept", "application/json")
            .set({ access_token: access_token })
            .then((res) => {
                console.log(res.body, 'user delete +======');
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Friend with id 2 not found")
                //expect body. name ===
                //expect(body.transportation.name === "Fortuner").toBe(true)
                done();
            })
            .catch((err) => {
                //console.log(err);
                done(err)
            }
            );
    });
})