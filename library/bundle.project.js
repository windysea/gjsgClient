require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Alert":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0e956ZSwkNHppzQ8CKxUef7', 'Alert');
// js\common\Alert.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.RichText
    },

    /**
     * msg: 显示的内容
     * sureEvent: 确定按钮回调函数，没有传undefined或者null
     * cancelEvent: 返回按钮回调函数，没有传undefined或者null
     * suerParameter: 确定按钮回调函数参数
     * cancelParameter: 返回按钮回调函数参数
     */
    initAlert: function initAlert(msg, sureEvent, cancelEvent, suerParameter, cancelParameter) {
        this.text.string = msg;
        this.sureEvent = sureEvent;
        this.cancelEvent = cancelEvent;
        this.suerParameter = suerParameter;
        this.cancelParameter = cancelParameter;
    },

    sureClickEvent: function sureClickEvent() {
        if (this.sureEvent) {
            this.sureEvent(this.suerParameter);
        }
        this.node.destroy();
    },

    cancelClickEvnet: function cancelClickEvnet() {
        cc.log('cancelClickEvnet');
        if (this.cancelEvent) {
            this.cancelEvent(this.cancelParameter);
        }
        this.node.destroy();
    }
});

cc._RFpop();
},{}],"BankOrders":[function(require,module,exports){
"use strict";
cc._RFpush(module, '582d8LDSRxNo4wg0KNZXGe+', 'BankOrders');
// js\bank\BankOrders.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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

    //加载钱庄场景
    back: function back() {
        cc.director.loadScene('bank');
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"Bank":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b1a946mxvhBFbk/e+hnN4bE', 'Bank');
// js\bank\Bank.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        money_label: cc.Label
    },

    // 返回上一场景
    back: function back() {
        returnLast();
    },

    // 加载 银两取款 场景
    loadGetSilverScene: function loadGetSilverScene() {
        loadingScene('getSilver', 'bank');
    },

    // 加载 银两存款 场景
    loadSaveSilverScene: function loadSaveSilverScene() {
        loadingScene('saveSilver', 'bank');
    },

    // 加载 金砖取款 场景
    loadGetGoldScene: function loadGetGoldScene() {
        loadingScene('getGold', 'bank');
    },

    // 加载 金砖存款 场景
    loadSaveGoldScene: function loadSaveGoldScene() {
        loadingScene('saveGold', 'bank');
    },

    // 加载 求购金砖 场景
    loadBuyGoldScene: function loadBuyGoldScene() {
        loadingScene('buyGold', 'bank');
    },

    // 加载 出售金砖 场景
    loadSellGoldScene: function loadSellGoldScene() {
        loadingScene('sellGold', 'bank');
    },

    // 加载 订单记录 场景
    loadOrdersScene: function loadOrdersScene() {
        loadingScene('bankOrders', 'bank');
    },

    // 加载 金砖充值 场景
    loadRechargeGoldScene: function loadRechargeGoldScene() {
        loadingScene('rechargeGold', 'bank');
    },

    // 加载 查看金券 场景
    loadLookOverGoldCertificateScene: function loadLookOverGoldCertificateScene() {
        loadingScene('lookOverGoldCertificate', 'bank');
    },

    // 加载 金券充值 场景
    loadRechargeGoldCertificateScene: function loadRechargeGoldCertificateScene() {
        loadingScene('rechargeGoldCertificate', 'bank');
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajaxData(HxsgUrl.bankUrl, null, function (msg) {
            var money = msg.result; //拿到金银数据
            //存入全局变量
            Bank.bankGold = money.money.jin;
            Bank.bankSilver = money.money.yin;
            Bank.playerGold = money.role.jin;
            Bank.playerSilver = money.role.yin;

            self.money_label.string = "您目前有" + Bank.playerSilver + "两" + Bank.playerGold + "金砖";
        });
    }

});

cc._RFpop();
},{}],"BaoshiDetial":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5e6ffxDCHtGZ6E9EQ/cX+cZ', 'BaoshiDetial');
// js\wupin\baoshi\BaoshiDetial.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        nameLabel: cc.Label,
        levelLabel: cc.Label,
        xiaoguoLabel: cc.Label,
        jieshaoLabel: cc.Label,
        photo: cc.Sprite
    },

    // use self for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        self.initDetail();
        //curItemData
        ajaxData(HxsgUrl.baoshiItemUrl, { 'id': '315' }, self.initDetail);
    },

    initDetail: function initDetail(data) {
        if (data === undefined || data === null) {
            self.titleLabel.string = '';
            self.nameLabel.string = '';
            self.levelLabel.string = '';
            self.xiaoguoLabel.string = '';
            self.jieshaoLabel.string = '';
            self.photo.spriteFrame = null;
        } else {
            var msg = data.msg;
            self.titleLabel.string = msg.zwName;
            self.nameLabel.string = msg.zwName;
            self.levelLabel.string = msg.zwLevel;
            self.xiaoguoLabel.string = msg.zwXiaoGuo;
            self.jieshaoLabel.string = msg.zwMiaoShu;
            if (msg.zwUrl) {
                cc.loader.loadRes(msg.zwUrl, cc.SpriteFrame, function (err, tex) {
                    if (!err) {
                        self.photo.spriteFrame = tex;
                    }
                });
            }
            //Label因为内容修改height发生改变时，layout组件不会自动更新，可使用对组件所在节点height进行设置激活layout组件自动更新
            self.nameLabel.node.parent.height += 1;
        }
    },

    backEvent: function backEvent() {
        curItemData = null;
        returnLastScene(HxsgScenes.baoshi);
    }

    // called every frame, uncomment self function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"BuyGold":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a0d30G6o9dK+bQzYA9c1pQG', 'BuyGold');
// js\bank\BuyGold.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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

    //加载钱庄场景
    back: function back() {
        cc.director.loadScene('bank');
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"ChatButtonEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9d2f3RycMZJlq/bisnvOFyT', 'ChatButtonEvent');
// js\index\IndexChat\ChatButtonEvent.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        chatMng: cc.Node,
        speakPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.chatMng = this.chatMng.getComponent('ChatManager');
        this.canvas = cc.find('Canvas');
    },

    /**
     * 返回上一场景
     */
    backEvent: function backEvent() {
        var self = this;
        //返回
        cc.log('返回');
        returnLastScene(HxsgScenes.indexchat);
    },

    refreshEvent: function refreshEvent() {
        //刷新
        cc.log('刷新');
        this.chatMng.updataMessageData();
    },

    speakEvent: function speakEvent() {
        if (curChannel === 3) {
            cc.log('世界频道禁止发言');
            return; //世界频道禁止发言
        } else if (curChannel === 1) {
            //TODO:门派验证
            cc.log('门派系统还未开放');
        }
        //发言
        cc.log('发言');
        var speak = cc.instantiate(this.speakPrefab);
        speak.x = 0;
        speak.y = 0;
        this.canvas.addChild(speak);
    },

    /**
     * 进入聊天场景
     */
    viewClickEvent: function viewClickEvent() {
        cc.log('加载聊天页面');
        loadScene(HxsgScenes.indexchat, HxsgScenes.index);
    },

    hotkeyEvent: function hotkeyEvent() {
        cc.log('快捷键');
        //TODO:显示快捷键面板
    }

});

cc._RFpop();
},{}],"ChatLabelEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8599aZE08pMmqKifLuvtCR7', 'ChatLabelEvent');
// js\index\IndexChat\ChatLabelEvent.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        data: {
            default: null,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // this.richText = this.node.getComponent(cc.RichText);
    },

    /**
     * 聊天窗点击姓名的点击事件
     */
    clickNameEvent: function clickNameEvent() {
        cc.log('click id = ' + this.data);
        roleMsg.id = this.data.roleid;
        loadingScene(HxsgScenes.friendInfo, HxsgScenes.index);

        //TODO:点击事件
    },

    setMsg: function setMsg(data) {
        this.data = data;
        var time = this.dateToTime(data.data);
        this.node.getComponent(cc.RichText).string = this.buildRichText(time, data.rolename, data.message);
    },

    /**
     * 构造image的富文本字符串
     */
    richTextImage: function richTextImage(img) {
        return '<img src=\"' + img + '\"/>';
    },

    /**
     * 构造富文本内容
     */
    buildRichText: function buildRichText(time, name, msg) {
        var richText = time + ' <color=#FFFF00 click="clickNameEvent">' + name + '</c>:' + msg;
        // cc.log(name + 'richText = ' + richText);
        return richText;
    },

    /**
     * 日期格式转换-->小时：分钟
     */
    dateToTime: function dateToTime(date) {
        //p[i].data
        var d = new Date(date);
        var hh = d.getHours();
        var mm = d.getMinutes();
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (hh < 10) {
            hh = "0" + hh;
        }
        var times = hh + ":" + mm;
        return times;
    }
});

cc._RFpop();
},{}],"ChatManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7dee0GAIp9ABJ95V3fLoTA8', 'ChatManager');
// js\index\IndexChat\ChatManager.js

"use strict";

//当前频道下标：0、区；1、派；2、商；3、世，
//注意：与num值不同，频道channel是以下标0开始
window.curChannel = 2;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        chatPreab: cc.Prefab,
        content: cc.Node,
        tipColor: cc.Color, //新消息标识颜色/当前显示聊天页面的标题背景颜色
        btnbg: cc.Node,
        btnList: {
            default: [],
            type: cc.Button
        },
        labelList: {
            default: [],
            type: cc.Label
        },
        thisChannel: -1, //保存本实例的频道，用于与全局频道值比较
        dataList: [], //保存获取的聊天数据
        itemList: [] },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        self.updataMessageData();
        SocketEvents.updataChat = self.updateChannel;

        this.enemyPool = new cc.NodePool();
        var initCount = 20;
        for (var i = 0; i < initCount; ++i) {
            var enemy = cc.instantiate(this.chatPreab); // 创建节点
            this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }
        // var socket = new SocketHxsg('ddd');
        // socket.initWS();
    },

    onDestroy: function onDestroy() {
        SocketEvents.updataChat = null;
    },

    test: function test() {
        var data = {
            "id": 1198,
            "roleid": 1001, //游戏角色IDD
            "rolename": "awdawd", //角色名
            "message": "你是个好人！ <img src=\"f000\"/>", //信息
            "data": "Oct 10, 2016 2:00:12 PM" //时间
        };
        for (var i = 0; i < 3; i++) {
            this.createItem(data);
        }
    },

    /**
     * 获取/更新聊天数据
     */
    updataMessageData: function updataMessageData() {

        ajaxData(HxsgUrl.chatUrl, null, function (msg) {
            var totalMsg = msg.msg;
            for (var i = 0; i < totalMsg.length; i++) {
                var num = totalMsg[i][0];
                var keyMsg = totalMsg[i][1];
                self.dataList[num - 1] = keyMsg;
            }
            for (var i = 0; i < 20; i++) {
                var item = cc.instantiate(self.chatPreab);
                item.name = 'chat_' + i;
                self.content.addChild(item);
            }
            self.initChannel();
        });

        // $.ajax({
        //     type: 'GET',
        //     // url: "http://119.29.234.184:8080/hxsg/cocos2dIndex/chatMsg",//测试链接
        //     url: HxsgUrl.chatUrl,
        //     dataType: 'jsonp',
        //     jsonp: "jsonpCallback",
        //     success: function (msg) {
        //         //TODO:解析数据
        //         var totalMsg = msg.msg;
        //         for (var i = 0; i < totalMsg.length; i++) {
        //             var num = totalMsg[i][0];
        //             var keyMsg = totalMsg[i][1];
        //             self.dataList[num - 1] = keyMsg;
        //         }

        //         self.initChannel();
        //     },
        //     error: function () {
        //         cc.log('获取聊天信息数据失败');
        //     }
        // });
    },

    //--------------------聊天界面窗口管理
    /**
     * 初始化
     */
    initChannel: function initChannel() {
        //1、区；2、派；3、商；4、世
        //默认显示商
        // this.clearChat();
        for (var i = 0; i < 4; i++) {
            //动态绑定点击事件
            this.channelEvent(i);
        }
        this.changeChannel();
    },

    /**
     * 切换频道
     */
    changeChannel: function changeChannel() {
        //设置新的频道，背景移动到新频道下
        if (this.thisChannel !== curChannel) {
            this.updateBtnBgColor(curChannel);
            this.thisChannel = curChannel;
        }
        self.createItem();
        // this.clearChat();


        // self.content.addChild(item);
    },

    /**
     * 更新频道背景颜色
     * 频道
     * 是否当前频道
     */
    updateBtnBgColor: function updateBtnBgColor() {
        //移动背景
        var seq = cc.sequence(cc.moveTo(0.2, cc.p(this.btnList[curChannel].node.x, 0)).easing(cc.easeCubicActionOut(1)));
        this.btnbg.runAction(seq);
    },

    /**
     * 更新拼到文字颜色
     * 频道
     * 是否当前频道
     */
    updateBtnTextColor: function updateBtnTextColor(channel, isCurrent) {
        this.labelList[channel].node.color = isCurrent ? cc.Color.WHITE : this.tipColor;
    },

    /**
     * 注册按钮点击事件
     */
    channelEvent: function channelEvent(i) {
        var self = this;
        this.btnList[i].node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (curChannel === i) return;
            curChannel = i;
            self.labelList[i].node.color = cc.Color.WHITE;
            self.changeChannel();
            cc.log('click ' + curChannel);
        });
    },

    updateChannel: function updateChannel(channel, keyMsg) {
        cc.log(keyMsg);
        if (curChannel === channel) {
            self.dataList[channel] = keyMsg;
            self.changeChannel(channel);
        } else {
            self.dataList[channel] = keyMsg;
            self.updateBtnTextColor(channel, false);
        }
    },

    //--------------------

    /**
     * 创建聊天item
     */
    createItem: function createItem() {
        var items = self.content.children;
        cc.log(self.content.childrenCount);
        self.clearChat();
        for (var i = 0; i < 20; i++) {
            var data = this.dataList[curChannel][i];
            //data=eval("("+data+")");
            if (data != "" && data != null && typeof data != 'undefined') {
                var item = items[i];
                //自适应分辨率设置宽度，留出两边的空白,左右各20
                var richText = item.getComponent(cc.RichText);
                richText.maxWidth = self.content.width - 40;
                var itemComp = item.getComponent('ChatLabelEvent');
                itemComp.setMsg(data);
            } else {
                break;
            }
        }

        // var self = this;

        // // var item = cc.instantiate(self.chatPreab);
        // var item = this.enemyPool.get();
        // item.name = 'chat_' + data.id;
        // //自适应分辨率设置宽度，留出两边的空白,左右各20
        // var richText = item.getComponent(cc.RichText);
        // richText.maxWidth = self.content.width - 40;

        // var itemComp = item.getComponent('ChatLabelEvent');
        // itemComp.setMsg(data);

        // self.content.addChild(item);
        // self.itemList.push(item);
    },

    /**
     *  清空聊天列表
     */
    clearChat: function clearChat() {
        // this.content.removeAllChildren();
        for (var i = 0; i < this.itemList.length; i++) {
            this.enemyPool.put(this.itemList[i]);
            // this.itemList[i].destroy();
        }
        this.itemList = [];
    }
});

cc._RFpop();
},{}],"Emoji":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4919fB9L1REtovXCh2WmZ89', 'Emoji');
// js\index\emoji\Emoji.js

"use strict";

var emojis = ["f001", "f002", "f003", "f004", "f005", "f006", "f007", "f008", "f009", "f010", "f011", "f012", "f013", "f014", "f015", "f016", "f017", "f018", "f019", "f020", "f021", "f022", "f023"];

cc._RFpop();
},{}],"FujiangConfig":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b59bcdQ+jBKSrnaBT5Nn/H9', 'FujiangConfig');
// js\index\Fujiang\FujiangConfig.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        fujiangPrefab: cc.Prefab,
        getBtnPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        self.clearScrollview();
        ajaxData(HxsgUrl.fujiangConfigUrl, null, self.initFujiangConfig);
    },

    initFujiangConfig: function initFujiangConfig(data) {
        var msg = data.msg;
        // var msg = self.testInfo();
        for (var i = 0; i < msg.length; i++) {
            var item = cc.instantiate(self.fujiangPrefab);
            item.name = 'fujiangPrefab_' + i;
            item.getChildByName('fujiangLabel').getComponent('FujiangItem').init(i, msg[i]);
            self.content.addChild(item);
        }
        var getBtn = cc.instantiate(self.getBtnPrefab);
        getBtn.name = 'getBtnPrefab';
        getBtn.on(cc.Node.EventType.TOUCH_END, self.getBtnEvent, self);
        self.content.addChild(getBtn);
        self.content.height = 20 + self.content.height;
    },

    getBtnEvent: function getBtnEvent() {
        cc.log('获取能学技能的历史副将');
    },

    backEvent: function backEvent() {
        // cc.director.loadScene(HxsgScenes.index);
        returnLastScene(HxsgScenes.fujiang);
    },

    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    }

    // testInfo: function(){
    //     var msg = {
    //         "msg": [
    //             {
    //                 "fuId": 10512,
    //                 "name": "(1级)张邈",
    //                 "roleId": 1000,
    //                 "status": "休息"
    //             },
    //             {
    //                 "fuId": 10513,
    //                 "name": "(1级)吕布",
    //                 "roleId": 1000,
    //                 "status": "休息"
    //             },
    //             {
    //                 "fuId": 10610,
    //                 "name": "(1级)于 禁",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10397,
    //                 "name": "(41级)吕布",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10402,
    //                 "name": "(44级)于 禁",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10411,
    //                 "name": "(1级)刘氏",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10412,
    //                 "name": "(48级)张邈",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10670,
    //                 "name": "(12级)潘璋",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10671,
    //                 "name": "(1级)司马昭",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10672,
    //                 "name": "(1级)潘璋",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             },
    //             {
    //                 "fuId": 10673,
    //                 "name": "(1级)刘氏",
    //                 "roleId": 1000,
    //                 "status": "战斗"
    //             }
    //         ]
    //     }
    //     return msg;
    // }
});

cc._RFpop();
},{}],"FujiangItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5cf68SIMfpJ+LXifohwMZs7', 'FujiangItem');
// js\index\Fujiang\FujiangItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bgSprite: cc.Sprite,
        fujiangLabel: cc.RichText,
        zhanBtn: cc.Node,
        xiuBtn: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(index, data) {
        this.spriteToggle(index);

        this.data = data;

        var richString = '<color=#FFFFFF click="richTextEvent">' + data.name + '</color>';
        this.fujiangLabel.string = richString;
        this.zhanBtn.on("click", function (event) {
            ajaxUtils(HxsgUrl.setFjState, { 'id': this.data.fuId }, function (msg) {
                showAlert(msg, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                }, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                });
            });
        }, this);
        this.xiuBtn.on("click", function (event) {
            ajaxUtils(HxsgUrl.setFjState, { 'id': this.data.fuId }, function (msg) {
                showAlert(msg, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                }, function () {
                    loadingScene(HxsgScenes.fujiang, HxsgScenes.index);
                });
            });
        }, this);

        if (data.status === '休息') {
            this.zhanBtn.active = false;
        } else if (data.status = '战斗') {

            this.xiuBtn.active = false;
        }
    },

    /**
     * index奇偶数判断，奇数关闭sprite组件，显示背景明暗相间效果
     */
    spriteToggle: function spriteToggle(index) {
        var isOdd = index % 2 === 0 ? true : false;
        this.bgSprite.enabled = isOdd;
    },

    richTextEvent: function richTextEvent() {
        cc.log(this.node.parent.name + ' 详情');
        propCheckId = this.data.fuId;
        loadScene(HxsgScenes.fjxiangqing, HxsgScenes.fujiang);
    },

    zhanBtnEvent: function zhanBtnEvent() {

        cc.log(this.node.name + ' 出战');
    },

    xiuBtnEvent: function xiuBtnEvent() {
        cc.log(this.node.parent.name + ' 休息');
    }
});

cc._RFpop();
},{}],"FujiangXiangqing":[function(require,module,exports){
"use strict";
cc._RFpush(module, '97dd9t9R8VF+IBt0jbyPS4d', 'FujiangXiangqing');
// js\index\Fujiang\FujiangXiangqing.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        headSprite: cc.Sprite,
        nameLabel: cc.Label,
        idLabel: cc.Label,
        // zhanBtn: cc.Node,
        // xiuBtn: cc.Node,
        // zhanSet: {
        //     set: function (value) {
        //         if (value === '战斗') {
        //             this.zhanBtn.active = false;
        //         }
        //         else if (value === '休息') {
        //             this.xiuBtn = false;
        //         }
        //     }
        // },
        touxianLabel: cc.Label,
        zhiyeLabel: cc.Label,
        shengjiLabel: cc.Label,
        moqiLabel: cc.Label,
        zhongchengLabel: cc.Label,
        shuxingdianLabel: cc.Label,
        chakanBtn: cc.Node,
        fenpeiBtn: cc.Node,
        qixueLabel: cc.Label,
        jingliLabel: cc.Label,
        gongjiLabel: cc.Label,
        suduLabel: cc.Label,
        fangyuLabel: cc.Label,
        jinengLabel: cc.RichText,
        tianfuLabel: cc.Label,
        //headSprite: cc.Sprite,
        baowuMng: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        var data = { 'fuId': propCheckId };
        userWuPin.wupinId = propCheckId;
        ajaxData(HxsgUrl.fujiangXiangqingUrl, data, self.init);
    },

    init: function init(data) {
        var msg = data.msg;
        self.msg = msg;
        fujiang.fjmsg = msg;
        self.titleLabel.string = msg.name;
        cc.log(msg.imgUrl);
        //网络加载图片
        cc.loader.load(txUrl + msg.imgUrl, function (error, texture) {

            self.headSprite.spriteFrame = new cc.SpriteFrame(texture);
        });
        self.nameLabel.string = msg.name;
        self.idLabel.string = msg.id;
        // self.zhanSet = msg.states;
        self.touxianLabel.string = msg.touXian;
        self.zhiyeLabel.string = msg.zhiYe;
        self.shengjiLabel.string = msg.shengJiJingYan;
        self.moqiLabel.string = msg.moQiDu;
        self.zhongchengLabel.string = msg.zhongChengDu;
        var shuxingdian = msg.keyongds;
        if (shuxingdian <= 0) {
            self.fenpeiBtn.active = false;
            shuxingdian = 0;
        } else {
            self.chakanBtn.active = false;
        }
        self.shuxingdianLabel.string = shuxingdian;
        self.qixueLabel.string = msg.qiXue1 + '/' + msg.qiXue2;
        self.jingliLabel.string = msg.jingLi1 + '/' + msg.jingLi2;
        self.gongjiLabel.string = msg.gongJi;
        self.suduLabel.string = msg.suDu;
        //self.fangyuLabel.string = msg.fangYu;
        // self.jinengLabel.string = msg.jiNeng1 ? msg.jiNeng1 : '';
        self.jinengLabel.string = "";
        if (typeof msg.jiNeng != 'undefined') {
            var jnmsg = "";
            for (var i = 0; i < msg.jiNeng.length; i++) {
                //(1级)气冲斗牛熟练度【12000】  
                jnmsg += "(" + msg.jiNeng[i].level + "级" + ")" + msg.jiNeng[i].skillname + " 熟练度:【" + msg.jiNeng[i].shuliandu + "】<br/><br/>";
            }
            self.jinengLabel.string = jnmsg;
        }
    },

    // zhanEvent: function () {
    //
    // },
    //
    // xiuEvent: function () {
    //
    // },

    yanqingEvent: function yanqingEvent() {},

    jiangshangEvent: function jiangshangEvent() {},

    chakanEvent: function chakanEvent() {
        loadingScene(HxsgScenes.propertyCheck, HxsgScenes.fjxiangqing);
    },

    fenpeiEvent: function fenpeiEvent() {
        loadingScene(HxsgScenes.propertyDeal, HxsgScenes.fjxiangqing);
    },

    nengliEvent: function nengliEvent() {},

    peiyangEvent: function peiyangEvent() {
        loadingScene(HxsgScenes.chuZhiPy, HxsgScenes.fjxiangqing);
    },

    shengpingEvent: function shengpingEvent() {},

    jieguEvent: function jieguEvent() {},

    otherEvent: function otherEvent() {},

    backEvent: function backEvent() {
        // cc.director.loadScene(HxsgScenes.fujiang);
        returnLastScene(HxsgScenes.fjxiangqing);
    }
});

cc._RFpop();
},{}],"GGDetails":[function(require,module,exports){
"use strict";
cc._RFpush(module, '66437ahwn9AXrMy0LkN8EkH', 'GGDetails');
// js\gg\GGDetails.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        text: cc.Label
    },

    //加载公告列表场景
    back: function back() {
        returnLast();
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.title.string = GG.title;
        this.text.string = GG.text;
    }

});

cc._RFpop();
},{}],"GGItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '83f69+nZRVMcpiup2EGXjzs', 'GGItem');
// js\gg\GGItem.js

'use strict';

var item;

cc.Class({
    extends: cc.Component,
    properties: {
        newText: cc.Label,
        title: cc.Label
    },

    //初始化设置
    init: function init(gg) {
        this.item = gg;
        this.title.string = this.item.custom1;
    },

    //加载公告详情场景
    loadGGDetails: function loadGGDetails() {
        GG.title = this.item.custom1;
        GG.text = this.item.msg;
        loadingScene('ggDetails', 'ggList');
    },

    // use this for initialization
    onLoad: function onLoad() {}
});

cc._RFpop();
},{}],"GGList":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'be706fPWbRAs7Tod659Sztt', 'GGList');
// js\gg\GGList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        ggItem: {
            default: null,
            type: cc.Prefab,
            tooltip: "公告预制项"
        }
    },

    //返回上一场景
    back: function back() {
        returnLast();
    },

    onLoad: function onLoad() {
        var self = this;
        ajaxData(HxsgUrl.ggUrl, null, function (msg) {
            var array = msg.msg; //拿到公告数组
            var i = 0;
            for (i in array) {
                //遍历数组
                var item = cc.instantiate(self.ggItem); //实例化公告项预制
                item.getComponent('GGItem').init(array[i]); //初始化设置
                item.y -= i * 80; //设置位置
                if (i % 2 == 0) {
                    //若为双数，则显示sprite
                    item.getComponent('cc.Sprite').enabled = true;
                } else {
                    //若为单数，则禁用sprite
                    item.getComponent('cc.Sprite').enabled = false;
                }
                if (i > 5) {
                    //前6项显示“新”
                    item.getComponent('GGItem').newText.enabled = false;
                }
                self.node.addChild(item);
                self.node.height += 80;
            }
        });
    }

});

cc._RFpop();
},{}],"GetGold":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e4358QaZm1Cv6fGYV7VI0Ad', 'GetGold');
// js\bank\GetGold.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerGold_label: cc.Label,
        bankGold_label: cc.Label,
        getGold_editbox: cc.EditBox
    },

    //返回钱庄场景
    back: function back() {
        returnLast();
    },

    //取款记录
    getRecord: function getRecord() {},

    //确认取款
    getConfirm: function getConfirm() {
        var self = this;
        var getDate = {
            "status": "del", //该参数有add(存款),del(取款)
            "jin": this.getGold_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, getDate, function (msg) {
            self.back();
            showAlert(msg.result);
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerGold_label.string = "您目前有" + Bank.playerGold + "金砖";
        this.bankGold_label.string = "钱庄存款" + Bank.bankGold + "金砖";
    }

});

cc._RFpop();
},{}],"GetSilver":[function(require,module,exports){
"use strict";
cc._RFpush(module, '66c60w2DQ5MloDzk8Cuc2ex', 'GetSilver');
// js\bank\GetSilver.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerSilver_label: cc.Label,
        bankSilver_label: cc.Label,
        getSilver_editbox: cc.EditBox
    },

    //返回钱庄场景
    back: function back() {
        returnLast();
    },

    //取款记录
    getRecord: function getRecord() {},

    //确认取款
    getConfirm: function getConfirm() {
        var self = this;
        var getDate = {
            "status": "del", //该参数有add(存款),del(取款)
            "yin": this.getSilver_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, getDate, function (msg) {

            showAlert(msg.result, self.back());
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerSilver_label.string = "您目前有" + Bank.playerSilver + "两";
        this.bankSilver_label.string = "钱庄存款" + Bank.bankSilver + "两";
    }

});

cc._RFpop();
},{}],"GongnengPanel":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ffd65j2VSdCjIF5yU4rUyqJ', 'GongnengPanel');
// js\index\IndexPanel\GongnengPanel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    zhuangtaiEvent: function zhuangtaiEvent() {
        cc.log('gongneng panel 状态');
        loadScene(HxsgScenes.role, HxsgScenes.index);
    },

    wupinEvent: function wupinEvent() {
        cc.log('gongneng panel 物品');
        var scene = cc.director.getScene().name;
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    },

    fujiangEvent: function fujiangEvent() {
        cc.log('gongneng panel 副将');
        loadScene(HxsgScenes.fujiang, HxsgScenes.index);
    },

    zuduiEvent: function zuduiEvent() {
        cc.log('gongneng panel 组队');
    },

    paihangEvent: function paihangEvent() {
        cc.log('gongneng panel 排行');
    },

    haoyouEvent: function haoyouEvent() {
        cc.log('gongneng panel 好友');
        loadScene(HxsgScenes.friends, HxsgScenes.index);
    },

    youjianEvent: function youjianEvent() {
        cc.log('gongneng panel 邮件');
    },

    renwuEvent: function renwuEvent() {
        cc.log('gongneng panel 任务');
    },

    leitaiEvent: function leitaiEvent() {
        cc.log('gongneng panel 擂台');
    },

    jiaopaiEvent: function jiaopaiEvent() {
        cc.log('gongneng panel 教派');
    },

    xunlianEvent: function xunlianEvent() {
        loadingScene(HxsgScenes.xunLian, HxsgScenes.index);
        cc.log('gongneng panel 训练');
    },

    baokuEvent: function baokuEvent() {
        cc.log('gongneng panel 宝库');
    },

    gonggaoEvent: function gonggaoEvent() {
        cc.log('gongneng panel 公告');
        loadScene(HxsgScenes.ggList, HxsgScenes.index);
    },

    gonglueEvent: function gonglueEvent() {
        cc.log('gongneng panel 攻略');
    },

    dengchuEvent: function dengchuEvent() {
        cc.log('gongneng panel 登出');
    }
});

cc._RFpop();
},{}],"HistoryItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '81e1aZRNM9Aj74aJK4vD3Na', 'HistoryItem');
// js\gc\HistoryItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.msg.string = '';
    },

    setMsg: function setMsg(msgStr) {
        this.msg.string = msgStr;
    }

});

cc._RFpop();
},{}],"HistoryManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0d1b6qqQydIpYFON6JxEy9y', 'HistoryManager');
// js\gc\HistoryManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node,
        leftContent: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajaxData(HxsgUrl.historyUrl, null, function (msg) {

            var p = msg.msg;
            //alert(p);
            for (var i = 0; i < p.length; i++) {
                //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                var item = cc.instantiate(self.itemPrefab);
                self.leftContent.addChild(item);
                item.x = 0;
                item.y = -1 * i * item.height;
                item.name = 'history' + i;
                self.content.height = (i + 1) * item.height;

                item = item.getComponent('HistoryItem');
                var labelStr = "第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "\t\t" + p[i].result;
                item.setMsg(labelStr);
            }
        });
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    }

});

cc._RFpop();
},{}],"HotkeyBoard":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fb22eZvDR9GJZsUgs+0Y6kI', 'HotkeyBoard');
// js\index\HotkeyBoard.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        speakPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.canvas = cc.find('Canvas');
    },

    haoyouEvent: function haoyouEvent() {
        cc.log('index hotkey 好友');
    },

    wupinEvent: function wupinEvent() {
        cc.log('index hotkey 物品');
    },

    xiaoxiEvent: function xiaoxiEvent() {
        cc.log('index hotkey 消息');
    },

    paihangEvent: function paihangEvent() {
        cc.log('index hotkey 排行');
    },

    renwuEvent: function renwuEvent() {
        cc.log('index hotkey 任务');
    },

    fujiangEvent: function fujiangEvent() {
        cc.log('index hotkey 副将');
    },

    youjianEvent: function youjianEvent() {
        cc.log('index hotkey 邮件');
    },

    baokuEvent: function baokuEvent() {
        cc.log('index hotkey 宝库');
    },

    wanjiaEvent: function wanjiaEvent() {
        cc.log('index hotkey 玩家');
    },

    gengduoEvent: function gengduoEvent() {
        cc.log('index hotkey 更多');
    },

    pindaoEvent: function pindaoEvent() {
        cc.log('index hotkey 频道');
    },

    fayanEvent: function fayanEvent() {
        cc.log('index hotkey 发言');

        if (curChannel === 3) {
            cc.log('世界频道禁止发言');
            return; //世界频道禁止发言
        } else if (curChannel === 1) {
            //TODO:门派验证
            cc.log('门派系统还未开放');
        }
        //发言
        cc.log('发言');
        var speak = cc.instantiate(this.speakPrefab);
        speak.x = 0;
        speak.y = 0;
        this.canvas.addChild(speak);
    },

    backEvent: function backEvent() {
        cc.log('index hotkey 返回');
        this.node.active = false;
    }
});

cc._RFpop();
},{}],"IndexFujiangButton":[function(require,module,exports){
"use strict";
cc._RFpush(module, '672b1ifHXRJI778aHF8Zdau', 'IndexFujiangButton');
// js\index\IndexPlayer\IndexFujiangButton.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.head = this.node.getComponent(cc.Sprite);
        this.head.spriteFrame = null;
        this.id = -1;
    },

    clickEvent: function clickEvent() {
        if (this.id < 0) return;
        //TODO:点击事件
    },

    setHead: function setHead(data) {
        this.id = data.id;
        var headUrl = data.touxiang;
        headUrl = headName.substring(headName.lastIndexOf('/') + 1, headName.lastIndexOf('.'));
        this.headUrl = 'touxiang/' + headName;
        cc.loader.loadRes(this.headUrl, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                this.head.spriteFrame = spriteFrame;
            }
        });
    }
});

cc._RFpop();
},{}],"IndexManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '771d9R6U5lG8LZXLXCaqd8C', 'IndexManager');
// js\index\IndexManager.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        playerStatus: cc.Node,
        nearbyPlayer: cc.Node,
        chatMng: cc.Node,
        hotkeyBoard: cc.Node
        //menuPanel: cc.Node,
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        self.playerStatus = self.playerStatus.getComponent('PlayerStatus');
        //缓存在本地
        if (indexhgRoleMsg.id == 0) {
            if (indexHg.indexroleMsgUrl != null && indexHg.indexroleMsgUrl != "" && typeof indexHg.indexroleMsgUrl != 'undefined') {
                self.initIndexroleMsgUrl();
            } else {
                ajaxData(HxsgUrl.indexroleMsgUrl, null, function (msg) {
                    indexHg.indexroleMsgUrl = msg;
                    self.initIndexroleMsgUrl();
                    SocketEvents.updateRoleMsgEvent();
                });
            }
        } else {
            self.playerStatus.initPlayer(indexhgRoleMsg.roleMsg);
            self.startWebsocket(role.id);
        }
    },
    initIndexroleMsgUrl: function initIndexroleMsgUrl() {
        cc.log('role-----' + indexHg.indexroleMsgUrl);
        var msg = indexHg.indexroleMsgUrl;
        var role = msg.roleMsg;
        self.playerStatus.initPlayer(role);
        self.startWebsocket(role.id);
        pk.roleID = role.id;
    },
    startWebsocket: function startWebsocket(id) {
        // url = "ws://119.29.234.184:8080/hxsg/chat",
        this.id = id + '';
        //  var  data= JSON.stringify({ 'id': this.id });
        SocketEvents.data = { 'id': this.id };
        var login = JSON.stringify({ 'key': uuidKey, 'type': "login", 'role': SocketEvents.data });
        console.log('initWS login = ' + login);
        ws.send(login);
        cc.log(HxsgUrl.socketUrl);
    },

    hotkeyEvent: function hotkeyEvent() {
        cc.log('index 快捷键');
        this.hotkeyBoard.active = true;
    },

    fujiangEvent: function fujiangEvent() {
        loadScene(HxsgScenes.fujiang, HxsgScenes.index);
    },

    roleEvent: function roleEvent() {
        loadScene(HxsgScenes.role, HxsgScenes.index);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"IndexMenu":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7e345guY41FkYAh5Y/JD/aj', 'IndexMenu');
// js\index\IndexPanel\IndexMenu.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        page: {
            default: [],
            type: cc.Node
        },
        selectedFrame: {
            default: [],
            type: cc.SpriteFrame
        },
        unselectedFrame: {
            default: [],
            type: cc.SpriteFrame
        },
        menu: {
            default: [],
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        try {
            self = this;
            //0、人物，1、设施，2、移动，3、功能
            SocketEvents.updateRoleMsgEvent = this.yidongEvent;
            this.yidongEvent();
        } catch (e) {
            cc.log(e);
        }
    },

    renwuEvent: function renwuEvent() {
        try {
            cc.log('人物');
            if (this.curMenu === 0) return;
            this.switchMenu(0);
        } catch (e) {
            cc.log(e);
        }
    },

    sheshiEvent: function sheshiEvent() {
        try {
            cc.log('设施');

            if (this.curMenu === 1) return;
            this.switchMenu(1);
        } catch (e) {
            cc.log(e);
        }
    },

    yidongEvent: function yidongEvent() {
        try {
            cc.log('移动');

            if (this.curMenu === 2) return;
            var p = cc.find("Canvas/menuPanel/yidong");
            if (p.childrenCount <= 0) {
                cc.log('ajaxReturnData.objets' + ajaxReturnData.objets);
                self.initMap(indexHg.indexroleMsgUrl);
                //ajaxData(HxsgUrl.indexroleMsgUrl, null, self.initMap);
            }
            //点击按钮变换
            this.switchMenu(2);
        } catch (e) {
            cc.log(e);
        }
    },
    initMap: function initMap(msg) {
        try {

            ajaxReturnData.topCity = msg.roleMsg.zuobiao;
            cc.log(ajaxReturnData.topCity);
            if (pk.moveMsg != null && pk.moveMsg != "" && typeof pk.moveMsg != 'undefined') {
                self.initMove();
            } else {
                ajaxData(HxsgUrl.moveCity, { "centerCity": msg.roleMsg.zuobiao }, function (data) {
                    pk.moveMsg = data;
                    self.initMove();
                });
            }
            // ajaxData(HxsgUrl.moveCity, { "centerCity": msg.roleMsg.zuobiao }, self.initMove);
        } catch (e) {
            cc.log(e);
        }
    },

    gongneng: function gongneng() {
        try {
            cc.log('功能');
            if (this.curMenu === 3) return;
            this.switchMenu(3);
        } catch (e) {
            cc.log(e);
        }
    },

    switchMenu: function switchMenu(curMenu) {
        var bz = false;
        for (var key in self.page) {

            if (key == curMenu) {
                self.menu[key].spriteFrame = self.selectedFrame[key];
                self.page[key].active = true;
                if (ajaxReturnData.topCity.indexOf('宝石矿洞') >= 0 && key == 1) {
                    bz = false;
                    cc.find('Canvas/menuPanel/sheshi2').active = true;
                    cc.find('Canvas/menuPanel/sheshi').active = false;
                }
            } else {
                self.menu[key].spriteFrame = self.unselectedFrame[key];
                self.page[key].active = false;
            }
        }
        if (ajaxReturnData.topCity.indexOf('宝石矿洞') >= 0 && curMenu != 1) {

            cc.find('Canvas/menuPanel/sheshi2').active = false;
        }
    },
    clickCity: function clickCity(event) {
        try {
            var node = event.target;
            ajaxData(HxsgUrl.moveCity, { "centerCity": node.id }, function (data) {
                pk.moveMsg = data;
                self.initMove();
            });
        } catch (e) {
            cc.log(e);
        }
    },
    initMove: function initMove() {
        try {
            var msg = pk.moveMsg;
            var p = cc.find("Canvas/menuPanel/yidong");
            p.removeAllChildren();
            var rw = cc.find("Canvas/menuPanel/renwu");
            rw.removeAllChildren();
            var hd = cc.find("Canvas/nearbyPlayer/head");
            hd.removeAllChildren();
            var m = msg.map;
            var g = msg.guai;
            var n = msg.near;
            cc.find("Canvas/nearbyPlayer/label").getComponent("cc.Label").string = '更多(' + n.length + ')';
            ajaxReturnData.nearRole = n;
            //  self.addMovePrefab({'num':'0','name':m.nCity}); 
            cc.loader.loadRes('prefabs/move', cc.Prefab, function (err, prefab) {
                if (!err) {
                    //当前所在地
                    if (m.centerCity != '' && typeof m.centerCity != 'undefined') {
                        var result = false;
                        for (var city in mapArrays) {
                            if (m.centerCity == mapArrays[city]) {

                                result = true;
                                break;
                            };
                        }
                        cc.find('Canvas/menu/sheshi').getComponent("cc.Button").interactable = result;
                    }

                    //上
                    if (m.nCity != '' && typeof m.nCity != 'undefined') {
                        var movePrefab = cc.instantiate(prefab);
                        var moveJs = movePrefab.getComponent('move');
                        movePrefab.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab.id = m.nCity;
                        p.addChild(movePrefab);
                        moveJs.init({ 'num': '0', 'name': m.nCity });
                    }
                    //下
                    if (m.sCity != '' && typeof m.sCity != 'undefined') {
                        var movePrefab2 = cc.instantiate(prefab);
                        movePrefab2.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab2.id = m.sCity;
                        var moveJs2 = movePrefab2.getComponent('move');
                        moveJs2.init({ 'num': '1', 'name': m.sCity });
                        p.addChild(movePrefab2);
                    }
                    //左
                    if (m.wCity != '' && typeof m.wCity != 'undefined') {
                        var movePrefab3 = cc.instantiate(prefab);
                        var moveJs3 = movePrefab3.getComponent('move');

                        movePrefab3.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab3.id = m.wCity;
                        moveJs3.init({ 'num': '2', 'name': m.wCity });
                        p.addChild(movePrefab3);
                    }

                    //右
                    if (m.eCity != '' && typeof m.eCity != 'undefined') {
                        var movePrefab4 = cc.instantiate(prefab);
                        var moveJs4 = movePrefab4.getComponent('move');
                        movePrefab4.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        movePrefab4.id = m.eCity;
                        moveJs4.init({ 'num': '3', 'name': m.eCity });
                        p.addChild(movePrefab4);
                    }
                    //中心
                    if (m.quyu != '' && typeof m.quyu != 'undefined') {
                        var movePrefab5 = cc.instantiate(prefab);
                        var moveJs5 = movePrefab5.getComponent('move');
                        movePrefab5.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                        var centerCityName;
                        switch (m.quyu) {
                            case '徐州':
                                centerCityName = '下邳';
                                break;
                            case '淮南':
                                centerCityName = '寿春';
                                break;
                            case '豫州':
                                centerCityName = '许昌';
                                break;
                            case '南蛮':
                                centerCityName = '三江城';
                                break;
                            case '益州':
                                centerCityName = '成都';
                                break;
                            case '扬州':
                                centerCityName = '吴城';
                                break;
                            case '司隶':
                                centerCityName = '洛阳';
                                break;
                            case '兖州':
                                centerCityName = '陈留';
                                break;
                            case '荆州':
                                centerCityName = '江陵';
                                break;
                            case '荆北':
                                centerCityName = '新野';
                                break;

                            default:
                                centerCityName = '新手村';
                        }
                        movePrefab5.id = centerCityName;
                        moveJs5.init({ 'num': '4', 'name': '返回' + centerCityName });
                        p.addChild(movePrefab5);
                    }
                }
            });
            if (typeof g != 'undefined') {
                //人物预制
                cc.loader.loadRes('prefabs/rolePrefabs', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        cc.find('Canvas/menu/renwu').getComponent("cc.Button").enableAutoGrayEffect = true;
                        //怪1
                        if (g.guaiid1 != '' && typeof g.guaiid1 != 'undefined') {
                            cc.find('Canvas/menu/renwu').getComponent("cc.Button").interactable = true;
                            var gd1 = cc.instantiate(prefab);
                            var rolePrefabsJs1 = gd1.getComponent('rolePrefabs');
                            //gd1.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs1.id = g.guaiid1;
                            rw.addChild(gd1);
                            rolePrefabsJs1.init({ 'num': g.status, 'roleName': g.guaiid1, 'level': g.level });
                        } else {
                            //表示没有人物，所以替换人物按钮的图标，并禁止点击人物interactable=false;

                            cc.find('Canvas/menu/renwu').getComponent("cc.Button").interactable = false;
                        }
                        //怪2
                        if (g.guaiid2 != '' && typeof g.guaiid2 != 'undefined') {
                            var gd2 = cc.instantiate(prefab);
                            var rolePrefabsJs2 = gd2.getComponent('rolePrefabs');
                            //gd2.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs2.id = g.guaiid2;
                            rw.addChild(gd2);
                            rolePrefabsJs2.init({ 'num': g.status, 'roleName': g.guaiid2, 'level': g.level });
                        }
                        //怪3
                        if (g.guaiid3 != '' && typeof g.guaiid3 != 'undefined') {
                            var gd3 = cc.instantiate(prefab);
                            var rolePrefabsJs3 = gd3.getComponent('rolePrefabs');
                            // gd3.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs3.id = g.guaiid3;
                            rw.addChild(gd3);
                            rolePrefabsJs3.init({ 'num': g.status, 'roleName': g.guaiid3, 'level': g.level });
                        }
                        //怪4
                        if (g.guaiid4 != '' && typeof g.guaiid4 != 'undefined') {
                            var gd4 = cc.instantiate(prefab);
                            var rolePrefabsJs4 = gd4.getComponent('rolePrefabs');
                            //gd4.on(cc.Node.EventType.TOUCH_START, self.clickCity, self);
                            rolePrefabsJs4.id = g.guaiid4;
                            rw.addChild(gd4);
                            rolePrefabsJs4.init({ 'num': g.status, 'roleName': g.guaiid4, 'level': g.level });
                        }
                    }
                });
            }

            //头部动画调用
            var top = cc.find("Canvas/top");
            //top.getComponent("cc.Label").string=m.centerCity;
            var TopManagerJs = top.getComponent('TopManager');
            TopManagerJs.setLabel(m.centerCity);
            ajaxReturnData.topCity = m.centerCity;
            TopManagerJs.play;
            self.switchMenu(0);
            //附近的玩家
            cc.loader.loadRes('prefabs/headItem', cc.Prefab, function (err, prefab) {
                cc.log('附近的玩家' + err);
                if (!err) {
                    var le;
                    if (n.length < 6 && n.length > 0) {
                        le = n.length;
                    } else if (n.length > 6) {
                        le = 6;
                    }
                    for (var i = 0; i < le; i++) {
                        var headItems = cc.instantiate(prefab);
                        var headItemJs = headItems.getComponent("headItem");
                        headItems.id = n[i];
                        headItems.on(cc.Node.EventType.TOUCH_START, self.clickHead, self);
                        hd.addChild(headItems);
                        var num = 0;
                        cc.log(n[i].zhiye);
                        cc.log(n[i].level);
                        switch (n[i].zhiye) {
                            case '武士':
                                if (n[i].level > 0 && n[i].level <= 50) {
                                    if (n[i].sex == '女') {
                                        num = 3;
                                    } else {
                                        num = 0;
                                    }
                                }
                                if (n[i].level > 50) {
                                    if (n[i].sex == '女') {
                                        num = 4;
                                    } else {
                                        num = 1;
                                    }
                                }
                                break;
                            case '异人':
                                if (n[i].level > 0 && n[i].level <= 50) {
                                    if (n[i].sex == '女') {
                                        num = 9;
                                    } else {
                                        num = 6;
                                    }
                                }
                                if (n[i].level > 50) {
                                    if (n[i].sex == '女') {
                                        num = 10;
                                    } else {
                                        num = 7;
                                    }
                                }
                                break;
                            case '文人':
                                if (n[i].level > 0 && n[i].level <= 50) {
                                    if (n[i].sex == '女') {
                                        num = 15;
                                    } else {
                                        num = 12;
                                    }
                                }
                                if (n[i].level > 50) {
                                    if (n[i].sex == '女') {
                                        num = 16;
                                    } else {
                                        num = 13;
                                    }
                                }
                                break;
                        }
                        cc.log('   headItemJs.init(num)---' + num);
                        headItemJs.init(num);
                    }
                }
            });
            if (g.guaiid1 == '' || typeof g.guaiid1 == 'undefined') {
                self.switchMenu(2);
            }
        } catch (e) {
            cc.log(e);
        }
    },
    roleDetail: function roleDetail(msg) {

        loadingScene(HxsgScenes.friendInfo, HxsgScenes.index);
    },
    clickHead: function clickHead(event) {
        var node = event.target;
        var m = node.id;
        var message = "玩家：" + m.level + m.zhiye + "     " + "【" + m.rolename + "】";
        myFriends.friendid = m.id;
        showAlert(message, self.roleDetail);
    }

});

cc._RFpop();
},{}],"PkScoket":[function(require,module,exports){
"use strict";
cc._RFpush(module, '24c8bM4YrtPwIcReUu80lah', 'PkScoket');
// js\websocket\PkScoket.js

"use strict";

cc._RFpop();
},{}],"PlayerStatus":[function(require,module,exports){
"use strict";
cc._RFpush(module, '855b6u8AUdIf4GM65AX72MP', 'PlayerStatus');
// js\index\IndexPlayer\PlayerStatus.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        juesename: cc.Label,
        HP: cc.ProgressBar,
        MP: cc.ProgressBar,
        head: cc.Sprite,
        fujiang1: cc.Node,
        fujiang2: cc.Node,
        fujiang3: cc.Node,
        zhiye: cc.Label,
        yin: cc.Label,
        jin: cc.Label,
        jingyan: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        this.fujiang1 = this.fujiang1.getComponent('IndexFujiangButton');
        this.fujiang2 = this.fujiang2.getComponent('IndexFujiangButton');
        this.fujiang3 = this.fujiang3.getComponent('IndexFujiangButton');
    },

    initPlayer: function initPlayer(role) {
        //角色名
        this.juesename.string = role.rolename ? role.rolename : '';
        //头像
        var headName = role.img;
        headName = headName.substring(headName.lastIndexOf('/') + 1, headName.lastIndexOf('.'));
        this.headUrl = 'touxiang/' + headName;
        cc.loader.loadRes(this.headUrl, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.head.spriteFrame = spriteFrame;
            }
        });

        //气血
        var qixue1 = role.totalxue1 ? role.totalxue1 : 0;
        var qixue2 = role.totalxue2 ? role.totalxue2 : 0;
        this.HP.progress = qixue2 === 0 ? 0 : qixue1 / qixue2;
        //精力
        var jingli1 = role.totaljing1 ? role.totaljing1 : 0;
        var jingli2 = role.totaljing2 ? role.totaljing2 : 0;
        this.MP.progress = jingli2 === 0 ? 0 : jingli1 / jingli2;
        //等级
        this.dengji = (role.level ? role.level : '') + '级';
        roleMsg.roleId = role.level;

        //职业
        this.zhiye.string = this.dengji + (role.zhiye ? role.zhiye : '');
        // //称号
        // this.zhiye.string = role.chenghao ? role.chenghao : '';
        //钱
        this.jin.string = role.jin ? role.jin : 0;
        this.yin.string = role.yin ? role.yin : 0;

        //升级所需经验
        this.jingyan.string = role.jingyan ? role.jingyan : 0;

        //副将
        //TODO:
        // if(role.fujiang){
        //     fujiang1.setHead(role.fujiang);
        // }
    }

});

cc._RFpop();
},{}],"PorpertyManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8e123cgcsJOzJrTctlZp0x3', 'PorpertyManager');
// js\index\Fujiang\PorpertyManager.js

'use strict';

/**
 *  气血=成长*等级*（体质点+气血初值*0.8）
 *  精力=成长*等级（智力点+精力初值*0.8）
 *  攻击=(等级*成长*攻击初值)/7+攻击初值*成长*0.5+等级*成长*力量点*0.2
 *  速度=成长*（速度初值+敏捷点）
 *
 *  点数分为。。体质，敏捷，智力，力量
 *  加点的话，只改变速度，气血，精力，攻击
 *
 */

var self;
var PropertyType = cc.Enum({
    TiZhi: 1, //体质
    ZhiLi: 2, //智力
    LiLiang: 3, //力量
    MinJie: 4 //敏捷
    // 体质: 1,
    // 智力: 2,
    // 力量: 3,
    // 敏捷: 4,
});

cc.Class({
    extends: cc.Component,

    properties: {
        totalPointsLabel: cc.Label,
        fangyuValueLabel: cc.Label,

        tizhiMng: cc.Node,
        zhiliMng: cc.Node,
        liliangMng: cc.Node,
        minjieMng: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        self.tizhiMng = self.tizhiMng.getComponent('PropertyPoints');
        self.zhiliMng = self.zhiliMng.getComponent('PropertyPoints');
        self.liliangMng = self.liliangMng.getComponent('PropertyPoints');
        self.minjieMng = self.minjieMng.getComponent('PropertyPoints');
        this.init();
        //var data = { 'id': propCheckId };
        // ajaxData(HxsgUrl.propertyUrl, data, self.ajaxCallback);
    },

    /**
     * 根据数据初始化场景页面
     * @param msg
     */
    init: function init() {
        //数据赋值
        var msg = fujiang.fjmsg;
        self.msg = msg;
        self.totalPoints = msg.keyongds;
        self.remainPoints = self.totalPoints;
        self.chengzhang = msg.chengzhang;
        self.Lv = msg.level; //等级
        self.fangyu = msg.chufang; //防御值
        self.qixueInitValue = msg.chuxue;
        self.jingliInitValue = msg.chujing;
        self.gongjiInitValue = msg.chugong;
        self.suduInitValue = msg.chusu;

        //Label赋值
        self.totalPointsLabel.string = self.totalPoints;
        self.fangyuValueLabel.string = 0;
        self.tizhiMng.initData(msg.qiXue2, msg.qixueds);
        self.zhiliMng.initData(msg.jingLi2, msg.jinglids);
        self.liliangMng.initData(msg.gongJi, msg.gongJids);
        self.minjieMng.initData(msg.suDu, msg.sududs);
    },

    /**
     * 重置场景页面
     */
    reset: function reset() {
        self.init(self.msg);

        //重置各个属性
        self.tizhiMng.resetProp();
        self.zhiliMng.resetProp();
        self.liliangMng.resetProp();
        self.minjieMng.resetProp();
    },

    /**
     * 提交更改
     */
    updatePoints: function updatePoints() {
        showAlert('确认提交当前属性点分配吗？', function () {
            var data = {
                id: self.msg.id,
                keyongds: self.remainPoints,
                qiXue2: self.tizhiMng.propValue,
                qixueds: self.tizhiMng.propTotal,
                jingLi2: self.zhiliMng.propValue,
                jinglids: self.zhiliMng.propTotal,
                gongJi: self.liliangMng.propValue,
                gongJids: self.liliangMng.propTotal,
                suDu: self.minjieMng.propValue,
                sududs: self.minjieMng.propTotal
            };
            cc.log(data);
            ajaxUtils(HxsgUrl.propertyUpdateUrl, data);
        }, null);
    },

    /**
     * 按钮点击后做属性点检查
     */
    onButtonEvent: function onButtonEvent() {

        self.tizhiMng.buttonInteraction();
        self.zhiliMng.buttonInteraction();
        self.liliangMng.buttonInteraction();
        self.minjieMng.buttonInteraction();
    },

    /**
     * 计算操作后的剩余属性点的值
     * @param count
     */
    changeRemainPoints: function changeRemainPoints(count) {
        this.remainPoints -= count;
        if (this.remainPoints < 0) this.remainPoints = 0;
        this.totalPointsLabel.string = this.remainPoints;
    },

    /**
     * 计算各个属性的属性值
     * @returns {Number}
     */
    getQixue: function getQixue(tizhiPoints) {
        return parseInt(self.chengzhang * self.Lv * (tizhiPoints + self.qixueInitValue * 0.8));
    },
    getJingli: function getJingli(zhiliPoints) {
        return parseInt(self.chengzhang * self.Lv * (zhiliPoints + self.jingliInitValue * 0.8));
    },
    getGongji: function getGongji(liliangPoints) {
        return parseInt(self.Lv * self.chengzhang * self.gongjiInitValue / 7 + self.gongjiInitValue * self.chengzhang * 0.5 + self.Lv * self.chengzhang * liliangPoints * 0.2);
    },
    getSudu: function getSudu(minjiePoints) {
        return parseInt(self.chengzhang * (self.suduInitValue + minjiePoints));
    },

    /**
     * 根据属性点计算属性的属性值
     * @param propType
     * @param propPoints
     * @returns {boolean}
     */
    getPropValue: function getPropValue(propType, propPoints) {
        var propValue = 0;
        switch (propType) {
            case PropertyType.TiZhi:
                propValue = this.getQixue(propPoints);
                break;
            case PropertyType.ZhiLi:
                propValue = this.getJingli(propPoints);
                break;
            case PropertyType.LiLiang:
                propValue = this.getGongji(propPoints);
                break;
            case PropertyType.MinJie:
                propValue = this.getSudu(propPoints);
                break;
            default:
                break;
        }
        return propValue;
    },

    backEvent: function backEvent() {
        returnLastScene(HxsgScenes.propertyDeal);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"PropertyChecker":[function(require,module,exports){
"use strict";
cc._RFpush(module, '822f6K5eipOnZEWVMqOK/82', 'PropertyChecker');
// js\index\Fujiang\PropertyChecker.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        totalPointsLabel: cc.Label,
        fangyuValueLabel: cc.Label,
        qixueLabel: cc.Label,
        tizhiLabel: cc.Label,
        jingliLabel: cc.Label,
        zhiliLabel: cc.Label,
        gongjiLabel: cc.Label,
        liliangLabel: cc.Label,
        suduLabel: cc.Label,
        minjieLabel: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        this.init();
    },

    /**
     * 服务器请求回掉函数
     * @param msg
     */
    ajaxCallback: function ajaxCallback(msg) {
        self.init();
    },

    /**
     * 根据数据初始化场景页面
     * @param msg
     */
    init: function init() {
        var msg = fujiang.fjmsg;
        //Label赋值
        self.totalPointsLabel.string = msg.keyongds;
        self.fangyuValueLabel.string = 0;
        self.qixueLabel.string = msg.qiXue2;
        self.tizhiLabel.string = msg.qixueds;
        self.jingliLabel.string = msg.jingLi2;
        self.zhiliLabel.string = msg.jinglids;
        self.gongjiLabel.string = msg.gongJi;
        self.liliangLabel.string = msg.gongJids;
        self.suduLabel.string = msg.suDu;
        self.minjieLabel.string = msg.sududs;
    },

    backEvent: function backEvent() {
        returnLastScene(HxsgScenes.propertyCheck);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"PropertyPoints":[function(require,module,exports){
"use strict";
cc._RFpush(module, '255ffQEeWpK0qpj7EY15/LS', 'PropertyPoints');
// js\index\Fujiang\PropertyPoints.js

'use strict';

var PropertyType = cc.Enum({
    TiZhi: 1, //体质
    ZhiLi: 2, //智力
    LiLiang: 3, //力量
    MinJie: 4 //敏捷
    // 体质: 1,       //体质
    // 智力: 2,       //智力
    // 力量: 3,     //力量
    // 敏捷: 4       //敏捷
});
cc.Class({
    extends: cc.Component,

    properties: {
        propMng: cc.Node,
        propType: {
            default: PropertyType.None,
            type: PropertyType
        },
        propValueLabel: cc.Label,
        propPointLabel: cc.Label,
        dealAllBtn: cc.Button,
        add1Btn: cc.Button,
        add3Btn: cc.Button,
        cut1Btn: cc.Button,
        cut3Btn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.propMng = this.propMng.getComponent('PorpertyManager');
    },

    /**
     * 初始化
     * @param propValueInit     属性值
     * @param propPoint     属性点
     */
    initData: function initData(propValueInit, propPoint) {
        this.propInit = propPoint; //初始属性点
        this.propAdded = 0; //新分配的属性点
        this.propTotal = this.propInit + this.propAdded; //该属性总属性点 = propInit + propAdded
        this.propValueInit = propValueInit; //初始属性值

        this.propValue = propValueInit;
        this.propValueLabel.string = propValueInit;
        this.propPointLabel.string = propPoint;

        this.buttonInteraction();
    },

    /**
     * 重置自身，响应父级重新分配按钮
     */
    resetProp: function resetProp() {
        this.initData(this.propValueInit, this.propInit);
        this.buttonInteraction();
    },

    /**
     * 监听操作结果，预判断设置按钮交互状态
     */
    buttonInteraction: function buttonInteraction() {
        //加
        if (this.propMng.remainPoints < 0) this.propMng.remainPoints = 0;
        switch (this.propMng.remainPoints) {
            case 0:
                this.dealAllBtn.interactable = false;
                this.add1Btn.interactable = false;
                this.add3Btn.interactable = false;
                break;
            case 1:
            case 2:
                this.dealAllBtn.interactable = true;
                this.add1Btn.interactable = true;
                this.add3Btn.interactable = false;
                break;
            default:
                this.dealAllBtn.interactable = true;
                this.add1Btn.interactable = true;
                this.add3Btn.interactable = true;
                break;
        }
        //减
        if (this.propAdded < 0) this.propAdded = 0;
        switch (this.propAdded) {
            case 0:
                this.cut1Btn.interactable = false;
                this.cut3Btn.interactable = false;
                break;
            case 1:
            case 2:
                this.cut1Btn.interactable = true;
                this.cut3Btn.interactable = false;
                break;
            default:
                this.cut1Btn.interactable = true;
                this.cut3Btn.interactable = true;
                break;
        }
    },

    /**
     * 是否可以进行操作
     * @param count
     * @returns {boolean}
     */
    canDo: function canDo(count) {
        if (count > 0) return this.propMng.remainPoints >= count;else if (count < 0) {
            count = Math.abs(count);
            return this.propAdded >= count;
        }
    },

    dealAll: function dealAll() {
        this.propValueCalculate(this.propMng.remainPoints);
    },

    add1Point: function add1Point() {
        this.propValueCalculate(1);
    },

    add3Point: function add3Point() {
        this.propValueCalculate(3);
    },

    cut1Point: function cut1Point() {
        this.propValueCalculate(-1);
    },

    cut3Point: function cut3Point() {
        this.propValueCalculate(-3);
    },

    propValueCalculate: function propValueCalculate(count) {
        if (this.canDo(count)) {
            //计算属性点
            this.propAdded += count;
            this.propTotal = this.propInit + this.propAdded;
            this.propMng.changeRemainPoints(count);
            //计算属性点改变后的属性值
            this.propValue = this.propMng.getPropValue(this.propType, this.propTotal);
            //Label刷新
            this.propValueLabel.string = this.propValue;
            this.propPointLabel.string = this.propTotal;

            this.propMng.onButtonEvent();
        }
    }
});

cc._RFpop();
},{}],"RechargeGold":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5a935NejGVPxp1FFTtIYqc5', 'RechargeGold');
// js\bank\RechargeGold.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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

    //加载钱庄场景
    back: function back() {
        cc.director.loadScene('bank');
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"RechargeReward":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5bea9FXfidOwbA7+Q3sBtC5', 'RechargeReward');
// js\bank\RechargeReward.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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

    //加载钱庄场景
    back: function back() {
        cc.director.loadScene('bank');
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"RoleDetailsManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '29c32rZ/I9IapAFkDhrnjBm', 'RoleDetailsManager');
// js\index\RoleDetailsManager.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        leftContent: cc.Node,
        touxiang: cc.Sprite,
        juesename: cc.Label,
        nameBtn: cc.Button,
        zhiye: cc.Label,
        chenghao: cc.Label,
        jingyan: cc.Label,
        touxiangBtn: cc.Button,
        sjxiaolv: cc.Label,
        vip: cc.Label,
        tilizhi: cc.Label,
        qian: cc.Label,
        bindqian: cc.Label,
        huolizhi: cc.Label,
        successBtn: cc.Button,
        tanwei: cc.Label,
        juzhudi: cc.Label,
        house: cc.Label,
        jiaopai: cc.Label,
        peiou: cc.Label,
        skillBtn: cc.Button,
        shuxing: cc.Label,
        fenpeiBtn: cc.Button,
        chakanBtn: cc.Button,
        qixue: cc.Label,
        jingli: cc.Label,
        gongji: cc.Label,
        sudu: cc.Label,
        fangyu: cc.Label,
        fuzhong: cc.Label,
        info: cc.Label,
        infoBtn: cc.Button,
        fightingBtn: cc.Button,
        allLifeBtn: cc.Button,
        xinggeBtn: cc.Button,
        zuoqi: cc.Label,
        zuoqiBtn: cc.Button,
        fujiang: cc.Label,
        tianfu: cc.Label,
        videoBtn: cc.Button,
        videoToggleBtn: cc.Button,
        labelCount: 22,
        btnCount: 9
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        ajaxData(HxsgUrl.roleMsgUrl, null, function (msg) {
            self.initRoleDetails(msg);
        });
    },

    addChildTest: function addChildTest() {
        this.juesename.node.parent.removeFromParent();
        this.nameBtn.node.removeFromParent();

        this.leftContent.addChild(this.juesename.node.parent);
        this.leftContent.addChild(this.nameBtn.node);

        this.juesename.node.parent.setSiblingIndex(this.touxiangBtn.node.getSiblingIndex() + 1);
        this.nameBtn.node.setSiblingIndex(this.touxiangBtn.node.getSiblingIndex() + 2);

        this.content.height = this.labelCount * 50 + this.btnCount * 65;
    },

    initRoleDetails: function initRoleDetails(msg) {
        if (msg.roleMsg == undefined || msg.roleMsg == null) return;

        this.content.active = true;
        this.roleMsg = msg.roleMsg;
        var role = msg.roleMsg;

        //加载头像
        // cc.loader.loadRes()
        //头像
        var headName = role.img;
        headName = headName.substring(headName.lastIndexOf('/') + 1, headName.lastIndexOf('.'));
        var headUrl = 'touxiang/' + headName;
        cc.loader.loadRes(headUrl, cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                self.touxiang.spriteFrame = spriteFrame;
            }
        });

        //角色名
        this.juesename.string = role.rolename;
        //职业
        this.zhiye.string = role.zhiye;
        //等级
        this.dengji = role.level;

        //称号
        this.chenghao.string = role.chenghao;
        //升级所需经验
        this.jingyan.string = '需' + role.jingyan + '经验';
        //升级效率
        this.sjxiaolv.string = role.shengjixiaolv;
        //VIP
        this.vip.string = '';
        //体力值
        this.tilizhi.string = role.tilizhi;
        //钱
        var jin = role.jin;
        var yin = role.yin;
        this.qian.string = jin + '金' + yin + '银';
        //绑定银
        this.bindqian.string = '';
        //活力值
        this.huolizhi.string = 100;
        //摊位
        this.tanwei.string = "无";
        //居住地
        this.juzhudi.string = "无";
        //房产
        this.house.string = "无";
        //教派
        this.jiaopai.string = "无";
        //配偶
        this.peiou.string = "无";
        //属性
        var shuxingValue = role.keyongds > 0 ? true : false;
        cc.log(shuxingValue);
        this.fenpeiBtn.active = shuxingValue;
        this.chakanBtn.active = !shuxingValue;
        this.shuxing.string = role.keyongds;
        //气血
        var qixue1 = role.totalxue1;
        var qixue2 = role.totalxue2;
        this.qixue.string = qixue1 + '/' + qixue2;
        //精力
        var jingli1 = role.totaljing1;
        var jingli2 = role.totaljing2;
        this.jingli.string = jingli1 + '/' + jingli2;
        //攻击
        this.gongji.string = role.totalgong;
        //速度
        this.sudu.string = role.totalsudu;
        //防御
        this.fangyu.string = "无";
        // //负重
        // this.fuzhong.string = role.fuzhong1 + '/'+ role.fuzhong2;
        //个人信息
        this.info.string = '';
        this.infoBtn.interactable = false;
        //坐骑
        this.zuoqi.string = role.zuoji ? role.zuoji : '';
        this.zuoqiBtn.interactable = role.zuoji ? true : false;
        //副将
        var fj = role.fuLi;
        var fjName = "";
        for (var i = 0; i < fj.length; i++) {
            fjName += "(" + fj[i].fujiangname + ")";
        }
        this.fujiang.string = fjName;
        //天赋
        this.tianfu.string = '';
    },

    nickEvent: function nickEvent() {},

    headEvent: function headEvent() {},

    achievementEvent: function achievementEvent() {},

    skileEvent: function skileEvent() {},

    propertyCheckEvent: function propertyCheckEvent() {
        propCheckId = this.roleMsg.id;
        loadScene(HxsgScenes.propertyCheck, HxsgScenes.role);
    },

    propertyDealEvent: function propertyDealEvent() {
        propCheckId = this.roleMsg.id;
        loadScene(HxsgScenes.propertyDeal, HxsgScenes.role);
    },

    personInfoEvent: function personInfoEvent() {},

    fightingEvent: function fightingEvent() {},

    lifeEvent: function lifeEvent() {},

    characterEvent: function characterEvent() {},

    mountEvent: function mountEvent() {},

    videoEvent: function videoEvent() {},

    videoToggleEvent: function videoToggleEvent() {},

    backEvent: function backEvent() {
        returnLastScene(HxsgScenes.role);
    }
});

cc._RFpop();
},{}],"SaveGold":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4e65cq69GNE563HWPMeIa72', 'SaveGold');
// js\bank\SaveGold.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerGold_label: cc.Label,
        bankGold_label: cc.Label,
        saveGold_editbox: cc.EditBox
    },

    //返回钱庄场景
    back: function back() {
        returnLast();
    },

    //存款记录
    saveRecord: function saveRecord() {},

    //确认存款
    saveConfirm: function saveConfirm() {
        var self = this;
        var saveDate = {
            "status": "add", //该参数有add(存款),del(取款)
            "jin": this.saveGold_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, saveDate, function (msg) {
            self.back();
            showAlert(msg.result);
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerGold_label.string = "您目前有" + Bank.playerGold + "金砖";
        this.bankGold_label.string = "钱庄存款" + Bank.bankGold + "金砖";
    }

});

cc._RFpop();
},{}],"SaveSilver":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2ca9a3JjTVA97Ec/OSL1/a+', 'SaveSilver');
// js\bank\SaveSilver.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playerSilver_label: cc.Label,
        bankSilver_label: cc.Label,
        saveSilver_editbox: cc.EditBox
    },

    //返回钱庄场景
    back: function back() {
        returnLast();
    },

    //存款记录
    saveRecord: function saveRecord() {},

    //确认存款
    saveConfirm: function saveConfirm() {
        var self = this;
        var saveDate = {
            "status": "add", //该参数有add(存款),del(取款)
            "yin": this.saveSilver_editbox.string };
        ajaxData(HxsgUrl.bankSGUrl, saveDate, function (msg) {
            self.back();
            showAlert(msg.result);
        });
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.playerSilver_label.string = "您目前有" + Bank.playerSilver + "两";
        this.bankSilver_label.string = "钱庄存款" + Bank.bankSilver + "两";
    }

});

cc._RFpop();
},{}],"SellGold":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0d624nUDIJDXL/AehDkgXq2', 'SellGold');
// js\bank\SellGold.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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

    //加载钱庄场景
    back: function back() {
        cc.director.loadScene('bank');
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"SheshiPanel":[function(require,module,exports){
"use strict";
cc._RFpush(module, '721db3H1sdHkZayZNduGOgC', 'SheshiPanel');
// js\index\IndexPanel\SheshiPanel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    yiguanEvent: function yiguanEvent() {
        cc.log('sheshi panel 医馆');
        loadingScene(HxsgScenes.yiguan, HxsgScenes.index);
    },

    qianzhuangEvent: function qianzhuangEvent() {
        cc.log('sheshi panel 钱庄');
        loadScene(HxsgScenes.bank, HxsgScenes.index);
    },

    guanyiEvent: function guanyiEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 馆驿');
    },

    shichangEvent: function shichangEvent() {
        cc.log('sheshi panel 市场');
        cc.director.loadScene('shiChangIndex');
    },

    guangchangEvent: function guangchangEvent() {
        cc.log('sheshi panel 广场');
        cc.director.loadScene('guangChang');
    },

    guanfuEvent: function guanfuEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 官府');
    },

    zhanchangEvent: function zhanchangEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 战场');
    },

    guanjiaEvent: function guanjiaEvent() {
        showAlert("暂未开放");
        cc.log('sheshi panel 管家');
    },
    wabaoEvent: function wabaoEvent() {
        loadingScene(HxsgScenes.wabao, HxsgScenes.index);
    }

});

cc._RFpop();
},{}],"Speak":[function(require,module,exports){
"use strict";
cc._RFpush(module, '05840MDlqVCZ5LiPDp8YDhb', 'Speak');
// js\common\Speak.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        edit: cc.EditBox
    },

    sendEvent: function sendEvent() {
        if (SocketEvents.connected) {
            var datas = JSON.stringify({ 'key': uuidKey, 'type': 'chat', 'typeChat': (curChannel + 1).toString(), 'role': SocketEvents.data, 'chatMsg': this.edit.string });
            ws.send(datas);
            cc.log('ws.send: ' + datas);
            this.node.destroy();
        } else {
            cc.log('ws 未连接');
        }
    },

    cancelEvent: function cancelEvent() {
        this.node.destroy();
    }
});

cc._RFpop();
},{}],"Strake":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e8ae4bW0Z5A2JmRMuOr2UYt', 'Strake');
// js\common\Strake.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        left: cc.Node,
        right: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        this.canvas = cc.find('Canvas');
        var px = this.canvas.width / 2;
        this.addImageAction(px);
    },

    addImageAction: function addImageAction(px) {
        //获取边框到中心的距离，即得到两边框的坐标。注意：因为时序问题，必须要canvas的宽度来计算
        var seqLeft = cc.sequence(cc.moveTo(1, cc.p(-px, 0)).easing(cc.easeCubicActionOut(1)));
        var seqRight = cc.sequence(cc.moveTo(1, cc.p(px, 0)).easing(cc.easeCubicActionOut(1)));
        self.left.runAction(seqLeft);
        self.right.runAction(seqRight);
    }
});

cc._RFpop();
},{}],"TimelineLite":[function(require,module,exports){
(function (global){
"use strict";
cc._RFpush(module, '25f8d20AK1FMatPUAsaMewx', 'TimelineLite');
// js\util\TimelineLite.js

"use strict";

/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : undefined || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

	"use strict";

	_gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function TimelineLite(vars) {
			SimpleTimeline.call(this, vars);
			this._labels = {};
			this.autoRemoveChildren = this.vars.autoRemoveChildren === true;
			this.smoothChildTiming = this.vars.smoothChildTiming === true;
			this._sortChildren = true;
			this._onUpdate = this.vars.onUpdate;
			var v = this.vars,
			    val,
			    p;
			for (p in v) {
				val = v[p];
				if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
					v[p] = this._swapSelfInParams(val);
				}
			}
			if (_isArray(v.tweens)) {
				this.add(v.tweens, 0, v.align, v.stagger);
			}
		},
		    _tinyNum = 0.0000000001,
		    TweenLiteInternals = TweenLite._internals,
		    _internals = TimelineLite._internals = {},
		    _isSelector = TweenLiteInternals.isSelector,
		    _isArray = TweenLiteInternals.isArray,
		    _lazyTweens = TweenLiteInternals.lazyTweens,
		    _lazyRender = TweenLiteInternals.lazyRender,
		    _globals = _gsScope._gsDefine.globals,
		    _copy = function _copy(vars) {
			var copy = {},
			    p;
			for (p in vars) {
				copy[p] = vars[p];
			}
			return copy;
		},
		    _applyCycle = function _applyCycle(vars, targets, i) {
			var alt = vars.cycle,
			    p,
			    val;
			for (p in alt) {
				val = alt[p];
				vars[p] = typeof val === "function" ? val(i, targets[i]) : val[i % val.length];
			}
			delete vars.cycle;
		},
		    _pauseCallback = _internals.pauseCallback = function () {},
		    _slice = function _slice(a) {
			//don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
			var b = [],
			    l = a.length,
			    i;
			for (i = 0; i !== l; b.push(a[i++])) {}
			return b;
		},
		    p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.19.1";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
  //translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
  function localToGlobal(time, animation) {
  	while (animation) {
  		time = (time / animation._timeScale) + animation._startTime;
  		animation = animation.timeline;
  	}
  	return time;
  }
  	//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
  function globalToLocal(time, animation) {
  	var scale = 1;
  	time -= localToGlobal(0, animation);
  	while (animation) {
  		scale *= animation._timeScale;
  		animation = animation.timeline;
  	}
  	return time * scale;
  }
  */

		p.to = function (target, duration, vars, position) {
			var Engine = vars.repeat && _globals.TweenMax || TweenLite;
			return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function (target, duration, vars, position) {
			return this.add((vars.repeat && _globals.TweenMax || TweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function (target, duration, fromVars, toVars, position) {
			var Engine = toVars.repeat && _globals.TweenMax || TweenLite;
			return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({ onComplete: onCompleteAll, onCompleteParams: onCompleteAllParams, callbackScope: onCompleteAllScope, smoothChildTiming: this.smoothChildTiming }),
			    cycle = vars.cycle,
			    copy,
			    i;
			if (typeof targets === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) {
				//senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = vars.immediateRender != false;
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function (targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function (callback, params, scope, position) {
			return this.add(TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function (target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = position === this._time && !this._paused;
			}
			return this.add(new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function (vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
			    root = tl._timeline,
			    tween,
			    next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					tl.add(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.add(tl, 0);
			return tl;
		};

		p.add = function (value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof position !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if (value instanceof Array || value && value.push && _isArray(value)) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({ tweens: child });
						}
						this.add(child, curTime);
						if (typeof child !== "string" && typeof child !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + child.totalDuration() / child._timeScale;
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof value === "string") {
					return this.addLabel(value, position);
				} else if (typeof value === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = tl.rawTime() > value._startTime; //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function (value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - (!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale; //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || value && value.push && _isArray(value)) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof value === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function (tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function (value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function (value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function (tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function (label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function (position, callback, params, scope) {
			var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function (label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function (label) {
			return this._labels[label] != null ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function (timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			if (typeof offsetOrLabel === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && typeof timeOrLabel === "number" && this._labels[offsetOrLabel] == null ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof timeOrLabel === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) {
				//if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? this._labels[timeOrLabel] = this.duration() + offsetOrLabel : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
				timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : this.duration();
			} else if (timeOrLabel == null) {
				timeOrLabel = this.duration();
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function (position, suppressEvents) {
			return this.totalTime(typeof position === "number" ? position : this._parseTimeOrLabel(position), suppressEvents !== false);
		};

		p.stop = function () {
			return this.paused(true);
		};

		p.gotoAndPlay = function (position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function (position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function (time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = !this._dirty ? this._totalDuration : this.totalDuration(),
			    prevTime = this._time,
			    prevStart = this._startTime,
			    prevTimeScale = this._timeScale,
			    prevPaused = this._paused,
			    tween,
			    isComplete,
			    next,
			    callback,
			    internalForce,
			    pauseTween,
			    curTime;
			if (time >= totalDur - 0.0000001 && time >= 0) {
				//to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if (time <= 0 && time >= -0.0000001 || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.
			} else if (time < 0.0000001) {
				//to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || time < 0 && this._rawPrevTime >= 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						//ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) {
						//when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) {
						//if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}
			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + this._cycle * (this._totalDuration + this._repeatDelay);
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || this._paused && !prevPaused) {
						//in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || this._paused && !prevPaused) {
						//in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) {
					//in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) {
				//if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) {
						//in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function () {
			var tween = this._first;
			while (tween) {
				if (tween._paused || tween instanceof TimelineLite && tween._hasPausedChild()) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function (nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
			    tween = this._first,
			    cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function (target, nested) {
			var disabled = this._gc,
			    a = [],
			    cnt = 0,
			    tweens,
			    i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = TweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || nested && this._contains(tweens[i])) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function () {
			return this._recent;
		};

		p._contains = function (tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function (amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
			    labels = this._labels,
			    p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function (vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = !target ? this.getChildren(true, true, false) : this.getTweensOf(target),
			    i = tweens.length,
			    changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function (labels) {
			var tweens = this.getChildren(false, true, true),
			    i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function () {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);;
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function (time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function (value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function (value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
					    tween = this._last,
					    prevStart = 999999999999,
					    prev,
					    end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) {
							//in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) {
							//children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + tween._totalDuration / tween._timeScale;
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function (value) {
			if (!value) {
				//if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
				    time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function () {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return tl === Animation._rootFramesTimeline;
		};

		p.rawTime = function (wrapRepeats) {
			return wrapRepeats && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;
	}, true);
});if (_gsScope._gsDefine) {
	_gsScope._gsQueue.pop()();
}

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function (name) {
	"use strict";

	var getGlobal = function getGlobal() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof define === "function" && define.amd) {
		//AMD
		define(["TweenLite"], getGlobal);
	} else if (typeof module !== "undefined" && module.exports) {
		//node
		require("./TweenLite.js"); //dependency
		module.exports = getGlobal();
	}
})("TimelineLite");

cc._RFpop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./TweenLite.js":"TweenLite"}],"TopManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '783c45NyPZDHoUsFXUxF4N6', 'TopManager');
// js\common\TopManager.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
        label: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        //检验是否存在pk
        setTimeout(function () {
            var scenName = cc.director.getScene().name;
            if (scenName != "pkWait") {
                ajaxUtils(HxsgUrl.queryPk, null, function (data) {
                    if (data == "2001") {
                        showAlert("你正处在战斗中，请立即战斗", function () {
                            cc.director.loadScene(HxsgScenes.pkWait);
                        }, function () {
                            cc.director.loadScene(HxsgScenes.pkWait);
                        });
                    }
                });
            }
        }, 10);
        this.setLabel(ajaxReturnData.topCity);
        this.addImageAction();
        var anim = this.getComponent(cc.Animation);

        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        //anim.play();

    },

    addImageAction: function addImageAction() {
        var self = this;
        var seq = cc.sequence(cc.moveTo(1, cc.p(-360, 0)).easing(cc.easeCubicActionOut(1)));
        this.image.node.runAction(seq);
    },
    play: function play() {
        this.addImageAction();
        var anim = this.getComponent(cc.Animation);
        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
    },
    setLabel: function setLabel(msg) {
        this.label.string = msg;
    }
});

cc._RFpop();
},{}],"TweenLite":[function(require,module,exports){
(function (global){
"use strict";
cc._RFpush(module, '37eeashlJVKmp5GLgvMXob6', 'TweenLite');
// js\util\TweenLite.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function (window, moduleName) {

	"use strict";

	var _exports = {},
	    _doc = window.document,
	    _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
	if (_globals.TweenLite) {
		return; //in case the core set of classes is already loaded, don't instantiate twice.
	}
	var _namespace = function _namespace(ns) {
		var a = ns.split("."),
		    p = _globals,
		    i;
		for (i = 0; i < a.length; i++) {
			p[a[i]] = p = p[a[i]] || {};
		}
		return p;
	},
	    gs = _namespace("com.greensock"),
	    _tinyNum = 0.0000000001,
	    _slice = function _slice(a) {
		//don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
		var b = [],
		    l = a.length,
		    i;
		for (i = 0; i !== l; b.push(a[i++])) {}
		return b;
	},
	    _emptyFunc = function _emptyFunc() {},
	    _isArray = function () {
		//works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
		var toString = Object.prototype.toString,
		    array = toString.call([]);
		return function (obj) {
			return obj != null && (obj instanceof Array || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && !!obj.push && toString.call(obj) === array);
		};
	}(),
	    a,
	    i,
	    p,
	    _ticker,
	    _tickerActive,
	    _defLookup = {},


	/**
  * @constructor
  * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
  * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
  * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
  * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
  *
  * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
  * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
  * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
  * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
  * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
  * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
  * sandbox the banner one like:
  *
  * <script>
  *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
  * </script>
  * <script src="js/greensock/v1.7/TweenMax.js"></script>
  * <script>
  *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
  * </script>
  * <script src="js/greensock/v1.6/TweenMax.js"></script>
  * <script>
  *     gs.TweenLite.to(...); //would use v1.7
  *     TweenLite.to(...); //would use v1.6
  * </script>
  *
  * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
  * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
  * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
  * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
  */
	Definition = function Definition(ns, dependencies, func, global) {
		this.sc = _defLookup[ns] ? _defLookup[ns].sc : []; //subclasses
		_defLookup[ns] = this;
		this.gsClass = null;
		this.func = func;
		var _classes = [];
		this.check = function (init) {
			var i = dependencies.length,
			    missing = i,
			    cur,
			    a,
			    n,
			    cl,
			    hasModule;
			while (--i > -1) {
				if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
					_classes[i] = cur.gsClass;
					missing--;
				} else if (init) {
					cur.sc.push(this);
				}
			}
			if (missing === 0 && func) {
				a = ("com.greensock." + ns).split(".");
				n = a.pop();
				cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

				//exports to multiple environments
				if (global) {
					_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
					hasModule = typeof module !== "undefined" && module.exports;
					if (!hasModule && typeof define === "function" && define.amd) {
						//AMD
						define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function () {
							return cl;
						});
					} else if (hasModule) {
						//node
						if (ns === moduleName) {
							module.exports = _exports[moduleName] = cl;
							for (i in _exports) {
								cl[i] = _exports[i];
							}
						} else if (_exports[moduleName]) {
							_exports[moduleName][n] = cl;
						}
					}
				}
				for (i = 0; i < this.sc.length; i++) {
					this.sc[i].check();
				}
			}
		};
		this.check(true);
	},


	//used to create Definition instances (which basically registers a class that has dependencies).
	_gsDefine = window._gsDefine = function (ns, dependencies, func, global) {
		return new Definition(ns, dependencies, func, global);
	},


	//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
	_class = gs._class = function (ns, func, global) {
		func = func || function () {};
		_gsDefine(ns, [], function () {
			return func;
		}, global);
		return func;
	};

	_gsDefine.globals = _globals;

	/*
  * ----------------------------------------------------------------
  * Ease
  * ----------------------------------------------------------------
  */
	var _baseParams = [0, 0, 1, 1],
	    _blankArray = [],
	    Ease = _class("easing.Ease", function (func, extraParams, type, power) {
		this._func = func;
		this._type = type || 0;
		this._power = power || 0;
		this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
	}, true),
	    _easeMap = Ease.map = {},
	    _easeReg = Ease.register = function (ease, names, types, create) {
		var na = names.split(","),
		    i = na.length,
		    ta = (types || "easeIn,easeOut,easeInOut").split(","),
		    e,
		    name,
		    j,
		    type;
		while (--i > -1) {
			name = na[i];
			e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
			j = ta.length;
			while (--j > -1) {
				type = ta[j];
				_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
			}
		}
	};

	p = Ease.prototype;
	p._calcEnd = false;
	p.getRatio = function (p) {
		if (this._func) {
			this._params[0] = p;
			return this._func.apply(null, this._params);
		}
		var t = this._type,
		    pw = this._power,
		    r = t === 1 ? 1 - p : t === 2 ? p : p < 0.5 ? p * 2 : (1 - p) * 2;
		if (pw === 1) {
			r *= r;
		} else if (pw === 2) {
			r *= r * r;
		} else if (pw === 3) {
			r *= r * r * r;
		} else if (pw === 4) {
			r *= r * r * r * r;
		}
		return t === 1 ? 1 - r : t === 2 ? r : p < 0.5 ? r / 2 : 1 - r / 2;
	};

	//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
	a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
	i = a.length;
	while (--i > -1) {
		p = a[i] + ",Power" + i;
		_easeReg(new Ease(null, null, 1, i), p, "easeOut", true);
		_easeReg(new Ease(null, null, 2, i), p, "easeIn" + (i === 0 ? ",easeNone" : ""));
		_easeReg(new Ease(null, null, 3, i), p, "easeInOut");
	}
	_easeMap.linear = gs.easing.Linear.easeIn;
	_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


	/*
  * ----------------------------------------------------------------
  * EventDispatcher
  * ----------------------------------------------------------------
  */
	var EventDispatcher = _class("events.EventDispatcher", function (target) {
		this._listeners = {};
		this._eventTarget = target || this;
	});
	p = EventDispatcher.prototype;

	p.addEventListener = function (type, callback, scope, useParam, priority) {
		priority = priority || 0;
		var list = this._listeners[type],
		    index = 0,
		    listener,
		    i;
		if (this === _ticker && !_tickerActive) {
			_ticker.wake();
		}
		if (list == null) {
			this._listeners[type] = list = [];
		}
		i = list.length;
		while (--i > -1) {
			listener = list[i];
			if (listener.c === callback && listener.s === scope) {
				list.splice(i, 1);
			} else if (index === 0 && listener.pr < priority) {
				index = i + 1;
			}
		}
		list.splice(index, 0, { c: callback, s: scope, up: useParam, pr: priority });
	};

	p.removeEventListener = function (type, callback) {
		var list = this._listeners[type],
		    i;
		if (list) {
			i = list.length;
			while (--i > -1) {
				if (list[i].c === callback) {
					list.splice(i, 1);
					return;
				}
			}
		}
	};

	p.dispatchEvent = function (type) {
		var list = this._listeners[type],
		    i,
		    t,
		    listener;
		if (list) {
			i = list.length;
			if (i > 1) {
				list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
			}
			t = this._eventTarget;
			while (--i > -1) {
				listener = list[i];
				if (listener) {
					if (listener.up) {
						listener.c.call(listener.s || t, { type: type, target: t });
					} else {
						listener.c.call(listener.s || t);
					}
				}
			}
		}
	};

	/*
  * ----------------------------------------------------------------
  * Ticker
  * ----------------------------------------------------------------
  */
	var _reqAnimFrame = window.requestAnimationFrame,
	    _cancelAnimFrame = window.cancelAnimationFrame,
	    _getTime = Date.now || function () {
		return new Date().getTime();
	},
	    _lastUpdate = _getTime();

	//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
	a = ["ms", "moz", "webkit", "o"];
	i = a.length;
	while (--i > -1 && !_reqAnimFrame) {
		_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
		_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
	}

	_class("Ticker", function (fps, useRAF) {
		var _self = this,
		    _startTime = _getTime(),
		    _useRAF = useRAF !== false && _reqAnimFrame ? "auto" : false,
		    _lagThreshold = 500,
		    _adjustedLag = 33,
		    _tickWord = "tick",
		    //helps reduce gc burden
		_fps,
		    _req,
		    _id,
		    _gap,
		    _nextTime,
		    _tick = function _tick(manual) {
			var elapsed = _getTime() - _lastUpdate,
			    overlap,
			    dispatch;
			if (elapsed > _lagThreshold) {
				_startTime += elapsed - _adjustedLag;
			}
			_lastUpdate += elapsed;
			_self.time = (_lastUpdate - _startTime) / 1000;
			overlap = _self.time - _nextTime;
			if (!_fps || overlap > 0 || manual === true) {
				_self.frame++;
				_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
				dispatch = true;
			}
			if (manual !== true) {
				//make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
				_id = _req(_tick);
			}
			if (dispatch) {
				_self.dispatchEvent(_tickWord);
			}
		};

		EventDispatcher.call(_self);
		_self.time = _self.frame = 0;
		_self.tick = function () {
			_tick(true);
		};

		_self.lagSmoothing = function (threshold, adjustedLag) {
			_lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited
			_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
		};

		_self.sleep = function () {
			if (_id == null) {
				return;
			}
			if (!_useRAF || !_cancelAnimFrame) {
				clearTimeout(_id);
			} else {
				_cancelAnimFrame(_id);
			}
			_req = _emptyFunc;
			_id = null;
			if (_self === _ticker) {
				_tickerActive = false;
			}
		};

		_self.wake = function (seamless) {
			if (_id !== null) {
				_self.sleep();
			} else if (seamless) {
				_startTime += -_lastUpdate + (_lastUpdate = _getTime());
			} else if (_self.frame > 10) {
				//don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
				_lastUpdate = _getTime() - _lagThreshold + 5;
			}
			_req = _fps === 0 ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function (f) {
				return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
			} : _reqAnimFrame;
			if (_self === _ticker) {
				_tickerActive = true;
			}
			_tick(2);
		};

		_self.fps = function (value) {
			if (!arguments.length) {
				return _fps;
			}
			_fps = value;
			_gap = 1 / (_fps || 60);
			_nextTime = this.time + _gap;
			_self.wake();
		};

		_self.useRAF = function (value) {
			if (!arguments.length) {
				return _useRAF;
			}
			_self.sleep();
			_useRAF = value;
			_self.fps(_fps);
		};
		_self.fps(fps);

		//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
		setTimeout(function () {
			if (_useRAF === "auto" && _self.frame < 5 && _doc.visibilityState !== "hidden") {
				_self.useRAF(false);
			}
		}, 1500);
	});

	p = gs.Ticker.prototype = new gs.events.EventDispatcher();
	p.constructor = gs.Ticker;

	/*
  * ----------------------------------------------------------------
  * Animation
  * ----------------------------------------------------------------
  */
	var Animation = _class("core.Animation", function (duration, vars) {
		this.vars = vars = vars || {};
		this._duration = this._totalDuration = duration || 0;
		this._delay = Number(vars.delay) || 0;
		this._timeScale = 1;
		this._active = vars.immediateRender === true;
		this.data = vars.data;
		this._reversed = vars.reversed === true;

		if (!_rootTimeline) {
			return;
		}
		if (!_tickerActive) {
			//some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
			_ticker.wake();
		}

		var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
		tl.add(this, tl._time);

		if (this.vars.paused) {
			this.paused(true);
		}
	});

	_ticker = Animation.ticker = new gs.Ticker();
	p = Animation.prototype;
	p._dirty = p._gc = p._initted = p._paused = false;
	p._totalTime = p._time = 0;
	p._rawPrevTime = -1;
	p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
	p._paused = false;

	//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
	var _checkTimeout = function _checkTimeout() {
		if (_tickerActive && _getTime() - _lastUpdate > 2000) {
			_ticker.wake();
		}
		setTimeout(_checkTimeout, 2000);
	};
	_checkTimeout();

	p.play = function (from, suppressEvents) {
		if (from != null) {
			this.seek(from, suppressEvents);
		}
		return this.reversed(false).paused(false);
	};

	p.pause = function (atTime, suppressEvents) {
		if (atTime != null) {
			this.seek(atTime, suppressEvents);
		}
		return this.paused(true);
	};

	p.resume = function (from, suppressEvents) {
		if (from != null) {
			this.seek(from, suppressEvents);
		}
		return this.paused(false);
	};

	p.seek = function (time, suppressEvents) {
		return this.totalTime(Number(time), suppressEvents !== false);
	};

	p.restart = function (includeDelay, suppressEvents) {
		return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, suppressEvents !== false, true);
	};

	p.reverse = function (from, suppressEvents) {
		if (from != null) {
			this.seek(from || this.totalDuration(), suppressEvents);
		}
		return this.reversed(true).paused(false);
	};

	p.render = function (time, suppressEvents, force) {
		//stub - we override this method in subclasses.
	};

	p.invalidate = function () {
		this._time = this._totalTime = 0;
		this._initted = this._gc = false;
		this._rawPrevTime = -1;
		if (this._gc || !this.timeline) {
			this._enabled(true);
		}
		return this;
	};

	p.isActive = function () {
		var tl = this._timeline,
		    //the 2 root timelines won't have a _timeline; they're always active.
		startTime = this._startTime,
		    rawTime;
		return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale;
	};

	p._enabled = function (enabled, ignoreTimeline) {
		if (!_tickerActive) {
			_ticker.wake();
		}
		this._gc = !enabled;
		this._active = this.isActive();
		if (ignoreTimeline !== true) {
			if (enabled && !this.timeline) {
				this._timeline.add(this, this._startTime - this._delay);
			} else if (!enabled && this.timeline) {
				this._timeline._remove(this, true);
			}
		}
		return false;
	};

	p._kill = function (vars, target) {
		return this._enabled(false, false);
	};

	p.kill = function (vars, target) {
		this._kill(vars, target);
		return this;
	};

	p._uncache = function (includeSelf) {
		var tween = includeSelf ? this : this.timeline;
		while (tween) {
			tween._dirty = true;
			tween = tween.timeline;
		}
		return this;
	};

	p._swapSelfInParams = function (params) {
		var i = params.length,
		    copy = params.concat();
		while (--i > -1) {
			if (params[i] === "{self}") {
				copy[i] = this;
			}
		}
		return copy;
	};

	p._callback = function (type) {
		var v = this.vars,
		    callback = v[type],
		    params = v[type + "Params"],
		    scope = v[type + "Scope"] || v.callbackScope || this,
		    l = params ? params.length : 0;
		switch (l) {//speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
			case 0:
				callback.call(scope);break;
			case 1:
				callback.call(scope, params[0]);break;
			case 2:
				callback.call(scope, params[0], params[1]);break;
			default:
				callback.apply(scope, params);
		}
	};

	//----Animation getters/setters --------------------------------------------------------

	p.eventCallback = function (type, callback, params, scope) {
		if ((type || "").substr(0, 2) === "on") {
			var v = this.vars;
			if (arguments.length === 1) {
				return v[type];
			}
			if (callback == null) {
				delete v[type];
			} else {
				v[type] = callback;
				v[type + "Params"] = _isArray(params) && params.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(params) : params;
				v[type + "Scope"] = scope;
			}
			if (type === "onUpdate") {
				this._onUpdate = callback;
			}
		}
		return this;
	};

	p.delay = function (value) {
		if (!arguments.length) {
			return this._delay;
		}
		if (this._timeline.smoothChildTiming) {
			this.startTime(this._startTime + value - this._delay);
		}
		this._delay = value;
		return this;
	};

	p.duration = function (value) {
		if (!arguments.length) {
			this._dirty = false;
			return this._duration;
		}
		this._duration = this._totalDuration = value;
		this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
		if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
			this.totalTime(this._totalTime * (value / this._duration), true);
		}
		return this;
	};

	p.totalDuration = function (value) {
		this._dirty = false;
		return !arguments.length ? this._totalDuration : this.duration(value);
	};

	p.time = function (value, suppressEvents) {
		if (!arguments.length) {
			return this._time;
		}
		if (this._dirty) {
			this.totalDuration();
		}
		return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
	};

	p.totalTime = function (time, suppressEvents, uncapped) {
		if (!_tickerActive) {
			_ticker.wake();
		}
		if (!arguments.length) {
			return this._totalTime;
		}
		if (this._timeline) {
			if (time < 0 && !uncapped) {
				time += this.totalDuration();
			}
			if (this._timeline.smoothChildTiming) {
				if (this._dirty) {
					this.totalDuration();
				}
				var totalDuration = this._totalDuration,
				    tl = this._timeline;
				if (time > totalDuration && !uncapped) {
					time = totalDuration;
				}
				this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;
				if (!tl._dirty) {
					//for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
					this._uncache(false);
				}
				//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
				if (tl._timeline) {
					while (tl._timeline) {
						if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
							tl.totalTime(tl._totalTime, true);
						}
						tl = tl._timeline;
					}
				}
			}
			if (this._gc) {
				this._enabled(true, false);
			}
			if (this._totalTime !== time || this._duration === 0) {
				if (_lazyTweens.length) {
					_lazyRender();
				}
				this.render(time, suppressEvents, false);
				if (_lazyTweens.length) {
					//in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
					_lazyRender();
				}
			}
		}
		return this;
	};

	p.progress = p.totalProgress = function (value, suppressEvents) {
		var duration = this.duration();
		return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
	};

	p.startTime = function (value) {
		if (!arguments.length) {
			return this._startTime;
		}
		if (value !== this._startTime) {
			this._startTime = value;
			if (this.timeline) if (this.timeline._sortChildren) {
				this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
			}
		}
		return this;
	};

	p.endTime = function (includeRepeats) {
		return this._startTime + (includeRepeats != false ? this.totalDuration() : this.duration()) / this._timeScale;
	};

	p.timeScale = function (value) {
		if (!arguments.length) {
			return this._timeScale;
		}
		value = value || _tinyNum; //can't allow zero because it'll throw the math off
		if (this._timeline && this._timeline.smoothChildTiming) {
			var pauseTime = this._pauseTime,
			    t = pauseTime || pauseTime === 0 ? pauseTime : this._timeline.totalTime();
			this._startTime = t - (t - this._startTime) * this._timeScale / value;
		}
		this._timeScale = value;
		return this._uncache(false);
	};

	p.reversed = function (value) {
		if (!arguments.length) {
			return this._reversed;
		}
		if (value != this._reversed) {
			this._reversed = value;
			this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
		}
		return this;
	};

	p.paused = function (value) {
		if (!arguments.length) {
			return this._paused;
		}
		var tl = this._timeline,
		    raw,
		    elapsed;
		if (value != this._paused) if (tl) {
			if (!_tickerActive && !value) {
				_ticker.wake();
			}
			raw = tl.rawTime();
			elapsed = raw - this._pauseTime;
			if (!value && tl.smoothChildTiming) {
				this._startTime += elapsed;
				this._uncache(false);
			}
			this._pauseTime = value ? raw : null;
			this._paused = value;
			this._active = this.isActive();
			if (!value && elapsed !== 0 && this._initted && this.duration()) {
				raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
				this.render(raw, raw === this._totalTime, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
			}
		}
		if (this._gc && !value) {
			this._enabled(true, false);
		}
		return this;
	};

	/*
  * ----------------------------------------------------------------
  * SimpleTimeline
  * ----------------------------------------------------------------
  */
	var SimpleTimeline = _class("core.SimpleTimeline", function (vars) {
		Animation.call(this, 0, vars);
		this.autoRemoveChildren = this.smoothChildTiming = true;
	});

	p = SimpleTimeline.prototype = new Animation();
	p.constructor = SimpleTimeline;
	p.kill()._gc = false;
	p._first = p._last = p._recent = null;
	p._sortChildren = false;

	p.add = p.insert = function (child, position, align, stagger) {
		var prevTween, st;
		child._startTime = Number(position || 0) + child._delay;
		if (child._paused) if (this !== child._timeline) {
			//we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
			child._pauseTime = child._startTime + (this.rawTime() - child._startTime) / child._timeScale;
		}
		if (child.timeline) {
			child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
		}
		child.timeline = child._timeline = this;
		if (child._gc) {
			child._enabled(true, true);
		}
		prevTween = this._last;
		if (this._sortChildren) {
			st = child._startTime;
			while (prevTween && prevTween._startTime > st) {
				prevTween = prevTween._prev;
			}
		}
		if (prevTween) {
			child._next = prevTween._next;
			prevTween._next = child;
		} else {
			child._next = this._first;
			this._first = child;
		}
		if (child._next) {
			child._next._prev = child;
		} else {
			this._last = child;
		}
		child._prev = prevTween;
		this._recent = child;
		if (this._timeline) {
			this._uncache(true);
		}
		return this;
	};

	p._remove = function (tween, skipDisable) {
		if (tween.timeline === this) {
			if (!skipDisable) {
				tween._enabled(false, true);
			}

			if (tween._prev) {
				tween._prev._next = tween._next;
			} else if (this._first === tween) {
				this._first = tween._next;
			}
			if (tween._next) {
				tween._next._prev = tween._prev;
			} else if (this._last === tween) {
				this._last = tween._prev;
			}
			tween._next = tween._prev = tween.timeline = null;
			if (tween === this._recent) {
				this._recent = this._last;
			}

			if (this._timeline) {
				this._uncache(true);
			}
		}
		return this;
	};

	p.render = function (time, suppressEvents, force) {
		var tween = this._first,
		    next;
		this._totalTime = this._time = this._rawPrevTime = time;
		while (tween) {
			next = tween._next; //record it here because the value could change after rendering...
			if (tween._active || time >= tween._startTime && !tween._paused) {
				if (!tween._reversed) {
					tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
				} else {
					tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
				}
			}
			tween = next;
		}
	};

	p.rawTime = function () {
		if (!_tickerActive) {
			_ticker.wake();
		}
		return this._totalTime;
	};

	/*
  * ----------------------------------------------------------------
  * TweenLite
  * ----------------------------------------------------------------
  */
	var TweenLite = _class("TweenLite", function (target, duration, vars) {
		Animation.call(this, duration, vars);
		this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

		if (target == null) {
			throw "Cannot tween a null target.";
		}

		this.target = target = typeof target !== "string" ? target : TweenLite.selector(target) || target;

		var isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType),
		    overwrite = this.vars.overwrite,
		    i,
		    targ,
		    targets;

		this._overwrite = overwrite = overwrite == null ? _overwriteLookup[TweenLite.defaultOverwrite] : typeof overwrite === "number" ? overwrite >> 0 : _overwriteLookup[overwrite];

		if ((isSelector || target instanceof Array || target.push && _isArray(target)) && typeof target[0] !== "number") {
			this._targets = targets = _slice(target); //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
			this._propLookup = [];
			this._siblings = [];
			for (i = 0; i < targets.length; i++) {
				targ = targets[i];
				if (!targ) {
					targets.splice(i--, 1);
					continue;
				} else if (typeof targ === "string") {
					targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
					if (typeof targ === "string") {
						targets.splice(i + 1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
					}
					continue;
				} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
					//in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
					targets.splice(i--, 1);
					this._targets = targets = targets.concat(_slice(targ));
					continue;
				}
				this._siblings[i] = _register(targ, this, false);
				if (overwrite === 1) if (this._siblings[i].length > 1) {
					_applyOverwrite(targ, this, null, 1, this._siblings[i]);
				}
			}
		} else {
			this._propLookup = {};
			this._siblings = _register(target, this, false);
			if (overwrite === 1) if (this._siblings.length > 1) {
				_applyOverwrite(target, this, null, 1, this._siblings);
			}
		}
		if (this.vars.immediateRender || duration === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
			this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
			this.render(Math.min(0, -this._delay)); //in case delay is negative
		}
	}, true),
	    _isSelector = function _isSelector(v) {
		return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
	},
	    _autoCSS = function _autoCSS(vars, target) {
		var css = {},
		    p;
		for (p in vars) {
			if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS)) {
				//note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
				css[p] = vars[p];
				delete vars[p];
			}
		}
		vars.css = css;
	};

	p = TweenLite.prototype = new Animation();
	p.constructor = TweenLite;
	p.kill()._gc = false;

	//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

	p.ratio = 0;
	p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
	p._notifyPluginsOfEnabled = p._lazy = false;

	TweenLite.version = "1.19.1";
	TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
	TweenLite.defaultOverwrite = "auto";
	TweenLite.ticker = _ticker;
	TweenLite.autoSleep = 120;
	TweenLite.lagSmoothing = function (threshold, adjustedLag) {
		_ticker.lagSmoothing(threshold, adjustedLag);
	};

	TweenLite.selector = window.$ || window.jQuery || function (e) {
		var selector = window.$ || window.jQuery;
		if (selector) {
			TweenLite.selector = selector;
			return selector(e);
		}
		return typeof _doc === "undefined" ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
	};

	var _lazyTweens = [],
	    _lazyLookup = {},
	    _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,

	//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
	_setRatio = function _setRatio(v) {
		var pt = this._firstPT,
		    min = 0.000001,
		    val;
		while (pt) {
			val = !pt.blob ? pt.c * v + pt.s : v === 1 ? this.end : v ? this.join("") : this.start;
			if (pt.m) {
				val = pt.m(val, this._target || pt.t);
			} else if (val < min) if (val > -min && !pt.blob) {
				//prevents issues with converting very small numbers to strings in the browser
				val = 0;
			}
			if (!pt.f) {
				pt.t[pt.p] = val;
			} else if (pt.fp) {
				pt.t[pt.p](pt.fp, val);
			} else {
				pt.t[pt.p](val);
			}
			pt = pt._next;
		}
	},

	//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
	_blobDif = function _blobDif(start, end, filter, pt) {
		var a = [],
		    charIndex = 0,
		    s = "",
		    color = 0,
		    startNums,
		    endNums,
		    num,
		    i,
		    l,
		    nonNumbers,
		    currentNum;
		a.start = start;
		a.end = end;
		start = a[0] = start + ""; //ensure values are strings
		end = a[1] = end + "";
		if (filter) {
			filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
			start = a[0];
			end = a[1];
		}
		a.length = 0;
		startNums = start.match(_numbersExp) || [];
		endNums = end.match(_numbersExp) || [];
		if (pt) {
			pt._next = null;
			pt.blob = 1;
			a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
		}
		l = endNums.length;
		for (i = 0; i < l; i++) {
			currentNum = endNums[i];
			nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
			s += nonNumbers || !i ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
			charIndex += nonNumbers.length;
			if (color) {
				//sense rgba() values and round them.
				color = (color + 1) % 5;
			} else if (nonNumbers.substr(-5) === "rgba(") {
				color = 1;
			}
			if (currentNum === startNums[i] || startNums.length <= i) {
				s += currentNum;
			} else {
				if (s) {
					a.push(s);
					s = "";
				}
				num = parseFloat(startNums[i]);
				a.push(num);
				a._firstPT = { _next: a._firstPT, t: a, p: a.length - 1, s: num, c: (currentNum.charAt(1) === "=" ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0, f: 0, m: color && color < 4 ? Math.round : 0 };
				//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
			}
			charIndex += currentNum.length;
		}
		s += end.substr(charIndex);
		if (s) {
			a.push(s);
		}
		a.setRatio = _setRatio;
		return a;
	},

	//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
	_addPropTween = function _addPropTween(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
		if (typeof end === "function") {
			end = end(index || 0, target);
		}
		var type = _typeof(target[prop]),
		    getterName = type !== "function" ? "" : prop.indexOf("set") || typeof target["get" + prop.substr(3)] !== "function" ? prop : "get" + prop.substr(3),
		    s = start !== "get" ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
		    isRelative = typeof end === "string" && end.charAt(1) === "=",
		    pt = { t: target, p: prop, s: s, f: type === "function", pg: 0, n: overwriteProp || prop, m: !mod ? 0 : typeof mod === "function" ? mod : Math.round, pr: 0, c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0 },
		    blob;

		if (typeof s !== "number" || typeof end !== "number" && !isRelative) {
			if (funcParam || isNaN(s) || !isRelative && isNaN(end) || typeof s === "boolean" || typeof end === "boolean") {
				//a blob (string that has multiple numbers in it)
				pt.fp = funcParam;
				blob = _blobDif(s, isRelative ? pt.s + pt.c : end, stringFilter || TweenLite.defaultStringFilter, pt);
				pt = { t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0 }; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
			} else {
				pt.s = parseFloat(s);
				if (!isRelative) {
					pt.c = parseFloat(end) - pt.s || 0;
				}
			}
		}
		if (pt.c) {
			//only add it to the linked list if there's a change.
			if (pt._next = this._firstPT) {
				pt._next._prev = pt;
			}
			this._firstPT = pt;
			return pt;
		}
	},
	    _internals = TweenLite._internals = { isArray: _isArray, isSelector: _isSelector, lazyTweens: _lazyTweens, blobDif: _blobDif },
	    //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
	_plugins = TweenLite._plugins = {},
	    _tweenLookup = _internals.tweenLookup = {},
	    _tweenLookupNum = 0,
	    _reservedProps = _internals.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1, callbackScope: 1, stringFilter: 1, id: 1 },
	    _overwriteLookup = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 },
	    _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
	    _rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
	    _nextGCFrame = 30,
	    _lazyRender = _internals.lazyRender = function () {
		var i = _lazyTweens.length,
		    tween;
		_lazyLookup = {};
		while (--i > -1) {
			tween = _lazyTweens[i];
			if (tween && tween._lazy !== false) {
				tween.render(tween._lazy[0], tween._lazy[1], true);
				tween._lazy = false;
			}
		}
		_lazyTweens.length = 0;
	};

	_rootTimeline._startTime = _ticker.time;
	_rootFramesTimeline._startTime = _ticker.frame;
	_rootTimeline._active = _rootFramesTimeline._active = true;
	setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

	Animation._updateRoot = TweenLite.render = function () {
		var i, a, p;
		if (_lazyTweens.length) {
			//if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
			_lazyRender();
		}
		_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
		_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
		if (_lazyTweens.length) {
			_lazyRender();
		}
		if (_ticker.frame >= _nextGCFrame) {
			//dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
			_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
			for (p in _tweenLookup) {
				a = _tweenLookup[p].tweens;
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc) {
						a.splice(i, 1);
					}
				}
				if (a.length === 0) {
					delete _tweenLookup[p];
				}
			}
			//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
			p = _rootTimeline._first;
			if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
				while (p && p._paused) {
					p = p._next;
				}
				if (!p) {
					_ticker.sleep();
				}
			}
		}
	};

	_ticker.addEventListener("tick", Animation._updateRoot);

	var _register = function _register(target, tween, scrub) {
		var id = target._gsTweenID,
		    a,
		    i;
		if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) {
			_tweenLookup[id] = { target: target, tweens: [] };
		}
		if (tween) {
			a = _tweenLookup[id].tweens;
			a[i = a.length] = tween;
			if (scrub) {
				while (--i > -1) {
					if (a[i] === tween) {
						a.splice(i, 1);
					}
				}
			}
		}
		return _tweenLookup[id].tweens;
	},
	    _onOverwrite = function _onOverwrite(overwrittenTween, overwritingTween, target, killedProps) {
		var func = overwrittenTween.vars.onOverwrite,
		    r1,
		    r2;
		if (func) {
			r1 = func(overwrittenTween, overwritingTween, target, killedProps);
		}
		func = TweenLite.onOverwrite;
		if (func) {
			r2 = func(overwrittenTween, overwritingTween, target, killedProps);
		}
		return r1 !== false && r2 !== false;
	},
	    _applyOverwrite = function _applyOverwrite(target, tween, props, mode, siblings) {
		var i, changed, curTween, l;
		if (mode === 1 || mode >= 4) {
			l = siblings.length;
			for (i = 0; i < l; i++) {
				if ((curTween = siblings[i]) !== tween) {
					if (!curTween._gc) {
						if (curTween._kill(null, target, tween)) {
							changed = true;
						}
					}
				} else if (mode === 5) {
					break;
				}
			}
			return changed;
		}
		//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
		var startTime = tween._startTime + _tinyNum,
		    overlaps = [],
		    oCount = 0,
		    zeroDur = tween._duration === 0,
		    globalStart;
		i = siblings.length;
		while (--i > -1) {
			if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
				//ignore
			} else if (curTween._timeline !== tween._timeline) {
				globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
				if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
					overlaps[oCount++] = curTween;
				}
			} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
				overlaps[oCount++] = curTween;
			}
		}

		i = oCount;
		while (--i > -1) {
			curTween = overlaps[i];
			if (mode === 2) if (curTween._kill(props, target, tween)) {
				changed = true;
			}
			if (mode !== 2 || !curTween._firstPT && curTween._initted) {
				if (mode !== 2 && !_onOverwrite(curTween, tween)) {
					continue;
				}
				if (curTween._enabled(false, false)) {
					//if all property tweens have been overwritten, kill the tween.
					changed = true;
				}
			}
		}
		return changed;
	},
	    _checkOverlap = function _checkOverlap(tween, reference, zeroDur) {
		var tl = tween._timeline,
		    ts = tl._timeScale,
		    t = tween._startTime;
		while (tl._timeline) {
			t += tl._startTime;
			ts *= tl._timeScale;
			if (tl._paused) {
				return -100;
			}
			tl = tl._timeline;
		}
		t /= ts;
		return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
	};

	//---- TweenLite instance methods -----------------------------------------------------------------------------

	p._init = function () {
		var v = this.vars,
		    op = this._overwrittenProps,
		    dur = this._duration,
		    immediate = !!v.immediateRender,
		    ease = v.ease,
		    i,
		    initPlugins,
		    pt,
		    p,
		    startVars,
		    l;
		if (v.startAt) {
			if (this._startAt) {
				this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
				this._startAt.kill();
			}
			startVars = {};
			for (p in v.startAt) {
				//copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
				startVars[p] = v.startAt[p];
			}
			startVars.overwrite = false;
			startVars.immediateRender = true;
			startVars.lazy = immediate && v.lazy !== false;
			startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
			this._startAt = TweenLite.to(this.target, 0, startVars);
			if (immediate) {
				if (this._time > 0) {
					this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
				} else if (dur !== 0) {
					return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
				}
			}
		} else if (v.runBackwards && dur !== 0) {
			//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
			if (this._startAt) {
				this._startAt.render(-1, true);
				this._startAt.kill();
				this._startAt = null;
			} else {
				if (this._time !== 0) {
					//in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
					immediate = false;
				}
				pt = {};
				for (p in v) {
					//copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
					if (!_reservedProps[p] || p === "autoCSS") {
						pt[p] = v[p];
					}
				}
				pt.overwrite = 0;
				pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
				pt.lazy = immediate && v.lazy !== false;
				pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
				this._startAt = TweenLite.to(this.target, 0, pt);
				if (!immediate) {
					this._startAt._init(); //ensures that the initial values are recorded
					this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
					if (this.vars.immediateRender) {
						this._startAt = null;
					}
				} else if (this._time === 0) {
					return;
				}
			}
		}
		this._ease = ease = !ease ? TweenLite.defaultEase : ease instanceof Ease ? ease : typeof ease === "function" ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
		if (v.easeParams instanceof Array && ease.config) {
			this._ease = ease.config.apply(ease, v.easeParams);
		}
		this._easeType = this._ease._type;
		this._easePower = this._ease._power;
		this._firstPT = null;

		if (this._targets) {
			l = this._targets.length;
			for (i = 0; i < l; i++) {
				if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i)) {
					initPlugins = true;
				}
			}
		} else {
			initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
		}

		if (initPlugins) {
			TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
		}
		if (op) if (!this._firstPT) if (typeof this.target !== "function") {
			//if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
			this._enabled(false, false);
		}
		if (v.runBackwards) {
			pt = this._firstPT;
			while (pt) {
				pt.s += pt.c;
				pt.c = -pt.c;
				pt = pt._next;
			}
		}
		this._onUpdate = v.onUpdate;
		this._initted = true;
	};

	p._initProps = function (target, propLookup, siblings, overwrittenProps, index) {
		var p, i, initPlugins, plugin, pt, v;
		if (target == null) {
			return false;
		}

		if (_lazyLookup[target._gsTweenID]) {
			_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
		}

		if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) {
			//it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
			_autoCSS(this.vars, target);
		}
		for (p in this.vars) {
			v = this.vars[p];
			if (_reservedProps[p]) {
				if (v) if (v instanceof Array || v.push && _isArray(v)) if (v.join("").indexOf("{self}") !== -1) {
					this.vars[p] = v = this._swapSelfInParams(v, this);
				}
			} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

				//t - target 		[object]
				//p - property 		[string]
				//s - start			[number]
				//c - change		[number]
				//f - isFunction	[boolean]
				//n - name			[string]
				//pg - isPlugin 	[boolean]
				//pr - priority		[number]
				//m - mod           [function | 0]
				this._firstPT = pt = { _next: this._firstPT, t: plugin, p: "setRatio", s: 0, c: 1, f: 1, n: p, pg: 1, pr: plugin._priority, m: 0 };
				i = plugin._overwriteProps.length;
				while (--i > -1) {
					propLookup[plugin._overwriteProps[i]] = this._firstPT;
				}
				if (plugin._priority || plugin._onInitAllProps) {
					initPlugins = true;
				}
				if (plugin._onDisable || plugin._onEnable) {
					this._notifyPluginsOfEnabled = true;
				}
				if (pt._next) {
					pt._next._prev = pt;
				}
			} else {
				propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
			}
		}

		if (overwrittenProps) if (this._kill(overwrittenProps, target)) {
			//another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
			return this._initProps(target, propLookup, siblings, overwrittenProps, index);
		}
		if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
			this._kill(propLookup, target);
			return this._initProps(target, propLookup, siblings, overwrittenProps, index);
		}
		if (this._firstPT) if (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration) {
			//zero duration tweens don't lazy render by default; everything else does.
			_lazyLookup[target._gsTweenID] = true;
		}
		return initPlugins;
	};

	p.render = function (time, suppressEvents, force) {
		var prevTime = this._time,
		    duration = this._duration,
		    prevRawPrevTime = this._rawPrevTime,
		    isComplete,
		    callback,
		    pt,
		    rawPrevTime;
		if (time >= duration - 0.0000001 && time >= 0) {
			//to work around occasional floating point math artifacts.
			this._totalTime = this._time = duration;
			this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
			if (!this._reversed) {
				isComplete = true;
				callback = "onComplete";
				force = force || this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
			}
			if (duration === 0) if (this._initted || !this.vars.lazy || force) {
				//zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
				if (this._startTime === this._timeline._duration) {
					//if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
					time = 0;
				}
				if (prevRawPrevTime < 0 || time <= 0 && time >= -0.0000001 || prevRawPrevTime === _tinyNum && this.data !== "isPause") if (prevRawPrevTime !== time) {
					//note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
					force = true;
					if (prevRawPrevTime > _tinyNum) {
						callback = "onReverseComplete";
					}
				}
				this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
			}
		} else if (time < 0.0000001) {
			//to work around occasional floating point math artifacts, round super small values to 0.
			this._totalTime = this._time = 0;
			this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
			if (prevTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
				callback = "onReverseComplete";
				isComplete = this._reversed;
			}
			if (time < 0) {
				this._active = false;
				if (duration === 0) if (this._initted || !this.vars.lazy || force) {
					//zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
						force = true;
					}
					this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}
			}
			if (!this._initted) {
				//if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
				force = true;
			}
		} else {
			this._totalTime = this._time = time;

			if (this._easeType) {
				var r = time / duration,
				    type = this._easeType,
				    pow = this._easePower;
				if (type === 1 || type === 3 && r >= 0.5) {
					r = 1 - r;
				}
				if (type === 3) {
					r *= 2;
				}
				if (pow === 1) {
					r *= r;
				} else if (pow === 2) {
					r *= r * r;
				} else if (pow === 3) {
					r *= r * r * r;
				} else if (pow === 4) {
					r *= r * r * r * r;
				}

				if (type === 1) {
					this.ratio = 1 - r;
				} else if (type === 2) {
					this.ratio = r;
				} else if (time / duration < 0.5) {
					this.ratio = r / 2;
				} else {
					this.ratio = 1 - r / 2;
				}
			} else {
				this.ratio = this._ease.getRatio(time / duration);
			}
		}

		if (this._time === prevTime && !force) {
			return;
		} else if (!this._initted) {
			this._init();
			if (!this._initted || this._gc) {
				//immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
				return;
			} else if (!force && this._firstPT && (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration)) {
				this._time = this._totalTime = prevTime;
				this._rawPrevTime = prevRawPrevTime;
				_lazyTweens.push(this);
				this._lazy = [time, suppressEvents];
				return;
			}
			//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
			if (this._time && !isComplete) {
				this.ratio = this._ease.getRatio(this._time / duration);
			} else if (isComplete && this._ease._calcEnd) {
				this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1);
			}
		}
		if (this._lazy !== false) {
			//in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
			this._lazy = false;
		}
		if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
			this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
		}
		if (prevTime === 0) {
			if (this._startAt) {
				if (time >= 0) {
					this._startAt.render(time, suppressEvents, force);
				} else if (!callback) {
					callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
				}
			}
			if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
				this._callback("onStart");
			}
		}
		pt = this._firstPT;
		while (pt) {
			if (pt.f) {
				pt.t[pt.p](pt.c * this.ratio + pt.s);
			} else {
				pt.t[pt.p] = pt.c * this.ratio + pt.s;
			}
			pt = pt._next;
		}

		if (this._onUpdate) {
			if (time < 0) if (this._startAt && time !== -0.0001) {
				//if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
				this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
			}
			if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
				this._callback("onUpdate");
			}
		}
		if (callback) if (!this._gc || force) {
			//check _gc because there's a chance that kill() could be called in an onUpdate
			if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) {
				//-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
				this._startAt.render(time, suppressEvents, force);
			}
			if (isComplete) {
				if (this._timeline.autoRemoveChildren) {
					this._enabled(false, false);
				}
				this._active = false;
			}
			if (!suppressEvents && this.vars[callback]) {
				this._callback(callback);
			}
			if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
				//the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
				this._rawPrevTime = 0;
			}
		}
	};

	p._kill = function (vars, target, overwritingTween) {
		if (vars === "all") {
			vars = null;
		}
		if (vars == null) if (target == null || target === this.target) {
			this._lazy = false;
			return this._enabled(false, false);
		}
		target = typeof target !== "string" ? target || this._targets || this.target : TweenLite.selector(target) || target;
		var simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline,
		    i,
		    overwrittenProps,
		    p,
		    pt,
		    propLookup,
		    changed,
		    killProps,
		    record,
		    killed;
		if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
			i = target.length;
			while (--i > -1) {
				if (this._kill(vars, target[i], overwritingTween)) {
					changed = true;
				}
			}
		} else {
			if (this._targets) {
				i = this._targets.length;
				while (--i > -1) {
					if (target === this._targets[i]) {
						propLookup = this._propLookup[i] || {};
						this._overwrittenProps = this._overwrittenProps || [];
						overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
						break;
					}
				}
			} else if (target !== this.target) {
				return false;
			} else {
				propLookup = this._propLookup;
				overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
			}

			if (propLookup) {
				killProps = vars || propLookup;
				record = vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && ((typeof vars === "undefined" ? "undefined" : _typeof(vars)) !== "object" || !vars._tempKill); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
				if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
					for (p in killProps) {
						if (propLookup[p]) {
							if (!killed) {
								killed = [];
							}
							killed.push(p);
						}
					}
					if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
						//if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
						return false;
					}
				}

				for (p in killProps) {
					if (pt = propLookup[p]) {
						if (simultaneousOverwrite) {
							//if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
							if (pt.f) {
								pt.t[pt.p](pt.s);
							} else {
								pt.t[pt.p] = pt.s;
							}
							changed = true;
						}
						if (pt.pg && pt.t._kill(killProps)) {
							changed = true; //some plugins need to be notified so they can perform cleanup tasks first
						}
						if (!pt.pg || pt.t._overwriteProps.length === 0) {
							if (pt._prev) {
								pt._prev._next = pt._next;
							} else if (pt === this._firstPT) {
								this._firstPT = pt._next;
							}
							if (pt._next) {
								pt._next._prev = pt._prev;
							}
							pt._next = pt._prev = null;
						}
						delete propLookup[p];
					}
					if (record) {
						overwrittenProps[p] = 1;
					}
				}
				if (!this._firstPT && this._initted) {
					//if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
					this._enabled(false, false);
				}
			}
		}
		return changed;
	};

	p.invalidate = function () {
		if (this._notifyPluginsOfEnabled) {
			TweenLite._onPluginEvent("_onDisable", this);
		}
		this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
		this._notifyPluginsOfEnabled = this._active = this._lazy = false;
		this._propLookup = this._targets ? {} : [];
		Animation.prototype.invalidate.call(this);
		if (this.vars.immediateRender) {
			this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
			this.render(Math.min(0, -this._delay)); //in case delay is negative.
		}
		return this;
	};

	p._enabled = function (enabled, ignoreTimeline) {
		if (!_tickerActive) {
			_ticker.wake();
		}
		if (enabled && this._gc) {
			var targets = this._targets,
			    i;
			if (targets) {
				i = targets.length;
				while (--i > -1) {
					this._siblings[i] = _register(targets[i], this, true);
				}
			} else {
				this._siblings = _register(this.target, this, true);
			}
		}
		Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
		if (this._notifyPluginsOfEnabled) if (this._firstPT) {
			return TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
		}
		return false;
	};

	//----TweenLite static methods -----------------------------------------------------

	TweenLite.to = function (target, duration, vars) {
		return new TweenLite(target, duration, vars);
	};

	TweenLite.from = function (target, duration, vars) {
		vars.runBackwards = true;
		vars.immediateRender = vars.immediateRender != false;
		return new TweenLite(target, duration, vars);
	};

	TweenLite.fromTo = function (target, duration, fromVars, toVars) {
		toVars.startAt = fromVars;
		toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
		return new TweenLite(target, duration, toVars);
	};

	TweenLite.delayedCall = function (delay, callback, params, scope, useFrames) {
		return new TweenLite(callback, 0, { delay: delay, onComplete: callback, onCompleteParams: params, callbackScope: scope, onReverseComplete: callback, onReverseCompleteParams: params, immediateRender: false, lazy: false, useFrames: useFrames, overwrite: 0 });
	};

	TweenLite.set = function (target, vars) {
		return new TweenLite(target, 0, vars);
	};

	TweenLite.getTweensOf = function (target, onlyActive) {
		if (target == null) {
			return [];
		}
		target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
		var i, a, j, t;
		if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
			i = target.length;
			a = [];
			while (--i > -1) {
				a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
			}
			i = a.length;
			//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
			while (--i > -1) {
				t = a[i];
				j = i;
				while (--j > -1) {
					if (t === a[j]) {
						a.splice(i, 1);
					}
				}
			}
		} else {
			a = _register(target).concat();
			i = a.length;
			while (--i > -1) {
				if (a[i]._gc || onlyActive && !a[i].isActive()) {
					a.splice(i, 1);
				}
			}
		}
		return a;
	};

	TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function (target, onlyActive, vars) {
		if ((typeof onlyActive === "undefined" ? "undefined" : _typeof(onlyActive)) === "object") {
			vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
			onlyActive = false;
		}
		var a = TweenLite.getTweensOf(target, onlyActive),
		    i = a.length;
		while (--i > -1) {
			a[i]._kill(vars, target);
		}
	};

	/*
  * ----------------------------------------------------------------
  * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
  * ----------------------------------------------------------------
  */
	var TweenPlugin = _class("plugins.TweenPlugin", function (props, priority) {
		this._overwriteProps = (props || "").split(",");
		this._propName = this._overwriteProps[0];
		this._priority = priority || 0;
		this._super = TweenPlugin.prototype;
	}, true);

	p = TweenPlugin.prototype;
	TweenPlugin.version = "1.19.0";
	TweenPlugin.API = 2;
	p._firstPT = null;
	p._addTween = _addPropTween;
	p.setRatio = _setRatio;

	p._kill = function (lookup) {
		var a = this._overwriteProps,
		    pt = this._firstPT,
		    i;
		if (lookup[this._propName] != null) {
			this._overwriteProps = [];
		} else {
			i = a.length;
			while (--i > -1) {
				if (lookup[a[i]] != null) {
					a.splice(i, 1);
				}
			}
		}
		while (pt) {
			if (lookup[pt.n] != null) {
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
					pt._prev = null;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
				}
			}
			pt = pt._next;
		}
		return false;
	};

	p._mod = p._roundProps = function (lookup) {
		var pt = this._firstPT,
		    val;
		while (pt) {
			val = lookup[this._propName] || pt.n != null && lookup[pt.n.split(this._propName + "_").join("")];
			if (val && typeof val === "function") {
				//some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
				if (pt.f === 2) {
					pt.t._applyPT.m = val;
				} else {
					pt.m = val;
				}
			}
			pt = pt._next;
		}
	};

	TweenLite._onPluginEvent = function (type, tween) {
		var pt = tween._firstPT,
		    changed,
		    pt2,
		    first,
		    last,
		    next;
		if (type === "_onInitAllProps") {
			//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
			while (pt) {
				next = pt._next;
				pt2 = first;
				while (pt2 && pt2.pr > pt.pr) {
					pt2 = pt2._next;
				}
				if (pt._prev = pt2 ? pt2._prev : last) {
					pt._prev._next = pt;
				} else {
					first = pt;
				}
				if (pt._next = pt2) {
					pt2._prev = pt;
				} else {
					last = pt;
				}
				pt = next;
			}
			pt = tween._firstPT = first;
		}
		while (pt) {
			if (pt.pg) if (typeof pt.t[type] === "function") if (pt.t[type]()) {
				changed = true;
			}
			pt = pt._next;
		}
		return changed;
	};

	TweenPlugin.activate = function (plugins) {
		var i = plugins.length;
		while (--i > -1) {
			if (plugins[i].API === TweenPlugin.API) {
				_plugins[new plugins[i]()._propName] = plugins[i];
			}
		}
		return true;
	};

	//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
	_gsDefine.plugin = function (config) {
		if (!config || !config.propName || !config.init || !config.API) {
			throw "illegal plugin definition.";
		}
		var propName = config.propName,
		    priority = config.priority || 0,
		    overwriteProps = config.overwriteProps,
		    map = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_mod", mod: "_mod", initAll: "_onInitAllProps" },
		    Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function () {
			TweenPlugin.call(this, propName, priority);
			this._overwriteProps = overwriteProps || [];
		}, config.global === true),
		    p = Plugin.prototype = new TweenPlugin(propName),
		    prop;
		p.constructor = Plugin;
		Plugin.API = config.API;
		for (prop in map) {
			if (typeof config[prop] === "function") {
				p[map[prop]] = config[prop];
			}
		}
		Plugin.version = config.version;
		TweenPlugin.activate([Plugin]);
		return Plugin;
	};

	//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
	a = window._gsQueue;
	if (a) {
		for (i = 0; i < a.length; i++) {
			a[i]();
		}
		for (p in _defLookup) {
			if (!_defLookup[p].func) {
				window.console.log("GSAP encountered missing dependency: " + p);
			}
		}
	}

	_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated
})(typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : undefined || window, "TweenLite");

cc._RFpop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"WupinItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd3e39OALhBJ/J6hvFPICp3U', 'WupinItem');
// js\wupin\WupinItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},

    /**
     * 装备
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZhuangbeiItem: function initZhuangbeiItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;
        var richString = '<color=#FFFF00 click="zhuangbeiRichTextEvent">' + data.name + '</c>';
        this.richLabel.string = richString;
    },

    zhuangbeiRichTextEvent: function zhuangbeiRichTextEvent() {
        cc.log('zhuangbei item ' + this.data.name);
        curItemData = this.data;
        cc.log(this.data);
        zhaungBeiDetailsZbid.id = this.data.id;
        loadScene(HxsgScenes.zhuangbei, HxsgScenes.wupin);
    },

    /**
     * 矿石
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initKuangshiItem: function initKuangshiItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;

        var richString = '<color=#FFFF00 click="kuangshiRichTextEvent">' + data.zwName + '(' + data.zwXiaoGuo + ')' + '</c>';
        this.richLabel.string = richString;
    },

    kuangshiRichTextEvent: function kuangshiRichTextEvent() {
        cc.log('kuangshi item ' + this.data.zwName);
        curItemData = { 'id': this.data.id + '' };
        loadScene(HxsgScenes.baoshi, HxsgScenes.wupin);
    },

    /**
     * 杂物
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZawuItem: function initZawuItem(index, type, data, event, userParam) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.clickEvent = event;
        this.userParam = userParam;
        //数量
        var btn = this.node.parent.getChildByName('useBtn');
        btn.active = data.custom1 === '1' ? true : false; //&& (data.num > 0)

        var num = '(' + data.num + ')';

        var richString = '<color=#FFFF00 click="zawuRichTextEvent">' + data.name + '</c> ' + num;
        this.richLabel.string = richString;
    },

    zawuRichTextEvent: function zawuRichTextEvent() {
        cc.log('zawu item ' + this.data.name);
        var url = HxsgUrl.zawuItemUrl;
        var data = JSON.stringify({ 'id': this.data.id });
        ajaxData(url, data);
    },

    buttonEvent: function buttonEvent() {
        cc.log('buttonEvent');
        if (this.clickEvent) {
            this.clickEvent(this.userParam);
        }
    },

    /**
     * index奇偶数判断，奇数关闭sprite组件，显示背景明暗相间效果
     */
    spriteToggle: function spriteToggle(index) {
        var isOdd = index % 2 === 0 ? true : false;
        this.sprite.enabled = isOdd;
    }
});

cc._RFpop();
},{}],"WupinManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7f31fm60v5Gfbfgie0o5d73', 'WupinManager');
// js\wupin\WupinManager.js

'use strict';

window.curItemData = null;
window.currentWupin = 0;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        kshuifuPrefab: cc.Prefab,
        yaopinPrefab: cc.Prefab,
        zhuangbeiPrefab: cc.Prefab,
        kuangshiPrefab: cc.Prefab,
        zawuPrefab: cc.Prefab,

        content: cc.Node,
        title: cc.Label,
        fuzhong: cc.Label,
        menu: {
            default: [],
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        loadCommomScence();
        this.clearScrollview();

        switch (currentWupin) {
            case 0:
                this.yaopinEvent();
                break;
            case 1:
                this.zhuangbeiEvent();
                break;
            case 2:
                this.kuangshiEvent();
                break;
            case 3:
                this.zawuEvent();
                break;
            default:
                this.yaopinEvent();
                break;
        }
    },

    /**
     * 点击事件-->快速恢复
     */
    kshuifuEvent: function kshuifuEvent() {
        cc.log('wupin mananger 快速恢复');
    },

    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
        curItemData = null;
    },
    myZhuangBeiEvent: function myZhuangBeiEvent() {
        //调用通用的返回上一场景方法
        loadingScene(HxsgScenes.myZhuangBei, HxsgScenes.wupin);
    },
    /**
     * -->药品
     */
    yaopinEvent: function yaopinEvent() {
        cc.log('wupin mananger 药品');
        this.title.string = '药品';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 0;
        this.menu[currentWupin].interactable = false;

        var kshuifu = cc.instantiate(this.kshuifuPrefab);
        this.content.addChild(kshuifu);
        this.kshuifuButton = kshuifu.getChildByName('huifuBtn');
        this.kshuifuButton.on(cc.Node.EventType.TOUCH_END, function () {
            //TODO快速恢复
            cc.log('wupin mananger 药品 快速恢复');
        });

        // ajax(HxsgUrl.yaopinUrl, this.initYaopin);
    },

    initYaopin: function initYaopin(data) {
        if (currentWupin != data.type) return;

        // this.content.height = (msg.length + 1) * 65;
    },

    /**
     * -->装备
     */
    zhuangbeiEvent: function zhuangbeiEvent() {
        cc.log('wupin mananger 装备');
        this.title.string = '装备';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 1;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.zhuangbeiUrl, null, this.initZhuangbei);
    },

    initZhuangbei: function initZhuangbei(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.zhuangbeiPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            comp.initZhuangbeiItem(i, 'zhuangbei', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    /**
     * -->矿石
     */
    kuangshiEvent: function kuangshiEvent() {
        cc.log('wupin mananger 矿石');
        this.title.string = '矿石';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 2;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.kuangshiUrl, null, this.initKuangshi);
    },

    initKuangshi: function initKuangshi(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var item = cc.instantiate(self.kuangshiPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            var itemMsg = msg[i];
            comp.initKuangshiItem(i, 'kuangshi', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    /**
     * -->杂物
     */
    zawuEvent: function zawuEvent() {
        cc.log('wupin mananger 杂物');
        this.title.string = '杂物';
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 3;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.zawuUrl, null, this.initZawu);
    },

    initZawu: function initZawu(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            try {
                var itemMsg = msg[i];
                var item = cc.instantiate(self.zawuPrefab);
                self.content.addChild(item);
                var comp = item.getComponentInChildren('WupinItem');
                comp.initZawuItem(i, 'zawu', itemMsg, self.zawuItemEvent, itemMsg);
            } catch (e) {}
        }
        self.content.height = msg.length * 65;
    },

    zawuItemEvent: function zawuItemEvent(data) {
        var type = data.type1;
        userWuPin.wupinId = data.id;
        userWuPin.objects = data;
        cc.log(userWuPin.wupinId);
        if (type == '令') {
            cc.log('令');
            loadScene(HxsgScenes.userJiangJunLing, HxsgScenes.wupin);
        }
        if (type == '技能书' || type == '技能') {
            cc.log('技能书');
            loadScene(HxsgScenes.userList, HxsgScenes.wupin);
        }
        if (type == '心法书') {
            cc.log('心法书');
            loadScene(HxsgScenes.userXinFaShu, HxsgScenes.wupin);
        }
        if (type == '石') {
            cc.log('砸矿石');
            self.userMineral();
        }
    },
    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    },
    userMineral: function userMineral() {
        cc.log('data:' + userWuPin.wupinId);
        ajaxData(HxsgUrl.userMineral, { 'id': userWuPin.wupinId, 'num': '1' }, self.tiShi);
    },
    tiShi: function tiShi(data) {
        cc.log(data);
        showAlert(data.msg);
    }

});

cc._RFpop();
},{}],"alert":[function(require,module,exports){
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
},{}],"back":[function(require,module,exports){
"use strict";
cc._RFpush(module, '680bboqzy1NgpcwQyM+uvi1', 'back');
// js\common\back.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {},
    backEvent: function backEvent() {
        returnLast();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"bangItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '867a2xjhsRA6YWSs/8rqFcd', 'bangItem');
// js\gamble\bangItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.RichText
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setMsg: function setMsg(data) {
        this.msg.string = data;
    },
    getMsg: function getMsg() {
        return this.msg.string;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"bang":[function(require,module,exports){
"use strict";
cc._RFpush(module, '37ddcArJ7tBfbAGtluYAXD/', 'bang');
// js\gc\bang.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        bangItem: cc.Prefab,
        content: cc.Node,
        title: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        self.title.string = ChiBiVo.title;
        ajaxData(ChiBiVo.url, null, this.loading);
    },
    loading: function loading(data) {
        // this.clearScrollview();
        var msg = data.msg;
        cc.log(data);
        if (msg == '' || typeof msg == 'undefined' || msg.length == 0) {
            showAlert("系统没有该信息！");
        } else {
            self.content.removeAllChildren();
            self.content.height = msg.length * 100;
            for (var i = 0; i < msg.length; i++) {
                var itemMsg = msg[i];
                var item = cc.instantiate(self.bangItem);

                self.content.addChild(item);
                var comp = item.getComponent('bangItem');
                if (ChiBiVo.title == "历史查询") {
                    comp.setMsg("第" + msg[i].id + "期赤壁斗" + msg[i].resut + "胜利");
                }
                if (ChiBiVo.title == "战利品排行") {
                    comp.setMsg("<color=#F19CC5>" + msg[i].rolename + "</c>" + msg[i].jin + "金" + msg[i].yin + "银");
                }
                if (ChiBiVo.title == "声援记录") {
                    var m = "";
                    if (msg[i].jieguo == null || typeof msg[i].jieguo == 'undefined') {
                        m = "待定";
                    } else {
                        m = msg[i].jieguo;
                    }
                    comp.setMsg("第" + msg[i].num + "期赤壁斗，增援" + msg[i].result + "军" + msg[i].jin + "金" + msg[i].yin + "银【" + m + "】");
                }
                if (ChiBiVo.title == "奖励排行") {
                    comp.setMsg("<color=#F19CC5>" + msg[i].rolename + "</c>" + msg[i].jin + "金" + msg[i].yin + "银");
                }
                // comp.selectBn.node.on("click",self.skillList,self)
            }
        }
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function backEvent() {
        returnLast();
    }
});

cc._RFpop();
},{}],"baoshiDetail2":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b44ebNL62xGSZdZpeb3rNIg', 'baoshiDetail2');
// js\wupin\zhuangbei\baoshiDetail2.js

'use strict';

var self;

cc.Class({
    extends: cc.Component,

    properties: {
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
        self = this;
        this.onloadBaoShi();
    },
    onloadBaoShi: function onloadBaoShi() {

        ajaxData(HxsgUrl.xqbsList, { 'zbid': zhaungBeiDetailsZbid.id }, function (data) {
            console.log(data.data);
            if (data.code == "000") {
                (function () {
                    var dataArry = data.data;
                    self.node.removeAllChildren();
                    self.node.height = dataArry.length / 6 * 60 + 240;

                    var _loop = function _loop(i) {
                        cc.loader.loadRes('prefabs/kong', cc.Prefab, function (err, prefab) {
                            if (!err) {
                                var kong = cc.instantiate(prefab);
                                // 使用事件名来注册
                                kong.on('touchstart', function (event) {
                                    if (cc.find('Canvas/zbBaoshi2') != null) {
                                        cc.find('Canvas/zbBaoshi2').destroy();
                                    }
                                    cc.loader.loadRes('prefabs/zbBaoshi2', cc.Prefab, function (err, prefab) {
                                        if (!err) {
                                            var zbBaoshi = cc.instantiate(prefab);
                                            cc.find('Canvas').addChild(zbBaoshi, 90);
                                            zbBaoshi.setPositionX(30);
                                            zbBaoshi.setPositionY(-10);
                                            //加載zbBaoshi腳本,初始化界面
                                            var zbBaoshiJs = zbBaoshi.getComponent('zbBaoshiDetail');
                                            zbBaoshiJs.init(dataArry[i]);
                                        }
                                    });
                                }, this);
                                self.node.addChild(kong);
                            }
                        });
                    };

                    for (var i = 0; i < dataArry.length; i++) {
                        _loop(i);
                    }
                })();
            } else {
                showAlert("服务器出问题了");
            }
        });
    },
    click: function click() {
        if (cc.find('Canvas/bs') != null) {
            cc.find('Canvas/bs').destroy();
        }
    }

});

cc._RFpop();
},{}],"buffDetail":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fc178Y6Sy9Iya94IOvrYc80', 'buffDetail');
// js\pk\buffDetail.js

"use strict";

var self;

cc.Class({
    extends: cc.Component,

    properties: {
        feng: cc.SpriteFrame,
        wei: cc.SpriteFrame,
        luan: cc.SpriteFrame,
        gong: cc.SpriteFrame,
        yin: cc.SpriteFrame,
        su: cc.SpriteFrame,
        gu: cc.SpriteFrame,
        du: cc.SpriteFrame
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    getSpriteFrame: function getSpriteFrame(name) {
        cc.log(this[name]);

        return this[name];
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"buff":[function(require,module,exports){
"use strict";
cc._RFpush(module, '72b9e+O+DRFUrIvrk7xRY65', 'buff');
// js\pk\buff.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        buffPrefab: cc.Prefab
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
        self = this;
    },

    getBuffPrefab: function getBuffPrefab() {
        return self.buffPrefab;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"chatMsgItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '03a96gOmmROkbFyld5P4LOO', 'chatMsgItem');
// js\friends\chatMsgItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {},

    initChatMsgItem: function initChatMsgItem(index, type, data, event) {

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;
        var richString;
        var time = data.data;
        var d = new Date(time);
        var hh = d.getHours();
        var mm = d.getMinutes();
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (hh < 10) {
            hh = "0" + hh;
        }
        var times = hh + ":" + mm;
        if (myFriends.friendid == data.roleid) {
            richString = times + '<color=#FF0000 click="zawuRichTextEvent">' + data.rolename + ":<c><color=#FAF9F9 >" + data.message + '</c>';
        } else {
            richString = times + '<color=#00B30F click="zawuRichTextEvent">' + data.rolename + ':<c><color=#FAF9F9>' + data.message + '</c>';
        }

        this.richLabel.string = richString;
    }

});

cc._RFpop();
},{}],"chiBiYaZhu":[function(require,module,exports){
"use strict";
cc._RFpush(module, '79986+13DpJeaaVp1maOhRq', 'chiBiYaZhu');
// js\gamble\chiBiYaZhu.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        topMsg: cc.Label,
        playerMoney: cc.Label,
        yaZhuMoney: cc.Label,
        wei: {
            default: null,
            type: cc.EditBox
        },
        shu: {
            default: null,
            type: cc.EditBox
        },
        wu: {
            default: null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        ajaxData(HxsgUrl.loadYaZhuMsg, null, function (msg) {

            self.playerMoney.string = "您有" + msg.msg.roleJin + "金" + msg.msg.roleYin + "银";

            self.yaZhuMoney.string = "您目前已增援" + msg.msg.sumJin + "金" + msg.msg.sumYin + "银";
        });
        self = this;
        self.topMsg.string = ChiBiVo.topMsg;
    },
    backEvent: function backEvent() {
        var yaZhu = cc.find("Canvas/chiBiYaZhu");
        yaZhu.active = false;
        var chibi = cc.find("Canvas/chibi").getComponent("chiBi");
        chibi.load();
    },
    sure: function sure(e, num) {
        var money;
        var result;
        var data;
        var tishi;

        switch (num) {
            case '1':
                {
                    money = self.wei.string;

                    result = '魏';

                    break;
                }
            case '2':
                {
                    money = self.shu.string;
                    result = '蜀';
                    break;
                }
            case '3':
                {
                    money = self.wu.string;
                    result = '吴';
                    break;
                }
        }
        if (ChiBiVo.type == "jin") {
            data = { 'result': result, 'jin': money };
            tishi = "您押了" + result + "军" + money + "金砖";
        } else {
            data = { 'result': result, 'yin': money };
            tishi = "您押了" + result + "军" + money + "银两";
        }

        ajaxData(HxsgUrl.chiBiYaZhu, data, function (msg) {
            if ("true" == msg.msg) {
                showAlert(tishi);
            } else if ("5001" == msg.msg) {
                showAlert("每期押注总数不能超过1000金10万银");
            } else if ("false" == msg.msg) {
                showAlert("您的余额不足");
            }

            self.onLoad();
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"chiBi":[function(require,module,exports){
"use strict";
cc._RFpush(module, '278c0pEPRxN95Nkdaj/gSFg', 'chiBi');
// js\gamble\chiBi.js

"use strict";

/**
 * 赤壁游戏基类
 */
var self;
var _times = 3000;
cc.Class({
    extends: cc.Component,

    properties: {
        num: cc.Label,
        gameTime: cc.Label,
        battleMsg: cc.Label,
        wu: cc.Label,
        shu: cc.Label,
        wei: cc.Label,
        gameResult: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        var yaZhu = cc.find("Canvas/chiBiYaZhu");
        yaZhu.active = false;
        self = this;
        SocketEvents.cbMsg = function () {
            self.load();
        };
        ajaxData(HxsgUrl.chiBiTime, null, self.times);
        this.load();
    },
    sure: function sure() {
        loadingScene(HxsgScenes.guangChang, HxsgScenes.index);
    },
    times: function times(msg) {
        _times = msg.times;
        _times = Date.now() + _times;
        self.schedule(self.scheduleTime, 1);
    },
    scheduleTime: function scheduleTime() {
        ChiBiVo.num = _times - Date.now();
        if (_times - Date.now() <= 0 || typeof _times == 'undefined') {
            self.unschedule(self.scheduleTime);
            var jiesuan = cc.find("Canvas/jiesuan");
            jiesuan.active = true;
            jiesuan.getComponent("jiesuan").setMsg("赤壁结算中，请稍后再来");
        }
        var minutes = Math.floor((_times - Date.now()) / 1000 / 60 % 60); //所余分钟数  
        var second = Math.floor((_times - Date.now()) / 1000 % 60); //所余秒数  
        //1分58秒后开盅，买定离手
        var target = cc.find("Canvas/saizi/main/label2");
        var mstr = minutes.toString() + "分" + second.toString() + "秒后决出胜负，请求增援";
        self.gameTime.string = mstr;

        //times=times-1000;

    },
    load: function load() {
        var rand = Math.floor(Math.random() * 3);
        var battleMsg = "";
        switch (rand) {
            case 0:
                {
                    battleMsg = "吴军节节败退，魏军旗开得胜";
                    break;
                }
            case 1:
                {
                    battleMsg = "蜀军新得名将，魏军士气低落";
                    break;
                }
            case 2:
                {
                    battleMsg = "魏军被困山谷，蜀军趁虚而入";
                    break;
                }

        }
        self.battleMsg.string = battleMsg;
        ajaxData(HxsgUrl.loadChiBi, null, function (msg) {
            try {

                var ld = msg.msg.result;
                var yaMsg = msg.msg.cbLi;
                self.num.string = "第" + msg.msg.num + "期赤壁斗进行中";
                if (yaMsg == null || typeof yaMsg == 'undefined' || yaMsg.length == 0) {
                    self.wei.string = "魏军目前军资0金0银";
                    self.shu.string = "蜀军目前军资0金0银";
                    self.wu.string = "吴军目前军资0金0银";
                } else {
                    for (var key in yaMsg) {
                        if (yaMsg[key].result == "魏") {
                            self.wei.string = "魏军目前军资" + yaMsg[key].jin + "金" + yaMsg[key].yin + "银";
                        }
                        if (yaMsg[key].result == "蜀") {
                            self.shu.string = "蜀军目前军资" + yaMsg[key].jin + "金" + yaMsg[key].yin + "银";
                        }
                        if (yaMsg[key].result == "吴") {
                            self.wu.string = "吴军目前军资" + yaMsg[key].jin + "金" + yaMsg[key].yin + "银";
                        }
                    }
                }

                self.gameResult.string = "上次战事" + ld + "军胜利";
            } catch (e) {
                cc.log(e);
            }
        });
    },
    zyjz: function zyjz() {
        cc.log("增援金砖");
        ChiBiVo.topMsg = "增援金砖";
        ChiBiVo.type = "jin";
        var yaZhu = cc.find("Canvas/chiBiYaZhu");
        yaZhu.active = true;
    },
    zyyl: function zyyl() {
        ChiBiVo.topMsg = "增援银两";
        ChiBiVo.type = "yin";
        var yaZhu = cc.find("Canvas/chiBiYaZhu");
        yaZhu.active = true;
        cc.log("增援银两");
    },
    zlpph: function zlpph() {
        cc.log("战利品排行");

        ChiBiVo.title = "战利品排行";
        ChiBiVo.url = HxsgUrl.chiBiWinRecord;
        loadingScene(HxsgScenes.bang, HxsgScenes.saizi);
    },
    lscx: function lscx() {
        cc.log("历史查询");
        ChiBiVo.title = "历史查询";
        ChiBiVo.url = HxsgUrl.chiBiHistory;
        loadingScene(HxsgScenes.bang, HxsgScenes.saizi);
    },
    syjl: function syjl() {
        cc.log("声援记录");
        ChiBiVo.title = "声援记录";
        ChiBiVo.url = HxsgUrl.chiBiYaZhuRecord;
        loadingScene(HxsgScenes.bang, HxsgScenes.saizi);
    },
    jlph: function jlph() {
        cc.log("奖励排行");
        ChiBiVo.title = "奖励排行";
        ChiBiVo.url = HxsgUrl.chiBiBang;
        loadingScene(HxsgScenes.bang, HxsgScenes.saizi);
    },
    yxsm: function yxsm() {
        cc.log("游戏说明");
        ChiBiVo.title = "游戏说明";
        loadingScene(HxsgScenes.bang, HxsgScenes.saizi);
    }
});

cc._RFpop();
},{}],"chuZhiPy":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd3908F+0o5PL6+3THdR61X5', 'chuZhiPy');
// js\fuJiang\chuZhiPy\chuZhiPy.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        jjMsg: cc.RichText,
        fuName: cc.Label,
        cz: cc.Label,
        gj: cc.Label,
        jl: cc.Label,
        mj: cc.Label,
        qx: cc.Label,
        czb: cc.Button,
        gjb: cc.Button,
        jlb: cc.Button,
        qxb: cc.Button,
        mjb: cc.Button,
        pysm: cc.Button,
        qtfj: cc.Button,
        zyfj: cc.Button

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
    /**
       * 点击事件-->返回
       */
    backEvent: function backEvent() {
        returnLast();
    },
    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        ajaxData(HxsgUrl.loadChuZhiPeiYang, { 'fuId': userWuPin.wupinId }, self.loadFujiangPy);
    },

    loadFujiangPy: function loadFujiangPy(msg) {
        var p = msg.msg;
        if (typeof p.czl == 'undefined') {
            showAlert(p.tiShiMsg);
        } else {
            self.jjMsg.string = p.jjMsg;
            self.fuName.string = p.fuName;
            self.cz.string = p.czl;
            self.gj.string = p.gj;
            self.qx.string = p.qx;
            self.jl.string = p.jl;
            self.mj.string = p.mj;
        }

        cc.log(p.tiShiMsg);
    },
    pycz: function pycz() {
        var da = { "type": "成长", "fuId": userWuPin.wupinId };
        ajaxData(HxsgUrl.peiYangFuJiang, da, self.pyajax);
    },
    pygj: function pygj() {
        var da = { "type": "攻击", "fuId": userWuPin.wupinId };
        ajaxData(HxsgUrl.peiYangFuJiang, da, self.pyajax);
    },
    pymj: function pymj() {
        var da = { "type": "敏捷", "fuId": userWuPin.wupinId };
        ajaxData(HxsgUrl.peiYangFuJiang, da, self.pyajax);
    },
    pyjl: function pyjl() {
        var da = { "type": "精力", "fuId": userWuPin.wupinId };
        ajaxData(HxsgUrl.peiYangFuJiang, da, self.pyajax);
    },
    pyqx: function pyqx() {
        var da = { "type": "气血", "fuId": userWuPin.wupinId };
        ajaxData(HxsgUrl.peiYangFuJiang, da, self.pyajax);
    },
    pyShuoMing: function pyShuoMing() {
        loadingScene(HxsgScenes.pyShuoMing, HxsgScenes.chuZhiPy);
        //cc.director.loadScene('pyShuoMing');
    },
    pyajax: function pyajax(msg) {
        var m = msg.msg;
        if (m[0] == 0) {
            self.jjMsg.string = "<color=#ff0000>您没有将军令了!</c>";
        } else {
            ajaxData(HxsgUrl.loadChuZhiPeiYang, { 'fuId': userWuPin.wupinId }, self.loadFujiangPy);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"commonItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e1b83955fdPh4VszYrUTGIt', 'commonItem');
// js\gamble\commonItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        richText: cc.RichText
    },

    init: function init(data, id) {
        if (this.node.name === "zhuanqianItem") {
            var str = "<color=#ff9e00>【" + data.rolename + "】</c>";
            if (typeof data.jin != "undefined" && data.jin !== null && data.jin !== 0) {
                str += "<color=#ffffff>" + "(赢得" + data.jin.toString() + "金)" + "</color>";
            }
            if (typeof data.yin != "undefined" && data.yin !== null && data.yin !== 0) {
                str += "<color=#ffffff>" + "(赢得" + data.yin.toString() + "银)" + "</color>";
            }
            this.richText.string = str;
            this.id = id;
        } else {
            var str = "<color=#ff9e00>【" + data.rolename + "】</c>在第" + data.num + "期" + "";
            if (typeof data.jin != "undefined" && data.jin !== null && data.jin !== 0) {
                str += "<color=#ffffff>" + "(买" + data.result + "" + data.jin.toString() + "金)" + "</color>";
            }
            if (typeof data.yin != "undefined" && data.yin !== null && data.yin !== 0) {
                str += "<color=#ffffff>" + "(买" + data.result + "" + data.yin.toString() + "银)" + "</color>";
            }
            if (data.jieguo == '输') {
                str += "<color=#ffffff>" + "," + data.jieguo + "</color>";
            } else {
                str += "<color=#EDF715>" + "," + data.jieguo + "</color>";
            }

            this.richText.string = str;
            this.id = id;
        }
        if (id % 2 === 0) {
            this.node.color = new cc.Color(0, 0, 38);
        } else {
            this.node.color = new cc.Color(99, 65, 99);
        }
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"commonlist":[function(require,module,exports){
"use strict";
cc._RFpush(module, '491c6NnhCRKsb/AZd+hW7JZ', 'commonlist');
// js\gamble\commonlist.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        var prefab = this.itemPrefab;
        var node = this.node;
        var ajaxUrl = '';
        cc.log(prefab.name);
        if ('zhuanqianitem' == prefab.name) {
            ajaxUrl = HxsgUrl.queryWinJinBang;
        } else {
            ajaxUrl = HxsgUrl.queryBettingRecord;
        }
        ajaxData(ajaxUrl, null, function (msg) {
            cc.log(msg.msg);
            var mheight = 0;
            for (var i = 0; i < msg.msg.length; ++i) {
                try {
                    var item = cc.instantiate(prefab);
                    node.addChild(item);
                    item.getComponent('commonItem').init(msg.msg[i], i);
                    mheight += item.height;
                } catch (e) {}
            }
            node.height = mheight;
        });
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    }

});

cc._RFpop();
},{}],"dzzb":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'decfbRPuRBL3YBU+1qlsTS7', 'dzzb');
// js\shichang\tjp\dzzb.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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
        loadCommomScence();
    },
    tk: function tk() {
        cc.director.loadScene('tkType');
    },
    wq: function wq() {
        cc.director.loadScene('wqType');
    }

});

cc._RFpop();
},{}],"end":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9f115hmhSRNAbD9G/m0aMn7', 'end');
// js\pk\end.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        background: [cc.SpriteFrame],
        bankLose: [cc.SpriteFrame]

    },

    // use this for initialization
    onLoad: function onLoad() {},
    gameOver: function gameOver() {

        var JsonData = pk.gameOverDetail;
        var arrJy = JsonData.jy;
        var arrJyResult = "";
        for (var key in arrJy) {
            arrJyResult += arrJy[key];
        }
        var arrDj = JsonData.djArr;
        var result = ".恭喜您获得";
        for (var i = 0; i < arrDj.length; i++) {
            result += "【" + arrDj[i].name + "】";
        }
        showAlert(arrJyResult + result, function () {
            cc.director.loadScene(HxsgScenes.index);
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"friendInfo":[function(require,module,exports){
"use strict";
cc._RFpush(module, '07cd6RXoUBO+aYpyKTxFTQT', 'friendInfo');
// js\friends\friendInfo.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {},
    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        cc.log(roleMsg.id);
        ajaxData(HxsgUrl.indexNewRoleMsg, roleMsg, this.init.bind(this));
    },
    init: function init(msg) {
        var m = msg.roleMsg;
        myFriends.friendid = m.id;
        myFriends.friendname = m.rolename;
        // cc.log(ajaxReturnData)
        var ViewNode = this.node.getChildByName("scrollView");
        var btnlist = ViewNode.getChildByName("view").getChildByName("content").getChildByName("top_btnlist");
        //拉黑，解黑
        var lahei = btnlist.getChildByName("lahei").getChildren()[0].getComponent(cc.Label);
        lahei.string = m.heiStatus;
        //禁言，解禁
        var jinyan = btnlist.getChildByName("jinyan").getChildren()[0].getComponent(cc.Label);
        jinyan.string = m.jinStatus;
        var playerInfo = ViewNode.getChildByName("view").getChildByName("content").getChildByName("playerinfo");
        var name = ViewNode.getChildByName("Info").getChildren()[0].getComponent(cc.Label);
        name.string = m.rolename + '(ID:' + m.id + ')' + '【' + m.roleStatus + '】';
        var img = playerInfo.getChildByName("img").getComponent(cc.Sprite);
        var zhiy = playerInfo.getChildByName("zhiy").getChildren()[0].getComponent(cc.Label);
        zhiy.string = m.level + '级' + m.zhiye;
        var chenh = playerInfo.getChildByName("chenh").getChildren()[0].getComponent(cc.Label);
        chenh.string = m.chenghao; //称号
        var jiaop = playerInfo.getChildByName("jiaop").getChildren()[0].getComponent(cc.Label);
        jiaop.string = m.jiaopai; //教派
        var huol = playerInfo.getChildByName("huol").getChildren()[0].getComponent(cc.Label);
        huol.string = m.tilizhi; //体力值
        var meil = playerInfo.getChildByName("meil").getChildren()[0].getComponent(cc.Label);
        meil.string = m.meili; //魅力值
        var tanw = playerInfo.getChildByName("tanw").getChildren()[0].getComponent(cc.Label);
        tanw.string = m.tanwei; //摊位
        var fanc = playerInfo.getChildByName("fanc").getChildren()[0].getComponent(cc.Label);
        fanc.string = m.fangchan; //房产
        var yis = playerInfo.getChildByName("yis").getChildren()[0].getComponent(cc.Label);
        yis.string = m.killnum; //杀人数目
        var xing = playerInfo.getChildByName("xing").getChildren()[0].getComponent(cc.Label);
        xing.string = m.xingge; //性格
        var peio = playerInfo.getChildByName("peio").getChildren()[0].getComponent(cc.Label);
        peio.string = m.peiou; //配偶
        var fuj = playerInfo.getChildByName("fuj").getChildren()[0].getComponent(cc.Label);

        var tianf = playerInfo.getChildByName("tianf").getChildren()[0].getComponent(cc.Label);
        tianf.string = m.tianfu; //天赋
        var zuoq = playerInfo.getChildByName("zuoq").getChildren()[0].getComponent(cc.Label);
        zuoq.string = m.zuoqi; //坐骑
        var kangx = playerInfo.getChildByName("kangx").getChildren()[0].getComponent(cc.Label);
        var kangf = playerInfo.getChildByName("kangf").getChildren()[0].getComponent(cc.Label);
        var feng = playerInfo.getChildByName("feng").getChildren()[0].getComponent(cc.Label);
    },
    onBtnList: function onBtnList(e, d) {
        switch (d) {
            case "1":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                loadScene(HxsgScenes.talking, HxsgScenes.friendInfo);
                break;
            case "2":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                myFriends.status = '202';
                myFriends.type = 'yes';
                ajaxData(HxsgUrl.noAddFriends, myFriends);
                break;
            case "3":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "4":
                try {
                    var notice = e.target.getChildByName('Label').getComponent(cc.Label).string;
                    console.log(notice);
                    if (notice === '拉黑') {
                        myFriends.status = '拉黑';
                        ajaxData(HxsgUrl.speakStatus, myFriends, function (data) {
                            if (data.msg === 'true') {
                                showAlert('拉黑成功');
                                e.target.getChildByName('Label').getComponent(cc.Label).string = '解黑';
                            }
                        });
                    }
                    if (notice === '解黑') {
                        myFriends.status = '正常';
                        ajaxData(HxsgUrl.speakStatus, myFriends, function (data) {
                            if (data.msg === 'true') {
                                showAlert('解黑成功');
                                e.target.getChildByName('Label').getComponent(cc.Label).string = '拉黑';
                            }
                        });
                    }
                    //拉黑解黑操作
                    cc.log(myFriends);
                } catch (e) {}

                break;
            case "5":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "6":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "7":
                try {
                    var notice = e.target.getChildByName('Label').getComponent(cc.Label).string;
                    console.log(notice);
                    if (notice === '禁言') {
                        showAlert("禁言成功，在本次登录时有效");
                        e.target.getChildByName('Label').getComponent(cc.Label).string = '解禁';
                    }
                    if (notice === '解禁') {
                        showAlert("解禁成功");
                        e.target.getChildByName('Label').getComponent(cc.Label).string = '禁言';
                    }
                    //拉黑解黑操作
                    cc.log(myFriends);
                } catch (e) {}
                break;
            case "8":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "9":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "10":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "11":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "12":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "13":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "14":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "15":
                console.log(e.target.getChildByName('Label').getComponent(cc.Label).string + "," + d);
                break;
            case "16":
                returnLast();
                break;
        }
    }
});

cc._RFpop();
},{}],"friendsItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c5026ad9PxDuoWhcU3m7QI/', 'friendsItem');
// js\friends\friendsItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button

    },

    // use this for initialization
    onLoad: function onLoad() {},
    /**
        * 装备
        * index: 实例化item的序号，0开始
        * type: 类型：yaopin，zhuangbei，kuangshi，zawu
        * data：数据
        * event：按钮回掉方法（如果有按钮）
        */
    initFriendsItem: function initFriendsItem(index, type, data) {
        var num = 0;
        this.spriteToggle(index);
        this.node.name = type + index;
        this.type = type;
        this.data = data;
        // this.event = event;
        var richString;

        var btn = this.selectBn.id = { 'id': data.friendId, 'name': data.friendName };

        //cc.log(btn+btn2);
        if (data.status == '离线') {
            richString = '<color=#918E83 click="friendInfo">' + data.friendName + '【离线】</c> ';
        } else {
            num = 1;
            richString = '<color=#FFFF00 click="friendInfo">' + data.friendName + '</c><color=#FF0000>【在线】</c> ';
        }

        this.richLabel.string = richString;
        this.richLabel.id = data;
        return num;
    },
    /**
    * 装备
    * index: 实例化item的序号，0开始
    * type: 类型：yaopin，zhuangbei，kuangshi，zawu
    * data：数据
    * event：按钮回掉方法（如果有按钮）
    */
    initFriendsList: function initFriendsList(index, type, data, event) {
        var num = 0;
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;
        var richString;

        var btn = this.selectBn.id = { 'id': data.id, 'name': data.rolename };

        //cc.log(btn+btn2);
        if (data.status == '离线') {
            richString = '<color=#918E83 click="friendInfo">' + data.rolename + '【离线】</c> ';
        } else {
            num = 1;
            richString = '<color=#FFFF00 click="friendInfo">' + data.rolename + '</c><color=#FF0000>【在线】</c> ';
        }

        this.richLabel.string = richString;
        this.richLabel.id = data;
        return num;
    },
    /**
     *跳转到好友详情界面 
     */
    friendInfo: function friendInfo(event) {
        var node = event.target;
        var r = node.getComponent(cc.RichText);
        cc.log(r.id);
        roleMsg.id = r.id.friendId;
        //  cc.log("跳转到好友详情界面:"+msg.friendName)
        loadingScene(HxsgScenes.friendInfo, HxsgScenes.friends);
    },
    /**
     * 装备
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZhuangbeiItem: function initZhuangbeiItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.event = event;

        var richString = '<color=#FFFF00 click="zhuangbeiRichTextEvent">' + data.friendName + '</c>';
        this.richLabel.string = richString;
    },

    RichTextEvent: function RichTextEvent() {
        cc.log('跳转到查询该角色详情界面' + this.data.name);
    },

    /**
     * 矿石
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initKuangshiItem: function initKuangshiItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.selectBn.getCom;
        var richString = '<color=#FFFF00 click="kuangshiRichTextEvent">' + data.zwName + '(' + data.zwXiaoGuo + ')' + '</c>';
        this.richLabel.string = richString;
    },

    kuangshiRichTextEvent: function kuangshiRichTextEvent() {
        cc.log('kuangshi item ' + this.data.zwName);
        curItemData = { 'id': this.data.id + '' };
        loadScene(HxsgScenes.baoshi, HxsgScenes.wupin);
    },

    /**
     * 杂物
     * index: 实例化item的序号，0开始
     * type: 类型：yaopin，zhuangbei，kuangshi，zawu
     * data：数据
     * event：按钮回掉方法（如果有按钮）
     */
    initZawuItem: function initZawuItem(index, type, data, event) {
        this.spriteToggle(index);

        this.node.name = type + index;
        this.type = type;
        this.data = data;
        this.clickEvent = event;

        //数量
        var btn = this.node.parent.getChildByName('useBtn');
        btn.active = data.custom1 === '1' ? true : false; //&& (data.num > 0)

        var num = '(' + data.num + ')';
        var richString;
        if (data.status == '离线') {
            richString = '<color=#918E83 click="zawuRichTextEvent">' + data.name + '</c> ' + num;
        } else {
            richString = '<color=#FFFF00 click="zawuRichTextEvent">' + data.name + '</c> ' + num;
        }

        this.richLabel.string = richString;
    },

    zawuRichTextEvent: function zawuRichTextEvent() {
        cc.log('zawu item ' + this.data.name);
        var url = HxsgUrl.zawuItemUrl;
        var data = JSON.stringify({ 'id': this.data.id });
        ajaxData(url, data);
    },

    buttonEvent: function buttonEvent() {
        if (this.clickEvent) {
            this.clickEvent();
        }
    },

    /**
     * index奇偶数判断，奇数关闭sprite组件，显示背景明暗相间效果
     */
    spriteToggle: function spriteToggle(index) {
        var isOdd = index % 2 === 0 ? true : false;
        this.sprite.enabled = isOdd;
    }
});

cc._RFpop();
},{}],"friendsListItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '69618wiQxZHS77HQ5Yt03E5', 'friendsListItem');
// js\friends\friendsListItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        richLabel: cc.RichText,
        sprite: cc.Sprite,
        selectBn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},
    /**
     *跳转到好友详情界面 
     */
    friendInfo: function friendInfo(event) {
        cc.log('跳转到好友详情界面');
        var node = event.target;
        var r = node.getComponent(cc.RichText);
        cc.log(r.id);
        roleMsg.id = r.id.id;
        //  cc.log("跳转到好友详情界面:"+msg.friendName)
        loadingScene(HxsgScenes.friendInfo, HxsgScenes.friends);
    },
    initFriendsList: function initFriendsList(index, type, data) {

        var num = 0;
        this.node.name = type + index;
        this.type = type;
        this.data = data;
        // this.event = event;
        var richString;

        var btn = this.selectBn.id = { 'id': data.id, 'name': data.rolename };

        //cc.log(btn+btn2);
        if (data.status == '离线') {
            richString = '<color=#918E83 click="friendInfo">' + data.rolename + '【离线】</c> ';
        } else {
            num = 1;
            richString = '<color=#FFFF00 click="friendInfo">' + data.rolename + '</c><color=#FF0000 click="friendInfo">【在线】</c> ';
        }
        this.richLabel.string = richString;
        this.richLabel.id = data;
        return num;
    }

});

cc._RFpop();
},{}],"friendsList":[function(require,module,exports){
"use strict";
cc._RFpush(module, '72a561qUzZCwqyDiGWbiTqZ', 'friendsList');
// js\friends\friendsList.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        yaopinPrefab: cc.Prefab,
        content: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        ajaxData(HxsgUrl.queryFriends, userWuPin.objects, this.friendsList);
    },
    friendsList: function friendsList(data) {
        // this.clearScrollview();
        var msg = data.msg;
        cc.log(data);
        var num = 0;
        if (msg == '' || typeof msg == 'undefined' || msg.length == 0) {
            showAlert("没有查到搜索信息！");
        } else {
            var total = msg.length;
            for (var i = 0; i < msg.length; i++) {
                var itemMsg = msg[i];
                var item = cc.instantiate(self.yaopinPrefab);
                self.content.addChild(item);
                var comp = item.getComponentInChildren('friendsListItem');
                num += comp.initFriendsList(i, 'friends', itemMsg);
                // comp.selectBn.node.on("click",self.skillList,self)
            }
            self.content.height = msg.length * 65;
        }
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function backEvent() {
        returnLast();
    }
});

cc._RFpop();
},{}],"friendsManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e0d6eI92jxJMIYujH2nqZ4k', 'friendsManager');
// js\friends\friendsManager.js

'use strict';

window.curItemData = null;
window.currentWupin = 0;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        kshuifuPrefab: cc.Prefab,
        yaopinPrefab: cc.Prefab,
        zhuangbeiPrefab: cc.Prefab,
        kuangshiPrefab: cc.Prefab,
        zawuPrefab: cc.Prefab,
        content: cc.Node,
        title: cc.Label,
        fuzhong: cc.Label,
        msg: cc.EditBox,
        menu: {
            default: [],
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        cc.director.preloadScene('talking');
        // this.clearScrollview();

        switch (currentWupin) {
            case 0:
                this.yaopinEvent();
                break;
            case 1:
                this.zhuangbeiEvent();
                break;
            case 2:
                this.kuangshiEvent();
                break;
            case 3:
                this.zawuEvent();
                break;
            default:
                this.yaopinEvent();
                break;
        }
    },

    /**
     * 点击事件-->快速恢复
     */
    sendMsg: function sendMsg() {
        //cc.log('wupin mananger 发送消息');
        ajaxData(HxsgUrl.sendMsgForFriends, { 'type': '好友' }, this.initYaopin);
        var msessage = this.msg.getComponent(cc.EditBox).string;
    },

    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.index, HxsgScenes.index);
        curItemData = null;
    },

    /**
     * -->药品
     */
    yaopinEvent: function yaopinEvent() {
        // cc.log('wupin mananger 好友');
        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 0;
        this.menu[currentWupin].interactable = false;

        // var kshuifu = cc.instantiate(this.kshuifuPrefab);
        // this.content.addChild(kshuifu);
        // this.kshuifuButton = kshuifu.getChildByName('huifuBtn');
        // this.kshuifuButton.on(cc.Node.EventType.TOUCH_END, function () {
        //     //TODO快速恢复
        //     cc.log('wupin mananger 药品 快速恢复');
        // });
        ajaxData(HxsgUrl.friends, { 'type': '好友' }, this.initYaopin);
    },
    queryMoHu: function queryMoHu(e, type) {
        var msg = cc.find("Canvas/mohu/input").getComponent('cc.EditBox').string;
        if (msg == '' || typeof msg == 'undefined') {
            showAlert("输入不能为空");
        } else {
            switch (type) {
                case "ID":
                    //正则表达式
                    var re = /[^0-9]/;
                    if (!re.test(msg)) {
                        userWuPin.objects = { 'type': 'ID', 'msg': msg };
                        loadingScene(HxsgScenes.friendsList, HxsgScenes.friends);
                    } else {
                        showAlert("查询ID只能输入数字");
                    }
                    break;
                case "NAME":
                    userWuPin.objects = { 'type': 'NAME', 'msg': msg };
                    loadingScene(HxsgScenes.friendsList, HxsgScenes.friends);
                    break;
            }
        }
    },
    friendsList: function friendsList(data) {
        // this.clearScrollview();
        var msg = data.msg;
        cc.log(data);
        var num = 0;
        var total = msg.length;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.yaopinPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('friendsItem');
            num += comp.initFriendsList(i, 'friends', itemMsg);
            comp.selectBn.node.on("click", self.skillList, self);
        }
        self.title.string = '在线' + num + '/' + total;
        self.content.height = msg.length * 65;
    },

    initYaopin: function initYaopin(data) {
        //if(currentWupin != data.type) return;

        var msg = data.msg;
        var num = 0;
        var total = msg.length;
        //showAlert(msg, null, null);
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.yaopinPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('friendsItem');
            num += comp.initFriendsItem(i, 'friends', itemMsg);
            comp.selectBn.node.on("click", self.skillList, self);
        }
        self.title.string = '在线' + num + '/' + total;
        self.content.height = msg.length * 65;
    },
    skillList: function skillList(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;

        var button = node.getComponent(cc.Button);
        //window.wuPin.jinengList=bn.id;
        myFriends.friendid = button.id.id;
        myFriends.friendname = button.id.name;
        loadingScene("talking", "friends");

        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    /**
     * -->装备
     */
    zhuangbeiEvent: function zhuangbeiEvent() {

        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 1;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.friends, { 'type': '最近' }, this.initYaopin);
    },

    initZhuangbei: function initZhuangbei(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.zawuPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            comp.initZhuangbeiItem(i, 'zhuangbei', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    /**
     * -->矿石
     */
    kuangshiEvent: function kuangshiEvent() {
        cc.log('wupin mananger 亲人');

        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 2;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.friends, { 'type': '亲人' }, this.initYaopin);
    },

    initKuangshi: function initKuangshi(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var item = cc.instantiate(self.kuangshiPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            var itemMsg = msg[i];
            comp.initKuangshiItem(i, 'kuangshi', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    /**
     * -->杂物
     */
    zawuEvent: function zawuEvent() {
        cc.log('wupin mananger 仇人');

        this.clearScrollview();
        this.menu[currentWupin].interactable = true;
        currentWupin = 3;
        this.menu[currentWupin].interactable = false;

        ajaxData(HxsgUrl.friends, { 'type': '仇人' }, this.initYaopin);
    },

    initZawu: function initZawu(data) {
        if (currentWupin != data.type) return;

        var msg = data.msg;
        for (var i = 0; i < msg.length; i++) {
            var itemMsg = msg[i];
            var item = cc.instantiate(self.zawuPrefab);
            self.content.addChild(item);
            var comp = item.getComponentInChildren('WupinItem');
            comp.initZawuItem(i, 'zawu', itemMsg);
        }
        self.content.height = msg.length * 65;
    },

    zawuItemEvent: function zawuItemEvent(data) {
        //TODO:
    },

    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    }

});

cc._RFpop();
},{}],"gameMenu":[function(require,module,exports){
"use strict";
cc._RFpush(module, '71d90ToOZBOzYwIcFBqJB0m', 'gameMenu');
// js\gamble\gameMenu.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {},
    clickEvent: function clickEvent(e, num) {
        var jiesuan = cc.find("Canvas/jiesuan");
        switch (num) {
            case '1':
                {
                    //猜猜猜
                    jiesuan.active = false;
                    cc.find("Canvas/chibi").active = false;
                    cc.find("Canvas/saizi").active = true;
                    cc.log("DuChangVo.num" + DuChangVo.num);

                    if (DuChangVo.num <= 0) {
                        jiesuan.active = true;
                        jiesuan.getComponent("jiesuan").setMsg("猜猜猜结算中，请稍后再来");
                    }
                    break;
                }
            case '2':
                {
                    //赤壁
                    cc.find("Canvas/jiesuan").active = false;
                    cc.find("Canvas/chibi").active = true;
                    cc.find("Canvas/saizi").active = false;
                    if (ChiBiVo.num <= 0) {
                        jiesuan.active = true;
                        jiesuan.getComponent("jiesuan").setMsg("赤壁结算中，请稍后再来");
                    }
                    break;
                }
            case '3':
                {
                    break;
                }
            case '4':
                {
                    break;
                }
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"headItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e6533uJMmVINroDI+2oXFNO', 'headItem');
// js\index\nearbyPlayer\headItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        headImg: cc.Sprite,
        headImgList: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},
    init: function init(num) {
        this.headImg.spriteFrame = this.headImgList[num];
    }
});

cc._RFpop();
},{}],"inputNum":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7adb4G60EdDeZOjU+goKhjj', 'inputNum');
// js\wupin\userJiNengShu\inputNum.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.EditBox,
        selectBn: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},
    buttonEvent: function buttonEvent() {
        var num = this.msg.string;
        if (num > 10 || num < 0) {
            showAlert('请输正确的数量');
        } else {
            userWuPin.num = num;
            console.log(userWuPin);
            ajaxData(HxsgUrl.userWuPin, userWuPin, this.tiShi);
        }
    },
    tiShi: function tiShi(data) {
        cc.log(data.msg);
        showAlert(data.msg);
    },
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    }
});

cc._RFpop();
},{}],"jiNengList":[function(require,module,exports){
"use strict";
cc._RFpush(module, '90e351eGlNKbpxW2m7Aw6IU', 'jiNengList');
// js\wupin\userJiNengShu\jiNengList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Prefab
        },
        leftContent: cc.Node,
        content: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajax({
            type: 'GET',
            // url: "" + localhost + "gchang/applishi",
            url: "http://192.168.130.18:8080/cocos2dWuPin/getJiNengShuList?id=98",
            dataType: 'jsonp',
            jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数
            success: function success(msg) {
                var p = msg.msg;
                //alert(p);
                for (var i = 0; i < p.length; i++) {
                    var item = cc.instantiate(self.target);
                    self.content.addChild(item);
                    item.x = 1;
                    item.y = -1 * i * item.height;
                    item.name = 'userList' + i;
                    self.leftContent.height = (i + 1) * item.height + 20;

                    var lab = item.getComponent("wuPinList");

                    lab.msg.string = p[i].rolename + "(" + p[i].fulevel + "级)";
                    // lab.id.string=p[i].rfid;
                    if (i % 2 != 0) {
                        item.color = new cc.Color(0, 0, 49);
                        console.log(item.color);
                        //lab.Node.Color="WHITE";
                    }
                    lab.selectBn.name = 'button' + i;
                    // var clickEventHandler = new cc.Component.EventHandler();
                    // clickEventHandler.target = lab.selectBn.node; //这个 node 节点是你的事件处理代码组件所属的节点
                    // clickEventHandler.component ='button0';
                    // clickEventHandler.handler = "skillList";
                    // clickEventHandler.customEventData =p[i].id;
                    //wuPin.jinengList="10311"
                    //lab.selectBn.id.string=p[i].rfid
                    var bn = lab.selectBn.getComponent("jiNengButton");
                    bn.id = p[i].rfid;
                    // lab.selectBn.setId(new cc.Label())
                    lab.selectBn.node.on('click', self.skillList, self);
                    //lab.selectBn.clickEvents.push(clickEventHandler);
                    // console.log (bn.id)
                    // console.log(p[i].id)
                    //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                    // var item = cc.instantiate(self.itemPrefab);
                    // self.leftContent.addChild(item);
                    // item.x = 0;
                    // item.y = -1 * i * item.height;
                    // item.name = 'history' + i;
                    // self.content.height = (i + 1) * item.height;

                    // item = item.getComponent('HistoryItem');
                    // var labelStr = "第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "\t\t" + p[i].result;
                    // item.setMsg(labelStr);
                }
            }
        });
    },
    skillList: function skillList(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;
        var bn = node.getComponent("jiNengButton");
        var button = node.getComponent(cc.Button);
        window.wuPin.jinengList = bn.id;
        console.log(bn.id);
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
});

cc._RFpop();
},{}],"jiesuan":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ae98bgsZlZArYZOm2rtGagC', 'jiesuan');
// js\gamble\jiesuan.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setMsg: function setMsg(data) {
        this.msg.string = data;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"jnName":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3bdacimPmdBwLV6EnVF3ztv', 'jnName');
// js\pk\jnName.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jName: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setJname: function setJname(data) {
        this.jName.string = data;
    },
    animationTest: function animationTest() {}

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"kong":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fe54eUeaOFPVqGP1BgqVMV8', 'kong');
// js\wupin\zhuangbei\kong.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
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
        self = this;
    },
    click: function click(e, id) {
        if (cc.find('Canvas/zbBaoshi') != null) {
            cc.find('Canvas/zbBaoshi').destroy();
        }

        //空槽
        if (id == 1) {
            cc.log("宝石孔按钮: " + id);
            cc.loader.loadRes('prefabs/bs', cc.Prefab, function (err, prefab) {
                if (!err) {

                    var bsList = cc.instantiate(prefab);
                    cc.find('Canvas').addChild(bsList);
                }
            });
        } else {
            cc.log("宝石孔按钮: " + id);
            cc.loader.loadRes('prefabs/zbBaoshi', cc.Prefab, function (err, prefab) {
                if (!err) {
                    cc.log(self);
                    cc.log(self.msgid);
                    var zbBaoshi = cc.instantiate(prefab);
                    cc.find('Canvas').addChild(zbBaoshi, 90);
                    zbBaoshi.setPositionX(30);
                    zbBaoshi.setPositionY(-10);
                }
            });
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"loadSelectRole":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7d27dshfGtIULnjPgEv+AFg', 'loadSelectRole');
// js\login\loadSelectRole.js

'use strict';

var id = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajax({
            type: 'GET',
            url: HxsgUrl.loadCreateRole,
            data: { "key": uuidKey },
            //jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
            success: function success(msg) {
                cc.log(uuidKey);
                msg = eval('(' + msg + ')');
                if (msg.code == "000") {

                    for (var j = 0; j < 3; j++) {
                        var item = cc.instantiate(self.itemPrefab);
                        item.x = 1;
                        item.y = 1 * j * item.height;

                        cc.find("Canvas/cotent").addChild(item);
                        var lab = item.getComponent("selectedRole");

                        lab.node.on(cc.Node.EventType.TOUCH_START, self.toIndex, self);
                        var p = msg.data;
                        if (p == null || p == "") {
                            lab.name = j;
                            item.name = 'item' + j;
                            lab.msg.string = "【空】";
                            lab.id.string = "";
                            lab.zhiye.string = "新建角色";
                        } else {
                            if (p[j] !== undefined && p[j] !== null) {
                                item.name = 'item' + p[j].id;
                                lab.name = p[j].id;
                                //将预制资源写入
                                lab.msg.string = p[j].rolename;
                                lab.id.string = "ID:" + p[j].id;
                                lab.zhiye.string = p[j].level + "级" + p[j].zhiye;

                                //lab.img.spriteFrame.setTexture("http://localhost:7456/res/raw-assets//resources/touxiang/wushi3.jpg");
                            } else {
                                lab.name = j;
                                item.name = 'item' + j;
                                lab.msg.string = "【空】";
                                lab.id.string = "";
                                lab.zhiye.string = "新建角色";
                            }
                        }

                        //点击事件

                    }
                } else {
                    showAlert("服务器异常");
                }
            }
        });
    },
    toIndex: function toIndex(event) {

        var node = event.target;

        var lab = node.getComponent("selectedRole");
        id = lab.name;
        //node.color=new cc.Color(230,21,21);
        var arr = node.parent.children;
        cc.log(id);
        for (var i = 0; i < arr.length; i++) {

            if (arr[i].name == "item" + id) {
                cc.log(arr[i].name.indexOf(id));
                arr[i].color = new cc.Color(240, 232, 232);
            } else {
                arr[i].color = new cc.Color(199, 135, 135);
            }
        }
        // node.parent.getChildByName("item1000").color=new cc.Color(230,21,21);
        cc.log(node.parent.getChildByName("item" + id));
        //  if(id<1000)
        // {
        //       cc.director.loadScene('createRole');
        //  }
        // cc.director.loadScene('inputNum');
    },
    game: function game() {
        if (id >= 1000) {
            ajaxData(HxsgUrl.selectRole, { 'id': id, "keys": uuidKey }, loadingScene('indexhg'));
        } else {

            loadingScene('createRole');
        }
    }
});

cc._RFpop();
},{}],"loading":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b14c6PtlP9MR5pthRLrjfP4', 'loading');
// js\common\loading.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label
    },

    /**
     * msg: 显示的内容
     * sureEvent: 确定按钮回调函数，没有传undefined或者null
     * cancelEvent: 返回按钮回调函数，没有传undefined或者null
     * suerParameter: 确定按钮回调函数参数
     * cancelParameter: 返回按钮回调函数参数
     */
    initAlert: function initAlert(msg, sureEvent, cancelEvent, suerParameter, cancelParameter) {
        this.text.string = msg;
        this.sureEvent = sureEvent;
        this.cancelEvent = cancelEvent;
        this.suerParameter = suerParameter;
        this.cancelParameter = cancelParameter;
    },

    sureClickEvent: function sureClickEvent() {
        if (this.sureEvent) {
            this.sureEvent(this.suerParameter);
        }
        this.node.destroy();
    },

    cancelClickEvnet: function cancelClickEvnet() {
        cc.log('cancelClickEvnet');
        if (this.cancelEvent) {
            this.cancelEvent(this.cancelParameter);
        }
        this.node.destroy();
    }
});

cc._RFpop();
},{}],"loginCreateRole":[function(require,module,exports){
"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'loginCreateRole');
// js\login\loginCreateRole.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        inputName: {
            default: null,
            type: cc.EditBox
        },
        touxiang1: {
            default: null,
            type: cc.Sprite
        },
        touxiang2: {
            default: null,
            type: cc.Sprite
        },
        touxiang3: {
            default: null,
            type: cc.Sprite
        },
        txt: {
            default: null,
            type: cc.Label
        }
    },

    // 上传角色信息 创建角色
    uploadinfo: function uploadinfo() {
        var self = this;
        self.info.name = self.inputName.string;
        //cc.log("验证角色信息：",self.info);
        //cc.log("验证选中的头像：",eval("self.txFile.tx"+self.txFile.flag));
        var dataJson = { 'rolename': self.info.name };
        //cc.log("角色名验证\n准备创建角色");
        ajaxData(HxsgUrl.checkRole, dataJson, function (msg) {
            cc.log(msg);
            if (msg.code == "000") {
                switch (msg.data) {
                    case '000':
                        //var txurl = eval("self.txFile.tx"+self.txFile.flag);
                        var dataJson = {
                            "zhiye": self.info.job,
                            "rolename": self.info.name,
                            "sex": self.info.sex,
                            "img": self.txFile.tx,
                            "keys": uuidKey
                        };

                        cc.log("准备开始创建角色:", dataJson);
                        //此处需要丰富内容
                        ajaxData(HxsgUrl.createRole, dataJson, function (msg) {
                            cc.log(msg);
                            if (msg.code == "000") {
                                if (msg.data == '000') {
                                    cc.log("创建角色成功");
                                    loadScene(HxsgScenes.index, HxsgScenes.index);
                                } else {
                                    cc.log("创建角色失败");
                                    showAlert("创建角色失败");
                                }
                            } else {
                                showAlert("服务器异常");
                            }
                        });
                        //end
                        break;
                    case '001':
                        cc.log("角色名已存在或为空");
                        showAlert("角色名已存在或为空");
                        break;
                    default:
                        cc.log("发生未知错误");
                        showAlert("注册失败，未知错误：" + msg);
                        break;
                } //end switch
            } else {
                showAlert("服务器异常");
            }
        });
    },
    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.txt.string = "请输入您在游戏中的名称";

        //保存角色信息
        self.info = new Object();
        self.info.txUrl = 'resources/touxiang/';
        self.info.sex = "男";
        self.info.sex_flg = 0;
        self.info.job = "武士";
        self.info.job_flg = 0;
        self.info.name = '';

        //保存选中的头像路径    
        self.txFile = new Object();
        //self.txFile.flag = 1;
        //self.txFile.tx1 = '';
        //self.txFile.tx2 = '';
        self.txFile.tx = ''; //保存选中的头像

        /* 获取所有按钮组件 */
        self.buttons = self.node.getComponentsInChildren(cc.Button);
        self.nanButton = this.getComponentByNodeName("nan");
        self.nvButton = this.getComponentByNodeName("nv");
        self.wushiButton = this.getComponentByNodeName("wushi");
        self.wenrenButton = this.getComponentByNodeName("wenren");
        self.yishiButton = this.getComponentByNodeName("yishi");
        self.tx1Button = this.getComponentByNodeName("touxiang1");
        self.tx2Button = this.getComponentByNodeName("touxiang2");
        self.tx3Button = this.getComponentByNodeName("touxiang3");

        //获取头像按钮的精灵组件
        //cc.log(self.tx1Button.node.name);
        self.touxiang1 = self.tx1Button.node.getComponent(cc.Sprite);

        /* 初始化头像矩阵 */
        /*
            +----+------+-----+------+-----
            |    | 武士 | 文人 | 异士 |
            +----+-------------------------
            | 男 |      |      |     |
            +----+-------------------------
            | 女 |      |      |     |
            +----+---------------------------
         */
        self.txtable = new Array(new Array(), new Array());

        self.txtable[0][0] = [cc.url.raw(self.info.txUrl + 'wushi1.jpg'), cc.url.raw(self.info.txUrl + 'wushi2.jpg'), cc.url.raw(self.info.txUrl + 'wushi3.jpg')];
        self.txtable[0][1] = [cc.url.raw(self.info.txUrl + 'wenren1.jpg'), cc.url.raw(self.info.txUrl + 'wenren2.jpg'), cc.url.raw(self.info.txUrl + 'wenren3.jpg')];
        self.txtable[0][2] = [cc.url.raw(self.info.txUrl + 'yishi1.jpg'), cc.url.raw(self.info.txUrl + 'yishi2.jpg'), cc.url.raw(self.info.txUrl + 'yishi3.jpg')];

        self.txtable[1][0] = [cc.url.raw(self.info.txUrl + 'wushinv1.jpg'), cc.url.raw(self.info.txUrl + 'wushinv2.jpg'), cc.url.raw(self.info.txUrl + 'wushinv3.jpg')];
        self.txtable[1][1] = [cc.url.raw(self.info.txUrl + 'wenrennv1.jpg'), cc.url.raw(self.info.txUrl + 'wenrennv2.jpg'), cc.url.raw(self.info.txUrl + 'wenrennv3.jpg')];
        self.txtable[1][2] = [cc.url.raw(self.info.txUrl + 'yishinv1.jpg'), cc.url.raw(self.info.txUrl + 'yishinv2.jpg'), cc.url.raw(self.info.txUrl + 'yishinv3.jpg')];
        cc.log(self.txtable);
    },
    /* 通过node.name获取按钮 */
    getComponentByNodeName: function getComponentByNodeName(nodeName) {
        //cc.log(nodeName);
        //cc.log(typeName);
        for (var i = 0; i < this.buttons.length; i++) {
            var element = this.buttons[i];
            if (element.node.name === nodeName) {
                /* enableAutoGrayEffect==true，当 button 的 interactable 属性为 false 的时候
                会使用内置 shader 让 button 的 target 节点的 sprite 组件变灰 */
                element.enableAutoGrayEffect = true;
                return element;
            }
        }

        return null;
    },

    // called every frame
    /*
    update: function (dt) {
        
    },
    */
    updatetx: function updatetx() {

        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        // 更新头像
        cc.log(self.txtable[sex_flg][job_flg][0]);
        cc.log(self.txtable[sex_flg][job_flg][1]);
        cc.log(self.txtable[sex_flg][job_flg][2]);

        self.touxiang1.spriteFrame.setTexture(self.txtable[sex_flg][job_flg][0]);
        self.touxiang2.spriteFrame.setTexture(self.txtable[sex_flg][job_flg][1]);
        self.touxiang3.spriteFrame.setTexture(self.txtable[sex_flg][job_flg][2]);

        //self.touxiang1.spriteFrame.ensureLoadTexture();
        //调试代码
        /*
                var url = self.info.txUrl + "yishi1";  
                cc.loader.loadRes(self.txtable[sex_flg][job_flg][0], function (err, spriteFrame) {
                    if(!err && spriteFrame)
                    {
                        cc.log("dsds");
                    //var node = new cc.Node("New Sprite");
                    //var sprite = node.addComponent(cc.Sprite);
                    self.touxiang1.spriteFrame = spriteFrame;
                    self.touxiang2.spriteFrame = spriteFrame;
                    self.touxiang3.spriteFrame = spriteFrame;
                    //node.parent = self.node
                    //self.touxiang1.spriteFrame.ensureLoadTexture();
                    }
                    if (!spriteFrame)
                    {
                        cc.log(err);
                        cc.log("xxxx");
                    }
                });
        */
        //调试代码 end
    },
    //输入框回调
    inputCK: function inputCK() {
        var self = this;
        self.txt.string = "请输入您在游戏中的名称";
    },

    //男按钮
    nanButt: function nanButt() {
        var self = this;
        self.info.sex = "男";
        self.info.sex_flg = 0;
        self.txt.string = "请选择在游戏中角色的性别";

        self.nanButton.interactable = false;
        self.nvButton.interactable = true;

        self.updatetx();
    },
    //女按钮
    nvButt: function nvButt() {
        var self = this;
        self.info.sex = "女";
        self.info.sex_flg = 1;
        self.txt.string = "请选择在游戏中角色的性别";

        self.nvButton.interactable = false;
        self.nanButton.interactable = true;

        self.updatetx();
    },
    //武士
    wushiButt: function wushiButt() {
        var self = this;
        self.info.job = "武士";
        self.info.job_flg = 0;
        self.txt.string = "请选择在游戏中角色的职业";

        self.wushiButton.interactable = false;
        self.wenrenButton.interactable = true;
        self.yishiButton.interactable = true;

        self.updatetx();
    },
    //文人
    wenrenButt: function wenrenButt() {
        var self = this;
        self.info.job = "文人";
        self.info.job_flg = 1;
        self.txt.string = "请选择在游戏中角色的职业";

        self.wushiButton.interactable = true;
        self.wenrenButton.interactable = false;
        self.yishiButton.interactable = true;

        self.updatetx();
    },
    //异士
    yishiButt: function yishiButt() {
        var self = this;
        self.info.job = "异人";
        self.info.job_flg = 2;
        self.txt.string = "请选择在游戏中角色的职业";

        self.wushiButton.interactable = true;
        self.wenrenButton.interactable = true;
        self.yishiButton.interactable = false;

        self.updatetx();
    },
    //头像1选中
    tx1Butt: function tx1Butt() {
        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        // 更新头像
        cc.log(self.txtable[sex_flg][job_flg][0]);
        self.txFile.tx = self.txtable[sex_flg][job_flg][0];

        self.txt.string = "请选择在游戏中角色的头像";
        self.tx1Button.interactable = false;
        self.tx2Button.interactable = true;
        self.tx3Button.interactable = true;
    },
    //头像2选中
    tx2Butt: function tx2Butt() {
        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        cc.log(self.txtable[sex_flg][job_flg][1]);
        self.txFile.tx = self.txtable[sex_flg][job_flg][1];

        self.txt.string = "请选择在游戏中角色的头像";
        self.tx1Button.interactable = true;
        self.tx2Button.interactable = false;
        self.tx3Button.interactable = true;
    },
    //头像3选中
    tx3Butt: function tx3Butt() {
        var self = this;
        var sex_flg = self.info.sex_flg;
        var job_flg = self.info.job_flg;
        cc.log(self.txtable[sex_flg][job_flg][2]);
        self.txFile.tx = self.txtable[sex_flg][job_flg][2];

        self.txt.string = "请选择在游戏中角色的头像";
        self.tx1Button.interactable = true;
        self.tx2Button.interactable = true;
        self.tx3Button.interactable = false;
    }
});

cc._RFpop();
},{}],"loginRegister":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cce955RZWxKcbMTYr4odArr', 'loginRegister');
// js\login\loginRegister.js

"use strict";

//var WS = require('serverSetup.js');
cc.Class({
    extends: cc.Component,

    properties: {
        account: {
            default: null,
            type: cc.EditBox
        },
        pass: {
            default: null,
            type: cc.EditBox
        },
        pass2: {
            default: null,
            type: cc.EditBox
        },
        suppass: {
            default: null,
            type: cc.EditBox
        },
        suppass2: {
            default: null,
            type: cc.EditBox
        },
        regInfo: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.regInfo.string = '';
    },

    //注册按钮
    zhuce: function zhuce() {
        //获取注册信息
        var self = this;
        var account = this.account.string;
        var pass = this.pass.string;
        var pass2 = this.pass2.string;
        var suppass = this.suppass.string;
        var suppass2 = this.suppass2.string;
        //判断密码一致性（是否设置密码与超级密码不同？）
        if (pass !== pass2) {
            showAlert("两次密码不一致");
            //this.regInfo.string = "两次密码不一致";
            pass2.string = "";
            return;
        }
        if (suppass !== suppass2) {
            showAlert("两次超级密码不一致");
            //this.regInfo.string = "两次超级密码不一致";
            suppass2.string = "";
            return;
        }

        cc.log(account);
        cc.log(pass + "==" + pass2);
        cc.log(suppass + "==" + suppass2);

        var dataJson = { "name": account };
        //检测账号重名
        ajaxData(HxsgUrl.checkAcount, dataJson, function (msg) {
            if (msg.code == "000") {
                if (msg.data === "001") {
                    showAlert("账号已存在");
                    //self.regInfo.string = "账号已存在"
                    self.account.string = "";
                    return;
                }
                //允许注册 
                else if (msg.data === "000") {
                        cc.log("账号注册开始");
                        cc.log(account);
                        cc.log(pass);
                        cc.log(suppass);
                        var dataJson = { "name": account, "password": pass, "supperpass": suppass };
                        //注册账号
                        ajaxData(HxsgUrl.register, dataJson, function (msg) {
                            cc.log(msg);
                            if (msg.code == "000") {
                                if (msg.data === "000") {
                                    cc.log("注册成功，跳转到角色创建界面");
                                    showAlert("恭喜您注册成功", function () {
                                        loadScene("login", "register");
                                    }, function () {
                                        loadScene("login", "register");
                                    });

                                    //cc.director.loadScene('createRole');
                                } else if (msg.data === "001") {
                                    cc.log("注册失败");
                                    showAlert(msg.message);
                                    return;
                                } else {
                                    showAlert("未知错误，注册失败：msg：" + msg);
                                    cc.log("未知错误");
                                }
                            } else {
                                showAlert("服务器异常");
                            }
                        });
                        return;
                    }
            } else {
                showAlert("服务器异常");
            }
        });
    },

    //返回登入界面
    comeBack: function comeBack() {
        loadScene("login", "register");
        //cc.director.loadScene('login');
    }
});

cc._RFpop();
},{}],"login":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cdbd6Cr1GRE15wVwWDeqP8c', 'login');
// js\login\login.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        username: {
            default: null,
            type: cc.EditBox
        },
        pass: {
            default: null,
            type: cc.EditBox
        }
    },
    // use this for initialization
    onLoad: function onLoad() {

        // var key= uuid(16,36);
        // uuidKey=key;
        var anim = this.getComponent(cc.Animation);
        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play();
        // 指定播放 test 动画
        anim.play('system');
        this.check();
    },
    start: function start() {

        // Change the text in Label Component    
    },
    check: function check() {
        ajaxUtils(HxsgUrl.checkVersion, null, function (data) {
            if (data == "1") {
                showAlert("检测到有新的版本！q群455895673下载", function () {
                    cc.director.end();
                }, function () {
                    cc.director.end();
                });
            }
            if (data == "2") {
                showAlert("停服维护中！q群455895673", function () {
                    cc.director.end();
                }, function () {
                    cc.director.end();
                });
            }
        });
    },
    //登入按钮
    login: function login() {

        var self = this;
        //获取用户输入         
        var name = self.username.string;
        var pass = self.pass.string;
        //空数据拦截
        if (name === null || name === undefined || name === '') {
            showAlert('请输入用户名');
            return;
        }
        if (pass === null || pass === undefined || pass === '') {
            showAlert('请输入密码');
            return;
        }
        cc.log(name, pass);
        //敏感词检测 ？
        var dataJson = { "name": name, "password": pass, "key": uuidKey };
        ajaxData(HxsgUrl.login, dataJson, function (msg) {
            if (msg.code == "000") {
                if (msg.data === "005") {
                    cc.log("跳转到选择角色界面");
                    //跳转到选择界面
                    loadScene('selectRole', 'login');
                    //cc.director.loadScene('scenes/login/selectRole');
                } else if (msg.data === "003") {
                    //创建角色
                    cc.log("跳转到创建角色界面");
                    loadScene('selectRole', 'login');
                    //cc.director.loadScene('scenes/login/createRole');
                } else if (msg.data === "001") {
                    cc.log("登入失败" + msg.msg);
                    showAlert('用户名或者密码错误');
                } else if (msg.data === "002") {
                    //服务器异常
                    cc.log("登入失败" + msg.msg);
                    showAlert('用户名或者密码错误');
                } else {
                    cc.log("未定义错误" + msg.data);
                    showAlert('发生未知错误');
                }
            } else {
                showAlert('服务器异常');
            }
        });
    },
    //注册按钮 回调函数
    register: function register() {
        loadScene('register', 'login');
        //cc.director.loadScene('register');
    }
});

cc._RFpop();
},{}],"move":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0162cHQoYZJGa0BHf2X6mKp', 'move');
// js\index\move\move.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        cityName: cc.Label,
        zuoBiao: cc.Sprite,
        move2: cc.Sprite,
        cityImg: cc.Sprite,
        zuoBiaoList: {
            default: [],
            type: cc.SpriteFrame
        },
        cityImgList: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    init: function init(msg) {
        try {
            this.cityName.string = msg.name;
            this.zuoBiao.spriteFrame = null;
            this.cityImg.spriteFrame = null;
            var key = Math.round(Math.random() * 15);
            cc.log('key' + key);
            this.cityImg.spriteFrame = this.cityImgList[key];
            if (msg.num != 4) {
                this.zuoBiao.spriteFrame = this.zuoBiaoList[msg.num];
            }
        } catch (e) {
            cc.log('加载地图信息异常:' + e);
        }
    }
});

cc._RFpop();
},{}],"myZhuangBei":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fc4cbiFXyRGTrbuoyN9GTQA', 'myZhuangBei');
// js\wupin\zhuangbei\myZhuangBei.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        gj: cc.Label,
        su: cc.Label,
        qx: cc.RichText,
        jl: cc.RichText
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        loadCommomScence();
        this.init();
        this.initData();
    },
    init: function init() {
        ajaxData(HxsgUrl.myZhuangBei, null, function (data) {
            if ("000" == data.code) {
                (function () {
                    var arrJson = data.data;

                    var _loop = function _loop(i) {
                        var wuqiType = arrJson[i].wuqiType;

                        if (wuqiType.indexOf("武") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    cc.log("武器详情:" + arrJson[i].id);
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/wuqi').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("靴") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/xiezi').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("链") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/xianlian').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("腕") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/huwan').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("盔") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/tou').addChild(zbIcon);
                            });
                        }
                        if (wuqiType.indexOf("甲") >= 0) {
                            cc.loader.loadRes('prefabs/zbIcon', cc.Prefab, function (err, prefab) {
                                var zbIcon = cc.instantiate(prefab);
                                var sprite = zbIcon.getComponent('cc.Sprite');
                                //网络加载图片
                                cc.loader.load(imgUrl + arrJson[i].imgUrl, function (error, texture) {
                                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                zbIcon.on('click', function (event) {
                                    zhaungBeiDetailsZbid.id = arrJson[i].id;
                                    loadingScene(HxsgScenes.zhuangbei, HxsgScenes.myZhuangBei);
                                });
                                cc.find('Canvas/gaijia').addChild(zbIcon);
                            });
                        }
                    };

                    for (var i = 0; i < arrJson.length; i++) {
                        _loop(i);
                    }
                })();
            } else {
                showAlert("系统错误!");
            }
        });
    },
    initData: function initData() {
        ajaxData(HxsgUrl.indexroleMsgUrl, null, function (data) {
            var roleMsg = data.roleMsg;
            self.gj.string = roleMsg.totalgong;
            self.qx.string = roleMsg.totalxue1 + "/" + roleMsg.totalxue2;
            self.jl.string = roleMsg.totaljing1 + "/" + roleMsg.totaljing2;
            self.su.string = roleMsg.totalsudu;
            cc.log(self.gj.string);
            cc.log(self.su.string);
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"nearbyPlayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7a8ad7oAOxEh7z3pVjRjWs/', 'nearbyPlayer');
// js\index\nearbyPlayer\nearbyPlayer.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setLabel: function setLabel(msg) {
        this.label.string = msg;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"parent":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e246fGA/fBBAaSrPXkEpY6C', 'parent');
// js\index\parent.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
        cc.game.addPersistRootNode(this);
    }

});

cc._RFpop();
},{}],"pkJnContent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '87d5eJuEIBNIrIMcdWp3lqw', 'pkJnContent');
// js\pk\pkJnContent.js

"use strict";

var self;
var pkWait = require("pkWait");
cc.Class({
    extends: cc.Component,

    properties: {
        contents: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        // this.onloading();
    },
    backEvent: function backEvent() {
        cc.find("Canvas/zhiling").active = true;
        cc.log("初始化技能列表");
        cc.find("Canvas/jineng").active = false;
    },
    onloading: function onloading(e, id) {
        cc.loader.loadRes('pk/jnButton', cc.Prefab, function (err, prefab) {
            if (!err) {
                var p = getRoleMsg(pk.clickArrayRight[0], pk.player2);
                var jn = p.jineng;
                self.contents.removeAllChildren();
                var hPrefab = cc.instantiate(prefab);
                self.contents.height = jn.length * (hPrefab.height + 5);
                for (var i = 0; i < jn.length; i++) {
                    var jnPrefab = cc.instantiate(prefab);
                    var jnJs = jnPrefab.getComponent("jnName");
                    jnJs.setJname(jn[i].skillname);
                    jnPrefab.on('click', self.clickEvent, self);
                    jnPrefab.id = jn[i];
                    self.contents.addChild(jnPrefab);
                }
            }
        });
    },
    clickEvent: function clickEvent(event) {
        var node = event.target;
        var jn = node.id;
        cc.log('技能名称:' + node.id.skillname);
        cc.find("Canvas/jineng").active = false;
        var data = null;
        //有些技能可以对自己或者队友释放
        switch (node.id.skillname) {
            case "气冲斗牛":
                {
                    pk.selectStatus = 2000;
                    data = pk.clickArrayRight[0];
                    break;
                }
            default:
                {
                    pk.selectStatus = 3000;
                    data = pk.clickArrayLeft[0];
                    break;
                }
        }

        onloadJnZhiling(false);
        console.log("选择指令完成");

        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.skillname);
    }
});

cc._RFpop();
},{"pkWait":"pkWait"}],"pkOnload":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2d7d6vhqtBAg7K5avIKn/Yw', 'pkOnload');
// js\pk\pkOnload.js

"use strict";

window.pkOnload;
var self;

cc.Class({
    extends: cc.Component,

    properties: {
        leftPlay: cc.Prefab,
        rightPlay: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        /**
         * -212 59    -123    heigt=72   width 89
         */
        self = this;
        window.pkOnload = this;
        PkSocketEvents.onloadPlay = this.onloadPlay;
        //this.init();
        cc.log("pkOnload加载了。。。。。。。。");
        openPkScoket(true);
        self.init();
        /////////////////////////////////////////////////
        // ajaxData("http://127.0.0.1:8080/Cocos2dAddPk/getYeGuaiData?level=10,15&name=侍卫群", null, function (data) {
        //     if (data.code != "000") {
        //         showAlert(data.message);
        //     } else {

        //         let initData = JSON.parse(data.data);
        //         onloadPkMsg(initData);
        //         self.onloadPlay(-160, -165, 0);
        //         self.onloadPlay(253, 205, 1);
        //         onloadJn(true);


        //         // self.init();
        //     }

        // });

        //    / self.init();
    },
    clickEvent: function clickEvent(event) {
        var node = event.target;
        var jn = node.id;
        cc.log('技能名称:' + node.id.skillname);
        cc.find("Canvas/jineng").active = false;
        var data = null;
        //有些技能可以对自己或者队友释放
        switch (node.id.skillname) {
            case "气冲斗牛":
                {
                    pk.selectStatus = 2000;
                    data = pk.clickArrayRight[0];
                    break;
                }
            default:
                {
                    pk.selectStatus = 3000;
                    data = pk.clickArrayLeft[0];
                    break;
                }
        }

        onloadJnZhiling(false);
        console.log("选择指令完成");

        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.skillname);
    },

    /**right   w=89 h=59
     * x=253 
     * left 
     * x=-212   -265   305
     */

    onloadPlay: function onloadPlay(x, y, prefab) {
        cc.log("onloadPlay被调用了------------------");
        //初始化加载界面，所有角色都不可以点击
        pk.selectStatus = "001";
        var leftp;
        if (prefab == 0) {
            prefab = self.leftPlay;
            cc.log(pk.player1);
            leftp = pk.player1;
        } else {
            prefab = self.rightPlay;
            leftp = pk.player2;
        }
        for (var i = 0; i < leftp.length; i++) {
            var play = cc.instantiate(prefab);
            self.node.addChild(play);
            play.setPositionY(59 - i * 72);
            if (leftp.length == 1) {
                play.setPositionY(0);
                play.setPositionX(x);
            } else {
                switch (i) {
                    case 0:
                    case 2:
                        {

                            play.setPositionX(x - 89);
                            break;
                        }
                    case 1:
                    case 3:
                        {
                            play.setPositionX(x);

                            break;
                        }

                }
            }

            play.name = leftp[i].id;
            var role = play.getComponent("role");

            var xue = leftp[i].qixue / leftp[i].qixue2;
            var jing = leftp[i].jingli / leftp[i].jingli2;
            role.setXueAndJing(xue, jing);

            //buff
            try {
                var buffLi = leftp[i].buff;
                if (buffLi != null && buffLi.length > 0) {
                    var buff = play.getChildByName("buff");
                    buff.removeAllChildren();
                    for (var k = 0; k < buffLi.length; k++) {
                        cc.log("-kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                        var buffJs = buff.getComponent("buff");
                        var PrefabBuff = buffJs.getBuffPrefab();
                        var buffIn = cc.instantiate(PrefabBuff);
                        var buffDetail = buffIn.getComponent("buffDetail");
                        var buffAni = buffDetail.getComponent(cc.Animation);
                        var spriteFrame;
                        for (var j in buffLi[k]) {
                            spriteFrame = buffDetail.getSpriteFrame(j);
                        }
                        //spriteFrame存在时加入
                        if (typeof spriteFrame != 'undefined') {
                            var sprite = buffIn.getComponent(cc.Sprite);
                            sprite.spriteFrame = spriteFrame;
                            buff.addChild(buffIn);
                        }
                    }
                }
                //气血为0
                if (leftp[i].qixue <= 0) {
                    role.setDead();
                    if (leftp[i].id != pk.rightOne) {
                        pk.clickArrayLeft.remove(leftp[i].id);
                    }
                }

                // if (leftp[i].buffType != null) {
                //     var buff = play.getChildByName("buff");
                //     var buffJs = buff.getComponent("buff");
                //     var PrefabBuff = buffJs.getBuffPrefab();
                //     var buffIn = cc.instantiate(PrefabBuff);
                //     var buffDetail = buffIn.getComponent("buffDetail");
                //     var buffAni = buffDetail.getComponent(cc.Animation);
                //     var spriteFrame = buffDetail.getSpriteFrame(leftp[i].buffTypeKey);
                //     var sprite = buffIn.getComponent(cc.Sprite);
                //     sprite.spriteFrame = spriteFrame;
                //     buff.addChild(buffIn);
                // }
            } catch (e) {
                cc.log("加载buff失败：" + e);
            }
        }
    },
    /**
     * 发送指令状态标识
     */

    /**
    * 指令函数
    * param e 事件对象
    * param num 区分按钮类型
    * param type 区分攻击类型
    * param status 区分左右角色
    */
    attack: function attack(e, num) {
        var name;
        try {
            switch (num) {
                //攻击指令
                case 'gj':
                    {
                        onloadJnZhiling(false);
                        console.log("选择指令完成");
                        pk.selectStatus = 3000;

                        //模拟点击第一个人物按钮效果
                        clickRoleTool(pk.clickArrayLeft[0], "普通攻击");

                        break;
                    }
                //攻击指令
                case 'fy':
                    {
                        //模拟点击第一个人物按钮效果
                        clickRoleTool(pk.clickArrayLeft[0], "防御");
                        break;
                    }
                case 'tp':
                    {
                        cc.log("逃跑");
                        cc.find("Canvas/zhiling").active = false;
                        var play = cc.find("Canvas/background/" + pk.clickArrayRight[0]);
                        //获取边框到中心的距离，即得到两边框的坐标。注意：因为时序问题，必须要canvas的宽度来计算
                        var seqRight = cc.sequence(cc.moveTo(2, cc.p(play.getPositionX() + 500, play.getPositionY())).easing(cc.easeCubicActionOut(1)));
                        play.runAction(seqRight);
                        break;
                    }
                //技能指令
                case 'jn':
                    {
                        cc.log("技能");
                        cc.find("Canvas/zhiling").active = false;
                        cc.log("初始化技能列表");
                        var jineng = cc.find("Canvas/jineng");
                        jineng.active = true;
                        var content = cc.find("Canvas/jineng/detail/scrollview/view/content");
                        cc.loader.loadRes('pk/jnButton', cc.Prefab, function (err, prefab) {
                            if (!err) {
                                var p = getRoleMsg(pk.clickArrayRight[0], pk.player2);
                                var jn = p.jineng;
                                content.removeAllChildren();
                                var hPrefab = cc.instantiate(prefab);
                                content.height = jn.length * (hPrefab.height + 5);
                                for (var i = 0; i < jn.length; i++) {
                                    var jnPrefab = cc.instantiate(prefab);
                                    var jnJs = jnPrefab.getComponent("jnName");
                                    jnJs.setJname(jn[i].skillname);
                                    jnPrefab.on('click', self.clickEvent, self);
                                    jnPrefab.id = jn[i];
                                    content.addChild(jnPrefab);
                                }
                            }
                        });

                        break;
                    }
                //物品
                case 'wp':
                    {
                        cc.log("物品");
                        cc.find("Canvas/zhiling").active = false;
                        cc.find("Canvas/wupin").active = true;
                        cc.find("Canvas/jineng").active = false;
                        cc.log("物品列表");
                        cc.find("Canvas/wupin/detail/scrollview/view/content").getComponent('pkWuPin').onloading();
                        pk.pkyaostatus = "1";

                        break;
                    }
                //招将
                case 'zj':
                    {
                        cc.log("物品");
                        cc.find("Canvas/zhiling").active = false;
                        cc.find("Canvas/zhaojiang").active = true;
                        cc.find("Canvas/jineng").active = false;
                        cc.log("物品列表");

                        break;
                    }
            }
        } catch (e) {
            cc.log('加载技能列表异常:' + e);
        }
    },
    zidong: function zidong() {
        var _this = this;

        var num = 1;
        for (var i = 0; i < pk.clickArrayRight.length; i++) {
            setTimeout(function () {
                self.attack(_this, "gj");
            }, 200 * num);
            num++;
            setTimeout(function () {
                clickRoleTool(pk.clickArrayLeft[0], "普通攻击");
            }, 200 * num);
            num++;
        }
    },
    init: function init() {
        try {

            cc.find("Canvas/roleDetail").active = false;
            cc.find("Canvas/jineng").active = false;
            cc.find("Canvas/wupin").active = false;
            cc.find("Canvas/zhaojiang").active = false;
            cc.find("Canvas/end").active = false;
            cc.find("Canvas/zhiling").active = true;
            var leftp = pk.player1;
            var rightp = pk.player2;
            self.node.removeAllChildren();
            cc.find("Canvas/vs/left").getComponent(cc.Label).string = leftp[0].name;
            cc.find("Canvas/vs/right").getComponent(cc.Label).string = rightp[0].name;
            cc.find("Canvas/time/name").getComponent(cc.Label).string = rightp[0].name;
            //倒计时
            var count = 60;
            var timeCallback = function timeCallback(dt) {
                if (count === 0) {
                    // 在第六次执行回调时取消这个计时器
                    this.unschedule(timeCallback);
                    this.zidong();
                } else {
                    cc.find("Canvas/time").active = true;
                    cc.find("Canvas/time/time").getComponent(cc.Label).string = "出招(" + count + ")";
                    count--;
                }
                if (pk.timeStatus === 8000) {
                    // 在第六次执行回调时取消这个计时器
                    this.unschedule(timeCallback);
                    cc.find("Canvas/time").active = false;
                }
            };

            this.schedule(timeCallback, 1);
        } catch (e) {
            cc.log(e);
        }
    }

});

//  window.pkWs= new WebSocket(ws://127.0.0.1:8080/pkServer');
//         pkWs.onopen = function (event) {
//             // 发送一个初始化消息
//             // 发送一个初始化消息
//             var jsonData = {
//                 type: "pkWait",
//                 pkType: "1001",
//                 jsonData: {
//                     roleA: "1000",
//                     roleB: "1000",
//                     guaiData: {
//                         "level": "115,120",
//                         "name": "藤甲兵群"
//                     }

//                 },
//             }
//             pkWs.send(JSON.stringify(jsonData));
//         }
//         // 监听消息
//         pkWs.onmessage = function (event) {
//             console.log('Client notified socket has closed', JSON.stringify(event.data));
//             var returnJsonData =JSON.parse(event.data);
//             cc.log(returnJsonData)
//             pk.uuid = returnJsonData[0];
//             pk.player1 = returnJsonData[1];
//           //  pk.player2 = returnJsonData;
//             pk.leftPlay = [];
//               pk.clickArrayLeft=[];
//           //  pk.rightPlay = [];
//             for (var i = 0; i <  pk.player1.length; i++) {
//                 cc.log( pk.player1[i].id);
//                  pk.leftPlay.push( pk.player1[i].id);
//                  pk.clickArrayLeft.push( pk.player1[i].id);
//               //  pk.rightPlay.push(returnJsonData[i].id)
//             }
//             self.onloadPlay( pk.player1, -160, -165,  self.leftPlay, self);
//             self.onloadPlay( pk.player2, 253, 205,  self.rightPlay, self);
//             onloadJn(true);
//         };

cc._RFpop();
},{}],"pkWait":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd327100YpJHOre2ZozzX7vp', 'pkWait');
// js\pk\pkWait.js

"use strict";

var self;
var playJs = require("playerItem");

/**
 * PK动画播放有限状态机
 */

var status;

// var pkStateMachine = new StateMachine({
//     data: {
//         battle: null,
//     },
//     transitions: [
//         { name: 'toStart', from: 'none', to: 'start' },
//         { name: 'toShifa', from: 'start', to: 'shifa' },
//         { name: 'toMoveBackGround', from: 'shifa', to: 'backgorund' },
//         { name: 'toSkill', from: 'backgorund', to: 'skill' },
//         { name: 'finshed', from: 'skill', to: 'end' },
//         { name: 'end', from: 'end', to: 'start' }
//     ],
//     methods: {
//         onToShifa() {


//         },
//         onToMoveBackGround() {

//         },

//         onToSkill() {

//         },

//         onFinshed() {

//         },
//         onEnd() {

//         },
//     }
// });
var pkWait = cc.Class({
    extends: cc.Component,

    properties: {
        playPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        pkWait.load = this;
        var py = new playJs();
        var pkStateMachine = py.pkStateMachine;
        pkStateMachine.toStart();
        // this.back();
        //this.loading();
    },
    loading: function loading() {
        cc.find("Canvas/jineng").active = false;

        var result = {
            'player1': [{
                'name': '黄月英',
                'id': '1002',
                'qixue': '2123',
                'jingli': '21210',
                'sudu': '1',
                'jineng': [{
                    'name': '舍命一击',
                    'type': '1',
                    'status': 'left'
                }, {
                    'name': '力劈华山',
                    'type': '1',
                    'status': 'left'
                }, {
                    'name': '气冲斗牛',
                    'type': '1',
                    'status': 'right'
                }]
            }, {
                'name': '黄月英',
                'id': '1003',
                'qixue': '21210',
                'jingli': '20',
                'sudu': '1',
                'jineng': [{
                    'name': '五雷轰顶',
                    'type': '1',
                    'status': 'left'
                }]
            }, {
                'name': '黄月英',
                'id': '1004',
                'qixue': '3130',
                'jingli': '0',
                'sudu': '1'
            }, {
                'name': '黄月英',
                'id': '1005',
                'qixue': '0',
                'jingli': '0',
                'sudu': '1'
            }],
            'player2': [{
                'name': '咕叽',
                'id': '1032',
                'qixue': '0',
                'jingli': '0',
                'sudu': '1',
                'jineng': [{
                    'name': '舍命一击',
                    'type': '1',
                    'status': 'left'
                }, {
                    'name': '力劈华山',
                    'type': '1',
                    'status': 'left'
                }, {
                    'name': '气冲斗牛',
                    'type': '1',
                    'status': 'right'
                }]
            }, {
                'name': '黄月英',
                'id': '10077',
                'qixue': '21210',
                'jingli': '20',
                'sudu': '1',
                'jineng': [{
                    'name': '五雷轰顶',
                    'type': '1',
                    'status': 'left'
                }]
            }, {
                'name': '舞女',
                'id': '1062',
                'qixue': '0',
                'jingli': '0',
                'sudu': '1'
            }, {
                'name': '舞女',
                'id': '1006',
                'qixue': '0',
                'jingli': '0',
                'sudu': '1'
            }]
        };

        try {
            //初始化右边玩家数组
            pk.rightPlay = new Array();
            //初始化右边玩家数组
            pk.leftPlay = new Array();
            cc.loader.loadRes('pk/player', cc.Prefab, function (err, prefab) {
                if (!err) {
                    var p2 = result.player2;
                    var p1 = result.player1;
                    pk.play1 = p1;
                    pk.play2 = p2;
                    pk.jn = '普通攻击';

                    for (var i in p1) {
                        pk.leftPlay.push(p1[i].id);
                        var play1 = cc.instantiate(prefab);
                        play1.id = p1[i].id;
                        play1.name = p1[i].id;

                        var play1Js = play1.getComponent("playerItem");
                        play1Js.attackHide();
                        play1.id = i;
                        var x = 0;
                        var y = 740 - i * 70;
                        var num = parseInt(i) + parseInt(1);
                        cc.log(num);
                        if (num % 2 == 0) {
                            x = 170;
                        } else {
                            x = 100;
                        }

                        play1.setPosition(x, y);
                        cc.director.getScene().addChild(play1);
                    }

                    for (var m in p2) {
                        pk.rightPlay.push(p2[m].id);

                        var play2 = cc.instantiate(prefab);

                        var play2Js = play2.getComponent("playerItem");
                        if (m == 0) {
                            play2Js.attackShow();
                        } else {
                            play2Js.attackHide();
                        }

                        var flipYAction = cc.flipX(true);
                        play2.runAction(flipYAction);
                        play2.name = p2[m].id;
                        var x = 0;
                        var y = 740 - m * 70;
                        var num = parseInt(m) + parseInt(1);
                        cc.log(num);
                        if (num % 2 == 0) {
                            x = 650;
                        } else {
                            x = 560;
                        }

                        play2.setPosition(x, y);
                        cc.director.getScene().addChild(play2);
                    }
                }
            });
        } catch (e) {
            cc.log("初始化pk界面异常:" + e);
        }
    },
    index: function index() {
        loading();
        cc.director.preloadScene('indexhg', function () {

            cc.log('Next scene index');

            cc.director.loadScene('indexhg');
        });
    },
    /**
     * 指令函数
     * param e 事件对象
     * param num 区分按钮类型
     * param type 区分攻击类型
     * param status 区分左右角色
     */
    attack: function attack(e, num, type, status) {
        var name;
        try {
            switch (num) {
                //攻击指令
                case 'gj':
                    {
                        cc.log(type);
                        if (typeof type == 'undefined' || type == null || type == '') {
                            pk.jn = '普通攻击';
                        }
                        cc.log("攻击");
                        cc.find("Canvas/zhiling").active = false;
                        cc.find("Canvas/roleDetail").active = true;
                        if (status == 'left' || typeof status == 'undefined') {
                            name = pk.leftPlay[0];
                            this.rightShow();
                        } else if (status == 'right') {
                            name = pk.rightPlay[0];
                        }

                        pk.clickStatus = true;
                        // this.leftShow(name)
                        var role = cc.director.getScene().getChildByName(name);

                        var button = role.getComponentInChildren(cc.Button);
                        playJs.load.playerClickEvent(role);

                        break;
                    }
                //技能指令
                case 'jn':
                    {
                        cc.log("技能");
                        var p = getPkRoleMsg(pk.rightPlay[0], 2);
                        var jn = p.jineng;
                        cc.log(jn[0].name);
                        cc.find("Canvas/zhiling").active = false;
                        cc.log("初始化技能列表");
                        var jineng = cc.find("Canvas/jineng");
                        jineng.active = true;
                        cc.find("Canvas/jineng/detail/scrollview/view/content").getComponent('pkJnContent').onloading();

                        break;
                    }
            }
        } catch (e) {
            cc.log('加载技能列表异常:' + e);
        }
    },
    leftShow: function leftShow(num) {
        var left = pk.leftPlay;
        var sccen = cc.director.getScene();

        for (var i in left) {
            var child = sccen.getChildByName(left[i]);
            if (num != left[i]) {
                child.getComponent("playerItem").attackHide();
            } else {
                child.getComponent("playerItem").attackShow();
            }
        }
    },
    rightShow: function rightShow() {
        var right = pk.rightPlay;
        var child = cc.director.getScene().getChildByName(right[0]);
        child.getComponent("playerItem").attackHide();
    },
    back: function back() {
        pk.status = null;
        cc.find("Canvas/zhiling").active = true;
        cc.find("Canvas/roleDetail").active = false;
        var left = pk.leftPlay;
        for (var i in left) {
            var child = cc.director.getScene().getChildByName(left[i]);
            child.getComponent("playerItem").attackHide();
        }
        var right = pk.rightPlay;

        for (var m in right) {
            var child = cc.director.getScene().getChildByName(right[m]);
            if (m == 0) {
                child.getComponent("playerItem").attackShow();
            } else {
                child.getComponent("playerItem").attackHide();
            }
        }
    },
    playerClickEvent: function playerClickEvent(event) {
        var node = event.target;
        cc.log(node.name);
    },
    /**
     * 接收服务器返回数据播放动画
     */
    playPkAnimation: function playPkAnimation() {
        PkAnimation();
    },
    animationTest: function animationTest() {
        //this.playPkAnimation()
        //     var background = cc.find("Canvas/background");
        //     var seq;
        //     if (status == 1) {
        //         seq = cc.sequence(cc.moveTo(1, cc.p(0, 137)).easing(cc.easeCubicActionOut(1)));
        //         background.color = new cc.Color(245, 245, 245);

        //         status = null;
        //     } else {
        //         seq = cc.sequence(cc.moveTo(1, cc.p(200, 137)).easing(cc.easeCubicActionOut(1)));
        //         background.color = new cc.Color(0, 0, 0);
        //         //对应技能动画
        //         //五雷轰顶

        //         status = 1;
        //     }


        //     background.runAction(seq);
        //   jinengLoad('wanjian',background);


    },
    JnAnimation: function JnAnimation(msg) {
        var background = cc.find("Canvas/background");
        var seq;
        var x = 0;
        if ('left' == msg.msg.attackType.direction) {
            x = 200;
            background.color = new cc.Color(0, 0, 0);
        } else {
            x = -200;
        }
        seq = cc.sequence(cc.moveTo(1, cc.p(x, 137)).easing(cc.easeCubicActionOut(1)));

        // seq = cc.sequence(cc.moveTo(1, cc.p(x, 137)).easing(cc.easeCubicActionOut(1)));
        // background.color = new cc.Color(0, 0, 0);
        background.runAction(seq);
        jinengLoad(msg, background, null);
    },
    animationDanClose: function animationDanClose(event) {

        var background = cc.find("Canvas/background");
        background.getChildByName("dan").active = false;
        this.animationTest();
    },
    alertImg: function alertImg() {
        loadingScene(HxsgScenes.index, HxsgScenes.index);
    }
});

cc._RFpop();
},{"playerItem":"playerItem"}],"pkWuPin":[function(require,module,exports){
"use strict";
cc._RFpush(module, '82d4cPSt7JANYbsW4stCSKS', 'pkWuPin');
// js\pk\pkWuPin.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        contents: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
    },
    backEvent: function backEvent() {
        cc.find("Canvas/zhiling").active = true;
        cc.log("初始化技能列表");
        cc.find("Canvas/jineng").active = false;
    },
    onloading: function onloading(e, id) {
        cc.loader.loadRes('pk/yao', cc.Prefab, function (err, prefab) {
            if (!err) {
                self.contents.removeAllChildren();
                ajaxUtils(HxsgUrl.queryRoleYao, null, function (data) {
                    self.contents.height = data.length / 2 * 80 + 80;
                    for (var i = 0; i < data.length; i++) {
                        var node = cc.instantiate(prefab);
                        var imgName = data[i].yaoid;
                        var path = void 0;
                        if (imgName <= 10) {
                            path = "qx/";
                        } else {
                            path = "jl/";
                        }

                        var jnJs = node.getComponent("yao");
                        var sprite = node.getComponent('cc.Sprite');
                        sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/yao/" + path + imgName + ".png"));
                        //cc.log(sprite.spriteFrame)
                        jnJs.setNum(data[i].sum);
                        node.on('click', self.clickEvent, self);
                        node.id = data[i];
                        self.contents.addChild(node);
                    }
                });
            }
        });
    },
    clickEvent: function clickEvent(event) {
        var node = event.target;
        var jn = node.id;
        cc.log('使用药品名称:' + node.id.skillname);
        cc.find("Canvas/wupin").active = false;
        var data = null;
        //道具的使用，后期需要增加，经军令
        pk.selectStatus = 2000;
        data = pk.clickArrayRight[0];
        onloadJnZhiling(false);
        console.log("选择指令完成");
        //模拟点击第一个人物按钮效果
        clickRoleTool(data, node.id.yaoname);
    }
});

cc._RFpop();
},{}],"playerItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'eed673P22ZHNZnGpGbrK4+W', 'playerItem');
// js\pk\playerItem.js

'use strict';

var self;
var playStatus = 0;
var msg = pk.msg;
var msgJson;
var TweenLite = require('TweenLite');
/**
 * PK动画播放有限状态机
 */
module.exports = function getpkStateMachine() {

    this.pkStateMachine = new StateMachine({
        data: {
            battle: null
        },
        transitions: [{ name: 'toStart', from: 'none', to: 'start' }, { name: 'toShifa', from: 'start', to: 'shifa' }, { name: 'toMoveBackGround', from: 'shifa', to: 'backgorund' }, { name: 'toSkill', from: 'backgorund', to: 'skill' }, { name: 'toKouXue', from: 'skill', to: 'kouxue' }, { name: 'toReturnBackGround', from: 'kouxue', to: 'moveBack' }, { name: 'finshed', from: 'moveBack', to: 'end' }, { name: 'end', from: 'end', to: 'start' }],
        methods: {
            onStart: function onStart() {
                var _this = this;

                msg = pk.msg;
                msgJson = msg[playStatus];
                try {
                    cc.log(msgJson.player1 + "使用了【" + msgJson.attackType.name + "】造成" + msgJson.player2[0] + "：" + msgJson.battleData[msgJson.player2[0]].Qx + "被攻击者剩余：" + msgJson.battleData[msgJson.player2[0]].Qx2);
                } catch (e) {}

                console.log("onStart");
                setTimeout(function () {
                    _this.onToShifa();
                }, 100);
            },
            onToShifa: function onToShifa() {
                if (playStatus >= pk.msg.length) {
                    playStatus = 0;
                    if (pk.pkstatus != "6000" && pk.pkstatus != "") {
                        cc.log("战斗结束");
                        cc.find("Canvas/end").active = true;
                        pk.msg = [];
                        pk.pkstatus = "";
                        //重置
                        pk.initType = "init";
                        pk.player1 = {};
                        pk.player2 = {};
                        return;
                    }
                    if (pk.initType != "init") {
                        //重置
                        pk.initType = "init";

                        var jsonData = pk.tempMsg;
                        //重新加载主界面数据----2018-1-21修复重复加载rightPlay问题
                        onloadPkMsg(jsonData);
                        pk.selectStatus = 2000;
                        pk.timeStatus = 0; //开启倒计时
                        pk.msg = []; //初始化数据
                        playStatus = 0;
                        cc.log(pk);
                        window.pkOnload.init();
                        PkSocketEvents.onloadPlay(-160, -165, 0);
                        PkSocketEvents.onloadPlay(253, 205, 1);
                        onloadJn(true);
                    }
                } else {
                    cc.find("Canvas/name/attackType").getComponent(cc.Label).string = msgJson.attackType.name;
                    console.log("施法。。。" + msgJson.player1);
                    var body = cc.find("Canvas/background/" + msgJson.player1 + "/play/role/body");
                    var shifAnim = body.getChildByName("shifa").getComponent(cc.Animation);

                    //关闭血条显示
                    playbloodClose(0);
                    //关闭所有人物buff显示
                    buffClose();

                    //对自身队友释放技能，场景不移动
                    var _self = this;
                    setTimeout(function () {
                        playAnim(shifAnim, function () {
                            _self.onToMoveBackGround();
                        });
                    }, 100);
                }
            },
            onToMoveBackGround: function onToMoveBackGround() {
                var _this2 = this;

                console.log("背景移动开始");
                var jnName = msgJson.attackType.type;
                if (jnName == "jnzhanpugong" || jnName == "usryao" || jnName == "jlbz") {
                    setTimeout(function () {
                        _this2.onToSkill();
                    }, 100);
                } else {
                    setTimeout(function () {
                        var background = cc.find("Canvas/background");

                        var x = msgJson.attackType.rolePosition == 'left' ? -200 : 200;
                        if (msgJson.attackType.rolePosition == "self") {
                            x = -200;
                        }
                        var self = _this2;
                        moveTo(background, x, 137, function () {
                            self.onToSkill();
                        });
                    }, 100);
                }
            },
            onToSkill: function onToSkill() {
                var _this3 = this;

                var background = cc.find("Canvas/jn");
                var jnAnim = null;
                //停止站立
                standAnim(msgJson.player2, false);
                var jnName = msgJson.attackType.type;
                var key = false;

                switch (jnName) {
                    case "jnzhanpugong":
                        {
                            var playGongId = msgJson.player1;
                            var playShouId = msgJson.player2[0];
                            var playGong = cc.find("Canvas/background/" + playGongId);
                            var playShou = cc.find("Canvas/background/" + playShouId);
                            var playGongX = playGong.x;
                            var playGongY = playGong.y;
                            var _self2 = this;
                            moveTo(playGong, playShou.x, playShou.y, function () {
                                _self2.onToKouXue();
                                moveTo(playGong, playGongX, playGongY, function () {
                                    setTimeout(function () {
                                        _self2.onFinshed();
                                    }, 1000);
                                });
                            });

                            break;
                        }
                    case "wugujidu":
                        {

                            cc.find("Canvas/background").color = new cc.Color(255, 255, 255);
                            jnAnim = background.getComponent(cc.Animation);
                            key = true;
                            break;
                        }
                    case "jlbz":
                        {
                            var _self3 = this;
                            _self3.onFinshed();

                            key = false;
                            break;
                        }
                    case "wei":
                    case "luan":
                    case "feng":
                    case "usryao":
                    case "qichong":
                        {
                            var playShouId;
                            var num;

                            var _ret = function () {
                                playShouId = msgJson.player2;
                                num = 0;

                                var self = _this3;

                                var _loop = function _loop(i) {
                                    setTimeout(function () {
                                        var jnDan = cc.find("Canvas/background/" + playShouId[i] + "/jnDan");
                                        cc.log("Canvas/background/" + playShouId[i] + "/jnDan");
                                        jnAnim = jnDan.getComponent(cc.Animation);

                                        playAnimArr(jnAnim, jnName, function () {
                                            msg = pk.msg;
                                            num++;
                                            if (num == playShouId.length - 1) {
                                                self.onToReturnBackGround();
                                            }
                                            self.onToReturnBackGround();
                                            console.log(jnName + "技能释放完毕");
                                        });
                                        self.onToKouXue(jnName);
                                    }, 100);
                                };

                                for (var i = 0; i < playShouId.length; i++) {
                                    _loop(i);
                                }
                                // setTimeout(() => {
                                //    pkStateMachine.onToReturnBackGround();
                                // }, 100 * (playShouId.length+1));
                                key = false;
                                return 'break';
                            }();

                            if (_ret === 'break') break;
                        }

                    case "lei":
                    case "lipi":
                    case "sheming":
                        {
                            cc.find("Canvas/background").color = new cc.Color(0, 0, 0);
                            var playShouId = msgJson.player2[0];
                            var jnDan = cc.find("Canvas/background/" + playShouId + "/jnDan");
                            jnAnim = jnDan.getComponent(cc.Animation);
                            key = true;
                            break;
                        }

                    default:
                        {
                            cc.find("Canvas/background").color = new cc.Color(0, 0, 0);
                            jnAnim = background.getComponent(cc.Animation);
                            key = true;
                            break;
                        }
                }
                if (key) {
                    var _self4 = this;
                    setTimeout(function () {
                        playAnimArr(jnAnim, jnName, function () {
                            // pkStateMachine.onToKouXue();
                            console.log("技能释放完毕");
                            _self4.onToReturnBackGround();
                        });
                        _self4.onToKouXue();
                    }, 100);
                }
            },
            onToKouXue: function onToKouXue(jnName) {
                //被攻击着
                var play = msgJson.player2;
                var battleData = msgJson.battleData;
                var attackType = msgJson.attackType;

                var _loop2 = function _loop2(i) {
                    // var re = kouxue(pk.player1, play[i], battleData[play[i]],attackType);
                    // if (re) {
                    //     kouxue(pk.player2, play[i], battleData[play[i]],attackType);
                    // }
                    setTimeout(function () {
                        var qx = battleData[play[i]].Qx;
                        //播放扣血，或者种了BUFF动画，buff动画根据技能名称选择
                        var shouji = cc.find("Canvas/background/" + play[i]).getComponent(cc.Animation);
                        var kouxue = cc.find("Canvas/background/" + play[i] + "/play/kouxue");
                        kouxue.getComponent(cc.Label).string = qx;
                        var dead = cc.find("Canvas/background/" + play[i] + "/dead");
                        //  let kouxue = cc.find("Canvas/background/" + play[i] + "/play/kouxue");
                        if (jnName == "usryao") {
                            cc.find("Canvas/background/" + play[i] + "/play").active = true;
                            //  kouxue.color = new cc.Color("#16F10D");
                            dead.active = false;
                        } else {
                            //  kouxue.color = new cc.Color("#000000");
                        }
                        if (qx == 0) {
                            kouxue.getComponent(cc.Label).string = "";
                            var wz = cc.find("Canvas/background/" + play[i] + "/play/wz").getComponent(cc.Animation);;
                            playAnim(wz);
                        }
                        playAnim(shouji, function () {

                            var qx2 = battleData[play[i]].Qx2;
                            cc.find("Canvas/background/" + play[i] + "/play/kouxue").getComponent(cc.Label).string = "";
                            if (qx2 == 0) {
                                //播放死亡动画
                                dead.scaleX = -1;
                                cc.find("Canvas/background/" + play[i] + "/play").active = false;
                                var deadAnim = dead.getComponent(cc.Animation);
                                playAnim(deadAnim, null);
                            }
                        });
                    }, 200);
                };

                for (var i = 0; i < play.length; i++) {
                    _loop2(i);
                }
            },
            onToReturnBackGround: function onToReturnBackGround() {
                console.log("onMoveBack----");
                var background = cc.find("Canvas/background");
                background.color = new cc.Color(240, 240, 240);
                var self = this;
                setTimeout(function () {
                    moveTo(background, -20, 137, function () {
                        self.onFinshed();
                    });
                }, 100);
            },
            onFinshed: function onFinshed() {
                console.log("onFinshed----");
                cc.find("Canvas/name/attackType").getComponent(cc.Label).string = "";
                this.onEnd();
            },
            onEnd: function onEnd() {
                playStatus++;
                this.onStart();
                console.log("end----");
            }
        }
    });
    //return pkStateMachine;
};

function kouxue(arr, id, battleData, attackType) {
    var qx = battleData.Qx;
    var re = true;
    cc.log(id);
    for (var m = 0; m < arr.length; m++) {
        cc.log("------------------------");
        cc.log(arr[m].id);
        if (arr[m].id == id) {
            try {
                qx = parseInt(qx);
                arr[m].qixue = battleData.Qx2;
                re = false;
                cc.log(arr);
                var buffType = battleData.buff;
                if (buffType != null && typeof buffType != 'undefined') {
                    arr[m]['battleData'] = battleData;
                }
            } catch (e) {
                cc.log("buff加载异常:" + e);
            }
        }
    }
    cc.log(pk);
    return re;
}
function playAnim(anim, callback) {
    anim.play();
    if (callback) {
        anim.on('finished', callback);
    }
}
function playAnimArr(anim, name, callback) {
    anim.play(name);
    if (callback) {
        anim.on('finished', callback);
    }
}
function moveTo(position, x, y, callback) {

    TweenLite.to(position, 0.5, {
        x: x,
        y: y,
        ease: Power2.easeOut,
        onComplete: callback
    });
}
/**
 * 玩家血条显示开关
 */
function playbloodClose(num) {
    var left = pk.leftPlay;
    var right = pk.rightPlay;
    for (var i = 0; i < left.length; i++) {
        cc.find("Canvas/background/" + left[i] + "/play/status").opacity = num;
    }
    for (var _i = 0; _i < right.length; _i++) {
        cc.find("Canvas/background/" + right[_i] + "/play/status").opacity = num;
    }
}
/**
 * 关闭玩家buff
 */
function buffClose() {
    var background = cc.find("Canvas/background");
    var children = background.children;
    for (var i = 0; i < children.length; ++i) {
        try {
            var buff = children[i].getChildByName("buff");
            buff.removeAllChildren();
        } catch (e) {
            cc.log(e);
        }
    }
}
/**
 * 站立动画控制开关
 */
function standAnim(arr, key) {

    for (var i = 0; i < arr.length; i++) {
        var role = cc.find("Canvas/background/" + arr[i] + "/play/role");
        if (key) {
            role.getComponent(cc.Animation).play();
        } else {
            role.getComponent(cc.Animation).stop();
        }
    }
}
var playJs = cc.Class({
    extends: cc.Component,

    properties: {
        head: cc.Sprite,
        body: cc.Sprite,
        foot: cc.Sprite,
        attack: cc.Node,
        button: cc.Button,
        roleDeath: cc.Node,
        label: cc.Node
    },
    death: function death() {
        this.roleDeath.active = true;
    },
    shifa: function shifa() {
        var playJs = require("playerItem");
        var py = new playJs();
        var stateMachine = py.pkStateMachine;
        stateMachine.toStart();
    },
    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        // var flipYAction = cc.flipX(true);
        // var actionBy = cc.moveTo(0.5, cc.p(130,698));
        //    this.node.runAction(flipYAction);

        //  this.node.runAction(actionBy);

        //    var y= this.node.getPositionY();
        //       var x= this.node.getPositionX();
        //       var height=y+10;
        //     var seq = cc.repeatForever(cc.moveTo(x, cc.p(0,y+10)).easing(cc.easeCubicActionOut(1)));
        //     if(height==this.node.getPositionY())
        //       var seq = cc.repeatForever(cc.moveTo(x, cc.p(0,y-10)).easing(cc.easeCubicActionOut(1)));
        //     this.body.node.runAction(seq);

        //         cc.log("---height:"+this.node.getPositionY())

    },
    attackHide: function attackHide() {
        this.attack.active = false;
    },

    attackShow: function attackShow() {
        this.attack.active = true;
    },
    /**
     * 遍历数组返回角色信息----
     */
    getRoleMsg: function getRoleMsg(id) {
        try {
            var p = pk.play1;
            for (var i in p) {
                if (id == p[i].id) {
                    return p[i];
                }
            }
        } catch (e) {}
    },
    playerClickEvent: function playerClickEvent(event) {
        cc.log('人物点击时间触发');
        var parent;
        var msg;
        var left;
        try {
            if (pk.clickStatus) {
                var node = event.target;

                if (typeof node == 'undefined') {
                    cc.log('------------------');
                    parent = event;
                } else {
                    parent = node.parent;
                    cc.log('-------+++++-----------');
                }

                var roleDetail = cc.find("Canvas/roleDetail");
                var roleDetailJs = roleDetail.getComponent("roledetail");
                msg = getPkRoleMsg(parent.name, 1);
                left = pk.leftPlay;
                if (typeof msg == 'undefined') {
                    msg = getPkRoleMsg(parent.name, 2);
                    left = pk.rightPlay;
                }

                roleDetailJs.setAttackName(pk.jn);
                roleDetailJs.setType(msg.name);
                roleDetailJs.setXue("血:" + msg.qixue);
                roleDetailJs.setJing("精:" + msg.jingli);
                roleDetailJs.setsu("速度第八");
                cc.log(pk.status);
                if (pk.status == parent.name) {
                    cc.log("攻击指令完成:" + pk.rightPlay[0] + "使用【" + pk.jn + "】攻击了" + parent.name);
                    //指令数组
                    pk.attacked.push({ 'attack': pk.rightPlay[0], 'attacked': parent.name, 'attackType': pk.jn });

                    pk.rightPlay.shift();
                    if (pk.rightPlay.length == 0) {
                        //右方攻击指令全部完成
                        cc.log("发送攻击指令给服务器:" + pk.attacked.length);
                    }
                    this.back();
                    parent.getComponent("playerItem").attackHide();
                    pk.clickStatus = false;
                    pk.status = null;
                    pk.jn = '普通攻击';
                } else {
                    pk.status = parent.name;
                    parent.getComponent("playerItem").attackShow();
                    var sccen = cc.director.getScene();
                    for (var i in left) {
                        if (left[i] != parent.name) {
                            var child = sccen.getChildByName(left[i]);
                            child.getComponent("playerItem").attackHide();
                        }
                    }
                }
            }
        } catch (e) {

            cc.log(e);
        }
    },

    back: function back() {
        var right = pk.rightPlay;
        if (typeof right[0] == 'undefined' || right[0] == null || right[0] == '') {
            cc.find("Canvas/zhiling").active = false;
            cc.find("Canvas/roleDetail").active = false;
        } else {
            cc.find("Canvas/zhiling").active = true;
            cc.find("Canvas/roleDetail").active = false;
            for (var m in right) {
                var child = cc.director.getScene().getChildByName(right[m]);
                if (m == 0) {
                    child.getComponent("playerItem").attackShow();
                } else {
                    child.getComponent("playerItem").attackHide();
                }
            }
        }
    }

});

cc._RFpop();
},{"TweenLite":"TweenLite","playerItem":"playerItem"}],"return":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4d49eTbdUpKKLy/4Nyzq+qH', 'return');
// js\util\return.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {},
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        var scene = cc.director.getScene().name;
        returnLastScene(scene);
    },
    backUserList: function backUserList() {
        cc.director.loadScene('userList');
    }
});

cc._RFpop();
},{}],"rolePrefabs":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c43d9WONCpCyr0iMFbK5BXB', 'rolePrefabs');
// js\index\move\rolePrefabs.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        roleName: cc.Label,
        battle: cc.Sprite,
        battleList: {
            default: [],
            type: cc.SpriteFrame
        },
        img: cc.Sprite
    },
    onLoad: function onLoad() {
        self = this;
    },

    init: function init(msg) {
        this.roleName.string = msg.roleName;
        this.battle.spriteFrame = this.battleList[msg.num];
        this.id = msg;

        this.battle.node.on(cc.Node.EventType.TOUCH_START, this.alert, this);
    },
    alert: function alert(event) {
        if (this.id.num == 0) {
            pk.yeguai = this.id;
            loadingScene(HxsgScenes.pkWait, HxsgScenes.index);
        } else {
            if (this.id.roleName == '内测使者') {
                showAlert('你想领取每天的藏宝图大礼包吗？', this.succes);
                userWuPin.objets = this.id.roleName;
            } else {
                showAlert('可以找内测使者领取礼包哦');
            }
        }
    },
    succes: function succes() {
        ajaxData(HxsgUrl.giftPackage, { 'name': userWuPin.objets }, self.succesAlert);
    },
    succesAlert: function succesAlert(msg) {
        showAlert(msg.msg);
    }
});

cc._RFpop();
},{}],"roledetail":[function(require,module,exports){
"use strict";
cc._RFpush(module, '511b6rlidpDZ7W4+APl6KuL', 'roledetail');
// js\pk\roledetail.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        attackName: cc.Label,
        type: cc.Label,
        xue: cc.Label,
        jing: cc.Label,
        su: cc.Label

    },

    // use this for initialization
    onLoad: function onLoad() {},
    setAttackName: function setAttackName(name) {
        this.attackName.string = name;
    },
    setType: function setType(name) {
        this.type.string = name;
    },
    setXue: function setXue(name) {
        this.xue.string = name;
    },
    setJing: function setJing(name) {
        this.jing.string = name;
    },
    setsu: function setsu(name) {
        this.su.string = name;
    },
    return: function _return() {
        var roleDetail = cc.find("Canvas/roleDetail");
        roleDetail.active = false;
        var zhiLing = cc.find("Canvas/zhiling");
        zhiLing.active = true;
        onloadJnZhiling(true);
        selectEnemy(null, pk.clickArrayLeft);
        pk.sureClick = "";
        if (pk.pkyaostatus != "0") {
            pk.pkyaostatus = "0";
            selectEnemy(pk.clickArrayRight[0], pk.rightPlay);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"role":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b054bXVlohHCrg1+T5Kr7vC', 'role');
// js\pk\role.js

"use strict";

var self;
var status;
cc.Class({
    extends: cc.Component,

    properties: {
        xue: cc.ProgressBar,
        jing: cc.ProgressBar,
        dead: cc.Node,
        play: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    clickRole: function clickRole(event, num) {
        var node = event.target;
        var name = node.parent.name;
        var p = node.parent;
        var role = p.getComponent("role");
        var progress = role.xue.getComponent(cc.ProgressBar).progress;
        //选择队友
        if (pk.pkyaostatus == "1") {
            //主角不管是否死亡都可以选择
            if (name == pk.rightOne) {
                clickRoleTool(name, pk.jnName);
            } else {
                //副将死亡不可以选择，并且只能选择右边副将
                for (var i = 0; i < pk.rightPlay.length; i++) {
                    if (name == pk.rightPlay[i] && progress > 0) {
                        clickRoleTool(name, pk.jnName);
                    } else {
                        cc.log("当前状态不符合，禁止点击操作");
                    }
                }
            }
        } else {
            //选择敌人
            if (num == pk.selectStatus && progress > 0) {
                clickRoleTool(name, pk.jnName);
                //已死副将不能点击
            } else {
                cc.log("当前状态不符合，禁止点击操作");
            }
        }
    },
    setXueAndJing: function setXueAndJing(xue, jing) {
        this.xue.getComponent(cc.ProgressBar).progress = xue;
        this.jing.getComponent(cc.ProgressBar).progress = jing;
    },
    setDead: function setDead() {
        this.dead.active = true;
        this.dead.opacity = 255;

        this.play.active = false;
        //死亡停止buff动画播放
        var buff = self.node.getChildByName("buff");
        buff.removeAllChildren();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"saiziButton":[function(require,module,exports){
"use strict";
cc._RFpush(module, '676f410vCxCZLzWqsZf42uc', 'saiziButton');
// js\gamble\saiziButton.js

'use strict';

var _times = 3000;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        type: 3,
        gold: true,
        issend: 0,
        msg: cc.RichText
    },
    sure: function sure() {
        loadingScene(HxsgScenes.guangChang, HxsgScenes.index);
    },
    times: function times(msg) {
        _times = msg.times;
        self.schedule(self.scheduleTime, 1);
    },
    scheduleTime: function scheduleTime() {
        DuChangVo.num = _times;

        if (_times == '0' || typeof _times == 'undefined') {
            self.unschedule(self.scheduleTime);
            self.init();
            var jiesuan = cc.find("Canvas/jiesuan");
            jiesuan.active = true;
            jiesuan.getComponent("jiesuan").setMsg("猜猜猜结算中，请稍后再来");
            //showAlert("赌场结算中，请稍后再来", self.sure, self.sure);
        }
        var minutes = Math.floor(_times / 1000 / 60 % 60); //所余分钟数  
        var second = Math.floor(_times / 1000 % 60); //所余秒数  
        //1分58秒后开盅，买定离手
        var target = cc.find("Canvas/saizi/main/label2");
        var mstr = minutes.toString() + "分" + second.toString() + "秒后开蛊";
        target.getComponent("cc.Label").string = mstr;

        _times = _times - 1000;
    },
    initMsg: function initMsg(msg) {
        var loadJson = msg.msg;
        cc.log('initMsg:-------');

        var baozijin = loadJson.baoZiJin;
        var baoziyin = loadJson.baoZiYin;

        var dajin = loadJson.daJin;
        var dayin = loadJson.daYin;

        var danjin = loadJson.danJin;
        var danyin = loadJson.danYin;

        var xiaojin = loadJson.xiaoJin;
        var xiaoyin = loadJson.xiaoYin;

        var shuangjin = loadJson.shuangJin;
        var shuangyin = loadJson.shuangYin;

        var lastId = loadJson.yldaxiao.id;
        var lastNum1 = loadJson.yldaxiao.num1;
        var lastNum2 = loadJson.yldaxiao.num2;
        var lastNum3 = loadJson.yldaxiao.num3;
        var lastResult = loadJson.yldaxiao.result;
        var lastStatus = loadJson.yldaxiao.status;

        var sumJin = loadJson.totalSumJin;
        var sumYin = loadJson.totalSumYin;
        var curstr;
        var curtarget;
        try {
            curstr = "上期" + lastId.toString() + "开" + lastNum1.toString() + " " + lastNum2.toString() + " " + lastNum3.toString() + " " + lastResult;
            curtarget = cc.find("Canvas/saizi/main/label1");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {}
        try {
            curstr = "目前买小" + xiaojin.toString() + "金" + xiaoyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label3");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {}
        try {
            curstr = "目前买大" + dajin.toString() + "金" + dayin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label4");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {}
        try {
            curstr = "目前买单" + danjin.toString() + "金" + danyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label5");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {}
        try {
            curstr = "目前买双" + shuangjin.toString() + "金" + shuangyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label6");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {}
        try {
            curstr = "目前买豹子" + baozijin.toString() + "金" + baoziyin.toString() + "银";
            curtarget = cc.find("Canvas/saizi/main/label7");
            curtarget.getComponent("cc.Label").string = curstr;
        } catch (e) {}
        try {
            curstr = '<on click="handler">' + sumJin.toString() + '金' + sumYin.toString() + '银</on>';
            curtarget = cc.find("Canvas/saizi/msg");
            //   cc.log(curtarget)
            //   this.msg.string=curstr;
            curtarget.getComponent("cc.RichText").string = curstr;
        } catch (e) {}
    },
    init: function init() {
        cc.log('init----------');
        ajaxData(HxsgUrl.queryCasinoMsg, null, self.initMsg);
    },
    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        //alert(globalInfo.url());
        if (DuChangVo.num === '1000') {
            cc.find("Canvas/jiesuan").active = true;
        } else {
            cc.find("Canvas/jiesuan").active = false;
        }
        this.canceldialog(null);
        SocketEvents.dzMsg = function () {
            self.init();
            ajaxData(HxsgUrl.appsxtime, null, self.times);
            // 这里的 this 指向 component
        };
        this.init();
        ajaxData(HxsgUrl.appsxtime, null, this.times);
    },
    buttonChangeNormal: function buttonChangeNormal(node) {
        node.color = new cc.Color(236, 13, 13);
    },
    handler: function handler(data) {
        cc.log('赢家');
        loadingScene(HxsgScenes.yingJia, HxsgScenes.saizi);
    },
    buttonChangeLight: function buttonChangeLight(node) {
        node.color = new cc.Color(236, 86, 0);
    },
    displaydialog: function displaydialog() {
        cc.find("Canvas/saizi/dialog/dialog/msg").active = false;
        cc.find("Canvas/saizi/dialog/dialog/count").active = true;
        cc.find("Canvas/saizi/dialog/dialog/top").active = true;
        cc.find("Canvas/saizi/dialog/dialog/right").active = true;
        var topString = "您选择的是 ";
        switch (this.type) {
            case 1:
                topString += "大";break;
            case 2:
                topString += "小";break;
            case 3:
                topString += "豹子";break;
            case 4:
                topString += "单";break;
            case 5:
                topString += "双";break;
        }
        var rightString = "";
        if (this.gold === true) rightString += "金";else rightString += "银";
        var dialog = cc.find("Canvas/saizi/dialog");
        var top = cc.find("Canvas/saizi/dialog/dialog/top");
        var right = cc.find("Canvas/saizi/dialog/dialog/right");
        top.getComponent("cc.Label").string = topString;
        right.getComponent("cc.Label").string = rightString;
        dialog.active = true;
    },
    goldtype: function goldtype(event) {
        var node = event.target;
        var typenode = node.parent;

        switch (typenode.name) {
            case "da":
                this.type = 1;break;
            case "xiao":
                this.type = 2;break;
            case "baozi":
                this.type = 3;break;
            case "dan":
                this.type = 4;break;
            case "shuang":
                this.type = 5;break;
        }
        if (node.name == "ying") this.gold = false;else this.gold = true;
        this.displaydialog();
    },

    okdialog: function okdialog(event) {
        var msgnode = cc.find("Canvas/saizi/dialog/dialog/msg");
        if (this.issend == 0) {
            msgnode.active = true;
            cc.find("Canvas/saizi/dialog/dialog/count").active = false;
            cc.find("Canvas/saizi/dialog/dialog/top").active = false;
            cc.find("Canvas/saizi/dialog/dialog/right").active = false;
            var count = parseInt(cc.find("Canvas/saizi/dialog/dialog/count").getComponent("cc.EditBox").string);
            if (count <= 0 || isNaN(count)) {
                msgnode.getComponent("cc.Label").string = "请输入正确的金额";
                this.issend = -1;
            } else {
                //msgnode.getComponent("cc.Label").string=count.toString();
                var result = "";

                switch (this.type) {
                    case 1:
                        result = "大";break;
                    case 2:
                        result = "小";break;
                    case 3:
                        result = "豹子";break;
                    case 4:
                        result = "单";break;
                    case 5:
                        result = "双";break;
                }
                var sdata;
                if (this.gold) {
                    sdata = {
                        'jin': count,
                        'result': result
                    };
                } else {
                    sdata = {
                        'yin': count,
                        'result': result
                    };
                }
                ajaxData(HxsgUrl.roleStakeResult, sdata, function (msg) {
                    msgnode.getComponent("cc.Label").string = msg.msg; //返回消息
                });
                this.issend = 1;
            }
        } else if (this.issend == 1) {
            msgnode.getComponent("cc.Label").string = "正在连接";
            this.canceldialog(event);
        } else {
            msgnode.getComponent("cc.Label").string = "正在连接";
            this.displaydialog();
            this.issend = 0;
        }
    },
    canceldialog: function canceldialog(event) {
        cc.find("Canvas/saizi/dialog").active = false;
        this.issend = 0;
    },
    bottomMenu: function bottomMenu(event) {
        var node = event.target;
        switch (node.name) {
            case "touzhujilu":
                loadingScene(HxsgScenes.touzhujilu, HxsgScenes.saizi);
                break;
            case "zhuanqianpaihang":
                loadingScene(HxsgScenes.zhuanqianpaihang, HxsgScenes.saizi);
                break;
            case "lishichaxun":
                loadingScene(HxsgScenes.lishichaxun, HxsgScenes.saizi);
                break;

        }
    },
    /**
    * 点击事件-->返回
    */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    }

});

cc._RFpop();
},{}],"selectedRole":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7ffb4BUeexECbBBLEnXKxM/', 'selectedRole');
// js\login\selectedRole.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label,
        id: cc.Label,
        zhiye: cc.Label,
        img: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"shiChangIndex":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5b466w20gFHGIhxNEfSFhmb', 'shiChangIndex');
// js\shichang\shiChangIndex.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
        loadCommomScence();
    },
    zhp: function zhp() {
        showAlert("暂未开放");
    },
    tjp: function tjp() {
        showAlert("暂未开放");
    },
    wqd: function wqd() {
        loadingScene(HxsgScenes.wuqi, HxsgScenes.index);
    },
    tzsc: function tzsc() {
        showAlert("暂未开放");
    },
    dp: function dp() {
        showAlert("暂未开放");
    }

});

cc._RFpop();
},{}],"siliao":[function(require,module,exports){
"use strict";
cc._RFpush(module, '34e88+7MAdKZ7n6tfEM/HRe', 'siliao');
// js\friends\siliao.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: cc.Label,
        friendName: cc.Label
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
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"systemMsg":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5fe1fVWPB9EB6Aywn2zFU9U', 'systemMsg');
// js\common\systemMsg.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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
    msg: null,
    // use this for initialization
    onLoad: function onLoad() {},
    showAlert: function (_showAlert) {
        function showAlert(_x) {
            return _showAlert.apply(this, arguments);
        }

        showAlert.toString = function () {
            return _showAlert.toString();
        };

        return showAlert;
    }(function (event) {
        var e = event.target;
        showAlert(this['msg']);
        e.destroy();
    }),
    init: function init(msg) {
        this['msg'] = msg;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"systemNotice":[function(require,module,exports){
"use strict";
cc._RFpush(module, '36b11q1YyhBmYhxB/gJbu/h', 'systemNotice');
// js\system\systemNotice.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.RichText,
        buttonMsg: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {},

    setMsg: function setMsg(msgStr) {
        this.msg.string = msgStr;
    }

});

cc._RFpop();
},{}],"system":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9be47WfeoxFuYzkbjEKxcYl', 'system');
// js\system\system.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        content: cc.Node,
        leftContent: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        ajax({
            type: 'GET',
            url: "" + localhost + "cocos2dNotis/querySystemNotis",
            dataType: 'jsonp',

            jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数
            success: function success(msg) {
                var p = msg.msg;
                //alert(p);
                for (var i = 0; i < p.length; i++) {
                    //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                    var item = cc.instantiate(self.itemPrefab);
                    self.leftContent.addChild(item);
                    item.x = 0;
                    item.y = -1 * i * item.height;
                    item.name = 'history' + i;
                    self.content.height = (i + 1) * item.height;

                    item = item.getComponent('systemNotice');
                    var labelStr = "<color=#ff0000>新 </c><color=#ffffff>" + p[i].custom1 + "</color>";
                    cc.log(labelStr);
                    item.setMsg(labelStr);
                }
            }
        });
    }
});

cc._RFpop();
},{}],"talking":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'de7b26ZuGpEX48zr34fUcBM', 'talking');
// js\friends\talking.js

'use strict';

window.curItemData = null;
window.currentWupin = 0;
var self;
cc.Class({
    extends: cc.Component,

    properties: {
        chatMsg: cc.Prefab,
        content: cc.Node,
        title: cc.RichText,
        msg: cc.EditBox
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        for (var i = 0; i < 20; i++) {
            var item = cc.instantiate(self.chatMsg);
            self.content.addChild(item);
        }
        cc.view.setDesignResolutionSize(720, 1080, 2);
        SocketEvents.updataFriendsMsg = this.initFriendsMsg;
        //cc.log(myFriends)
        ajaxData(HxsgUrl.chatRecord, myFriends, this.initChatMsg);
    },
    /**
        * 点击事件-->快速恢复
        */
    sendMsg: function sendMsg() {

        var msessage = this.msg.getComponent(cc.EditBox).string;
        myFriends.message = msessage;
        ajaxData(HxsgUrl.sendMsgForFriends, myFriends, this.initSendMsg);

        //cc.log(msessage);
    },
    initSendMsg: function initSendMsg(data) {

        var msg = data.msg;
        //cc.log(msg)
        var itemMsg = msg;
        if (itemMsg === '' || typeof itemMsg === 'undefined') {
            cc.log("返回null");
        } else {
            var item = cc.instantiate(self.chatMsg);

            // frist.zIndex=0;

            //self.content.children[0].zIndex=0;

            //  var li=self.content.children;

            self.content.addChild(item);
            //  for(var i=0;i<li.length;i++){
            //       cc.log('index'+i+':'+li[i].zIndex)
            //  }
            cc.log(self.content);
            var comp = item.getComponent('chatMsgItem');
            comp.initChatMsgItem(self.content.height, 'friends', itemMsg);
            self.content.height += 50;
        }

        //cc.log(item)
    },
    initFriendsMsg: function initFriendsMsg(data) {
        var itemMsg = data;
        // cc.log(itemMsg)
        var item = cc.instantiate(self.chatMsg);
        self.content.addChild(item);
        // cc.log( self.content)
        var comp = item.getComponent('chatMsgItem');
        comp.initChatMsgItem(self.content.height, 'friends', itemMsg);
        self.content.height += 50;
        // cc.log(item)
    },

    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLastScene();
    },

    initChatMsg: function initChatMsg(data) {
        //self.content.removeAllChildren();
        var msg = data.msg;
        var len = msg.length - 1;
        // cc.log(msg)
        var items = self.content.children;
        for (var i = 19; i >= 0; i--) {
            var item = items[i];
            var comp = item.getComponent('chatMsgItem');
            var itemMsg = msg[len];
            len--;
            comp.initChatMsgItem(i, 'friends', itemMsg);
        }
        self.title.string = '<color=#00ff00>与【' + myFriends.friendname + '】聊天</c>';
        self.content.height = msg.length * 50;
    },

    zawuItemEvent: function zawuItemEvent(data) {
        //TODO:
    },

    clearScrollview: function clearScrollview() {
        this.content.removeAllChildren();
    }

});

cc._RFpop();
},{}],"test222":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f85b1aj7/hFfIstvjZu168L', 'test222');
// js\yao\test222.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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

        cc.game.addPersistRootNode(this.node);
    }

});

cc._RFpop();
},{}],"test":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0224fkxnRtENLw8C7WDYgQg', 'test');
// js\pk\test.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
        cc.game.addPersistRootNode(this.node);
        // var animation = this.node.getComponent(cc.Animation);
        // // frames 这是一个 SpriteFrame 的数组.
        //  cc.url.raw(self.info.txUrl + 'yishinv3.jpg');
        // var spriteFrameArr=new
        // var clip = cc.AnimationClip.createWithSpriteFrames(frames, 17);
        // clip.name = "anim_run";
        // clip.wrapMode = cc.WrapMode.Loop;

    },
    endEvent: function endEvent() {
        cc.log("技能释放结束s");
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"tjp":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1884aSqb/JFjq1b3umkYQj/', 'tjp');
// js\shichang\tjp\tjp.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
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
        loadCommomScence();
    },
    dzzb: function dzzb() {
        cc.director.loadScene('dzzb');
    },
    hsbs: function hsbs() {},
    hcbs: function hcbs() {},
    hcks: function hcks() {},
    gmks: function gmks() {},
    wphs: function wphs() {}

});

cc._RFpop();
},{}],"touzhuitem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5cf89M7HsZN2bdtWZkdWj+G', 'touzhuitem');
// js\wupin\userJiNengShu\touzhuitem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    setId: function setId(msg) {
        this.id = msg;
    },
    getId: function getId() {
        return this.id;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"userJiangJunLing":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3d1fa4ScBVBMKRC1Z7jkUzi', 'userJiangJunLing');
// js\wupin\jiangJingLing\userJiangJunLing.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.RichText
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.msg.string = "";
        ajaxData(HxsgUrl.userWuPin, { "wupinId": userWuPin.wupinId, "num": 1 }, function (msg) {
            self.msg.string = msg.msg;
        });
    },
    /**
        * 点击事件-->返回
        */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    }
});

cc._RFpop();
},{}],"userList":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0bf82QqE29IcJosOkJfZocA', 'userList');
// js\wupin\userJiNengShu\userList.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Prefab
        },
        leftContent: cc.Node,
        content: cc.Node
    },
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
        curItemData = null;
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.log(userWuPin.objects);
        var obj = userWuPin.objects;
        cc.log(obj);
        var title = cc.find("Canvas/title");
        var userTitle = cc.find("Canvas/book/userTitle");
        var xiaoGuo = cc.find("Canvas/result/xiaoGuo");
        title.getComponent('cc.Label').string = obj.name;
        userTitle.getComponent('cc.Label').string = '使用' + obj.name;
        var urls;
        switch (obj.type1) {
            case '技能':
                xiaoGuo.getComponent('cc.Label').string = '效果:可使玩家或者副将学习技能【' + obj.name + '】';
                urls = HxsgUrl.queryFuJiangJiNengBook;
                break;
            case '技能书':
                xiaoGuo.getComponent('cc.Label').string = '效果:可使玩家或者副将的' + obj.name + '的熟练度增加100';
                urls = HxsgUrl.jiNengShu;
                break;
        }

        var self = this;
        ajaxData(urls, { "id": userWuPin.wupinId }, function (msg) {
            var p = msg.msg;
            if (p.length === 0 || p.length === 'undefined') {
                showAlert('没有可以使用的对象');
                return;
            }
            //alert(p);
            for (var i = 0; i < p.length; i++) {
                var item = cc.instantiate(self.target);
                self.content.addChild(item);
                item.x = 1;
                item.y = -1 * i * item.height;
                item.name = 'userList' + i;
                self.leftContent.height = (i + 1) * item.height + 20;

                var lab = item.getComponent("wuPinList");

                // lab.id.string=p[i].rfid;
                if (i % 2 !== 0) {
                    item.color = new cc.Color(0, 0, 49);
                    console.log(item.color);
                    //lab.Node.Color="WHITE";
                }
                lab.selectBn.name = 'button' + i;
                // var clickEventHandler = new cc.Component.EventHandler();
                // clickEventHandler.target = lab.selectBn.node; //这个 node 节点是你的事件处理代码组件所属的节点
                // clickEventHandler.component ='button0';
                // clickEventHandler.handler = "skillList";
                // clickEventHandler.customEventData =p[i].id;
                //wuPin.jinengList="10311"
                //lab.selectBn.id.string=p[i].rfid
                var bn = lab.selectBn;
                cc.log(p[i].rolename);
                cc.log(p[i].name);
                if (typeof p[i].rolename == 'undefined') {
                    bn.id = p[i].roleId;
                    lab.msg.string = p[i].name;
                    userWuPin.fuId = p[i].roleId;
                    lab.selectBn.node.on('click', self.showUserBook, self);
                }
                if (typeof p[i].name == 'undefined') {
                    bn.id = p[i].rfid;
                    userWuPin.fuId = p[i].rfid;
                    lab.msg.string = p[i].rolename + "(" + p[i].roleLevel + "级)";
                    lab.selectBn.node.on('click', self.skillList, self);
                }

                // lab.selectBn.setId(new cc.Label())

                //lab.selectBn.clickEvents.push(clickEventHandler);
                // console.log (bn.id)
                // console.log(p[i].id)
                //s += " <p class=\"yaoping\" style='color:#FFF3AE'>第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "&nbsp;&nbsp;" + p[i].result + "</p>";
                // var item = cc.instantiate(self.itemPrefab);
                // self.leftContent.addChild(item);
                // item.x = 0;
                // item.y = -1 * i * item.height;
                // item.name = 'history' + i;
                // self.content.height = (i + 1) * item.height;

                // item = item.getComponent('HistoryItem');
                // var labelStr = "第" + p[i].id + "期，开出" + p[i].num1 + "," + p[i].num2 + "," + p[i].num3 + "\t\t" + p[i].result;
                // item.setMsg(labelStr);
            }
        });
    },
    returnWuPin: function returnWuPin() {
        cc.log("ccccccccc");
        loadScene(HxsgScenes.wupin, HxsgScenes.index);
    },
    showUserBook: function showUserBook(event) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        userWuPin.num = 1;
        userWuPin.id = button.id;
        ajaxData(HxsgUrl.userWuPin, userWuPin, this.tishi);
    },
    tishi: function tishi(msg) {
        showAlert(msg.msg, self.returnWuPin, self.returnWuPin);
    },

    skillList: function skillList(event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点


        //this.node.Scrollview.clearScrollview();
        //   this.cannons = [];
        //     this.cannons = this.node.getChildren();
        // this.node.getChildren()[3].clearScrollview()
        // console.log( this.node.getChildren()[3]) 
        var node = event.target;
        var button = node.getComponent(cc.Button);
        console.log(button.id);
        var self = this;
        ajaxData(HxsgUrl.userJiNengShu, { "id": userWuPin.wupinId, "status": button.id }, function (msg) {
            self.content.removeAllChildren();
            var p = msg.msg;
            for (var i = 0; i < p.length; i++) {
                var item = cc.instantiate(self.target);
                self.content.addChild(item);

                item.x = 1;
                item.y = -1 * i * item.height;
                item.name = 'userList' + i;
                self.leftContent.height = (i + 1) * item.height + 20;
                var lab = item.getComponent("wuPinList");
                lab.msg.string = p[i].skillname;
                var bn = lab.selectBn;
                bn.id = p[i].id;
                //userWuPin.jnId=p[i].id;
                console.log("技能ID" + bn.id);
                if (i % 2 !== 0) {
                    item.color = new cc.Color(0, 0, 49);
                    console.log(item.color);
                    //lab.Node.Color="WHITE";
                }
                lab.selectBn.name = 'button' + i;
                lab.selectBn.node.on('click', self.imputNum, self);
            }
        });
        // console.log(bn.id)
    },

    imputNum: function imputNum(event) {
        var node = event.target;

        var button = node.getComponent(cc.Button);

        userWuPin.jnId = button.id;
        cc.log(button.id);
        cc.director.loadScene('inputNum');
    }

});

cc._RFpop();
},{}],"userXinFaShu":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd604dBRxsFIsrX4X8gX8X2S', 'userXinFaShu');
// js\wupin\userXinFaShu\userXinFaShu.js

'use strict';

cc.Class({
  extends: cc.Component,
  properties: {
    target: {
      default: null,
      type: cc.Prefab
    },
    leftContent: cc.Node,
    content: cc.Node
  },
  backEvent: function backEvent() {
    //调用通用的返回上一场景方法
    loadScene(HxsgScenes.wupin, HxsgScenes.index);
    curItemData = null;
  },
  onLoad: function onLoad() {
    var self = this;
    ajaxData(HxsgUrl.getXinFaFuJiang, userWuPin, function (msg) {
      var p = msg.msg;
      if (p == null || p == 'undefined' || p.length == 0) {
        showAlert('没有可以使用该心法书的副将');
      } else {
        for (var i = 0; i < p.length; i++) {
          var item = cc.instantiate(self.target);
          self.content.addChild(item);
          item.x = 1;
          item.y = -1 * i * item.height;
          item.name = 'userList' + i;
          self.leftContent.height = (i + 1) * item.height + 20;

          var lab = item.getComponent("wuPinList");

          lab.msg.string = p[i].fujiangname + "(" + p[i].leve + "级)";
          // lab.id.string=p[i].rfid;
          if (i % 2 !== 0) {
            item.color = new cc.Color(0, 0, 49);
            console.log(item.color);
            //lab.Node.Color="WHITE";
          }
          lab.selectBn.name = 'button' + i;
          //lab.selectBn.id.string=p[i].rfid
          var bn = lab.selectBn;
          bn.id = p[i].id;
          //userWuPin.fuId=p[i].id;
          // lab.selectBn.setId(new cc.Label())
          lab.selectBn.node.on('click', self.imputNum, self);
        }
      }
    });
  },
  skillList: function skillList(event) {
    //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点

    cc.director.loadScene('inputNum');
    //this.node.Scrollview.clearScrollview();
    //   this.cannons = [];
    //     this.cannons = this.node.getChildren();
    // this.node.getChildren()[3].clearScrollview()
    // console.log( this.node.getChildren()[3]) 
    console.log(userWuPin.fuId);
    var self = this;

    // console.log(bn.id)
  },
  imputNum: function imputNum(event) {
    var node = event.target;

    var button = node.getComponent(cc.Button);
    userWuPin.fuId = button.id;
    cc.director.loadScene('inputNum');
  }

});

cc._RFpop();
},{}],"wabaoMsgItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aff31r7cp9KWISjxklkwKnQ', 'wabaoMsgItem');
// js\wabao\wabaoMsgItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        richText: cc.RichText
    },

    init: function init(data, id) {
        var str = "<color=#08E7BA>" + getDate(data.date) + "</c><color=#ff9e00>   " + data.rolename + "</c>";
        str += "<color=#F8EEEB>挖到了</c>";
        str += "<color=#F34913>  " + data.baoname + "</color>";
        this.richText.string = str;
        this.id = id;

        if (id % 2 === 0) {
            this.node.color = new cc.Color(0, 0, 38);
        } else {
            this.node.color = new cc.Color(99, 65, 99);
        }
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"wabaolist":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'dbd28xBs3ZJ05MQu9NbIUi4', 'wabaolist');
// js\wabao\wabaolist.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        msgCount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        var prefab = this.itemPrefab;
        var node = this.node;
        var thisclass = this;
        var ajaxUrl = HxsgUrl.wabaoMsg;
        cc.log(prefab.name);
        ajaxData(ajaxUrl, null, function (msg) {
            var m = msg.msg;

            for (var i = m.length - 1; i >= 0; i--) {
                thisclass.addMsg(msg.msg[i]);
            }
        });
        SocketEvents.wabaoMsg = this.addMsg;
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        loadScene(HxsgScenes.saizi, HxsgScenes.index);
    },

    addMsg: function addMsg(msg) {
        var node = cc.find("Canvas/scrollView/view/content/list");
        try {
            var item = cc.instantiate(self.itemPrefab);
            node.addChild(item);
            item.getComponent('wabaoMsgItem').init(msg, self.msgCount);
            node.height += item.height;
            selfthis.msgCount++;
        } catch (e) {}
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"wabao":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ef666/irzZBZr6DjtVAQRJK', 'wabao');
// js\wabao\wabao.js

"use strict";

var thisclass;
cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        num: 0,
        getChance: false,
        wacount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.find("Canvas/main/topzone1/jixuwabao").active = false;
        var nodetop1 = cc.find("Canvas/main/topzone1");
        var nodetop2 = cc.find("Canvas/main/topzone2");
        nodetop1.active = false;
        nodetop2.active = false;
        var dialog = cc.find("Canvas/main/topzone2/dialog");
        dialog.active = false;
        thisclass = this;
        ajaxData(HxsgUrl.loadWaBao, null, function (data) {
            var msg = data.msg;
            thisclass.id = msg.id;
            roleMsg.id = msg.id;
            thisclass.num = msg.num;
            if (msg.num == 0 & (msg.w1 == 0 && msg.w2 == 0 && msg.w3 == 0 && msg.w4 == 0 && msg.w5 == 0 && msg.w6 == 0 && msg.w7 == 0 && msg.w8 == 0 && msg.w9 == 0)) {
                thisclass.switchScene(3, 2);
            } else {
                thisclass.switchScene(3, 1, msg);
            }
        });
    },
    /**
         * 点击事件-->返回
         */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    },
    switchScene: function switchScene(before, after, msg) {
        var beforen;
        switch (before) {
            case 1:
                beforen = cc.find("Canvas/main/topzone1");break;
            case 2:
                beforen = cc.find("Canvas/main/topzone2");break;
            case 3:
                beforen = cc.find("Canvas/main/topzone3");break;
        }
        if (typeof beforen != "undefined") beforen.active = false;
        var aftern;
        switch (after) {
            case 1:
                aftern = cc.find("Canvas/main/topzone1");
                cc.find("Canvas/main/topzone1/numlabel").getComponent("cc.Label").string = "剩余挖宝次数:" + this.num.toString();
                this.wacount = 0;
                var wabaonode = cc.find("Canvas/main/topzone1/wabao");
                for (var i = 1; i <= 9; i++) {
                    var name = "w" + i;
                    var node = cc.find(name + "/button", wabaonode);
                    cc.log('msg.name:' + msg[name]);
                    if (msg[name] == 0) {
                        this.wacount++;
                        cc.log(name + "---false");
                        cc.log(" this.wacount:" + this.wacount);
                        node.getComponent("cc.Button").interactable = false;
                        node.color = new cc.Color(0, 0, 49);
                        node.getComponent(cc.Button).enabled = true;
                        node.getChildByName("Label").getComponent("cc.Label").string = "已挖";
                    } else {
                        cc.log(name + "---true");
                        node.getComponent("cc.Button").interactable = true;
                        node.color = new cc.Color(231, 14, 101);
                        node.getComponent(cc.Button).enabled = true;
                        node.getChildByName("Label").getComponent("cc.Label").string = "挖宝";
                    }
                }
                this.keySwitch();
                break;
            case 2:
                aftern = cc.find("Canvas/main/topzone2");break;
            case 3:
                aftern = cc.find("Canvas/main/topzone3");break;
        }
        aftern.active = true;
    },

    wabao: function wabao(event) {
        var node = event.target;
        node.color = new cc.Color(0, 0, 49);
        node.getComponent(cc.Button).enabled = false;
        node.getChildByName("Label").getComponent("cc.Label").string = "已挖";
        var name = node.parent.name;
        this.wacount++;
        var jsonData = {};
        jsonData["id"] = this.id;
        jsonData[name] = '0';
        cc.log(jsonData);
        ajaxData(HxsgUrl.startWaBao, jsonData, function (data) {
            var node = cc.find("Canvas/main/topzone1/tiplabel");
            node.getComponent("cc.Label").string = data.msg;
        });
        this.keySwitch();
    },
    keySwitch: function keySwitch() {
        if (this.wacount >= 9) {
            if (this.num <= 0) this.switchScene(1, 2);else {
                cc.find("Canvas/main/downline").y -= 50;
                cc.find("Canvas/scrollView").y -= 50;
                cc.find("Canvas/main/topzone1/jixuwabao").active = true;
            }
        }
    },

    enter: function enter(event) {
        // var dialog=cc.find("Canvas/main/topzone2/dialog");
        // dialog.active=true;
        // var mymsg=dialog.getChildByName("msg").getComponent("cc.Label");
        var thisclass = this;
        // mymsg.string="连接中。。。";
        ajaxData(HxsgUrl.init, null, function (data) {
            // mymsg.string=data.msg;

            if (data.msg == 'false' || data.msg == '000003') {
                thisclass.getChance = true;
                showAlert('你没有藏宝图，无法进入');
            } else {
                showAlert('消耗藏宝图一个，点击进入宝洞', thisclass.okdialog);
            }
        });
    },

    jixuwabao: function jixuwabao(event) {
        cc.find("Canvas/main/downline").y += 50;
        cc.find("Canvas/scrollView").y += 50;
        cc.find("Canvas/main/topzone1/jixuwabao").active = false;
        ajaxData(HxsgUrl.nextWaBao, roleMsg, thisclass.sx);

        //this.switchScene(0, 1);
    },
    sx: function sx() {
        cc.log("-----继续挖宝");
        ajaxData(HxsgUrl.loadWaBao, null, function (data) {
            var msg = data.msg;
            thisclass.id = msg.id;
            roleMsg.id = msg.id;
            thisclass.num = msg.num;
            if (msg.num == 0 & (msg.w1 == 0 && msg.w2 == 0 && msg.w3 == 0 && msg.w4 == 0 && msg.w5 == 0 && msg.w6 == 0 && msg.w7 == 0 && msg.w8 == 0 && msg.w9 == 0)) {
                thisclass.switchScene(3, 2);
            } else {
                thisclass.switchScene(3, 1, msg);
            }
        });
    },
    okdialog: function okdialog(event) {

        loadingScene(HxsgScenes.wabao, HxsgScenes.index);
    },

    test: function test(event) {
        this.switchScene(1, 2);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"wait":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7ceedFz5kpCR4JUqYhhDWDM', 'wait');
// js\pk\wait.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        wait: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        var action = cc.repeatForever(cc.rotateBy(3.0, 360));
        this.wait.node.runAction(action);
    }

});

cc._RFpop();
},{}],"wanjian":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e2271aK0SBBa44nRPvhcslN', 'wanjian');
// js\jineng\wanjian.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {},
    endEvent: function endEvent(event) {
        cc.log("动画播放完毕");
        var node = event.targer;
        node.active = false;

        var background = cc.find('Canvas/background');
        var seq = cc.sequence(cc.moveTo(1, cc.p(0, 137)).easing(cc.easeCubicActionOut(1)));
        background.color = new cc.Color(245, 245, 245);
        background.runAction(seq);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"wuPinList":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ed8525sD55GY5OpvOZp6lW0', 'wuPinList');
// js\wupin\userJiNengShu\wuPinList.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label,
        id: cc.Label,
        selectBn: cc.Button
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
    onLoad: function onLoad() {},
    setMsg: function setMsg(dataMsg) {
        this.msg = dataMsg;
    }

});

cc._RFpop();
},{}],"wupin":[function(require,module,exports){
"use strict";
cc._RFpush(module, '825d6J4LcJPnaSAzr33fVvC', 'wupin');
// js\pk\wupin.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {},
    backEvent: function backEvent() {
        cc.find("Canvas/zhiling").active = true;
        cc.log("物品");
        cc.find("Canvas/wupin").active = false;
        pk.pkyaostatus = "0";
    }

});

cc._RFpop();
},{}],"xunLian":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5745a5GCNdIDp8RmLj5MwWI', 'xunLian');
// js\xunlian\xunLian.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        num: cc.EditBox,
        msg: cc.RichText
    },
    setMsg: function setMsg(msg) {
        this.msg.string = msg;
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        //this.menuButton(this,0);
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        returnLast();
    },
    buttonEvent: function buttonEvent() {
        var num = this.num.string;
        ajaxData(HxsgUrl.startTraining, { 'num': num }, this.alertSucces);
    },
    alertSucces: function alertSucces(msg) {
        showAlert(msg.msg);
    },

    menuButton: function menuButton(event, dataNum) {
        var content = cc.find("Canvas/scrollView/view/content");
        content.removeAllChildren();
        var buttonList = cc.find("Canvas/buttonList");
        var list = buttonList.children;
        for (var i = 0; i < list.length; i++) {
            if (i == dataNum) {
                list[i].color = new cc.Color(63, 23, 66);
            } else {
                list[i].color = new cc.Color(224, 27, 193);
            }
        }
        switch (dataNum) {
            case '0':
                cc.loader.loadRes('prefabs/xunLian', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var jsxl = cc.instantiate(prefab);
                        var jsxlJs = jsxl.getComponent('xunLian');
                        jsxlJs.jieshouEvent();
                        content.addChild(jsxl);
                    }
                });
                break;
            case '1':
                ajaxData(HxsgUrl.training, { 'status': '0' }, this.zhengZaiEvent);
                break;
            case '2':
                ajaxData(HxsgUrl.training, { 'status': '1' }, this.wanChengEvent);
                break;
            case '3':
                cc.loader.loadRes('prefabs/IndexGongNengXunLian/shuoMing', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var jsxl = cc.instantiate(prefab);
                        content.addChild(jsxl);
                    }
                });
                cc.log('说明');
                break;
            case '4':
                ajaxData(HxsgUrl.queryJingYan, null, self.lingQuJingYan);
                cc.log('领取经验');
                break;

        }
    },
    jieshouEvent: function jieshouEvent() {
        var jin = 60;
        var jy = 100;
        cc.log(roleMsg.roleId);
        if (roleMsg.roleId >= 120) {
            jin = 140;
            jy = 450;
        } else if (roleMsg.roleId >= 100) {
            jin = 120;
            jy = 300;
        } else if (roleMsg.roleId >= 71) {
            jin = 100;
            jy = 200;
        } else if (roleMsg.roleId >= 40) {
            jin = 80;
            jy = 150;
        } else if (roleMsg.roleId >= 1) {
            jin = 60;
            jy = 100;
        }
        var msg = '训练说明:玩家可将角色委托给教军场训练（每日可训练一次，最长10小时,每训练1小时需要消耗20点体力值' + '您当前' + roleMsg.roleId + '级，训练费用每小时' + jin + '金砖，每小时训练可以获得当前' + jy + '次战斗经验值，每次军训1小时可增加额外的1%的经验值';
        this.setMsg(msg);
    },
    zhengZaiEvent: function zhengZaiEvent(msg) {
        cc.loader.loadRes('prefabs/xunlianDetail', cc.Prefab, function (err, prefab) {
            var content = cc.find("Canvas/scrollView/view/content");
            content.removeAllChildren();
            if (!err) {
                for (var key in msg.msg) {
                    var zaxl = cc.instantiate(prefab);
                    if (key % 2 == 0) {
                        zaxl.color = new cc.Color(207, 105, 221);
                    } else {
                        zaxl.color = new cc.Color(0, 0, 49);
                    }

                    zaxl.getChildByName("msg").getComponent("cc.RichText").string = '<color=#F8DD50 click="this.clickEvent">' + msg.msg[key].rolename + '</c>';
                    content.addChild(zaxl);
                }
            }
        });
    },
    wanChengEvent: function wanChengEvent(msg) {
        cc.loader.loadRes('prefabs/xunlianDetail', cc.Prefab, function (err, prefab) {
            var content = cc.find("Canvas/scrollView/view/content");
            content.removeAllChildren();
            if (!err) {
                for (var key in msg.msg) {
                    var zaxl = cc.instantiate(prefab);
                    if (key % 2 == 0) {
                        zaxl.color = new cc.Color(207, 105, 221);
                    } else {
                        zaxl.color = new cc.Color(0, 0, 49);
                    }
                    zaxl.getChildByName("msg").getComponent("cc.RichText").string = '<color=#F8DD50 click="this.clickEvent">' + msg.msg[key].rolename + '</c><color=#FCFCFC>完成训练，获得经验' + msg.msg[key].jingyan + '</c>';
                    content.addChild(zaxl);
                }
            }
        });
    },
    lingQuJingYan: function lingQuJingYan(msg) {

        cc.loader.loadRes('prefabs/IndexGongNengXunLian/lingQuJingYan', cc.Prefab, function (err, prefab) {
            var content = cc.find("Canvas/scrollView/view/content");
            content.removeAllChildren();

            if (!err) {
                var p = msg.msg;
                //if (p = !'' && typeof (p) != 'undefined' && p != null) {

                var pTime = p.status;
                cc.log("-------------" + _typeof(p.date));
                var zaxl = cc.instantiate(prefab);
                content.addChild(zaxl);
                var nowTime = new Date().getTime();
                var time = pTime - nowTime;
                cc.log("-------------" + time);
                if (time < 0) {
                    zaxl.getChildByName("time").getComponent("cc.RichText").string = "";
                } else {
                    //计时器
                    self.schedule(function () {
                        // 这里的 this 指向 component
                        time = time - 1000;
                        self.time(time, zaxl.getChildByName("time").getComponent("cc.RichText"));
                    }, 1);
                }
                var jy = p.jingyan;

                zaxl.getChildByName("jingyan").getComponent("cc.Label").string = '本次可领取经验:' + jy;

                // }

            }
        });
    },
    clickEvent: function clickEvent() {
        loadingScene(HxsgScenes.friendInfo);
    },
    time: function time(_time, p) {
        cc.log(_time);
        _time = _time - 1000;

        if (_time >= 0) {
            var t = getTime(_time);
            p.string = "领取倒计时 " + t;
            cc.log(t);
            //  cc.find("Canvas/scrollView/view/content/lingQuJingYan").getChildByName("jingyan").getComponent("cc.RichText").string ="领取倒计时"+t;
        } else {
            this.unschedule(this.time);
            p.string = '';
            //cc.find("Canvas/scrollView/view/content/lingQuJingYan").getChildByName("jingyan").getComponent("cc.RichText").string ="";
        }
    },
    getJingYanButton: function getJingYanButton() {
        ajaxData(HxsgUrl.getJingYan, null, self.getJingYanButtonSucces);
    },
    getJingYanButtonSucces: function getJingYanButtonSucces(msg) {
        showAlert(msg.msg);
    }

});

cc._RFpop();
},{}],"yao":[function(require,module,exports){
"use strict";
cc._RFpush(module, '81d33tgnb5EgqvGVOAla1Ns', 'yao');
// js\pk\yao.js

"use strict";

var self = void 0;
cc.Class({
    extends: cc.Component,

    properties: {
        num: cc.Label,
        img: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    setNum: function setNum(num) {
        this.num.string = num;
    },
    setImg: function setImg(url) {}

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"yiguan":[function(require,module,exports){
"use strict";
cc._RFpush(module, '834a6k7SjNCqIRtuAN8fFFd', 'yiguan');
// js\yao\yiguan.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        yaoname: cc.Label,
        level: cc.Label,
        ms: cc.Label,
        price: cc.Label,
        num: cc.EditBox
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        loadCommomScence();
    },
    yaoClick: function yaoClick(event, num) {
        ajaxData(HxsgUrl.queryYaoPinDetail, {
            'id': num
        }, function (data) {
            if (data.code = "000") {
                var re = data.data;
                self.yaoname.string = re.yaoname;
                self.level.string = re.yaoid;
                self.ms.string = re.ms;
                self.price.string = re.yaoprice;
            } else {
                showAlert("服务器出错！");
            }
        });
    },
    goumai: function goumai() {
        cc.log("购买药品：" + self.level.string);
        cc.log("购买药品：" + self.num.string);
        if (self.num.string == "") {
            showAlert("请输入购买数量");
        } else {
            cc.log("提交购买药品");
            ajaxData(HxsgUrl.buyYao, { 'id': self.level.string, 'num': self.num.string }, function (data) {
                if (data.code == "000") {
                    showAlert(data.data.message);
                } else {
                    showAlert("服务器错误");
                }
            });
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"ylc":[function(require,module,exports){
"use strict";
cc._RFpush(module, '21f4a+gffhAs4FlX+fIDkm1', 'ylc');
// js\gc\ylc.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
        // showSystemMsgAlert(1,'11111');
        //  showSystemMsgAlert(2,'22222');
        //   showSystemMsgAlert(3,'33333');

    },
    ylc: function ylc() {
        loadingScene(HxsgScenes.saizi, HxsgScenes.index);
    },
    /**
     * 点击事件-->返回
     */
    backEvent: function backEvent() {
        //调用通用的返回上一场景方法
        returnLast();
    }
});

cc._RFpop();
},{}],"zbBaoshiDetail":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd4d08tBpoZCx7iIm0/m30b0', 'zbBaoshiDetail');
// js\wupin\zhuangbei\zbBaoshiDetail.js

'use strict';

var self;
var bsid;
var zbid;
cc.Class({
    extends: cc.Component,

    properties: {
        bsname: cc.Label,
        level: cc.Label,
        xiaoguo: cc.Label,
        jieshao: cc.RichText,
        img: cc.Sprite
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
    },
    click: function click() {
        self.node.destroy();
    },
    init: function init(data) {
        self.bsname.string = data.zwName;
        self.level.string = data.zwLevel;
        self.xiaoguo.string = data.zwXiaoGuo;
        self.jieshao.string = data.zwMiaoShu;
        bsid = data.id;
    },
    xqClick: function xqClick() {

        var param = { 'bsId': bsid, 'zbId': zhaungBeiDetailsZbid.id };
        ajaxData(HxsgUrl.mosaicGemtoZhuangBei, param, function (data) {
            cc.log(data);
            if (data.code = "000") {
                showAlert(data.data, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                }, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                });
            } else {
                showAlert("服务器崩溃了:" + data.message, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                }, function () {
                    cc.director.loadScene(HxsgScenes.zhuangbei);
                });
            }
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"zbIcon":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bcd67hMCMtHW6r61T207cVF', 'zbIcon');
// js\wupin\zhuangbei\zbIcon.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"zhaojiang":[function(require,module,exports){
"use strict";
cc._RFpush(module, '361b7U68b1Bj6qBO6qvSyG2', 'zhaojiang');
// js\pk\zhaojiang.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
    onLoad: function onLoad() {},
    backEvent: function backEvent() {
        cc.find("Canvas/zhiling").active = true;
        cc.log("物品");
        cc.find("Canvas/zhaojiang").active = false;
    }

});

cc._RFpop();
},{}],"zhaungBeiDetail":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bc521Li9hpM7Ym0uuy+/mdn', 'zhaungBeiDetail');
// js\wupin\zhuangbei\zhaungBeiDetail.js

'use strict';

var self;

cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        nameLabel: cc.Label,
        LvLabel: cc.Label,
        effectLabel: cc.RichText,
        presentLabel: cc.RichText,
        holeLabel: cc.Sprite

    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;

        var data = { 'id': zhaungBeiDetailsZbid.id };

        ajaxData(HxsgUrl.zbDetailUrl, data, self.initZhuangbei);
        loadCommomScence();
    },

    initZhuangbei: function initZhuangbei(res) {
        var _this = this;

        if (cc.find('Canvas/zbBaoshi2') != null) {
            cc.find('Canvas/zbBaoshi2').destroy();
        }
        if (cc.find('Canvas/bs') != null) {
            cc.find('Canvas/bs').destroy();
        }
        var msg = res.msg;
        cc.log(self.titleLabel);
        self.titleLabel.string = msg.zbName;
        self.nameLabel.string = msg.zbName;
        // self.LvLabel.string = msg.
        self.effectLabel.string = msg.zbXiaoGuo;
        self.presentLabel.string = msg.zbMiaoShu + "<color=#ff0000>" + msg.zbTiaoJian + "</color>";
        self.LvLabel.string = msg.level;

        var icon = cc.find('Canvas/sprite/icon');
        var sprite2 = icon.getComponent('cc.Sprite');
        //网络加载图片
        cc.loader.load(imgUrl + msg.imgUrl, function (error, texture) {
            sprite2.spriteFrame = new cc.SpriteFrame(texture);
        });
        //孔傮
        var bsArr = msg.baoshiId;

        var _loop = function _loop(i) {
            if (null == bsArr[i]) {
                cc.loader.loadRes('prefabs/kong2', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        cc.log(bsArr[i]);
                        var kong = cc.instantiate(prefab);
                        self.holeLabel.node.addChild(kong);

                        kong.on('click', function (event) {
                            if (cc.find('Canvas/bs') != null) {
                                cc.find('Canvas/bs').destroy();
                            }
                            cc.log("空槽");
                            cc.loader.loadRes('prefabs/bs', cc.Prefab, function (err, prefab) {
                                if (!err) {
                                    var bs = cc.instantiate(prefab);
                                    cc.find('Canvas').addChild(bs, 70);
                                }
                            });
                        }.bind(this));
                    }
                });
            } else {
                cc.loader.loadRes('prefabs/kong', cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var kong = cc.instantiate(prefab);
                        kong.on('click', function (event) {
                            var node = event.target;
                            var button = node.getComponent(cc.Button);
                            if (cc.find('Canvas/zbBaoshi') != null) {
                                cc.find('Canvas/zbBaoshi').destroy();
                            }
                            cc.loader.loadRes('prefabs/zbBaoshi', cc.Prefab, function (err, prefab) {
                                if (!err) {
                                    var zbBaoshi = cc.instantiate(prefab);
                                    cc.find('Canvas').addChild(zbBaoshi, 90);
                                    zbBaoshi.setPositionX(30);
                                    zbBaoshi.setPositionY(-10);
                                    //加載zbBaoshi腳本,初始化界面
                                    ajaxData(HxsgUrl.baoshiItemUrl, { 'id': bsArr[i] }, function (data) {
                                        cc.log(data);
                                        var zbBaoshiJs = zbBaoshi.getComponent('zbBaoshiDetail');
                                        zbBaoshiJs.init(data.msg);
                                    });
                                }
                            });
                        }.bind(this));
                        self.holeLabel.node.addChild(kong);
                    }
                }.bind(_this));
            }
        };

        for (var i = 0; i < bsArr.length; i++) {
            _loop(i);
        }
        cc.loader.loadRes(msg.imgUrl, cc.SpriteFrame, function (err, tex) {
            if (!err) {
                self.sprite.spriteFrame = tex;
            }
        });
    },

    userBtnEvent: function userBtnEvent() {

        ajaxData(HxsgUrl.zbWuQi, { 'id': zhaungBeiDetailsZbid.id, 'type': 'role' }, function (data) {
            cc.log(data);
            if (data.code == "000") {
                showAlert(data.data);
            } else {
                showAlert("系统错误");
            }
        });
    },

    dropBtnEvent: function dropBtnEvent() {

        ajaxData(HxsgUrl.xiezai, { 'id': zhaungBeiDetailsZbid.id, 'type': 'role' }, function (data) {
            cc.log(data);
            if (data.code == "000") {
                showAlert(data.data);
            } else {
                showAlert("系统错误");
            }
        });
    },

    backEvent: function backEvent() {
        loadScene(HxsgScenes.wupin, HxsgScenes.zhuangbei);
    }

});

cc._RFpop();
},{}],"zhaungbei":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0bfb6az2mFKpbCt8Q6ltqBE', 'zhaungbei');
// js\shichang\tjp\zhaungbei.js

'use strict';

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        yaoname: cc.Label,
        level: cc.Label,
        ms: cc.RichText,
        price: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        loadCommomScence();
        self = this;
        self.init({ 'type': '武' });
    },
    selectType: function selectType(event, num) {
        var param = "";
        switch (num) {
            case "1":
                {
                    param = { 'type': '武' };
                    break;
                }
            case "2":
                {
                    param = { 'type': '盔' };
                    break;
                }
            case "3":
                {
                    param = { 'type': '甲' };
                    break;
                }
            case "4":
                {
                    param = { 'type': '腕' };
                    break;
                }
            case "5":
                {
                    param = { 'type': '链' };
                    break;
                }
            case "6":
                {
                    param = { 'type': '靴' };
                    break;
                }
        }
        self.init(param);
    },
    init: function init(dataJson) {
        self.node.removeAllChildren();

        ajaxUtils(HxsgUrl.queryZhuangBei, dataJson, function (data) {
            cc.loader.loadRes('prefabs/zbShopIcon', cc.Prefab, function (err, prefab) {
                if (!err) {
                    var _loop = function _loop(i) {
                        var zbShopIcon = cc.instantiate(prefab);
                        var yao = zbShopIcon.getChildByName("yao");
                        var xz = zbShopIcon.getChildByName("xz");
                        yao.on("click", function () {
                            //加载选中特效.关闭其他动画，加载当前动画
                            var child = self.node.children;
                            for (var _i = 0; _i < child.length; _i++) {
                                var xzChild = child[_i].getChildByName("xz");
                                xzChild.getComponent(cc.Animation).stop();
                                xzChild.opacity = 0;
                            }
                            xz.opacity = 255;
                            xz.getComponent(cc.Animation).play();
                            self.zbDetail(data[i]);
                        }, self);
                        //网络加载图片
                        cc.loader.load(imgUrl + data[i].imgUrl, function (error, texture) {
                            cc.log(imgUrl + data[i].imgUrl);
                            yao.getComponent('cc.Sprite').spriteFrame = new cc.SpriteFrame(texture);
                        });
                        self.node.addChild(zbShopIcon);
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop(i);
                    }
                }
            });
        });
    },
    zbDetail: function zbDetail(data) {

        //武器点击时，将该变量保存提供给购买按钮
        wuqiShop.shop = data;
        cc.log(data);
        self.yaoname.string = data.wuQiName;
        self.level.string = data.level;
        self.ms.string = data.miaoShu + "<color=#AE0BEE>" + data.kangXing + "+" + data.xiaoGuo + "</color>";
        self.price.string = data.price + "银";
    },
    buy: function buy() {
        showAlert("您确定花费" + wuqiShop.shop.price + "银两，购买" + wuqiShop.shop.wuQiName + "吗？", function () {
            ajaxUtils(HxsgUrl.buyZhuangBei, { id: wuqiShop.shop.id }, function (data) {
                showAlert(data);
            });
        });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"zhp":[function(require,module,exports){
"use strict";
cc._RFpush(module, '12959iYDoJHpq25gxMNODgT', 'zhp');
// js\shichang\zhp\zhp.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
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
        loadCommomScence();
    }

});

cc._RFpop();
},{}]},{},["Bank","BankOrders","BuyGold","GetGold","GetSilver","RechargeGold","RechargeReward","SaveGold","SaveSilver","SellGold","Alert","Speak","Strake","TopManager","back","loading","systemMsg","chatMsgItem","friendInfo","friendsItem","friendsList","friendsListItem","friendsManager","siliao","talking","chuZhiPy","bangItem","chiBi","chiBiYaZhu","commonItem","commonlist","gameMenu","jiesuan","saiziButton","HistoryItem","HistoryManager","bang","ylc","GGDetails","GGItem","GGList","FujiangConfig","FujiangItem","FujiangXiangqing","PorpertyManager","PropertyChecker","PropertyPoints","HotkeyBoard","ChatButtonEvent","ChatLabelEvent","ChatManager","IndexManager","GongnengPanel","IndexMenu","SheshiPanel","IndexFujiangButton","PlayerStatus","RoleDetailsManager","Emoji","move","rolePrefabs","headItem","nearbyPlayer","parent","wanjian","loadSelectRole","login","loginCreateRole","loginRegister","selectedRole","buff","buffDetail","end","jnName","pkJnContent","pkOnload","pkWait","pkWuPin","playerItem","role","roledetail","test","wait","wupin","yao","zhaojiang","shiChangIndex","dzzb","tjp","zhaungbei","zhp","system","systemNotice","TimelineLite","TweenLite","return","wabao","wabaoMsgItem","wabaolist","PkScoket","WupinItem","WupinManager","BaoshiDetial","userJiangJunLing","alert","inputNum","jiNengList","touzhuitem","userList","wuPinList","userXinFaShu","baoshiDetail2","kong","myZhuangBei","zbBaoshiDetail","zbIcon","zhaungBeiDetail","xunLian","test222","yiguan"])
