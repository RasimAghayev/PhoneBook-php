<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: https://bsc-rest.rst/api/");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-type: application/json; charset=utf-8");
require_once('../app/bootstrap.php');
$init = new Core;
