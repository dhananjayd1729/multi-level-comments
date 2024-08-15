import UserService from "../services/user-service.js";

const userService = new UserService();

export const signUp = async (req, res) => {
  try {
    const { email, password, name} = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
    return res.status(200).json({ 
      success: true, 
      data: existingUser, 
      message: 'Your email already exists with us.' });
    }

    const response = await userService.signup({email, password, name});
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully created a user.",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const token = await userService.signin(req.body);
    return res.status(200).json({
      data: token,
      success: true,
      message: "Sucessfully logged in",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      err: error,
    });
  }
};
