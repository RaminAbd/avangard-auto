export class LanguagedErrorHandler {
  public static LanguagedErrorHandler() {
    var obj = {
      summary: { 'ka-Geo': 'შეცდომა', 'en-Us': 'Error', 'ru-Ru': 'Ошибка' },
      detail: {
        'ka-Geo': 'შეავსეთ ყველა საჭირო ველი',
        'en-Us': 'Fill in all required fields',
        'ru-Ru': 'Заполните все обязательные поля'
      },
    }
    return obj;
  }

}
