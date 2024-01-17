const mongoose = require("mongoose");
const request = require("supertest");
const redis = require('../DBconnect/redis.js');

const {app,closeServer} = require("../app");


//const DB = require("../DBconnect/db.js");
require("dotenv").config();
beforeAll(async()=>{
  await mongoose.connect(process.env.MONGODATABASE_URI);
});




/*describe("GET /api/getall", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/getall").set({"authorization":"TARANG"});
    expect(res.statusCode).toBe(200);
console.log(res);
  });

});*/
describe("GET /api/getall", () => {
  test("should return all products", async () => {
    return await request(app).get("/api/getall").expect(200);
  });

});





describe("GET /api/getdetail/:dishName", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/getdetail/pasta").set({"authorization":"TARANG"});
    expect(res.statusCode).toBe(200);
console.log(res);
  });

//console.log(res);

});

/*describe("POST /api/dishadd", () => {
  it("should return all products", async () => {
    const requestBody={
      "dishName": "White pasta",
      "availableQuantity": 28,
      "pricePerItem": 250,
      "dishType": "starter",
      "servesPeople": 1
  }
    const res = await request(app).get("/api/dishadd").set({"authorization":"TARANG"}).send(requestBody);
    expect(res.statusCode).toBe(200);
console.log(res);
  });

//console.log(res);

});
*/





const teardown = async (redis) => {
  await new Promise((resolve) => {
    redis.disconnect();
    redis.on('end', resolve);
  });
};

afterAll( async() => {
  mongoose.connection.close();
  await closeServer();
  await teardown(redis);
});
