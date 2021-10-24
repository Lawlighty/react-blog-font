import "@/styles/components/dang-drop.css";
import { useState, useEffect } from "react";
import { Modal } from "antd";

const HangDrop = () => {
  let [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <div className="drop-wrap">
        <div className="drop-wrap-line"></div>
        <img
          className="drop-wrap-img"
          src="/imgs/header/scenery.png"
          title="每日图片"
          onClick={() => {
            setModalVisible(true);
          }}
        ></img>
      </div>

      <Modal
        closable={false}
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={750}
      >
        <img
          className="drop-wrap-img-soup"
          src="https://api.fczbl.vip/bing/"
        ></img>
      </Modal>
    </>
  );
};

export default HangDrop;
