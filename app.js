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

        if (window.WindowsAzure != undefined) {
            $L.client = new WindowsAzure.MobileServiceClient('https://touchazure.azure-mobile.net/', 'RWoarrhdtvpsDSrmoBLOIxTgqDXyiY10');
        }

        try {

            if (Ext.isSpace) {
                Ext.onSpaceReady(function () {
                    Ext.space.Fullscreen.enter().then(function () {
                        console.log("Done entering fullscreen.");
                    });
                });
            } else {

                //Ext.Msg.alert(
                //    'Sencha Space API not available',
                //    'This app requires Sencha Space! ' +
                //    'Visit www.sencha.com'
                //);
            }

        }
        catch (e) {
            alert(e);
        }

        Ext.Viewport.add([
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
