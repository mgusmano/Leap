Ext.define('Leap.view.LocalGuideView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.localguideview',

    constructor: function (config) {
        this.callParent(config);

        this.setScrollable('vertical'),
        this.setTitle('Local Guide');
        this.add([
            { xtype: 'container', contentEl: 'localGuide' }
        ]);
    }
});