-- 0018_stillness_and_meditation.sql
-- The Diamond — Stillness and Meditation on the vertical axis (2026-10-15)
--
-- Authored under: Spec v3.4 §3.3. User decision 2026-10-15, verbatim:
--   "Meditation needs to be replaced across the board with Stillness (to
--    mirror Acceleration), and Contemplation should be replaced across the
--    board with Meditation."
--
-- The −z half of the vertical axis now reads, from BEING outward:
-- Reflection (Zone 1) – Meditation (Zone 2) – Stillness (Zone 3) –
-- Awakening. The +z half is unchanged: Oppression – Excitement –
-- Acceleration – Obliteration.
--
-- Every step is idempotent, so db-push can re-run this file safely. The
-- baseline (0001) seeds zones and sub_zones with `on conflict (slug) do
-- nothing`, so re-running it never restores the old names.
--
-- Order matters: Zone 3's Meditation becomes Stillness first, and only
-- then does Zone 2's Contemplation become Meditation. Each step touches
-- only its own zone's rows, so a re-run changes nothing.
--
-- Not changed: the vertical axis's description, "The contemplative axis",
-- uses the adjective, not the name of a quality.

-- 1 ─ Zone 3: Meditation → Stillness -----------------------------------
UPDATE public.zones SET vertical_neg = 'Stillness'
WHERE slug = 'zone-3' AND vertical_neg IS DISTINCT FROM 'Stillness';

UPDATE public.sub_zones
SET composite_quality = replace(composite_quality, 'Meditation', 'Stillness'),
    description       = replace(description, 'Meditation', 'Stillness')
WHERE zone_id = (SELECT id FROM public.zones WHERE slug = 'zone-3')
  AND (composite_quality LIKE '%Meditation%' OR description LIKE '%Meditation%');

UPDATE public.zones SET description =
  'The outermost spherical zone, bounded by the unit sphere. Strong commitment: acceleration and stillness, love and hate. The four equatorial landmarks (Love, Hate, Past, Future) sit on its outer boundary.'
WHERE slug = 'zone-3';

-- 2 ─ Zone 2: Contemplation → Meditation -------------------------------
UPDATE public.zones SET vertical_neg = 'Meditation'
WHERE slug = 'zone-2' AND vertical_neg IS DISTINCT FROM 'Meditation';

UPDATE public.sub_zones
SET composite_quality = replace(composite_quality, 'Contemplation', 'Meditation'),
    description       = replace(description, 'Contemplation', 'Meditation')
WHERE zone_id = (SELECT id FROM public.zones WHERE slug = 'zone-2')
  AND (composite_quality LIKE '%Contemplation%' OR description LIKE '%Contemplation%');

UPDATE public.zones SET description =
  'The middle zone. Intermediate intensification: meditation and excitement, desire and fear.'
WHERE slug = 'zone-2';

-- 3 ─ Awakening's description names the −z sequence --------------------
UPDATE public.coordinates SET description =
  'The -z (south) tip of the bipyramid at radius φ on Shell 4. Terminus of the contemplative / dissolving half of the vertical axis (Reflection → Meditation → Stillness → Awakening); beyond this lies Birth at radius φ².'
WHERE slug = 'awakening';
