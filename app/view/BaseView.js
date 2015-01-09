Ext.define('Leap.view.BaseView', {
    extend: 'Ext.Container',
    alias: 'widget.baseview',

    initialize: function () {
        var me = this;
        this.on('activate', function () {
            if (this.activate != undefined) {
                this.activate();
            }
        });
        //this.element.on('swipe', function (event, node, options, eOpts) {
        //    if (event.direction === 'right') {
        //        me.onBackButtonTap();
        //    }
        //});
        this.callParent(arguments);
    },

    setTitle: function (title) {
        this.down('#theLabel').setHtml(title);
    },

    onBackButtonTap: function () {
        var view = '';
        if (this.getBackView() === null) {
            view = 'mainmenuview';
        }
        else {
            view = this.getBackView();
        }
        if (this.xtype === 'mainmenuview' || this.xtype === 'welcomeview') {
            this.fireEvent('signOffCommand', this);
        }
        else {
            this.fireEvent('backCommand', view);
        }
    },
    onForwardButtonTap: function () {
        this.fireEvent('forwardCommand');
    },

    config: {
        backView: null,
        layout: {
            type: 'vbox'
        },
        cls: 'panelBackground',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                height: 66,
                itemId: 'theHeader',
                //cls: 'ui-home-headerbg',
                style: {
                    borderTop: '1px solid #fff',
                    borderBottom: '1px solid #999',
                    background: '-webkit-linear-gradient(#f4f5f7, #a6aab7)',
                    background: 'linear-gradient(#f4f5f7, #a6aab7)'
                },
                title: '<div><img src="resources/images/logos/laundry_confheader_logo.png" style="height:60px;text-align:center;padding: 3px 0 3px 0" /></div>',
                items: [
                    {
                        height: 45,
                        iconCls: 'arrow_left',
                        ui: 'plain',
                        style: 'color:black;',
                        itemId: 'backButton'
                        //listeners: {
                        //    tap: this.onBackButtonTap2,
                        //}
                    }
                    //{
                    //    xtype: 'spacer'
                    //},
                    //{
                    //    height: 45,
                    //    iconCls: 'arrow_right',
                    //    ui: 'plain',
                    //    style: 'color:black;',
                    //    itemId: 'forwardButton'
                    //}
                ]
            },
            {
                xtype: 'label',
                itemId: 'theLabel',
                docked: 'top',
                style: 'padding: 10px;background-color: #1e4161;color: #fff;text-align: center;font-family: Helvetica, Arial, sans-serif;font-size: 24px;font-weight: normal;height:48px;',
                html: ''
            },
            {
                xtype: 'container',
                itemId: 'theFooter',
                docked: 'bottom',
                height: 70,
                items: [
                    {
                        xtype: 'image',
                        src: 'resources/images/background/icon_strip.png',
                        style: 'width:100%;height:70px;xposition:absolute;xbottom:0;xmargin-bottom:20px'
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            },
            {
                delegate: '#forwardButton',
                event: 'tap',
                fn: 'onForwardButtonTap'
            }
        ]
    }
});