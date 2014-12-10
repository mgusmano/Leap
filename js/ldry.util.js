LDRY.util = {

	getSystemDate: function(n){
		if(!n) n=0;
	    var now = new Date();
	    var month = (now.getMonth() + 1);
	    var day = (now.getDate() + (n));
	    if(month < 10)
	        month = "0" + month;
	    if(day < 10)
	        day = "0" + day;
	    var rday = now.getFullYear() + '-' + month + '-' + day;
	    //console.log(rday);
	    return rday;

	},

	getStandardDate: function(d){

	    var now = new Date(d);
	    //console.log(now);
	    var month = (now.getMonth() + 1);
	    var day = now.getDate();
	    if(month < 10)
	        month = "0" + month;
	    if(day < 10)
	        day = "0" + day;
	    var rday = now.getFullYear() + '' + month + '' + day;
	    //console.log(rday);
	    return rday;
	},

  formatStandardDate: function(d){

        if( !d )
            return '';

        var now = new Date(d);
        //console.log(now);
        var month = (now.getMonth() + 1);
        var day = now.getDate();
        if(month < 10)
            month = "0" + month;
        if(day < 10)
            day = "0" + day;
        var rday = now.getFullYear() + '/' + month + '/' + day;
        //console.log(rday);
        return rday;
    },
	
	formatTS: function(ts){
		//console.log(ts);
		ts = ts.substring(6, ts.indexOf(')'));
		//console.log(ts);
		return ts;
	},
	
	isBetween: function(l, r, n){
		//console.log('isBetween', l, r, n);
		
		if(l <= n && r >= n)
			return true;
		else
			return false;
	},
	
	formatRevenue: function(r){
		//console.log(r);
		var amount = 0;
		var suffix = '';
		var val = Math.abs(Number(r));
		//console.log(Number(r));

		if(val >= 1.0e+9){
			amount = val / 1.0e+9;
			suffix = 'B';
		}else if(val >= 1.0e+6){
			amount = val / 1.0e+6;
			suffix = 'M';
		}else if(val >= 1.0e+3){
			amount = val / 1.0e+3;
			suffix = 'k';
		}else{
			amount = val;
		}

		//console.log(amount);
		var revenue = '$' + amount.toFixed(2) + suffix;
		//console.log(revenue);
		return revenue;
	},

    formatCurrency: function(val){
        if (!isNaN(val)) {
            num = parseFloat(Math.abs(val)).toFixed(0);
            /** Add Commas **/
            var reverse = num.split('').reverse(),
                numWithCommas = "";
            for (var i = 0; i < reverse.length; i++) {
                numWithCommas += reverse[i] + (i != (reverse.length - 1) && (i + 1) % 3 == 0 ? "," : "");
            }
            num = numWithCommas.split('').reverse().join('');
            return "$" + (val < 0 ? "(" + num + ")" : num);
        }
        else
            return "--";
    },

	formatPercent: function(p){
		return LDRY.util.formatPercentDecimal(p, 1);
	},

  formatPercentDecimal: function(i, dec, hideNeg){
        if (!isNaN(i)) {
            var isNegative = (!hideNeg && i < 0);
            i = Math.abs(parseFloat(i));
            if (typeof i == "number") {
                i = (dec && i < 100 ? i.toFixed(dec) : Math.round(i)) + "%";
                return (isNegative ? "(" + i + ")" : i);
            }
            else
                return i;
        }
        else return "--";
    },

	formatPercentOLD: function(p){
		//console.log(p);
		var val = Math.abs(Number(p));
		//console.log(val);
		var result = val.toFixed(1) + '%';
		//console.log(result);
		return result;
	},

	formatBigCurrency: function(val){
		return LDRY.util.formatBigCurrencyDecimal(val, 1);
	},

	formatBigCurrencyDecimal: function (val, dec) {
        if (!val) return "--";
        try {
            var op = "", val = parseFloat(val), num = Math.abs(val), letter = "", division = .1;
            if (num > 1000000000) {
                division = 100000000;
                letter = "B";
            }
            else if (num > 1000000) {
                division = 100000;
                letter = "M";
            }
            else if (num > 1000) {
                division = 100;
                letter = "K";
            }
            //num = Highcharts.numberFormat(num);
            num = Math.round(num / division);
            num = parseFloat(num / 10);
            num = (Math.abs(num) > 100 ? Math.round(num) : num); /** Display decimal only if num is less than 3 digits already**/
            return "$" + (val < 0 ? "(" + num + letter + ")" : num + letter);
        }
        catch (e) {
            return val;
        }
    },

  dialog: function (x) {/*** {message, position, confirm, buttons, title, modal, width, height} ***/
        if (!x)
            return alert("Missing {message, position, confirm, buttons, title, modal, width, height}");
        var id = "dialog" + Math.floor(Math.random() * 10000),
            div = "<div class='dialog' id=" + id + ">" + x.message + "</div>",
            options = {};
        $('body').append(div);

        if (x.position)
            options.position = x.position;
        if (x.confirm && !x.buttons)
            options.buttons = {
                "Accept": function () {
                    x.confirm()
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        else if (x.buttons)
            options.buttons = x.buttons;
        else if (!x.title)
            options.buttons = { Close: function () { $(this).dialog("close") } };
        if (x.modal)
            options.modal = true;
        options.width = (x.width ? x.width : 400);
        options.height = (x.height ? x.height : 300);
        options.title = x.title;

        options.show = "scale";
        options.hide = "clip";
        options.close = function (x) {
            $(x.target).remove();
        }

        $("#" + id).dialog(options);

        if (!x.title)
            $(".ui-dialog-titlebar").remove();
        $(".ui-widget-overlay").click(function () { $('.dialog').dialog('close') })
    },

  getChange: function (current, previous) {
        return Math.round(((current - previous) / current) * 100);
  },

  upperCaseFirst: function (st) {
        st = st.toLowerCase();
        return st.substr(0, 1).toUpperCase() + st.substr(1, st.length);
  },

	isPositive: function(num){
		
		if(num && num>0)
			return true;
		else
			return false;
	},

  json2xml: function(o, tab) {
       var toXml = function(v, name, ind) {
          var xml = "";
          var ns ='ldry:'; //namespace prefix
          if (v instanceof Array) {
             for (var i=0, n=v.length; i<n; i++)
                xml += ind + toXml(v[i], name, ind+"\t") + "\n";
          }
          else if (typeof(v) == "object") {
             var hasChild = false;
             xml += ind + "<" + ns + name;
             for (var m in v) {
                if (m.charAt(0) == "@")
                   xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                else
                   hasChild = true;
             }
             xml += hasChild ? ">" : "/>";
             if (hasChild) {
                for (var m in v) {
                   if (m == "#text")
                      xml += v[m];
                   else if (m == "#cdata")
                      xml += "<![CDATA[" + v[m] + "]]>";
                   else if (m.charAt(0) != "@")
                      xml += toXml(v[m], m, ind+"\t");
                }
                xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + ns + name + ">";
             }
          }
          else {
             xml += ind + "<" + ns + name + ">" + v.toString() +  "</" + ns + name + ">";
          }
          return xml;
       }, xml="";
       for (var m in o)
          xml += toXml(o[m], m, "");
       return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
  }

};