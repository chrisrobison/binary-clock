(function() {
   var tobj = {
      h1:{},
      h2:{},
      m1:{},
      m2:{},
      s1:{},
      s2:{}
   };
   var parts = ['h','h','m','m','s','s'];
   var layout = [2,4,3,4,3,4];

   function $(id) {
      return document.getElementById(id);
   }

   function updateClock() {
      var now = new Date(),
          hr = now.getHours().toString(),
          mn = now.getMinutes().toString(),
          sc = now.getSeconds().toString();
      
      alloff();

      if (hr.length==1) hr = "0" + hr; 
      if (mn.length==1) mn = "0" + mn; 
      if (sc.length==1) sc = "0" + sc; 

      tstr = hr + mn + sc;

      for (var x=0; x<6; x++) {
         if (tstr[x]>0) {
            for (var bit=0; bit<4; bit++) {
               if (tstr[x] & Math.pow(2,bit)) {
                  var id = parts[x] + ((x%2)+1) + "_" + (bit + 1);
                  console.log(id);
                  $(id).src = "led-on.png";
               }
            }
         }
      }

      for (var i=0; i<tstr.length; i++) {
         $("col" + (i+2)).innerHTML = tstr[i];
      }

      setTimeout(updateClock,1000);
   }
   
   function alloff() {
      var leds = document.getElementsByClassName('led');

      for (var led in leds) {
         leds[led].src = "led-off.png";
      }

   }

   function init() {
      var container = $("clock"),
          out = $("clockbody").innerHTML;
      
      for (var row=4; row>0; row--) {
         out += "<tr>";
         out += "<td class='bit'>" + Math.pow(2,row - 1) + "</td>";
         for (var col=0; col<6; col++) {
            if (layout[col] > row-1) {
               out += "<td><img class='led' id='" + parts[col] + ((col%2)+1) + "_" + row +"' src='led-off.png'></td>";
            } else {
               out += "<td></td>";
            }
         }
         out += "<td class='bit'>" + Math.pow(2,row - 1) + "</td>";
         out += "</tr>\n";
      }
      out += "<tr>";
      for (var i=0; i<8; i++) {
         out += "<td class='digits' id='col" + (i+1) + "'></td>";
      }
      out += "</tr>";

      clock.innerHTML = out;
      setTimeout(updateClock, 1000);
   }
   init();
})();

