### Things I would do with more time

__Architecture__

- Address missing authentication and middleware to verify it on the advocates routes
- I would put the backend searching code into a service and callthe service from the route
- I would set up autogen of a front-end client, so I don't have to sync front-end and back-end response object types
- The database structure could be improved:
  - Normalize skills - separate skills table where advocates can have a list of skills referencing that table (many-to-many mapping table between them). 
    This would be more space efficient, prevent typo issues (since standardized set of skills for advocates), much easier to view stats e.g. how many advocates have X skill
  - Location should also be normalized, by unique city IDs another table, or some sort of unique ID like the ones Google Maps has for city
  - phone numbers should probably be stored a string in standardized format. Leading zeros, which are valid, could be dropped when it is numeric. Though we are using domestic #'s, so matters less

__UI__
- I would not use a table view for mobile-sized screens
- Specialties should be a multiselect, to take advantage of above normalized skills
- I was lazy and use a simple load more button for paging. I would build a full, pretty paging UI with the `[< 1, 2 ... 5, 6 >]` buttons. Or maybe even infinite scroll.
  - for extreme scaling (millions of rows), the pretty paging buttons UI is a problem (since it needs a total count), as you would have to do a limit-less select on the entire table, which is very expensive due to our full-text searches,
    even with our indexes. 