import { useParams } from "react-router-dom";
import Navigationbar from "../components/NavigationBar";
import {SignUp, SignIn } from "../components/SignUp";
import { signin, signup as signupsvg } from './../assets';

function Auth({signup, mobile}) {
    return <>
    <Navigationbar />
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        background: `url(${''}`,
        backgroundSize: 'cover',

    }}>
        {!mobile && <div style={{width: '50%'}}>
            <img style={{ 
                width: window.location.pathname.includes('signup') ? '70%' : '66%',
            }} src={ window.location.pathname.includes('signup') ? signupsvg : signin}  />
        </div>}
        <div style={{width: '35%'}}>
            {signup ? <SignUp /> : <SignIn />}
        </div>
        
    </div>
    </>;
}

export default Auth;