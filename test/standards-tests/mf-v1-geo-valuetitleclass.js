/*
Microformats Test Suite - Downloaded from github repo: microformats/tests version v0.1.23 
Mocha integration test from: microformats-v1/geo/valuetitleclass
The test was built on Wed Sep 09 2015 15:51:39 GMT+0100 (BST)
*/

assert = chai.assert;


describe('geo', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<p>\n    <span class=\"geo\">\n        <span class=\"latitude\">\n            <span class=\"value-title\" title=\"51.513458\">N 51° 51.345</span>, \n        </span>\n        <span class=\"longitude\">\n            <span class=\"value-title\" title=\"-0.14812\">W -0° 14.812</span>\n        </span>\n    </span>\n</p>";
   var expected = {"items":[{"type":["h-geo"],"properties":{"latitude":["51.513458"],"longitude":["-0.14812"]}}],"rels":{},"rel-urls":{}};

   it('valuetitleclass', function(){
       var doc, dom, node, options, parser, found;
       dom = new DOMParser();
       doc = dom.parseFromString( htmlFragment, 'text/html' );
       options ={
       		'document': doc,
       		'node': doc,
       		'baseUrl': 'http://example.com',
       		'dateFormat': 'html5'
       };
       found = Microformats.get( options );
       assert.deepEqual(found, expected);
   });
});
