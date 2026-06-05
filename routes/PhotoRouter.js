const express = require("express");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

/**
 * GET /photosOfUser/:id
 * Trả về tất cả ảnh của user có _id tương ứng, kèm theo comments đầy đủ.
 * Mỗi ảnh có: _id, user_id, comments, file_name, date_time
 * Mỗi comment có: comment, date_time, _id, user { _id, first_name, last_name }
 *
 * Quan trọng: Cần tạo plain JS object thay vì dùng trực tiếp Mongoose model
 * vì Mongoose sẽ bỏ qua các trường không nằm trong schema khi modify trực tiếp.
 */
router.get("/photosOfUser/:id", async (request, response) => {
  const { id } = request.params;

  // Kiểm tra id có phải là ObjectId hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid user id: '${id}' is not a valid ObjectId.`,
    });
  }

  try {
    // Kiểm tra user có tồn tại không
    const userExists = await User.findById(id, "_id");
    if (!userExists) {
      return response.status(400).json({
        error: `User with id '${id}' not found.`,
      });
    }

    // Lấy tất cả ảnh của user
    const photos = await Photo.find({ user_id: id });

    // Xử lý từng ảnh: populate user info cho mỗi comment
    // Dùng Promise.all để xử lý bất đồng bộ đồng thời (concurrently) cho từng ảnh
    const photosResult = await Promise.all(
      photos.map(async (photo) => {
        // Xử lý từng comment: fetch user info cho mỗi comment đồng thời
        const commentsResult = await Promise.all(
          photo.comments.map(async (comment) => {
            // Lấy thông tin tối thiểu của user đã bình luận
            const commentUser = await User.findById(
              comment.user_id,
              "_id first_name last_name"
            );

            // Tạo plain object cho comment (tránh Mongoose schema filtering)
            return {
              _id: comment._id,
              comment: comment.comment,
              date_time: comment.date_time,
              user: commentUser
                ? {
                    _id: commentUser._id,
                    first_name: commentUser.first_name,
                    last_name: commentUser.last_name,
                  }
                : null,
            };
          })
        );

        // Tạo plain object cho ảnh (tránh Mongoose schema filtering)
        return {
          _id: photo._id,
          user_id: photo.user_id,
          file_name: photo.file_name,
          date_time: photo.date_time,
          comments: commentsResult,
        };
      })
    );

    response.status(200).json(photosResult);
  } catch (error) {
    console.error("Error fetching photos of user:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

// Removed POST endpoints for comments and photos upload (Not required for Lab 2TH2)

module.exports = router;
