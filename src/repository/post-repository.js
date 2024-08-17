import CrudRepository from "./crud-repository.js";
import Post from "../models/post.js";

class PostRepository extends CrudRepository {
  constructor() {
    super(Post);
  }
}

export default PostRepository;
