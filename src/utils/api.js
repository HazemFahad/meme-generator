import axios from "axios";

const memeApi = axios.create({
  baseURL: "https://api.imgflip.com/get_memes",
});

export const getMemes = () => {
  return memeApi.get().then(({ data }) => {
    const allMemes = data.data.memes;

    const relevantMemes = allMemes.filter((meme) => {
      return meme.box_count <= 3;
    });

    return relevantMemes;
  });
};
