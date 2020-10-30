--PostgreSQL 9.6
--'\\' is a delimiter

create table user_list(
id bigserial primary key,
first_name text not null,
last_name text,
avatar_url text
);


create table friendship (
id bigserial primary key,
user_id bigint not null,
friend_user_id bigint not null,
CONSTRAINT fk_friend1
      FOREIGN KEY(user_id)
 REFERENCES user_list(id),
 
CONSTRAINT fk_friend2
      FOREIGN KEY(user_id)
 REFERENCES user_list(id)
);

insert into user_list(id,first_name,last_name,avatar_url) values(1,'Sunny',null,null),(2,'Dev',null,null),(3,'Ram',null,null),(4,'Prinka',null,null),
(5,'Neha',null,null),(6,'Amrita',null,null);

insert into friendship(id,user_id,friend_user_id) values(1,1,3),(2,1,2),(3,2,3),(4,2,5),(5,5,1),(6,2,6);

select * from user_list;

select * from friendship;

-- get frieds of user
SELECT distinct(u.id) as friend_id,u.first_name FROM friendship AS f , user_list AS u WHERE
CASE WHEN f.user_id = 1 THEN f.friend_user_id = u.id WHEN
f.friend_user_id = 1 THEN F.user_id = u.id END;

--get friends of friends that are not already my friends

SELECT user_id FROM friendship WHERE  
        user_id <> 1  and
    user_id not in (
        -- my friends
        SELECT  user_id FROM  friendship WHERE  friend_user_id = 1
                     UNION
                     SELECT  friend_user_id FROM  friendship WHERE  user_id = 1
        )
     AND friend_user_id IN (
          -- friends of friend
            SELECT  user_id FROM  friendship WHERE  friend_user_id = 1
             UNION
             SELECT  friend_user_id FROM  friendship WHERE  user_id = 1
             )
UNION

-- vice-versa bi-directional frindship
SELECT friend_user_id FROM friendship WHERE friend_user_id <> 1
    and  friend_user_id not in (
        -- my frinds to ignore
        SELECT  user_id FROM  friendship WHERE  friend_user_id = 1
                 UNION
        SELECT  friend_user_id FROM  friendship WHERE  user_id = 1
        ) 
    AND user_id IN (
        -- frinds of friend to include
        SELECT  user_id FROM  friendship WHERE  friend_user_id = 1
            UNION
        SELECT  friend_user_id FROM  friendship WHERE  user_id = 1
       );