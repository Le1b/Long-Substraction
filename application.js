(function() {
   var app = {
      /**
       * firstNum & secondNum - числа над которыми будут проводится операция вычитания
       * result - результат вычитания чисел
       * symbol - знак конечного числа
       */
      firstNum: 0,
      secondNum: 0,
      result: [],
      symbol: '',

      // Начало программы
      initialize: function() {
         this.setUpListeners();
      },

      // Установка обработчиков событий
      setUpListeners: function() {
         // Для полей ввода
         $('input').on("change keyup keydown", $.proxy(this.maxLengthNumber, this));
      },

      // Функция проверки на максимальную длинну вводимых чисел
      maxLengthNumber: function() {
         if (jQuery('#first').val().length > 256 || jQuery('#second').val().length > 256) {
            alert('Максимальная длинна числа должна составлять 256.');
         } else {
            this.processing();
         }
      },

      // Обработка полей вводимых чисел
      processing: function() {
         // Очистка массива разницы чисел, сброс знака конечного числа
         this.result = [];
         this.symbol = '';

         // Вызов функции проверки полей на ввод только чисел
         this.firstNum = this.onlyDigit('#first');
         this.secondNum = this.onlyDigit('#second');

         /** Если длинна первого массива меньше чем длинна второго числа,
          * то конечное число будет отрицательным. В переменную symbol
          * заносим знак "-" и менаем числа местами.
          */
         if (this.firstNum.length < this.secondNum.length) {
            this.interchange();
            this.symbol = '-';

            // Если числа одинаковые по длинне, но не равны друг другу
         } else if (this.firstNum.length == this.secondNum.length) {
            // Сравнивание каждой цыфры двух чисел
            for (var i = 0; i < this.firstNum.length; i++) {
               /** Если в первом числе цифра больше чем во втором,
                * значит первое число больше чем второе,
                * выходим из цикла проверки
                */
               if (this.firstNum[i] > this.secondNum[i]) {
                  break;
                  /** Если цифра в первом числе меньше чем во втором,
                   * меняем числа местами, так как второе число больше первого
                   * и в переменную symbol заносим знак "-".
                   */
               } else if (this.firstNum[i] < this.secondNum[i]) {
                  this.interchange();

                  this.symbol = '-';
                  break;
               }
            }
         }
         // Выполняем функию вычитания чисел
         this.subtraction(this.firstNum, this.secondNum);
      },

      // Функция вычитания чисел
      subtraction: function(firstNum, secondNum) {
         // Перевод чисел из строкового вида в массив
         // и переварачивание массива задом на перед.
         firstNum = firstNum.split('').reverse();
         secondNum = secondNum.split('').reverse();

         // b - результат вычитания цифр числа
         // с - результат вычитания разряда
         for (var i = 0, b = 0, c = 0; i < firstNum.length; i++) {
            // Перевод цифр из строчных в числовые и сложение числа разряда
            b = +firstNum[i] - (+secondNum[i] || 0) + c;
            // Если полученое число меньше 0, отнимаем от старшего разряда 1,
            // прибавляем 10 к полученому числу.
            this.result[i] = b < 0 ? (c = -1, 10 + b) : (c = 0, b);
         }

         /** В поле результата заносим символ числа,
          * переворачиваем массив обратно(что бы число правильно отобразить),
          * переводим массив в строковый вид,
          * удаляем 0 вначале числа.
          */
         $('#result').val((this.symbol || '') + (this.result.reverse().join('').replace(/^0+/, '') || 0));
      },

      // Функция обмена чисел местами
      interchange: function() {
         var tmp = this.firstNum;
         this.firstNum = this.secondNum;
         this.secondNum = tmp;
      },

      // Функция удаляет в полях ввода все символа кроме цифр,
      // также удаляет 0 вначале числа, возвращает введенное число.
      onlyDigit: function(element) {
         $(element).val($(element).val().replace(/\D/, '').replace(/^0+/, ''));
         return $(element).val();
      }

   };

   // Старт программы
   app.initialize();
}());
