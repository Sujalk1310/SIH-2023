import React, { useEffect } from 'react';

const GoogleTranslate = ({ lang }) => {
  useEffect(() => {
    function googleTranslateElementInit() {
      window.google.translate.TranslateElement(
        {
          pageLanguage: 'en', // Set the default language to English
        },
        'google_translate_element'
      );
    }

    window.onload = function () {
      googleTranslateElementInit();
      var select = document.querySelector(".goog-te-combo");
      // Delay setting the language to English
      setTimeout(() => {
        var select = document.querySelector(".goog-te-combo");
        select.value = lang;
        select.dispatchEvent(new Event("change")); // Trigger the change event
      }, 1000);
      select.value = lang;
      select.dispatchEvent(new Event("change")); 
    };
  }, [lang]);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
