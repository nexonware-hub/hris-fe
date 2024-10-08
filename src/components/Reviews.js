import { ArrowRightOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import { Button, Spin, Steps, message } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getReviewByCyclePeriod } from "../services/reviewService";
import Toast from "./Toast";
import SelfReviewForm from "./SeflReviewForm";
import PerformanceReviewDisplay from "./PerformanceReviewDisplay";
import Spinner from "./Spinner";
import { primaryColor, silverColor } from "../css";
import { careerAndPerformance, reviewProcess } from "../assets";

function Reviews() {
    const { state } = useAppContext();
    const [review, setReview] = useState(null);
    const [showCreateReviewForm, setShowCreateReviewForm] = useState(false);
    const [loadingReview, setLoadingReview] = useState(false);

    useEffect(() => {
        if(state.careerAndPerformance.performanceCycle && state.careerAndPerformance.cyclePeriod){
            setShowCreateReviewForm(false);
            setLoadingReview(true);
            getReviewByCyclePeriod(state.careerAndPerformance.performanceCycle, state.careerAndPerformance.cyclePeriod, state.apiToken).then(res => {
                console.log(res.data);
                setReview(res.data[0]);
                setLoadingReview(false);
            }).catch(err => {
                message.error(err.message)
                setLoadingReview(false);
            })
        }
    }, [state.careerAndPerformance.performanceCycle, state.careerAndPerformance.cyclePeriod]);

    const loadReview = () => {
        if(state.careerAndPerformance.performanceCycle && state.careerAndPerformance.cyclePeriod){
            setShowCreateReviewForm(false);
            setLoadingReview(true);
            getReviewByCyclePeriod(state.careerAndPerformance.performanceCycle, state.careerAndPerformance.cyclePeriod, state.apiToken).then(res => {
                console.log(res.data);
                setReview(res.data[0]);
                setLoadingReview(false);
            }).catch(err => {
                message.error(err.message)
                setLoadingReview(false);
            })
        }
    }

    return (<div style={{backgroundColor: silverColor}}> 

        <Steps
        id="reviewSteps"
        style={{
            margin: '0px',
            padding: '50px 30px'
        }} direction="horizontal" current={review ? review.managerReview.rating ? review.finalCommentsAfterReviewDiscussion ? 3 : 2 : 1 : 0}>
            <Steps.Step
                title="Self-Review" 
                description={loadingReview ? <></> : !review && <><Button
                    onClick={() => {
                        setShowCreateReviewForm(true);
                        setTimeout(() => {
                            document.getElementById('career-and-performance-tabs').scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                    }}
                    style={{marginTop: '5px', borderRadius: '999px'}}>Start <ArrowRightOutlined /></Button></>}
            />
            <Steps.Step 
                title="Manager Review" 
                description="" 
            />
            <Steps.Step 
                title="Review Discussion" 
                description="" 
            />
        </Steps>
                 
        
        { loadingReview ? <Spinner height={'30vh'} /> : showCreateReviewForm ? <SelfReviewForm reviewSavedToDb={() => loadReview()} /> : 
        <div style={{display:'flex', justifyContent: 'space-around', alignItems: 'flex-start'}}>
        
          { review &&  <PerformanceReviewDisplay review={review} />}
        </div> }
    </div> );
}

export default Reviews;