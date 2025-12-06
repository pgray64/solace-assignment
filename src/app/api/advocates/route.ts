import db from "../../../db";
import { advocates } from "../../../db/schema";
import {asc, desc, eq, gte, ilike, or, sql} from "drizzle-orm";

interface AdvocateResponse {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: Array<string>;
  yearsOfExperience: number;
  phoneNumber: string;
}
const perPage = 10;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const searchQuery = searchParams.get('searchQuery');

  let conditions = [] as any[];
  if (searchQuery && searchQuery.length > 0) {
    const numQuery = parseInt(searchQuery)
    const isNumericSearch = !isNaN(numQuery) && numQuery < 200; // otherwise it will try to pass huge numbers to pg and can exceed its max for int comparison
    if (isNumericSearch) {
      conditions = [
          gte(advocates.yearsOfExperience, numQuery),
      ]

    } else {
      const searchPattern = `%${searchQuery}%`
      conditions = [
        ilike(advocates.firstName, searchPattern),
        ilike(advocates.lastName, searchPattern),
        ilike(advocates.city, searchPattern),
        ilike(advocates.degree, searchPattern),
        ilike(advocates.phoneNumber, searchPattern),
        sql`${advocates.specialties}::text ILIKE ${searchPattern}` // interpolating like this feels so sketchy, but it is safe when done with a variable
      ]
    }
  }
  const page = parseInt(searchParams.get('page') ?? '0') ?? 0;
  const offset = page * perPage

  const data = await db.select().from(advocates).where(or(...conditions)).orderBy(desc(advocates.id)).limit(perPage).offset(offset) as AdvocateResponse[];

  return Response.json({ data });
}
