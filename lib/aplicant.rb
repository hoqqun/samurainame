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
  # length : 可変的な取り出しに対応(初期値1文字のみ)
  def initial_name(length:1)
    self.original_name[0...length].downcase
  end
end