import UserModel from "../models/User.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select(
      "-password -__v -createdAt -updatedAt -token -googleId"
    );

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found in Database",
      });
    }


    return res.status(200).json({
      success: true,
      message: "User get successfully",
      users,
    });
  } catch (error) {
    console.log(`Server error`);
  }
};

export { getAllUsers };
