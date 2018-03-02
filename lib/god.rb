# 命名をする神クラス
class God
  attr_reader :aplicant

  def initialize(aplicant)
    @aplicant = aplicant
  end

  # 命名メソッド
  # WEBサービス利用者の名前と誕生日から命名する
  def meimei
    if self.aplicant.male 
      name_record(Namae.candidate(self.aplicant.initial_name.downcase))
    else
      name_record(NamaeFemale.candidate(self.aplicant.initial_name.downcase))
    end
  end

  private 
    # 名前オブジェクトを取得すう
    def name_record(name_records)
      rec_num = decide_record_num(name_records)
      name_records[rec_num]
    end

    # レコード番号を決定する
    def decide_record_num(name_records)
      self.aplicant.birth.sum_birth % name_records.count
    end
end