<?php

/*
 *  CORE CONTROLLER CLASS
 *  Loads Models & Views
 */

class Controller
{
    public function model($model)
    {
        require_once '../app/mvc/models/' . $model . '.php';
        return new $model();
    }
    public function view($url, $data = [])
    {
        if (file_exists('../app/mvc/views/' . $url . '.php')) {
            require_once '../app/mvc/views/' . $url . '.php';
        } else {
            die('View does not exist');
        }
    }
}