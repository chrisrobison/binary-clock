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
   var leds = [];

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
                  console.log(id + ": led on " + parts[x]);
                  $(id).className = "led on " + parts[x];
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
      var leds = document.getElementsByClassName("led");
      for (var led=0; led<leds.length; led++) {
         leds[led].className = 'led off no_' + leds[led].id[0];
      }

   }

   function init() {
      var container = $("clock"),
          out = $("clockbody").innerHTML,
          tr, td, wrap;
      
      /**
       * Build LED table:
       *
       *     X  X  8
       *  X XX XX  4
       * XX XX XX  2
       * XX XX XX  1
       * HH:MM:SS 
       *
       *
       * Bottom row represents our least significant digit so row counter counts down.
       **/
      for (var row=4; row>0; row--) {
         tr = document.createElement('tr');
         td = document.createElement('td');
         td.className = "bit";
         td.innerHTML = Math.pow(2,row - 1);
         tr.appendChild(td);

         for (var col=0; col<6; col++) {
            td = document.createElement('td');
            wrap = document.createElement('div');
            if (layout[col] > row-1) {
               wrap.className = "led no_" + parts[col];
               wrap.id = parts[col] + ((col%2)+1) + "_" + (row);
               td.appendChild(wrap);
            }
            tr.appendChild(td);
         }
         td = document.createElement('td');
         td.className = 'bit';
         td.innerHTML = Math.pow(2,row - 1);
         tr.appendChild(td);
         $("clockbody").appendChild(tr);
      }
      
      tr = document.createElement('tr');
      
      for (var i=0; i<8; i++) {
         td = document.createElement('td');
         td.className = 'digits';
         td.id = 'col' + (i+1);
         tr.appendChild(td);
      }
      $("clockbody").appendChild(tr);

      setTimeout(updateClock, 1000);
   }
   init();
})();

