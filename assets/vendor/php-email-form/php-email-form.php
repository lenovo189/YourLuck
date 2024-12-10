<?php

class PHP_Email_Form {

    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $smtp = array();
    public $ajax = false;
    private $messages = array();

    public function add_message($value, $label, $max_length = 0) {
        if ($max_length > 0 && strlen($value) > $max_length) {
            return false;
        }
        $this->messages[] = array(
            'label' => $label,
            'value' => htmlspecialchars($value, ENT_QUOTES, 'UTF-8')
        );
        return true;
    }

    public function send() {
        if (empty($this->to)) {
            return 'Recipient email address is not set!';
        }

        $headers = "From: {$this->from_name} <{$this->from_email}>\r\n";
        $headers .= "Reply-To: {$this->from_email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $email_content = "Subject: {$this->subject}\n\n";

        foreach ($this->messages as $message) {
            $email_content .= "{$message['label']}: {$message['value']}\n";
        }

        // Check if SMTP is configured
        if (!empty($this->smtp)) {
            return $this->send_smtp($email_content);
        }

        // Send via PHP's mail()
        if (mail($this->to, $this->subject, $email_content, $headers)) {
            return 'Email successfully sent!';
        } else {
            return 'Failed to send email. Please try again later.';
        }
    }

    private function send_smtp($email_content) {
        $transport = (new Swift_SmtpTransport($this->smtp['host'], $this->smtp['port']))
            ->setUsername($this->smtp['username'])
            ->setPassword($this->smtp['password']);

        $mailer = new Swift_Mailer($transport);

        $message = (new Swift_Message($this->subject))
            ->setFrom([$this->from_email => $this->from_name])
            ->setTo([$this->to])
            ->setBody($email_content, 'text/plain');

        try {
            $result = $mailer->send($message);
            return $result ? 'Email successfully sent via SMTP!' : 'Failed to send email via SMTP.';
        } catch (Exception $e) {
            return 'SMTP Error: ' . $e->getMessage();
        }
    }
}

?>
