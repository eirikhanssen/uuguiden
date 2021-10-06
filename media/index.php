<?php
$dirlist = scandir(".", 1);
$item = "";
$out = "";
for ($i=0; $i<count($dirlist); $i++){
    $item = $dirlist[$i];
    $out .= "<a href='";
    $out .= $item;
    $out .= "'>";
    $out .= $item;
    $out .= "</a></br>";
}

echo $out;
