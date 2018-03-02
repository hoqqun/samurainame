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
  def sum_birth
    self.year + self.month + self.day
  end
end