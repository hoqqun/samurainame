class NamaeFemale < ApplicationRecord
  validates :romeji, presence: true
  validates :nihongo, presence: true
  validates :count, presence: true
end
