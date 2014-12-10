Ext.define('Leap.view.AgendaView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.agendaview',

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Agenda');
        this.add([
            {
                xtype: 'container',
                docked: 'bottom',
                html: '<iframe id="AGENDA_FRAME" src="http://landrysleap.com/leap_agenda/html/employeeagenda.html" name="DBox" frameborder="0" scrolling="yes" class="ui-iframe" style="display:block"> </iframe>'
            }
        ]);
    }
});