class Api::MessagesController < ApplicationController
    def index
        respond_to do |format|
            format.html
            format.json { @messages = Message.where('id > ?', params[:id]).where(group_id: params[:group_id])}
                 # @messages = idが、params[:id](前回までで最新の.message　の　id)より大きいもの全て
                 # api/index.json.jbuilder に送る
    end
  end
end