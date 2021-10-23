import "../styles/components/footer.css";
import Script from "react-load-script"
const Footer = () => (
  <footer className="footer-div">
    <Script url="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></Script>
    <div>系统由 React+Node+Ant Desgin+Next.js驱动 </div>
    <div>Lawlighty.com</div>
    本站总访问量<span id="busuanzi_value_site_pv"></span>次
  </footer>
);

export default Footer;
