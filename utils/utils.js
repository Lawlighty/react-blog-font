import { message } from "antd";
import Router from "next/router";
// 将时间戳转换成日期格式

//  const router = useRouter();
export const timestampToTime = (timestamp) => {
  if (!timestamp) {
    return "-";
  }
  const str = `${timestamp}`;
  const date = new Date(str.length === 10 ? timestamp * 1000 : timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-`;
  const D = `${date.getDate()} `;
  // const h = date.getHours().leng<2?date.getHours() + ':';
  // const h =
  //     (date.getHours().toString().length < 2
  //         ? '0' + date.getHours() + ':'
  //         : date.getHours()) + ':';
  // const m =
  //     (date.getMinutes().toString().length < 2
  //         ? '0' + date.getMinutes() + ':'
  //         : date.getMinutes()) + ':';
  // const s =
  //     date.getSeconds().toString().length < 2
  //         ? '0' + date.getSeconds()
  //         : date.getSeconds();
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());
  const s = addZero(date.getSeconds());
  return `${Y + M + D + h}:${m}:${s}`;
};
function addZero(t) {
  if (t.toString().length < 2) {
    return `0${t}`;
  }
  return t;
}

// 世界时间转换成北京时间
export const utc2beijing = (utc_datetime) => {
  if (!utc_datetime) {
    return "";
  }
  const a = new Date(utc_datetime).getTime();
  const beijing_datetime = timestampToTime(new Date(a));
  return beijing_datetime;
};

export const getWeekDate = () => {
  var now = new Date();
  var day = now.getDay();
  var weeks = new Array(
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  );
  var week = weeks[day];
  return week;
};

export const getTagColor = (tag) => {
  if (!tag) {
    return;
  }
  let color = "red";
  if (tag.length <= 4) {
    color = "magenta";
  } else if (tag.length <= 6) {
    color = "green";
  } else if (tag.length <= 8) {
    color = "geekblue";
  }
  return color;
};

export const getColorByStrLength = (str) => {
  const color =
    str.length <= 4 ? "geekblue" : str.length <= 6 ? "green" : "volcano";
  return color;
};

// 字符串截取
export const setSubStr = (str, length = 50) => {
  if (!str) {
    return "";
  }
  if (str.length <= length) {
    return str;
  }
  return `${str.substring(0, length)}...`;
};
// 计数量展示
export const numFormat = (num, digits) => {
  //num 计数量
  //digits 小数位
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e4, symbol: "W" },
    { value: 1e6, symbol: "M" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

// 构造分类树
export const getBannerSubItems = (data = [], limit = 0) => {
  let subItems = [];
  const idMapping = data.reduce((acc, el, i) => {
    acc[el._id] = i;
    return acc;
  }, {});
  data.forEach((el) => {
    // 判断根节点
    if (!el.parentid || !data[idMapping[el.parentid]]) {
      // 有parentid 但是父级已经不存在
      subItems.push(el);
      return;
    }
    // 用映射表找到父元素
    const parentEl = data[idMapping[el.parentid]];
    // 把当前元素添加到父元素的`children`数组中
    if (parentEl.children) {
      if (parentEl.children.indexOf(el) < 0) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    } else {
      parentEl.children = [...(parentEl.children || []), el];
    }
  });
  let list = subItems;
  if (limit) {
    list = subItems.slice(0, limit);
  }
  return list;
};
export const getChidlren = (id, data) => {
  var hasFound = false, // 表示是否有找到id值
    result = null;
  var fn = function (data) {
    if (Array.isArray(data) && !hasFound) {
      // 判断是否是数组并且没有的情况下，
      data.forEach((item) => {
        if (item._id === id) {
          // 数据循环每个子项，并且判断子项下边是否有id值
          result = item; // 返回的结果等于每一项
          hasFound = true; // 并且找到id值
        } else if (item.children) {
          fn(item.children); // 递归调用下边的子项
        }
      });
    }
  };
  fn(data); // 调用一下
  return result;
};
// 重新登录
export const reLogin = () => {
  message.info("请重新登录!");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  Router.push(`/login?from=${Router.router.asPath}`);
};
