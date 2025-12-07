### Things I would do with more time

__Architecture/Back-end__
- Address missing authentication and middleware to verify it on the advocates routes
- Put the backend searching code into a service and call the service from the route
- Set up autogen of a front-end client, so I don't have to sync front-end and back-end response object types. Perhaps Next.js has something like this already, unsure.
- The database structure could be improved:
  - Normalize specialties - separate specialties table where advocates can have a list of specialties referencing that table (many-to-many mapping table between them). 
    This would be more space efficient, prevent typo issues (since standardized set of specialties for advocates), much easier to view stats e.g. how many advocates have X skill
  - Location should also be normalized, by unique city IDs another table, or some sort of unique ID like the ones Google Maps has for city


__UI__
- I would switch to a UI framework like DaisyUI, that has nice looking, pre-made components (especially for the table)
- I didn't add a loading indicator - I would add a skeleton-style loading indicator
- I would not use a table view for mobile-sized screens - some sort of tile-based UI instead
- Specialties should be a multiselect, to take advantage of above normalized specialties. Might even build some sort of advanced filtering UI
- I would build a full, pretty paging UI with the `[< 1, 2 ... 5, 6 >]` buttons. Or maybe even infinite scroll.
  - for extreme scaling (millions of rows, millions of users), the paging buttons UI is a concern (since it needs a total count), as you would have to do a limit-less select on the entire table, which is very expensive due to our full-text searches,
    even with our indexes. Infinite scroll has better performance in this scenario, though users sometimes hate it (since you lose your spot)
- Add sort-by buttons to the table headers
- I would have a smart location search, where you can start typing a zip code or city, and it provides suggestions. e.g. Mapbox or google maps API. Then it would filter results by location.