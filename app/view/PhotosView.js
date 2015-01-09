Ext.define('Leap.view.PhotosView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.photosview',

    requires: [
        'Ext.SegmentedButton',
        'Ext.carousel.Carousel',
        'Ext.util.DelayedTask',
        'Ext.data.Store',
        'Ext.dataview.DataView',
        'Ext.dataview.List'
    ],

    api_key_leap: 'b999973b4543f532d99b9b9f8e175fa3',
    user_id: '111636227@N03',
    flickerUrl: 'https://api.flickr.com/services/rest/',

    g: function (url, sCallback, eCallback) {
        var me = this;
        $.ajax({
            dataType: "json",
            url: url,
            success: function (result, status, xhr) {
                if (result && result != '') {
                    if (sCallback) {
                        sCallback(result, status, xhr);
                    } else {
                        return [result, status, xhr];
                    }
                } else {
                    alert('error');
                }
            },
            error: function (xhr, status, error) {
                alert('error');
            }
        });
    },

    handleOrientationChange: function (me, newOrientation, width, height, eOpts) {
        if (newOrientation === 'landscape') {
            this.down('#theHeader').setHidden(true);
            this.down('#theLabel').setHidden(true);
            this.down('#theFooter').setHidden(true);
            this.down('#theDays').setHidden(true);
            this.down('#theEvents').setHidden(true);
            this.down('#theCarousel').setHeight('100%');

        }
        else {
            this.down('#theHeader').setHidden(false);
            this.down('#theLabel').setHidden(false);
            this.down('#theFooter').setHidden(false);
            this.down('#theDays').setHidden(false);
            this.down('#theEvents').setHidden(false);
            this.down('#theCarousel').setHeight('70%');
        }
    },

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });
        me.down('segmentedbutton').removeAll(true, true);
        me.down('list').setStore(Ext.create('Ext.data.Store', {
            fields: ['text', 'eventId'],
            data: []
        }));
        me.down('carousel').setItems([]);
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, { buffer: 50 });
        var getDaysURL = me.flickerUrl + '?method=flickr.collections.getTree' + '&api_key=' + me.api_key_leap + '&user_id=' + me.user_id + '&format=json&nojsoncallback=1';
        me.g(getDaysURL, function (result, status, xhr) {
            $L.days = result.collections.collection;
            var items = [];
            for (j = 0; j < $L.days.length; j++) {
                var o = {
                    text: $L.days[j].title,
                    desc: $L.days[j].description,
                    dayset: $L.days[j].set
                };
                me.down('segmentedbutton').add(
                    o
                );
            };
            me.setMasked(false);
        });
    },

    doToggle: function (container, button, pressed) {
        var me = this.up('container').up('container');
        if (pressed === true) {
            me.down('carousel').setItems([]);

            me.setTitle('Photos' + ' - ' + button.config.desc);
            var getEventsData = me.flickerUrl + '?&method=flickr.photosets.getList' + '&api_key=' + me.api_key_leap + '&user_id=' + me.user_id + '&format=json&nojsoncallback=1';
            me.g(getEventsData, function (result, status, xhr) {
                $L.photoset = result.photosets.photoset;
                var items = [];
                console.log(button.config);
                for (var i = 0; i < $L.photoset.length; i++) {
                    for (var j = 0; j < button.config.dayset.length; j++) {
                        if (button.config.dayset[j].id === $L.photoset[i].id) {
                            //pURL = 'http://farm' + $L.photoset[i].farm + '.static.flickr.com/' + $L.photoset[i].server + '/' + $L.photoset[i].primary + '_' + $L.photoset[i].secret + '_m.jpg';
                            items.push(
                                {
                                    text: $L.photoset[i].title._content,
                                    eventId: $L.photoset[i].id
                                }
                            );
                        }
                    }
                };
                me.down('list').setStore(Ext.create('Ext.data.Store', {
                    fields: ['text', 'eventId'],
                    data: items
                }));
            });
        }
    },

    onItemTap: function (list, idx, target, record, evt) {
        var me = this.up('container');
        me.setMasked({ xtype: 'loadmask', message: '' });
        var getPhotosURL = me.flickerUrl + '?&method=flickr.photosets.getPhotos' + '&api_key=' + me.api_key_leap + '&photoset_id=' + record.get('eventId') + '&format=json&nojsoncallback=1';
        me.g(getPhotosURL, function (result, status, xhr) {
            var op = result.photoset.photo;
            var items = [];
            for (var i = 0; i < op.length; i++) {
                pURL = 'http://farm' + op[i].farm + '.static.flickr.com/' + op[i].server + '/' + op[i].id + '_' + op[i].secret + '_b.jpg';
                items.push(
                    {
                        xtype: 'image',
                        height: '100%',
                        src: pURL
                    }
                );
            }
            me.down('carousel').setItems(items);
            me.setMasked(false);
        });
    },

    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.setTitle('Photos');
        me.add([
            {
                xtype: 'toolbar',
                itemId: 'theDays',
                docked: 'top',
                layout: {pack: 'center'},
                items: [
                    {
                        xtype: 'segmentedbutton',
                        allowDepress: true,
                        listeners: {
                            toggle: this.doToggle
                        }
                    }
                ]
            },
            {
                xtype: 'list',
                height: '30%',
                itemId: 'theEvents',
                itemTpl: '{text}',
                listeners: {
                    itemtap: this.onItemTap
                }
            },
            {
                xtype: 'carousel',
                id: 'theCarousel',
                bufferSize: 2,
                height: '70%',
                direction: 'horizontal'
            }
        ]);
    }
});