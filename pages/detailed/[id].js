// 头部导航栏
import "../../styles/pages/detailed.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import BaseBg from "@/components/base-bg";
import Author from "../../components/author";
import Advert from "../../components/advert";
import Footer from "../../components/footer";
import MyLoading from "@/components/loading";
import { Row, Col, List, Breadcrumb, Affix,Skeleton } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
// import ReactMarkdown from "react-markdown";

import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import axios from "axios";
import * as moment from "moment";
import { useRouter } from "next/router";
//  marked + highlight.js  替换 react-markdown
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

// 解析大纲
import Tocify from "../../components/tocify.tsx";
// react-markdown 版本 大于7.0 使用动态导入
// import dynamic from "next/dynamic";
// const ReactMarkdown = dynamic(() => import("react-markdown"), {
//   ssr: false, //这个要加上,禁止使用 SSR
// });

import servicePath from "../../config/apiUrl";
import { _get_episode_detail } from "@/services/episodes";

export default function Detailed() {
  const router = useRouter();
    const [spinning, setSpinning] = useState(false);
  // markdown 内容测试
  const renderer = new marked.Renderer();

  // 重新定义对#这种标签的解析
  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  const [article, setArticle] = useState({});

  const getEpisodesDetail = async (id = "") => {
    setSpinning(true);
    await _get_episode_detail(id).then((data) => {
      if (data.status === 200) {
        setArticle(data.data);
      }
    });
    setSpinning(false);
  };

  useEffect(() => {
    if (router.query.id) {
      const id = router.query.id;
      getEpisodesDetail(id);
    }
  }, [router]);

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  let html = marked(article?.textfile ?? "");
  // let html = marked(markdown3);

  return (
    <div className="page-wrapper">
      <Head>
        <title>{article?.name ? `${article?.name}` : `博客详细页`}</title>
        <link rel="icon" href="/l.svg.ico" />
      </Head>

      {/* 头部导航 */}
      <Header></Header>

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
                  <Breadcrumb.Item>详情</Breadcrumb.Item>
                  <Breadcrumb.Item>{article?.name ?? ""}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <div className="detailed-title">{article?.name ?? ""}</div>

                <div className="list-icon center">
                  <span>
                    <CalendarOutlined />
                    {moment(article?.createdAt ?? "").format(
                      "YYYY/MM/DD hh:mm:ss"
                    )}
                  </span>
                  <span>
                    <HistoryOutlined />
                    {moment(article?.updatedAt ?? "").format(
                      "YYYY/MM/DD hh:mm:ss"
                    )}
                  </span>
                  {/* <span>
                      <FolderOutlined />
                      {article?.course?.name ?? "未知"}
                    </span> */}
                </div>

                {/* markdown 解析 */}
                <div
                  className="detailed-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                >
                  {/* <ReactMarkdown
                    children={article.article_content}
                    escapeHtml={false}
                  /> */}
                </div>
              </div>
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={144}>
            {/* 广告组件 */}
            {/* 站长介绍组件 */}
            <Author></Author>
            <Advert></Advert>
            <Affix offsetTop={60}>
              <div>
                {/* 文章目录 */}
                <div className="detailed-nav comm-box">
                  <div className="nav-title">文章目录</div>
                  {/* <MarkNav
                  className="article-menu"
                  source={articleProps.article_content}
                  ordered={false}
                /> */}
                  <div className="toc-list">{tocify && tocify.render()}</div>
                </div>
              </div>
            </Affix>
          </Col>
        </Row>
      </main>

      <Footer></Footer>
    </div>
  );
}
// export async function getServerSideProps(context) {
//   let { id } = context.params;
//   let res = await axios(servicePath.getArticleById + id);
//   let data = res.data;
//   return {
//     props: {
//       articleProps: data?.data?.[0] || {},
//     },
//   };
// }
