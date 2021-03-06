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