class Namae < ApplicationRecord
  
  validates :romeji, presence: true
  validates :nihongo, presence: true
  validates :count, presence: true

  def self.candidate(initial)
    str = "#{initial}%"
    Namae.where('romeji like ?', str)
  end

end
