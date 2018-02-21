class AddGenderToNames < ActiveRecord::Migration[5.1]
  def change
    add_column :namaes, :gender, :integer
  end
end
