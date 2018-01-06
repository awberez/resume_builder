Use resume_db;

INSERT INTO Users (userName, realName, email, phone, password)
VALUE ("AlexTest", "Alex", "alex@alex.alex", "888-888-8888", "password");

INSERT INTO Works (whereWork, whenWork, title, descript, tagOne, tagTwo, tagThree, UserId)
VALUE ("Here", "Last year", "student", "did stuff", "coding", "class", "", "1"), ("There", "Next year", "student", "did stuff", "class", "coding", "stuff", "1");