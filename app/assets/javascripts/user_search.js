function buildHTML(user){   //user.id と user.name を貰う
    var html =
      `<div class="chat-group-user-search clearfix">
         <p class="chat-group-user__name">${user.name}</p>
         <div class="user-search-add chat-group-user__btn", id= "chat-group-user__btn--add" data-user-id= ${user.id} data-user-name=${user.name}>追加</div>
　     </div>`
    return html;
  }

$(function() {
  $('#user-search-field').on('keyup', function() {
    $(".chat-group-user-search").empty();
      var input = $(this).val();    //１文字入力されたび代入(発火)される

      $.ajax({       //入力された文字をコントローラー（検索して＠usersを返す）に渡す
        type: 'GET',
        url: '/users',
        data:{keyword: input},
        dataType: 'json',
      })

        .done(function(user) {
          //if (input.length !== 0) {  //インクリで空だと全員出ちゃう
            if (user.length !== 0) {         //userに配列が入っている場合
              user.forEach(function(user) {      //user の配列を１つずつ入れる
                var html = buildHTML(user);        //配列の１つを上に連れてく（user.id  user.name）
                $('#user-search-result').append(html);
              })
            //}
          } else {        //userに配列が入っていなければ（候補がない）
            $("#user-search-result").empty();
            $('#user-search-result').append("一致するユーザーが見つかりません");
          }
        })

        .fail(function() {
          alert("ユーザー検索に失敗しました");
        })
          return false;
  });
})

//ユーザ追加
function addUser(user_id, user_name) {
  var html = 
    `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}">
       <input name="group[user_ids][]" type="hidden" value="${user_id}">
       <p class="chat-group-user__name">${user_name}</p>
       <div class="user-search-remove chat-group-user__btn js-remove-btn', id="chat-group-user__btn--remove">削除</div>
       </div>`

  $('#chat-group-users').append(html);
}

//追加ボタンが押されたときの処理
$(function() {
  $(document).on("click", "#chat-group-user__btn--add", function() {  //追加ボタンが押されました
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    addUser(user_id, user_name);    //ユーザーの情報で　html作る
    $(this).parent().remove();     //インクリから消える
  });
})

//削除ボタンを押すと、チャットメンバーから削除する
$(function() {
  $(document).on("click", "#chat-group-user__btn--remove" ,function() {
    $(this).parent().remove();  //削除ボタンの親要素（そのユーザーの１行）を削除
  });
})
