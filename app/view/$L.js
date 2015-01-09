Ext.define('Leap.view.$L', {
    singleton: true,
    alternateClassName: '$L',

    iRead: 'resources/images/icons/icon_read.png',
    iUnread: 'resources/images/icons/icon_unread.png',
    key: 'LDRY_ReadMsgIDs',
    isViewportLoaded: false,
    attendeeMessages: 0,

    loading: 0,
    startLoading: function (message) {
        if (message == null || message == '') {
            message = 'Loading data...';
        }
        this.loading++;
        if (this.loading == 1) {
            Ext.Msg.show({
                title: 'Please wait',
                width: 275,
                maxWidth: 280,
                height: 100,
                maxHeight: 100,
                closable: false,
                msg: message
            });
        }
    },

    endLoading: function () {
        if (this.loading === 1) {
            Ext.Msg.hide();
        }
        this.loading--;
    },



    showView: function (theViewName, direction) {
        //oldView.setMasked({ xtype: 'loadmask', message: '' });
        var myArray = Ext.Viewport.getItems().items;
        var arrayLength = myArray.length;
        var theViewId = 0;
        var me = this;
        for (var i = 0; i < arrayLength; i++) {
            if (myArray[i].xtype === theViewName) {
                theViewId = i;
            };
        };
        Ext.Viewport.animateActiveItem(Ext.Viewport.getItems().items[theViewId], { type: 'slide', direction: direction });
        //oldView.setMasked(false);
    },

    onSearchKeyUp: function (field) {
        var value = field.getValue(),
            store = this.down('dataview').getStore();

        store.clearFilter(!!value);
        if (value) {
            var searches = value.split(','),
                regexps = [],
                i, regex;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;
                regex = searches[i].trim();
                regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                regexps.push(new RegExp(regex.trim(), 'i'));
            }
            store.filter(function (record) {
                var matched = [];
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = search.test(record.get('sponsorName'));
                    matched.push(didMatch);
                }
                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },

    onSearchClearIconTap: function () {
        this.down('dataview').getStore().clearFilter();
    },

    showWeather: function(){
        /*
		var jqxhr = $.getJSON(LDRY.leapApp.modWeather._yahooAPI, function(a, b, c, d) {
		  		console.log("success");
			})
		  	.done(function(e) {
		    	console.log( "second success" );
		  	})
		  	.fail(function(a, b, c, d) {
		    	console.log("error", a, b, c, d);
		 	})
		  	.always(function(e) {
		    	console.log( "complete" );
		  	});
		*/

        //LDRY.ajax.call(LDRY.leapApp.modWeather._yahooAPI, LDRY.leapApp.modWeather.wS, LDRY.leapApp.modWeather.wF);
        $.ajax({
            url: "http://weather.yahooapis.com/forecastrss",
            data: {w: "12795446", u: "f"},
            contentType: "text/xml", 
            dataType: 'xml',
            type: 'GET',
            success: this.wS,
            error: this.wF
        });
    },

    wS: function(resp, status, xhr){
        //console.log('wS', $.xml2json(resp));
        var wci = $.xml2json(resp).channel.item;
        //console.log(wci);
        this.populateWeather(wci);
    },

    wF: function(){
        alert('error');
        //$('.YWEATHER').hide();
        //LDRY.leapApp.showError('WEATHER ERROR', 'Weather data not available');
    },

    populateWeather: function(w){
        //console.log('Weather JSON Object', w);
        var y = $('.YWEATHER');
        y.empty();
        var t = null;
        var o = null;
        // Populate today's weather
        //var t = $('.YWEATHER .today');
        t = '<p class="otherday"><img src="'+LDRY.leapApp.modWeather.getImage(w.condition.code)+'" /><br /><span class="temp"> <strong>'+w.condition.temp+' </strong></span><br /><span class="day"><strong> Now </strong></span></p>';
        //t.find('img').attr('src', LDRY.leapApp.modWeather.getImage(w.condition.code));
        y.append(t);

        // Populate other day's weather
        for(var i=1; i<w.forecast.length; i++){
            //console.log(w.forecast[i].code, w.forecast[i].high,  w.forecast[i].low,  w.forecast[i].day);
            o = '<p class="otherday"><img src="'+LDRY.leapApp.modWeather.getImage(w.forecast[i].code)+'" /><br /><span class="temp"><strong>'+w.forecast[i].high +'</strong> '+ w.forecast[i].low+'</span><br /><span class="day"> '+w.forecast[i].day+' </span></p>';
            y.append(o);
        }

        //console.log('End of populateWeather');
        $('.YWEATHER').show();
    }




});