# The movie API

Приложение для отображаения фильмов и подробной информации о каждом. 
По умолчанию на сайте загружаются фильмы из рейтинга лучших фильмов.
Кроме того, можно переключится на популярные и фильмы, которые сейчас в прокате. 

### Поиск
Приложение способно осуществлять поиск по названию. 

### Загрузка данных
Данные загружаются с сервера в количестве 20 элементов и 
отображаются на экране в количестве 8 элементов (4 на маленьких экранах).
Если все текущие элементы уже показаны, происходит дозагрузка данных, 
пока она возможна.

Дополнительно добавил лоадер, который появляется, пока данные загружаются. 
Если картинки на сервере нет, то вместо неё отображается заглушка.

### Отдельный фильм
При клике на любой из фильмов, открывается его подробная информация. 

[Приложение можно посмотреть здесь](https://maestros123.github.io/Movie-API/)
