$(document).ready(function() {
  $('.error-message, .sent-message').hide();
  $('form.contact-form').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();
    

    $.ajax({
      type: 'POST',
      url: 'libs/php/send_email.php',
      data: formData,
      beforeSend: function() {
        $('.loading').fadeIn();
      },
      success: function(response) {
        $('.loading').fadeOut();
        $('.sent-message').text(response).fadeIn().delay(3000).fadeOut();
        $('form.contact-form')[0].reset();
      },
      error: function(xhr, status, error) {
        $('.loading').fadeOut();
        $('.error-message').text('Error sending email. Please try again.').fadeIn().delay(3000).fadeOut();
      }
    });
  });
});
