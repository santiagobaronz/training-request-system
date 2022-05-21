<?php

$name = $_POST['name'];
$email = $_POST['email'];
$vid = $_POST['vid'];
$comments = $_POST['comments'];
$type_option = $_POST['type_option'];
$radio_option = $_POST['radio_option'];
$date = date('d-m-Y H:i:s');

if($type_option === 'training'){

  $option_selected = "un entrenamiento ";

  if($radio_option === 'pilot'){
    $t_selected = $_POST['rank_pilot'];
  }else{
    $t_selected = $_POST['rank_control'];
  }

}else if($type_option === 'exam'){

  $option_selected = "un examen ";

  if($radio_option === 'pilot'){
    $t_selected = $_POST['exam_pilot'];
  }else{
    $t_selected = $_POST['exam_atc'];
  }

} else {
  $option_selected = "un examen GCA ";
  $t_selected = $_POST['exam_atc'];
}

if($name === '' || $email === '' || $vid === '' || $t_selected === 'no_data'){
    echo json_encode(false);
}else{

    $content = '
    
    <html lang="es"><head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mensaje</title>
          
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Camphor,Open Sans,Segoe UI,sans-serif;
              }
          
              .background{
                  background: #171b31;
                  width: 100%;
                  height: 200px;
                  padding-top: 20px;
              }
              .logo_ivao{
                  display: block;
                  margin: auto;
                  width: 450px;
              }
              .container {
                max-width: 1000px;
                width: 90%;
                margin: 0 auto;
                background: #0267FF;
              }
              .bg-container {
                background: #fff;
                padding: 40px 20px;
              }
              .bg-container h1{
                  text-align: center;
                  color: #484848;
                  margin-bottom: 30px;
              }
              .bg-container p{
                  padding: 0 20px;
                  text-align: left;
                  color: #484848;
                  margin-bottom: 30px;
              }
              .alert {
                font-size: 1.5em;
                position: relative;
                padding: .75rem 1.25rem;
                margin-bottom: 2rem;
                border: 1px solid transparent;
                border-radius: .25rem;
              }
              .alert-primary {
                color: #004085;
                background-color: #cce5ff;
                border-color: #b8daff;
              }
          
              .img-fluid {
                max-width: 100%;
                height: auto;
              }
          
              .mensaje {
                width: 80%;
                font-size: 20px;
                margin: 80px auto ;
                color: #484848;
              }
          
              .texto {
                margin-top: 20px;
              }
  
              .texto ul{
                  display: flex;
                  justify-content: center;
              }
  
              .aeropuertos{
                  font-size: 15px;
              }
  
              .texto ul li{
              list-style: none;
              width: 33.3333%;
              text-align: center;
              }
  
              .flight-details-title{
                  text-align: center;
                  color: #484848;
                  margin-top: 80px;
              }
  
              .details{
                  padding: 0 20px;
                  margin-top: 30px;
                  margin-bottom: 30px;
              }
  
              .odd-text{
                  background: #ddd;
              }
  
              .details li{
                  list-style: none;
                  padding: 10px;
              }
  
              .confirm-button{
                padding: 30px;
                background:#9a00ff;
                color: #fff !important;
                text-decoration: none;
                display: block;
                margin: 0 10%;
                text-align: center;
                font-weight: 500;
                font-size:25px;
              }
          
              .footer {
                width: 100%;
                background: #48494a;
                text-align: center;
                color: #ddd;
                padding: 10px;
                font-size: 14px;
              }
              .footer a {
                text-decoration: underline;
                color: #ddd;
              }
            </style>
          </head>
          <body>
            <div class="background">
                <img src="https://i.imgur.com/MgB8tWI.png" alt="" class="logo_ivao">
            </div>
            <div class="container">
              <div class="bg-container">
                  <h1 class="titulo-email">'.$name.' ('.$vid.') '.$option_selected.' '.$t_selected.'</h1>
                  <p><strong>'.$name.' </strong> solicitó '.$option_selected.' '.$t_selected.'. A continuación se describen los datos del solicitante:</p>

                <ul class="details">
                    <li class="odd-text">Solicitante: '.$name.' </li>
                    <li>Correo electronico: '.$email.'. </li>
                    <li class="odd-text">VID: '.$vid.'</li>
                    <li>Tipo elegido: '.$t_selected.'</li>
                    <li class="odd-text">Comentarios: '.$comments.'</li>
                    <li>Fecha de solicitud: '.$date.'</li>
                </ul>
          
                <div class="footer">Training request system <a href="https://training.ec.ivao.aero/">https://training.ec.ivao.aero/</a>
                </div>
              </div>
            </div>
          
          
          </body></html>
    
    ';

    $to = "santiago.baron.zuleta@ivao.aero";
    $subject = $name." solicitó ".$option_selected." ".$t_selected;
    $headers = 'From: Training Request System - IVAO Ecuador <ec-training@ivao.aero>' . "\r\n" .
    'Reply-To: ec-training@ivao.aero' . "\r\n" .
    'MIME-Version: 1.0' . "\r\n" .
    'Content-type: text/html; charset=utf-8' . "\r\n".
    'X-Mailer: PHP/' . phpversion();
    
    mail($to, $subject, $content, $headers);
    echo json_encode(true);
}


?>