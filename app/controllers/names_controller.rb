class NamesController < ApplicationController
  def index
  end

  def fetch

    aplicant = Aplicant.new(
      params[:name][:name],
      Birth.new(
        params[:name][:birth_year].to_i,
        params[:name][:birth_month].to_i,
        params[:name][:birth_day].to_i
      ),
      params[:name][:male]
    )

    given_name = aplicant.meimei

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

class Aplicant
  attr_reader :original_name
  attr_reader :male
  attr_reader :birth
  
  def initialize(original_name,birth,male)
    @original_name = original_name
    @birth = birth
    @male = male
  end
  
  def meimei()

    name_count = nameToNumber(self.original_name,self.birth)

    if self.male
      Namae.find(numberToId(name_count,Namae.count))
    else
      NamaeFemale.find(numberToId(name_count,NamaeFemale.count))
    end
  end


  #数値をレコードIDに変換する
  def numberToId(count,maxRecordNum)
    (count % maxRecordNum) + 1
  end

  #オリジナルの名前と生年月日から独自アルゴリズムで数値に変換する
  def nameToNumber(name,birth)
    count = 0

    alphabet_list = {"a" => 1,
                    "b" => 2,
                    "c" => 3,
                    "d" => 4,
                    "e" => 5,
                    "f" => 6,
                    "g" => 7,
                    "h" => 8,
                    "i" => 9,
                    "j" => 10,
                    "k" => 11,
                    "l" => 12,
                    "m" => 13,
                    "n" => 14,
                    "o" => 15,
                    "p" => 16,
                    "q" => 17,
                    "r" => 18,
                    "s" => 19,
                    "t" => 20,
                    "u" => 21,
                    "v" => 22,
                    "w" => 23,
                    "x" => 24,
                    "z" => 25,
                    " " => 0}

    name.each_char do |c|
      puts c
      count = count + alphabet_list[c.downcase]
    end
    count + birth.year + birth.month + birth.day
  end
end

class Birth
  attr_accessor :year
  attr_accessor :month
  attr_accessor :day

  def initialize(year,month,day)
    @year = year
    @month = month
    @day = day
  end
end