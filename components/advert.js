// 广告组件
import '../styles/components/advert.css'
import { useEffect, useState } from "react";
import React from "react";

const Advert = () => {
    const [advertList, setAdvertList] = useState([
      {
        title: "NextJs",
        src: "https://www.nextjs.cn/static/images/learn.png",
        href: "https://www.nextjs.cn/learn/basics/create-nextjs-app",
      },
      {
        title: "NestJs",
        src: "https://lawlighty-blog.oss-cn-hangzhou.aliyuncs.com/articles/nest/nest-bg.png",
        href: "https://nestjs.com/",
      },
      {
        title: "ThreeJs",
        src: "https://lawlighty-blog.oss-cn-hangzhou.aliyuncs.com/articles/three-js.png",
        href: "https://threejs.org/",
      },
    ]);
    return (
      <div className="ad-div comm-box">
        {advertList.map((item) => (
          <div key={item.title}>
            <a href={item.href} target="_blank">
              <img
                title={item.title}
                className="hover-img"
                src={item.src}
                width="100%"
                alt={item.title}
              />
            </a>
          </div>
        ))}
      </div>
    );
}
export default Advert