// 站长介绍组件
import {useEffect, useState} from 'react'
import "../styles/components/author.css";
import copy from "copy-to-clipboard";
import { Avatar, Divider, Tooltip, Typography, Popover, message } from "antd";
import {
  GithubOutlined,
  WeiboCircleOutlined,
  QqOutlined,
  WechatOutlined,
  CopyOutlined
} from "@ant-design/icons";




const Author = () => {
    const [avatarUrl, setAvatarUrl] = useState(
      "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/6cf6c8aad5a23432b96eaa211aebd24d~300x300.image"
  );
  const copyInfo = (info) => {
    copy(info);
    successMsg('复制成功');
  }

  const successMsg = (info) => {
    message.success(info);
  };

  const CodePreview = ({ children }) => (
    <div className="code-preview">
      {children}{" "}
      <CopyOutlined
        className="code-preview-i"
        style={{ marginLeft: "5px" }}
        onClick={(e) => {
          copyInfo(children);
        }}
      />
    </div>
  );
    return (
      <div className="author-div comm-box">
        <div>
          {/* 头像 */}
          <Avatar className="avatar" size={100} src={avatarUrl} />
          {/* 介绍 */}
          <div className="author-introduction typewriter">
            <div className="text">平平无奇Lawlighty,希望开开心心每一天.</div>
          </div>
          <Divider>社交账号</Divider>
          <Popover
            placement="top"
            color="#989898"
            key="GithubOutlined"
            content={<CodePreview>https://github.com/Lawlighty</CodePreview>}
          >
            <Avatar
              size={28}
              className="account"
              style={{ backgroundColor: "" }}
              icon={<GithubOutlined />}
            />
          </Popover>
          <Popover
            placement="top"
            color="#f56a00"
            key="WeiboCircleOutlined"
            content={<CodePreview>lawlighty</CodePreview>}
          >
            <Avatar
              size={28}
              className="account"
              style={{ backgroundColor: "#f56a00" }}
              icon={<WeiboCircleOutlined />}
            />
          </Popover>
          <Popover
            placement="top"
            color="#87d068"
            key="QqOutlined"
            content={<CodePreview>978170580</CodePreview>}
          >
            <Avatar
              size={28}
              className="account"
              style={{ backgroundColor: "#87d068" }}
              icon={<QqOutlined />}
            />
          </Popover>
          <Popover
            placement="top"
            color="#1890ff"
            key="WechatOutlined"
            content={<CodePreview>lyxlissa</CodePreview>}
          >
            <Avatar
              size={28}
              className="account"
              style={{ backgroundColor: "#1890ff" }}
              icon={<WechatOutlined />}
            />
          </Popover>
        </div>
      </div>
    );
}

export default Author;