import { BarChartOutlined } from "@ant-design/icons";
import ToolBanner from "../components/ToolBanner";
import { Alert, Tag } from "antd";

function Analytics() {
    return ( 
        <>
            <ToolBanner icon={<BarChartOutlined />} title={'Analytics'} subTitle={'View your company analytics'} />
              
                <Alert style={{
                    borderRadius: '0',
                    border: '0',
                }} showIcon message="Analytics would be available after 2 months of usage"></Alert>
        </>
     );
}

export default Analytics;