--Sample data
insert into "availabilityTypes" ("label")
     values ('Weekends Morning'),
            ('Weekends Afternoon'),
            ('Weekends Evening'),
            ('Weekdays Morning'),
            ('Weekdays Afternoon'),
            ('Weekdays Evening');

insert into "Users" ("firstName", "lastName", "email", "password", "profileImage", "bio", "interests")
     values ('Helen', 'Biren', 'helenbiren@aol.com', 'hash789', 'server/public/images/user1.png', 'Born in Redhook, Brooklyn, in the year of who knows when. Opened up her eyes to the tune of an accordion.', 'skiing, running, healthy food, hiking, movies, music'),
            ('Kristy', 'San', 'ksan@mac.com', 'dsa432', 'server/public/images/kristy.png', 'I enjoy food and going to different restaurants.', 'food, Italian food, cuisine, hiking');

insert into "activityTypes" ("label")
     values ('Food'),
            ('Sports'),
            ('Museum');

insert into "Messages" ("messageContent")
     values ('Hello. How are you?'),
            ('Good and you?'),
            ('Fine.');

insert into "Activities" ("googlePlacesLink", "googleMapsLink", "specificActivity", "location", "date", "time")
     values ('https://maps.googleapis.com/maps/api/place/textsearch/json?query=salad+restaurants+in+koreatown+los+angles+California&key=', 'https://www.google.com/maps/embed/v1/place?key=', 'restaurant', 'sweetgreen', '01/01/2021', '1PM');
