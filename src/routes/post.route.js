import { Router } from "express";
import { createPost, getAllPosts , deletePost, updatePost, deletePostById } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/get-all-posts").get(getAllPosts);
router.route("/delete-post").delete(deletePost);
router.route("/delete-post/:id").delete(deletePostById);
router.route("/update-post/:id").patch(updatePost);

export default router;