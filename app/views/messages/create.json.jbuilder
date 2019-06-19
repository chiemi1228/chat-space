json.(@message, :content, :image)  #message.@message => ("content": "こんにちは", "image": "srgvafdv.img")
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id