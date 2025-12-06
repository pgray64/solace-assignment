import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  // GIN trigram indexes for partial search
  firstNameIdx: index('idx_advocates_firstname_trgm')
      .using('gin', sql`${table.firstName} gin_trgm_ops`),
  lastNameIdx: index('idx_advocates_lastname_trgm')
      .using('gin', sql`${table.lastName} gin_trgm_ops`),
  cityIdx: index('idx_advocates_city_trgm')
      .using('gin', sql`${table.city} gin_trgm_ops`),
  degreeIdx: index('idx_advocates_degree_trgm')
      .using('gin', sql`${table.degree} gin_trgm_ops`),
  phoneNumberIdx: index('idx_advocates_phone_trgm')
      .using('gin', sql`${table.phoneNumber} gin_trgm_ops`),
  specialtiesSearchIdx: index('idx_advocates_specialties_search_trgm')
      .using('gin', sql`(${table.specialties}::text) gin_trgm_ops`),
  // Years of experience, phone # - standard index
  yearsExpIdx: index('idx_advocates_years_exp').on(table.yearsOfExperience),
}));

export { advocates };
