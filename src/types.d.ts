/**
 * CUSTOMIZING TYPES FOR YOUR REPOSITORY
 * =====================================
 * 
 * This template is designed to be forked for different clients/repositories.
 * When you fork this template, you'll likely need to extend these TypeScript 
 * interfaces to match your specific ItemTrace API responses.
 * 
 * SIMPLE PROCESS TO UPDATE TYPES:
 * 
 * 1. **Get Real API Response**: Call your actual ItemTrace API and copy the JSON response
 * 
 * 2. **Provide to Claude**: Give Claude the JSON with this instruction:
 *    "Here's my actual ItemTrace API response, please update the TypeScript 
 *     interfaces to include any missing properties: [paste JSON here]"
 * 
 * 3. **Claude Will Analyze**: Claude will compare the JSON structure with existing 
 *    interfaces and add any missing properties with proper TypeScript types
 * 
 * 4. **Test & Commit**: Verify the updated types work with your components and commit
 * 
 * EXAMPLE:
 * If your API returns: { "product_join_key": { "variety": "Honey Crisp", "harvest_date": "2024-09-15" }}
 * Claude will add: variety?: NullString; harvest_date?: NullString; to the Product interface
 * 
 * This keeps your types accurate to your actual API without over-engineering.
 */

import type { AxiosInstance as AxiosInstanceOriginal } from "axios";

declare module "axios" {
  export interface AxiosInstance extends AxiosInstanceOriginal {
    getBase64: (path: string) => Promise<string>;
  }
}

export type NullString = string | null;
export type NullNumber = number | null;

export interface Collection {
  id?: NullString;
  user_created?: NullString;
  date_created?: Date;
  user_updated?: NullString;
  date_updated?: NullString;
  translations?: Translation[];
  certifications?: object[];
}

export type CountryCode = "NZ" | "AU";
export type LocationRole =
  | "MANUFACTURING_PLANT"
  | "STORE"
  | "DISTRIBUTION_CENTRE"
  | "FARM"
  | "CONVENIENCE_STORE";
export type State = "North Island" | "New South Wales";

export type CoordinateType = "Point";
export type Coordinates = [number, number];
export interface Map {
  coordinates: Coordinates;
  type: CoordinateType;
}

export interface Translation {
  id?: number;
  product_id?: NullString;
  languages_code?: NullString;
  product_description?: NullString; // TODO make generic
  ingredient_statement?: NullString;
  allergen_statement?: NullString;
}

export interface BizLocation extends Collection {
  location_name?: NullString;
  third_party_location?: boolean;
  timezone?: NullString;
  gln?: NullString;
  gln_extension?: NullString;
  address?: NullString;
  city?: NullString;
  state?: State;
  postal_code?: NullString;
  primary_contact_telephone?: NullString;
  primary_contact_type?: NullString;
  primary_contact_email?: NullString;
  digital_link?: NullString;
  custom_id?: NullString;
  primary_contact_title?: NullString;
  location_redirection_url?: NullString;
  country_code?: CountryCode;
  primary_image?: NullString;
  location_role?: LocationRole[];
  parent_location?: BizLocation | NullString;
  owning_organisation?: NullString;
  related_organisation?: NullString;
  account?: NullString;
  latitude?: number;
  longitude?: number;
  map?: Map;
  location_redirection_rule?: NullString;
  row?: NullString;
  sector?: NullString;
  aisle?: NullString;
  level?: NullString;
  volume?: NullString;
  translations?: LocationTranslation[];
}
export type NullBizLocation = BizLocation | null;

export interface Event {
  epc_join_key?: NullString;
  event_id?: NullString;
  event_type?: NullString;
  action?: NullString;
  biz_step?: NullString;
  disposition?: NullString;
  event_time?: Date;
  event_time_zone_offset?: NullString;
  parent_join_key?: NullString;
  quantity?: NullNumber;
  uom?: NullString;
  biz_location_join_key?: NullBizLocation;
  read_point_join_key?: NullBizLocation;
  ilmd_lot_number?: NullString;
  ilmd_item_expiration_date?: NullString;
  ilmd_best_before_date?: NullString;
  ilmd_sell_by_date?: NullString;
  source_location_join_key?: NullString;
  destination_location_join_key?: NullBizLocation;
  inferred?: number;
  carbon_footprint?: NullNumber;
}

export interface InputMaterial {
  uom?: NullString;
  quantity?: NullNumber;
  related_lot_id?: Lot;
  carbon_footprint?: NullNumber;
}

export interface Lot extends Collection {
  id?: NullString;
  user_created?: NullString;
  date_created?: NullString;
  user_updated?: NullString;
  date_updated?: NullString;
  lot_number?: NullString;
  production_date?: NullString;
  digital_link?: NullString;
  quality_report?: NullString;
  quantity?: NullNumber;
  expiry_date?: NullString;
  best_before_date?: NullString;
  sell_by_date?: NullString;
  status?: NullString;
  uom?: NullString;
  product?: Product;
  account?: NullString;
  input_material?: InputMaterial[];
  production_location?: NullBizLocation;
  harvest_start_date?: NullString;
  harvest_end_date?: NullString;
  catch_information_list?: unknown[];
}

export interface Brand extends Collection {
  brand_name?: string;
  primary_image?: string;
  sub_brand_name?: null;
  account?: null;
  translations?: BrandTranslation[];
  brand_content?: string;
}
export type NullBrand = Brand | null;

export interface Nutrient {
  id?: number;
  product_id?: string;
  nutrient_type?: string;
  nutrient_value?: number;
  daily_value_intake_percent?: number | null;
  nutrient_unit?: NutrientUnit;
}

export interface NutrientUnit {
  code?: string;
  user_created?: string;
  date_created?: Date;
  user_updated?: null;
  date_updated?: null;
  description?: string;
  classification?: string;
  status?: string;
}

export interface Product extends Collection {
  product_name?: NullString;
  brand?: NullBrand;
  gtin?: NullString;
  custom_id?: NullString;
  digital_link?: NullString;
  product_redirection_url?: NullString;
  product_reference_document?: NullString;
  variant_description?: NullString;
  functional_name?: NullString;
  third_party_product?: boolean;
  finished_product?: NullString;
  primary_image?: NullString;
  product_manufacturer?: NullString;
  brand_owner?: NullString;
  account?: NullString;
  product_redirection_rule?: NullString;
  net_content?: number;
  net_content_unit?: NullString;
  net_weight?: NullString;
  net_weight_unit?: NullString;
  gross_weight?: NullString;
  gross_weight_unit?: NullString;
  fat_percentage_in_dry_matter?: NullString;
  nutrient_basis_quantity?: number;
  nutrient_basis_quantity_type?: NullString;
  nutrient_basis_quantity_unit?: NullString;
  nutrients?: Nutrient[];
  packaging_type_code?: NullString;
  serving_size?: number;
  serving_size_unit?: NullString;
  percentage_of_alcohol_by_volume?: number;
  // Apparel/Fashion specific fields
  size?: NullString;
  target_consumer_gender?: NullString;
  color?: NullString;
  in_package_height?: NullString;
  in_package_height_unit?: NullString;
  in_package_width?: NullString;
  in_package_width_unit?: NullString;
  in_package_depth?: NullString;
  in_package_depth_unit?: NullString;
  parent_product?: Product;
  translations?: DirectusProductTranslation[];
}

export interface ItemtraceInput {
  final_output_epc_join_key?: NullString;
  final_output_epc_type?: NullString;
  final_output_product_join_key?: NullString;
  final_output_lot_number?: NullString;
  input_epc_join_key?: NullString;
  input_epc_type?: NullString;
  input_product_join_key?: Product;
  input_lot_number?: NullString;
  uom?: NullString;
  quantity?: NullString;
}

export interface LocationTranslation {
  id?: number;
  location_id?: NullString;
  languages_code?: NullString;
  location_description?: NullString;
  location_content?: NullString;
}
export interface BrandTranslation {
  id?: number;
  brand_id?: NullString;
  languages_code?: NullString;
  brand_name?: NullString;
  sub_brand_name?: NullString;
  brand_content?: NullString;
}

// Directus API types
export interface DirectusProductTranslation {
  id?: number;
  product_id?: string;
  languages_code?: string;
  product_description?: string;
  product_content?: string;
  country_of_origin_statement?: string;
  allergen_statement?: string;
  ingredient_statement?: string;
  ingredients_of_concern_statement?: string;
  care_instructions?: string;
}


export interface Itemtrace {
  epc_join_key?: NullString;
  record_time?: Date;
  epc_type?: NullString;
  lot_number?: NullString;
  serial?: NullString;
  sscc?: NullString;
  grai?: NullString;
  giai?: NullString;
  item_expiration_date?: Date;
  sell_by_date?: NullString;
  best_before_date?: NullString;
  last_seen_time?: Date;
  current_disposition?: NullString;
  last_biz_step?: NullString;
  commission_time?: Date;
  commission_event_id?: NullString;
  selling_location_join_key?: NullString;
  selling_time?: NullString;
  selling_event_id?: NullString;
  recall_time?: NullString;
  recall_event_id?: NullString;
  top_parent_join_key?: NullString;
  children?: Itemtrace[];
  commission_location_join_key?: NullBizLocation;
  parent_join_key?: Itemtrace | null;
  product_join_key?: Product;
  lgtin_join_key?: Lot;
  last_seen_biz_location_join_key?: NullBizLocation;
  expected_biz_location_join_key?: NullBizLocation;
  events?: Event[];
  contents?: unknown[];
  inputs?: ItemtraceInput[];
}

/**
 * =============================================================================
 * DIGITAL PRODUCT PASSPORT (DPP) TYPES - APPAREL
 * =============================================================================
 *
 * Type definitions for apparel Digital Product Passport data.
 * These types support the DPP implementation alongside the existing food
 * traceability types above.
 */

/** Individual material component in product composition */
export interface MaterialComponent {
  material?: string;
  percentage?: NullNumber;
  recycled_content?: NullNumber;
  substances_of_concern?: NullString;
  country_origin?: string;
}

/** Fabric or supply composition group */
export interface MaterialComposition {
  fabric_name?: string;
  country_origin?: string;
  components?: MaterialComponent[];
}

/** Size measurement data */
export interface SizeMeasurement {
  measurement_name?: string;
  value?: NullNumber;
  unit?: string;
}

/** Size and fit information */
export interface SizeAndFitData {
  available_sizes?: string[];
  reference_size?: string;
  measurements?: SizeMeasurement[];
  description?: string;
}

/** Circularity metrics and end-of-life information */
export interface CircularityMetrics {
  durability_score?: NullNumber | string; // Can be number or "-" for not available
  recyclable_percent?: NullNumber;
  recycled_content_percent?: NullNumber;
  recycling_instructions?: NullString;
  end_of_life_instructions?: NullString;
}

/** Environmental impact metrics */
export interface EnvironmentalMetrics {
  carbon_footprint_kg?: NullNumber;
  water_used_l?: NullNumber;
  energy_used_kwh?: NullNumber;
}

/** Compliance certificate information */
export interface ComplianceCertificate {
  id?: NullString;
  name?: string;
  administered_by?: string;
  administered_in?: string;
  issued_date?: string;
  certificate_id?: string;
  url?: string;
}

/** Production details and identifiers */
export interface ProductionDetails {
  date_produced?: string; // e.g., "2025 W20"
  produced_by?: string;
  production_location?: string;
  production_location_address?: string;
  producer_contact?: string;
  production_identifier?: string;
  operator_identifier?: string;
}

/** Importer information */
export interface ImporterInfo {
  imported_by?: string;
  eori_number?: string;
  importer_address?: string;
  importer_contact?: string;
}

/** DPP Service Provider information */
export interface DppServiceProvider {
  name?: string;
  provider_id?: NullString;
  contact_address?: string;
  website?: string;
  backup_access_available?: boolean;
}

/** Main DPP data structure for apparel products */
export interface ApparelDppData {
  // Product identification
  product_name?: string;
  class_id?: string; // e.g., "CC848125-33Q0101"
  lot_id?: string; // e.g., "25034874"
  taric_code?: string;
  brand?: string;
  manufacturer?: string;
  country_of_production?: string;
  primary_image?: string;
  gs1_digital_link?: string;

  // Quick information
  further_information_url?: string;

  // Size & Fit
  size_and_fit?: SizeAndFitData;

  // Composition
  main_fabrics?: MaterialComposition[];
  supplies_and_components?: MaterialComponent[];

  // Circularity
  circularity?: CircularityMetrics;

  // Environmental Impact
  environmental?: EnvironmentalMetrics;

  // Compliance & Certificates
  certificates?: ComplianceCertificate[];

  // Production Information
  production?: ProductionDetails;
  importer?: ImporterInfo;

  // Product History (reuse existing Event type)
  events?: Event[];

  // Passport Information
  dpp_service_provider?: DppServiceProvider;
}
