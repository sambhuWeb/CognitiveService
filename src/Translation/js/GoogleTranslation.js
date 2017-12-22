class GoogleTranslation {
    constructor(sourceText, sourceLanguage, targetLanguage) {
        this.sourceText = sourceText;
        this.sourceLanguage = sourceLanguage;
        this.targetLanguage = targetLanguage;
    }

    getTranslation(callback) {
        let encodedUrl = encodeURI('https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + this.sourceLanguage + '&tl=' + this.targetLanguage + '&dt=t&q=' + this.sourceText);

        console.log(encodedUrl);
        
        let request = new XMLHttpRequest();
        //let request = this.request;
        request.open('GET', encodedUrl, true);

        // this following line is needed to tell the server this is a ajax request
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // this is where you can do something with the json response
                let json = JSON.parse(this.response);
                console.log('Json Data', json);

                let fullText = '';

                for (let data of json[0]) {
                    console.log('Translated : ', data[0]);
                    console.log('TranslatedText Property', fullText);
                    fullText = fullText +  data[0];                        
                }

                callback(fullText);
            }
        };
        request.send();        
    }

    setRequest(request) {
        this.request = request; 
    }
}


module.exports = GoogleTranslation;