import { CalendarOutlined } from "@ant-design/icons";
import { greyOnWhiteColor, primaryBorderRadius, primaryColor } from "../css";
import LeavesCalendar from "../components/LeavesCalendar";
import ToolBanner from "../components/ToolBanner";

function YourCalendar() {
    return ( 
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div style={{height: '100%', border: '0px solid '+greyOnWhiteColor, borderRadius: primaryBorderRadius}}>
                {/* <span style={{color: primaryColor, paddingBottom: '10px', borderBottom: '1px solid '+primaryColor}}> <CalendarOutlined /> Team's Calendar
                
                </span> */}
                <ToolBanner title={'Your Calendar'} subTitle={'View your calendar'} icon={<CalendarOutlined />} />
                <div style={{padding: '0px 20px' }}>
                    <LeavesCalendar />
                </div>
            </div>
        </div>
     );
}

export default YourCalendar;