"use strict";
cc._RFpush(module, '11e1eOHLqJEv4JbApSbm/zQ', 'alert');
// js\wupin\userJiNengShu\alert.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.canceldialog();
    },
    canceldialog: function canceldialog(event) {
        cc.find("Canvas/alert").active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();