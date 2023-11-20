-- creating table for agent
create table agent (
	agent_id      integer       not null,
    name          varchar(100)  check(length(name) > 0),
    email         varchar(150)  check(length(email) > 0),
    number        text          not null,
    password      varchar(8)    not null,
    primary key(agent_id)
);

-- inserting sample values into table
insert into agent values(123456, 'Melissa', 'melissa@renting.com', 2671112233, 'hello123');
insert into agent values(789101, 'Jack', 'jack@renting.com', 2158889999, 'hhbye123');





