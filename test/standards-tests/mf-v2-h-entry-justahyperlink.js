/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-entry/justahyperlink
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-entry', function() {
   var htmlFragment = "<a class=\"h-entry\" href=\"http://microformats.org/2012/06/25/microformats-org-at-7\">microformats.org at 7</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-entry"],"properties":{"name":["microformats.org at 7"],"url":["http://microformats.org/2012/06/25/microformats-org-at-7"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
       assert.deepEqual(found, expected);
   });
});