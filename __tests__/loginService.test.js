const loginService = require("../src/services/session/loginService");
const User = require("../src/models/User");
const crypto = require("../src/services/crypto");

jest.mock("../src/models/User");
jest.mock("../src/services/crypto");

describe("loginService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("login should return a token if the user exists and password is correct", async () => {
    // Mock data for the login function
    const loginData = {
      email: "john@example.com",
      password: "123456",
    };

    // Mock User.findOne to resolve with a mock user
    User.findOne.mockResolvedValue({
      id: 1,
      email: "john@example.com",
      password: "hashed-password", // hashed password obtained from the crypto mock
    });

    // Mock crypto.validatePassword to return true (password match)
    crypto.validatePassword.mockReturnValue(true);

    // Call the login service function
    const token = await loginService.login(loginData);

    // Expect that User.findOne was called with the correct data
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });

    // Expect that crypto.validatePassword was called with the correct data
    expect(crypto.validatePassword).toHaveBeenCalledWith("123456", "hashed-password");

    // Expect that the token was returned
    expect(token).toBe("mocked-token"); // Replace "mocked-token" with the expected token value
  });

  test("login should throw an error if the user does not exist", async () => {
    // Mock data for the login function
    const loginData = {
      email: "john@example.com",
      password: "123456",
    };

    // Mock User.findOne to resolve with null (user not found)
    User.findOne.mockResolvedValue(null);

    // Call the login service function and expect it to throw an error
    await expect(loginService.login(loginData)).rejects.toThrow("Wrong e-mail or password.");
  });

  test("login should throw an error if the password is incorrect", async () => {
    // Mock data for the login function
    const loginData = {
      email: "john@example.com",
      password: "123456",
    };

    // Mock User.findOne to resolve with a mock user
    User.findOne.mockResolvedValue({
      id: 1,
      email: "john@example.com",
      password: "hashed-password", // hashed password obtained from the crypto mock
    });

    // Mock crypto.validatePassword to return false (password doesn't match)
    crypto.validatePassword.mockReturnValue(false);

    // Call the login service function and expect it to throw an error
    await expect(loginService.login(loginData)).rejects.toThrow("Wrong e-mail or password.");
  });
});
