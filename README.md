# React, Typescript & D3.js project: "Covid app".

## Short description:
* API: https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com .
* Get needed covid data for a country through an input field.

### Detailed description:
* On page load search input, search button and general covid data are displayed.
* Input is validated this way:
    - HTML: `required`, `maximum length`.
    - JS: `empty string`, `maximum word length` and by testing if the word only contains `spaces and letters`.
* Input validation errors are displayed below the input.
* Next to the input field, a total letter count is displayed with a maximum letter count.
* By typing in input field user get suggestion box below the input:
    - Up to 5 countries are displayed in a suggestion box.
    - Clicking on a suggested country, inputs that value for input field.
* Once search button is clicked, information is being fetched.
* During fetching a spinning element is displayed.
* Once data is fetched, this information is displayed:
    - Last date of the data for latest 6 month period.
    - New cases count.
    - New death(s) count.
    - Total cases and total deaths buttons.
* Pressing on either total cases or total deaths buttons displays a linear graph, using latest 6 month data:
    - Y axis displays cases or death count.
    - X axis displays time (year, months).
    - A line to show a visual change for selected item.
* Pressing close button, closes selected graph.
