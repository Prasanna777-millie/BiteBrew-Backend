const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

const UserModel = dbMock.define("User", {
  id: {
    type: SequelizeMock.INTEGER,
    primaryKey: true,
  },
  fullname: SequelizeMock.STRING,
  username: SequelizeMock.STRING,
  email: SequelizeMock.STRING,
  password: SequelizeMock.STRING,
  role: SequelizeMock.STRING,
});

describe("User Model", () => {

  it("should create a User instance", async () => {
    const user = await UserModel.create({
      fullname: "Prasanna Shrestha",
      username: "shital360",
      email: "shital@gmail.com",
      password: "123456",
      role: "user",
    });

    expect(user.fullname).toBe("Shital Dangol");
    expect(user.username).toBe("shital360");
    expect(user.email).toBe("shital@gmail.com");
    expect(user.password).toBe("123456");
    expect(user.role).toBe("user");
  });

});