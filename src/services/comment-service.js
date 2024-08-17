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
      commentable: new mongoose.Types.ObjectId(postId.toString()),
      postId: new mongoose.Types.ObjectId(postId.toString()),
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
      commentable: commentid,
      comments: [],
    });
    onComment.comments.push(comment);
    await onComment.save();
    return comment;
  }
  
  async getPostComments(postId, sortBy, sortOrder) {
    if(sortOrder == "asc"){
      sortOrder = 1;
    }else if(sortOrder == "desc"){
      sortOrder = -1;
    }else{
      sortOrder = -1;
    }
    sortBy ? sortBy : createdAt;
    const agg = [
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId.toString()),
          onModel: "Post",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "allReplies",
        },
      },
      {
        $addFields: {
          sortedReplies: {
            $sortArray: {
              input: "$allReplies",
              sortBy: { createdAt: -1 }
            }
          },
        },
      },
      {
        $addFields: {
          totalReplies: { $size: "$allReplies" },
          replies: {
            $slice: [
              {
                $map: {
                  input: "$sortedReplies",
                  as: "reply",
                  in: {
                    id: "$$reply._id",
                    text: "$$reply.content",
                    createdAt: "$$reply.createdAt",
                  },
                },
              },
              0,
              2,
            ],
          },
        },
      },
      { $sort: { [sortBy]: sortOrder }},
      {
        $project: {
          _id: 1,
          text: "$content",
          createdAt: 1,
          postId: 1,
          parentCommentId: null,
          modelType: 1,
          totalReplies: 1,
          replies: 1,
        },
      },
    ];
    const response = await this.commentRepository.aggregate(agg);
    return response;
  }
  async getComments(postId, commentId, page, pageSize) {
    const skip = (page - 1) * pageSize;
    const agg = [
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId.toString()),
          onModel: "Post",
        },
      },
      {
        $addFields: {
          isExpanded: { $eq: ["$_id", new mongoose.Types.ObjectId(commentId.toString())] }
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "allReplies",
        },
      },
      {
        $addFields: {
          sortedReplies: {
            $sortArray: {
              input: "$allReplies",
              sortBy: { createdAt: -1 }
            }
          },
        },
      },
      {
        $addFields: {
          totalReplies: { $size: "$allReplies" },
          replies: {
            $cond: {
              if: { $eq: ["$_id", new mongoose.Types.ObjectId(commentId.toString())] },
              then: {
                $map: {
                  input: "$sortedReplies",
                  as: "reply",
                  in: {
                    id: "$$reply._id",
                    text: "$$reply.content",
                    createdAt: "$$reply.createdAt",
                  },
                },
              },
              else: {
                $slice: [
                  {
                    $map: {
                      input: { $slice: ["$sortedReplies", 2] },
                      as: "reply",
                      in: {
                        id: "$$reply._id",
                        text: "$$reply.content",
                        createdAt: "$$reply.createdAt",
                      },
                    },
                  },
                  0,
                  2,
                ],
                
              },
            },
          },
        },
      },
      { $skip: skip },
      { $limit: pageSize },
      {
        $project: {
          _id: 1,
          text: "$content",
          createdAt: 1,
          postId: 1,
          parentCommentId: null,
          modelType: 1,
          totalReplies: 1,
          replies: 1,
          isExpanded: 1
        },
      },
      {
        $sort: { isExpanded: -1 },
      },
    ];
    const response = await this.commentRepository.aggregate(agg);
    return response;
  }
}

export default CommentService;
