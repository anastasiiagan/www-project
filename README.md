Jest to aplikacja Rest Api, nie zawiera fronendu, a testowana jest przy pomocy Postman.\
Projekt miał na celu stworzyć backend do prostej aplikacji z autoryzacją użytkowników. Jako bazę danych wykorzystuję bazę MongoDb przy pomocy pakietu mongoose, za pomocą którego łączę się z bazą na MongoDb Cloud. Baza zawiera 3 tablice: users, posts oraz recommendations. Użytkownicy mogą robić tak zwane posty z ciekawymi pomysłami oraz przemyśleniami bądź udstępniać rekomendacje do stron internetwych, które mają ciekawą i korzystną zawartość.\

Aby zrealizować projekt, korzystam z takich technologii jak NodeJS, ExpressJS oraz MongoDB. Przy pomocy pakietu '@hapi/joi' weryfikuję poprawność przesłanych danych w body requestu, biblioteki 'bcryptjs' oraz 'jsonwebtoken' wspomagają zaszyfrowanie hasła użytkownika oraz walidacji, czy konkretny użytkownik jest zalogowany i ma prawo do wykonywania różnych czynności. \

Zapytania http: \
1. Users --- znajduje się w pliku auth.js \
    - ***GET*** /api/user/ \
    Dla zalogowanego użytkownika wypisuję listę wszystkich innych użytkowników i ich dane \
    - ***POST*** /api/user/register/ \
    Registruje użytkownika, trzeba podać nazwę, email oraz hasło. Weryfikuję istnienie emailu w bazie danych oraz popawność niezbędnych danych \
    - ***POST*** /api/user/login/ \
    Zalogowuje użytkownika \
2. Recommendations --- znajduje się w pliku recommendations.js \
    - ***GET*** /api/recommendations/ \
    Dla zalogowanego użytkownika wypisuję listę wszystkich rekomendacji \
    - ***POST*** /api/recommendations/recommend/ \
    Dla zalogowanego użytkownika dodaje nową rekomendację która zawiera: {'link', 'description', 'category' } \
    - ***GET*** /api/recommendations/:recId/ \
    Dla zalogowanego użytkownika zwraca dane dotyczące rekomendacji o zadanym id \
    - ***PATCH*** /api/recommendations/like/:recId/ \
    Dla zalogowanego użytkownika zwiększa o 1 ilość lajków dla rekomendacji o zadanym id \
    - ***DELETE*** /api/recommendations/:recId/ \
    Dla zalogowanego użytkownika usuwa rekomendację o zadanym id \
3. Posts --- znajduje się w pliku posts.js \
    - ***GET*** /api/posts/ \
    Dla zalogowanego użytkownika wypisuję listę wszystkich postów \
    - ***POST*** /api/posts/ \
    Dla zalogowanego użytkownika dodaje nowy post który zawiera: {'title', 'description' } \
    - ***GET*** /api/posts/:postId/ \
    Dla zalogowanego użytkownika zwraca dane dotyczące postu o zadanym id \
    - ***PATCH*** /api/posts/:postId/ \
    Dla zalogowanego użytkownika zmienia tytuł postu o zadanym id \
    - ***DELETE*** /api/posts/:postId/ \
    Dla zalogowanego użytkownika usuwa post o zadanym id \

