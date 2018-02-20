class CreateMyoujis < ActiveRecord::Migration[5.1]
  def change
    create_table :myoujis do |t|
      t.string :romeji
      t.string :nihongo
      t.string :count
      t.timestamps
    end
  end
end
