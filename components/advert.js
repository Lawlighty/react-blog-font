// 广告组件
import '../styles/components/advert.css'
import { useEffect, useState } from "react";
import React from "react";
import { _get_banners } from "@/services/banners";

export default function Advert  ()  {
  // 默认
  // const [advertList, setAdvertList] = useState([
  //   {
  //     title: "NextJs",
  //     src: "https://www.nextjs.cn/static/images/learn.png",
  //     href: "https://www.nextjs.cn/learn/basics/create-nextjs-app",
  //   },
  //   {
  //     title: "NestJs",
  //     src: "https://lawlighty-blog.oss-cn-hangzhou.aliyuncs.com/articles/nest/nest-bg.png",
  //     href: "https://nestjs.com/",
  //   },
  //   {
  //     title: "ThreeJs",
  //     src: "https://lawlighty-blog.oss-cn-hangzhou.aliyuncs.com/articles/three-js.png",
  //     href: "https://threejs.org/",
  //   },
  // ]);
  const [advertList, setAdvertList] = useState([]);
  const getBanners = async () => {
    const query = {
      type: "AD",
    };
    await _get_banners(JSON.stringify(query)).then((data) => {
      if (data.status === 200) {
        setAdvertList(data.data.data);
      }
    });
  };
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="ad-div comm-box">
      {advertList&&advertList.map((item) => (
        <div key={item._id}>
          <a href={item.targeturl} target="_blank">
            <img
              title={item.name}
              className="hover-img"
              src={item.img}
              width="100%"
              alt={item.name}
            />
          </a>
        </div>
      ))}
    </div>
  );
}
