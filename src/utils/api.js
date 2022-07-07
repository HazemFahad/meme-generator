import axios from "axios";

const memeApi = axios.create({
  baseURL: "https://api.imgflip.com/get_memes",
});

export const getMemes = () => {
  return memeApi.get().then(({ data }) => {
    return data.data.memes;
  });
};
