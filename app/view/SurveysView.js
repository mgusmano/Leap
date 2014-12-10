Ext.define('Leap.view.SurveysView', {
    extend: 'Leap.view.BaseView',
    alias: 'widget.surveysview',

    activate: function () {
        var me = this;
        me.setMasked({ xtype: 'loadmask', message: '' });

        var atp = $L.attendeeType;
        var latp = null;
        if (atp == 'e') {
            latp = 'E';
        } else {
            latp = 'S';
        }
        var data = { attendeeEmail: $L.attendeeEmail, conferenceYear: "2014", surveyType: latp };
        LDRY.ajax.call('GetMobileSurveyURL', data, function (resp, status, xhr) {
            var resp = $.parseJSON(resp.GetMobileSurveyURLResponse.GetMobileSurveyURLResult);
            console.log(resp);
            if (resp && resp.isValid) {
                var dayName;
                //var surveyUL = $('#SURVEY_TABS_HEAD');
                var noOfSurveys = resp.surveys.length;
                //console.log('populateSurveyContent ->>', 'noOfSurveys: ', noOfSurveys);
                //surveyUL.empty();
		 
                if (noOfSurveys > 0) {
                    //console.log('noOfSurveys', noOfSurveys);
                    var cnt = 0;
                    for (var i = 0; i < noOfSurveys; i++) {
                        var day = resp.surveys[i].day;
                        var ts = new Date();
                        var af = LDRY.util.formatTS(resp.surveys[i].availableFrom);
                        var at = LDRY.util.formatTS(resp.surveys[i].availableTo);
                        var t = ts.getTime();
                        console.log('aF: ', af, 'aT: ', at, 'ts: ', t);
                        console.log(LDRY.util.isBetween(af, at, t));
                        if (i == 0) {
                        //    $('#SURVEY_FRAME').attr('src', resp.surveys[i].url);
                        }
                        //surveyUL.append('<a href='+ resp.surveys[i].url + '  target="DBox">'+ LDRY.leapApp.modSurveys._surveyDays[resp.surveys[i].day] +'</a>');
                    }
                    me.setMasked(false);
                }
                else {
                    var message = "No surveys available";
                    me.setTitle(message);
                    me.setMasked(false);
                    //LDRY.leapApp.modSurveys.noSurveys(message);
                }
            }
            else {
                alert('error');
                //LDRY.leapApp.showError(resp.errTitle, resp.errMsg);
            }
        });
    },

    constructor: function (config) {
        this.callParent(config);

        this.setTitle('Surveys');
        this.add([
        ]);
    }
});