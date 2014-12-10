Ext.define('Leap.view.MainMenuButton', {
    extend: 'Ext.Container',
    alias: 'widget.mainmenubutton',

    initialize: function () {
        this.setItemId(this.getView()+ 'Container');
        this.down('button').setItemId(this.getView());
        var size = 79; //79, 58
        this.down('button').setWidth(size);
        this.down('button').setHeight(size);
        this.down('button').setStyle("background-image: url('resources/images/icons/app/" + this.getImage() + "');background-size:cover;background-repeat: no-repeat;background-position: center center;");
        this.down('#theTitle').setHtml(this.getTitle());
        this.down('#theTitle').setWidth(size);
    },

    config: {
        view: null,
        image: null,
        title: null,
        layout: { type: 'vbox', align: 'center' }, margin: '7px 7px 7px 7px', width: '30%',
        items: [
            {
                xtype: 'button', ui: 'plain', text: '',
                handler: function () {
                    $L.showView(this.getItemId(), 'left', this.up('container'));
                }
            },
            {
                xtype: 'component', itemId: 'theTitle', style: 'font-size:10px;color:white;text-align:center;'
            }
        ]    
    }
});