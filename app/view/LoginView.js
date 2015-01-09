Ext.define('Leap.view.LoginView', {
    extend: 'Ext.Container',
    alias: "widget.loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img'],

    config: {
        layout: {type: 'vbox', align: 'center' },
        title: 'Login',
        //cls: 'panelBackground',
        style: 'background-image: url(../images/background/laundrys-body-bg.png) !important;background-repeat: no-repeat !important;background-size: 100% 100% !important;',

        items: [
            {
                xtype: 'image',
                src: 'resources/images/logos/laundrys-logo-300.png',
                style: 'width:100%;height:150px;margin: 10px 0 5px 0;text-align-center;'
            },
            {
                xtype: 'component',
                style: 'color:white;text-align:center;font-size:1em;font-family: Helvetica, Arial, sans-serif;font-size: 16px;',
                html: 'To join the Conference App,'
            },
            {
                xtype: 'component',
                style: 'color:white;text-align:center;font-size:1em;font-family: Helvetica, Arial, sans-serif;font-size: 16px;',
                html: 'provide your Email and App Code.'
            },
            {
                xtype: 'fieldset',
                width: '90%',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Email',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        value: 'b',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'App Code',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        value: 'b',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                width: '90%',
                id: 'logInButton',
                ui: 'action',
                padding: '10px',
                margin: '0px',
                text: 'Join'
            },
            {
                xtype: 'button',
                id: 'welcomeButton',
                margin: '20px',
                style: 'text-align:center;',
                ui: 'plain',
                style: 'width:33px;height:33px;text-align:center;background-image: url("resources/images/icons/LEAP_Info_Small.png");background-size:cover;background-repeat: no-repeat;background-position: center center;'
            },
            {
                xtype: 'container',
                docked: 'bottom',
                height: 70,
                items: [
                    {
                        xtype: 'image',
                        src: 'resources/images/background/icon_strip.png',
                        style: 'width:100%;height:70px;xposition:absolute;xbottom:0;xmargin-bottom:20px'
                    }
                ]
            }
        ]
    }
});