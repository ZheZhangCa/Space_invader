<?php

  
 $dbConnection = mysqli_connect("localhost", "gutsover_zhang", "yA756131", "gutsover_interview");
  //$dbConnection = mysqli_connect("%", "gutsover","yA756131", "gutsover_interview");
   if (!$dbConnection)
   {
        die("Connection failed: " . mysqli_connect_error());
      // It doesn't stop here - the function calling it detects there is an error and handles it gracefully
      //logMessage("Error connecting to database: ".mysqli_error());

   }
    
   if(isset($_POST['submit'])){ 
  
   $fname=$_POST['firstName'];
   $lname=$_POST['lastName'];
   $email=$_POST['email'];



  
  
  }

?>