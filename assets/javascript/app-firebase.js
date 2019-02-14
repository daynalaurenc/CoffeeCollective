// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyB6gRTOWB-FIaRDTNxJInuXYNP7gkk4Njg",
//     authDomain: "coffee-collective.firebaseapp.com",
//     databaseURL: "https://coffee-collective.firebaseio.com",
//     projectId: "coffee-collective",
//     storageBucket: "",
//     messagingSenderId: "979553096132"
// };
var GoogleCustomSearchJSON_API_key = "AIzaSyCKKAaR9MblJ2MBOk7Ek2Wzr0iYZAtCf6Y";
var coffeeShopListItem = {
    name: '',
    streetAddress: '',
    addressLocality: '',
    postalCode: ''
};
var coffeeShopListItems = [];
var firstNames = ['Dave', 'Sandra', 'Michelle', 'Day', 'Neda', 'Nai-Muh', 'Robert',
                 'Alice', 'Susan', 'Nancy', 'Allen', 'Francis', 'William', 'Gail',
                'Betty', 'Steve', 'Richard', 'Paul', 'Charles', 'John', 'Jeanne'];
var lastNames = ['Jones', 'Wang', 'Choi', 'Davis', 'Brooks', 'Johnson', 'Lu',
                'Martinez', 'Cramer', 'Pence', 'Trump', 'Obama', 'Martin', 'Thomas',
                'Jackson', 'Stinson', 'Pearl', 'Rodriquez', 'Sanchez', 'Bingamon', 'Kraft'];
var ratings = ['0 (none)', '1 (not good)', '2 (so so)', '3 (not too bad)', '4 (pretty good)', '5 (outstanding)'];
var SacramentoAreaZipCodes = [
                            95843, 95864, 95825, 95821, 95608,
                            95610, 95621, 95638, 95615, 95757,
                            95758, 95624, 95626, 95628, 95828,
                            95630, 95842, 95632, 95639, 95641,
                            95655, 95652, 95841, 95660, 95662,
                            95827, 95742, 95670, 95683, 95673,
                            95826, 95680, 95837, 95816, 95819,
                            95811, 95814, 95832, 95817, 95835,
                            95833, 95820, 95838, 95824, 95818,
                            95834, 95815, 95831, 95822, 95823,
                            95829, 95830, 95690, 95693
                        ];
var coffeeShop = {
    name: 'my coffee shop',
    address: '1234 Park Ave',
    zipCode: '95674',
    coffeShopReviews: []
}                
var coffeeShopReview = {
    reviewerUsername: 'Mary Allen',
    reviewerEmail: 'mallen@gmail.com',
    shopName: 'Falcon Coffee',
    shopAddress: '12345 South North Street',
    categoryRatings: {
        wifi: 'none',
        powerOutlets: 'none',
        food: 'none',
        alternativeBeverages: 'none',
        spaceForMeetings: 'none',
        parking: 'none',
        overall: 'none'
    }
}
var chartAvgRatingData = [2.3, 1.5, 2.65, .75, 3, 2,5, 1.75];
var avgRatings = {
    wifi: [0, 0],
    powerOutlets: [0, 0],
    food: [0, 0],
    alternativeBeverages: [0, 0],
    spaceForMeetings: [0, 0],
    parking: [0, 0],
    overall: [0, 0],
    avg_wifi: 0,
    avg_powerOutlets: 0,
    avg_food: 0,
    avg_alternativeBeverages: 0,
    avg_spaceForMeetings: 0,
    avg_parking: 0,
    avg_overall: 0
}
var displayCount;
var queryCount;
var totalQueries;
var currentCoffeeShop = "";

// firebase.initializeApp(config);
var database = firebase.database();
database.ref().on('value', function(snapshot) {
    // event.preventDefault();
    var keys = Object.keys(snapshot.val());
    console.log('Number of coffee shops in Firebase database='+ keys.length);
});
$('#add-review-button').attr("disabled", "disabled");
initializeReviewFormDropdowns();
// populateCoffeeShopList();
//__________________________________________
//  FUNCTIONS
//__________________________________________
function initializeReviewFormDropdowns() {
    // This function forces the dropdowns in the review form to effectively have no 
    //  initial value. We do this to validate user inputs before allowing them to
    // submit the review, i.e., they must have explicitly selected a value for each of 
    // of the 
    $("#food-rating").prop("selectedIndex", -1);
    $("#parking-rating").prop("selectedIndex", -1);
    $("#power-outlets-rating").prop("selectedIndex", -1);
    $("#meeting-space-rating").prop("selectedIndex", -1);
    $("#wifi-rating").prop("selectedIndex", -1);
    $("#beverage-alternative-rating").prop("selectedIndex", -1);
    $("#food-rating").prop("selectedIndex", -1);
    $("#overall-rating").prop("selectedIndex", -1);
}
function populateCoffeeShopList() {
    database.ref().on("value", function(snapshot) {
        // event.preventDefault();
        var $coffeeShopsList = $('#coffee-shops');
        var $coffeeShopZipCodesList = $('#coffee-shop-zipcode');
        var keys = Object.keys(snapshot.val());
        var data = snapshot.val();
        for (i=0;i<keys.length;i++) {
            // console.log(keys[i]);
            $coffeeShopsList.append($('<option></option>').val(keys[i]).html(keys[i]));
        } 
        var zipCodes = [];
        snapshot.forEach(function(childElement) {
            var data = childElement.val();
            childElement.forEach(function(thisData) {
                var dataPoint = thisData.val()
                zipCodes.push(dataPoint.shopZipcode);
            });
        });
        // Remove duplicates from zip code list and display list of unique zip codes
        zipCodes.sort();
        var uniqueZipCodes = [];
        uniqueZipCodes.push(zipCodes[0]);
        for (i=0;i<zipCodes.length-1;i++) {
            if (zipCodes[i+1]!=zipCodes[i]) {
                uniqueZipCodes.push(zipCodes[i+1]);
            }
        }
        for (i=0;i<uniqueZipCodes.length;i++) {
            $coffeeShopZipCodesList.append($('<option></option>').val(uniqueZipCodes[i]).html(uniqueZipCodes[i]));
        }
        // alert('Total zip codes=' + uniqueZipCodes.length + ' total shops=' + keys.length);
        showCoffeeShopInformation($("#coffee-shops").find(":selected").text());
    });
}
function refreshBarChart(avgRatings, coffeeShopName, coffeeShopAddress) {
    alert("Updating chart");
    var chartArea = $('#bar-chart');
    // window.chart = new Chart(chartArea, {});
    var chartData = [];
    chartData.push(avgRatings.avg_wifi);
    chartData.push(avgRatings.avg_food);
    chartData.push(avgRatings.avg_powerOutlets);
    chartData.push(avgRatings.avg_alternativeBeverages);
    chartData.push(avgRatings.avg_spaceForMeetings);
    chartData.push(avgRatings.avg_parking);
    chartData.push(avgRatings.avg_overall);
    
    var chartText = "Average Category Ratings for " + coffeeShopName + " at " + coffeeShopAddress;
    var myBarChart = new Chart(chartArea, {
        type: 'bar',
        data: {
            labels: ["Wifi", "Food", "Power outlets", "Beverage alternatives", "Meeting space", "Parking", "Overall"],
            datasets: [
                {
                label: 'average across all reviews',
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", 'rgb(100, 5, 30)', 'rgb(50, 200, 75)'],
                data: chartData
                }
            ]
        },
        options: {
            responsive: true,
            legend: { display: false },
            title: {
                display: true,
                text: chartText
            },
            scales: {
                yAxes: [{
                  barPercentage: 0.5,
                  ticks: {
                    min: 0,
                    max: 5,
                    stepSize: 1
                  }
                }]
            }
        }
    });
}
//  This function gets the coffee shop key from the selected DOM element
function getCoffeeShopKey(selectedDOMelement) {
    return selectedDOMelement.attr('id');
}
function showCoffeeShopInformation(coffeeShopKey) {
    // var selectedElement = $("#coffee-shops").find(":selected").text();
    var selectedElement = coffeeShopKey;
    var shopName;
    var shopAddress;
    var shopZipcode;
    // console.log(components);
    // $("#coffee-shop-name").val(components[0]);
    // $("#coffee-shop-address").val(components[1]);
    var numReviews = 0;
    database.ref(selectedElement).on("value", function(myData) {
        myData.forEach(function(reviewData) {
            if (numReviews == 0) {
                var dataPoint = reviewData.val();
                console.log('Zip code=' + dataPoint.shopZipcode);
                shopName = dataPoint.shopName;
                shopAddress = dataPoint.shopAddress;
                shopZipcode = dataPoint.shopZipcode;
                $('#coffee-shop-name').val(dataPoint.shopName)
                $('#coffee-shop-address').val(shopAddress);    
            }
            numReviews++;
        });
    });
    // populate the display-only fields in the Review section of the page
    // $('#coffee-shop-zipcode').text(shopZipcode);
    // alert('Zip code=' + thisCoffeShop.shopZipcode);

    var $numReviews = $("#reviews-number-value");
    if (numReviews == 1) {
        $("#reviews-number-value").text(numReviews + ' review');
    } else {
        $("#reviews-number-value").text(numReviews + ' reviews');
    }
    // $('#bar-chart').empty();
    $('#review').empty();
}
function getCoffeeShopReviews(coffeShopKey) {
    event.preventDefault();
    $reviews = $('#review');
    $reviews.empty();
    $reviews.append('<canvas id="bar-chart"></canvas>');
    var $coffeeShopName = $('#coffee-shop-name').val();
    var $coffeeShopAddress = $('#coffee-shop-address').val();
    var key = $coffeeShopName + "_" + $coffeeShopAddress;
    var key = coffeShopKey;
    var reviews = [];
    var elements = [];
    var $reviewDivs = [];
    database.ref(key).on("value", function(snapshot) {
        // event.preventDefault();
        snapshot.forEach(function(data) {
            reviews.push(data);
        });
    });
    // Compute average ratings for each category

    avgRatings.wifi[0] = 0;
    avgRatings.wifi[1] = 0;
    avgRatings.powerOutlets[0] = 0;
    avgRatings.powerOutlets[1] = 0;
    avgRatings.alternativeBeverages[0] = 0;
    avgRatings.alternativeBeverages[1] = 0;
    avgRatings.spaceForMeetings[0] = 0;
    avgRatings.spaceForMeetings[1] = 0;
    avgRatings.parking[0] = 0;
    avgRatings.parking[1] = 0;
    avgRatings.food[0] = 0;
    avgRatings.food[1] = 0;
    avgRatings.overall[0] = 0;
    avgRatings.overall[1] = 0;
    avgRatings.avg_wifi = 0;
    avgRatings.avg_powerOutlets = 0;
    avgRatings.avg_alternativeBeverages = 0;
    avgRatings.avg_spaceForMeetings = 0;
    avgRatings.avg_parking = 0;
    avgRatings.avg_overall = 0;
    avgRatings.avg_food = 0;
    
    $reviews.append("Number of reviews=" + reviews.length);
    for (i=0;i<reviews.length;i++) {
        $reviewDivs.push($('<div id="review-details"></div>'));
        // var $newDiv = $('<div id="review-details"></div>');
        $reviewDivs[i].append('<p>Reviewer name=' + reviews[i].child('reviewerUsername').val() +
            ' Reviewer email=' + reviews[i].child('reviewerEmail').val() + '</p>');
        // wifi
        $reviewDivs[i].append('<p>Wifi rating=' + 
            reviews[i].child('categoryRatings').child('wifi').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('wifi').val().split(' ');
        avgRatings.wifi[0] += Number(elements[0]);
        avgRatings.wifi[1] += 1;

        // power outlets
        $reviewDivs[i].append('<p>Power outlets rating=' + 
            reviews[i].child('categoryRatings').child('powerOutlets').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('powerOutlets').val().split(' ');
        avgRatings.powerOutlets[0] += Number(elements[0]);
        avgRatings.powerOutlets[1] += 1;

        // food
        $reviewDivs[i].append('<p>Food rating=' + 
            reviews[i].child('categoryRatings').child('food').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('food').val().split(' ');
        avgRatings.food[0] += Number(elements[0]);
        avgRatings.food[1] += 1;

        // alternative beverages
        $reviewDivs[i].append('<p>Alternative beverages rating=' + 
            reviews[i].child('categoryRatings').child('alternativeBeverages').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('alternativeBeverages').val().split(' ');
        avgRatings.alternativeBeverages[0] += Number(elements[0]);
        avgRatings.alternativeBeverages[1] += 1;

        // space for meetings
        $reviewDivs[i].append('<p>Space for meetings rating=' + 
            reviews[i].child('categoryRatings').child('spaceForMeetings').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('spaceForMeetings').val().split(' ');
        avgRatings.spaceForMeetings[0] += Number(elements[0]);
        avgRatings.spaceForMeetings[1] += 1;

        // parking
        $reviewDivs[i].append('<p>Parking rating=' + 
            reviews[i].child('categoryRatings').child('parking').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('parking').val().split(' ');
        avgRatings.parking[0] += Number(elements[0]);
        avgRatings.parking[1] += 1;

        // overall
        $reviewDivs[i].append('<p>Overall rating=' + 
            reviews[i].child('categoryRatings').child('overall').val() + '</p>');
        elements = reviews[i].child('categoryRatings').child('overall').val().split(' ');
        avgRatings.overall[0] += Number(elements[0]);
        avgRatings.overall[1] += 1;
        // $reviews.append($newDiv);
    }
    avgRatings.avg_wifi = avgRatings.wifi[0]/avgRatings.wifi[1];
    avgRatings.avg_food = avgRatings.food[0]/avgRatings.food[1];
    avgRatings.avg_parking = avgRatings.parking[0]/avgRatings.parking[1];
    avgRatings.avg_powerOutlets = avgRatings.powerOutlets[0]/avgRatings.powerOutlets[1];
    avgRatings.avg_spaceForMeetings = avgRatings.spaceForMeetings[0]/avgRatings.spaceForMeetings[1];
    avgRatings.avg_alternativeBeverages = avgRatings.alternativeBeverages[0]/avgRatings.alternativeBeverages[1];
    avgRatings.avg_overall = avgRatings.overall[0]/avgRatings.overall[1];
    $avgRatingsDiv = $('<div id="avg-ratings"></div>');
    $avgRatingsDiv.append('<h3>Average Ratings</h>');
    $avgRatingsDiv.append('Wifi=' + avgRatings.avg_wifi.toFixed(2) + '<br>')
    $avgRatingsDiv.append('Food=' + avgRatings.avg_food.toFixed(2) + '<br>')
    $avgRatingsDiv.append('Power outlets=' + avgRatings.avg_powerOutlets.toFixed(2) + '<br>')
    $avgRatingsDiv.append('Parking=' + avgRatings.avg_parking.toFixed(2) + '<br>')
    $avgRatingsDiv.append('Meeting spaces=' + avgRatings.avg_spaceForMeetings.toFixed(2) + '<br>')
    $avgRatingsDiv.append('Alternative beverages =' + avgRatings.avg_alternativeBeverages.toFixed(2) + '<br>')
    $avgRatingsDiv.append('Overall =' + avgRatings.avg_overall.toFixed(2) + '<br>')
    $reviews.append($avgRatingsDiv);
    for (i=0;i<$reviewDivs.length;i++) {
        $reviews.append($reviewDivs[i]);
    }
    console.log('Reviews', avgRatings);
    alert('Refreshing chart for ' + reviews.length + ' reviews');
    refreshBarChart(avgRatings, $coffeeShopName, $coffeeShopAddress);
}
$("#hide-show-button").on('click', function() {
    if ($('#my-form').is(':visible')) {
        // alert("Hiding form");
        $('#my-form').hide();
    } else {
        // alert("Showing form");
        $('#my-form').show();
    }
});
$("#add-review-button").on('click', function(){

    //currentCoffeeShop = $("#coffee-shops").val();

    pushCoffeeShopReviewToDatabase($("#coffee-shop-name").val(),
                                    $("#coffee-shop-address").val(),
                                    $("#coffee-shop-zipcode").val(),
                                    $("#reviewers-name").val(),
                                    $("#reviewers-email").val(),
                                    $("#food-rating").val(),
                                    $("#parking-rating").val(),
                                    $("#power-outlets-rating").val(),
                                    $("#meeting-space-rating").val(),
                                    $("#wifi-rating").val(),
                                    $("#beverage-alternative-rating").val(),
                                    $("#overall-rating").val());
    // Force dropdown to return to original value
});
$("#my-form :input").change(function() {
    var disable=false;
    $('#my-form').find('select').each(function(){ 
        if ($(this).prop('selectedIndex')==-1) {
            disable=true;
        }
    });
    if (disable) {
        $('#add-review-button').attr("disabled", "disabled");
    } else {
        $('#add-review-button').removeAttr("disabled");
    }
  });

$('#generate-dummy-data-button').on('click', executeAJAXzipCodeQueries);
function generateDummyData() {
    var reviewerUsername;
    var reviewerEmail;
    var foodRating;
    var parkingRating;
    var powerOutletsRating;
    var spaceForMeetingsRating
    var wifiRating;
    var alternativeBeveragesRating;
    var firstNameIndex;
    var lastNameIndex;

    alert('Generating dummy data for ' + coffeeShopListItems.length + ' coffee shops');
    for (var i=0;i<coffeeShopListItems.length;i++) {
        firstNameIndex = Math.floor(Math.random() * firstNames.length);
        lastNameIndex = Math.floor(Math.random() * lastNames.length);
        reviewerUsername = firstNames[firstNameIndex] + " " + lastNames[lastNameIndex];
        reviewerEmail = lastNames[lastNameIndex] + "@gmail.com";
        foodRating = ratings[Math.floor(Math.random() * ratings.length)];
        parkingRating = ratings[Math.floor(Math.random() * ratings.length)];
        powerOutletsRating = ratings[Math.floor(Math.random() * ratings.length)];
        spaceForMeetingsRating = ratings[Math.floor(Math.random() * ratings.length)]
        wifiRating = ratings[Math.floor(Math.random() * ratings.length)];
        alternativeBeveragesRating = ratings[Math.floor(Math.random() * ratings.length)];
        overallRating = ratings[Math.floor(Math.random() * ratings.length)];
        if (overallRating == 0) {
            overallRating = 1;  // must be at least a 1 value for overall rating
        }
        alert('generateDummyData: Coffee shop=' + coffeeShopListItems[i].name);
        pushCoffeeShopReviewToDatabase(coffeeShopListItems[i].name, 
                                        coffeeShopListItems[i].streetAddress, 
                                        coffeeShopListItems[i].postalCode,
                                        reviewerUsername,
                                        reviewerEmail,
                                        foodRating,
                                        parkingRating,
                                        powerOutletsRating,
                                        spaceForMeetingsRating,
                                        wifiRating,
                                        alternativeBeveragesRating,
                                        overallRating);
    }
    alert('Successfully generated dummy review for ' + coffeeShopListItems.length + ' coffee shops');
}
function pushCoffeeShopReviewToDatabase(shopName, 
                                        shopAddress, 
                                        shopZipcode,
                                        reviewerUsername,
                                        reviewerEmail,
                                        foodRating,
                                        parkingRating,
                                        powerOutletsRating,
                                        spaceForMeetingsRating,
                                        wifiRating,
                                        alternativeBeveragesRating,
                                        overallRating) 
{
    coffeeShopReview.shopName = shopName;
    coffeeShopReview.shopAddress = shopAddress;
    coffeeShopReview.shopZipcode = shopZipcode;
    coffeeShopReview.reviewerUsername = reviewerUsername;
    coffeeShopReview.reviewerEmail = reviewerEmail;
    coffeeShopReview.categoryRatings.food = foodRating;
    coffeeShopReview.categoryRatings.parking = parkingRating;
    coffeeShopReview.categoryRatings.powerOutlets = powerOutletsRating;
    coffeeShopReview.categoryRatings.spaceForMeetings = spaceForMeetingsRating;
    coffeeShopReview.categoryRatings.wifi = wifiRating;
    coffeeShopReview.categoryRatings.alternativeBeverages = alternativeBeveragesRating;
    coffeeShopReview.categoryRatings.overall = overallRating;
    var key = coffeeShopReview.shopName + '_' + coffeeShopReview.shopAddress;
    database.ref(key).push(coffeeShopReview);
    alert('pushCoffeeShopReviewToDatabase: Database updated for coffee shop=' + coffeeShopReview.shopName);
}
function executeAJAXzipCodeQueries(event) {
    var NedasAPIkey = "AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA";
    var startCount = 1;
    var queryURL;
    var APIkey = GoogleCustomSearchJSON_API_key;
    event.preventDefault();
    displayCount = 0;
    queryCount = 0;
    totalQueries = SacramentoAreaZipCodes.length;
    coffeeShopListItems = [];
    for (i=0;i<SacramentoAreaZipCodes.length;i++)
    {
        queryURL = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + 
            SacramentoAreaZipCodes[i] + "&start=" + startCount;
        // alert('Generating dummy data');
        getShopsData(queryURL);
        // alert("Number of shops found at zip code=" + SacramentoAreaZipCodes[i] + "=" + coffeeShopListItems.length);
    }
  }
  function AJAXqueryComplete() {
    //   alert('Completed AJAX query #' + queryCount);
  }
  $( document ).ajaxComplete(function() {
    AJAXqueryComplete();
  });
  function getShopsData(queryURL){
    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
        // console.log(response);
        // alert("Response");
        queryCount++;
        for (var i = 0; i< response.items.length; i++){
            if (response.items[i].pagemap.localbusiness === undefined || 
                response.items[i].pagemap.review === undefined ||
                response.items[i].title.includes("CLOSED")){
                // console.log("not valid - response.items.length=" + response.items.length + " item=" + i);           
            }
            else{
                console.log(response.items[i].pagemap.localbusiness[0].name);
                displayCount++;
                var newObject = {};
                newObject.name = response.items[i].pagemap.localbusiness[0].name;
                newObject.streetAddress = response.items[i].pagemap.postaladdress[0].streetaddress;
                newObject.addresslocality = response.items[i].pagemap.postaladdress[0].addresslocality;
                newObject.postalCode = response.items[i].pagemap.postaladdress[0].postalcode;
                coffeeShopListItems.push(newObject);
            }
        }
        if (totalQueries == queryCount) {
            generateDummyData(); 
        }                
    });
};
//____________________________
//  DOM element event handlers
//________________________________________________
//  event handlers for writing and reading reviews
$('.show-reviews').on('click', function() {
    var coffeShopKey = $(this).attr('id');
    alert("Showing reviews for " + coffeShopKey);
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".reviews").offset().top
    }, 2000);
    getCoffeeShopReviews(coffeShopKey);
});

$('#coffee-shop-zipcode').on('change', function () {
//  List only coffee shops in this zip code
    var coffeeShopsInZipCode = [];
    var $coffeeShopsList = $('#coffee-shops');
    $coffeeShopsList.empty();
    var selectedZipCode = $(this).val();
    database.ref().on('value', function(snapshot) {
        snapshot.forEach(function(childElement) {
            childElement.forEach(function(thisData) {
                var dataPoint = thisData.val();
                if (selectedZipCode === dataPoint.shopZipcode) {
                    coffeeShopsInZipCode.push(dataPoint.shopName + '_' + dataPoint.shopAddress);
                }
            });
        });
    });
    coffeeShopsInZipCode.sort();
    $coffeeShopsList.append($('<option></option>').val(coffeeShopsInZipCode[0]).html(coffeeShopsInZipCode[0]));
    for (i=0;i<coffeeShopsInZipCode.length-1;i++) {
        if (coffeeShopsInZipCode[i] != coffeeShopsInZipCode[i+1]) {
            $coffeeShopsList.append($('<option></option>').val(coffeeShopsInZipCode[i+1]).html(coffeeShopsInZipCode[i+1]));
        }
    }
    showCoffeeShopInformation($("#coffee-shops").find(":selected").text());
});
//
//_____________________________________________________________________
//  event handler for displaying the reviews for a selected coffee shop
$(document).on('click', '.show-reviews', function() {
    var coffeShopKey = $(this).attr('id');
    alert("Showing reviews for " + coffeShopKey);
    getCoffeeShopReviews(coffeShopKey);
    // TO-DO: Add code to scroll to the DOM element where the reviews are displayed
});

$('#show-reviews-button').on('click', function() {
    var coffeShopKey = $('#coffee-shop-name').val() + '_' + $('#coffee-shop-address').val();
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".reviews").offset().top
    }, 2000);
    alert("Showing reviews for " + coffeShopKey);
    getCoffeeShopReviews(coffeShopKey);
    // TO-DO: Add code to scroll to the DOM element where the reviews are displayed
});
//__________________________________________________________________
//  on-click event handler for when the user wants to write a review
//  for a particular coffee shop that appeared in the list of coffee
//  shops displayed for the selected zip code
$(document).on('click', '.write-review', function(event) {
    //  build the query key for Firebase using the contents of the ID for the
    //  DOM element that was clicked
    var coffeeShopKey = $(this).attr('id');
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#feedback").offset().top
    }, 2000);
    alert('Write a review for coffee shop=' + coffeeShopKey);
    showCoffeeShopInformation(coffeeShopKey);
    var numReviews = 0;
    // database.ref(coffeeShopKey).on('value', function(data) {
    //     data.forEach(function(reviewData) {
    //         var dataPoint = reviewData.val();
    //         console.log('Zip code=' + dataPoint.shopZipcode);
    //         var shopZipcode = dataPoint.shopZipcode;
    //         numReviews++;
    //         if (numReviews == 1) {
    //             // populate the display-only fields in the Review section of the page
    //             $('#coffee-shop-name').text(dataPoint.shopName);
    //             $('#coffee-shop-address').text(dataPoint.shopAddress);
    //             $('#coffee-shop-zipcode').text(dataPoint.shopZipcode);
    //         }
    //     });
    // });  
});
//___________________________________________________________________
//  Event handler for submitting a completed review for a coffee shop
$("#add-review-button").on('click', function(){
    alert('Adding review');
    pushCoffeeShopReviewToDatabase($("#coffee-shop-name").val(),
                                    $("#coffee-shop-address").val(),
                                    $("#coffee-shop-zipcode").val(),
                                    $("#reviewers-name").val(),
                                    $("#reviewers-email").val(),
                                    $("#food-rating").val(),
                                    $("#parking-rating").val(),
                                    $("#power-outlets-rating").val(),
                                    $("#meeting-space-rating").val(),
                                    $("#wifi-rating").val(),
                                    $("#beverage-alternative-rating").val(),
                                    $("#overall-rating").val());
    // Force dropdown to return to original value
});
//_____________________________________________
//  Event handler for validating user inputs for a coffee shop review
$('.form-control').on('change', function(event) {
    // This function does user input validation and checks whether or not the user has
    //  set a value for each of the required select inputs in the review form
    var disable=false;
    if ($('#wifi-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    if ($('#power-outlets-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    if ($('#food-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    if ($('#beverage-alternative-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    if ($('#meeting-space-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    if ($('#parking-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    if ($('#overall-rating').prop('selectedIndex')==-1) {
        disable=True;
    }
    // Following code doesn't work in Materialize
    // $('#my-form').find('select').each(function(){ 
    //     $(this).attr('id');
    //     alert('Selected=' + $(this).prop('selectedIndex'));
    //     if ($(this).prop('selectedIndex')==-1) {
    //         disable=true;
    //     }
    // });
    if (disable) {
        $('#add-review-button').attr("disabled", "disabled");
    } else {
        $('#add-review-button').removeAttr("disabled");
    }
    console.log('add-review-button state=' + disable);
  });
//____________________________________________________________________________________________________
// TEST CODE SECTION: These event handlers are only used for testing functionality of the web page
//
//  Event handler for responding to button to generate dummy customer review data
$('#generate-dummy-data-button').on('click', executeAJAXzipCodeQueries);

$("#hide-show-button").on('click', function() {
    if ($('#my-form').is(':visible')) {
        // alert("Hiding form");
        $('#my-form').hide();
    } else {
        // alert("Showing form");
        $('#my-form').show();
    }
});
//  This code is effectively the same code used when the user clicks on the "Write a review"
$("#coffee-shops").on('change', function(event) {
    event.preventDefault();
    alert("Coffee shop change");
    var coffeeShopKey = $("#coffee-shops").find(":selected").text();
    showCoffeeShopInformation(coffeeShopKey);
});




