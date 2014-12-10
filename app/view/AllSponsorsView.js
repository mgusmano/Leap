Ext.define('Leap.view.AllSponsorsView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.allsponsorsview',

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });
        var task = Ext.create('Ext.util.DelayedTask', function () {
            me.down('list').setStore(Ext.create('Ext.data.Store', {
                fields: ['logoText', 'sponsorType', 'sponsorTypeImage', 'sponsorCode', 'logoName', 'sponsorName'],
                data: $L.allSponsors
            }));
            me.setMasked(false);
        });
        task.delay(500);
    },

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('All 2015 Sponsors');
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
                xtype: 'list',
                height: '100%',
                itemHeight: 70,
                emptyText: 'No Matching Sponsors...',
                itemTpl: [
                    '<div class="sponsor-list-item">',
                    '<span class="sponsor-pic" style="background-image: url({logoName});background-size:cover;background-repeat: no-repeat;background-position: center center;"></span>',
                    '{sponsorName}',
                    '<span class="ui-allsponsors-attendeetype">',
                    '<img class="ui-allsponsors-first-img" style="height:50px;" src="resources/images/icons/{sponsorTypeImage}"> ',
                    '<img class="ui-allsponsors-second-img" src="resources/images/icons/arrow_right.png">',
                    '</span>',
                    '</div>'
                ]
                //listeners: {
                //    itemtap: function (list, idx, target, record, evt) {
                //        Ext.Msg.alert('itemtap', record.data.name);
                //    },
                //    itemtaphold: function (list, idx, target, record, evt) {
                //        Ext.Msg.alert('itemtaphold', record.data.name);
                //    }, 
                //    itemswipe: function (list, idx, target, record, evt) {
                //        Ext.Msg.alert('itemswipe', record.data.name);
                //    } 
                //} 
            }
        ]);
    }
});