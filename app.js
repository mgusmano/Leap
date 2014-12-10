Ext.application({
    name: 'Leap',
    requires: [
        'Ext.MessageBox',
        'Ext.field.Search',
        'Ext.tab.Panel',
        'Ext.util.DelayedTask',
        'Ext.data.Store',
        'Ext.dataview.DataView',
        'Ext.dataview.List'
    ],
    controllers: [
        'LoginController'
    ],
    views: [
        'LoginView',
        'WelcomeView',
        'MainMenuView',
        'AgendaView',
        'CorporateView',
        'LocalGuideView',
        'MapsView',
        'MessagesView',
        'OffersView',
        'PhotosView',
        'SponsorsView',
        'AllSponsorsView',
        'PlatinumSponsorsView',
        'DiamondSponsorsView',
        'SilverSponsorsView',
        'BronzeSponsorsView',
        'SurveysView',
        'MainMenuButton',
        'SponsorsDetailView',
        'AdminView',
        '$L'
    ],

    launch: function () {
        Ext.Viewport.add([
            //{ xtype: 'adminview' },
            { xtype: 'loginview' },
            { xtype: 'welcomeview' },
            { xtype: 'mainmenuview' }
        ]);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});