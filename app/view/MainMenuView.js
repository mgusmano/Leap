Ext.define('Leap.view.MainMenuView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.mainmenuview',
    id: 'mainmenuview',

    activate: function () {
        var me = this;
        me.setMasked({xtype: 'loadmask',message: ''});
        this.setTitle('Welcome ' + $L.attendeeFirstName);

        if ($L.attendeeType != 'C') {
            this.down('#corporateviewContainer').setHidden(true);
            this.down('#agendaviewContainer').setMargin('5 20 0 30');
            this.down('#messagesviewContainer').setMargin('5 0 0 20');
        }

        var msgData = {};
        LDRY.ajax.call('GetMessages', msgData, function (resp, status, xhr) {
            var resp = $.parseJSON(resp.GetMessagesResponse.GetMessagesResult);
            var m = resp.message;
            var unreadCount = m.length;
            var readMsgs = null;
            if (window['localStorage']) {
                if (localStorage.getItem($L.key) != null) {
                    readMsgs = JSON.parse(localStorage.getItem($L.key));
                }
            }
            if (readMsgs != null) {
                for (i = 0; i < m.length; i++) {
                    if (readMsgs.indexOf(m[i].MsgID) > -1) {
                        unreadCount--;
                    }
                }
            }
            if (unreadCount > 0) {
                me.down('#messagesview').setBadgeText(unreadCount);
            }
            else {
                me.down('#messagesview').setBadgeText('');
            }
            me.setMasked(false);
        });
    },

    config: {
        layout: {
            type: 'vbox',
            align: 'center'
        }
    },

    constructor: function (config) {
        var me = this;
        this.callParent(arguments);
        this.add([
            {
                xtype: 'container', layout: { type: 'hbox' }, padding: 10, height: 50, width: '100%', style: 'color: black;background-color:white;text-align:center;', html: 'weather here....'
            },
            { 
                xtype: 'container', layout: {type: 'hbox'}, margin: '10 0 0 0',
                items: [
                    { xtype: 'mainmenubutton', title: 'Agenda', view: 'agendaview', image: 'icon_agenda.png' },
                    { xtype: 'mainmenubutton', title: 'Messages', view: 'messagesview', image: 'icon_messages.png' },
                    { xtype: 'mainmenubutton', title: 'Corporate', view: 'corporateview', image: 'icon_corporate.png' }
                ]
            },
            {
                xtype: 'container', layout: { type: 'hbox' },
                items: [
                    { xtype: 'mainmenubutton', title: 'Maps', view: 'mapsview', image: 'icon_maps.png' },
                    { xtype: 'mainmenubutton', title: 'Local Guide', view: 'localguideview', image: 'icon_guide.png' },
                    { xtype: 'mainmenubutton', title: 'Offers', view: 'offersview', image: 'icon_offers.png' }
                ]
            },
            {
                xtype: 'container', layout: { type: 'hbox' },
                items: [
                    { xtype: 'mainmenubutton', title: 'Sponsors', view: 'sponsorsview', image: 'icon_sponsors.png' },
                    { xtype: 'mainmenubutton', title: 'Photos', view: 'photosview', image: 'icon_photos.png' },
                    { xtype: 'mainmenubutton', title: 'Surveys', view: 'surveysview', image: 'icon_surveys.png' }
                ]
            }
        ]);
    }
});


//{
//    listeners: {
//        refresh: function() {
//            //Ext.getCmp('mainmenuview').down('#messagesview').setBadgeText(badge);
//        }
//    },
//    xtype: 'dataview',
//    inline: true,
//    style: 'text-align:center;',
//    defaultType: 'menudataitem',
//    useComponents: true,
//    height: '100%',
//    store: Ext.create('Ext.data.Store', {
//        fields: ['display', 'id', 'view', 'image', 'text'],
//        data: mainMenuData
//    })
//}

//var mainMenuData = [
//    {
//        id: 'BTN_AGENDA',
//        view: 'agendaview',
//        image: 'icon_agenda.png',
//        text: 'Agenda',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_MESSAGES',
//        view: 'messagesview',
//        image: 'icon_messages.png',
//        text: 'Messages',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_CORPORATE',
//        view: 'corporateview',
//        image: 'icon_corporate.png',
//        text: 'Corporate',
//        display: 'none'
//    },
//    {
//        id: 'BTN_MAPS',
//        view: 'mapsview',
//        image: 'icon_maps.png',
//        text: 'Maps',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_GUIDE',
//        view: 'localguideview',
//        image: 'icon_guide.png',
//        text: 'Local Guide',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_OFFERS',
//        view: 'offersview',
//        image: 'icon_offers.png',
//        text: 'Offers',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_SPONSORS',
//        view: 'sponsorsview',
//        image: 'icon_sponsors.png',
//        text: 'Sponsors',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_PHOTOS',
//        view: 'photosview',
//        image: 'icon_photos.png',
//        text: 'Photos',
//        display: 'inline-block'
//    },
//    {
//        id: 'BTN_SURVEYS',
//        view: 'surveysview',
//        image: 'icon_surveys.png',
//        text: 'Surveys',
//        display: 'inline-block'
//    }
//];