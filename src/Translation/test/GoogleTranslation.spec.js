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
    // setUp: function () {
    //     this.xhr = sinon.useFakeXMLHttpRequest();
    //     var requests = this.requests = [];
    
    //     this.xhr.onCreate = function (xhr) {
    //         requests.push(xhr);
    //     };
    // },
    
    // tearDown: function () {
    //     this.xhr.restore();
    // },


     beforeEach(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();
        let requests = this.requests = [];
    
        this.xhr.onCreate = function (xhr) {
            this.requests.push(xhr);
        }.bind(this);
      });
     
      afterEach(function() {
        this.xhr.restore();
      });
    // const mock = require('xhr-mocklet');
    // mock.setup();

    // let xhr, requests;
    
    // beforeEach(function() {
    //     this.xhr = sinon.useFakeXMLHttpRequest();
     
    //     this.requests = [];
    //     this.xhr.onCreate = function(xhr) {
    //       this.requests.push(xhr);
    //     }.bind(this);
    //   });
     
    //   afterEach(function() {
    //     this.xhr.restore();
    //   });

    it('it should translate "How are you" from English to Nepali', () => {
        //Given
        let sourceText = 'How are you';
        let sourceLanguage = 'en';
        let targetLanguage = 'ne';

        //When
        googleTranslation = new GoogleTranslation(sourceText, sourceLanguage, targetLanguage);
        let actualTargetText = googleTranslation.getTranslation(function() {
            expect(actualTargetText).to.equal('तिमीलाई कस्तो छ');
        });

        //Then
        // 
    });    

});
