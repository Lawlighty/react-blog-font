import { MethodType, request, request2 } from "@/config/request.js";

// 获取轮播图
export const _get_banners = async (query) => {
  return await request(`/banners?query=${query}`, MethodType.GET);
};
