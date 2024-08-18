import { PostRepository } from "../repository/index.js";


class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(text, userId) {
    const createObj = {content: text, userId: userId}
    const response = await this.postRepository.create(createObj);
    return response;
  }
}

export default PostService;
