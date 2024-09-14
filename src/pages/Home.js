// src/components/Header.js
import React, { useContext, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { greyOnWhiteColor, primaryBorderRadius, primaryColor, primaryTextColor, silverColor } from '../css';
import { Alert, Avatar, Card, Col, Row, Tag } from 'antd';
import Title from 'antd/es/skeleton/Title';
import LeavesCalendar from '../components/LeavesCalendar';
import Requests from './Requests';
import { ApartmentOutlined, BarChartOutlined, BellFilled, BellOutlined, CalendarFilled, CalendarOutlined, CompassOutlined, DeploymentUnitOutlined, MoonFilled, PlusCircleOutlined, RocketFilled, SunFilled } from '@ant-design/icons';
import ToolBanner from '../components/ToolBanner';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {

  const toolIconCommonCss = {
    fontSize: '35px', 
    cursor: 'pointer', 
    color: 'white', 
    padding: '18px 30px', 
    borderRadius: '6px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // shadow for depth
    position: 'relative',
    overflow: 'hidden', // to contain pseudo-element inside the box
};

  const appIconStyle = {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    marginBottom: '12px'
  }

  const { state, saveSelectedTool } = useAppContext();
  const {isAdmin} = state;
  const { currentEmployee } = state;

  const employee = currentEmployee;

  useEffect(() => {
    saveSelectedTool(null);
  }, []);

  return ( state.company == null ? <Spinner /> :
    <div 
    style={{
      padding: '0px 20px',
    }}>
{/* <span style={{fontWeight: '100', color: primaryTextColor}}>Quote of the day</span> */}
<div align="center" style={{ 
    // display: 'flex', justifyContent: 'center', alignItems: 'center',
  
  transform: 'translate(-20px, 0px)', 
  width: '100vw',
  // background: `url(https://images.pexels.com/photos/14487318/pexels-photo-14487318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2) no-repeat center center`,
  backgroundColor: primaryColor, // Use your primary color here
  backgroundSize: 'cover',
  backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)), linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))`,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Creates a subtle shadow for the glossy effect
  backdropFilter: 'blur(2px)', // Adds a slight blur for smoothness
  position: 'relative',
  height: '229px'
}}>
  <div style={{backdropFilter: 'blur(0px)', height: '100%', padding: '30px 20px', position: 'relative'}}>
 <Row align="center" style={{
      }}>
        {/* Employee Photo */}
        <Col span={24} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: primaryTextColor}}>
          
        {/* Employee Details */}
        <div align="left" style={{paddingLeft: '5px', color: 'white'}}>
        <h1 type="secondary" style={{ fontWeight: '300', margin: '0px' }}>
          {/* SunFilled or moon on basis on=f time */}
          {/* {new Date().getHours() >= 6 && new Date().getHours() < 18 ? <SunFilled style={{color: 'orange'}} /> : <MoonFilled style={{color: primaryColor}} />} */}
          {/* &nbsp; */}
          Hi {employee?.firstName + " " + employee?.lastName}!
          </h1>
          <span type="secondary" style={{ fontSize: '16px' }}>
            {employee?.jobTitle}
          </span>
          </div>
        </Col>
      </Row>
 
      <br/>
      <br/>
      <div style={{
        position: 'absolute',
        right: '0px',
        top: '115px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255,255,255)',
        // borderRadius: '999px 0px 0px 999px',
        borderRadius: '10px 0px 0px 10px',
        display: 'flex inline',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '60px',
        paddingBottom: '15px',
        paddingLeft: '50px',
        paddingRight: '15px',
        flexWrap: 'wrap',
        fontSize: '14px',
        maxWidth: '70vw'
      }}>
        {state.tools?.find(x => x.displayName == 'Organisational Chart') &&
        <Link className='hover-magnify' style={{textDecoration: 'none', marginBottom: '30px', color: primaryTextColor, marginRight: '40px'}} to="/organisationalchart">
        <DeploymentUnitOutlined style={{...toolIconCommonCss, backgroundColor: '#4285F4'}} />
        <br/>
        <br/>
        Organisational <br/>Chart
        </Link>}


        {state.tools?.find(x => x.displayName == 'Leaves') &&
        <Link className='hover-magnify' style={{textDecoration: 'none', marginBottom: '30px', color: primaryTextColor, marginRight: '40px'}} to="/leaves">
        <CompassOutlined 
            style={{
              ...toolIconCommonCss,
              backgroundColor: '#DB4437'
          }} 
        />
        <br/>
        <br/>
        Leaves <br/> &nbsp;
    </Link>
    }

        {state.tools?.find(x => x.displayName == 'Expenses') &&
        <Link className='hover-magnify' style={{textDecoration: 'none', marginBottom: '30px', color: primaryTextColor, marginRight: '40px'}} to="/expenses">
        <ApartmentOutlined style={{...toolIconCommonCss, backgroundColor: '#0F9D58'}} />
        <br/>
        <br/>
        Expenses <br/> &nbsp;
        </Link>}

        {state.tools?.find(x => x.displayName == 'Career & Performance') &&
        <Link className='hover-magnify' style={{textDecoration: 'none', marginBottom: '30px', color: primaryTextColor, marginRight: '40px'}} to="/career&performance">
        <RocketFilled style={{...toolIconCommonCss, backgroundColor: '#F4B400'}} />
        <br/>
        <br/>
        Career & <br/>Performance
        </Link>}

 
        {state.tools?.find(x => x.displayName == 'Analytics') &&
        <Link className='hover-magnify' style={{textDecoration: 'none', marginBottom: '30px', color: primaryTextColor, marginRight: '40px'}} to="/analytics">
        <BarChartOutlined style={{...toolIconCommonCss, backgroundColor: primaryTextColor}} />
        <br/>
        <br/>
        Analytics
        </Link>}

        <Link className='hover-magnify' style={{textDecoration: 'none', color: primaryTextColor, marginBottom: '30px', marginRight: '40px'}} to="/requestTools">
        <PlusCircleOutlined style={{fontSize: '35px', backgroundColor: greyOnWhiteColor, cursor: 'pointer', color: 'black', borderRadius: '6px', ...toolIconCommonCss }} />
        <br/>
        <br/>
        More Tools  <br/> &nbsp;
        </Link>

      </div>

      <br/>
      <br/>
      <br/> 
     
      </div>
</div>
<br/>
<br/>
<br/> 
<br/>  
       
    </div>
  );
};

export default Home;
