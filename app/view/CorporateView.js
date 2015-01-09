Ext.define('Leap.view.CorporateView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.corporateview',

    _urlJoin: 'employee_detail.json',
    _serviceAskCorporate: 'GetAllMobileAttendeesByType',
    _eIMG: {"1": "app/images/icons/online.png", "0": "app/images/icons/offline.png"},

    get: function(){
        var data = {attendeeEmail: LDRY.leapApp._ael, listType: 'C'};
        //console.log(data);
        LDRY.ajax.call(LDRY.leapApp.modAskCorporate._serviceAskCorporate, data, LDRY.leapApp.modAskCorporate.employeeSuccess);
    },

    employeeSuccess: function(resp, status, xhr){
        resp = $.parseJSON(resp.GetAllMobileAttendeesByTypeResponse.GetAllMobileAttendeesByTypeResult);

        //console.log(resp);
        if (resp && resp.isValid) {
            // Open Ask Corporate Page
          
            LDRY.leapApp.modAskCorporate.populateAllEmployees(resp);
        }
        else {
            LDRY.leapApp.showError('UNKNOWN ERROR', 'UNKNOWN ERROR');
        }
    },
	
    getCurrentPage: function(){
        var cpg = $.mobile.activePage.attr('id');
        return cpg;
    },

    populateAllEmployees: function(resp){
        //console.log(resp);

        var eUL = $('ul#ui-askcorporate-links');
        var noOfEmployees = resp.attendeeDetails.length;
		
        eUL.empty();
        for(var i=0; i< noOfEmployees; i++){
			
            eUL.append('<li><a class="ui-list-anchor cls-ed-employee" href="#"><h2>'+resp.attendeeDetails[i].attendeeFirstName + ' ' +resp.attendeeDetails[i].attendeeLastName +'</h2><p> '+resp.attendeeDetails[i].attendeeTitle+'</p><p>Dept: '+resp.attendeeDetails[i].attendeeDepartment+'</p><p>Email: '+resp.attendeeDetails[i].attendeeEmail+'</p><span class="ui-attendeetypes"><img src="'+LDRY.leapApp.modAskCorporate._eIMG[resp.attendeeDetails[i].attended]+'"></span></a></li>');
        }
			 
        $.mobile.changePage($('#PAGE_CORPORATE'));
        if (this.getCurrentPage != 'PAGE_CORPORATE') {
            $('ul#ui-askcorporate-links').listview("refresh");
        }
    },

    sponsorsSuccess: function (resp, status, xhr) {
        resp = $.parseJSON(resp.GetMobileSponsorsResponse.GetMobileSponsorsResult);
        console.log(resp);
        if (resp && resp.isValid) {
            var sponsors = resp.sponsors;
            var len = sponsors.length;
            console.log(sponsors, len);

            Ext.platinum = [];
            Ext.diamond = [];
            Ext.silver = [];
            Ext.bronze = [];
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
                    Ext.platinum.push(o);
                }
                if (sponsors[i].sponsorType == 'd') {
                    Ext.diamond.push(o);
                }
                if (sponsors[i].sponsorType == 's') {
                    Ext.silver.push(o);
                }
                if (sponsors[i].sponsorType == 'b') {
                    Ext.bronze.push(o);
                }
            }
            console.log(Ext.platinum);
            console.log(Ext.diamond);
            console.log(Ext.silver);
            console.log(Ext.bronze);

        } else {
            alert('error');
            //LDRY.leapApp.showError(resp.errTitle, resp.errMsg);
        }
    },

    constructor: function (config) {
        var me = this;
        me.callParent(config);
        me.setTitle('Corporate');
        me.add([
         ]);
    }
});