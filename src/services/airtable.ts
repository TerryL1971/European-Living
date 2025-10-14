// src/services/airtable.ts
import Airtable, { FieldSet } from "airtable";

/**
 * Ensure these env vars exist and are named exactly like this in .env.local:
 * VITE_AIRTABLE_PAT
 * VITE_AIRTABLE_BASE_ID
 */
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID as string | undefined;
const apiKey = import.meta.env.VITE_AIRTABLE_PAT as string | undefined;
const tableName = "Businesses";

if (!baseId || !apiKey) {
  // Throw early so you see the problem during dev instead of many downstream errors.
  throw new Error("Airtable environment variables are missing. Set VITE_AIRTABLE_PAT and VITE_AIRTABLE_BASE_ID.");
}

const base = new Airtable({ apiKey }).base(baseId);

/**
 * Business shape used through your React app (camelCase for convenience)
 */
export interface Business {
  id: string;
  name?: string;
  category?: string;
  description?: string;
  location?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  englishFluency?: "fluent" | "conversational" | "basic";
  verified?: boolean;
  featured?: boolean;
  featuredtier?: string;
  baseDistance?: string;
  notes?: string;
  status?: "active" | "pending" | "inactive";
  // any extra fields from Airtable can be added here as optional
}

/**
 * Helper: convert raw Airtable record -> our Business (camelCase).
 * Uses exact Airtable column names (case-sensitive) and maps them to camelCase.
 */
function mapRecordToBusiness(record: Airtable.Record<FieldSet>): Business {
  const get = (fieldName: string) => record.get(fieldName) as unknown;

  // Map Airtable columns (case-sensitive) to our Business fields
  const business: Business = {
    id: record.id,
    name: (get("Name") as string) || undefined,
    category: (get("Category") as string) || undefined,
    description: (get("Description") as string) || undefined,
    location: (get("Location") as string) || undefined,
    address: (get("Address") as string) || undefined,
    phone: (get("Phone") as string) || undefined,
    email: (get("Email") as string) || undefined,
    website: (get("Website") as string) || undefined,
    imageUrl: (get("Image") as string) || undefined,
    englishFluency: (get("EnglishFluency") as "fluent" | "conversational" | "basic") || undefined,
    verified: (get("Verified") as boolean) || false,
    featured: (get("Featured") as boolean) || false,
    featuredtier: (get("FeaturedTier") as string) || undefined,
    baseDistance: (get("BaseDistance") as string) || undefined,
    notes: (get("Notes") as string) || undefined,
    status: (get("Status") as "active" | "pending" | "inactive") || undefined,
  };

  return business;
}

/**
 * Get all active businesses (status = "Active" / "active")
 */
export async function getBusinesses(): Promise<Business[]> {
  try {
    // If you have a "Status" single-select field, filter by it.
    const records = await base(tableName)
      .select({
        filterByFormula: "OR({Status} = 'active', LOWER({Status}) = 'active')",
        // Airtable sorting uses exact field names
        sort: [
          { field: "Featured", direction: "desc" },
          { field: "Verified", direction: "desc" },
        ],
        pageSize: 100,
      })
      .all();

    return records.map(mapRecordToBusiness);
  } catch (err) {
    console.error("Error fetching businesses from Airtable:", err);
    return [];
  }
}

/**
 * Get businesses by category (category parameter should match the option in your single select)
 */
export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  try {
    // Use an Airtable filter that matches the Category field exactly
    const formula = `AND({Category} = "${category}", OR({Status} = 'active', LOWER({Status}) = 'active'))`;

    const records = await base(tableName)
      .select({
        filterByFormula: formula,
        sort: [{ field: "Featured", direction: "desc" }],
        pageSize: 100,
      })
      .all();

    return records.map(mapRecordToBusiness);
  } catch (err) {
    console.error(`Error fetching ${category} businesses from Airtable:`, err);
    return [];
  }
}

/**
 * Get featured businesses (where Featured checkbox = true OR FeaturedTier not empty)
 */
export async function getFeaturedBusinesses(): Promise<Business[]> {
  try {
    // If you want to prioritize a FeaturedTier, use that field in the filter/sort
    // This filter returns rows where Featured = TRUE() OR FeaturedTier not empty
    const records = await base(tableName)
      .select({
        filterByFormula: "OR({Featured} = TRUE(), {FeaturedTier} != '')",
        sort: [{ field: "FeaturedTier", direction: "asc" }],
        pageSize: 100,
      })
      .all();

    return records.map(mapRecordToBusiness);
  } catch (err) {
    console.error("Error fetching featured businesses from Airtable:", err);
    return [];
  }
}

/**
 * Get single business by Airtable record ID
 */
export async function getBusinessById(id: string): Promise<Business | null> {
  try {
    const record = await base(tableName).find(id);
    return mapRecordToBusiness(record);
  } catch (err) {
    console.error(`Error fetching business ${id} from Airtable:`, err);
    return null;
  }
}
