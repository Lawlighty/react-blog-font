import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="error-page">
        <div className="box">
          <img
            src="/imgs/404/undraw_Outer_space_re_u9vd.svg"
            className="img404"
          />
          <h4 className="error-page-title">啊呀，不小心飞出地球了！</h4>
          <p className="error-page-tip">
            此页面已无法找到，可能已经被删除或地址错误
          </p>
          <Link href="/">
            <a className="error-page-btn">光速返回</a>
          </Link>
        </div>
      </div>
    </>
  );
}
