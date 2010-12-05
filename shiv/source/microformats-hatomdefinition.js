﻿/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/

/* 
For this definition hAtom is broken into hFeed and hEntry 
This definition is simplistic and does not fully conform to the wiki specification
*/


function ufhFeed(node) {
  if (node) {
    ufShiv.parser.newMicroformat(this, node, "hFeed");
  }
}

function ufhEntry(node) {
  if (node) {
    ufShiv.parser.newMicroformat(this, node, "hEntry");
  }
}


var ufhEntry_definition = {
  mfObject: ufhEntry,
  className: "hentry",
  properties: {
    "author": {
        plural: true,
        datatype: "microformat",
        microformat: "hCard"
    },
    "bookmark" : {
      subproperties: {
        "link" : {
          virtual: true,
          datatype: "anyURI"
        },
        "text" : {
          virtual: true
        }
      },
      rel: true
    },
    "entry-title" : {},
    "entry-content" : {
      plural: true
    },
    "entry-summary" : {
      plural: true
    },
    "published" : {
      datatype: "dateTime"
    },
    "updated" : {
      virtual: true,
      datatype: "dateTime",
      virtualGetter: function(mfnode) {
        return ufShiv.parser.getMicroformatProperty(mfnode, "hEntry", "published");
      }
    },
    "tag": {
    plural: true,
      rel: true,
      datatype: "microformat",
      microformat: "tag"
    }
  }
};

var ufhFeed_definition = {
  mfObject: ufhFeed,
  className: "hfeed",
  alternateClassName: "hentry",
  properties: {
    "author" : {
      plural: true,
      datatype: "microformat",
      microformat: "hCard"
    },
    "tag": {
    plural: true,
      rel: true,
      datatype: "microformat",
      microformat: "tag"
    }
  }
};

ufShiv.add("hEntry", ufhEntry_definition);
ufShiv.add("hFeed", ufhFeed_definition);



