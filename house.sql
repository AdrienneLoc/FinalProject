-- creating table for agent
create table house (
	house_id      integer       not null,
    stories       integer       check(stories > 0), -- number of floors
    type          varchar(100)  check(type in('Single-Family', 'Apartment', 'Condo', 'Townhouse', 'Duplex')),
    bedrooms      integer       check(bedrooms > 0), -- number of bedrooms
    bathrooms     integer       check(bathrooms > 0), -- number of bathrooms
    parking       varchar(5)    check(parking in('yes', 'no')), -- is there parking?
    basement     varchar(20)   check(basement in('finished', 'unfinished', 'n/a')), -- is there a basement and is it done?
    address       text          not null,
    postal_code   integer       check(postal_code > 19004 and postal_code < 19444), -- restricting to Philadeplhia
    primary key(house_id)
);

-- inserting sample values into table
insert into house values(1234, 2, 'Townhouse', 2, 2, 'yes', 'finished', '1111 Market Street, Philadelphia, PA', 19103);
insert into house values(5678, 2, 'Condo', 3, 3, 'yes', 'finished', '2222 Aldine Street, Philadelphia, PA', 19136);
insert into house values(9102, 3, 'Duplex', 2, 1, 'no', 'unfinished', '3333 Cabell Road, Philadelphia, PA', 19154);
