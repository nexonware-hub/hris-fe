import { t } from "i18next";
import ToolBanner from "../components/ToolBanner";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Form, Select, Button, Alert, Row, Col, Tabs, Tag, message} from 'antd';
import { AimOutlined, ArrowLeftOutlined, ArrowRightOutlined, BarChartOutlined, EditOutlined, FileDoneOutlined, ImportOutlined, ProfileOutlined, RocketOutlined } from "@ant-design/icons";
import OKRForm from "../components/OKRForm";
import ListOfGoals from "../components/ListOfGoals";
import { getGoals, postGoal } from "../services/goalService";
import Spinner from "../components/Spinner";
import Reviews from "../components/Reviews";
import ProvideReview from "../components/ProvideReview";
import { getDirectReportsByEmail } from "../services/directReportsService";
import { addLeave, careerAndPerformance, setAGoal } from "../assets";

function CareerAndPerformance() {

    const { state, saveCareerAndPerformanceState } = useAppContext();

    const { performanceCycle, cyclePeriod } = state.careerAndPerformance;

    const [loadingGoals, setLoadingGoals] = useState(true);

    const [directs, setDirects] = useState(null);

    const [showOKRForm, setShowOKRForm] = useState(false);

   useEffect(() => {
        getDirectReportsByEmail(state.currentEmployee?.Email, state.apiToken).then(res => {
            setDirects(res.data);
        }).catch((err) => {
            console.log('Could not find directs!');
        })
   }, []);
     
    // last year - this year and this year - next year
    const performanceCycles = [`${new Date().getFullYear()-1}-${new Date().getFullYear()}`, `${new Date().getFullYear()}-${new Date().getFullYear()+1}`];
    
    const cyclePeriods = [{ value: 'q1', label: 'Quarter 1 (Q1)' },
    { value: 'q2', label: 'Quarter 2 (Q2)' },
    { value: 'q3', label: 'Quarter 3 (Q3)' },
    { value: 'q4', label: 'Quarter 4 (Q4)' },
    { value: 'midyear', label: 'Mid-Year Review' },
    { value: 'endofyear', label: 'End of Year Review' }];
    

    const CycleForm = () => {
        const [form] = Form.useForm();    
        return (
          <Form
            form={form}
            layout="vertical"
            style={{ margin: '0px 20px', padding: '0px'}}  // Optional styling to center the form
          >
            <Form.Item
              label="Performance Cycle"
              labelAlign="top"
              name="performanceCycle"
              rules={[{ required: true, message: 'Please select a performance cycle' }]}
              style={{ width: '150px', display: 'inline-block'}}
            >
              <Select defaultValue={performanceCycle} onChange={(value) => {saveCareerAndPerformanceState({ ...state.careerAndPerformance, performanceCycle: value })}} 
              placeholder="Select Performance Cycle" options={performanceCycles?.map((cycle, index) => ({ value: cycle, label: cycle }))} />
            </Form.Item>

            &nbsp;
            &nbsp;
      
            <Form.Item
              label="Cycle Period"
              name="cycleperiod"
              rules={[{ required: true, message: 'Please select a quarter' }]}
              style={{width: '170px', display: 'inline-block'}}
            >
              <Select defaultValue={cyclePeriod} onChange={(value) => saveCareerAndPerformanceState({ ...state.careerAndPerformance, cyclePeriod: value })} placeholder="Select Quarter" options={cyclePeriods} />
            </Form.Item>
          </Form>
        );
      };

    const {saveSelectedTool} = useAppContext();
    useEffect(() => {
            if(performanceCycle && cyclePeriod) {
               loadGoals();
        }
    }, [performanceCycle, cyclePeriod]);

    useEffect(() => {
      saveSelectedTool('Career & Performance');
      return () => {
        saveSelectedTool(null);
    }
    }, []);

    const loadGoals = () => {
        setLoadingGoals(true);
        setGoals(null);
        getGoals({performanceCycle, cyclePeriod}, state.apiToken).then((response) => {
            console.log(response.data);
            setLoadingGoals(false);
            setGoals(response.data);
        }).catch((error) => {
            message.error('Something went wrong');
            console.log(error);
        })
    }

    const [data, setData] = useState([]);

      const [goals, setGoals] = useState(null);

      useEffect(() => {
        const chartData = goals?.map((goal, index) => {
            return {
                term: goal.objective?.description,
                count: (goal.initiatives?.reduce((a, b) => a + b.achieved ? 1 : 0, 0) + goal.keyResults?.reduce((a, b) => a + b.achieved ? 1 : 0, 0)) + 1
            }
        });
        setData(chartData);
    }, [goals]);

    return ( <div style={{ left: '0px', margin: '0px', width: '100vw', minHeight: '100vh'}}>
        <>
        <ToolBanner icon={<RocketOutlined />} title={t('Career and Performance')} subTitle={t('Set goals and track performance')} />
        
        <CycleForm />

        {
            performanceCycle && cyclePeriod ? 
            <div style={{margin: '0px 20px', height: '100%'}}>
            <Tabs
                id="career-and-performance-tabs"
                defaultActiveKey="1"
                items={[
                {
                    label: 'Manage Goals',
                    key: '1',
                    icon: <AimOutlined />,
                    children: <Row style={{ height: '100%', paddingTop: '20px' }}>
                      <Col xs={0} md={1}></Col>
                      <Col xs={24} md={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      {showOKRForm ? (
                        <OKRForm
                          setShowOKRForm={setShowOKRForm}
                          loadingGoals={loadingGoals}
                          loadGoals={loadGoals}
                          performanceCycle={performanceCycle}
                          cyclePeriod={cyclePeriod}
                          state={state}
                          cyclePeriods={cyclePeriods}
                        />
                      ) : (
                        <div style={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}>
                          <br/>
                          <img src={setAGoal} style={{ width: '35%' }} />
                          <br />
                          <br />
                          <Button type="primary" onClick={() => setShowOKRForm(true)}>
                            Set a goal <ImportOutlined />
                          </Button>
                        </div>
                      )}
                    </Col>
                    <Col xs={0} md={1}></Col>

                    <Col xs={0} md={1}></Col>
                    <Col xs={24} md={10} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div>
                        <h3 style={{ fontWeight: '500', marginTop: '0px' }}>
                          List of Goals for <Tag>{ cyclePeriods.find(x => x.value === cyclePeriod).label }, {performanceCycle}</Tag>
                        </h3>
                        {loadingGoals && goals == null ? <Spinner text={'Loading Goals'} /> : <ListOfGoals items={goals} />}
                      </div>
                    </Col>
                    <Col xs={0} md={1}></Col>
                  </Row>
                  ,
                },
                {
                    label: 'Your Performance Reviews',
                    key: '2',
                    icon: <BarChartOutlined />,
                    children: <Reviews />
                },
                 directs && {
                    label: 'Provide Reviews',
                    key: '3',
                    icon: <EditOutlined />,
                    children: <Row>
                      <Col xs={0} md={6}></Col>
                      <Col xs={24} md={12}>
                        <ProvideReview directs={directs} />
                      </Col>
                      <Col xs={0} md={6}></Col>
                      </Row>
                }
                // {
                //     label: 'Feedbacks',
                //     key: '3',
                //     children: 'Coming soon'
                // }
                ]}
                />
            </div>
            :
            <div style={{marginTop: '0px'}}>
                <Alert style={{ borderRadius: '0px', border: '0px', paddingLeft: '20px'}} showIcon type="warning" message="Please select Performance Cycle and Cycle Period above"></Alert>
                <br/>
                <br/>
                <br/>
                <br/>
                <div align="center">
                  <img src={careerAndPerformance} style={{width: '25%'}} />
                </div>
            </div>
        }
        </>
        <br/>
        <br/>
        <br/>
    </div>
    );
}

export default React.memo(CareerAndPerformance);