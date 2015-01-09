Ext.define('Leap.view.AgendaView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.agendaview',
    constructor: function (config) {
        var me = this;
        me.callParent(config);
        me.setTitle('Agenda');
        me.add([
            {
                xtype: 'container',
                docked: 'bottom',
                html: '<iframe id="AGENDA_FRAME" src="http://landrysleap.com/leap_agenda/html/employeeagenda.html" name="DBox" frameborder="0" scrolling="yes" class="ui-iframe" style="display:block"> </iframe>'
            }
        ]);
    }
});