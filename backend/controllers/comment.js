
const mongoose = require("mongoose")
const User = require("../models/user")
 const Comment = require("../models/commentsSchema")

exports.postComments = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const userId = req.user.id; // assuming auth middleware is applied

    console.log("This is the content ", content);
    console.log("This is the blogId", blogId);
    console.log("This is the userId", userId);

    if (!content || !userId || !blogId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }

    // ✅ Get user info from DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    const username = user.username;

    // ✅ Create comment
    const comment = await Comment.create({
      blogId,
      userId,
      username,
      content
    });

    // ✅ Update user's comment list
    // await User.findByIdAndUpdate(
    //   userId,
    //   { $push: { Comment: comment._id } }
    // );

    return res.status(200).json({
      message: "Comment added successfully",
      comment,
      success: true
    });

  } catch (error) {
    console.log("Error in the Comments Section ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false
    });
  }
};


exports.getComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(400).json({
                message: "BlogId is required",
                success: false
            });
        }

        const getAllComments = await Comment.find({ blogId });

        return res.status(200).json({
            message: "All comments fetched",
            success: true,
            comments: getAllComments
        });

    } catch (error) {
        return res.status(500).json({
            message: "Issue in the Get Comments Section",
            error: error.message,
            success: false
        });
    }
}

