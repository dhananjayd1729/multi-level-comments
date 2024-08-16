import express from "express";

import { signUp, login } from "../../controllers/auth-controller.js";
import { createPostComment, createNestedComment, getComments } from "../../controllers/comment-controller.js"
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
router.get("/posts/:postId/comments", authenticate, getComments);

export default router;
