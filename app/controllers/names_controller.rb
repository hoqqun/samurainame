class NamesController < ApplicationController
  def index
  end

  def fetch
    binding.pry
    
    respond_to do |format|
      format.json { render json: {nihongo:"英語太郎" }}
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

      #画数変換
    def extractKakusuu(names)
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

      names.each_char do |c|
        puts c
        count = count + alphabet_list[c.downcase]
      end
      count
    end
end
