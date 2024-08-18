import express from "express";

import { signUp, login } from "../../controllers/auth-controller.js";
import { 
    createPostComment, 
    createNestedComment, 
    getPostComments, 
    getComments
} from "../../controllers/comment-controller.js"
import { createPost } from "../../controllers/post-controller.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { rateLimiter } from "../../middlewares/rateLimiter.js"

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/posts/:postId/comments", 
    authenticate, 
    rateLimiter, 
    createPostComment
);
router.post("/posts/:postId/comments/:commentId/reply", 
    authenticate, 
    rateLimiter, 
    createNestedComment
);
router.get("/posts/:postId/comments", authenticate, getPostComments);
router.get("/posts/:postId/comments/:commentId", authenticate, getComments);
router.post("/posts", authenticate, createPost);

export default router;
