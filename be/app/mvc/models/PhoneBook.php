<?php
class PhoneBook
{
    public $Gender,$Name,$SurName,$Email,$Address;
    private $conn,$phone_books_tbl,$phone_books_history_tbl;

    public function __construct() {
        $this->conn = new Database;
        $this->phone_books_tbl = "phone_books";
        $this->phone_books_history_tbl = "phone_books_history";
    }
    public function createPBM() {

        $user_query = "INSERT INTO "
            . $this->phone_books_tbl .
            " SET Gender = :Gender, Name = :Name, SurName = :SurName, Address = :Address;";
        $user_obj = $this->conn->query($user_query);
        $this->conn->bind(':Gender', $this->Gender);
        $this->conn->bind(':Name', $this->Name);
        $this->conn->bind(':SurName', $this->SurName);
        $this->conn->bind(':Email', $this->Email);
        $this->conn->bind(':Address', $this->Address);
        if ($this->conn->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }
    public function login()
    {
        $this->conn->query("SELECT * FROM ". $this->phone_books_tbl);
        return $this->conn->singleASS();
    }
}