# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'yaml'
require 'romaji'

NAMES = YAML.load_file('./db/names.yml')

NAMES["first_name"]["male"].each do |name|
  Namae.new(romeji: Romaji.kana2romaji(name[1]), nihongo: name[0], male: true,count:0).save
end

NAMES["first_name"]["female"].each do |name|
  NamaeFemale.new(romeji: Romaji.kana2romaji(name[1]), nihongo: name[0], count:0).save
end

myouji_list = [["Akimoto","秋元"],["Shimura","志村"]]
#namae_list  = [["Tarou","太郎",true],["Teturou","哲郎",true],["Jirou","次郎",true],["Himura Kenshin","緋村　剣心",true]]
namae_female_list = [["Aiko","愛子"],["Hanako","花子"]]

myouji_list.each do |myouji|
  Myouji.new(romeji: myouji[0], nihongo: myouji[1]).save
end

#namae_list.each do |namae|
#  Namae.new(romeji: namae[0], nihongo: namae[1], male: namae[2]).save
#end

#namae_female_list.each do |namae|
#  NamaeFemale.new(romeji: namae[0], nihongo: namae[1]).save
#end




puts "名字テーブル：" + Myouji.count.to_s
puts "名前(男)テーブル：" + Namae.count.to_s
puts "名前(女)テーブル：" + NamaeFemale.count.to_s