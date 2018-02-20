class ChangeColumnType < ActiveRecord::Migration[5.1]
  def change
    change_column :myoujis, :count, 'integer USING CAST(count AS integer)'
  end
end
