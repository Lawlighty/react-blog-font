import "../styles/components/footer.css";
import Script from "react-load-script"
import Link from "next/link";

const Footer = () => (
  <footer className="footer-div">
    <Script url="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></Script>
    <div>
      <Link href={{ pathname: "https://beian.miit.gov.cn/#/Integrated/index" }}>
        <a className="hvr-buzz-out"> 浙ICP备2021032851号</a>
      </Link>
    </div>
    <div>系统由 React+NestJs+Ant Desgin+NextJs 驱动 </div>
    <div>lawlighty.top</div>
    本站总访问量<span id="busuanzi_value_site_pv"></span>次
  </footer>
);

export default Footer;
