 // Neda test database
  // var config = {
  //   apiKey: "AIzaSyCtH4OTXmHVm159otjwJuZtbzgm4RDidrM",
  //   authDomain: "coffeetest-4ddf6.firebaseapp.com",
  //   databaseURL: "https://coffeetest-4ddf6.firebaseio.com",
  //   projectId: "coffeetest-4ddf6",
  //   storageBucket: "coffeetest-4ddf6.appspot.com",
  //   messagingSenderId: "913444981834"
  // };

// Peter's database
var config = {
  apiKey: "AIzaSyB6gRTOWB-FIaRDTNxJInuXYNP7gkk4Njg",
  authDomain: "coffee-collective.firebaseapp.com",
  databaseURL: "https://coffee-collective.firebaseio.com",
  projectId: "coffee-collective",
  storageBucket: "coffee-collective.appspot.com",
  messagingSenderId: "979553096132"
};
firebase.initializeApp(config);
var database = firebase.database();

// var database = firebase.database();

// database.ref('Markers').on("value", function(snapshot) {
//     //alert('Markers update');
//     var markers = snapshot.val();
//     console.log(markers);
//     // Here is where Google Maps API needs to be called passing the markers data

// });

function initMap() {
      // New map
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:38.5816, lng:-121.4944},
        zoom: 12,
        mapTypeControl: false,
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

          //clear markers in database so old ones dont show on initial map load
      database.ref("Markers").remove();

      database.ref('Markers').on("value", function(snapshot) {
      
        snapshot.forEach(function(child){
          var childs = child.val();
        
          //make a info window with shop title for each marker
          var infowindow = new google.maps.InfoWindow({
          content: childs.content
          });

          //make marker for each shop
          var marker = new google.maps.Marker({
          position: {lat: parseFloat(childs.coords.lat), lng: parseFloat(childs.coords.lng)},
          map: map,
          // animation: google.maps.Animation.DROP,
          // icon: "./assets/images/Coffee Collective.png"
          //icon: "../images/Coffee Collective.png"
          });

          //show infor window when marker is clicked
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
      

          
        });
       

      });
     


    };


  $(document).ready(function (){
 //$('select').css("display","inline");
 //$('select').formSelect();
 

 var zipToSearch = "";
 var startCount = 1;
 var displayCount = 0;
 var markers = [];

 var SacZipCodes = [95605, 95691,95822, 95831, 95833, 95834, 95835, 95836, 95837, 95811, 95814, 95816,
  95630, 95816, 95819, 95816, 95817, 95819, 95811, 95814, 95628, 95610, 95621, 95608, 95815, 95821, 95825, 95841, 95864];

//   var SacZipCodes = [95843,95864,95825,95821,95608,95610,95621,95638,95615,95757,
//                                 95758,95624,95626,95628,95828,95630,95842,95632,95639,95641,
//                                 95655,95652,95841,95660,95662,95827,95742,95670,95683,95673,95826,95680,95837,
//                                 95816,95819,95811,95814,95832,95817,95835,95833,95820,95838,95824,95818,95834,
//                                 95815,95831,95822,95823,95829,95830,95690,95693];


// Firebase code                               
// firebase.initializeApp(config);
// var database = firebase.database();

// FIREBASE listener for updates to markers data
// database.ref('Markers').on("value", function(snapshot) {
//     //alert('Markers update');
//     var markers = snapshot.val();
//     console.log(markers);
//     // Here is where Google Maps API needs to be called passing the markers data
// });

//var api = AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo  
//var api = AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY     
//var api = AIzaSyCpUNjFkodz-yXspwmbP55Hbc_XdH49zQU            
//var api = AIzaSyCpUNjFkodz-yXspwmbP55Hbc_XdH49zQU  
// var api = AIzaSyCw2cie1LwqmgFyan6V5PXnbkkjRUUjwG8  


//****** Do not use key below....it will be a fresh one we use for project demo 
//var api = AIzaSyA6JpXNo_vbjUVfYDdhqaLDfhNw2iu1BZc
//************************************************************************** */
function renderZips(array){

  for (var i=0; i<array.length; i++){
      var zip = $("<option>");
      zip.attr("value", i+1);
      zip.text(array[i]);
      $("#zips").append(zip);
      $('select').formSelect();
  }
};

renderZips(SacZipCodes);

$('select').on('change', function() {
  $(".card-small").remove();
  displayCount = 0;
  startCount = 1;
  database.ref("Markers").remove();
  markers = [];
  initMap();
  zipToSearch = ( $(this).find(":selected").text() );
  console.log(zipToSearch);
  renderShops();
});

//var mapQuestURL = "http://open.mapquestapi.com/geocoding/v1/address?key=mqSsiVGOlUXWSCAUYjt39mqdAEeF6Gld&location=" + address;   
//var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;



function renderShops(){

console.log(zipToSearch);

var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCw2cie1LwqmgFyan6V5PXnbkkjRUUjwG8 &cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
//var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;

  $.ajax({
    url: queryURL,
    method: "GET",
    
  }).then(function(response) {
      console.log(queryURL);
      console.log(response);

      for (var i = 0; i< response.items.length; i++){
          if (response.items[i].pagemap.localbusiness === undefined || 
              response.items[i].pagemap.postaladdress[0].addressregion !== "CA" ||
              response.items[i].pagemap.postaladdress[0].postalcode !== zipToSearch ||
              response.items[i].pagemap.review === undefined ||
              response.items[i].title.includes("CLOSED")){
              console.log("not valid");
          
          }
          else{
              
              generateLatLong(response.items[i]);
              //displayCount++;
              //renderDiv(response.items[i]);

          }        
      }
    
              console.log(displayCount);

              if (displayCount < 10){
                  //console.log("leo is here")
                  startCount+=10;
                  queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCw2cie1LwqmgFyan6V5PXnbkkjRUUjwG8 &cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
                  //queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
                  console.log(queryURL);
                  console.log(startCount);
                  renderShops();
              }
              else if (displayCount >= 10 || startCount >= 100){

                  console.log(markers);

                  //  FIREBASE
          // Update Firebase with complete list of markers
          // $( document ).ajaxComplete(function() {
          //     database.ref('Markers').set(markers);
          //   });
          //database.ref('Markers').set(markers);
          return;
              }

             
  });
  

};



// $("#button").on("click", function(){
//     $(".card-small").remove();
//     displayCount =0;
//     startCount+=10;
//     queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
//     console.log("button clicked");
//     console.log(startCount);
//     console.log(queryURL);
//     database.ref("Markers").remove();
//     markers = [];
//     initMap();
//     renderShops();
// });

$("#button").click(function() {
$([document.documentElement, document.body]).animate({
    scrollTop: $(".locations").offset().top
}, 2000);
});


function generateLatLong(item){
  displayCount++;
  var mapLocation = (item.pagemap.postaladdress[0].streetaddress + " "+
                  item.pagemap.postaladdress[0].addresslocality + " CA");
  var address = mapLocation.split(" ").join("+");
  //var address = mapLocation;
  var addressObj = {
      lat: "",
      lng: ""
  };

 
  console.log(address);
  var mapQuestURL = "http://www.mapquestapi.com/geocoding/v1/address?key=mqSsiVGOlUXWSCAUYjt39mqdAEeF6Gld&location=" + address; 
  $.ajax({
      url: mapQuestURL,
      method: "GET",
      
    }).then(function(response) {

      console.log('lat long generated');
      addressObj.lat = (response.results[0].locations[0].latLng.lat);
      addressObj.lng = (response.results[0].locations[0].latLng.lng);

      console.log('lat, long', addressObj);


      //push title of shop and lat in lng into database for use later to interface with google maps
      markers.push({
          coords:{lat:addressObj.lat, lng:addressObj.lng},
          content:"<h1>" + item.pagemap.localbusiness[0].name + "</h1>"
        });
        
        database.ref('Markers').set(markers);
        
        //database.ref('Markers').push(markers);
      renderDiv(item, addressObj);


      
    });

    return addressObj;
}


function renderDiv(item, addressObj) {
  console.log(item.pagemap.localbusiness[0].name);
  //displayCount++;

  var makeGrid = $("<div>");
  makeGrid.addClass("col");
  $(".locations").append(makeGrid);

  var makeCard = $("<div>");
  makeCard.addClass("card horizontal card-small");
  makeGrid.append(makeCard);

  var makeImgDiv = $("<div>");
  makeImgDiv.addClass("card-image");
  makeCard.append(makeImgDiv);

  var makeImg = $("<img>");
  makeImg.attr("src", item.pagemap.review[0].image_url);
  makeImgDiv.append(makeImg);

  var makeDivStacked = $("<div>");
  makeDivStacked.addClass("card-stacked");
  makeCard.append(makeDivStacked);

  var makeCardContent = $("<div>");
  makeCardContent.addClass("card-content");
  makeCardContent.append("<h5>"+item.pagemap.localbusiness[0].name + "</h5> <br>");
  makeCardContent.append("<p>"+item.pagemap.postaladdress[0].streetaddress + "</p>");
  makeCardContent.append("<p>"+item.pagemap.postaladdress[0].addresslocality + "</p>");
  makeCardContent.append("<p>"+item.pagemap.postaladdress[0].postalcode + "</p>");

  

  //makeCardContent.append("<p>"+addressObj.lat+ "</p>")
  //makeCardContent.append("<p>"+addressObj.lng+ "</p>")

  
  makeDivStacked.append(makeCardContent);

  var makeCardAction = $("<div>");
  makeCardAction.addClass("card-action");

  //could do buttons instead of link??////
  var formLink = $("<a>");
  formLink.attr("href", "#");
  formLink.addClass("write-review");
  formLink.attr("id", item.pagemap.localbusiness[0].name + "_"+item.pagemap.postaladdress[0].streetaddress)
  formLink.html("<i class=material-icons prefix id= reviewIcon>message</i>");
  //formLink.text("Submit a Review Please!")

  var showReview = $("<a>");
  showReview.addClass("show-reviews");
  showReview.attr("id", item.pagemap.localbusiness[0].name + "_"+item.pagemap.postaladdress[0].streetaddress)
  showReview.attr("href", "#");

  showReview.text("Reviews");
  makeCardAction.append(formLink, showReview);
  makeDivStacked.append(makeCardAction);
}
//console.log(markers);

});

  
  

