-- Seed data for local Supabase/Postgres preview
-- Assumes the schema already exists: profiles, inventory_items, resource_requests, orders

insert into profiles (id, role, org_name, contact_email, contact_phone, location, created_at)
values
  ('11111111-1111-1111-1111-111111111111', 'hospital', 'St. Marys PHC', 'ops@stmarys-phc.org', '+91-90000-10001', 'North District', now()),
  ('22222222-2222-2222-2222-222222222222', 'hospital', 'Green Valley Clinic', 'admin@greenvalley-clinic.org', '+91-90000-10002', 'East District', now()),
  ('33333333-3333-3333-3333-333333333333', 'hospital', 'Riverbend Community Hospital', 'contact@riverbend-hospital.org', '+91-90000-10003', 'South District', now()),
  ('44444444-4444-4444-4444-444444444444', 'vendor', 'MediSupply Co.', 'sales@medisupply.co', '+91-90000-20001', 'Central Warehouse', now()),
  ('55555555-5555-5555-5555-555555555555', 'vendor', 'BioCare Distributors', 'dispatch@biocare-distributors.com', '+91-90000-20002', 'Cold Chain Hub', now()),
  ('66666666-6666-6666-6666-666666666666', 'vendor', 'Rapid Aid Logistics', 'support@rapidaid-logistics.com', '+91-90000-20003', 'West Freight Park', now());

insert into inventory_items (id, hospital_id, name, category, unit, current_quantity, full_capacity, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Paracetamol Tablets', 'Oral medication stock', 'boxes', 62, 100, now(), now()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Glucose Strips', 'Diagnostics', 'packs', 18, 100, now(), now()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Sterile Bandages', 'Wound care', 'units', 81, 120, now(), now()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'IV Saline Bags', 'Critical fluids', 'bags', 24, 80, now(), now()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'Insulin Vials', 'Endocrine care', 'vials', 14, 60, now(), now()),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'Oxygen Cylinders', 'Respiratory support', 'cylinders', 9, 20, now(), now());

insert into resource_requests (id, requesting_hospital_id, donor_hospital_id, inventory_item_id, resource_name, quantity_requested, status, urgency, created_at, updated_at)
values
  ('10101010-1010-1010-1010-101010101010', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Glucose Strips', 12, 'pending', 'critical', now(), now()),
  ('20202020-2020-2020-2020-202020202020', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Insulin Vials', 8, 'authorized', 'high', now(), now());

insert into orders (id, hospital_id, vendor_name, package_name, location, validity_date, vendor_assured, item_received, document_name, status, created_at, updated_at)
values
  ('30303030-3030-3030-3030-303030303030', '11111111-1111-1111-1111-111111111111', 'MediSupply Co.', 'Paracetamol 500mg x5000', 'Warehouse B, Sector 12', '2026-11-30', true, true, 'invoice_2291.pdf', 'delivered', now(), now()),
  ('40404040-4040-4040-4040-404040404040', '22222222-2222-2222-2222-222222222222', 'BioCare Distributors', 'Insulin Vials x320', 'Cold Storage, Depot 4', '2026-09-15', true, false, 'delivery_slip_08.jpg', 'pending', now(), now());
