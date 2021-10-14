import React, { useState, useEffect, useImperativeHandle, cRef } from "react";
import "../styles/components/header.css";
import { Icon as LegacyIcon } from "@ant-design/compatible";

import {
  HomeOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Row, Col, Menu } from "antd";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useRouter } from "next/router";

const Header = ({ setCrrentNav, cRef }) => {
  let router = useRouter();
  const [navArray, setNavArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        setNavArray(res.data.data);
        return res.data.data;
      });
      setCrrentNav && getCrrentNav(result);
      setNavArray(result);
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
    let nav = cnavs.find((item) => item.id === router.query.id * 1);
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
    <div className="header">
      {/* 居中显示 改行 */}
      <Row type="flex" justify="center">
        {/* 长 */}
        <Col xs={24} sm={24} md={10} lg={13} xl={10}>
          <span className="header-logo">
            <Link href={{ pathname: "/" }}>
              <a> Lawlighty</a>
            </Link>
          </span>
          <span className="header-txt">喜欢kiyo,但是没有kiyo酱?</span>
        </Col>
        {/* 短 */}
        <Col xs={0} sm={0} md={14} lg={10} xl={12}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined className="header-icon" />
              首页
            </Menu.Item>
            {navArray.map((item) => {
              return (
                <Menu.Item key={item.id}>
                  {/* 动态展示icon */}
                  <LegacyIcon
                    type={item.icon}
                    className="header-icon"
                  ></LegacyIcon>
                  {item.typeName}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
