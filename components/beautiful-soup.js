

/*
 * Author       : Lawlighty
 * Date         : 2021-10-24 12:39:29 +0800
 * LastEditors  : Lawlighty
 * LastEditTime : 2021-11-03 20:46:46 +0800
 * Description  : bing 每日一图, 像作为类似屏保的功能
 * FilePath     : \blog\components\beautiful-soup.js
 */
import {useEffect, useState} from "react"
import axios from "axios";
import { Image } from "antd";

const BASE_BING_IMG_URL = `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1`;

export default function BeautifulSoup(props) {
  let [bingImgInfo, setBingImgInfo] = useState({});
  useEffect(() => {
    // getSoup();
  });

  const getSoup = async () => {
    let res = await axios(BASE_BING_IMG_URL);

    if (res && res.request && res.request.response) {
      let a = JSON.parse(JSON.stringify(res.request.response));
      let b = JSON.parse(a);
      setBingImgInfo(b.images[0] || {});
    }
  };
  const buildUrl = (url) => {
    if (!url) {
      return "";
    }
    return `https://cn.bing.com/` + url;
  };
  return (
    <>
      <Image width={200} src={buildUrl(bingImgInfo.url)}></Image>
    </>
  );
};


export async function getStaticProps() {
  const promise = new Promise((resolve) => {
    axios(BASE_BING_IMG_URL).then((res) => {
      resolve(res.data);
    });
  });
  let res = await promise;
  return {
    props: {
      myList: res?.data || [],
    },
  };
}
