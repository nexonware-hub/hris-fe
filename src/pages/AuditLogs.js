import { FileTextOutlined } from "@ant-design/icons";
import ToolBanner from "../components/ToolBanner";
import { Alert, Tag } from "antd";

function AuditLogs() {
    return ( 
        <>
        <ToolBanner icon={<FileTextOutlined />} title={'Audit Logs'} subTitle={'See activity related to your company'} />
      
        <div style={{padding: '20px'}}>
            <Tag>Coming Soon</Tag>
        </div>
        </>
     );
}

export default AuditLogs;