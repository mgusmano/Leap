Ext.define('Leap.view.MenuDataItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'menudataitem',


    //id: 'BTN_MESSAGES',
    //image: 'icon_messages.png',
    //text: 'Messages',
    //display: 'inline-block'

    config: {
        //padding: 10,
        //style: 'width:33%;',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        margin: '20px 0 0 0',
        width: '30%',
        //defaults: {
        //    margin: 5
        //},
        items: [
            {
                xtype: 'button',
                width: 79,
                height: 79,
                ui: 'plain',
                text: '',
                handler: function () {
                    Ext.showView(this.getItemId());
                } 
            },
            {
                xtype: 'component',
                width: 79,
                style: 'color:white;text-align:center;',
                html: '',
                itemId: 'textCmp'
            }
        ]
    },

    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },


    updateRecord: function (record) {
        var me = this;

        me.down('#textCmp').setHtml(record.get('text'));
        //me.down('button').setIcon('resources/images/icons/app/' + record.get('image'));
        var theImage = 'resources/images/icons/app/' + record.get('image');
        me.down('button').setStyle("background-image: url('" + theImage + "');background-size:cover;background-repeat: no-repeat;background-position: center center;   ");
        me.down('button').setItemId(record.get('view'));
        //me.down('#textCmp').setHtml('resources/images/icons/app/{image}' + record.get('image'));

        me.callParent(arguments);
    }
});
