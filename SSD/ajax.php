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
    $mail_name = "alim-halilko@.ru";

    $name = $_POST['name'];
    $mail = $_POST['mail'];
    $number = $_POST['number'];

    $message = "Письмо с сайта shark-design.ru\r\n\nИмя заказчика: ". $name ."\r\nПочта: ". $mail."\r\nТелефон: ". $number;
    $message = wordwrap($message, 70, "\r\n");

    $res = mail($mail_name, 'Заявка на создание сайта | Shark Design Studio', $message);

    if ($res)  {
        echo '1';
    }
    else {
        echo '0';
    }
    return;
}

?>