<?php
session_start();

    include "inc/database.php";
    
    $debug = true;

    function logit($st){
        global $debug;
        if ($debug) file_put_contents("log.txt", "$st\n", FILE_APPEND);
    }

    function add_region(){
        $region_name = $_GET['region_name'];
        Database::sqlCommand("INSERT INTO regions (region) VALUES ('$region_name')");

    }

    function add_workpost() {
        $workpost_name = $_GET['workpost_name'];
        $workpost_location = $_GET['workpost_location'];
        $shift_managers = $_GET['shift_managers'];
        $workers_amount = $_GET['workers_amount'];
        $region = $_GET['region_id'];
        Database::sqlCommand("INSERT INTO work_posts (name, location, shift_manager, workers, regionId) VALUES ('$workpost_name', '$workpost_location', '$shift_managers', '$workers_amount', '$region')");
    }

    function add_worker() {
        session_start();
        $first_name = $_GET['first_name'];
        $last_name = $_GET['last_name'];
        $_SESSION["WorkerName"] =  $first_name;
        $national_id = $_GET['national_id'];
        $sql = "INSERT INTO workers (first_name, last_name, national_id) VALUES ('$first_name', '$last_name', '$national_id')";
        logit($sql);
        $_SESSION["workerId"] = Database::sqlCommand($sql);
        $workerId = $_SESSION["workerId"];
        $hashedpw=sha1($national_id);
        $sql = "INSERT INTO user_auth (id, username, password) VALUES ('$workerId', '$national_id', '$hashedpw')";
        logit($sql);
        Database::sqlCommand($sql);
    }

    function add_worker_personal_details() {
        logit("WorkerId = " . $_SESSION['workerId']);
        logit("WorkerName = " . $_SESSION['WorkerName']);
        $street_name = $_GET['street_name'];
        $number = $_GET['number'];
        $city = $_GET['city'];
        $worker_id = $_SESSION["workerId"];
        $sql = "INSERT INTO address (id, street_name, number, city) VALUES ('$worker_id', '$street_name', '$number', '$city')";
        logit($sql);
        Database::sqlCommand($sql);
        $phone_number = $_GET['phone_number'];
        $additional_details = $_GET['additional_details'];
        $sql = "INSERT INTO worker_private_details (workerId, phone_number, additional_details) VALUES ('$worker_id', '$phone_number', '$additional_details')";
        logit($sql);
        Database::sqlCommand($sql);
    }

    function add_worker_work_details() {
        $worker_id = $_SESSION["workerId"];
        $post_id = $_GET['post_id'];
        $transport = $_GET['transport'];
        $status = $_GET['status'];
        $rank = $_GET['rank'];
        $sql = "INSERT INTO worker_work_details (workerId, postId, transport, status, rank) VALUES ('$worker_id', '$post_id', '$transport', '$status', '$rank')";
        logit($sql);
        Database::sqlCommand($sql);
        unset($_SESSION['workerId']);
    }

    function workpost_names(){
        $rows = Database::sqlQuery("SELECT work_posts.name, work_posts.id FROM work_posts");
        echo json_encode($rows);
    }

    function region_names(){
        $rows = Database::sqlQuery("SELECT * FROM regions");
        echo json_encode($rows);
    }

    function workpost_full_info(){
        $rows = Database::sqlQuery("SELECT work_posts.*, regions.region FROM work_posts LEFT JOIN regions ON work_posts.regionId = regions.id");
        echo json_encode($rows);
    }

    function workpost_all_info(){
        $workpostId = $_GET['workpostId'];
        $_SESSION['workpostId']=$workpostId;
        $sql ="SELECT * FROM work_posts WHERE work_posts.id ='$workpostId'";
        logit($sql);
        $rows = Database::sqlQuery($sql);
        echo json_encode($rows);
    }

    function edit_workpost_details(){
        $workpostId = $_SESSION['workpostId'];
        if($_SESSION['workpostId']==-1){
            add_workpost();
        }
        else{
        $workpost_name = $_GET['workpost_name'];
        $workpost_location = $_GET['workpost_location'];
        $shift_managers = $_GET['shift_managers'];
        $workers_amount = $_GET['workers_amount'];
        $region = $_GET['region_id'];
        $sql = "UPDATE `work_posts` SET `name` = '$workpost_name', `location` = '$workpost_location', `shift_manager` = '$shift_managers', `workers` = '$workers_amount', `regionId` = '$region' WHERE `work_posts`.`id` = '$workpostId'";
        logit($sql);
        Database::sqlCommand($sql);
        }
    }

    function workers_full_info(){
        $rows = Database::sqlQuery("SELECT * FROM workers");
        echo json_encode($rows);
    }

   function checkCredentials(){
       $username=$_GET['username'];
       $password=$_GET['password'];
       $hashedpw=sha1($password);
       $result = Database::sqlQuery("SELECT COUNT(*) as found FROM user_auth WHERE username = '$username' AND password = '$hashedpw' limit 1;")[0]['found'];   
       if($result > 0){
            echo "valid";
            $sql = "SELECT id from workers where national_id = $username";
            $workerId = Database::sqlQuery($sql);
            $_SESSION["workerId"] = $workerId[0]['id'];
        }
        else{
       echo "invalid";
        }
   }

   function updatePassword(){
        $workerId=$_SESSION['workerId'];
        $password=$_GET['password'];
        $hashedpw=sha1($password);
        $sql = "UPDATE user_auth  SET `password` = '$hashedpw' WHERE user_auth.id = $workerId";
        logit($sql);
        Database::sqlCommand($sql);
   }

   function getRank(){
    $username=$_GET['username'];
    $sql ="SELECT worker_work_details.rank FROM worker_work_details, workers WHERE worker_work_details.workerId = workers.id AND workers.national_id = $username";
    $name = Database::sqlQuery($sql);
    logit($name[0]['rank']);
    echo $name[0]['rank'];
    $sql ="SELECT workers.id FROM workers WHERE workers.national_id = $username";
    $workerId = Database::sqlQuery($sql);
    $_SESSION['workerId'] = $workerId[0]['id'];
   }

   function getRegion(){
    $workerId=$_SESSION['workerId'];
    $sql ="SELECT regions.id FROM regions, work_posts, worker_work_details WHERE work_posts.id = worker_work_details.postId AND work_posts.regionId = regions.id AND worker_work_details.workerId = $workerId";
    $name = Database::sqlQuery($sql);
    logit($name[0]['id']);
    return $name[0]['id'];
   }

    function workers_personal_details(){
       $workerId=$_GET['workerId'];
       $sql = "SELECT workers.id, workers.first_name, workers.last_name, address.street_name, address.number, address.city, worker_private_details.additional_details, worker_private_details.phone_number
       FROM workers JOIN worker_private_details ON workers.id = worker_private_details.workerId
       JOIN address ON workers.id = address.id
       WHERE workers.id='$workerId'";
       logit($sql);
       $rows = Database::sqlQuery($sql);
       echo json_encode($rows);
   }

   function workers_work_details(){
    $workerId=$_GET['workerId'];
    $sql = "SELECT workers.first_name, workers.last_name, work_posts.name, worker_work_details.* FROM `workers` 
    JOIN `worker_work_details` ON workers.id = worker_work_details.workerId 
    JOIN `work_posts` ON work_posts.id = worker_work_details.postId
    where worker_work_details.workerId = '$workerId'";
    logit($sql);
    $rows = Database::sqlQuery($sql);
    echo json_encode($rows);
   }
   
   function worker_all_info(){
    $workerId=$_GET['workerId'];
    $_SESSION['workerId']=$workerId;
    $sql = "SELECT workers.first_name, workers.last_name, workers.national_id, address.street_name, address.number, address.city, worker_private_details.phone_number, worker_private_details.additional_details, worker_work_details.postId, worker_work_details.transport, worker_work_details.status, worker_work_details.rank FROM `workers` 
    JOIN `worker_work_details` ON workers.id = worker_work_details.workerId 
    JOIN `worker_private_details` ON workers.id = worker_private_details.workerId 
    JOIN `address` ON workers.id = address.id
    where workers.id = '$workerId'";
    logit($sql);
    $rows = Database::sqlQuery($sql);
    echo json_encode($rows);
    logit(json_encode($rows));
   }

   function worker_private_details(){
    $workerId=$_SESSION['workerId'];
    $sql = "SELECT workers.first_name, workers.last_name, workers.national_id, worker_private_details.phone_number, workers_hours.total_shifts, workers_hours.total_hours FROM `workers` 
    LEFT JOIN `worker_private_details` ON workers.id = worker_private_details.workerId 
    LEFT JOIN `workers_hours` ON workers.id = workers_hours.id 
    where workers.id = '$workerId'";
    logit($sql);
    $rows = Database::sqlQuery($sql);
    echo json_encode($rows);
   }

   function edit_worker_details(){
    if($_SESSION['workerId']==-1){
        add_worker();
        add_worker_personal_details();
        add_worker_work_details();
    }
    else{
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $national_id = $_GET['national_id'];
    $sql = "UPDATE `workers` SET `first_name` = '$first_name', `last_name` = '$last_name', `national_id` = '$national_id' WHERE `workers`.`id` = '$workerId'";
    logit($sql);
    Database::sqlCommand($sql);
    $street_name = $_GET['street_name'];
    $number = $_GET['number'];
    $city = $_GET['city'];
    $sql = "UPDATE `address` SET `street_name` = '$street_name', `number` = '$number', `city` = '$city' WHERE `address`.`id` = '$workerId'";
    logit($sql);
    Database::sqlCommand($sql);
    $phone_number = $_GET['phone_number'];
    $additional_details = $_GET['additional_details'];
    $sql = "UPDATE `worker_private_details` SET `phone_number` = '$phone_number', `additional_details` = '$additional_details' WHERE `worker_private_details`.`workerId` =  '$workerId'";
    logit($sql);
    Database::sqlCommand($sql);
    $post_id = $_GET['post_id'];
    $transport = $_GET['transport'];
    $status = $_GET['status'];
    $rank = $_GET['rank'];
    $sql = "UPDATE `worker_work_details` SET `postId` = '$post_id', `transport` = '$transport', `status` = '$status', `rank` = '$rank' WHERE `worker_work_details`.`workerId` =  '$workerId'";
    logit($sql);
    Database::sqlCommand($sql);
    unset($_SESSION['workerId']);
    }
   }

   function delete_worker(){
       $workerId=$_GET['workerId'];
       $sql = "DELETE FROM workers WHERE workers.id ='$workerId'";
       logit($sql);
       Database::sqlCommand($sql);
   }

   function submitRequest(){
    $amountOfShifts = $_GET['amount'];
    $workerId=$_SESSION['workerId'];
    for ($i=0; $i<$amountOfShifts; $i++){
        $shift = $_GET['shift'.$i];
        logit($shift);
        switch ($shift) {
            case '11' :$workdate = "sunday"; $workshift = '1'; break;
            case '12' :$workdate = "sunday"; $workshift = '2'; break;
            case '13' :$workdate = "sunday"; $workshift = '3'; break;
            case '21' :$workdate = "monday"; $workshift = '1'; break;
            case '22' :$workdate = "monday"; $workshift = '2'; break;
            case '23' :$workdate = "monday"; $workshift = '3'; break;
            case '31' :$workdate = "tuesday"; $workshift = '1'; break;
            case '32' :$workdate = "tuesday"; $workshift = '2'; break;
            case '33' :$workdate = "tuesday"; $workshift = '3'; break;
            case '41' :$workdate = "wednesday"; $workshift = '1'; break;
            case '42' :$workdate = "wednesday"; $workshift = '2'; break;
            case '43' :$workdate = "wednesday"; $workshift = '3'; break;            
            case '51' :$workdate = "thursday"; $workshift = '1'; break;
            case '52' :$workdate = "thursday"; $workshift = '2'; break;
            case '53' :$workdate = "thursday"; $workshift = '3'; break;    
            case '61' :$workdate = "friday"; $workshift = '1'; break;
            case '62' :$workdate = "friday"; $workshift = '2'; break;
            case '63' :$workdate = "friday"; $workshift = '3'; break;            
            case '71' :$workdate = "saturday"; $workshift = '1'; break;
            case '72' :$workdate = "saturday"; $workshift = '2'; break;
            case '73' :$workdate = "saturday"; $workshift = '3'; break;                        
        }
        $workday = date('Y-m-d', strtotime($workdate.' next week'));
        $region = getRegion();
        logit('next '.$workdate);
        $sql = "INSERT INTO `worker_prefs` (`workerId`, `wdate`, `shiftId`, `regionId`) VALUES ('$workerId', '$workday', '$workshift', '$region');";
        logit($sql);
        Database::sqlCommand($sql);
    }
   }
   function delete_workpost(){
    $workpostId=$_GET['workpostId'];
    $sql = "DELETE FROM work_posts WHERE work_posts.id ='$workpostId'";
    logit($sql);
    Database::sqlCommand($sql);
   }

    //dispatcher
    $option = $_GET['option'];

    switch ($option) {
        case "add_region" : add_region(); break;
        case "add_workpost" : add_workpost(); break;
        case "add_worker" : add_worker(); break;
        case "delete_worker" : delete_worker(); break;
        case "add_worker_personal_details" : add_worker_personal_details(); break;
        case "add_worker_work_details" : add_worker_work_details(); break;
        case "workpost_names" : workpost_names(); break;
        case "region_names" : region_names(); break; 
        case "workpost_full_info" : workpost_full_info(); break;
        case "workers_full_info" : workers_full_info(); break;
        case "checkCredentials" : checkCredentials(); break;
        case "getRank" : getRank(); break;
        case "workers_personal_details" :workers_personal_details(); break;
        case "workers_work_details" :workers_work_details(); break;
        case "worker_all_info" : worker_all_info(); break;
        case "edit_worker_details" : edit_worker_details(); break;
        case "updatePassword" : updatePassword(); break;
        case "worker_private_details" : worker_private_details(); break;
        case "workpost_all_info" : workpost_all_info(); break;
        case "edit_workpost_details" : edit_workpost_details(); break;
        case "submitRequest" : submitRequest(); break;
        case "delete_workpost" :delete_workpost(); break;
    }

   
?>