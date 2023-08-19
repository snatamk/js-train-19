// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book
const Book = {
  title: "Загальна Книга",
  author: "Анонім",
  pages: 0,
  read() {
    return `Ви читаєте "${this.title}" від ${this.author}`;
  },
};

const proBook = Object.create(Book);

console.log(Book); // {....}
console.log(Book.isPrototypeOf(proBook)); // true
console.log(Book.read()); //Ви читаєте "Загальна Книга" від Анонім

console.log("Завдання: 1 ==============================");

// Виводимо в консоль Об'єкт: Book

// Виводимо в консоль прототип Об'єкту: Book

// Викликаємо функцію read об'єкту Book

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість genre

const Novel = Object.create(Book);
Novel.genre = "Новела";

console.log(Novel); // { title: 'Загальна Біографія', author: 'Біограф', pages: 200 }
console.log(Object.getPrototypeOf(Novel)); // true

console.log("Завдання: 2 ==============================");

// Виводимо в консоль Об'єкт: Novel

// Виводимо в консоль прототип Об'єкту: Novel

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography

// Змінемо прототип об'єкта Biography на Novel

const Biography = {
  title: "Загальна Біографія",
  author: "Біограф",
  pages: 200,
};
const proBiography = Object.create(Biography);
Object.setPrototypeOf(proBiography, Novel);

console.log(Biography); // Про книгу "Фізика 101": написана в 1915 році
console.log(Novel.isPrototypeOf(proBiography)); //{ get: [Function: get], set: [Function: set], enumerable: false, configurable: false}

console.log("Завдання: 3 ==============================");
// Виводимо в консоль Об'єкт: Biography

// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість 'info' за допомогою Object.defineProperty
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

const ScienceBook = Object.create(Book);
Object.defineProperty(ScienceBook, `info`, {
  value: "написана в 1915 році",
  writable: false,
  configurable: false,
});
//console.log(ScienceBook.info); // Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'
Object.defineProperty(ScienceBook, `info2`, {
  set(value) {
    this.info = value;
  },
  get() {
    return `Про книгу "${this.title}": ${this.info}`;
  },
});
ScienceBook.title = "Фізика 101";
ScienceBook.author = "Альберт Ейнштейн";

console.log(ScienceBook.info2); //Про книгу "Фізика 101": написана в 1915 році
console.log(Object.getOwnPropertyDescriptor(ScienceBook, "info2")); // {.....}

console.log("Завдання: 4 ==============================");
// Виводимо в консоль властивість info

// Виводимо в консоль налаштування властивости info

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook

// Перевизначаємо метод read(), відповідно з дописом вище

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |

const Textbook = Object.create(ScienceBook);

Textbook.title = "Фізика у Вищій Школі";
Textbook.author = "Дж. Д. Джонс";
Textbook.read = function () {
  return `Ви читаєте підручник "${this.title}" від ${this.author}. ${this.info2}.`;
};
console.log(Textbook.read()); // Ви читаєте підручник "Фізика у Вищій Школі"
// від Дж. Д. Джонс. Про книгу "Фізика у Вищій Школі": написана в 1915 році.

console.log("Завдання: 5 ==============================");
// Викликаємо функцію read об'єкту Textbook

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media
const Media = {
  format: "Загальний Формат",
  length: 0,
  play() {
    console.log(
      `Зараз відтворюється медіа у форматі "${this.format}" з тривалістю ${this.length} секунд`
    );
  },
};

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media
const Song = Object.create(Media);
Song.artist = "Загальний Виконавець";
Song.title = "Загальна Пісня";
// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

Song.play(); // Зараз відтворюється медіа у форматі "Загальний Формат" з тривалістю 0 секунд

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song
