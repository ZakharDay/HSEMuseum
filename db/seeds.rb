# Reset Database
Rake::Task['db:drop'].invoke
Rake::Task['db:create'].invoke
Rake::Task['db:migrate'].invoke

# Set Fake Data
@artists = [
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
]

@artwork_titles = [
  'Чёрный квадрат',
  'Башня Татлина',
  'Амазонка'
]

@galleries = [
  {
    title:      'Супрематизм',
    teaser:     'Супремати́зм (от лат. supremus — наивысший) — направление в авангардистском искусстве, основанное в 1-й половине 1910-х годов К. С. Малевичем. Являясь разновидностью абстракционизма, супрематизм выражался в комбинациях разноцветных плоскостей простейших геометрических очертаний (в геометрических формах прямой линии, квадрата, круга и прямоугольника). Сочетание разноцветных и разновеликих геометрических фигур образует пронизанные внутренним движением уравновешенные асимметричные супрематические композиции.',
    background: 'FF0000'
  }, {
    title:      'Кубизм',
    teaser:     'Куби́зм (фр. Cubisme) — модернистское направление в изобразительном искусстве, прежде всего в живописи, зародившееся в начале XX века во Франции и характеризующееся использованием подчёркнуто геометризованных условных форм, стремлением «раздробить» реальные объекты на стереометрические примитивы.',
    background: '00FF00'
  }, {
    title:      'Авангард',
    teaser:     'Аванга́рд (фр. avant-garde — передовой отряд), авангарди́зм — обобщающее название течений в мировом, прежде всего в европейском искусстве, возникших на рубеже XIX и XX веков.',
    background: '0000FF'
  }, {
    title:      'Минимализм',
    teaser:     'Минимализм (англ. minimalism от лат. minimus — наименьший) — стиль в дизайне, характеризующийся лаконичностью выразительных средств, простотой, точностью и ясностью композиции. Отвергая классические приёмы творчества и традиционные художественные материалы, минималисты используют промышленные и природные материалы простых геометрических форм, нейтральных цветов (чёрный, серый) и малых объёмов. Истоки минимализма лежат в конструктивизме и функционализме.',
    background: '0000BB'
  }
]

# Fake Data Methods
def random_artist_id
  Artist.offset(rand(Artist.count)).first.id
end

def upload_fake_image
  uploader = ImageUploader.new(Artwork.new, :image)
  uploader.cache!(File.open(Dir.glob(File.join(Rails.root, 'lib/tasks/artworks', '*')).sample))
  uploader
end

def artwork_year
  rand(1850..1950)
end

# Create Methods
def create_artist(artist)
  Artist.create(
    name: artist.name,
    born: artist.born,
    died: artist.died
  )
end

def create_artwork
  Artwork.create(
    artist_id: random_artist_id,
    title:     @artwork_titles.sample,
    year:      artwork_year,
    image:     upload_fake_image
  )
end

def create_gallery(gallery)
  Gallery.create(
    title:      gallery.title,
    teaser:     gallery.teaser,
    background: gallery.background
  )
end

# Seed Database With Fake Data
@artists.each do |artist|
  create_artist(artist)
  puts "Artist #{artist.id} created"
end

100.times do
  artwork = create_artwork
  puts "Artwork #{artwork.id} created"
end

@galleries.each do |gallery|
  create_gallery(gallery)
  puts "Gallery #{gallery.id} created"
end
