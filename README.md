LibreTranslator.js
=========

A small lightweight api wrapper for libreTranslate.

## Installation

  `npm install LibreTranslator.js`

## Usage
    ```javascript
    const libretranslate = require('LibreTranslator.js');
    var ToTranslate = "Hola amigos!";
    
    libretranslate.DetectLanguage(ToTranslate).then((v) => {
        libretranslate.Translate(ToTranslate, {code: v[0].language}, {code: "fr"}).then((v) => {
            console.log(v);
        });
    })
    ```
  
  
Output should be `Bonjour les amis !`