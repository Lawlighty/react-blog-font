import { MethodType, request, request2 } from "@/config/request.js";

// 获取 课时
export const _get_episode_list = async (query) => {
  return await request(`/episodes?query=${query}`, MethodType.GET);
};
export const _get_episode_detail = async (id) => {
  return await request(`/episodes/${id}`, MethodType.GET);
};


