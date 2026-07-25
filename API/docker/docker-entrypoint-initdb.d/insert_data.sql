\connect math

SET SESSION AUTHORIZATION math;

-- test user
--------- email: u1@test.com
--------- password: 123123123
INSERT INTO math.user (email, password) VALUES ('u1@test.com', '$2a$10$XpSGJPkAATJ.O6gQRA4EMO/ZHlXPRbBsaJlTkDon3yTaYMCDkAnuG');

-- roles
INSERT INTO math.role (name, "desc") VALUES ('student', 'User of the mobile application');
INSERT INTO math.role (name, "desc") VALUES ('teacher', 'Has access to creating new courses and exercises');

-- permissions
INSERT INTO math.permissions(user_id, role_name) VALUES (1, 'teacher');



-- course
INSERT INTO math.course (name, description, image)
VALUES ('тригонометрия', 'Единичная тригонометрическая формула: $\sin^{2}\alpha + \cos^{2}\alpha = 1$',  'images/course/trygonometry.png');
INSERT INTO math.course (name, description, image)
VALUES ('стереометрия', 'Прямоугольный параллелепипед: - Длины сторон: a, b, c - Площадь поверхности = 2(ab + bc + ac) - Объем = ab Острый угол: - Площадь основы: P_{p} - Высота: H - Объем = $\frac{1}{3}P_{p}H$', 'images/course/geometry.png');
INSERT INTO math.course (name, description, image)
VALUES ('дроби', 'Некоторое описание', 'images/course/fractions.png');
INSERT INTO math.course (name, description, image)
VALUES ('функции', 'Некоторое описание', 'images/course/functions.png');
INSERT INTO math.course (name, description, image)
VALUES ('вероятность', 'Некоторое описание', 'images/course/probability.png');
INSERT INTO math.course (name, description, image)
VALUES ('статистика', 'Некоторое описание', 'images/course/statistics.png');
INSERT INTO math.course (name, description, image)
VALUES ('планиметрия', 'Некоторое описание', 'images/course/planimetry.png');
INSERT INTO math.course (name, description, image)
VALUES ('числовые последовательности', 'Некоторое описание', 'images/course/numerical_sequences.png');
INSERT INTO math.course (name, description, image)
VALUES ('уравнения и неравенства', 'Некоторое описание', 'images/course/equations.png');
-- course_author
INSERT INTO math.course_author (course_id, author_id) VALUES (1,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (2,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (3,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (4,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (5,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (6,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (7,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (8,1);
INSERT INTO math.course_author (course_id, author_id) VALUES (9,1);

-- exercises
INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id, solution)
VALUES ('\text{Если } \sin \alpha= \frac{4}{5} \text{ и } \alpha \text{ является острым углом, то:}',
        '{ "data":[{"answer":"\cos \alpha = \frac{3}{5}"}]}',
        '{ "data":[{"answer":"\cos \alpha = -\frac{4}{5}"},{"answer":"\cos \alpha = -\frac{3}{5}"}, {"answer":"\cos \alpha = \frac{9}{25}"}]}', 1,
        '\sin^2\alpha + \cos^2\alpha = 1  \quad  \cos^2\alpha = 1 - \sin^2\alpha \quad \cos^2\alpha = 1 - \left(\frac{4}{5}\right)^2 \quad \cos^2\alpha = 1 - \frac{16}{25} = \frac{9}{25} \quad \text{Так как } \alpha \text{ является острым углом, то } \underline{\cos\alpha = \frac{3}{5}}');

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Треугольник может иметь только один прямой угол}',
        '{"data": [{"answer":"\text{Правда}"}]}', '{"data": [{"answer":"\text{Ложь}"}]}', 1);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Число } \sin 60^\circ + \cos 60^\circ \text{ равно}','{"data": [{"answer":"\frac{\sqrt{3} +1}{2}"}]}',
        '{"data": [{"answer":"\frac{\sqrt{3} +1}{3}"},{"answer":"\frac{2\sqrt{3} +1}{6}"},{"answer":"\frac{1}{2}"},{"answer":"\frac{\sqrt{3}}{2}"},{"answer":"\frac{\sqrt{3}}{4}"}]}',1);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id, image)
VALUES ('\text{В треугольнике, изображенном на рисунке выше, синус острого угла } \alpha \text{ равен}',
        '{"data": [{"answer":"\frac{2\sqrt{6}}{5}"}]}', '{"data": [{"answer":"\frac{\sqrt{6}}{12}"},{"answer":"\frac{1}{5}"},{"answer":"\frac{5}{24}"}]}', 1, 'https://math-user-api.herokuapp.com/images/exercise/img1.png');

INSERT INTO math.exercise (question, correct_answers, course_id)
VALUES ('\tan\alpha \cot\alpha \text{ равно}','{"data": [{"answer":"1"}]}',1);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Уравнение } 2x^2 - 4x - 3 = 0:','{"data": [{"answer":"имеет⠀два⠀решения"}]}',
        '{"data": [{"answer":"не⠀имеет⠀решений"},{"answer":"имеет⠀одно⠀решение"},{"answer":"имеет⠀бесконечно⠀много⠀решений"}]}',9);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Количество решений уравнения } \frac{x^2-5}{5-x} = 0, \text{равно:}','{"data": [{"answer":"2"}]}',
        '{"data": [{"answer":"0"},{"answer":"1"},{"answer":"3"}]}',9);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Среднее арифметическое семи чисел равно 3. После добавления числа 11 среднее арифметическое этих чисел станет равным:}',
        '{"data": [{"answer":"4"}]}','{"data": [{"answer":"6"},{"answer":"3"},{"answer":"10"}]}',9);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Решением уравнения } \frac{3}{2x-1} = 2 \text{ является число:}','{"data": [{"answer":"1,25"}]}',
        '{"data": [{"answer":"0,5"},{"answer":"-1,25"},{"answer":"1,2"}]}',9);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Множеством решений неравенства} 2x^2 - 8 > 0 \text{является:}',
        '{"data": [{"answer":"(-∞, -2) ∪ (2, +∞)"}]}',
        '{"data": [{"answer":"(-∞, -2] ∪ [2, +∞)"},{"answer":"(-2, 2)"},{"answer":"]-2, 2["}]}', 9);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Наибольшим натуральным числом, удовлетворяющим неравенству } \frac{n+15}{n} > 3, \text{ является:}',
        '{"data": [{"answer":"7"}]}','{"data": [{"answer":"8"},{"answer":"6"},{"answer":"не⠀существует"}]}',9);

INSERT INTO math.exercise (question, correct_answers, incorrect_answers, course_id)
VALUES ('\text{Решением уравнения } x^2 + x = (x + 1)^2 - 7(x + 2) \text{ является число:}', '{"data": [{"answer":"-\\frac{13}{6}"}]}',
        '{"data": [{"answer":"-\\frac{13}{8}"}, {"answer": "+\\frac{15}{8}"}, {"answer": "+\\frac{15}{6}"}]}', 9);