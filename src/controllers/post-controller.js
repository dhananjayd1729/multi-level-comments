import PostService from "../services/post-service.js";

const postService = new PostService();

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    if(!text || !userId){
        return res.status(400).json({
            success: false,
            data: {},
            err: {},
            message: "Text and userId are required.",
        });
    }
    const response = await postService.createPost(text, userId);
    return res.status(200).json({
      success: true,
      data: response,
      message: "Successfully created a post.",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      err: error,
      message: "Something went wrong",
      data: {},
    });
  }
};
