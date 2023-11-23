-- create table for listing
create table listing (
	listing_id      integer         not null,
    agent_id        integer         not null,
    house_id        integer         not null,
    description     text            not null,
    date_listed     date            check(date_listed between date('2000-01-01') and sysdate()), -- checking for valid date
    rent            decimal(10,2)   check(rent > 0), 
    utilities       varchar(20)     check(utilities in('tenant', 'landlord')), -- who pays?
    date_available  date            not null, 
    primary key(listing_id),
    foreign key(agent_id) references agent(agent_id),
    foreign key(house_id) references house(house_id)
);
-- adding constraint to make sure date available is after the date listed
alter table listing
add constraint date_available_constraint check(abs(datediff(date_available, date_listed)) > 0);
-- inserting sample values into table
insert into listing values(8217, 123456, 1234, 'Beautiful 2 bedroom, 2 bath end-unit townhouse available starting in 2024.
												ALL UTILITIES INCLUDED. 2 PARKING SPOTS Newer washer, dryer, and kitchen appliances.
                                                The open layout features hardwood floors t/o, new recessed LED lighting, crown molding, and lots of natural light. 
                                                The open kitchen has a breakfast bar, subway tile backsplash, and pendant lighting. The dining room, private balcony, pantry, and laundry room complete the main living area. 
                                                The master bedroom has new hardwood floors, is also located on the main floor and has a large walk-in closet with custom shelving. 
                                                The 1st fl bedroom includes a built-in shelving unit, plenty of storage, and a private full bathroom. Each level has its own luxurious, full bathroom with granite vanities. 
                                                Additional features include CENTRAL AIR, lots of storage, and side garden! The garage has a built-in storage unit and second refrigerator for extra storage.',
                                                "2023-09-06", 2456.00, 'landlord', "2024-01-01");
insert into listing values(3548, 123456, 5678, 'Welcome home to this brand new bi-level condo on Aldine! This condo is perfectly positioned to access all of the great restaurants and retail shops in the area! 
                                                Enter unit A to a stunning open-concept living area that leads into a wrap-around kitchen equipped with quartz counters, stainless steel appliances and marble backsplash. 
                                                Bedrooms on both floors offer tons of space and have direct access to a private bath.',
                                                '2023-10-24', 3789.00, 'tenant', '2023-11-07');
insert into listing values(1759, 123456, 9102, '2 Bedroom 1 Bath complete remodel. Updated kitchen: center island, New cabinets, New appliances, Granite counter tops. 
												Great views of the backyard from the kitchen and breakfast room windows! Remodel and new appliances 2023. Open concept. 
                                                Vaulted Living area. Tall baseboards through out, and New Luxury Vinyl plank flooring. New windows to help keep your utility bills down, hot water heater. 
                                                HVAC recently services and new AC outside unit (condenser) installed. Large backyard. Close to Six Flags, Hurricane Harbor, Globe Life Field, AT&T stadium, and more! Great Location!',
                                                '2023-11-14', 3789.00, 'landlord', '2023-11-18')
                                                
                                                
/* LINKS FOR DESCRIPTIONS ARE LOCATED IN THE LISTING EXCEL FILE */