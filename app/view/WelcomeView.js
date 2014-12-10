Ext.define('Leap.view.WelcomeView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.welcomeview',

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Welcome');
        this.add([
            {
                xtype: 'container', docked: 'top', html: '' +
                    '<div data-role="content" style="height:1000px;" class="help_background ui-content" role="main">' +
                    '<div class="PAGE_DATA_CONTAINER">' +
                    '    <div class="ui-agenda-subheading">' +
                    '        <b>Welcome to the 2015 Landry&apos;s Leadership Conference</b>' +
                    '    </div>' +
                    '    <div class="ui-clear"></div>' +
                    '    <div class="ui-help-txt">' +
                    '        <div class="ui-conf-paddingtopbtm">The Leadership Conference app was designed to make your conference experience even better, giving you the ability to:</div>' +
                    '    <div>' +
                    '    <ul>' +
                    '        <li>Keep updated on conference events</li>' +
                    '        <li>Receive updates and notifications </li>' +
                    '        <li>Connect with Conference attendees</li>' +
                    '        <li>Locate your favorite Landry&apos;s restaurants</li>' +
                    '        <li>View Conference Photos </li>' +
                    '        <li>Provide valuable conference feedback</li>' +
                    '        <li>Enjoy Golden Nugget Offers</li> ' +      
                    '    </ul>' +
                    '</div>' +

                    '<div class="ui-login-vspacer"></div>' +
                    '<div><b>Having Trouble Logging In?</b></div> ' +
                    '<div>If you have any issues logging in with your email address and app code, please visit Conference Check-in for assistance or email leap@ldry.com.<br/> <br/>' +
                    '    ©2015 Landry&apos;s, Inc. and Hitachi Consulting. <br/>All rights reserved.' +
                    '</div>' +
                    '</div>'
            }
        ]);
    }
});