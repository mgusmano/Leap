﻿Ext.define('Leap.view.DiamondSponsorsView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.diamondsponsorsview',

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });
        me.down('dataview').setStore(Ext.create('Ext.data.Store', {
            fields: ['logoText', 'sponsorType', 'sponsorCode', 'logoName', 'sponsorName'],
            data: $L.diamond
        }));
        me.setMasked(false);
    },

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('2015 Diamond Sponsors');
        this.setBackView('sponsorsview');
        this.add([
            {
                xtype: 'toolbar',
                docked: 'top',
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Search sponsors...',
                        listeners: {
                            scope: this,
                            clearicontap: $L.onSearchClearIconTap,
                            keyup: $L.onSearchKeyUp
                        }
                    }
                ]
            },
            {
                xtype: 'dataview',
                height: '100%',
                scrollable: true,
                inline: true,
                cls: 'dataview-inline',
                itemTpl: '<img style="height:80px;margin:10px 10px 10px 10px;" src="{logoName}"></div>'
            }
        ]);
    }
});