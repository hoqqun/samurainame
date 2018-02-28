# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 苗字をINSERTする。
#Myouji.delete_all
#Namae.delete_all
#Myouji.reset_pk_sequence!
#Namae.reset_pk_sequence!

myouji_list = [["Akimoto","秋元"],["Shimura","志村"]]
namae_list  = [["Tarou","太郎",true],["Teturou","哲郎",true],["Jirou","次郎",true],["Himura Kenshin","緋村　剣心",true]]
namae_female_list = [["Aiko","愛子"],["Hanako","花子"]]

myouji_list.each do |myouji|
  Myouji.new(romeji: myouji[0], nihongo: myouji[1]).save
end

namae_list.each do |namae|
  Namae.new(romeji: namae[0], nihongo: namae[1], male: namae[2]).save
end

namae_female_list.each do |namae|
  NamaeFemale.new(romeji: namae[0], nihongo: namae[1]).save
end


puts "名字テーブル：" + Myouji.count.to_s
puts "名前(男)テーブル：" + Namae.count.to_s
puts "名前(女)テーブル：" + NamaeFemale.count.to_s