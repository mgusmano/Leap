Ext.define('Leap.view.OffersView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.offersview',

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('LEAP Offers');
        this.setBackView('mainmenuview');

        this.add([
            {
                xtype: 'tabpanel',
                fullscreen: false,
                height: '100%',
                //ui: 'plain',
                tabBar: {
                    //ui: 'light',
                    //height: 50,
                    //style: 'border:0;padding: 0px;background-color: #1e4161;color: #fff;text-align: center;font-family: Helvetica, Arial, sans-serif;font-size: 22px;font-weight: normal;height:48px;',
                    layout: {
                        pack: Ext.filterPlatform('ie10') ? 'start' : 'center'
                    }
                },
                activeTab: 1,
                defaults: {
                    scrollable: true,
                    style: 'background-color: white;'
                },
                animation: 'slide',
                items: [
                    {
                        title: 'Shop',
                        contentEl: 'TAB1'
                    },
                    {
                        title: 'Spa',
                        contentEl: 'TAB2'
                    },
                    {
                        title: 'Play',
                        contentEl: 'TAB3'
                    }
                ]
            }
        ]);
    }
});