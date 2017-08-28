<?php
$url="https://api.hub.jhu.edu/articles?v=1&key=3429d428c1011f9d64e8eff1f3c6642b6299f037";
//  Initiate curl


$result = file_get_contents($url);
// Will dump a beauty json :3
$array_u = json_decode($result, true);

function readable_date($timestamp)

{

	echo date("F j, Y, g:i a", $timestamp);
}



$headline_0 = $array_u["_embedded"]["articles"][0]["headline"];
$url_0=$array_u["_embedded"]["articles"][0]["url"];
echo "<p><a href= $url_0 target= _blank>$headline_0</a></p>";
readable_date ($array_u["_embedded"]["articles"][0]["publish_date"]);



$headline_0 = $array_u["_embedded"]["articles"][1]["headline"];
$url_0=$array_u["_embedded"]["articles"][1]["url"];
echo "<p><a href= $url_0 target= _blank>$headline_0</a></p>";
readable_date ($array_u["_embedded"]["articles"][1]["publish_date"]);



$headline_0 = $array_u["_embedded"]["articles"][2]["headline"];
$url_0=$array_u["_embedded"]["articles"][2]["url"];
echo "<p><a href= $url_0 target= _blank>$headline_0</a></p>";
readable_date ($array_u["_embedded"]["articles"][2]["publish_date"]);



$headline_0 = $array_u["_embedded"]["articles"][3]["headline"];
$url_0=$array_u["_embedded"]["articles"][3]["url"];
echo "<p><a href= $url_0 target= _blank>$headline_0</a></p>";
readable_date ($array_u["_embedded"]["articles"][3]["publish_date"]);




?>