import { Tag } from "antd";
import { getTagColor } from "@/utils/utils";

const LabelTag = ({ tags }) => {
    
    const tagList = tags ? tags.split(";") : [];
    return (
      <>
            {tagList.map((item) => (
                item&&item.length&&
                <Tag
                    color={getTagColor(item)}
                    className="tag-item"
                    key={item}
                >
                    {item}
                </Tag>
            ))}
      </>
    );
};

export default LabelTag;
