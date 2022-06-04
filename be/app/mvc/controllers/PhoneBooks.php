<?php

class PhoneBooks extends Controller
{
    private $data;
    private $code;

    public function __construct()
    {
        $this->phoneBookModel = $this->model('PhoneBook');
    }

    public function index()
    {
        echo 'test';
    }

    public function createPBC()
    {
        !($_SERVER['REQUEST_METHOD'] === "POST") ? die(HTTPStatus(503, 0, '/', "Access denied", $_SERVER['REQUEST_METHOD'])) : '';
        $data = json_decode(file_get_contents("php://input"));
        $rules = [
            'Gender' => 'req|min:1|max:1|alpha',
            'Name' => 'req|min:3|max:16|alpha',
            'SurName' => 'req|min:3|max:16|alpha',
            'Email' => 'req|email',
            'Address' => 'req|min:3|max:50',
        ];
        $validator = new ValidField($data, $rules);
        ($validator->error()) ? die(HTTPStatus(500, 0, '/', $validator->error())) : '';
        try {
            $this->phoneBookModel->Gender = $data->Gender;
            $this->phoneBookModel->Name = $data->Name;
            $this->phoneBookModel->SurName = $data->SurName;
            $this->phoneBookModel->Email = $data->Email;
            $this->phoneBookModel->Address = $data->Address;
            $regUser = $this->phoneBookModel->createPBM();
            ($regUser) ?
                HTTPStatus(201, 1, '/PhoneBooks', "Project has been created", $data) :
                HTTPStatus(424, 0, '/', "Failed to create project", '');
            $this->phoneBookModel->user_id = $regUser;

        } catch (Exception $ex) {
//            writeLog(417,$ex->getMessage());
            HTTPStatus(417, 0, $ex->getMessage(), '');
        }
    }
}