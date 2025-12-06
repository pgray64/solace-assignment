ALTER TABLE advocates
    ALTER COLUMN phone_number TYPE text
        USING phone_number::text;