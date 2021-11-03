// 头部导航栏
import { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header";
import BaseBg from "@/components/base-bg";
import Author from "../../components/author";
import Advert from "../../components/advert";
import Footer from "../../components/footer";
import LabelTag from "@/components/label-tag";
import { Row, Col, List, Breadcrumb, Tag } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
// import "../../styles/pages/index.css";
import axios from "axios";
import * as moment from "moment";

import servicePath from "../../config/apiUrl";
import { useRouter } from "next/router";
import { getTagColor } from "@/utils/utils";

export default function ArticleList({ articleListProps }) {
  const [mylist, setMylist] = useState(articleListProps);
  const [crrentNav, setCrrentNav] = useState([]);
  const headerRef = useRef(null);
  useEffect(() => {
    setMylist(articleListProps);
    });

  return (
    <div className="page-wrapper">
      <Head>
        <title>Lawlighty的博客列表</title>
        <link rel="icon" href="/l.svg.ico" />
      </Head>

      {/* 头部导航 */}
      <Header cRef={headerRef} setCrrentNav={setCrrentNav}></Header>

      <main>
        <BaseBg></BaseBg>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div>
              {/* 面包屑导航 */}
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href="/">首页</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{crrentNav?.typeName || ""}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={(item) => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{ pathname: "/detailed/" + item.id }}>
                        <a className="hvr-skew-forward">{item.title}</a>
                      </Link>
                      {item?.tags?.length && (
                        <LabelTag tags={item.tags}></LabelTag>
                      )}
                    </div>
                    <div className="list-icon">
                      <span>
                        <CalendarOutlined />
                        {moment(item.add_time).format("YYYY/MM/DD hh:mm:ss")}
                      </span>
                      <span>
                        <FolderOutlined /> {item.typeName}
                      </span>
                      <span>
                        <FireOutlined /> {item.view_count}人
                      </span>
                    </div>
                    <div className="list-context">{item.introduce}</div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={144}>
            {/* 站长介绍组件 */}
            <Author></Author>
            {/* 广告组件 */}
            <Advert></Advert>
          </Col>
        </Row>
      </main>

      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  let { id } = context.params;
  let res = await axios(servicePath.getListById + id);
  let data = res.data;
  return {
    props: {
      articleListProps: data?.data || [],
    },
  };
}


