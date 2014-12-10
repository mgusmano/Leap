Ext.define('Leap.view.BronzeSponsorsView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.bronzesponsorsview',

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });
        var task = Ext.create('Ext.util.DelayedTask', function () {
            me.down('dataview').setStore(Ext.create('Ext.data.Store', {
                fields: ['logoText', 'sponsorType', 'sponsorCode', 'logoName', 'sponsorName'],
                data: $L.bronze
            }));
            me.setMasked(false);
        });
        task.delay(500);
    },

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('2015 Bronze Sponsors');
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