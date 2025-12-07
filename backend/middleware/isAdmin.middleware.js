
export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Access denied",
      });
    }

    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
