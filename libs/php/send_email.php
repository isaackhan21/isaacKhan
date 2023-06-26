<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';
require_once 'config.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;




$name = $_POST['name'];
$email = $_POST['email']; 
$subject = $_POST['subject'];
$message = $_POST['message'];

$mail = new PHPMailer();

$mail->isSMTP();
$mail->Host = $emailHost;
$mail->SMTPAuth = true;
$mail->Username = $emailUsername;
$mail->Password = $emailPassword;
$mail->SMTPSecure = $emailEncryption;
$mail->Port = $emailPort;

$mail->setFrom($email, $name);
$mail->addAddress('isaackhan21@gmail.com', 'Isaac');
$mail->Subject = $subject;
$mail->Body = $message;

$mail->addReplyTo($email, $name); 

if ($mail->send()) {
  echo 'Email sent successfully.';
} else {
  echo 'Error sending email: ' . $mail->ErrorInfo;
}

?>
