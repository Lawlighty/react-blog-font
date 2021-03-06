import React, { useState, useEffect, useImperativeHandle, cRef } from "react";
import "../styles/components/header.css";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import * as Icon from "@ant-design/icons"
import "hover.css/css/hover.css";
import HangDrop from "@/components/hang-drop"

import {
  HomeOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Row, Col, Menu, Affix } from "antd";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useRouter } from "next/router";
import { _get_categories } from "@/services/categories";

 const query = {
   limit: 100,
   page: 1,
};
 
const BASE_TYPE_HEADER_URL = "/imgs/header/";
// 图标 DIY 对象
const LOGO_LIST = {
  "diy-js": "/imgs/header/JavaScript.png",
  "diy-react": "/imgs/header/React.png",
  "diy-vue": "/imgs/header/Vue.png",
  "diy-next": "/imgs/header/Next.png",
  "diy-three": "/imgs/header/three.jpg",
  "diy-uni": "/imgs/header/U.png",
  "diy-daily": "/imgs/header/daily.png",
  "diy-home": "/imgs/header/home.png",
  "diy-life": "/imgs/header/life.png",
  "diy-teach": "/imgs/header/teach.png",
  "diy-css": "/imgs/header/css.png",
};
const Header = ({ setCrrentNav, cRef }) => {
  let router = useRouter();
  const [navArray, setNavArray] = useState([]);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios(servicePath.getTypeInfo).then((res) => {
      //   setNavArray(res.data.data);
      //   return res.data.data;
      // });
      // setCrrentNav && getCrrentNav(result);
      // setNavArray(result);

      await _get_categories(JSON.stringify(query)).then((data) => {
        if (data.status === 200) {
          setNavArray(data.data.data);
          setCrrentNav && getCrrentNav(data.data.data);
        }
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (navArray.length && setCrrentNav) {
      getCrrentNav();
    }
  }, [router]);

  const getCrrentNav = (navs) => {
    let cnavs = navs || navArray;
    let nav = cnavs.find((item) => item._id === router.query.id);
    setCrrentNav(nav || {});
  };

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push("/");
    } else {
      Router.push("/list/" + e.key);
      // Router.push("/list/list");
    }
  };
  return (
    <Affix offsetTop={top}>
      <div className="header">
        {/* 居中显示 改行 */}
        <Row type="flex" justify="center">
          {/* 长 */}
          <Col xs={20} sm={24} md={24} lg={10} xl={10}>
            <div>
              <span className="header-logo">
                <Link href={{ pathname: "/" }}>
                  <a className="hvr-buzz-out"> Lawlighty</a>
                </Link>
              </span>
              {/* TODO: 改写为 后台输入 */}
              <span className="header-txt hvr-underline-from-left">
                喜欢kiyo,但是没有kiyo酱?
              </span>
            </div>
          </Col>
          {/* 短 */}
          <Col xs={0} sm={0} md={0} lg={10} xl={10}>
            <Menu mode="horizontal" onClick={handleClick}>
              <Menu.Item key="0">
                {/* <HomeOutlined className="header-icon" /> */}
                <img src={LOGO_LIST["diy-home"]} className="header-icon-diy" />
                首页
              </Menu.Item>
              {navArray.map((item) => {
                if (item.name != '首页') {
                  return (
                  <Menu.Item key={item._id}>
                      <img src={item.icon} className="header-icon-diy" />
                      {item.name}
                    </Menu.Item>
                  )
                }
              })}
            </Menu>
          </Col>
        </Row>
        <HangDrop></HangDrop>
      </div>
    </Affix>
  );
};

export default Header;
