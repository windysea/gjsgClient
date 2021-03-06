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