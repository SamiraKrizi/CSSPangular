import { Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })



export class AppComponent {
  title = 'my-app';
  ngOnInit() {
      (function(d, m){
          var kommunicateSettings = {"appId":"d5302ebe2ef0e398fbb3c463842a2f47","popupWidget":true,"automaticChatOpenOnNavigation":true};
          var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
          s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
          var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
          (window as any).kommunicate = m; m._globals = kommunicateSettings;
          
      })(document, (window as any).kommunicate || {});




      /*(function(d, m){
        var kommunicateSettings = {"appId":"7519ee060abee2b532e8565aa0527aed","popupWidget":true,"automaticChatOpenOnNavigation":true, 
                "title": "test",
                 "appSettings": {
                        "chatWidget": {
                          "popup": true,           // To enable or disable the pre-chat popup (boolean)
                          //"emojilibrary" : true
                        },
                        "chatPopupMessage": [{
                          "message": "Wanna ask something related to "+document.title+ "?", // Message to be displayed in the pre-chat popup (string)
                          "delay": 3000                    // Delay interval of pre-chat popup (number in milliseconds)
                        }],
                 },
                 "onInit" : function(){
                     var chatContext = {
                      "lat":"Latitude° N",
                      "lon":"Longitude° E"
                    }
                    Kommunicate.updateChatContext(chatContext);
                 }
        };

        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});*/ 
    }
  }



