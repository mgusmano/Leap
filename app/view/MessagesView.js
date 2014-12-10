Ext.define('Leap.view.MessagesView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.messagesview',

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });
        var data = { };
        LDRY.ajax.call('GetMessages', data, function (resp, status, xhr) {
            resp = $.parseJSON(resp.GetMessagesResponse.GetMessagesResult);
            var m = resp.message;
            $L.messages = [];
            if (resp && resp.success == 1) {
                var readMsgs = [];
                if (window['localStorage']) {
                    if (localStorage.getItem($L.key) != null) {
                        readMsgs = JSON.parse(localStorage.getItem($L.key));
                    }
                }
                var msgIcon = '';
                for (var i = 0; i < m.length; i++) {
                    if (readMsgs.indexOf(m[i].MsgID) > -1) {
                        msgIcon = $L.iRead;
                    }
                    else {
                        msgIcon = $L.iUnread;
                    }
                    var message = {};
                    message.messageId = m[i].MsgID;
                    message.messageIcon = msgIcon;
                    message.messageSubject = m[i].MsgSubject;
                    message.messageContent = m[i].MsgContent;
                    $L.messages.push(message);
                }
                me.down('list').setStore(Ext.create('Ext.data.Store', {
                    fields: ['messageId', 'messageIcon', 'messageSubject', 'messageContent'],
                    data: $L.messages
                }));
                me.setMasked(false);
            }
        });
    },

    onItemTap: function (dataview, index, target, record) {
        var me = this.up('container');
        me.down('#theMessage').setHtml(record.get('messageContent'));
        var readMsgs = [];
        if (window['localStorage']) {
            if (localStorage.getItem($L.key) != null) {
                readMsgs = JSON.parse(localStorage.getItem($L.key));
            }
            if (readMsgs.indexOf(record.get('messageId')) == -1) {
                readMsgs.push(record.get('messageId'));
                localStorage.setItem($L.key, JSON.stringify(readMsgs));
                record.set('messageIcon', $L.iRead);
            }
        }
    },

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Messages');
        this.add([
            {
                id: 'messagesList',
                xtype: 'list',
                height: '60%',
                itemHeight: 40,
                emptyText: 'Loading list of Messages...',
                itemTpl: [
                    '<table width="100%" data-id="{messageId}" >',
                    '<tr>',
                    '<td width="50px">',
                    '<a href="#" class="ui-link-inherit"><img src="{messageIcon}" alt="" class="ui-li-icon ui-li-thumb" style="height:50%;">',
                    '</td>',
                    '<td>',
                    '<p class="xmsg_head xui-li-desc">{messageSubject}</p>',
                    '<p class="xmsg_body xui-li-desc">{messageContent}</p>',
                    '</td>',
                    '</tr>',
                    '</table>'
                ],
                listeners: {
                    itemtap: this.onItemTap
                }
            },
            {
                xtype: 'container', style: 'background-color: #1e4161;', height: '1px'
            },
            {
                xtype: 'container', itemId: 'theMessage', scrollable: true, padding: 20, style: 'background-color: white;', height: '40%',
                html: 'Please tap on a Message to see the full text of the message.'
            }
        ]);
    }
});