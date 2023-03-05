<?php



if (isset($_POST["nom"], $_POST["service"], $_POST["tel"], $_POST["email"], $_POST["comment"])) {
   $to = "bedjigui@gmail.com, florian.tchomga@gmail.com";
  //$to = "florian.tchomga@gmail.com";
    $subject = "SERVICES MONSIEUR LANDRY";


    $message = "
                <html>
                <head>
                <title>" . $_POST["service"] . "</title>
                </head>
                <body>
                <h1>" . $_POST["service"] . "</h1>
                <h3>
                Nom: <b>" . $_POST["nom"] . "</b> <br>
                Service demander : <b>" . $_POST["service"] . "</b> <br>
                Email : <b>" . $_POST["email"] . "</b> <br>
                Telephone : <b>" . $_POST["tel"] . "</b> <br>
                Commentaire : <b>" . $_POST["comment"] . "</b> <br>
                </h3>

                </body>
                </html>
                ";

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <mnlandry@monsieurlandry.fr>' . "\r\n";
    // $headers .= 'Cc: myboss@example.com' . "\r\n";

    if (mail($to, $_POST["service"], $message, $headers)) {
		sleep(1);
       $to = $_POST["email"];
		$message= "
        <!DOCTYPE html>
<html>
  <head>
    <meta charset=\"UTF-8\">
    <title>Accusé de réception de commande de " . $_POST["service"] . "</title>
  </head>
  <body>
    <h1>Accusé de réception de commande de " . $_POST["service"] . "</h1>
    <p>Bonjour, <b> " . $_POST["nom"] . " </b></p>
    <p>Nous avons bien reçu votre commande de <b>" . $_POST["service"] . "</b>. Nous vous remercions de votre confiance.</p>
    
    <p>Nous confirmons que votre commande a été bien reçue. Un membre de notre équipe vous contactera sous peu pour confirmer les détails de votre commande.</p>
    <p>Si vous avez des questions ou des préoccupations concernant votre commande, n'hésitez pas à nous contacter par téléphone ou par email.</p>
    <p>Nous vous remercions de votre confiance et espérons que vous apprécierez votre expérience avec notre service de " . $_POST["service"] . ".</p>
    <p>Cordialement,<br>Monsieur landry <br> <a href=\"mailto:bedjigui@gmail.com\">bedjigui@gmail.com</a> <br> <a href=\"https://monsieurlandry.fr\">https://monsieurlandry.fr</a>  .</p>
  </body>
</html>";

      if(mail($to, $_POST["service"], $message, $headers)){
      echo "Votre commande a été envoyée";
      }

        
    } else {
        echo "message non envoyé";
    }
} else {
    echo "Une erreur est survenue, veuillez réessayer";
}


?>