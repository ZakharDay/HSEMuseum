start = Time.now

# Reset Database
Rake::Task['db:drop'].invoke
Rake::Task['db:create'].invoke
Rake::Task['db:migrate'].invoke

@users = [
  {
    email: 'admin@admin.com',
    role: 'admin'
  },
  {
    email: 'moderator@moderator.com',
    role: 'moderator'
  },
  {
    email: 'content@content.com',
    role: 'content'
  },
  {
    email: 'user@user.com',
    role: 'user'
  },
  {
    email: 'banned@user.com',
    role: 'user',
    banned: true
  }
]

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
    teaser:     'Супремати́зм (от лат. supremus — наивысший) — направление в авангардистском искусстве, основанное в 1-й половине 1910-х годов К. С. Малевичем. Являясь разновидностью абстракционизма, супрематизм выражался в комбинациях разноцветных плоскостей простейших геометрических очертаний (в геометрических формах прямой линии, квадрата, круга и прямоугольника). Сочетание разноцветных и разновеликих геометрических фигур образует пронизанные внутренним движением уравновешенные асимметричные супрематические композиции.'
  }, {
    title:      'Кубизм',
    teaser:     'Куби́зм (фр. Cubisme) — модернистское направление в изобразительном искусстве, прежде всего в живописи, зародившееся в начале XX века во Франции и характеризующееся использованием подчёркнуто геометризованных условных форм, стремлением «раздробить» реальные объекты на стереометрические примитивы.'
  }, {
    title:      'Авангард',
    teaser:     'Аванга́рд (фр. avant-garde — передовой отряд), авангарди́зм — обобщающее название течений в мировом, прежде всего в европейском искусстве, возникших на рубеже XIX и XX веков.'
  }, {
    title:      'Минимализм',
    teaser:     'Минимализм (англ. minimalism от лат. minimus — наименьший) — стиль в дизайне, характеризующийся лаконичностью выразительных средств, простотой, точностью и ясностью композиции. Отвергая классические приёмы творчества и традиционные художественные материалы, минималисты используют промышленные и природные материалы простых геометрических форм, нейтральных цветов (чёрный, серый) и малых объёмов. Истоки минимализма лежат в конструктивизме и функционализме.'
  }
]

@annotations = [
  'Супремати́зм (от лат. supremus — наивысший) — направление в авангардистском искусстве, основанное в 1-й половине 1910-х годов К. С. Малевичем. Являясь разновидностью абстракционизма, супрематизм выражался в комбинациях разноцветных плоскостей простейших геометрических очертаний (в геометрических формах прямой линии, квадрата, круга и прямоугольника). Сочетание разноцветных и разновеликих геометрических фигур образует пронизанные внутренним движением уравновешенные асимметричные супрематические композиции.',
  'Куби́зм (фр. Cubisme) — модернистское направление в изобразительном искусстве, прежде всего в живописи, зародившееся в начале XX века во Франции и характеризующееся использованием подчёркнуто геометризованных условных форм, стремлением «раздробить» реальные объекты на стереометрические примитивы.',
  'Аванга́рд (фр. avant-garde — передовой отряд), авангарди́зм — обобщающее название течений в мировом, прежде всего в европейском искусстве, возникших на рубеже XIX и XX веков.',
  'Минимализм (англ. minimalism от лат. minimus — наименьший) — стиль в дизайне, характеризующийся лаконичностью выразительных средств, простотой, точностью и ясностью композиции. Отвергая классические приёмы творчества и традиционные художественные материалы, минималисты используют промышленные и природные материалы простых геометрических форм, нейтральных цветов (чёрный, серый) и малых объёмов. Истоки минимализма лежат в конструктивизме и функционализме.'
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

def random_color
  "%06x" % (rand * 0xffffff)
end

# Create Methods
def create_user(user)
  password = 'testtest'
  banned = user[:banned] ? user[:banned] : false

  User.create!(
    email:    user[:email],
    role:     user[:role],
    banned:   banned,
    password: password,
    password_confirmation: password
  )
end

def create_artist(artist)
  Artist.create(
    name: artist[:name],
    born: artist[:born],
    died: artist[:died]
  )
end

def create_artwork
  Artwork.create!(
    artist_id: random_artist_id,
    title:     @artwork_titles.sample,
    year:      artwork_year,
    image:     upload_fake_image,
    user_id:   User.all.sample.id
  )
end

def create_gallery(gallery, user_id)
  Gallery.create!(
    title:      gallery[:title],
    teaser:     gallery[:teaser],
    background: random_color,
    user_id:    user_id
  )
end

def create_exhibition(gallery, artwork)
  gallery.exhibitions.create!(
    artwork_id: artwork.id
  )
end

def create_annotation(gallery, annotation)
  gallery.annotations.create!(
    body:    annotation,
    user_id: gallery.user_id
  )
end

# Seed Database With Fake Data
@users.each do |user|
  u = create_user(user)
  puts "User with email #{u.email} created"
end

@artists.each do |artist|
  a = create_artist(artist)
  puts "Artist #{a.id} created"
end

100.times do
  artwork = create_artwork
  puts "Artwork #{artwork.id} created"
end

User.all.each do |user|
  gallery = @galleries.sample
  g = create_gallery(gallery, user.id)
  puts "Gallery #{g.id} created"
end

@artworks = Artwork.all

Gallery.all.each do |gallery|
  5..20.times do
    artwork = @artworks.sample
    gallery_artworks = Gallery.find(gallery.id).artworks

    unless gallery_artworks.include?(artwork)
      e = create_exhibition(gallery, artwork)
      puts "Gallery #{gallery.id} artwork #{e.artwork_id} exhibition #{e.id} created"
    end
  end

  2..5.times do
    a = create_annotation(gallery, @annotations.sample)
    puts "Gallery #{gallery.id} annotation #{a.id} created"
  end

end

finish = Time.now
duration = finish - start
puts "Task completed in #{duration}"
