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

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Admin');
        this.add([
            {
                xtype: 'button',
                margin: 10,
                text: 'delete LS',
                handler: this.onDeleteLS
            }
        ]);
    }
});