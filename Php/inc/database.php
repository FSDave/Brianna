<?php
	class Database {
		
		public static function connectDB(){
			$conn = new mysqli("localhost", "root", "", "brianna");
		
			if($conn->connect_error){
				die("Unable to connect to database". $conn-connect_error);
			}
			return $conn;
		}

		public static function sqlCommand($sql){
			$conn = self::connectDB();
			$conn->query($sql);
			$id = $conn->insert_id;;
			$conn->close();
			return $id;
		}

		public static function sqlQuery($sql){
			$conn = self::connectDB();
			$result = $conn->query($sql);
			$arr = array();

			while ($row = $result->fetch_assoc()){
				$arr[] = $row;
			}
			$conn->close();
			return $arr;
		}

	}
?>