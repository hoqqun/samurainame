# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 苗字をINSERTする。
Myouji.delete_all
Namae.delete_all

myouji_list = [["Akimoto","秋元"],["Shimura","志村"]]
namae_list  = [["Tarou","太郎"],["Jirou","次郎"]]

myouji_list.each do |myouji|
  Myouji.new(romeji: myouji[0], nihongo: myouji[1]).save

end

namae_list.each do |namae|
  Namae.new(romeji: namae[0], nihongo: namae[1]).save
end

puts "名字テーブル：" + Myouji.count.to_s
puts "名前テーブル：" + Namae.count.to_s