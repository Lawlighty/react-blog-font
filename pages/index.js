// 头部导航栏
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import BaseBg from '../components/base-bg'
import Author from '../components/author'
import Advert from '../components/advert'
import RightWindow from "../components/right-window";
import Footer from "../components/footer";
import LabelTag from "@/components/label-tag";
import BeautifulSoup from "@/components/beautiful-soup";
import { Row, Col, List, Tag, Image, Pagination } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import '../styles/pages/index.css'
import axios from 'axios'
import * as moment from "moment";
import { useRouter } from "next/router";
import servicePath from "../config/apiUrl";

// 支持Markdown的解析;
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { getTagColor } from "@/utils/utils";
import { _get_courses } from "@/services/courses";

const initPaging = {
  current: 1,
  pageSize: 10,
  //   total: courseListCount,
};

export default function Home({ myList }) {
  const [mylist, setMylist] = useState(myList);
  const [pagination, setPagination] = useState(initPaging);

  const router = useRouter();
    const getDocumentsList = async (nowpaginatio = {}) => {
      const query = {
        limit: nowpaginatio.pageSize || pagination.pageSize,
        page: nowpaginatio.current || pagination.current,
      };
      await _get_courses(JSON.stringify(query)).then((data) => {
        if (data.status === 200) {
          const n_pagination = {
            ...pagination,
            current: data.data.page,
            total: data.data.total,
          };
          setPagination({ ...n_pagination });
          console.log("_get_courses", data.data.data);
          setMylist(data.data.data);
        }
      });
    };
  
   const onChangePage = (page) => {
     const n_pagination = { ...pagination, current: page };
     getDocumentsList(n_pagination);
   };
  
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

  useEffect(() => {
    getDocumentsList({});
  }, []);

  const courseOnClickHandel = (e, item) => {
    console.log("courseOnClickHandel", item);
    if (item?.episodes?.length == 1) {
      // 直接跳转到改课时详情
      router.push(`/detailed/${item.episodes[0]}`);
    } else {
      router.push(`/course/${item._id}`);
    }
  }
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
        <BaseBg></BaseBg>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <List
              header={<div>Lawlighty 的 最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <div className="cover-img-wrapper">
                      {/* <Link
                      // href={{ pathname: "/course/" + item._id }}
                      > */}
                      <a
                        onClick={(e) => {
                          courseOnClickHandel(e, item);
                        }}
                      >
                        <img
                          width={250}
                          alt="封面"
                          src={item.cover}
                          className="cover-img"
                        />
                      </a>
                      {/* </Link> */}
                    </div>
                  }
                >
                  <div className="list-title">
                    {/* <Link href={{ pathname: "/detailed/" + item._id }}> */}
                    {/* <Link href={{ pathname: "/course/" + item._id }}> */}
                      <a
                        className="hvr-skew-forward"
                        onClick={(e) => {
                          courseOnClickHandel(e, item);
                        }}
                      >
                        {item.name}
                      </a>
                    {/* </Link> */}
                    {item?.category?.name && (
                      <LabelTag tags={item.category?.name}></LabelTag>
                    )}
                  </div>
                  <div className="list-icon">
                    <span>
                      <CalendarOutlined />
                      {moment(item.createdAt).format("YYYY/MM/DD hh:mm:ss")}
                    </span>
                    <span>
                      <FolderOutlined /> {item.episodes?.length ?? 0}
                    </span>
                    <span>{item.stick && <FireOutlined />}</span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{
                      __html: marked(item?.introduce || ""),
                    }}
                  >
                    {/* {item.introduce} */}
                  </div>
                </List.Item>
              )}
            />
            <Pagination
              current={pagination.current}
              total={pagination.total || 10}
              onChange={onChangePage}
              defaultPageSize={pagination.pageSize}
              style={{ textAlign: "center", marginTop: 20 }}
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
// export async function getServerSideProps() {
//   let  res = await axios(servicePath.getArticleList);
//   let data = res.data;
//   return {
//     props: {
//         myList : data?.data || [],
//     }
//   };
// }
