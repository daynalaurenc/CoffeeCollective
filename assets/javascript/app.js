$(document).ready(function (){
    //$('select').css("display","inline");
    //$('select').formSelect();
    
 
    var zipToSearch = "";
    var startCount = 1;
    var displayCount = 0;
  
   var SacZipCodes = [95843,95864,95825,95821,95608,95610,95621,95638,95615,95757,
                                 95758,95624,95626,95628,95828,95630,95842,95632,95639,95641,
                                 95655,95652,95841,95660,95662,95827,95742,95670,95683,95673,95826,95680,95837,
                                 95816,95819,95811,95814,95832,95817,95835,95833,95820,95838,95824,95818,95834,
                                 95815,95831,95822,95823,95829,95830,95690,95693];
 
                                 
 
 function renderZips(array){
 
     for (var i=0; i<array.length; i++){
         var zip = $("<option>");
         zip.attr("value", i+1);
         zip.text(array[i]);
         $("#zips").append(zip);
         $('select').formSelect();
     }
 };
 
 $('select').on('change', function() {
     zipToSearch = ( $(this).find(":selected").text() );
      });
  
      
 var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
       
  
 function renderShops(){
 
 console.log(zipToSearch);
     $.ajax({
       url: queryURL,
       method: "GET",
       
     }).then(function(response) {
         console.log(response);
 
         for (var i = 0; i< response.items.length; i++){
             if (response.items[i].pagemap.localbusiness === undefined || 
                 response.items[i].pagemap.postaladdress[0].addressregion !== "CA" ||
                 response.items[i].pagemap.review === undefined ||
                 response.items[i].title.includes("CLOSED")){
                 console.log("not valid");
             
             }
             else{
                 console.log(response.items[i].pagemap.localbusiness[0].name);
                 displayCount++;
 
                 var makeGrid = $("<div>");
                 makeGrid.addClass("col s12 m7");
                 $(".locations").append(makeGrid);
 
                 var makeCard = $("<div>");
                 makeCard.addClass("card horizontal card-small");
                 makeGrid.append(makeCard);
 
                 var makeImgDiv = $("<div>");
                 makeImgDiv.addClass("card-image");
                 makeCard.append(makeImgDiv);
 
                 var makeImg = $("<img>");
                 makeImg.attr("src", response.items[i].pagemap.review[0].image_url);
                 makeImgDiv.append(makeImg);
 
                 var makeDivStacked = $("<div>");
                 makeDivStacked.addClass("card-stacked");
                 makeCard.append(makeDivStacked);
 
                 var makeCardContent = $("<div>");
                 makeCardContent.addClass("card-content");
                 makeCardContent.append("<h5>"+response.items[i].pagemap.localbusiness[0].name + "</h5> <br>");
                 makeCardContent.append("<p>"+response.items[i].pagemap.postaladdress[0].streetaddress + "</p>");
                 makeCardContent.append("<p>"+response.items[i].pagemap.postaladdress[0].addresslocality + "</p>");
                 makeCardContent.append("<p>"+response.items[i].pagemap.postaladdress[0].postalcode + "</p>");
                 
                 makeDivStacked.append(makeCardContent);
 
                 var makeCardAction = $("<div>");
                 makeCardAction.addClass("card-action");
 
                 //could do buttons instead of link??////
                 var formLink = $("<a>");
                 formLink.attr("href", "#");
                 formLink.text("Submit a Review Please!")
 
                 var showReview = $("<a>");
                 showReview.attr("id", response.items[i].pagemap.localbusiness[0].name + "_"+response.items[i].pagemap.postaladdress[0].streetaddress)
                 showReview.attr("href", "#");
 
                 showReview.text("Display reviews");
                 makeCardAction.append(formLink, showReview);
                 makeDivStacked.append(makeCardAction);
 
             }        
         }
       
                 console.log(displayCount);
 
                 if (displayCount < 10){
                     console.log("leo is here")
                     startCount+=10;
                     queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
                     console.log(queryURL);
                     console.log(startCount);
                     renderShops();
                 }
 
                
     });
     
 
 };
 renderZips(SacZipCodes);
 //renderShops();
 
 
 $("#button").on("click", function(){
     $(".card-small").remove();
     displayCount =0;
     startCount+=10;
     queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
     console.log("button clicked");
     console.log(startCount);
     console.log(queryURL);
     renderShops();
 });
 
 });

 function initMap() {
    // New map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:38.5816, lng:-121.4944},
      zoom: 10,
    // Styles a map in Silver
      styles: [
        {
          "elementType": "geometry",
          "stylers": [{"color": "#f5f5f5"}]
        },
        {
          "elementType": "labels.icon",
          "stylers": [{"visibility": "off"}]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#616161"}]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{"color": "#f5f5f5"}]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#bdbdbd"}]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{"color": "#eeeeee"}]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#757575"}]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{"color": "#e5e5e5"}]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#9e9e9e"}]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{"color": "#ffffff"}]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#757575"}]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{"color": "#dadada"}]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#616161"}]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#9e9e9e"}]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{"color": "#e5e5e5"}]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{"color": "#eeeeee"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#c9c9c9"}]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#9e9e9e"}]
        }
      ]
    });
    // Listen for click on map
    google.maps.event.addListener(map, 'click', 
    function(event){
    // Add marker
      addMarker({coords:event.latLng});
    });
    var markers = [
        {
          coords:{lat:38.5639, lng:-121.4724},
          content:'<h1>Temple Coffee</h1>'
        },
        {
          coords:{lat:38.5750, lng:-121.4843},
          content:'<h1>Old Soul Co.</h1>'
        },
        {
          coords:{lat:38.7442, lng:-121.2876}
        }
      ];
  
      // Loop through markers
      for(var i = 0; i < markers.length; i++){
        addMarker(markers[i]);
      }
  
        // Add Marker Function
        function addMarker(props){
        //   var image = {
        //       url: ''
        //   }
          var marker = new google.maps.Marker({
            map:map,
            position:props.coords,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon:'images/google-maps-pin-icon-12.jpg'
          });
  
          // Check for custom icon
          if(props.iconImage){
            // Set icon image
            marker.setIcon(props.iconImage);
          }
  
          // Check content
          if(props.content){
            var infoWindow = new google.maps.InfoWindow({
            content: props.content 
            });
  
            marker.addListener('click', function(){
              infoWindow.open(map, marker);
            });
          }
        }


  }