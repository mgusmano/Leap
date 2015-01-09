Ext.define('Leap.view.LocalGuideView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.localguideview',
    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        //me.setScrollable('vertical'),
        me.setTitle('Local Guide');
        me.add([
            { xtype: 'container', contentEl: 'localGuide' }
        ]);
    },
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        }
    }
});