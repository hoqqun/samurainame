class ChangeGenderTypeToBoolean < ActiveRecord::Migration[5.1]
  def change
    rename_column :namaes, :gender, :male
    change_column :namaes, :male, 'boolean USING CAST(male AS boolean)', default:true, null:false
  end
end
