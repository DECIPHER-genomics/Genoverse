<?
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $_REQUEST['url'] . "?" . $_SERVER['QUERY_STRING']);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $data = curl_exec($ch);
  header('Content-type: ' . curl_getinfo($ch, CURLINFO_CONTENT_TYPE));
  curl_close($ch);
  echo $data;
?>


