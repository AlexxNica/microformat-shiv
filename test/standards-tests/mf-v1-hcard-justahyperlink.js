/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.21 
Mocha integration test from: microformats-v1/hcard/justahyperlink
The test was built on Thu Aug 20 2015 15:27:29 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hcard', function() {
   var htmlFragment = "<a class=\"vcard\" href=\"http://benward.me/\">Ben Ward</a>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Ben Ward"],"url":["http://benward.me/"]}}],"rels":{},"rel-urls":{}};

   it('justahyperlink', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
