---
title: Item Trace API
description: Advanced traceability API for supply chain items
sidebar_label: Item Trace API
---

# Item Trace API

> The Item Trace API enables the retrieval of comprehensive traceability information about an item in one query, avoiding the need for the client to make several separate API calls.

## Overview

The Item Trace API enables the retrieval of comprehensive traceability information about an item in one query, avoiding the need for the client to make several separate API calls. The response includes:
- Item current state
- Item parent and packed contents - up to 5 levels deep
- Item inputs (e.g. input batches) - up to 4 levels deep
- Item event history (including inferred events based on how an item's parent has moved in the supply chain)

## Base Endpoint

```
https://yourdomain.trackvision.ai/itemtrace
```

Replace `yourdomain` with your actual TrackVision subdomain.

## Supported Queries

### Query a serialised product (SGTIN) by GTIN and Serial

Query for a specific serialised item (SGTIN):

```http
GET /itemtrace?gtin={gtin}&serial={serial}
```

#### Parameters
- `gtin` - The Global Trade Item Number (GTIN) of the serialised product
- `serial` - The serial ID of the item 

### Query a container, pallet or logistics unit by SSCC

Query for a specific SSCC:

```http
GET /itemtrace?sscc={sscc}
```

#### Parameters
- `sscc` - The SSCC identifier of the container

### Query an object by EPC Join Key

Query for a specific serialised object by EPC Join Key (either SSCC, SGTIN or GRAI)

```http
GET /itemtrace?epc_join_key={epc_join_key}
```

#### Parameters
- `epc_join_key` - The EPC Join Key of the object you want to look up, for example "/01/00810139841012/21/RG1001". Be sure to URL encode.


## Example Response (Big!)
```json
{
    "epc_join_key": "/01/00810139841012/21/RG1001",
    "record_time": "2025-07-02T03:10:34.880Z",
    "epc_type": "sgtin",
    "lot_number": "RGSG101",
    "serial": "RG1001",
    "sscc": null,
    "grai": null,
    "giai": null,
    "item_expiration_date": "2026-06-17",
    "sell_by_date": null,
    "best_before_date": null,
    "last_seen_time": "2025-07-02T03:10:29.373Z",
    "current_disposition": "in_transit",
    "last_biz_step": "shipping",
    "commission_time": "2025-06-24T05:24:38.000Z",
    "commission_event_id": "85fdcebb-50bb-11f0-8c6f-6a94712d4346",
    "selling_location_join_key": null,
    "selling_time": null,
    "selling_event_id": null,
    "recall_time": null,
    "recall_event_id": null,
    "top_parent_join_key": "/01/10810139841064/21/RG6001",
    "children": [],
    "commission_location_join_key": {
        "id": "/414/0810139841012/254/PL1",
        "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
        "date_created": "2025-06-20T09:31:17.000Z",
        "user_updated": null,
        "date_updated": null,
        "location_name": "RG Production Line 1",
        "third_party_location": false,
        "timezone": null,
        "gln": "0810139841012",
        "gln_extension": "PL1",
        "address": "309 Morris Ave",
        "city": "Long Branch",
        "state": "NJ",
        "postal_code": "07740",
        "primary_contact_telephone": "+132432423",
        "primary_contact_type": null,
        "primary_contact_email": null,
        "digital_link": "https://example.com/414/0810139841012/254/PL1",
        "custom_id": "LOC-ABC-PL1",
        "primary_contact_title": null,
        "location_redirection_url": "https://www.mybrand.com/",
        "country_code": "US",
        "primary_image": null,
        "location_role": [
            "MANUFACTURING_PLANT"
        ],
        "parent_location": null,
        "owning_organisation": "/417/0810139840008",
        "related_organisation": "/417/0810139840008",
        "account": null,
        "latitude": "40.298666",
        "longitude": "-73.992145",
        "map": {
            "coordinates": [
                -73.99214457615223,
                40.298665892194315
            ],
            "type": "Point"
        },
        "location_redirection_rule": null,
        "translations": [],
        "certifications": []
    },
    "parent_join_key": {
        "epc_join_key": "/01/10810139841064/21/RG6001",
        "record_time": "2025-07-02T03:10:34.880Z",
        "epc_type": "sgtin",
        "lot_number": null,
        "serial": "RG6001",
        "sscc": null,
        "grai": null,
        "giai": null,
        "lgtin_join_key": null,
        "item_expiration_date": null,
        "sell_by_date": null,
        "best_before_date": null,
        "last_seen_biz_location_join_key": "/414/0810139841012",
        "last_seen_time": "2025-07-02T03:10:29.373Z",
        "expected_biz_location_join_key": "/414/4445556667899",
        "current_disposition": "in_transit",
        "last_biz_step": "shipping",
        "parent_join_key": null,
        "commission_location_join_key": null,
        "commission_time": null,
        "commission_event_id": null,
        "selling_location_join_key": null,
        "selling_time": null,
        "selling_event_id": null,
        "recall_time": null,
        "recall_event_id": null,
        "top_parent_join_key": null,
        "children": [
            "/01/00810139841012/21/RG1001",
            "/01/00810139841012/21/RG1002",
            "/01/00810139841012/21/RG1003",
            "/01/00810139841012/21/RG1004",
            "/01/00810139841012/21/RG1005",
            "/01/00810139841012/21/RG1006",
            "/01/00810139841029/21/RG2001",
            "/01/00810139841029/21/RG2002",
            "/01/00810139841029/21/RG2003",
            "/01/00810139841036/21/RG3001",
            "/01/00810139841036/21/RG3002",
            "/01/00810139841036/21/RG3003",
            "/01/00810139841043/21/RG4001",
            "/01/00810139841043/21/RG4002",
            "/01/00810139841043/21/RG4003",
            "/01/00810139841050/21/RG5001",
            "/01/00810139841050/21/RG5002",
            "/01/00810139841050/21/RG5003"
        ],
        "product_join_key": {
            "id": "/01/10810139841064",
            "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
            "date_created": "2025-06-20T07:46:51.000Z",
            "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
            "date_updated": "2025-06-24T13:36:38.000Z",
            "product_name": "Skinny Cleanse - 18 Pack",
            "brand": "73c2cccf-1935-4615-9955-88acec482e35",
            "gtin": "10810139841064",
            "custom_id": null,
            "digital_link": "https://example.com/01/10810139841064",
            "product_redirection_url": "https://www.mybrand.com/products/best-juice-cleanse-for-weight-loss",
            "product_reference_document": null,
            "packaging_type_code": "CT",
            "variant_description": null,
            "functional_name": "Skinny Cleanse - 18 Pack",
            "net_weight": "6.12000",
            "net_weight_unit": "KGM",
            "gross_weight": "6.30000",
            "third_party_product": false,
            "finished_product": true,
            "primary_image": "cd398af0-de89-4c8c-a4a6-77ca345bc3e6",
            "product_manufacturer": "/417/0810139840008",
            "brand_owner": null,
            "account": null,
            "gross_weight_unit": "KGM",
            "net_content": null,
            "net_content_unit": null,
            "product_redirection_rule": "548d9335-3ade-40ae-b68d-5f1e56efc3db",
            "fat_percentage_in_dry_matter": null,
            "percentage_of_alcohol_by_volume": null,
            "nutrient_basis_quantity": null,
            "nutrient_basis_quantity_type": null,
            "nutrient_basis_quantity_unit": null,
            "serving_size": null,
            "serving_size_unit": null,
            "translations": [
                180006
            ],
            "certifications": [],
            "nutrients": []
        }
    },
    "product_join_key": {
        "id": "/01/00810139841012",
        "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
        "date_created": "2025-06-20T07:46:51.000Z",
        "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
        "date_updated": "2025-06-24T13:36:38.000Z",
        "product_name": "Sweet Greens 12oz",
        "gtin": "00810139841012",
        "custom_id": null,
        "digital_link": "https://example.com/01/00810139841012",
        "product_redirection_url": "https://www.mybrand.com/products/best-juice-cleanse-for-weight-loss",
        "product_reference_document": null,
        "packaging_type_code": "BO",
        "variant_description": null,
        "functional_name": "Sweet Greens 12oz",
        "net_weight": "340.00000",
        "net_weight_unit": "GRM",
        "gross_weight": "350.00000",
        "third_party_product": false,
        "finished_product": true,
        "primary_image": "6a06d0c5-5974-4a6d-ac14-62b4f6c5864e",
        "product_manufacturer": "/417/0810139840008",
        "brand_owner": null,
        "account": null,
        "gross_weight_unit": "GRM",
        "net_content": null,
        "net_content_unit": null,
        "product_redirection_rule": "548d9335-3ade-40ae-b68d-5f1e56efc3db",
        "fat_percentage_in_dry_matter": null,
        "percentage_of_alcohol_by_volume": null,
        "nutrient_basis_quantity": null,
        "nutrient_basis_quantity_type": null,
        "nutrient_basis_quantity_unit": null,
        "serving_size": null,
        "serving_size_unit": null,
        "translations": [
            {
                "id": 180001,
                "product_id": "/01/00810139841012",
                "languages_code": "en-US",
                "product_description": "This is your classic green juice that's full of nutrient dense leafy greens. Fuel your body with 6g of protein, 140% Vitamin C, and 130% vitamin A.",
                "allergen_statement": null,
                "ingredient_statement": "apples, kale, spinach, collards, lemon"
            }
        ],
        "certifications": [],
        "nutrients": [],
        "brand": {
            "id": "73c2cccf-1935-4615-9955-88acec482e35",
            "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
            "date_created": "2025-06-20T07:44:49.000Z",
            "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
            "date_updated": "2025-06-30T06:20:58.000Z",
            "brand_name": "Raw Generation",
            "sub_brand_name": null,
            "account": null,
            "primary_image": "bfba1097-b753-4f49-a347-619d3c0fb861",
            "translations": []
        }
    },
    "lgtin_join_key": {
        "id": "/01/00810139841012/10/RGSG101",
        "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
        "date_created": "2025-06-20T12:48:48.000Z",
        "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
        "date_updated": "2025-06-20T13:03:33.000Z",
        "lot_number": "RGSG101",
        "production_date": "2025-06-03",
        "digital_link": "https://example.com/01/00810139841012/10/RGSG101",
        "quantity": "800.00",
        "expiry_date": "2026-11-12",
        "best_before_date": null,
        "sell_by_date": null,
        "status": "published",
        "uom": "EA",
        "production_location": "/414/0810139841012",
        "product": "/01/00810139841012",
        "account": null,
        "harvest_start_date": null,
        "harvest_end_date": null,
        "input_material": [
            {
                "uom": "KGM",
                "quantity": "300.00",
                "related_lot_id": {
                    "id": "/01/01231236159012/10/APPLE101",
                    "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                    "date_created": "2025-06-20T09:26:00.000Z",
                    "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                    "date_updated": "2025-06-20T13:00:55.000Z",
                    "lot_number": "APPLE101",
                    "production_date": "2025-01-01",
                    "digital_link": "https://example.com/01/01231236159012/10/APPLE101",
                    "quantity": "3000.00",
                    "expiry_date": null,
                    "best_before_date": null,
                    "sell_by_date": null,
                    "status": "published",
                    "uom": "KGM",
                    "account": null,
                    "harvest_start_date": null,
                    "harvest_end_date": null,
                    "input_material": [],
                    "catch_information_list": [],
                    "product": {
                        "id": "/01/01231236159012",
                        "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                        "date_created": "2025-06-20T09:06:10.000Z",
                        "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                        "date_updated": "2025-06-20T09:06:55.000Z",
                        "product_name": "Apples",
                        "brand": "ca315d55-2842-423a-a1e3-fee63169f0e4",
                        "gtin": "01231236159012",
                        "custom_id": null,
                        "digital_link": "https://example.com/01/01231236159012",
                        "product_redirection_url": "https://en.wikipedia.org/wiki/Acme_Corporation",
                        "product_reference_document": null,
                        "packaging_type_code": "BO",
                        "variant_description": null,
                        "functional_name": null,
                        "net_weight": "12.00000",
                        "net_weight_unit": "KGM",
                        "gross_weight": "13.00000",
                        "third_party_product": true,
                        "finished_product": false,
                        "primary_image": null,
                        "product_manufacturer": "/417/1231236152436",
                        "brand_owner": null,
                        "account": null,
                        "gross_weight_unit": "KGM",
                        "net_content": null,
                        "net_content_unit": null,
                        "product_redirection_rule": null,
                        "fat_percentage_in_dry_matter": null,
                        "percentage_of_alcohol_by_volume": null,
                        "nutrient_basis_quantity": null,
                        "nutrient_basis_quantity_type": null,
                        "nutrient_basis_quantity_unit": null,
                        "serving_size": null,
                        "serving_size_unit": null,
                        "translations": [
                            {
                                "id": 180007,
                                "product_id": "/01/01231236159012",
                                "languages_code": "en-US",
                                "product_description": null,
                                "allergen_statement": null,
                                "ingredient_statement": null
                            },
                            {
                                "id": 180008,
                                "product_id": "/01/01231236159012",
                                "languages_code": "en-US",
                                "product_description": "Fresh produce",
                                "allergen_statement": null,
                                "ingredient_statement": null
                            }
                        ],
                        "certifications": [],
                        "nutrients": []
                    },
                    "production_location": {
                        "id": "/414/1231236151016",
                        "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                        "date_created": "2025-06-20T09:16:53.000Z",
                        "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                        "date_updated": "2025-06-30T07:55:31.000Z",
                        "location_name": "Hales Apple Farm",
                        "third_party_location": true,
                        "timezone": null,
                        "gln": "1231236151016",
                        "gln_extension": null,
                        "address": "1 Blah Road",
                        "city": "Blah Town",
                        "state": "CA",
                        "postal_code": "07740",
                        "primary_contact_telephone": "+132432423",
                        "primary_contact_type": null,
                        "primary_contact_email": null,
                        "digital_link": "https://example.com/414/1231236151016",
                        "custom_id": null,
                        "primary_contact_title": null,
                        "location_redirection_url": "https://en.wikipedia.org/wiki/Acme_Corporation",
                        "country_code": "US",
                        "primary_image": "6c5f2f39-4a5c-4ae8-801a-d9424ba0366e",
                        "location_role": [
                            "FARM"
                        ],
                        "parent_location": null,
                        "owning_organisation": "/417/1231236152436",
                        "related_organisation": "/417/1231236152436",
                        "account": null,
                        "latitude": "38.599885",
                        "longitude": "-122.851049",
                        "map": {
                            "coordinates": [
                                -122.85104860622442,
                                38.599884962962285
                            ],
                            "type": "Point"
                        },
                        "location_redirection_rule": null,
                        "translations": [
                            {
                                "id": 2,
                                "location_id": "/414/1231236151016",
                                "languages_code": "en-US",
                                "location_description": "Hale farms use sustainable farming practices, including integrated pest management, water conservation techniques, and soil health initiatives. Each apple is hand-picked at peak ripeness to ensure maximum flavor and nutritional value in every bottle of Sweet Greens."
                            }
                        ],
                        "certifications": []
                    }
                }
            }
        ],
        "catch_information_list": []
    },
    "last_seen_biz_location_join_key": {
        "id": "/414/0810139841012",
        "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
        "date_created": "2025-06-20T09:31:17.000Z",
        "user_updated": null,
        "date_updated": null,
        "location_name": "Raw Gen Factory",
        "third_party_location": false,
        "timezone": null,
        "gln": "0810139841012",
        "gln_extension": null,
        "address": "309 Morris Ave",
        "city": "Long Branch",
        "state": "NJ",
        "postal_code": "07740",
        "primary_contact_telephone": "+132432423",
        "primary_contact_type": null,
        "primary_contact_email": null,
        "digital_link": "https://example.com/414/0810139841012",
        "custom_id": "LOC-ABC",
        "primary_contact_title": null,
        "location_redirection_url": "https://www.mybrand.com/",
        "country_code": "US",
        "primary_image": null,
        "location_role": [
            "MANUFACTURING_PLANT"
        ],
        "parent_location": null,
        "owning_organisation": "/417/0810139840008",
        "related_organisation": "/417/0810139840008",
        "account": null,
        "latitude": "40.298666",
        "longitude": "-73.992145",
        "map": {
            "coordinates": [
                -73.99214457615223,
                40.298665892194315
            ],
            "type": "Point"
        },
        "location_redirection_rule": null,
        "translations": [],
        "certifications": []
    },
    "expected_biz_location_join_key": {
        "id": "/414/4445556667899",
        "user_created": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
        "date_created": "2025-07-02T03:04:13.000Z",
        "user_updated": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
        "date_updated": "2025-07-02T03:15:22.000Z",
        "location_name": "One Click 3PL Texas",
        "third_party_location": true,
        "timezone": null,
        "gln": "4445556667899",
        "gln_extension": null,
        "address": "4022 Bell Dr",
        "city": "Temple",
        "state": "Texas",
        "postal_code": "76502",
        "primary_contact_telephone": "+143452453243",
        "primary_contact_type": null,
        "primary_contact_email": "support@oneclick3pl.com",
        "digital_link": "https://example.com/414/4445556667899",
        "custom_id": null,
        "primary_contact_title": null,
        "location_redirection_url": "https://oneclick3pl.com/",
        "country_code": "US",
        "primary_image": null,
        "location_role": [
            "DISTRIBUTION_CENTRE"
        ],
        "parent_location": null,
        "owning_organisation": null,
        "related_organisation": null,
        "account": null,
        "latitude": "31.092487",
        "longitude": "-97.391175",
        "map": {
            "coordinates": [
                -97.39118381787232,
                31.092438548766722
            ],
            "type": "Point"
        },
        "location_redirection_rule": null,
        "translations": [
            {
                "id": 30001,
                "location_id": "/414/4445556667899",
                "languages_code": "en-US",
                "location_description": "Elevate your eCommerce business with OneClick3PL Logistics your premier multi-client 3PL partner. We specialize in tailored eCommerce fulfillment, including Shopify fulfillment, to streamline your operations and enhance customer satisfaction. Our services integrate seamlessly with all major eCommerce platforms and marketplaces, including Shopify, Amazon, TikTok, and 100+ retailers."
            }
        ],
        "certifications": []
    },
    "events": [
        {
            "epc_join_key": "/01/00810139841012/21/RG1001",
            "event_id": "ni:///sha-256;97896d66526db57fe16d69230a6e3cb76d73d74911500b01168543efa1031104?ver=CBV2.0",
            "event_type": "ObjectEvent",
            "action": "ADD",
            "biz_step": "commissioning",
            "disposition": "active",
            "event_time": "2025-06-24T05:24:37.648Z",
            "event_time_zone_offset": "+00:00",
            "parent_join_key": null,
            "quantity": null,
            "uom": null,
            "biz_location_join_key": {
                "id": "/414/0810139841012/254/PL1",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "RG Production Line 1",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": "PL1",
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012/254/PL1",
                "custom_id": "LOC-ABC-PL1",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "read_point_join_key": {
                "id": "/414/0810139841012/254/PL1",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "RG Production Line 1",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": "PL1",
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012/254/PL1",
                "custom_id": "LOC-ABC-PL1",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "ilmd_lot_number": "RGSG101",
            "ilmd_item_expiration_date": "2026-06-17T00:00:00.000Z",
            "ilmd_best_before_date": null,
            "ilmd_sell_by_date": null,
            "source_location_join_key": null,
            "destination_location_join_key": null,
            "inferred": 0
        },
        {
            "epc_join_key": "/01/00810139841012/21/RG1001",
            "event_id": "ni:///sha-256;ed4710a41e5209cbbf398743739b94c85e5add2d190c4a719d9d57daa58434eb?ver=CBV2.0",
            "event_type": "AggregationEvent",
            "action": "ADD",
            "biz_step": "packing",
            "disposition": "in_progress",
            "event_time": "2025-06-24T05:29:39.481Z",
            "event_time_zone_offset": "+00:00",
            "parent_join_key": "/01/10810139841064/21/RG6001",
            "quantity": null,
            "uom": null,
            "biz_location_join_key": {
                "id": "/414/0810139841012/254/PL1",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "RG Production Line 1",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": "PL1",
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012/254/PL1",
                "custom_id": "LOC-ABC-PL1",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "read_point_join_key": {
                "id": "/414/0810139841012/254/PL1",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "RG Production Line 1",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": "PL1",
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012/254/PL1",
                "custom_id": "LOC-ABC-PL1",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "ilmd_lot_number": null,
            "ilmd_item_expiration_date": null,
            "ilmd_best_before_date": null,
            "ilmd_sell_by_date": null,
            "source_location_join_key": null,
            "destination_location_join_key": null,
            "inferred": 0
        },
        {
            "epc_join_key": "/01/00810139841012/21/RG1001",
            "event_id": "V:ni:///sha-256;942f308450a62339c6366b166608cc94f5778ea3305067b3618dd47f430c0402?ver=CBV2.0",
            "event_type": "ObjectEvent",
            "action": "OBSERVE",
            "biz_step": "shipping",
            "disposition": "in_transit",
            "event_time": "2025-07-02T03:10:29.373Z",
            "event_time_zone_offset": "+00:00",
            "parent_join_key": null,
            "quantity": null,
            "uom": null,
            "biz_location_join_key": {
                "id": "/414/0810139841012",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "Raw Gen Factory",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": null,
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012",
                "custom_id": "LOC-ABC",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "read_point_join_key": {
                "id": "/414/0810139841012",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "Raw Gen Factory",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": null,
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012",
                "custom_id": "LOC-ABC",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "ilmd_lot_number": null,
            "ilmd_item_expiration_date": null,
            "ilmd_best_before_date": null,
            "ilmd_sell_by_date": null,
            "source_location_join_key": null,
            "destination_location_join_key": {
                "id": "/414/4445556667899",
                "user_created": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
                "date_created": "2025-07-02T03:04:13.000Z",
                "user_updated": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
                "date_updated": "2025-07-02T03:15:22.000Z",
                "location_name": "One Click 3PL Texas",
                "third_party_location": true,
                "timezone": null,
                "gln": "4445556667899",
                "gln_extension": null,
                "address": "4022 Bell Dr",
                "city": "Temple",
                "state": "Texas",
                "postal_code": "76502",
                "primary_contact_telephone": "+143452453243",
                "primary_contact_type": null,
                "primary_contact_email": "support@oneclick3pl.com",
                "digital_link": "https://example.com/414/4445556667899",
                "custom_id": null,
                "primary_contact_title": null,
                "location_redirection_url": "https://oneclick3pl.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "DISTRIBUTION_CENTRE"
                ],
                "parent_location": null,
                "owning_organisation": null,
                "related_organisation": null,
                "account": null,
                "latitude": "31.092487",
                "longitude": "-97.391175",
                "map": {
                    "coordinates": [
                        -97.39118381787232,
                        31.092438548766722
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [
                    {
                        "id": 30001,
                        "location_id": "/414/4445556667899",
                        "languages_code": "en-US",
                        "location_description": "Elevate your eCommerce business with OneClick3PL Logistics your premier multi-client 3PL partner. We specialize in tailored eCommerce fulfillment, including Shopify fulfillment, to streamline your operations and enhance customer satisfaction. Our services integrate seamlessly with all major eCommerce platforms and marketplaces, including Shopify, Amazon, TikTok, and 100+ retailers."
                    }
                ],
                "certifications": []
            },
            "inferred": 1
        },
        {
            "epc_join_key": "/01/00810139841012/21/RG1001",
            "event_id": "V:ni:///sha-256;aa1b3d14a501fbb772570d2471b561d82df781ad2dd258857709741dc3974154?ver=CBV2.0",
            "event_type": "ObjectEvent",
            "action": "OBSERVE",
            "biz_step": "receiving",
            "disposition": "in_progress",
            "event_time": "2025-07-02T03:10:47.837Z",
            "event_time_zone_offset": "+00:00",
            "parent_join_key": null,
            "quantity": null,
            "uom": null,
            "biz_location_join_key": {
                "id": "/414/4445556667899",
                "user_created": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
                "date_created": "2025-07-02T03:04:13.000Z",
                "user_updated": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
                "date_updated": "2025-07-02T03:15:22.000Z",
                "location_name": "One Click 3PL Texas",
                "third_party_location": true,
                "timezone": null,
                "gln": "4445556667899",
                "gln_extension": null,
                "address": "4022 Bell Dr",
                "city": "Temple",
                "state": "Texas",
                "postal_code": "76502",
                "primary_contact_telephone": "+143452453243",
                "primary_contact_type": null,
                "primary_contact_email": "support@oneclick3pl.com",
                "digital_link": "https://example.com/414/4445556667899",
                "custom_id": null,
                "primary_contact_title": null,
                "location_redirection_url": "https://oneclick3pl.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "DISTRIBUTION_CENTRE"
                ],
                "parent_location": null,
                "owning_organisation": null,
                "related_organisation": null,
                "account": null,
                "latitude": "31.092487",
                "longitude": "-97.391175",
                "map": {
                    "coordinates": [
                        -97.39118381787232,
                        31.092438548766722
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [
                    {
                        "id": 30001,
                        "location_id": "/414/4445556667899",
                        "languages_code": "en-US",
                        "location_description": "Elevate your eCommerce business with OneClick3PL Logistics your premier multi-client 3PL partner. We specialize in tailored eCommerce fulfillment, including Shopify fulfillment, to streamline your operations and enhance customer satisfaction. Our services integrate seamlessly with all major eCommerce platforms and marketplaces, including Shopify, Amazon, TikTok, and 100+ retailers."
                    }
                ],
                "certifications": []
            },
            "read_point_join_key": {
                "id": "/414/4445556667899",
                "user_created": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
                "date_created": "2025-07-02T03:04:13.000Z",
                "user_updated": "a677e0fc-f952-4bcd-ba04-4b443f8c55ef",
                "date_updated": "2025-07-02T03:15:22.000Z",
                "location_name": "One Click 3PL Texas",
                "third_party_location": true,
                "timezone": null,
                "gln": "4445556667899",
                "gln_extension": null,
                "address": "4022 Bell Dr",
                "city": "Temple",
                "state": "Texas",
                "postal_code": "76502",
                "primary_contact_telephone": "+143452453243",
                "primary_contact_type": null,
                "primary_contact_email": "support@oneclick3pl.com",
                "digital_link": "https://example.com/414/4445556667899",
                "custom_id": null,
                "primary_contact_title": null,
                "location_redirection_url": "https://oneclick3pl.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "DISTRIBUTION_CENTRE"
                ],
                "parent_location": null,
                "owning_organisation": null,
                "related_organisation": null,
                "account": null,
                "latitude": "31.092487",
                "longitude": "-97.391175",
                "map": {
                    "coordinates": [
                        -97.39118381787232,
                        31.092438548766722
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [
                    {
                        "id": 30001,
                        "location_id": "/414/4445556667899",
                        "languages_code": "en-US",
                        "location_description": "Elevate your eCommerce business with OneClick3PL Logistics your premier multi-client 3PL partner. We specialize in tailored eCommerce fulfillment, including Shopify fulfillment, to streamline your operations and enhance customer satisfaction. Our services integrate seamlessly with all major eCommerce platforms and marketplaces, including Shopify, Amazon, TikTok, and 100+ retailers."
                    }
                ],
                "certifications": []
            },
            "ilmd_lot_number": null,
            "ilmd_item_expiration_date": null,
            "ilmd_best_before_date": null,
            "ilmd_sell_by_date": null,
            "source_location_join_key": null,
            "destination_location_join_key": null,
            "inferred": 1
        }
    ],
    "contents": [],
    "inputs": [
        {
            "final_output_epc_join_key": "/01/00810139841012/10/RGSG101",
            "final_output_epc_type": "lgtin",
            "final_output_product_join_key": "/01/00810139841012",
            "final_output_lot_number": "RGSG101",
            "input_epc_join_key": "/01/01231236159012/10/APPLE101",
            "input_epc_type": "lgtin",
            "input_product_join_key": {
                "id": "/01/01231236159012",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:06:10.000Z",
                "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_updated": "2025-06-20T09:06:55.000Z",
                "product_name": "Apples",
                "gtin": "01231236159012",
                "custom_id": null,
                "digital_link": "https://example.com/01/01231236159012",
                "product_redirection_url": "https://en.wikipedia.org/wiki/Acme_Corporation",
                "product_reference_document": null,
                "packaging_type_code": "BO",
                "variant_description": null,
                "functional_name": null,
                "net_weight": "12.00000",
                "net_weight_unit": "KGM",
                "gross_weight": "13.00000",
                "third_party_product": true,
                "finished_product": false,
                "primary_image": null,
                "product_manufacturer": "/417/1231236152436",
                "brand_owner": null,
                "account": null,
                "gross_weight_unit": "KGM",
                "net_content": null,
                "net_content_unit": null,
                "product_redirection_rule": null,
                "fat_percentage_in_dry_matter": null,
                "percentage_of_alcohol_by_volume": null,
                "nutrient_basis_quantity": null,
                "nutrient_basis_quantity_type": null,
                "nutrient_basis_quantity_unit": null,
                "serving_size": null,
                "serving_size_unit": null,
                "translations": [
                    {
                        "id": 180007,
                        "product_id": "/01/01231236159012",
                        "languages_code": "en-US",
                        "product_description": null,
                        "allergen_statement": null,
                        "ingredient_statement": null
                    },
                    {
                        "id": 180008,
                        "product_id": "/01/01231236159012",
                        "languages_code": "en-US",
                        "product_description": "Fresh produce",
                        "allergen_statement": null,
                        "ingredient_statement": null
                    }
                ],
                "certifications": [],
                "nutrients": [],
                "brand": {
                    "brand_name": "Acme",
                    "sub_brand_name": null
                }
            },
            "input_lot_number": "APPLE101",
            "input_epc_quantity": "300.00",
            "input_epc_uom": "KGM",
            "input_event_id": "ni:///sha-256;a18bfde33b9f36ee686e7dd06bba5af07d47b0da8c1c21d14a919316d8f24606?ver=CBV2.0",
            "input_event_time": "2025-06-03T00:00:00.000Z",
            "output_epc_join_key": "/01/00810139841012/10/RGSG101",
            "output_epc_type": "lgtin",
            "output_product_join_key": {
                "id": "/01/00810139841012",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T07:46:51.000Z",
                "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_updated": "2025-06-24T13:36:38.000Z",
                "product_name": "Sweet Greens 12oz",
                "gtin": "00810139841012",
                "custom_id": null,
                "digital_link": "https://example.com/01/00810139841012",
                "product_redirection_url": "https://www.mybrand.com/products/best-juice-cleanse-for-weight-loss",
                "product_reference_document": null,
                "packaging_type_code": "BO",
                "variant_description": null,
                "functional_name": "Sweet Greens 12oz",
                "net_weight": "340.00000",
                "net_weight_unit": "GRM",
                "gross_weight": "350.00000",
                "third_party_product": false,
                "finished_product": true,
                "primary_image": "6a06d0c5-5974-4a6d-ac14-62b4f6c5864e",
                "product_manufacturer": "/417/0810139840008",
                "brand_owner": null,
                "account": null,
                "gross_weight_unit": "GRM",
                "net_content": null,
                "net_content_unit": null,
                "product_redirection_rule": "548d9335-3ade-40ae-b68d-5f1e56efc3db",
                "fat_percentage_in_dry_matter": null,
                "percentage_of_alcohol_by_volume": null,
                "nutrient_basis_quantity": null,
                "nutrient_basis_quantity_type": null,
                "nutrient_basis_quantity_unit": null,
                "serving_size": null,
                "serving_size_unit": null,
                "translations": [
                    {
                        "id": 180001,
                        "product_id": "/01/00810139841012",
                        "languages_code": "en-US",
                        "product_description": "This is your classic green juice that's full of nutrient dense leafy greens. Fuel your body with 6g of protein, 140% Vitamin C, and 130% vitamin A.",
                        "allergen_statement": null,
                        "ingredient_statement": "apples, kale, spinach, collards, lemon"
                    }
                ],
                "certifications": [],
                "nutrients": [],
                "brand": {
                    "id": "73c2cccf-1935-4615-9955-88acec482e35",
                    "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                    "date_created": "2025-06-20T07:44:49.000Z",
                    "user_updated": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                    "date_updated": "2025-06-30T06:20:58.000Z",
                    "brand_name": "Raw Generation",
                    "sub_brand_name": null,
                    "account": null,
                    "primary_image": "bfba1097-b753-4f49-a347-619d3c0fb861",
                    "translations": []
                }
            },
            "output_lot_number": "RGSG101",
            "output_epc_quantity": "800.00",
            "output_epc_uom": "EA",
            "output_event_id": "ni:///sha-256;a18bfde33b9f36ee686e7dd06bba5af07d47b0da8c1c21d14a919316d8f24606?ver=CBV2.0",
            "output_event_time": "2025-06-03T00:00:00.000Z",
            "output_event_biz_location_join_key": {
                "id": "/414/0810139841012",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "Raw Gen Factory",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": null,
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012",
                "custom_id": "LOC-ABC",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "output_event_read_point_join_key": {
                "id": "/414/0810139841012",
                "user_created": "2fdd0322-5136-4ec2-828b-40bf6c8e56d7",
                "date_created": "2025-06-20T09:31:17.000Z",
                "user_updated": null,
                "date_updated": null,
                "location_name": "Raw Gen Factory",
                "third_party_location": false,
                "timezone": null,
                "gln": "0810139841012",
                "gln_extension": null,
                "address": "309 Morris Ave",
                "city": "Long Branch",
                "state": "NJ",
                "postal_code": "07740",
                "primary_contact_telephone": "+132432423",
                "primary_contact_type": null,
                "primary_contact_email": null,
                "digital_link": "https://example.com/414/0810139841012",
                "custom_id": "LOC-ABC",
                "primary_contact_title": null,
                "location_redirection_url": "https://www.mybrand.com/",
                "country_code": "US",
                "primary_image": null,
                "location_role": [
                    "MANUFACTURING_PLANT"
                ],
                "parent_location": null,
                "owning_organisation": "/417/0810139840008",
                "related_organisation": "/417/0810139840008",
                "account": null,
                "latitude": "40.298666",
                "longitude": "-73.992145",
                "map": {
                    "coordinates": [
                        -73.99214457615223,
                        40.298665892194315
                    ],
                    "type": "Point"
                },
                "location_redirection_rule": null,
                "translations": [],
                "certifications": []
            },
            "transformation_id": "ni:///sha-256;a18bfde33b9f36ee686e7dd06bba5af07d47b0da8c1c21d14a919316d8f24606?ver=CBV2.0",
            "level": 1,
            "inputs": []
        }
    ]
}
```