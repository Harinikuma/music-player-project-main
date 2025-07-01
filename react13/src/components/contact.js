import React, { useEffect } from 'react';
import './sigin.css'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };
  useEffect(() => {
    
    const existingScript = document.querySelector(`script[src="//js.hsforms.net/forms/embed/v2.js"]`);

    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;

      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "na1",
    portalId: "45719092",
    formId: "0f3c571e-dcd0-47d6-ae52-f29896c9faf3",
            target: '#hubspotForm'
          });
        }
      };
      

      document.body.appendChild(script);
    } else {
      // Script already exists, just create the form
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
    portalId: "45719092",
    formId: "0f3c571e-dcd0-47d6-ae52-f29896c9faf3",
          target: '#hubspotForm'
        });
      }
    }

  
    
    // Cleanup function
    return () => {
      const formContainer = document.querySelector('#hubspotForm');
      if (formContainer) {
        formContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className='sigin-page'>
    <div className='sigin-canvas'>
        <a href="./" onClick={handleGoBack} className='back-image'>
            <img src="back.png" alt="" />
        </a> 
        <div className='sigin-left'>
            <img src='signin-photo.jpg' alt="Sign In" />
        </div>
        <div id="hubspotForm" className='sigin-right'>
        </div>
    </div>
</div>

  );
};

export default Contact;

{/* <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "45719092",
    formId: "0f3c571e-dcd0-47d6-ae52-f29896c9faf3"
  });
</script>*/}

{/* <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "45719092",
    formId: "415359d6-b7c6-49ee-aa41-34cbf3bd86c8"
  });
</script> */}