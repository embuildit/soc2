// Google Analytics 4 & AdSense Configuration
// This file contains the centralized Google Analytics and AdSense setup for soc2certification.com

(function() {
    // --- Google Analytics Setup ---

    // Google Analytics tracking ID
    const GA_TRACKING_ID = 'G-VN3PSRTQVN';

    // Create and append the gtag script
    const gaScript = document.createElement('script'); // Renamed to 'gaScript' for clarity
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(gaScript);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    // Configure Google Analytics
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    // Make gtag available globally for any custom tracking
    window.gtag = gtag;

    // --- Google AdSense Setup (Newly Added) ---

    // Create and append the AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8867957435059194';
    adsenseScript.crossOrigin = 'anonymous'; // Use 'crossOrigin' (with a capital 'O') in JavaScript
    document.head.appendChild(adsenseScript);

})();
