cc.Class({
    extends: cc.Component,

    properties: {
        data: {
            default: null,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.richText = this.node.getComponent(cc.RichText);
    },

    /**
     * 聊天窗点击姓名的点击事件
     */
    clickNameEvent: function(){
        cc.log('click id = ' + this.data);
        roleMsg.id=this.data.roleid;
   loadingScene(HxsgScenes.friendInfo, HxsgScenes.index)



        //TODO:点击事件
    },

    setMsg: function(data){
        this.data = data;
        var time = this.dateToTime(data.data);
        this.node.getComponent(cc.RichText).string = this.buildRichText(time, data.rolename, data.message);
    },

    /**
     * 构造image的富文本字符串
     */
    richTextImage: function(img){
        return '<img src=\"'+img+'\"/>';
    },

    /**
     * 构造富文本内容
     */
    buildRichText: function(time, name, msg){
        var richText = time + ' <color=#FFFF00 click="clickNameEvent">' + name + '</c>:' + msg;
        // cc.log(name + 'richText = ' + richText);
        return richText;
    },

    /**
     * 日期格式转换-->小时：分钟
     */
    dateToTime: function(date){
        //p[i].data
        var d= new Date(date);
        var hh=d.getHours();
        var mm= d.getMinutes();
        if(mm<10){
            mm="0"+mm;
        }
        if(hh<10){
            hh="0"+hh;
        }
        var times=hh+":"+mm;
        return times;
    }
});
