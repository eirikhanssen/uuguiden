<?php
function printDirectoryHTML($dir){
    $dirlist = scandir($dir, 1);
    
   for ($i=0; $i<count($dirlist); $i++){
       echo $dirlist[$i] + "</br>";
   }

   echo $dirlist[0] + "</br>";
   echo $dirlist[1] + "</br>";
   echo $dirlist[2] + "</br>";

   print_r($dirlist);
    
}

