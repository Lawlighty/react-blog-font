// 头部导航栏
import '../../styles/pages/detailed.css'
import Head from 'next/head'
import { useState, useEffect } from "react";
import Header from "../../components/header";
import Author from "../../components/author";
import Advert from "../../components/advert";
import Footer from "../../components/footer";
import { Row, Col, List, Breadcrumb, Affix } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import axios from "axios";



// react-markdown 版本 大于7.0 使用动态导入
// import dynamic from "next/dynamic";
// const ReactMarkdown = dynamic(() => import("react-markdown"), {
//   ssr: false, //这个要加上,禁止使用 SSR
// });

export default function Detailed({ markdown }) {

  return (
    <div>
      <Head>
        <title>博客详细页</title>
        <link rel="icon" href="/l.svg.ico" />
      </Head>

      {/* 头部导航 */}
      <Header></Header>

      <main>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div>
              {/* 面包屑导航 */}
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href="/">首页</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                  <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <div className="detailed-title">
                  React实战视频教程-技术胖Blog开发(更新08集)
                </div>

                <div className="list-icon center">
                  <span>
                    <CalendarOutlined /> 2019-06-28
                  </span>
                  <span>
                    <FolderOutlined /> 视频教程
                  </span>
                  <span>
                    <FireOutlined /> 5498人
                  </span>
                </div>

                {/* markdown 解析 */}
                <div className="detailed-content">
                  <ReactMarkdown children={markdown} escapeHtml={false} />
                </div>
              </div>
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={144}>
            <Affix offsetTop={50}>
              {/* 站长介绍组件 */}
              <Author></Author>

              {/* 文章目录 */}
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <MarkNav
                  className="article-menu"
                  source={markdown}
                  ordered={false}
                />
              </div>

              {/* 广告组件 */}
              <Advert></Advert>
            </Affix>
          </Col>
        </Row>
      </main>

      <Footer></Footer>
    </div>
  );
}

//  获取首页列表信息

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id);
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios("http://127.0.0.1:7001/default/getArticleById/" + id).then((res) => {
      console.log('res',res);
      resolve(res.data.data[0]);
    });
  });

  return await promise;
};

// export async function getStaticProps(context) {
//   console.log('context', context);
//   console.log('context.query.id', context.query.id);
//   let id = context.query.id;
//   const promise = new Promise((resolve) => {
//     axios("http://127.0.0.1:7001/default/getArticleById/" + id).then((res) => {
//       console.log(title);
//       resolve(res.data.data[0]);
//     });
//   });
//   let res = await promise;
//   console.log("getStaticProps", res);
//   return {
//     props: {
//       markdown: res,
//     },
//   };
// }




