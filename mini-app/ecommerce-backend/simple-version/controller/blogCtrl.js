const Blog = require("../model/blogModel");

const asyncHandler = require("express-async-handler");

const fs = require("fs");

const { validateMongDbbId } = require("../utils/validateMongodbId");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const newBlog = await Blog.create({
      title,
      description,
      category,
    });
    res.json(newBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
      },
      {
        new: true,
      }
    );
    res.json(updateBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const getOneBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const foundBlog = await Blog.findById(id)
      .populate("likes")
      .populate("disLikes");

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: {
          numViews: 1,
        },
      },
      {
        new: true,
      }
    );
    res.json(updateBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return res.json(deletedBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { id } = req.body;
  validateMongDbbId(id);
  try {
    const foundBlog = await Blog.findById(id);

    const userId = req.user.id;

    const alreadyLiked = foundBlog.likes.find((id) => userId === id.toString());
    const alreadyDisLiked = foundBlog.disLikes.find(
      (id) => userId === id.toString()
    );

    if (alreadyDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: {
            disLikes: userId,
          },
          $push: {
            likes: userId,
          },
        },
        {
          new: true,
        }
      );
      res.json(blog);
    }

    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: {
            likes: userId,
          },
        },
        {
          new: true,
        }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $push: {
            likes: userId,
          },
        },
        {
          new: true,
        }
      );
      res.json(blog);
    }
  } catch (err) {
    throw new Error(err);
  }
});

const disLikeBlog = asyncHandler(async (req, res) => {
  const { id } = req.body;
  validateMongDbbId(id);
  try {
    const foundBlog = await Blog.findById(id);

    const userId = req.user.id;

    const alreadyLiked = foundBlog.likes.find((id) => userId === id.toString());
    const alreadyDisLiked = foundBlog.disLikes.find(
      (id) => userId === id.toString()
    );

    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $push: {
            disLikes: userId,
          },
          $pull: {
            likes: userId,
          },
        },
        {
          new: true,
        }
      );
      res.json(blog);
    }
    if (alreadyDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: {
            disLikes: userId,
          },
        },
        {
          new: true,
        }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          $push: {
            disLikes: userId,
          },
        },
        {
          new: true,
        }
      );
      res.json(blog);
    }
  } catch (err) {
    throw new Error(err);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongDbbId(id);

    const uploader = (path) => cloudinaryUploadImage(path);

    const urls = [];
    const files = req.files;

    for (const file in files) {
      const newPath = uploader(file.path);
      urls.push(newPath);
      fs.unlinkSync(file.path);
    }

    const foundBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls,
      },
      {
        new: true,
      }
    );

    res.json(foundBlog);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getOneBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
};
