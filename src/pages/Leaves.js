import { t } from "i18next";
import { bannerColor, errorColor, infoColor, leavesBannerColor, successColor, white } from "../css";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import ToolBanner from "../components/ToolBanner";
import { Alert, Button, Card, Collapse, Drawer, List, Spin, Tabs, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { getLeaveApplications } from "../services/leaveService";
import { useAppContext } from "../context/AppContext";
import Toast from "../components/Toast";
import { CaretRightOutlined, CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined, CompassOutlined, ImportOutlined, Loading3QuartersOutlined, LoadingOutlined, NotificationOutlined, WarningOutlined, WarningTwoTone } from "@ant-design/icons";
import LeaveListCard from "../components/LeaveListCard";
import Spinner from "../components/Spinner";
import { addLeave, signup } from "../assets";

function Leaves() {

    const {state, saveSelectedTool} = useAppContext();

    const [loadingLeaveApplications, setLoadingLeaveApplications] = useState(true);
    const [leaveApplications, setLeaveApplications] = useState([]);

    const [showApplyLeaveForm, setShowApplyLeaveForm] = useState(false);


    const reloadApplications = () => {
        setLoadingLeaveApplications(true);
        getLeaveApplications(state.apiToken).then(res => {
            setLeaveApplications(res.data);
            setLoadingLeaveApplications(false);
        }).catch(() => {
            console.log("Something went wrong while fetching leave applications");
            setLoadingLeaveApplications(false);
            setShowApplyLeaveForm(false);
        })
    }

    
    useEffect(() => {
        saveSelectedTool('Leaves');
        getLeaveApplications(state.apiToken).then(res => {
            setLeaveApplications(res.data);
            setLoadingLeaveApplications(false);
        }).catch(() => {
            console.log("Something went wrong while fetching leave applications");
            setLoadingLeaveApplications(false);
        })

        return () => {
            saveSelectedTool(null);
        }
    }, [])
    
    return ( <>
    {/* banner with background on the top with info about organisation chart */}
    <ToolBanner icon={<CompassOutlined />} title={t('tools.leaves')} subTitle={t('Manage your leaves')} />
    <div style={{display: 'flex', justifyContent: 'space-around'}}>


    
    {loadingLeaveApplications ? <div style={{width: '48%', display: 'flex', justifyContent: 'center', position: 'relative'}}><Spinner text={t('Leaves')} /></div> : 
    <div style={{width: '38%'}}>
        <Tabs
                label="faf"
                id="career-and-performance-tabs"
                defaultActiveKey="1"
                items={[
                {
                    label: 'Pending',
                    key: '1',
                    icon: <WarningOutlined style={{color: 'orange'}} />,
                    children: <LeaveListCard leaveApplications={leaveApplications?.filter((application => application.status === 0))} title={'Pending for Approval'} alertType={'warning'} pendingOrApproved={'pending'} />
                },
                {
                    label: 'Approved',
                    key: '2',
                    icon: <CheckCircleOutlined style={{color: successColor}} />, 
                    children: <LeaveListCard leaveApplications={leaveApplications?.filter((application => application.status === 1))} title={'Approved Leaves'} alertType={'success'} pendingOrApproved={'approved'}/>
                },
                {
                    label: <span style={{color: 'grey'}}>Rejected</span>,
                    key: '3',
                    icon: <CloseCircleOutlined style={{color: errorColor}}/>,
                    children: <LeaveListCard leaveApplications={leaveApplications?.filter((application => application.status === -1))} title={'Rejected Leave Applications'} alertType={'error'} pendingOrApproved={'rejected'}/>

                }
                // {
                //     label: 'Feedbacks',
                //     key: '3',
                //     children: 'Coming soon'
                // }
                ]}
                />
    <br/>
    </div>
    }
 
        <Drawer width={'50%'} title="Apply Leave" visible={showApplyLeaveForm} onClose={() => setShowApplyLeaveForm(false)}>
            <ApplyLeaveForm setShowApplyLeaveForm={setShowApplyLeaveForm} reloadApplications={reloadApplications} /> 
        </Drawer>
        
        <div style={{width: '52%', height: '45vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} align="center">
            
            <br/>
            <br/>
            <img src={addLeave} style={{width: '40%'}} />
            <br/>
            <br/>
            <br/>
            <Button style={{width: '30%'}} type="primary" onClick={() => setShowApplyLeaveForm(true)}>Apply Leave <ImportOutlined /></Button> 
        </div> 

    </div>
    <br/>
    <br/>
    </> );
}

export default Leaves;