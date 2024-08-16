import mongoose from "mongoose";
import { CommentRepository, PostRepository } from "../repository/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.postRepository = new PostRepository();
  }
  async createCommentOnPost(postId, userId, text) {
    const onPost = await this.postRepository.get(postId);
    if(onPost){
      var modelType = "Post";
    }else{
      throw new Error("PostId does not exist.");
    }

    const comment = await this.commentRepository.create({
      content: text,
      userId: userId,
      onModel: modelType,
      commentTable: new mongoose.Types.ObjectId(postId),
      comments: [],
    });
    return comment;
  }
  async createCommentOnComment(postId, userId, commentId, text) {
    const commentid = new mongoose.Types.ObjectId(commentId.toString());
    const onComment = await this.commentRepository.get(commentid);
    if(onComment){
      var modelType = "Comment";
    }else{
      throw new Error("CommentId does not exist.");
    }

    const comment = await this.commentRepository.create({
      content: text,
      userId: userId,
      postId: new mongoose.Types.ObjectId(postId.toString()),
      onModel: modelType,
      commentTable: new mongoose.Types.ObjectId(commentId),
      comments: [],
    });
    onComment.comments.push(comment);
    await onComment.save();
    return comment;
  }
  async getPostComments(postId, sortBy, sortOrder) {
    const postid = new mongoose.Types.ObjectId(postId.toString());
    const query = {
      data : { postId: postid, onModel:"Post" },
      sortBy : { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
    }
    const comments = await this.commentRepository.getAll(query);
    const response = await Promise.all(
      comments.map(async (comment) => {
        const query = {
          data : { onModel: 'Comment', commentTable: comment._id },
          sortBy : { createdAt: -1 },
          limit : 2
        }
        const replies = await this.commentRepository.getAll(query);
        const totalReplies = await this.commentRepository.countDocuments(query.data);
        return {
          id: comment._id,
          text: comment.content,
          createdAt: comment.createdAt,
          postId,
          parentCommentId: null, // Since these are top-level comments
          totalReplies,
          replies: replies.map((reply) => ({
            id: reply._id,
            text: reply.content,
            createdAt: reply.createdAt,
          })),
        };
      })
    );
    return response;
  }
}

export default CommentService;
