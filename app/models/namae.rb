class Namae < ApplicationRecord

  def self.getCandidate(initialName)
    str = "#{initialName}%"
    Namae.where('romeji like ?', str)
  end
end
