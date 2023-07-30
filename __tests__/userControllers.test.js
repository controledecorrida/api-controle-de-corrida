const UserControllers = require("../src/controllers/UserControllers");
const User = require("../src/models/User");
const loginService = require("../src/services/session/loginService");

jest.mock("../src/models/User");
jest.mock("../src/services/session/loginService");

describe("UserControllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("signUp should create a new user", async () => {
    // Mock data for the request body
    const req = {
      body: {
        name: "John Doe",
        birthday: "1990-01-01",
        email: "john@example.com",
        password: "123456",
      },
    };

    // Mock User.create to resolve with the created user
    User.create.mockResolvedValue({ id: 1 });

    // Mock the response object
    const res = {
      json: jest.fn(),
    };

    // Call the signUp controller function
    await UserControllers.signUp(req, res);

    // Expect that User.create was called with the correct data
    expect(User.create).toHaveBeenCalledWith({
      name: "John Doe",
      birthday: "1990-01-01",
      email: "john@example.com",
      password: expect.any(String),
    });

    // Expect that the response.json was called with the correct data
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  test("login should return a token", async () => {
    // Mock data for the request body
    const req = {
      body: {
        email: "john@example.com",
        password: "123456",
      },
    };

    // Mock loginService.login to resolve with a token
    loginService.login.mockResolvedValue("mocked-token");

    // Mock the response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the login controller function
    await UserControllers.login(req, res);

    // Expect that loginService.login was called with the correct data
    expect(loginService.login).toHaveBeenCalledWith({
      email: "john@example.com",
      password: "123456",
    });

    // Expect that the response.status and response.json were called with the correct data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "mocked-token" });
  });
});
