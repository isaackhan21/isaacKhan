

$(document).ready(function() {
  $('.error-message, .sent-message').hide();
  $('form.contact-form').submit(function(event) {
    event.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();

    var mailBody = "<h3>New Email from the Contact Form</h3>";
    mailBody += "<p><strong>Name:</strong> " + name + "</p>";
    mailBody += "<p><strong>Email:</strong> <a href='mailto:" + email + "'>" + email + "</a></p>";
    mailBody += "<p><strong>Subject:</strong> " + subject + "</p>";
    mailBody += "<p><strong>Message:</strong></p>";
    mailBody += "<p>" + message + "</p>";

    var formData = {
      name: name,
      email: email,
      subject: subject,
      message: mailBody
    };
    

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
