LDRY.storage = {

	html5StorageEnabled: (window['localStorage'] && window['sessionStorage']),
	appStoragePrefix: 'LDRY_',
    
    set: function(name, value, isForSession){
        if(LDRY.storage.html5StorageEnabled){
            if(isForSession){
                sessionStorage.setItem(LDRY.storage.appStoragePrefix+name, value);
            }else{
                localStorage.setItem(LDRY.storage.appStoragePrefix+name, value);
            }
        }
    },

    setObject: function(name, value, isForSession){
        if(LDRY.storage.html5StorageEnabled){
            if(isForSession){
                sessionStorage.setItem(LDRY.storage.appStoragePrefix+name, JSON.stringify(value));
            }else{
                localStorage.setItem(LDRY.storage.appStoragePrefix+name, JSON.stringify(value));
            }
        }
    },

    get: function(name){
        if(LDRY.storage.html5StorageEnabled){
            var sessionValue = sessionStorage.getItem(LDRY.storage.appStoragePrefix+name);
            if(sessionValue != null){
                return sessionValue;
            }
            return localStorage.getItem(LDRY.storage.appStoragePrefix+name);
        }
    },

    getObject: function(name){
        if(LDRY.storage.html5StorageEnabled){
            var sessionValue = sessionStorage.getItem(LDRY.storage.appStoragePrefix+name);
            if(sessionValue != null){
                return JSON.parse(sessionValue);
            }
            return JSON.parse(localStorage.getItem(LDRY.storage.appStoragePrefix+name));
        }
    },

    remove: function(name){
        if(LDRY.storage.html5StorageEnabled){
            sessionStorage.removeItem(LDRY.storage.appStoragePrefix+name);
            localStorage.removeItem(LDRY.storage.appStoragePrefix+name);
        }
    },

    show: function(){
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var value = localStorage[key];
			if(key.search(LDRY.storage.appStoragePrefix) != -1){
				console.log(key, ' : ' , value);
			}
		}
		return;
    },

    flush: function(){
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			if(key.search(LDRY.storage.appStoragePrefix) != -1){
				localStorage.removeItem(key);
				console.log(key+' removed');
			}
		}
		return;
    }

};