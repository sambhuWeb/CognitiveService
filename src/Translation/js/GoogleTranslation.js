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
        //request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
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

    /**
     * Request Status:
        suhttps://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started
        The full list of the readyState values is documented at XMLHTTPRequest.readyState and is as follows:

        0 (uninitialized) or (request not initialized)
        1 (loading) or (server connection established)
        2 (loaded) or (request received)
        3 (interactive) or (processing request)
        4 (complete) or (request finished and response is ready)
     */
    promiseTranslation() {
        let sourceLanguage = this.sourceLanguage; 
        let targetLanguage = this.targetLanguage;
        let sourceText = this.sourceText;
        // Return a new promise.
        return new Promise(function(resolve, reject) {            
            let encodedUrl = encodeURI('https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguage + '&tl=' + targetLanguage + '&dt=t&q=' + sourceText);

            // Do the usual XHR stuff
            let request = new XMLHttpRequest();
            request.open('GET', encodedUrl);
            // request.open('GET', 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ne&dt=t&q=How%20are%20you');

            request.onreadystatechange = function() {
                // This is called even on 404 etc
                // so check the status
                if (request.status == 200) {
                    let json = JSON.parse(request.response);
                    let fullText = '';
                    for (let data of json[0]) {                    
                        fullText = fullText +  data[0];                        
                    }

                    console.log('Full Text', fullText);

                    // Resolve the promise with the response text
                    resolve(fullText);
                } else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject('Rejected !' + request.status);
                }
            };

            // Handle network errors
            request.onerror = function() {
              reject(Error("Network Error"));
            };

            // Make the request
            request.send();
        });
    }

    setRequest(request) {
        this.request = request; 
    }
}


module.exports = GoogleTranslation;