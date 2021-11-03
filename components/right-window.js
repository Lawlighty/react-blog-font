import { BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "../styles/components/rightWindow.css";
// showFunc,   //右侧 功能
// showMini,   //小程序
// showService //客服

export default function RightWindow({
  showFunc,
  showMini,
  showService,
}) {
  return (
    <>
      {/* 是否展示功能 */}
      {showFunc ? (
        <div className="func_div">
          {showMini ? (
            <div className="func_div_item mimi_img">
              <div className="middle_ware"></div>
              <img
                src="/imgs/rightWindow/xcx_black.png"
                alt=""
                className="func_div_item_img"
              />
              <div>微信</div>

              <div className="mini_code_div">
                <img
                  className="mini_code_pic"
                  src="https://lawlighty-blog.oss-cn-hangzhou.aliyuncs.com/articles/wx-lawlighty.jpg"
                  alt=""
                />
                <div style={{ color: "#999" }}>
                  关注微信
                  <br />
                  天天向上
                </div>
              </div>
            </div>
          ) : null}
          {showService ? (
            <div className="func_div_item kefu_img">
              <div className="middle_ware"></div>
              <img
                src="/imgs/rightWindow/kf_black.png"
                alt=""
                className="func_div_item_img"
              />
              <div className="kf_label">客服</div>

              <div className="kefu_div">
                <div className="kefu_div_item1">
                  <img
                    className="qq_icon"
                    src="/imgs/rightWindow/QQ.png"
                    alt=""
                  />{" "}
                  <a>客服: 978170580</a>
                </div>
                <div className="kefu_div_item2">
                  <img
                    className="qq_icon"
                    src="/imgs/rightWindow/QQ.png"
                    alt=""
                  />{" "}
                  <a>客服: 978170580</a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <BackTop>
        <UpOutlined className="toTop" />
      </BackTop>
    </>
  );
}
