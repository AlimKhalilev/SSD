<?php

header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/javascript; charset=utf-8");

if (isset($_POST['act'])) {
    switch ($_POST['act']) {
        case "send":
            Send();
            break;
        default:
            exit();
    }
}

function Send()
{
    $mail_name = "shark-ds@bk.ru";
    $mail_name_second = "alim-halilko@mail.ru";

    $name = $_POST['name'];
    $mail = $_POST['mail'];
    $number = $_POST['number'];
    $from = $_POST['from'];

    $message = "Письмо с сайта shark-design.ru\r\n\nПришло с области: ". $from ."\r\nИмя заказчика: ". $name ."\r\nПочта: ". $mail."\r\nТелефон: ". $number;
    $message = wordwrap($message, 70, "\r\n");

    //$res = mail($mail_name, 'Заявка на создание сайта | Shark Design Studio', $message);
    $res_new = mail($mail_name_second, 'Заявка на создание сайта | Shark Design Studio', $message);

    if ($res)  {
        echo '1';
    }
    else {
        echo '0';
    }
    return;
}

?>