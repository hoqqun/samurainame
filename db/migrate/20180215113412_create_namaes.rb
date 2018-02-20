class CreateNamaes < ActiveRecord::Migration[5.1]
  def change
    create_table :namaes do |t|
      t.string :romeji
      t.string :nihongo
      t.integer :count
      t.timestamps
    end
  end
end
