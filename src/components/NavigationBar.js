import { BellFilled, BellOutlined, BellTwoTone, CalendarFilled, CalendarOutlined, CaretLeftFilled, CaretRightFilled, CiCircleFilled, EditFilled, EditOutlined, FlagOutlined, PaperClipOutlined, PlusCircleFilled, PlusCircleOutlined, SafetyCertificateOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { errorColor, greyOnWhiteColor, infoColor, navigationBarBackgroundColor, primaryBorderRadius, primaryTextColor, silverColor, successColor, white } from "../css";
import { useAppContext } from "../context/AppContext";
import { info } from "sass";
import { Link } from "react-router-dom";
import { Badge, Button, Dropdown, Input, Menu, Popover, Tag, Tooltip, notification } from "antd";
import { useEffect, useState } from "react";
import { getRequests } from "../services/requestsService";
import { CaretDownOutlined } from '@ant-design/icons';
import { Roles } from "../Constants";


function Navigationbar({companyName}) {
  const { state, saveRequestsForManager } = useAppContext();

  useEffect(() => {
    getRequests(state.apiToken).then((res) => {
        console.log(res.data);
        saveRequestsForManager(res.data);
    }).catch((err) => {
        console.log(err);
    })
  }, []);

const primaryColor = primaryTextColor;


  const menu = (
    <Menu>
  <Menu.Item key="1">
    <Link to={`/profile/${state.currentEmployee?.email}`} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
     <UserOutlined />&nbsp; Your Profile
    </Link>
  </Menu.Item>
  <Menu.Item key="3">
    <Link to={'/company'} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
     <FlagOutlined />&nbsp; Your Company
    </Link>
  </Menu.Item>
  <Menu.Item key="3-1">
    <Link to={'/calendar'} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
     <CalendarOutlined />&nbsp; Your Calender
    </Link>
  </Menu.Item>
  {state.currentEmployee?.roles?.includes(Roles.EDITOR) && <Menu.Item key="2">
    <Link to={`/ats`} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
     <PaperClipOutlined />&nbsp; ATS (Recruiting)
    </Link>
  </Menu.Item>}

  {state.currentEmployee?.roles?.includes(Roles.EDITOR) && (
    <Menu.SubMenu className="sub-menu" icon={<CaretLeftFilled />} key="sub1" title="Employee Management" style={{ fontSize: '15px' }}>
         <Menu.Item key="4-1">
        <Link to={'/employee-management/new'} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
          <PlusCircleOutlined style={{color: primaryColor}} /> &nbsp; New Employee
        </Link>
      </Menu.Item>
      <Menu.Item key="4-2">
        <Link to={'/employee-management/update'} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
          <EditOutlined style={{color: primaryColor}} /> &nbsp; Update Existing Employee
        </Link>
      </Menu.Item>
    </Menu.SubMenu>
  )}
  <Menu.Item key="5">
    <Link to={`/audit-logs`} style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>
      <SafetyCertificateOutlined />&nbsp; Audit logs
    </Link>
  </Menu.Item>
  <Menu.Item key="6">
    Log Out
  </Menu.Item>
</Menu>

  );


    const iconStyle={
        padding: '8px',
        marginLeft: '25px',
        borderRadius: '50%',
        backgroundColor: white,
        fontSize: '18px',
        cursor: 'pointer',
    }

    return ( 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100vw',
            justifyContent: 'space-between',
            position: 'relative',
            right: '0px',
            borderBottom: '0px solid '+ 'white',
            backgroundColor: white,
            // background: `linear-gradient(to right,  ${white}, ${white}, ${white}, ${primaryColor})`,
            zIndex: 999,
            color: primaryColor,
            // marginBottom: '25px',
        }}>
            <span style={{paddingTop: '13px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    

                }}
                ><img style={{width: '58px', marginLeft: '20px', marginRight: '10px'}} 
                src="https://cdn-icons-png.flaticon.com/128/10279/10279633.png" />
                <span style={{fontWeight: '300 !important'}}><span style={{fontSize: '20px'}}>CORE.HRMS</span>
                <br/>
                <Tag style={{fontSize: '10px', fontWeight: '300', marginTop: '3px'}}>{
                // state.company?.companyName 
                'Your.Company.Name' || 'Inspiring Excellence'}
                </Tag></span> </span>
                 {/* <sub style={{fontSize: '13px', fontWeight: '100', paddingLeft: '2px'}}>{state.company?.companyName || '-Company Name-'}</sub>  */}
            </span>

            {state.isAdmin == false && <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '20px',
            }}>
                
            {/* <Input.Search style={{
                width: '200px',
                marginRight: '29px',
            }} placeholder="Quick search" onSearch={() => {}} /> */}
            <Link to='/requests' style={{ textDecoration: 'none', maxHeight: '28px'}}>
            <Badge size="small" count={state.requestsForManager?.length}>
            <Button type="primary" size="small" style={{cursor: 'pointer', fontSize: '13px', padding: '13px',
            // border: '1px solid '+primaryColor,
            // boxShadow: '0px 0px 5px 1px '+primaryColor,
            backgroundColor: greyOnWhiteColor,
            color: primaryTextColor,
        }}>
                <BellOutlined /> 
                {/* Alerts */}
            </Button>
            </Badge>
            </Link>

            &nbsp; 
            &nbsp;
            &nbsp;

        
            <Dropdown overlay={menu} trigger={['click']}>
                <SettingOutlined
                style={{fontSize: '17px', padding: '6px', borderRadius: '50%', cursor: 'pointer'}}
                />
            </Dropdown>

            {/* <Link style={{textDecoration: 'none', maxHeight: '28px', cursor: 'pointer',}} to={`/profile/${state.currentEmployee?.email}`}>
                            <span
                            style={{
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: '1px solid ' + lineColor,
                                backgroundColor: white,
                                objectFit: 'cover',
                                padding: '6px',
                                color: primaryTextColor
                            }}>{state.currentEmployee?.firstName?.charAt(0) + state.currentEmployee?.lastName?.charAt(0)}</span>
                        </Link> */}

            </div>}
            
            {/* {
            state.selectedTool ? <Tag style={{fontSize: '15px', padding: '3px 10px', border: '0px', left: '15vw', position: 'absolute'}}>{state.selectedTool}</Tag> 
            :
            null
            } */}
            {/* <CiCircleFilled style={{backgroundColor: white, borderRadius: '50%', fontSize: '8px'}}/>  */}
          
          {/* <Tooltip
          title={"Visit Profile"} >
            <div style={{position: 'absolute', right: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '40px'}}>
                        <Link to={`/profile/${state.currentEmployee?.id}`}>
                            <img src={state.currentEmployee?.imageUrl || state.currentEmployee?.firstName.charAt(0) + state.currentEmployee?.lastName.charAt(0)} style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: '3px solid white',
                                outline: '5px solid ' + lineColor,
                                backgroundColor: white,
                                objectFit: 'cover',
                            }} />
                        </Link>
                    </div>
                </Tooltip> */}
        </div>
     );
}

export default Navigationbar;