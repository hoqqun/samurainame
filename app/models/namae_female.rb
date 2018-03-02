class NamaeFemale < ApplicationRecord
  validates :romeji, presence: true
  validates :nihongo, presence: true
  validates :count, presence: true

  def self.candidate(initial)
    str = "#{initial}%"
    NamaeFemale.where('romeji like ?', str)
  end
end
