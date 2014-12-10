Ext.define('Leap.view.SponsorsView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.sponsorsview',

    sponsorData: [
        {
            image: 'Ic_All.png',
            view: 'allsponsorsview',
            text: 'View All Sponsors'
        },
        {
            image: 'platinum.png',
            view: 'platinumsponsorsview',
            text: '2015 Platinum Sponsors'
        },
        {
            image: 'diamond.png',
            view: 'diamondsponsorsview',
            text: '2015 Diamond Sponsors'
        },
        {
            image: 'silver.png',
            view: 'silversponsorsview',
            text: '2015 Silver Sponsors'
        },
        {
            image: 'bronze.png',
            view: 'bronzesponsorsview',
            text: '2015 Bronze Sponsors'
        }
    ],

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });

        me.down('list').setStore(Ext.create('Ext.data.Store', {
            fields: ['id', 'view', 'image', 'text'],
            data: me.sponsorData
        }));

        var data = { attendeeEmail: $L.attendeeEmail };
        LDRY.ajax.call('GetMobileSponsors', data, function (resp, status, xhr) {
            resp = $.parseJSON(resp.GetMobileSponsorsResponse.GetMobileSponsorsResult);
            console.log(resp);
            if (resp && resp.isValid) {
                var sponsors = resp.sponsors;
                var len = sponsors.length;
                console.log(sponsors, len);

                $L.platinum = [];
                $L.diamond = [];
                $L.silver = [];
                $L.bronze = [];
                $L.allSponsors = [];
                var sCount = 0;
                for (var i = 0; i < len; i++) {
                    if (sponsors[i].logoPath && sponsors[i].logoPath != '') {
                        logoName = LDRY.lu + sponsors[i].logoPath;
                        logoText = '';
                    } else {
                        logoName = 'resources/images/logos/default.png';
                        logoText = sponsors[i].sponsorName;
                    }
                    var o = {};
                    o.logoText = logoText;
                    o.sponsorType = sponsors[i].sponsorType;
                    o.sponsorCode = sponsors[i].sponsorCode;
                    o.logoName = logoName;
                    o.sponsorName = sponsors[i].sponsorName;
                    if (sponsors[i].sponsorType == 'p') {
                        $L.platinum.push(o);
                        o.sponsorTypeImage = 'platinum.png';
                    }
                    if (sponsors[i].sponsorType == 'd') {
                        $L.diamond.push(o);
                        o.sponsorTypeImage = 'diamond.png';
                    }
                    if (sponsors[i].sponsorType == 's') {
                        $L.silver.push(o);
                        o.sponsorTypeImage = 'silver.png';
                    }
                    if (sponsors[i].sponsorType == 'b') {
                        $L.bronze.push(o);
                        o.sponsorTypeImage = 'bronze.png';
                    }
                    $L.allSponsors.push(o);
                }
                me.setMasked(false);
            } else {
                alert('error');
                //LDRY.leapApp.showError(resp.errTitle, resp.errMsg);
            }
        });
    },

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Sponsors');
        this.add([
            {
                id: 'sponsorList',
                xtype: 'list',
                height: '100%',
                itemHeight: 70,
                emptyText: 'Loading list of Sponsors...',
                itemTpl: [
                    '<div class="sponsor-list-item">',
                    '<span class="sponsor-pic" style="background-image: url(resources/images/icons/{image});background-size:cover;background-repeat: no-repeat;background-position: center center;">',
                    '</span>',
                    '{text}',
                    '<span xclass="ui-allsponsors-arrowright" style="top: -33px;float: right;left: 30px;margin: 20px 0px 0px 0px;"><img src="resources/images/icons/arrow_right.png"></span>',
                    '</div>'
                ],
                listeners: {
                    itemtap: function (list, idx, target, record, evt) {
                        $L.showView(record.get('view'), 'left');
                    }
                } 
            }
        ]);
    }
});