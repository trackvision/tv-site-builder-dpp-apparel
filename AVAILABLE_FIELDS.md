# Available Fields Analysis

*This file contains actual field information from the itemTrace-tvdm.json response structure*

## **ItemTrace Root Fields** (Main Response Object)

### Identifiers
- `epc_join_key` - EPC identifier (e.g., "/01/00810139841012/21/RG1001")
- `epc_type` - EPC type (e.g., "sgtin")
- `lot_number` - Lot number
- `serial` - Serial number
- `sscc` - SSCC identifier
- `grai` - GRAI identifier
- `giai` - GIAI identifier

### Timestamps & Dates
- `record_time` - Record timestamp (ISO 8601)
- `item_expiration_date` - Expiration date
- `sell_by_date` - Sell by date
- `best_before_date` - Best before date
- `last_seen_time` - Last seen timestamp
- `commission_time` - Commission timestamp

### Status & Disposition
- `current_disposition` - Current status (e.g., "in_progress", "active")
- `last_biz_step` - Last business step (e.g., "receiving", "shipping", "commissioning")

### Event References
- `commission_event_id` - Commission event identifier
- `selling_location_join_key` - Selling location reference
- `selling_time` - Selling timestamp
- `selling_event_id` - Selling event identifier
- `recall_time` - Recall timestamp
- `recall_event_id` - Recall event identifier

### Hierarchy & Relationships
- `top_parent_join_key` - Top parent EPC reference
- `parent_join_key` - Parent ItemTrace object (full nested object)
- `children[]` - Array of child EPC join keys

### Nested Objects
- `commission_location_join_key` - Location object where item was commissioned
- `last_seen_biz_location_join_key` - Location object where item was last seen
- `expected_biz_location_join_key` - Expected location object
- `product_join_key` - Product object (main product details)
- `lgtin_join_key` - Lot/batch object (LGTIN details)

### Arrays
- `events[]` - Array of event objects (see Event Fields below)
- `contents[]` - Array of content items
- `inputs[]` - Array of input material objects (see Input Fields below)

---

## **Location Fields** (Nested Location Objects)

### Basic Information
- `id` - Location identifier (e.g., "/414/0810139841012")
- `location_name` - Name of location
- `gln` - Global Location Number
- `gln_extension` - GLN extension
- `custom_id` - Custom location identifier
- `third_party_location` - Boolean flag
- `timezone` - Timezone information

### Address Fields
- `address` - Street address
- `city` - City name
- `state` - State/province
- `postal_code` - Postal/ZIP code
- `country_code` - Country code (e.g., "US")

### Contact Information
- `primary_contact_telephone` - Phone number
- `primary_contact_email` - Email address
- `primary_contact_type` - Contact type
- `primary_contact_title` - Contact title

### Geographic Coordinates
- `latitude` - Latitude (string format)
- `longitude` - Longitude (string format)
- `map` - Map object with:
  - `coordinates[]` - Array [longitude, latitude] (numbers)
  - `type` - "Point"

### Links & References
- `digital_link` - Digital link URL
- `location_redirection_url` - Redirection URL
- `location_redirection_rule` - Redirection rule ID

### Organizational
- `location_role[]` - Array of roles (e.g., "MANUFACTURING_PLANT", "DISTRIBUTION_CENTRE", "FARM")
- `parent_location` - Parent location reference
- `owning_organisation` - Organization that owns location
- `related_organisation` - Related organization reference
- `account` - Account reference

### Facility Details
- `row` - Storage row
- `sector` - Storage sector
- `aisle` - Storage aisle
- `level` - Storage level
- `volume` - Storage volume

### Media & Content
- `primary_image` - Image reference ID
- `translations[]` - Array of translation objects:
  - `id` - Translation ID
  - `location_id` - Location reference
  - `languages_code` - Language code (e.g., "en-US")
  - `location_description` - Translated description
- `certifications[]` - Array of certification references

### Metadata
- `user_created` - User UUID who created record
- `date_created` - Creation timestamp
- `user_updated` - User UUID who updated record
- `date_updated` - Update timestamp

---

## **Product Fields** (product_join_key Object)

### Basic Information
- `id` - Product identifier (e.g., "/01/00810139841012")
- `product_name` - Product name
- `gtin` - Global Trade Item Number
- `custom_id` - Custom product identifier
- `functional_name` - Functional name
- `variant_description` - Variant description

### Brand & Ownership
- `brand` - Brand reference (UUID or nested Brand object)
- `brand_owner` - Brand owner reference
- `product_manufacturer` - Manufacturer reference (e.g., "/417/0810139840008")
- `third_party_product` - Boolean flag
- `finished_product` - Boolean flag

### Weight & Content
- `net_weight` - Net weight value (string with decimals)
- `net_weight_unit` - Unit (e.g., "GRM", "KGM")
- `gross_weight` - Gross weight value
- `gross_weight_unit` - Unit (e.g., "GRM", "KGM")
- `net_content` - Net content value
- `net_content_unit` - Content unit

### Packaging
- `packaging_type_code` - Packaging type (e.g., "BO" for bottle, "CT" for carton)

### Nutrition
- `nutrient_basis_quantity` - Basis quantity for nutrients
- `nutrient_basis_quantity_type` - Quantity type
- `nutrient_basis_quantity_unit` - Quantity unit
- `serving_size` - Serving size value
- `serving_size_unit` - Serving size unit
- `fat_percentage_in_dry_matter` - Fat percentage
- `percentage_of_alcohol_by_volume` - Alcohol percentage
- `nutrients[]` - Array of nutrient objects

### Apparel/Fashion Specific
- `size` - Product size (e.g., "S", "M", "L", "XL")
- `target_consumer_gender` - Target gender (e.g., "UNISEX", "MALE", "FEMALE")

### Packaging Dimensions
- `in_package_height` - Package height value
- `in_package_height_unit` - Height unit
- `in_package_width` - Package width value
- `in_package_width_unit` - Width unit
- `in_package_depth` - Package depth value
- `in_package_depth_unit` - Depth unit

### Links & References
- `digital_link` - Digital link URL
- `product_redirection_url` - Redirection URL
- `product_reference_document` - Reference document
- `product_redirection_rule` - Redirection rule ID
- `account` - Account reference

### Media & Content
- `primary_image` - Image reference ID
- `translations[]` - Array of translation objects:
  - `id` - Translation ID
  - `product_id` - Product reference
  - `languages_code` - Language code (e.g., "en-US")
  - `product_description` - Translated description
  - `allergen_statement` - Allergen information
  - `ingredient_statement` - Ingredients list
- `certifications[]` - Array of certification references

### Metadata
- `user_created` - User UUID who created record
- `date_created` - Creation timestamp
- `user_updated` - User UUID who updated record
- `date_updated` - Update timestamp

---

## **Brand Fields** (Nested in Product)

- `id` - Brand identifier (UUID)
- `brand_name` - Brand name
- `sub_brand_name` - Sub-brand name
- `primary_image` - Image reference ID
- `account` - Account reference
- `translations[]` - Array of brand translations
- `user_created` - User UUID who created record
- `date_created` - Creation timestamp
- `user_updated` - User UUID who updated record
- `date_updated` - Update timestamp

---

## **Lot/Batch Fields** (lgtin_join_key Object)

### Basic Information
- `id` - LGTIN identifier (e.g., "/01/00810139841012/10/RGSG101")
- `lot_number` - Lot number
- `status` - Status (e.g., "published")
- `custom_id` - Custom identifier

### Dates
- `production_date` - Production date
- `expiry_date` - Expiration date
- `best_before_date` - Best before date
- `sell_by_date` - Sell by date
- `harvest_start_date` - Harvest start date
- `harvest_end_date` - Harvest end date

### Quantity
- `quantity` - Quantity value (string with decimals)
- `uom` - Unit of measure (e.g., "EA", "KGM")

### Relationships
- `product` - Product reference
- `production_location` - Production location reference
- `account` - Account reference
- `digital_link` - Digital link URL

### Traceability
- `input_material[]` - Array of input material objects:
  - `uom` - Unit of measure
  - `quantity` - Quantity value
  - `carbon_footprint` - Carbon footprint value for this input
  - `related_lot_id` - Full nested lot object (recursive structure)
- `catch_information_list[]` - Array of catch information

### Metadata
- `user_created` - User UUID who created record
- `date_created` - Creation timestamp
- `user_updated` - User UUID who updated record
- `date_updated` - Update timestamp

---

## **Event Fields** (events[] Array)

### Identifiers
- `epc_join_key` - EPC reference
- `event_id` - Event identifier (hash format)
- `event_type` - Type (e.g., "ObjectEvent", "AggregationEvent")

### Event Details
- `action` - Action type (e.g., "ADD", "OBSERVE")
- `biz_step` - Business step (e.g., "commissioning", "packing", "shipping", "receiving")
- `disposition` - Disposition status (e.g., "active", "in_progress", "in_transit")

### Timing
- `event_time` - Event timestamp (ISO 8601)
- `event_time_zone_offset` - Timezone offset (e.g., "+00:00")

### Relationships
- `parent_join_key` - Parent EPC reference (for aggregation events)
- `biz_location_join_key` - Full Location object where event occurred
- `read_point_join_key` - Full Location object where item was read
- `source_location_join_key` - Source location object
- `destination_location_join_key` - Destination location object

### Quantity (for quantity events)
- `quantity` - Quantity value
- `uom` - Unit of measure

### Instance/Lot Master Data (ILMD)
- `ilmd_lot_number` - Lot number from ILMD
- `ilmd_item_expiration_date` - Expiration date from ILMD
- `ilmd_best_before_date` - Best before date from ILMD
- `ilmd_sell_by_date` - Sell by date from ILMD

### Environmental
- `carbon_footprint` - Carbon footprint value for this event

### Metadata
- `inferred` - Boolean flag (0 or 1) indicating if event was inferred

---

## **Input Fields** (inputs[] Array)

### Final Output
- `final_output_epc_join_key` - Final output EPC identifier
- `final_output_epc_type` - Final output type (e.g., "lgtin")
- `final_output_product_join_key` - Final product reference
- `final_output_lot_number` - Final lot number

### Input Material
- `input_epc_join_key` - Input EPC identifier
- `input_epc_type` - Input type (e.g., "lgtin")
- `input_product_join_key` - Full Product object (complete nested structure)
- `input_lot_number` - Input lot number

### Quantity
- `quantity` - Quantity value (string with decimals)
- `uom` - Unit of measure (e.g., "KGM")

---

## **Parent ItemTrace Fields** (parent_join_key Object)

Similar structure to root ItemTrace but may have different values for:
- `epc_join_key` - Parent's EPC identifier
- `children[]` - Array of child EPC references (populated for parent)
- `product_join_key` - Parent product (may be different, e.g., case vs. bottle)
- Most other fields from root ItemTrace apply

---

## **Important Notes**

1. **All fields are optional** - Always check for existence before accessing
2. **Nested structures** - Many fields contain full nested objects, not just IDs
3. **Recursive structures** - input_material can contain nested lots with their own input_material arrays
4. **String numbers** - Quantities and weights are stored as strings with decimals (e.g., "300.00")
5. **Timestamps** - Use ISO 8601 format with timezone information
6. **Arrays** - translations[], certifications[], nutrients[], children[], events[], inputs[], input_material[] may be empty
7. **UUID vs References** - Some fields use UUIDs, others use formatted join keys (e.g., "/01/GTIN")
8. **Map coordinates** - In map object, coordinates are [longitude, latitude] format (reverse of typical)
