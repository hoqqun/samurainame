class NamesController < ApplicationController
  def index
  end

  def fetch

    # WEBサービス利用者オブジェクトを生成
    aplicant = Aplicant.new(
      params[:name][:name],
      Birth.new(
        params[:name][:birth_date][:birth_year].to_i,
        params[:name][:birth_date][:birth_month].to_i,
        params[:name][:birth_date][:birth_day].to_i
      ),
      params[:name][:male]
    )
    
    # 命名を司る神オブジェクトを生成
    god = God.new(aplicant)

    # 命名する
    given_name = god.meimei

    respond_to do |format|
      format.json { render json: {nihongo:given_name[:nihongo], romeji:given_name[:romeji] }}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def names_params
      params.require(:name).permit(:name)
    end
end

# 申請者クラス
# このサービスを利用している人のクラスです。
# 利用者名、性別、誕生日を保持し、新たな名前を
class Aplicant
  attr_reader :original_name
  attr_reader :male
  attr_reader :birth
  
  def initialize(original_name,birth,male)
    @original_name = original_name
    @birth = birth
    @male = male
  end

  # 名前(入力された文字列の最初)のイニシャルを取得する
  def initialName
    self.original_name[0]
  end
end

# 誕生日クラス
class Birth
  attr_accessor :year
  attr_accessor :month
  attr_accessor :day

  def initialize(year,month,day)
    @year = year
    @month = month
    @day = day
  end

  # 誕生年 + 誕生月 + 誕生日を合算
  def sumBirth
    self.year + self.month + self.day
  end
end

# 命名をする神クラス
class God
  attr_reader :aplicant

  def initialize(aplicant)
    @aplicant = aplicant
  end

  # 命名メソッド
  # WEBサービス利用者の名前と誕生日から命名する
  def meimei
    getNameObject(Namae.getCandidate(self.aplicant.initialName))
  end

  private 
    # 名前オブジェクトを取得すう
    def getNameObject(name_records)
      recNum = decideRecNum(name_records)
      name_records[recNum]
    end

    # レコード番号を決定する
    def decideRecNum(name_records)
      (self.aplicant.birth.sumBirth % name_records.count)
    end
end