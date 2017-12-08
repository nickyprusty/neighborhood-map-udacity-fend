# neighborhood-map-udacity-fend

#Neighborhood Map Project:

##About the Project:

The app shows a single page map of Bhubaneswar Urban. There are markers indicating the location of several hotels in Bhubaneswar. It also contains a list of the hotels.

##How to Download, Install and Run:

Note: A running internet connection is required for this app to function.
1.	The user needs to download the myneighborhood.zip file.
2.	Now that the file is downloaded it can be accessed locally by following the steps below:
  a.	Extract all the files in myneighborhood-map.zip file into one folder (e.g.- My Neighborhood Map folder) and store it in your local        drive.
  b.	Connect your device to the internet.
  c.	Open the folder (e.g.- My Neighborhood Map folder)  you stored the files extracted in.
  d.	Open the index.html file in your browser.
  e.	The user will see a full page map with a search panel and list of the places.
  f.	In case there is an error:
      •	Try reconnecting your device to the internet
      •	Then try refreshing the index.html page

##What the app shows and does:

### Filter Locations
- Includes a text input field that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.




### List View
- A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
- Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing)
- List functionality is responsive and runs error free.

### Map and Markers
- Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
- Clicking a marker displays unique information about a location in either an `infoWindow`.
- Markers should animate when clicked (e.g. bouncing)

##APIs and Resources used:

###API used:
#### [Foursquare API]:
URL: https://api.foursquare.com/v2/venues/
Client ID: UTEUH3OGF5Y5JDIRKJAHZQXIVVCCPXKJBQ0VRBN3WA30MCV2
Client Secret: D4BIIOL4FEE1VD52PVXG5C03WCT2VTPKR3LIMVEWBXXMNXGI
#### [Google API]:
URL: https://maps.googleapis.com/maps/api/js?key=AIzaSyALywcpZgiP3LAK08SysQJ8nu2YRZcgzcU&v=3&callback=initMap

### Javascript:

* [KnockoutJS](http://knockoutjs.com/)
* [MDN : strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
* [MDN : Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
* [MDN : GlobalEventHandlers.onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)
* [MDN : Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [CSS-Tricks : Using Fetch](https://css-tricks.com/using-fetch/)
##Resources used:
•	http://knockoutjs.com/documentation/introduction.html
•	http://learn.knockoutjs.com/
•	https://developers.google.com/maps/documentation/javascript/
•	https://support.foursquare.com/hc/en-us/search?query=apetite+bhubaneswar
•	https://support.foursquare.com/hc/en-us/categories/200071594
•	https://stackoverflow.com/questions/31850887/foursquare-menu-endpoint-returning-error-code-400-bad-request
•	https://stackoverflow.com/questions/26003374/get-the-venue-id-from-the-foursquare-url
•	https://gist.github.com/search?l=JSON&q=foursquare+api+&ref=searchresults&utf8=%E2%9C%93
•	https://github.com/lacyjpr/neighborhood
•	https://github.com/mchalet/Neighborhood-Map
•	https://discussions.udacity.com/t/inconsistent-results-from-foursquare/39625
•	https://discussions.udacity.com/t/having-trouble-accessing-data-outside-an-ajax-request/39072




