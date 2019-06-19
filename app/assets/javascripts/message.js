function buildMessageHTML(message){
    var message_first = ( message.image.url )? `<img src=${message.image.url} ></div></div>` : "";
                    //（if文を書き換え）imageがあれば、左：なければ：右（がmessage_firstの所に入る）
    var html =          //新しいメッセージ
         `<div class="message" data-message-id=${message.id}>
            <div class="message__info">
              <div class="message__info__who">
                ${message.user_name}
              </div>
              <div class="message__info__when">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
              ${message_first}
            </div>
          </div>`
        return html;
}

//自分が投稿したフォームを非同期でviewに反映させる
$(function(){
  $('#new_message').on('submit', function(e){   //formで新しいmessageを送ると
      e.preventDefault();                   //デフォルトの同期通信ストップ
      var formData = new FormData(this);  //#new_message の フォームのデータを取得
      var url = $(this).attr('action')     //#new_message のaction属性の値を取得
      $.ajax({          //messages_controller create　actionへ
          url: url,
          type: "POST",
          data: formData,  //送る 
          dataType: 'json',
          processData: false,
          contentType: false
        })
          .done(function(data){  //create.json.jbuilder　からのdata @message, created_at, user_name, id
            var html = buildMessageHTML(data);
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

//自動更新機能
$(function() {
    setInterval(reloadMessages, 30000);
  }); 
  
    var reloadMessages = function() {
      last_message_id = $(".message").last().data("message-id");  //更新前で、最新の.message　の　id
      var url = window.location.href;
      if (url.match(/\/groups\/\d+\/messages/)) { // /groups/:group_id/messages　の形であれば

        $.ajax({
          url: 'api/messages',   // api/messages#index 
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}    // api/messages_controller　に送る
        })
        .done(function(messages) {   //index.json.jbuilder から　@messages の配列
          if (messages.length !== 0) {   //配列が空じゃなければ
            messages.forEach(function(message){  //each　メソッド
              var html = buildMessageHTML(message); //１つのmessageを連れて
              $('.messages').append(html);
              $('html,body').animate({scrollTop: $('.messages')[0].scrollHeight }, 'fast');
            });
          }
        })
        .fail(function() {
        });
      } else {
        clearInterval(reloadMessages); //setIntervalの解除。なぜ？
      }
    };