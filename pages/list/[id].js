// 头部导航栏
import { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header";
import BaseBg from "@/components/base-bg";
import Author from "../../components/author";
import Advert from "../../components/advert";
import Footer from "../../components/footer";
import MyLoading from "@/components/loading";
import LabelTag from "@/components/label-tag";
import { Row, Col, List, Breadcrumb, Tag, Pagination } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
// import "../../styles/pages/index.css";

import * as moment from "moment";
import { useRouter } from "next/router";
import { _get_courses } from "@/services/courses";

const initPaging = {
  current: 1,
  pageSize: 10,
  //   total: courseListCount,
};

export default function CoursesList() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const [pagination, setPagination] = useState(initPaging);
  const [mylist, setMylist] = useState([]);
  const [crrentNav, setCrrentNav] = useState([]);
  const headerRef = useRef(null);

  const getCoursesList = async (nowpaginatio = {}, category_id = "") => {
    setSpinning(true);
    const query = {
      limit: nowpaginatio.pageSize || pagination.pageSize,
      page: nowpaginatio.current || pagination.current,
      where: {
        category: category_id,
        // category: "6187bbb0f9a0c627f4627f40",
      },
    };
    await _get_courses(JSON.stringify(query)).then((data) => {
      if (data.status === 200) {
        const n_pagination = {
          ...pagination,
          current: data.data.page,
          total: data.data.total,
        };
        setPagination({ ...n_pagination });
        setMylist(data.data.data);
      }
    });
    setSpinning(false);
  };

  const onChangePage = (page) => {
    const n_pagination = { ...pagination, current: page };
    getCoursesList(n_pagination, router?.query?.id ?? "");
  };
  useEffect(() => {
    if (router.query.id) {
      const id = router.query.id;
      getCoursesList({}, id);
    }
  }, [router]);

  const courseOnClickHandel = (e, item) => {
    if (item?.episodes?.length == 1) {
      // 直接跳转到改课时详情
      router.push(`/detailed/${item.episodes[0]}`);
    } else {
      router.push(`/course/${item._id}`);
    }
  };

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
        {/* {spinning ?
          <MyLoading></MyLoading>
          : */}
          <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
              <div>
                {/* 面包屑导航 */}
                <div className="bread-div">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="/">首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{crrentNav?.name || ""}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>

                <List
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
                        {/* <Link href={{ pathname: "/detailed/" + item.id }}> */}
                        <a
                          className="hvr-skew-forward"
                          onClick={(e) => {
                            courseOnClickHandel(e, item);
                          }}
                        >
                          {item.name}
                        </a>
                        {/* </Link> */}
                      </div>
                      <div className="list-icon">
                        <span>
                          <CalendarOutlined />
                          {moment(item.createdAt).format("YYYY/MM/DD hh:mm:ss")}
                        </span>
                        <span>
                          <FolderOutlined /> {item?.category?.name ?? "未知"}
                        </span>
                        <span>
                          <FireOutlined />
                        </span>
                      </div>
                      <div className="list-context">{item.introduce}</div>
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
              </div>
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={144}>
              {/* 站长介绍组件 */}
              <Author></Author>
              {/* 广告组件 */}
              <Advert></Advert>
            </Col>
          </Row>
        {/* } */}
      </main>

      <Footer></Footer>
    </div>
  );
}
// export async function getServerSideProps(context) {
//   let { id } = context.params;
//   let res = await axios(servicePath.getListById + id);
//   let data = res.data;
//   return {
//     props: {
//       articleListProps: data?.data || [],
//     },
//   };
// }
