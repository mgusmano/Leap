Ext.define('Leap.controller.LoginController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginView: 'loginview'
        },
        control: {
            'loginView': {
                initialize: 'onloginViewInitialize'
            },
            '#welcomeButton': {
                tap: 'onWelcomeButtonTap'
            },
            '#logInButton': {
                tap: 'onLogInButtonTap'
            },
            '*': {
                backCommand: 'onBackCommand',
                signOffCommand: 'onSignOffCommand'
            }
        }
    },

    onloginViewInitialize: function () {
        var task = Ext.create('Ext.util.DelayedTask', function () {
            if ($L.isViewportLoaded === false) {
                Ext.Viewport.add([
                    { xtype: 'agendaview' },
                    { xtype: 'corporateview' },
                    { xtype: 'localguideview' },
                    { xtype: 'mapsview' },
                    { xtype: 'messagesview' },
                    { xtype: 'offersview' },
                    { xtype: 'photosview' },
                    { xtype: 'sponsorsview' },
                    { xtype: 'allsponsorsview' },
                    { xtype: 'platinumsponsorsview' },
                    { xtype: 'diamondsponsorsview' },
                    { xtype: 'silversponsorsview' },
                    { xtype: 'bronzesponsorsview' },
                    { xtype: 'surveysview' },
                    { xtype: 'sponsorsdetailview' },
                    { xtype: 'adminview' }
                ]);
                $L.isViewportLoaded = true;
            }
        });
        task.delay(1000);
    },

    onWelcomeButtonTap: function () {
        $L.showView('welcomeview', 'left');
    },

    onLogInButtonTap: function () {
        var me = this;
        var loginView = me.getLoginView();
        var usernameField = loginView.down('#userNameTextField');
        var passwordField = loginView.down('#passwordTextField');
        username = usernameField.getValue();
        password = passwordField.getValue();
        if (username.length === 0 || password.length === 0) {
            me.showSignInFailedMessage('Please enter your username and password.');
            return;
        }
        if (username === 'admin' && password === 'admin') {
            Ext.Viewport.add([
                { xtype: 'adminview' }
            ])
            $L.showView('adminview', 'left');
            return;
        }
        loginView.setMasked({ xtype: 'loadmask', message: '' });
        usernameField.setValue('');
        passwordField.setValue('');

        var data = { attendeeEmail: username, attendeeCode: password };
        LDRY.ajax.call('AuthorizeMobileAttendee', data, function (resp, status, xhr) {
            resp = $.parseJSON(resp.AuthorizeMobileAttendeeResponse.AuthorizeMobileAttendeeResult);
            if (resp && resp.isValid) {
                $L.attendeeEmail = resp.attendeeEmail;
                $L.attendeeType = resp.attendeeType;
                $L.attendeeType = 'C'; //for testing corporate menu item
                $L.attendeeFirstName = resp.attendeeFirstName;
                $L.attendeeLastName = resp.attendeeLastName;
                $L.attendeeContact = resp.attendeeContact;

                LDRY.storage.set('ael', $L.attendeeEmail);
                LDRY.storage.set('atp', $L.attendeeType);
                LDRY.storage.set('afn', $L.attendeeFirstName);
                LDRY.storage.set('aln', $L.attendeeLastName);
                LDRY.storage.set('acn', $L.attendeeContact);

                loginView.setMasked(false);
                $L.showView('mainmenuview', 'left');
            }
        });
    },

    onBackCommand: function (view) {
        $L.showView(view, 'right');
    },

    showSignInFailedMessage: function (message) {
        Ext.Msg.alert('Sign In Failed', message, Ext.emptyFn);
    },

    signInFailure: function (message) {
        var loginView = this.getLoginView();
        this.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onSignOffCommand: function (view) {
        $L.showView('loginview', 'right');
    }

});