<?php



$country_code = $_GET['countryCode']; 

require_once 'config.php';

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.worldnewsapi.com/search-news?api-key={$worldNewsApiKey}&source-countries={$country_code}",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  $data = json_decode($response, true);

  
  foreach ($data['news'] as &$news) {
      if (strpos($news['title'], 'Request failed') !== false) {
          $news['title'] = 'No Title Data';
      }
      if (strpos($news['text'], 'Request failed') !== false) {
          $news['text'] = 'No Description Data';
      }

      if (strpos($news['title'], 'Internal Server Error') !== false) {
        $news['title'] = 'No Title Data';
      }
      if (strpos($news['text'], 'Internal Server Error') !== false) {
          $news['text'] = 'No Description Data';
      }

      if (strpos($news['title'], 'Apache2 Ubuntu') !== false) {
        $news['title'] = 'No Title Data';
      }
      if (strpos($news['text'], 'apache2.conf') !== false) {
          $news['text'] = 'No Description Data';
      }

      
      if ($news['image'] === null || strpos($news['image'], '404') !== false || strpos($news['image'], '403') !== false || strpos($news['image'], '520') !== false) {
          $news['image'] = 'dist/img/Image_not_available.png';
      } else {
          
          $headers = @get_headers($news['image']);
          if ($headers === false || strpos($headers[0], '4') === 0 || strpos($headers[0], '5') === 0) {
              
              $hostname = parse_url($news['image'], PHP_URL_HOST);
              $ip_address = gethostbyname($hostname);
              if ($ip_address === $hostname) {
                  $news['image'] = 'dist/img/Image_not_available.png';
              } else {
                  $news['image'] = 'dist/img/Image_not_available.png';
              }
          }
      }
  }

  
  if (empty($data['news'])) {
      $data = array('status' => array('code' => 404, 'name' => 'Not Found', 'description' => 'No news found'), 'news' => array());
  }

  header('Content-Type: application/json');
  echo json_encode($data);
}
