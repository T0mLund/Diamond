# Decision memo: contemplative-mandala display vocabulary and continuous BEING-rooted navigation

**Date:** 2026-10-19
**Authorised by:** Vegar, 2026-10-19 ("publish ... to replace the current app at diamond.thoughtfree.com")
**Spec impact:** None to Spec v3.4 text. The site's *display captions* now differ from the vocabulary written in the v3.4 documents. A committed spec revision under `Diamond_Versioning_Convention_v1.1` is not part of this change and remains a decision for the user.
**Schema impact:** None. No migration, no database read.
**Geometry impact:** None. Shell radii, landmark coordinates and the bipyramid are unchanged.

---

## What changed on the site

1. **Display vocabulary.** The Love/Hate, Past/Future and Awakening/Obliteration labels, and the zone names for the affect and vertical axes, are replaced by the contemplative-mandala set proposed in the 19 October analysis. The three spheres are named Responsiveness, Involvement and Fixation. Birth, Death and BEING are unchanged.

| Direction | Sphere 1 | Sphere 2 | Sphere 3 (vertex) |
|---|---|---|---|
| −X, rejecting | Discernment | Resistance | Hostility |
| +X, grasping | Appreciation | Wanting | Craving |
| −Y, self-diminishment (was Past) | Humility | Deference | Abasement |
| +Y, self-elevation (was Future) | Dignity | Pride | Inflation |
| −Z, continuance | Vitality | Striving | Insistence |
| +Z, disappearance | Release | Withdrawal | Escape |

   The axial tips are Permanence (−Z, was Awakening) and Erasure (+Z, was Obliteration). Compound captions join the active directional labels in X–Y–Z order with a middle dot. The time axis is now zoned like the other two.

2. **The view from BEING.** The eye never leaves BEING. Pan and tilt rotate the cone; narrowing the cone from 220° to 24° carries the focus outward through the spheres. Every display direction is present at once, with nearer layers stronger. Permanence and Erasure replace the Sphere 3 name when the cone narrows to a pole. Birth and Death remain absent from this view.

3. **Continuous navigation.** Zoom is one continuous movement from the torus through the outside view into BEING. The level-0 stop is gone. The page still opens as the torus.

4. **Outside view.** Three concentric ripples mark each axis–sphere crossing and grow with the sphere. Far-side labels fade to 90% / 61.5% / 33% behind one / two / three spheres (the 61.5% is an interpolation, not a stated user value). Colliding labels are displaced with a leader line instead of being hidden. Birth and Death carry black point markers.

5. **Opening.** Gold torus lines fade to grey as the bipyramid forms; the spheres grow from the centre.

## Not changed or not done

- The vocabulary is a proposal for a mandala in a modern visual language, not a traditional Buddhist system and not a measurement. Abasement, Insistence and Erasure are the most provisional words and have not been tested with readers.
- Label order is not reversed.
- `#debug` is not carried over.
- Real-phone testing is outstanding; checks so far used emulated touch and software rendering.
- `Diamond_Spec_v3.4.md`, the Summary and the database are not edited by this change.

## Rollback

Revert the merge commit, or restore the previous Netlify deploy (v3.4, commit `3bc0d83`).
