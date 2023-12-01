use finalproject;
select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available
from listing
natural join house
where agent_id = 123456;