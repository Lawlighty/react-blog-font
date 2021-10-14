// 广告组件
import '../styles/components/advert.css'
import { useEffect, useState } from "react";

const Advert = () => {
    const [advertList, setAdvertList] = useState([
      {
        title: "Flutter",
        src: "http://blogimages.jspang.com/flutter_ad2.jpg",
        href: "",
      },
      {
        title: "Vue+Koa",
        src: "http://blogimages.jspang.com/Vue_koa_ad1.jpg",
        href: "",
      },
      {
        title: "前端",
        src: "http://blogimages.jspang.com/WechatIMG12.jpeg",
        href: "",
      },
    ]);
    return (
      <div className="ad-div comm-box">
        {advertList.map((item) => (
          <div key={item.title}>
            <a href={item.href}>
              <img src={item.src} width="100%" alt={item.title} />
            </a>
          </div>
        ))}
      </div>
    );
}
export default Advert