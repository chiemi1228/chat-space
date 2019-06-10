function buildHTML(message){
    var message_first = ( message.image )? `<img src=${message.image} ></div></div>` : "";
    var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="message__info">
              <div class="message__info__who">
                ${message.user_name}
              </div>
              <div class="message__info__when">
                ${message.date}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
              </p>
              ${message_first}
            </div>
          </div>`
        return html;
  }
    $(function(){
      $('#new_message').on('submit', function(e){
          e.preventDefault();
          var formData = new FormData(this);
          var url = $(this).attr('action')
          $.ajax({
              url: url,
              type: "POST",
              data: formData,
              dataType: 'json',
              processData: false,
              contentType: false
            })
              .done(function(data){
                var html = buildHTML(data);
                $('.messages').append(html);
                $('html,body').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
                $('form')[0].reset();
              })
                .fail(function(){
                  alert('error');
                });
                return false;
      });
    }) 