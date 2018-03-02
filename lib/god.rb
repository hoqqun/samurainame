# 命名をする神クラス
class God
  attr_reader :aplicant

  def initialize(aplicant)
    @aplicant = aplicant
  end

  # 命名メソッド
  # WEBサービス利用者の名前と誕生日から命名する
  def meimei
    
    #イニシャルのみでは名前が見つからない場合があるので、
    #検索ワードの優先度を緩和して徐々に検索する。
    search_words = {priority_1: self.aplicant.initial_name(length:2),
                    priority_2: self.aplicant.initial_name,
                    priority_3: ""}

    if self.aplicant.male
      name_record(Namae.candidate(search_words[:priority_1])) or 
      name_record(Namae.candidate(search_words[:priority_2])) or 
      name_record(Namae.candidate(search_words[:priority_3]))
    else
      name_record(NamaeFemale.candidate(search_words[:priority_1])) or 
      name_record(NamaeFemale.candidate(search_words[:priority_2])) or 
      name_record(NamaeFemale.candidate(search_words[:priority_3]))
    end
  end

  private 
    # テーブルのアクティブレコードを1件取得する
    def name_record(name_records)
      rec_num = decide_record_num(name_records.count)
      name_records[rec_num] # name_records = [nil] の場合、いかなる要素番号を指定してもnilが戻る
    end

    # レコード番号を決定する
    # レコードが0件の場合は0を返す
    def decide_record_num(name_records_count)
      unless name_records_count == 0
        self.aplicant.birth.sum_birth % name_records_count
      else
        0
      end
    end
end