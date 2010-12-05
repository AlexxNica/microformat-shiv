﻿/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/

function ufadr(node) {
    if (node) {
        ufShiv.parser.newMicroformat(this, node, "adr", validate);
    }
}

var ufadr_definition = {
    mfObject: ufadr,
    className: "adr",
    properties: {
        "type": {
            plural: true,
            values: ["work", "home", "pref", "postal", "dom", "intl", "parcel"]
        },
        "post-office-box": {
        },
        "street-address": {
            plural: true
        },
        "extended-address": {
        },
        "locality": {
        },
        "region": {
        },
        "postal-code": {
        },
        "country-name": {
        }
    }
};

ufShiv.add("adr", ufadr_definition);


function ufhCard(node) {
    if (node) {
        ufShiv.parser.newMicroformat(this, node, "hCard", validate);
    }
}


var ufhCard_definition = {
    mfObject: ufhCard,
    className: "vcard",
    required: ["fn"],
    properties: {
        "adr": {
            plural: true,
            datatype: "microformat",
            microformat: "adr"
        },
        "agent": {
            plural: true,
            datatype: "microformat",
            microformat: "hCard"
        },
        "bday": {
            datatype: "dateTime"
        },
        "class": {
    },
    "category": {
        plural: true,
        datatype: "microformat",
        microformat: "tag",
        microformat_property: "tag"
    },
    "email": {
        subproperties: {
            "type": {
                plural: true,
                values: ["internet", "x400", "pref"]
            },
            "value": {
                datatype: "email",
                virtual: true
            }
        },
        plural: true
    },
    "fn": {
        required: true,
        virtual: true,
        virtualGetter: function (mfnode) {
            /* Changed to DOM based query - Glenn Jones */
            var givenName = ufShiv.getElementsByClassName(mfnode, "given-name");
            var additionalName = ufShiv.getElementsByClassName(mfnode, "additional-name");
            var familyName = ufShiv.getElementsByClassName(mfnode, "family-name");
            var fn = '';

            if (ufShiv.getTextContent(givenName) != undefined)
                fn += givenName + ' ';

            if (ufShiv.getTextContent(additionalName) != undefined)
                fn += additionalName + ' ';

            if (ufShiv.getTextContent(familyName) != undefined)
                fn += familyName + ' ';


            if (fn != '')
                return fn.substring(0, fn.length - 1);
            else
                return undefined;

        }
    },
    "geo": {
        datatype: "microformat",
        microformat: "geo"
    },
    "key": {
        plural: true
    },
    "label": {
        plural: true
    },
    "logo": {
        plural: true,
        datatype: "anyURI"
    },
    "mailer": {
        plural: true
    },
    "n": {
        subproperties: {
            "honorific-prefix": {
                plural: true
            },
            "given-name": {
                plural: true
            },
            "additional-name": {
                plural: true
            },
            "family-name": {
                plural: true
            },
            "honorific-suffix": {
                plural: true
            }
        },
        virtual: true,
        /*  Implied "n" Optimization */
        /* http://microformats.org/wiki/hcard#Implied_.22n.22_Optimization */
        virtualGetter: function (mfnode) {
            var fn = ufShiv.parser.getMicroformatProperty(mfnode, "hCard", "fn");
            var orgs = ufShiv.parser.getMicroformatProperty(mfnode, "hCard", "org");
            var given_name = [];
            var family_name = [];
            if (fn && (!orgs || (orgs.length > 1) || (fn != orgs[0]["organization-name"]))) {
                var fns = fn.split(" ");
                if (fns.length === 2) {
                    if (fns[0].charAt(fns[0].length - 1) == ',') {
                        given_name[0] = fns[1];
                        family_name[0] = fns[0].substr(0, fns[0].length - 1);
                    } else if (fns[1].length == 1) {
                        given_name[0] = fns[1];
                        family_name[0] = fns[0];
                    } else if ((fns[1].length == 2) && (fns[1].charAt(fns[1].length - 1) == '.')) {
                        given_name[0] = fns[1];
                        family_name[0] = fns[0];
                    } else {
                        given_name[0] = fns[0];
                        family_name[0] = fns[1];
                    }
                    return { "given-name": given_name, "family-name": family_name };
                }
            }
            return undefined;
        }
    },
    "nickname": {
        plural: true,
        virtual: true,
        /* Implied "nickname" Optimization */
        /* http://microformats.org/wiki/hcard#Implied_.22nickname.22_Optimization */
        virtualGetter: function (mfnode) {
            var fn = ufShiv.parser.getMicroformatProperty(mfnode, "hCard", "fn");
            var orgs = ufShiv.parser.getMicroformatProperty(mfnode, "hCard", "org");
            var given_name;
            var family_name;
            if (fn && (!orgs || (orgs.length) > 1 || (fn != orgs[0]["organization-name"]))) {
                var fns = fn.split(" ");
                if (fns.length === 1) {
                    return [fns[0]];
                }
            }
            return undefined;
        }
    },
    "note": {
        plural: true,
        datatype: "HTML"
    },
    "org": {
        subproperties: {
            "organization-name": {
                virtual: true
            },
            "organization-unit": {
                plural: true
            }
        },
        plural: true
    },
    "photo": {
        plural: true,
        datatype: "anyURI"
    },
    "rev": {
        datatype: "dateTime"
    },
    "role": {
        plural: true
    },
    "sequence": {
},
"sort-string": {
},
"sound": {
    plural: true
},
"title": {
    plural: true
},
"tel": {
    subproperties: {
        "type": {
            plural: true,
            values: ["msg", "home", "work", "pref", "voice", "fax", "cell", "video", "pager", "bbs", "car", "isdn", "pcs"]
        },
        "value": {
            datatype: "tel",
            virtual: true
        }
    },
    plural: true
},
"tz": {
},
"uid": {
    datatype: "anyURI"
},
"url": {
    plural: true,
    datatype: "anyURI"
}
}
};

ufShiv.add("hCard", ufhCard_definition);

function ufhCalendar(node) {
    if (node) {
        ufShiv.parser.newMicroformat(this, node, "hCalendar", validate);
    }
}


var ufhCalendar_definition = {
    mfObject: ufhCalendar,
    className: "vevent",
    required: ["summary", "dtstart"],
    properties: {
        "category": {
            plural: true,
            datatype: "microformat",
            microformat: "tag",
            microformat_property: "tag"
        },
        "class": {
            values: ["public", "private", "confidential"]
        },
        "description": {
            datatype: "HTML"
        },
        "dtstart": {
            datatype: "dateTime"
        },
        "dtend": {
            datatype: "dateTime",
            virtual: true,
            /* This will only be called in the virtual case */
            /* If we got here, we have a dtend time without date */
            virtualGetter: function (mfnode) {
                var dtends = ufShiv.getElementsByClassName(mfnode, "dtend");
                if (dtends.length == 0) {
                    return undefined;
                }
                var dtend = ufShiv.parser.dateTimeGetter(dtends[0], mfnode, true);
                var dtstarts = ufShiv.getElementsByClassName(mfnode, "dtstart");
                if (dtstarts.length > 0) {
                    var dtstart = ufShiv.parser.dateTimeGetter(dtstarts[0], mfnode);
                    if (dtstart.match("T")) {
                        return ufShiv.parser.normalizeISO8601(dtstart.split("T")[0] + "T" + dtend);
                    }
                }
                return undefined;
            }
        },
        "dtstamp": {
            datatype: "dateTime"
        },
        "duration": {
    },
    "geo": {
        datatype: "microformat",
        microformat: "geo"
    },
    "location": {
        datatype: "microformat",
        microformat: "hCard"
    },
    "status": {
        values: ["tentative", "confirmed", "cancelled"]
    },
    "summary": {},
    "transp": {
        values: ["opaque", "transparent"]
    },
    "uid": {
        datatype: "anyURI"
    },
    "url": {
        datatype: "anyURI"
    },
    "last-modified": {
        datatype: "dateTime"
    },
    "rrule": {
        subproperties: {
            "interval": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "interval");
                }
            },
            "freq": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "freq");
                }
            },
            "bysecond": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "bysecond");
                }
            },
            "byminute": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "byminute");
                }
            },
            "byhour": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "byhour");
                }
            },
            "bymonthday": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "bymonthday");
                }
            },
            "byyearday": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "byyearday");
                }
            },
            "byweekno": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "byweekno");
                }
            },
            "bymonth": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "bymonth");
                }
            },
            "byday": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "byday");
                }
            },
            "until": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "until");
                }
            },
            "count": {
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (mfnode) {
                    return ufShiv.hCalendar.properties.rrule.retrieve(mfnode, "count");
                }
            }
        },
        retrieve: function (mfnode, property) {
            var value = ufShiv.parser.textGetter(mfnode);
            var rrule;
            rrule = value.split(';');
            for (var i = 0; i < rrule.length; i++) {
                if (rrule[i].match(property)) {
                    return rrule[i].split('=')[1];
                }
            }
            return undefined;
        }
    }
}
};

ufShiv.add("hCalendar", ufhCalendar_definition);





function ufgeo(node) {
    if (node) {
        ufShiv.parser.newMicroformat(this, node, "geo", validate);
    }
}


var ufgeo_definition = {
    mfObject: ufgeo,
    className: "geo",
    required: ["latitude", "longitude"],
    properties: {
        "latitude": {
            datatype: "float",
            virtual: true,
            /* This will only be called in the virtual case */
            virtualGetter: function (mfnode) {
                var value = ufShiv.parser.textGetter(mfnode);
                var latlong;
                if (value && value.match(';')) {
                    latlong = value.split(';');
                    if (latlong[0]) {
                        if (!isNaN(latlong[0])) {
                            return parseFloat(latlong[0]);
                        }
                    }
                }
                return undefined;
            }
        },
        "longitude": {
            datatype: "float",
            virtual: true,
            /* This will only be called in the virtual case */
            virtualGetter: function (mfnode) {
                var value = ufShiv.parser.textGetter(mfnode);
                var latlong;
                if (value && value.match(';')) {
                    latlong = value.split(';');
                    if (latlong[1]) {
                        if (!isNaN(latlong[1])) {
                            return parseFloat(latlong[1]);
                        }
                    }
                }
                return undefined;
            }
        }
    }
};

ufShiv.add("geo", ufgeo_definition);

function uftag(node) {
    if (node) {
        ufShiv.parser.newMicroformat(this, node, "tag", validate);
    }
}


var uftag_definition = {
    mfObject: uftag,
    attributeName: "rel",
    attributeValues: "tag",
    properties: {
        "tag": {
            virtual: true,
            virtualGetter: function (mfnode) {
                if (mfnode.href) {
                    var href = mfnode.href.split("?")[0].split("#")[0];
                    var url_array = href.split("/");
                    for (var i = url_array.length - 1; i > 0; i--) {
                        if (url_array[i] !== "") {
                            var tag = ufShiv.tag.validTagName(url_array[i].replace(/\+/g, ' '));
                            if (tag) {
                                try {
                                    return decodeURIComponent(tag);
                                } catch (ex) {
                                    return unescape(tag);
                                }
                            }
                        }
                    }
                }
                return null;
            }
        },
        "link": {
            virtual: true,
            datatype: "anyURI"
        },
        "text": {
            virtual: true
        }
    },
    validTagName: function (tag) {
        var returnTag = tag;
        if (tag.indexOf('?') != -1) {
            if (tag.indexOf('?') === 0) {
                return false;
            } else {
                returnTag = tag.substr(0, tag.indexOf('?'));
            }
        }
        if (tag.indexOf('#') != -1) {
            if (tag.indexOf('#') === 0) {
                return false;
            } else {
                returnTag = tag.substr(0, tag.indexOf('#'));
            }
        }
        if (tag.indexOf('.html') != -1) {
            if (tag.indexOf('.html') == tag.length - 5) {
                return false;
            }
        }
        return returnTag;
    }
};

ufShiv.add("tag", uftag_definition);




function ufXFN(node) {
  if (node) {
    ufShiv.parser.newMicroformat(this, node, "XFN");
  }
}


var ufXFN_definition = {
  mfVersion: 0.8,
  description: "XFN Relationship(s)",
  mfObject: ufXFN,
  attributeName: "rel",
  attributeValues: "contact acquaintance friend met co-worker colleague " +
                   "co-resident neighbor child parent sibling spouse kin " +
                   "muse crush date sweetheart me",
  properties: {
    "contact" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "contact");
      }
    },
    "acquaintance" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "acquaintance");  
      }
    },
    "friend" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "friend");  
      }
    },
    "met" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "met");  
      }
    },
    "co-worker" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "co-worker");  
      }
    },
    "colleague" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "colleague");  
      }
    },
    "co-resident" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "co-resident");  
      }
    },
    "neighbor" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "neighbor");  
      }
    },
    "child" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "child");  
      }
    },
    "parent" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "parent");  
      }
    },
    "sibling" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "sibling");  
      }
    },
    "spouse" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "spouse");  
      }
    },
    "kin" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "kin");  
      }
    },
    "muse" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "muse");  
      }
    },
    "crush" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "crush");  
      }
    },
    "date" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "date");  
      }
    },
    "sweetheart" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "sweetheart");  
      }
    },
    "me" : {
      virtual: true,
      virtualGetter: function(propnode, mfnode, definition) {
        return ufXFN_definition.getXFNStatus(propnode, "me");  
      }
    },
    "link" : {
      virtual: true,
      datatype: "anyURI"
    },
    "text" : {
      virtual: true
    }
  },
  getXFNStatus: function(propnode, relationship)
  {
    var rel = propnode.getAttribute("rel");
    if (rel.match("(^|\\s)" + relationship + "(\\s|$)")) {
      return true;
    }
    return false;
  }
};

ufShiv.add("XFN", ufXFN_definition);


