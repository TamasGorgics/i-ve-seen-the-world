var countries;
var countryNamesAndAreas;
var areakm2 = 0;
var totalArea = 0;

$(document).ready(function() {

    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        type: "GET",
        success: function(resultData) {
            this.countries = resultData;

            countryNamesAndAreas = this.countries.map(country => ({ name: country.name, area: country.area }));

            $.each(countryNamesAndAreas, function(index, value) {
                $('#countryList').append($('<input type="checkbox" value=' + value.area + ' onclick="handleClick(this);">' + value.name + '</input><br>'));
                totalArea = totalArea + Number(value.area);
            });
            document.getElementById("areaLabel").innerHTML = 'You have covered ' + areakm2 + ' km2 of total ' + totalArea + ' km2';
        },
        error: function(jqXHR, textStatus, errorThrown) {},

        timeout: 120000,
    });

});

function handleClick(cb) {
    cb.value = isNaN(cb.value) ? 0 : cb.value;
    if (cb.checked) {
        areakm2 = areakm2 + Number(cb.value);
    } else {
        areakm2 = areakm2 - Number(cb.value);
    }
    document.getElementById("areaLabel").innerHTML = 'You have covered ' + areakm2 + ' km2 of total ' + totalArea + ' km2';
}