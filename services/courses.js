import { MethodType, request, request2 } from "@/config/request.js";

// 获取 课程
export const _get_courses = async (query) => {
  return await request(`/courses?query=${query}`, MethodType.GET);
};