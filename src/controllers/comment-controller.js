import CommentService from "../services/comment-service.js";
const commentService = new CommentService();

const createPostComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user._id;
    if (!text || !postId || !userId) {
      return res.status(400).json({ message: 'text, postId and userId are required.' });
    }
    const response = await commentService.createCommentOnPost(postId,userId,text);
    return res.status(201).json({
      data: response,
      message: "Successfully created a comment",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Something went wrong",
      success: false,
      err: error,
    });
  }
};

const createNestedComment = async (req, res) => {
  try {
    const { text, postId, commentId } = req.body;
    const userId = req.user._id;
    if (!text || !postId || !commentId || !userId) {
      return res.status(400).json({ 
        success: false,
        data: {},
        message: 'text, commentId, postId and userId are required.' 
      });
    }
    const response = await commentService.createCommentOnComment(postId, userId, commentId, text);
    return res.status(201).json({
      success: true,
      message: "Successfully created a comment",
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
      err: error,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { postId, sortBy, sortOrder } = req.body;
    if (!postId) {
      return res.status(400).json({ 
        success: false,
        data: {},
        message: 'postId is required.' 
      });
    }
    const response = await commentService.getPostComments(postId, sortBy, sortOrder);
    return res.status(201).json({
      success: true,
      message: "Successfully fetched comments for a post.",
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
      err: error,
    });
  }
}; 

export {
  createPostComment,
  createNestedComment,
  getComments
}
