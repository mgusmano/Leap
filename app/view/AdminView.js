Ext.define('Leap.view.AdminView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.adminview',

    onDeleteLS: function () {
        alert('HI');

        //localStorage.removeItem($L.key);
        //alert('Deleted: ' + $L.key)
        //var data = { attendeeEmail: 'kng@hitachiconsulting.com' };
        //LDRY.ajax.call('GetMobileSponsors', data, me.sponsorsSuccess);
    },

    //requires: [
    //],
    //activate: function() {
    //},
    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.setTitle('Admin');
        me.add([
            {
                xtype: 'button',
                margin: 10,
                text: 'delete LS',
                handler: this.onDeleteLS
            }
        ]);
    }
    //config: {
    //}
});