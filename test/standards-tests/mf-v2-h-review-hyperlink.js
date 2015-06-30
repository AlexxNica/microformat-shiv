/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-review/hyperlink
The test was built on Tue Jun 30 2015 19:18:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-review', function() {
   var htmlFragment = "<a class=\"h-review\" href=\"https://plus.google.com/116941523817079328322/about\">Crepes on Cole</a>";
   var found = helper.parseHTML(htmlFragment,'http://example.com/');
   var expected = {"items":[{"type":["h-review"],"properties":{"name":["Crepes on Cole"],"url":["https://plus.google.com/116941523817079328322/about"]}}],"rels":{},"rel-urls":{}};

   it('hyperlink', function(){
       assert.deepEqual(found, expected);
   });
});