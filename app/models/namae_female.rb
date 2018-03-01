class NamaeFemale < ApplicationRecord
  validates :romeji, presence: true
  validates :nihongo, presence: true
  validates :count, presence: true

  def self.getCandidate(initialName)
    str = "#{initialName}%"
    NamaeFemale.where('romeji like ?', str)
  end
end
