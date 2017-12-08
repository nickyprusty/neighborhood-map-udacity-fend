
//initialise the map
var map;
var marker;

function initMap(){
	"use strict";
	map = new google.maps.Map(document.getElementById('map'),{
	center:{lat: 20.299727,lng: 85.817264},
	zoom: 12,
	disableDefaultUI: true
});

ko.applyBindings(new ViewModel());
}

// //check for server error
function serverError() {
	"use strict";
	window.alert("Server Error");
}


// //array containing the co-ordinates of the tourist places
var locations=[
	{name:'Appetite', lat:20.2919562, lng:85.84307489999992, id: "4fa7e3b9e4b0fd4c40bd4970"},
	{name: 'Green ChillyZ The Fast Food Restaurant', lat:20.2700875, lng:85.81273280000005, id:"4c5ac54cb1aa9c74c1750c49"},
	{name: 'Mamma Mia (Cafe)', lat:20.300356, lng:85.819436, id:"4e589f10483b865169d360eb" },
	{name: 'Mainland China', lat:20.2923078, lng:85.8187805, id:"4da84de37aba67f9d9619c29"},
	{name: 'CCD', lat:20.2770114, lng:85.84394080000004, id:"509cab3ee4b005ecff356589"},
	{name: 'Silver Streak', lat:20.286431, lng:85.81139800000005, id:"4ef48637b6342877b84cf915"},
	{name: 'Berry Cafe', lat:20.259383, lng:85.8377001, id:"516d4e05e4b022109a24974d"},
	{name: 'Dominos Pizza', lat:20.3533244, lng:85.82437759999993, id:"51a5b2fe498e4707cf9ae13d"},
	{name: 'Hotel Swosti Grand', lat:20.2698419, lng:85.84175119999998, id:"4de9fe971f6e3ddebdbfca43"},
	{name: 'Subway', lat:20.298519, lng:85.82322899999997, id:"51076439e4b0addb49672048"},
	{name: 'Tangerine 9', lat:20.269411, lng:85.84162519999995, id:"4d467c332e326ea826b5f7a6"},
];

//the tourist places details constructor using knockout
var Spot = function(data){
	"use strict";
	//information we obtain from the locations array
	this.name= ko.observable(data.name);
	this.lat= ko.observable(data.lat);
	this.lng=ko.observable(data.lng);
	this.id = ko.observable(data.id);
	this.marker=ko.observable();
	//information to be obtained from third party
	this.number=ko.observable('');
	this.address=ko.observable('');
	this.url= ko.observable('');
	this.information= ko.observable('');
}

// //creating the ViewModel

var ViewModel = function(){
	"use strict";
	var self = this;
	//link the model and view using an array
	this.myArray= ko.observableArray([]);
	//create Spot object for each location
	locations.forEach(function(hotSpot){
		self.myArray.push(new Spot(hotSpot));
	});

	//initialising the infoWindow
	var largeInfowindow = new google.maps.InfoWindow({
		maxWidth: 300,
	});

	//get the markers on each tourist spot
	//credit https://github.com/kacymckibben/project-5-app.git
	self.myArray().forEach(function(hotSpot){
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(hotSpot.lat(), hotSpot.lng()),
			title: hotSpot.name(),
			map: map,
		});
		hotSpot.marker=marker;


		//ajax request to foursqure for information
		//credits https://github.com/reubenkcoutinho/udacity-fend-neighbourhood-map
		$.ajax({
			url:'https://api.foursquare.com/v2/venues/' + hotSpot.id() +
            '?client_id=UTEUH3OGF5Y5JDIRKJAHZQXIVVCCPXKJBQ0VRBN3WA30MCV2&client_secret=D4BIIOL4FEE1VD52PVXG5C03WCT2VTPKR3LIMVEWBXXMNXGI&v=20130815',
            dataType: "json",
			//if the search is a success
			success: function(data){
				var output = data.response.venue;
				var contact = output.hasOwnProperty('contact') ? output.contact : '';
                if (contact.hasOwnProperty('formattedPhone')) {
                    hotSpot.number(contact.formattedPhone || '');
                }
                var location = output.hasOwnProperty('location') ? output.location : '';
                if (location.hasOwnProperty('address')) {
                    hotSpot.address(location.address || '');
                }
                var url = output.hasOwnProperty('url') ? output.url : '';
                hotSpot.url(url || '');

                //information shown in the infowindow
                //source: https://discussions.udacity.com/t/trouble-with-infowindows-and-contentstring/39853/14
                var information='<div id="popup"><h4>'+hotSpot.name()+'</h4><p>information obtained:</p><p>'+hotSpot.number()+'</p><p>'+hotSpot.address()+'</p><p><a href='+hotSpot.url()+'>'+hotSpot.url()+'</a></p></div>'
				 
			

				//add the infowindow to marker when clicked
				 google.maps.event.addListener(hotSpot.marker, 'click', function () {
                    largeInfowindow.open(map, this);
                    hotSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        hotSpot.marker.setAnimation(null);
                    }, 500);
                    largeInfowindow.setContent(information);
                    map.setCenter(hotSpot.marker.getPosition());
                });
			},

			//error handling
			error: function(e){
				// largeInfowindow.setContent('');
        		largeInfowindow.setContent('<h2>' + marker.title + '</h2><div class="info info_error">Something went wrong</div>');
        		document.getElementById("error").innerHTML = "<h5>foursquare is unavailable. Please try refreshing later.</h5>";
			}
		});


		
		//credits credit http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
		google.maps.event.addListener(marker, 'click', function () {
            largeInfowindow.open(map, this);
            hotSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                hotSpot.marker.setAnimation(null);
            }, 500);
        });
	});


	//add a marker to the user selected place
	self.showInfo= function(hotSpot){
		google.maps.event.trigger(hotSpot.marker, 'click');
	}



	//an array of markers as per user's choice
	self.choice= ko.observableArray();

	//markers are visible on map by default
	self.myArray().forEach(function(spot){
		self.choice.push(spot);
	});

	 // Track user input
    self.userInput = ko.observable('');

    // If user input is included in the place name, make it and its marker visible
    // Otherwise, remove the place & marker
    //credit https://github.com/lacyjpr/neighborhood
    self.filterMarkers = function () {
        var searchInput = self.userInput().toLowerCase();
        self.choice.removeAll();
        self.myArray().forEach(function (spot) {
        	spot.marker.setVisible(false);
            if (spot.name().toLowerCase().indexOf(searchInput) !== -1) {
                self.choice.push(spot);
            }
        });
        self.choice().forEach(function (spot) {
            spot.marker.setVisible(true);
        });
    };

};












