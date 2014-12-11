Ext.define('Photos.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'ig-main',
    requires: [
        'Ext.ux.touch.ImageGridList.view.Panel',
        'Photos.store.Images',
         "Ext.TitleBar",
    ],
    config: {
        fullscreen: true,
        layout: 'fit',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Photos',


                items:[
                    { text: 'Cancel', action: 'cancelInvoke', hidden:true},
                    { text: 'Choose', align: "right", disabled: true, hidden:true, action: 'useSelected'}
                ]
            },
            {
                xtype: 'image-grid-list-panel'
            }
        ],
        listeners: {
            initialize: 'onInitThisPanel'
        }
    },

    /**
     * call when initialize
     */
    onInitThisPanel: function(){
        var me = this;

        me.setImageData();
    },

    /**
     * set image data
     */
    setImageData: function(){
        var me = this;
            gallery = me.down('image-grid-list-panel'),
            store = me.getImageData();

        gallery.renderImages(store);
    },

    /**
     * get image data
     * @return {Ext.ImageGridList.store.Images} image store contain model override Ext.ux.touch.ImageGridList.model.Image
     */
    getImageData: function(){
        var me = this,
            store = Ext.getStore("photos"),//Ext.create('ImageGridList.store.Images'),
            urls = me.getUrls(),
            model;

        for(var i = 0, length = urls.length; i < length; i++){
            model = Ext.create(Photos.model.Image);
            model.set('url', urls[i]);
            store.add(model);
        }

        return store;
    },

    /**
     * return test image urls
     * @return {String[]} image urls
     */
    getUrls: function(){
        return [
            'resources/images/1.jpg',
            'resources/images/2.jpg',
            'resources/images/3.jpg',
            'resources/images/4.jpg',
            'resources/images/5.jpg',
            'resources/images/7.jpg',
            'resources/images/8.jpg',
            'resources/images/9.jpg',
            'resources/images/10.jpg',
            'resources/images/11.jpg',
            'resources/images/12.jpg',
            'resources/images/13.jpg',
            'resources/images/14.jpg',
            'resources/images/15.jpg',
            'resources/images/16.jpg',
            'resources/images/17.jpg',
            'resources/images/18.jpg',
            'resources/images/19.jpg',
            'resources/images/20.jpg'
        ];
    }
});
