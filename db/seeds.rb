# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Artist.create([
  {
    name: 'Казимир Малевич',
    born: 1879,
    died: 1935
  }, {
    name: 'Владимир Татлин‎',
    born: 1885,
    died: 1953
  }, {
    name: 'Павел Филонов',
    born: 1883,
    died: 1941
  }, {
    name: 'Илья Чашник‎',
    born: 1902,
    died: 1929
  }, {
    name: 'Марк Шагал‎',
    born: 1887,
    died: 1985
  }, {
    name: 'Эль Лисицкий',
    born: 1890,
    died: 1941
  }, {
    name: 'Александр Родченко',
    born: 1891,
    died: 1956
  }
])

[
  {
    title: 'Чёрный квадрат',
    year: 1915
  }, {
    title: 'Башня Татлина',
    year: 1919
  }, {
    title: 'Амазонка',
    year: 1911
  }
]
