// 头部导航栏
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/advert'
import RightWindow from "../components/right-window";
import Footer from "../components/footer";
import {Row, Col, List} from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import '../styles/pages/index.css'
import axios from 'axios'
import * as moment from "moment";

import servicePath from "../config/apiUrl";

// 支持Markdown的解析;
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default function Home({ myList }) {
  const [mylist, setMylist] = useState(myList);

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <div className="page-wrapper">
      <Head>
        <title>Lawlighty的博客首页</title>
        <link rel="icon" href="/l.svg.ico" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* 头部导航 */}
      <Header></Header>

      <main>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <List
              header={<div>Lawlighty 的 最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: "/detailed/" + item.id }}>
                      <a>{item.title}</a>
                    </Link>
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
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  >
                    {/* {item.introduce} */}
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={144}>
            {/* 站长介绍组件 */}
            <Author></Author>
            {/* 广告组件 */}
            <Advert></Advert>
          </Col>
        </Row>
      </main>
      <RightWindow
        showFunc={true}
        showMini={true}
        showService={true}
      ></RightWindow>

      <Footer></Footer>
    </div>
  );
}
//  获取首页列表信息
export async function getStaticProps() {
    const promise = new Promise((resolve) => {
      axios(servicePath.getArticleList).then((res) => {
        resolve(res.data);
      });
    });
  let res = await promise;
  return {
    props: {
        myList : res?.data|| [],
    }
  };
}
