import React from 'react';
import { Card, Descriptions, Tag, List } from 'antd';
import { useAppContext } from '../context/AppContext';
import ToolBanner from './ToolBanner';
import { FlagOutlined } from '@ant-design/icons';
import Spinner from './Spinner';
import { company as companyIcon } from '../assets';

const CompanyInfo = () => {
  const {state} = useAppContext();
  const {company} = state;

  return (company == null ? <Spinner /> : <>
  <ToolBanner icon={<FlagOutlined />} title="Company" subTitle={'Your Company Information'} />
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: '0px', borderRadius: '0px',
  }}>
           
            <Card bordered={true} style={{width: '60%', margin: 'auto', border: '0px', boxShadow: '0px'}}>
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Company Name">{company?.companyName}</Descriptions.Item>
                <Descriptions.Item label="Email">{company?.email}</Descriptions.Item>
                <Descriptions.Item label="Company Address">{company?.companyAddress}</Descriptions.Item>
                <Descriptions.Item label="Employees Bulk Data Published">
                  {company?.employeesBulkDataPublished ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Leave Year Start Date">
                  {new Date(company?.leaveYearStartDate).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Max Annual Carry Over Leaves">
                  {company?.maxAnnualCarryOverLeaves !== 'fa' ? company?.maxAnnualCarryOverLeaves : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Add-On Tools">
                  {state.company?.addOnTools?.map(tool => <Tag color="blue">{tool}</Tag>)}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <div align="center">
              <img src={companyIcon} style={{width: '40%'}} />
            </div>

          </div>
        </>
  );
};

export default CompanyInfo;
