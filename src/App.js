import { useEffect, useState } from 'react';
import { useAppContext } from './context/AppContext';
import AppRoutes from './routes';
import { getEmployeeByEmail, updateEmployeeProfile } from './services/employeeService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message, ConfigProvider } from 'antd';
import { infoColor, primaryBorderRadius, primaryColor } from './css';
import { getCompanyById } from './services/companyService';
import { getToken } from 'firebase/messaging';
import { DownloadOutlined } from '@ant-design/icons';

import {Button} from 'antd';
import { messaging } from './firebase';

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };

const App = () => {
  const {state, saveCurrentEmployee, saveCompanyAndAddOnTools } = useAppContext();

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPwaButtonVisible, setIsPwaButtonVisible] = useState(false);


  useEffect(() => {

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to show the install button
      setIsPwaButtonVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }
        setDeferredPrompt(null); // Clear the saved prompt
      });
    }
  };


  useEffect(() => { 
      if(state.apiToken){
          getEmployeeByEmail(null, state.apiToken).then(res => {
            saveCurrentEmployee(res.data);
          }).catch((err)=>{
            message.error(err.message)
          });
      }
  }, [state.apiToken]);

  useEffect(() => {
    if(state.currentEmployee){
      (async function test(params) {
        const permission = await Notification.requestPermission();
  
        if (permission === 'granted') {
          console.log(messaging);
          console.log(process.env.REACT_APP_VAPIDKEY);
          const token = await getToken(messaging, {
            vapidKey:
              process.env.REACT_APP_VAPIDKEY,
          });
          // alert(token);
  
          //We can send token to server
          console.log('Token generated:', token);
          updateEmployeeProfile(state.currentEmployee.email, {fcmToken: token}, state.apiToken).then(res => {
            console.log(res);
          }).catch((err)=>{
            console.log(err.message);
          })
        } else if (permission === 'denied') {
          //notifications are blocked
          alert('You denied for the notification');
        }
      })();
      getCompanyById(state.currentEmployee.companyId, state.apiToken).then(res => {
        saveCompanyAndAddOnTools(res.data);
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  }, [state.currentEmployee]);

  return (
    <>
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: primaryColor,
        borderRadius: primaryBorderRadius,

        // Alias Token
      },
    }}
  >

    <AppRoutes />

    {isPwaButtonVisible && (
        <Button 
          icon={<DownloadOutlined />}
          onClick={handleInstallClick}
          size='small'
          style={{
            position: 'fixed',
            bottom: '-10px',
            right: '0px',
            rotate: '90deg',
            transformOrigin: 'top right',
          }}
        >
          Download App
        </Button>
      )}

    <ToastContainer position="top-right" />

    {/* <button style={{
      position: 'absolute',
      bottom: '0px',
      right: '0px'
    }} onClick={() => {
      i18n.changeLanguage(Object.keys(lngs)[1])
    }}>change lang </button> */}
  </ConfigProvider>
    </>
)};

export default App;