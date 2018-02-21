class CreateNamaeFemales < ActiveRecord::Migration[5.1]
  def change
    create_table :namae_females do |t|
      t.string :romeji
      t.string :nihongo
      t.integer :count
      t.timestamps
    end
  end
end
