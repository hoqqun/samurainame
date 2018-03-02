class NamesController < ApplicationController
  def index
  end

  # POSTメソッド fetchAPI ルーティング：/names/fetch
  def fetch

    # パラメータをわかりやすいように変数に格納する
    original_name = params[:name][:name]
    male_flg = params[:name][:male]

    # 誕生日オブジェクトを生成 Birthクラスの定義はlibディレクトリ
    birth = Birth.new(
      params[:name][:birth_date][:birth_year].to_i,
      params[:name][:birth_date][:birth_month].to_i,
      params[:name][:birth_date][:birth_day].to_i
    )

    # WEBサービス利用者オブジェクトを生成 Aplicantクラスの定義はlibディレクトリ
    aplicant = Aplicant.new(
      original_name,
      birth,
      male_flg
    )
    
    # 命名を司る神オブジェクトを生成 Godクラスの定義はlibディレクトリ
    god = God.new(aplicant)

    # 命名する
    given_name = god.meimei

    respond_to do |format|
      format.json { render json: {nihongo:given_name[:nihongo], romeji:given_name[:romeji] }}
    end
  end
end