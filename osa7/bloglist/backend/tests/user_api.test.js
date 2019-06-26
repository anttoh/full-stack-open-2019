const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

test("user isn't added when pasword is shorter than minimum length", async () => {
  const newUser = {
    username: "test",
    name: "John Doe",
    password: "42"
  };

  const res = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const userAtEnd = await helper.usersInDb();
  expect(userAtEnd.length).toBe(helper.initialUsers.length);

  expect(res.body.error).toBe("pasword must be at least 3 charecters");
});

test("user isn't added when username is taken", async () => {
  const newUser = {
    username: "adal",
    name: "John Doe",
    password: "validPassword"
  };

  const res = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const userAtEnd = await helper.usersInDb();
  expect(userAtEnd.length).toBe(helper.initialUsers.length);

  expect(res.body.error).toBe("username taken");
});

afterAll(() => {
  mongoose.connection.close();
});
