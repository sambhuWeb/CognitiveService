//Run Test: ./node_modules/.bin/mocha src --recursive

//See: https://code.tutsplus.com/tutorials/http-mock-testing-in-nodejs--cms-22836

let chai = require('chai'),
path = require('path');

// Tell chai that we'll be using the "should" style assertions.
chai.should();

let expect = require('chai').expect;
let GoogleTranslation = require(path.join(__dirname, '..', 'js/GoogleTranslation'));
let sinon = require('sinon');


describe('GoogleTranslation', function() {
    it('should exist', function() {
        expect(GoogleTranslation).to.not.be.undefined;
    });
});



describe('GoogleTranslation', () => {
    

    let googleTranslation;

    let xhr;
    let requests;

    //https://github.com/zandaqo/compago-ajax/blob/1.0.1/tests/unit.test.js#L38
    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      global.XMLHttpRequest = xhr;      
      requests = [];
      /* eslint no-shadow: 1*/
      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    });

    afterEach(() => {
      xhr.restore();
    });

    it('it should translate "How are you" from English to Nepali', async () => { // Don't forget 'done' here...

        //Given
        let sourceText = 'How are you';
        let sourceLanguage = 'en';
        let targetLanguage = 'ne';

        //When
        googleTranslation = new GoogleTranslation(sourceText, sourceLanguage, targetLanguage);


        const result = await googleTranslation.promiseTranslation();
        expect(result).to.equal('i fail');
    
        
        //or 

        // googleTranslation
        //     .promiseTranslation()
        //     .then((result) => {
        //         console.log('Result : ', result);
        //         expect(result).to.equal('i fail');
        //         done();
        //     }).catch(done);
    });

    //https://wietse.loves.engineering/testing-promises-with-mocha-90df8b7d2e35
    // it('it should translate "How are you" from English to Nepali', async () => {
    //     //Given
    //     let sourceText = 'How are you';
    //     let sourceLanguage = 'en';
    //     let targetLanguage = 'ne';

    //     //When
    //     googleTranslation = new GoogleTranslation(sourceText, sourceLanguage, targetLanguage);
    //     const translatedText = await googleTranslation.promiseTranslation();
    //     expect(translatedText).to.equal('तिमीलाई कस्तो छ');

    //      // return googleTranslation
    //      //    .promiseTranslation()
    //      //    .then((result) => {
    //      //        console.log(result);
    //      //        expect(result).to.equal('1llll तिमीलाई कस्तो छ');
                
    //      //    });


    //     // let actualTargetText = googleTranslation.getTranslation(function() {
    //     //     expect(actualTargetText).to.equal('तिमीलाई कस्तो छ');
    //     // });

    //     //Then
    //     // 
    // });    

});
