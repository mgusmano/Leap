Ext.define('Leap.view.MapsView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.mapsview',

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Golden Nugget Maps');
        this.add([
            {
                xtype: 'tabpanel',
                fullscreen: false,
                height: '100%',
                //ui: 'plain',
                tabBar: {
                    defaults: {
                        flex: 1
                    },
                    //centered: true
                    //ui: 'light',
                    //height: 50,
                    //style: 'border:0;padding: 0px;background-color: #1e4161;color: #fff;text-align: center;font-family: Helvetica, Arial, sans-serif;font-size: 22px;font-weight: normal;height:48px;',
                    layout: {
                        align: 'middle'
                        //pack: Ext.filterPlatform('ie10') ? 'start' : 'center'
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
                        title: 'First Floor',
                        contentEl: 'xMAP_FF_CONTAINER'
                    },
                    {
                        title: 'Meeting Rooms',
                        contentEl: 'xMAP_MR_CONTAINER'
                    }
                ]
            }
        ]);
    }
});