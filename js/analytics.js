// Google Analytics 4 Configuration
// This file contains the centralized Google Analytics setup for soc2certification.com

(function() {
    // Google Analytics tracking ID
    const GA_TRACKING_ID = 'G-VN3PSRTQVN';
    
    // Create and append the gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);
    
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // Configure Google Analytics
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
    
    // Make gtag available globally for any custom tracking
    window.gtag = gtag;
})();