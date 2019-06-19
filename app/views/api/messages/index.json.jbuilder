json.array! @messages do |message|#最新の@messages　update.js の .done　に渡す
    json.content message.content
    json.image message.image
    json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
    json.user_name message.user.name
    json.id message.id
  end