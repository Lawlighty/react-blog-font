import { MethodType, request, request2 } from "@/config/request.js";

// 获取轮播图
export const _get_categories = async (query) => {
  return await request(`/categorys?query=${query}`, MethodType.GET);
};
