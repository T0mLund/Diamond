// ============================================================
// content/sources.js — the spatial mapping of the citations bank.
//
// Each source carries a primary coordinate (where its most generative
// claim lives in the Diamond) and zero or more secondary coordinates
// (other places its claim resonates). Primary is the position-claim;
// secondaries are the harmonics.
//
// Coordinate vocabulary
// ─────────────────────
//   { type: 'point',  coord: <id> }        — a labelled position
//   { type: 'shell',  radius: 0.236 | 0.382 | 0.618 } — a φ-shell
//   { type: 'region', name: 'interstitial' | 'bipyramid_form'
//                          | 'tau_axis'    | 'time_axis'
//                          | 'vertical_axis' | 'affect_axis' }
//
// Point ids match the scene's label ids (see coordinates.js) plus
// 'awakening_zone', 'obliteration_zone', and 'omega_point'.
// ============================================================

import { PHI, PHI_HALF, LIMIT, SHELLS } from '../coordinates.js';

// World-position lookup for every point coord, derived from φ.
// SHELLS = [φ⁻¹, φ⁻², φ⁻³] = [0.618, 0.382, 0.236].
const [S1, S2, S3] = SHELLS;

export const POINT = Object.freeze({
  BEING:             { x: 0,    y: 0,        z: 0 },
  // upper half (y > 0 → toward Death, scene convention)
  oppression:        { x: 0,    y:  S3,      z: 0 },
  excitement:        { x: 0,    y:  S2,      z: 0 },
  intensity:         { x: 0,    y:  S1,      z: 0 },
  tip_upper:         { x: 0,    y:  PHI_HALF, z: 0 },
  obliteration_zone: { x: 0,    y:  1,       z: 0 },
  death:             { x: 0,    y:  LIMIT,   z: 0 },
  // lower half
  reflection:        { x: 0,    y: -S3,      z: 0 },
  meditation:        { x: 0,    y: -S2,      z: 0 },
  insight:           { x: 0,    y: -S1,      z: 0 },
  tip_lower:         { x: 0,    y: -PHI_HALF, z: 0 },
  awakening_zone:    { x: 0,    y: -1,       z: 0 },
  birth:             { x: 0,    y: -LIMIT,   z: 0 },
  // affect equator
  hate:              { x: -S1,  y: 0, z: 0 },
  fear:              { x: -S2,  y: 0, z: 0 },
  aversion:          { x: -S3,  y: 0, z: 0 },
  attraction:        { x:  S3,  y: 0, z: 0 },
  desire:            { x:  S2,  y: 0, z: 0 },
  love:              { x:  S1,  y: 0, z: 0 },
  // time axis poles (z-axis): future at +1 sphere, past at −1 sphere
  future:            { x: 0,    y: 0, z:  1 },
  past:              { x: 0,    y: 0, z: -1 },
  // omega (τ=1 collapse) sits at +φ where the existing omegaDot is
  omega_point:       { x: 0, y: LIMIT, z: 0 },
});

// Hover-region id → POINT key. Hover ids are the scene's tier ids.
export const HOVER_TO_POINT = Object.freeze({
  being:        'BEING',
  death:        'death',
  obliteration: 'obliteration_zone',
  intensity:    'intensity',
  excitement:   'excitement',
  oppression:   'oppression',
  reflection:   'reflection',
  meditation:   'meditation',
  insight:      'insight',
  awakening:    'awakening_zone',
  birth:        'birth',
  hate:         'hate', fear: 'fear', aversion: 'aversion',
  attraction:   'attraction', desire: 'desire', love: 'love',
});

// ------------------------------------------------------------
// SOURCES — the bank, mapped.
// ------------------------------------------------------------
export const SOURCES = [

  // ── BEING ────────────────────────────────────────────────────
  // Reserved for sources making the strictest unmediated
  // identity-claim about being-itself: Western metaphysics,
  // apophatic theology, Zen, and prajñāpāramitā traditions
  // each contribute their most rigorous articulations.
  // ─────────────────────────────────────────────────────────────

  {
    id: 'heidegger-being-time',
    author: 'Martin Heidegger', work: 'Being and Time', year: '1927',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'Dasein as the entity for whom Being is explicitly at issue — the paradigmatic philosophical thematization of being-itself, with no qualifying predicate added.',
    secondary: [{ type: 'point', coord: 'death' }, { type: 'region', name: 'time_axis' }],
    resonances: ['death', 'time_axis'],
    gloss_at_primary: 'Dasein as the entity for whom Being is at issue — the zero-point that cannot be objectified, since every act of objectification already presupposes the being-there that does the objectifying. At the Diamond\'s centre, where no coordinate supervenes, Heidegger\'s §41 places the sole entity whose existence is constituted by the question of existence itself — not a thing among things but the clearing in which beings appear. The BEING-coordinate does not name a metaphysical substance; it names this site of original disclosure.',
    gloss_at_secondary: {
      death:     'Sein-zum-Tode: death as constitutive of the horizon from which BEING is disclosed',
      time_axis: 'temporality as the threefold ekstatic structure of care',
    },
    excerpt: 'Dasein is the entity which in its Being has this very Being as an issue for it.',
    reference: 'Heidegger, Martin. Being and Time. Trans. Macquarrie & Robinson. Oxford: Blackwell, 1962 [1927]. §41.',
  },

  {
    id: 'plotinus-enneads-vi-9-8',
    author: 'Plotinus', work: 'Enneads VI.9.8', year: 'c. 270',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"Every centre is the centre of all centres" — the geometric identity formula for a sphere whose origin is everywhere; one of the strictest structural names for BEING in the Neoplatonic canon.',
    secondary: [{ type: 'region', name: 'interstitial' }],
    resonances: [],
    gloss_at_primary: 'every centre is the centre of all centres — the geometric formula for a sphere whose origin is everywhere, and therefore the most precise Neoplatonic name for what the Diamond\'s BEING-coordinate instantiates. Plotinus does not speak loosely: each finite centre, when fully aligned, coincides with the universal centre — not by spatial collapse but by ontological transparency. To stand at BEING is to bear oneself to that coincidence; the geometry does the metaphysics.',
    gloss_at_secondary: {
      interstitial: 'the alignment of finite centres with the universal centre as the unmanifest condition of structure',
    },
    excerpt: 'we bear ourselves aloft… and hold through our own centre to the centre of all the centres.',
    reference: 'Plotinus. The Enneads VI.9.8. Trans. MacKenna.',
  },

  {
    id: 'chandogya-upanishad',
    author: 'Chāndogya Upaniṣad', work: 'Chāndogya Upaniṣad 6.2 / 6.8', year: 'c. 7th–6th c. BCE',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"Sat — one only without a second": the Upanishadic declaration of pure being prior to every distinction. "Tat tvam asi" closes the loop: the self IS that being-itself, without qualification.',
    secondary: [],
    resonances: [],
    gloss_at_primary: 'sat as the sole ground — "one only without a second" — being prior to every distinction; the Chāndogya\'s declaration does not argue but states, removing every qualification until only pure existence remains. The closing formula, tat tvam asi, loops this back: the self that asks the question IS the sat it sought. At the Diamond\'s centre, both moves belong — the initial stripping of predicate and the final identity that closes the inquiry without answer.',
    gloss_at_secondary: {},
    excerpt: 'In the beginning, my dear, this was Being [sat] alone, one only without a second… Tat tvam asi.',
    reference: 'Chāndogya Upaniṣad. Trans. Patrick Olivelle. Oxford World\'s Classics, 1996.',
  },

  {
    id: 'tillich-systematic',
    author: 'Paul Tillich', work: 'Systematic Theology, Vol. 1', year: '1951',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"God as being-itself, not a being alongside others" — Tillich\'s ontological claim survives the BEING test: the divine is not a being but the power-of-being from which every being draws its existence.',
    secondary: [],
    resonances: [],
    gloss_at_primary: 'God as being-itself, not a being among beings — the centre as power-of-being rather than entity, which is Tillich\'s decisive ontological move: the divine is not an exalted object but the ground from which every object draws its power to exist. The Diamond\'s BEING-coordinate requires exactly this distinction — it is not a place where a supreme being resides but the zero-point from which existence as such radiates, anterior to every theological or metaphysical predicate.',
    gloss_at_secondary: {},
    excerpt: 'The being of God cannot be understood as the existence of a being alongside others or above others… God [is] being-itself, or… the ground of being.',
    reference: 'Tillich, Paul. Systematic Theology, Vol. 1. Chicago: U Chicago P, 1951, p. 235.',
  },

  {
    id: 'cusa-docta-ignorantia',
    author: 'Nicholas of Cusa', work: 'De Docta Ignorantia', year: '1440',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"A sphere whose centre is everywhere and circumference nowhere" — the precise geometric formula the Diamond model instantiates; Cusa names BEING as the ground of every centre.',
    secondary: [{ type: 'region', name: 'tau_axis' }, { type: 'point', coord: 'omega_point' }],
    resonances: ['obliteration_zone', 'birth'],
    gloss_at_primary: 'a sphere whose centre is everywhere and circumference is nowhere — the geometric formula the Diamond model instantiates directly, not as metaphor but as structural axiom. Cusa arrived at this formula through his doctrine of learned ignorance: the intellect, pursuing the maximum and minimum until they coincide, discovers a magnitude beyond every finite bound — whose only adequate image is a sphere no edge can circumscribe. BEING in the Diamond is this coincidence-point, the only coordinate that every other coordinate implicitly references.',
    gloss_at_secondary: {
      tau_axis:    'coincidentia oppositorum: the speculative bridge along which the bipyramid becomes the torus',
      omega_point: 'opposites coinciding at infinity — the geometric warrant for the τ=1 identity',
    },
    excerpt: 'The world machine will have its center everywhere and its circumference nowhere… God is its circumference and center.',
    reference: 'Nicholas of Cusa. De Docta Ignorantia. Trans. Jasper Hopkins. Banning Press, 1985. II.12. Cusa is here the systematiser of a formula already in circulation in the twelfth century; see also Alain de Lille, Theologicae Regulae and the Liber XXIV philosophorum.',
  },

  {
    id: 'liber-xxiv-philosophorum',
    author: 'Anonymous (apocr. Hermes Trismegistus)', work: 'Liber XXIV philosophorum, Proposition II', year: '12th c. (anon.)',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"Deus est sphaera infinita cuius centrum est ubique, circumferentia nusquam" — the earliest extant Latin formulation of the sphere-formula Cusa later systematises. Pure BEING identity-claim, in geometric form.',
    secondary: [],
    resonances: ['BEING'],
    gloss_at_primary: '"God is an infinite sphere whose centre is everywhere and circumference is nowhere" — the proposition the medieval Latin tradition transmitted as the sphere-formula, attributed in the twelfth century to a pseudonymous Hermes Trismegistus and later inherited by Alain de Lille, Bonaventure, Cusa, Pascal, and the German mystics. The Diamond\'s BEING-coordinate sits at the geometric truth this proposition states: a centre that is not one place among others but the structural condition of every place. Citing the Liber XXIV places the formula in its actual lineage rather than at its most famous waypoint.',
    gloss_at_secondary: {},
    excerpt: 'Deus est sphaera infinita cuius centrum est ubique, circumferentia nusquam.',
    reference: 'Liber XXIV philosophorum ("Book of the Twenty-Four Philosophers"), Prop. II. Critical edition: Françoise Hudry, ed., Liber Viginti Quattuor Philosophorum, Corpus Christianorum Continuatio Mediaevalis 143A, Brepols, 1997.',
  },

  {
    id: 'alain-de-lille-regulae',
    author: 'Alain de Lille', work: 'Theologicae Regulae (Regula VII)', year: 'c. 1170–1185',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'Alain transmits and gives Christian theological framing to the sphere-formula — "intelligible sphere whose centre is everywhere" — as a rule of theological method. Direct precedent to Cusa\'s use; the formula\'s first stable Christian habitation.',
    secondary: [],
    resonances: ['BEING'],
    gloss_at_primary: 'the intelligible sphere whose centre is everywhere and circumference nowhere, set down as a regula — a rule — of theological method; Alain de Lille is the bridge between the anonymous Liber XXIV and the canonical mystical tradition that runs through Bonaventure to Cusa. The Theologicae Regulae presents the sphere-formula as a maxim governing how one may speak of God at all: not as one place opposed to another but as the geometric figure that frees theology from a localised divine. The Diamond\'s BEING-coordinate inherits this lineage, not Cusa alone.',
    gloss_at_secondary: {},
    excerpt: 'Deus est sphaera intelligibilis, cuius centrum ubique, circumferentia nusquam.',
    reference: 'Alain de Lille (Alanus ab Insulis). Theologicae Regulae (Regulae caelestis iuris), Regula VII. PL 210, 627. Modern critical edition: Nikołaj M. Häring, ed., Archives d\'histoire doctrinale et littéraire du moyen âge 48 (1981).',
  },

  {
    id: 'heart-sutra',
    author: 'Prajñāpāramitā Hṛdaya Sūtra', work: 'The Heart Sūtra', year: 'c. 350',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"Form IS emptiness, emptiness IS form" — the strictest Buddhist identity claim: the two terms are not reconciled but identical. This is the prajñāpāramitā\'s direct articulation of being-itself as the non-difference of appearance and emptiness.',
    secondary: [{ type: 'point', coord: 'awakening_zone' }, { type: 'region', name: 'interstitial' }],
    resonances: ['awakening_zone', 'insight'],
    gloss_at_primary: '"form is emptiness, emptiness is form" — the prajñāpāramitā identity claim that voids every positional distinction from inside, not by negating form but by revealing that the form\'s own being is empty of inherent existence and therefore indistinguishable from the very emptiness one might oppose to it. The Heart Sūtra belongs at BEING because it does not merely approach non-duality; it states it — without qualification, without hedging, in a syntax that mirrors the identity it declares. No predicate can attach to the coordinate this text names.',
    gloss_at_secondary: {
      awakening_zone: 'the awakening that realizes this identity dissolves the fixed observer',
      interstitial:   'the negation of every datum — the unstructured ground of every structured claim',
    },
    excerpt: 'No eye, no ear, no nose, no tongue, no body, no mind… No attainment and also no non-attainment.',
    reference: 'Prajñāpāramitā Hṛdaya Sūtra. In Conze, Buddhist Wisdom Books. George Allen & Unwin, 1958.',
  },

  {
    id: 'diamond-sutra',
    author: 'Vajracchedikā Prajñāpāramitā Sūtra', work: 'The Diamond Sutra', year: 'c. 300',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'The vajra cuts to reveal that form and emptiness are not two — the Diamond Sutra\'s ultimate claim is the non-dual identity of phenomenon and śūnyatā, which is a BEING-claim: being-itself seen directly, without mediation.',
    secondary: [{ type: 'point', coord: 'insight' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['insight', 'awakening_zone'],
    gloss_at_primary: 'the vajra reveals the identity of form and emptiness — being-itself seen directly, without conditioned overlay; the diamond that cuts is not an instrument applied from outside but the nature of mind itself when it ceases to misrecognize its own ground. The Diamond Sūtra\'s BEING-claim is enacted rather than stated: each question the Buddha poses dissolves the conceptual frame that would position the questioner apart from what is asked. What remains, when the frames are gone, is the coordinate the Diamond model places at its own centre.',
    gloss_at_secondary: {
      insight:        'the cutting wisdom as Shell 3 penetrating clarity — the last station before the identity is simply seen',
      awakening_zone: 'the cut as the lower piercing — wisdom that severs at the sphere shell',
    },
    excerpt: 'the indestructible wisdom that annihilates everything and enables supreme perfect attainment… The vajra cuts through all doubt and confusion.',
    reference: 'Vajracchedikā Prajñāpāramitā Sūtra. Trans. Red Pine. Counterpoint, 2001.',
  },

  {
    id: 'heraclitus-logos',
    author: 'Heraclitus', work: 'Fragments (DK 50, 54)', year: 'c. 500 BCE',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'DK 50: "listening not to me but to the logos, it is wise to agree that all things are one" — the logos as the common being of all things is the pre-Socratic BEING claim, prior to any metaphysical elaboration.',
    secondary: [{ type: 'region', name: 'time_axis' }],
    resonances: ['time_axis'],
    gloss_at_primary: 'logos as the common unity — the hidden proportion that is being-itself before differentiation; Heraclitus\'s claim is not mystical but structural: beneath the war of opposites runs a single measure that holds them together without cancelling their tension. DK 50 — "all things are one" — is the pre-Socratic BEING-statement, and DK 54 deepens it: the hidden harmony is stronger than the manifest. The Diamond\'s centre is the logos in Heraclitus\'s sense — the proportion that is present in every conflict yet grasped by almost none.',
    gloss_at_secondary: {
      time_axis: 'the river fragment (DK 12): same river, different waters — logos as the temporal continuity of being',
    },
    excerpt: 'The hidden harmony is stronger than the one that is apparent.',
    reference: 'Heraclitus. Fragments. In Kirk, Raven, Schofield. The Presocratic Philosophers. CUP, 1983.',
  },

  {
    id: 'bindu-tantric',
    author: 'Sir John Woodroffe (Arthur Avalon)', work: 'The Serpent Power (the bindu)', year: '1918',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'The bindu is literally the dimensionless point from which all mandala-geometry radiates — the Sanskrit cosmological name for the centre that is the Diamond\'s origin. Pure identity claim: all space from one point.',
    secondary: [],
    resonances: [],
    gloss_at_primary: 'the dimensionless point from which mandala-geometry radiates — the Diamond\'s centre named in Sanskrit cosmology as bindu, the dot that precedes every line and every arc. In Tantric cosmogony the bindu is not small; it is prior to spatial extension altogether — the condition of possibility for every figure that geometry will subsequently draw. Its placement at BEING is therefore not analogical but homological: the Diamond\'s origin-coordinate IS the bindu, differently articulated.',
    gloss_at_secondary: {},
    excerpt: 'The bindu is the point at which creation begins and may become unity… the sacred symbol of the cosmos in its unmanifested state.',
    reference: 'Woodroffe, Sir John. The Serpent Power. Madras: Ganesh & Co., 1918.',
  },

  {
    id: 'pseudo-dionysius',
    author: 'Pseudo-Dionysius the Areopagite', work: 'Mystical Theology', year: 'c. 500',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'The divine source beyond all names and attributes — Pseudo-Dionysius\'s apophatic theology strips every predicate from God until only the unnameable being-itself remains: this is the apophatic BEING claim, not a limit-event.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }],
    resonances: ['obliteration_zone'],
    gloss_at_primary: 'the divine source beyond all names — the apophatic name for being-itself that language cannot grasp, since every name applied to it instantly falls short and must be withdrawn. Pseudo-Dionysius\'s method is the systematic stripping of predicate after predicate until only the silence of the unnameable remains — a silence that is not empty but superabundant. The Diamond\'s BEING-coordinate is approached by this same via negativa: not a position one reaches but the ground one discovers was always already here when the names are set aside.',
    gloss_at_secondary: {
      obliteration_zone: 'the apophatic ascent passes through the upper piercing into the luminous dark',
    },
    excerpt: 'We enter into the darkness that is above intellect… we attribute intangible and invisible darkness of that Light which is unapproachable.',
    reference: 'Pseudo-Dionysius. Mystical Theology. Trans. Colm Luibheid. Paulist Press, 1987.',
  },

  {
    id: 'vajrasattva',
    author: 'Buddhist Tantra (Jung commentary)', work: 'Vajrasattva — adamantine being', year: 'classical',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'Vajrasattva — "diamond being" — names the practitioner\'s nature as the diamond itself: being-itself as indestructible, immediate, and without residue. The tantra\'s claim IS the BEING identity-claim in embodied form.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }],
    resonances: ['obliteration_zone'],
    gloss_at_primary: 'vajrasattva: the diamond being whose nature is the diamond itself — embodied indestructibility as identity with BEING, not as future attainment but as the practitioner\'s already-present nature awaiting recognition. The Tantric claim is that the base is not impure mind gradually purified but diamond mind provisionally obscured — and ritual purification is the act of removing what never truly stained it. Vajrasattva therefore names the BEING-coordinate from the practitioner\'s own side: being-itself recognized in and as the body.',
    gloss_at_secondary: {
      obliteration_zone: 'the ritual dissolution into vajrasattva as the upper-piercing realisation of this identity',
    },
    excerpt: 'as Buddha, he is simply vajra-sattva, i.e., the diamond being… he can now incorporate the entire environment into himself.',
    reference: 'Jung, C.G. Psychology of Yoga and Meditation. CW 18. PUP, 2020.',
  },

  {
    id: 'dogen-genjokoan',
    author: 'Dōgen Zenji', work: 'Shōbōgenzō, "Genjōkōan"', year: '1233',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"To study the way is to study the self; to study the self is to forget the self; to forget the self is to be enlightened by all things" — genjōkōan means the actualization of the fundamental point: being-itself presencing in each moment. This is Dōgen\'s BEING claim.',
    secondary: [{ type: 'point', coord: 'awakening_zone' }, { type: 'region', name: 'tau_axis' }],
    resonances: ['awakening_zone'],
    gloss_at_primary: 'genjōkōan: the actualization of the fundamental point — being-itself presencing in each moment without remainder, in such a way that the moment\'s total specificity — this firewood, this ash — is also its total expression of being. Dōgen does not ascend from the particular to a general ground; he finds the ground already fully present in the particular, with nothing left over. At BEING, the Diamond marks the coordinate where the movement between point and ground ceases because the distinction was never absolute.',
    gloss_at_secondary: {
      awakening_zone: 'kenshō as discontinuity — the deluded person dropped away; awakening as the break that reveals what was always present',
      tau_axis:       'firewood-and-ash: each is its own complete expression; no temporal carry-over',
    },
    excerpt: 'To study the Buddha way is to study the self. To study the self is to forget the self. To forget the self is to be actualized by myriad things.',
    reference: 'Dōgen Eihei. "Genjōkōan." Trans. Nishijima & Cross. Numata Center, 1994.',
  },

  {
    id: 'hakuin-wild-ivy',
    author: 'Hakuin Ekaku', work: 'Wild Ivy (Itsumadegusa)', year: 'c. 1775',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'Great Death → Great Life: Hakuin\'s formulation resolves in the recognition of being-itself. The annihilative event (Great Death) is the doorway; what it opens onto is BEING realized directly. The deepest articulation is the BEING-claim, not the event.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['obliteration_zone', 'awakening_zone'],
    gloss_at_primary: 'Great Death → Great Life: the annihilative event as the doorway through which BEING is recognized directly — not as a destination beyond the dying but as what the dying reveals was already the case. Hakuin\'s autobiography enacts this structure: the doubt mass builds to unbearable compression, shatters, and what emerges is not a new state but the groundless ground that had no beginning. The BEING-coordinate receives this source because the resolution of the great death is not obliteration but recognition; the event-structure resonates elsewhere.',
    gloss_at_secondary: {
      obliteration_zone: 'Great Death as the sphere-piercing — ego-dissolution as the upper limit event',
      awakening_zone:    'Great Joy as the lower correlate — the return whose form is no longer ordinary',
    },
    excerpt: 'I felt a great sense of doubt, then… the great doubt suddenly shattered… I thought I had died. Then I came back.',
    reference: 'Hakuin Ekaku. Wild Ivy. Trans. Norman Waddell. Shambhala, 1999.',
  },

  {
    id: 'zen-great-death',
    author: 'Dōgen Zenji / Hakuin Ekaku', work: 'Shōbōgenzō ("Zenki") and parallels', year: 'c. 1240 / 1775',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: '"Life passes through life to freedom, death too passes through death to freedom" — the Great Death/Great Life is not an endpoint but the realization that being-itself was never absent. The resolution is BEING; the event-structure is carried by resonances.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }, { type: 'point', coord: 'death' }],
    resonances: ['obliteration_zone', 'death'],
    gloss_at_primary: 'Great Death as the disclosure of BEING — life and death both pass through to freedom; what they open onto is the centre, not an eschatological beyond but the ground that was never absent. Dōgen\'s Zenki formulation refuses to privilege death over life: zenki means total dynamic working, the full vitality of being-itself operating through and as each moment. The Zen Great Death is therefore not the upper pole but its resolution — the Diamond\'s centre disclosed precisely by the passage through the pole, which is why the resonances carry the event-structure while BEING carries the resolution.',
    gloss_at_secondary: {
      obliteration_zone: 'the Great Death as ego-dissolution — the upper piercing as Zen interior event',
      death:             'physical dying as the figure for the spiritual event; not its substance',
    },
    excerpt: 'Life passes through life to freedom, and death too passes through death to freedom… both are the Great Path of consummation.',
    reference: 'Dōgen Eihei. Shōbōgenzō, "Zenki." Trans. Nishijima & Cross. Numata Center, 1994.',
  },

  {
    id: 'tathata-mahayana',
    author: 'Attrib. Aśvaghoṣa (traditional; modern scholarship contests)', work: 'Awakening of Mahāyāna Faith (Mahāyāna-śraddhotpāda-śāstra)', year: 'c. 6th c.',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'Tathatā — bare suchness — is the Mahāyāna name for being in its unqualified givenness: "just this," without predication or negation. The claim is that reality IS tathatā; this is a BEING identity-claim.',
    secondary: [{ type: 'point', coord: 'reflection' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['awakening_zone'],
    gloss_at_primary: 'tathatā — bare suchness as being in its unqualified givenness: reality IS just this, without predication, without the addition of approval or resistance. The Mahāyāna\'s name for this condition is not emptiness (which still implies its correlate) but suchness — a term that neither affirms nor negates but simply indicates what is already the case before the indicating begins. BEING in the Diamond is the coordinate of tathatā not as a doctrine one holds but as the site one inhabits when every qualifying movement has ceased. The text\'s traditional ascription to Aśvaghoṣa is not sustained by modern scholarship; it is most plausibly a Chinese or Sino-Indian sixth-century composition, and is here cited under the conventional attribution with the contestation noted.',
    gloss_at_secondary: {
      reflection:     'the phenomenology of "just this" as a gentle inward recognition — suchness encountered in reflection',
      awakening_zone: 'the moment store-consciousness and tathatā cease to differ — the structural piercing',
    },
    excerpt: 'In the moment of enlightenment, the difference between the true reality [tathatā] and the store-consciousness disappears.',
    reference: 'Awakening of Mahāyāna Faith (Mahāyāna-śraddhotpāda-śāstra). Trans. Yoshito Hakeda. Columbia UP, 1967. Authorship traditionally given as Aśvaghoṣa; modern scholarship (e.g. Hakeda\'s introduction; Buswell & Lopez 2013) regards the attribution as contested and the text as most plausibly a sixth-century Chinese or Sino-Indian composition.',
  },

  {
    id: 'ratnagotravibhaga',
    author: 'Attrib. Sāramati / Maitreya–Asaṅga', work: 'Ratnagotravibhāga (Uttaratantra)', year: 'c. 4th–5th c.',
    primary:   { type: 'point', coord: 'BEING' },
    placement_rationale: 'The tathāgatagarbha treatise that articulates buddha-nature as the unconditioned dhātu present in every sentient being — a BEING-claim in the strict tathāgatagarbha register: not an attainment but the structural condition.',
    secondary: [{ type: 'point', coord: 'awakening_zone' }],
    resonances: ['awakening_zone'],
    gloss_at_primary: 'buddha-nature (tathāgatagarbha) as the unconditioned element — the dhātu — already present in every sentient being, obscured but not produced; the Ratnagotravibhāga\'s claim is structural rather than developmental: enlightenment is not added to the mind but uncovered in it. BEING in the Diamond receives this as one of its strictest expressions — the centre is not an outcome reached by practice but the always-already condition that practice removes the obstructions to. Indian-Buddhist scholarship attributes the verses to Sāramati or to Maitreya through Asaṅga\'s redaction; the older Western bundling of this text under Aśvaghoṣa is a misattribution.',
    gloss_at_secondary: {
      awakening_zone: 'the uncovering of buddha-nature as the lower piercing — recognition rather than acquisition',
    },
    excerpt: 'The element [dhātu] is empty of the adventitious [defilements] which are characterised by their total separateness from it; but it is not empty of the supreme qualities, which have the character of total non-separation from it.',
    reference: 'Ratnagotravibhāga (Uttaratantra). Trans. E. Obermiller (1931); revised in Takasaki, A Study on the Ratnagotravibhāga, IsMEO, 1966. Attribution: Sāramati (Indian Buddhist tradition); Maitreya as revealer through Asaṅga (Tibetan tradition).',
  },

  // ── SHELL 1: first departures from BEING ─────────────────────
  // Gentle first articulations away from the centre:
  // phenomenological reduction, first turning-inward,
  // mild restraint, first awareness of orientation.
  // ─────────────────────────────────────────────────────────────

  {
    id: 'brhadaranyaka-upanishad',
    author: 'Bṛhadāraṇyaka Upaniṣad', work: 'Bṛhadāraṇyaka Upaniṣad 4.3', year: 'c. 8th–7th c. BCE',
    primary:   { type: 'point', coord: 'reflection' },
    placement_rationale: 'Ātman as self-luminous light known in the inward turning of deep dreamless sleep — the first gentle articulation away from BEING, turning inward rather than asserting identity. The approach rather than the declaration.',
    secondary: [{ type: 'point', coord: 'awakening_zone' }],
    resonances: ['awakening_zone', 'BEING'],
    gloss_at_primary: 'ātman as self-luminous light — the self known only in inward turning, prior to subject-object division; the Bṛhadāraṇyaka\'s deep-sleep analysis arrives at a knowing that is not knowing-of-an-object but the light that makes all objects possible. This places it at reflection rather than BEING: it is the approach, the luminous interiority just beginning to recognize itself, not yet the declaration that ātman and brahman are one. The Diamond\'s Shell 1 downward registers precisely this — presence turning toward its own source, the first quiet departure from ordinary outward orientation.',
    gloss_at_secondary: {
      awakening_zone: 'the self in deep dreamless sleep as the apophatic zone the lower piercing approaches',
    },
    excerpt: 'When the light of the self rises, it goes upward… He is the light of lights.',
    reference: 'Bṛhadāraṇyaka Upaniṣad 4.3. Trans. Patrick Olivelle. Oxford: OUP, 1996.',
  },

  {
    id: 'husserl-ideas-ii',
    author: 'Edmund Husserl', work: 'Ideas II', year: 'c. 1912–1928 (pub. 1952)',
    primary:   { type: 'point', coord: 'reflection' },
    placement_rationale: 'The Nullpunkt is arrived at by phenomenological reduction — a reflective turning-inward. It locates the zero-point of orientation without asserting identity with being-itself; Shell 1 reflection rather than BEING.',
    secondary: [{ type: 'region', name: 'time_axis' }],
    resonances: ['time_axis'],
    gloss_at_primary: 'the lived body as Nullpunkt — the "here" constituted by the reflective reduction, not assertable as being-itself yet irreducible to any object among others. Husserl\'s phenomenological elaboration of the zero-point of orientation belongs at reflection because it arrives by a method — eidētic reduction applied to embodiment — rather than as an immediate declaration; form gives way to method, and the body\'s centrality is disclosed rather than assumed. The coordinate marks the first articulate inward turn: knowing where one stands before one knows what one is.',
    gloss_at_secondary: {
      time_axis: 'the body\'s zero-point as the standing present from which retention and protention unfold',
    },
    excerpt: 'The lived body is… the unique "zero-point" of every orientation, the ineliminable and central standpoint.',
    reference: 'Husserl, Edmund. Ideas II. Trans. Rojcewicz & Schuwer. Kluwer, 1989, §§41–42.',
  },

  {
    id: 'merleau-ponty-pp',
    author: 'Maurice Merleau-Ponty', work: 'Phenomenology of Perception', year: '1945',
    primary:   { type: 'point', coord: 'reflection' },
    placement_rationale: 'The body as "here that can never become a there" — a first-person inward orientation toward corporeal facticity. The somatic anchor is a reflective ground, not an absolute identity-claim.',
    secondary: [{ type: 'point', coord: 'birth' }],
    resonances: ['birth'],
    gloss_at_primary: 'the body as the "here" that can never become a "there" — somatic facticity as the first inward orientation, irreducibly mine and therefore never fully objectifiable. Merleau-Ponty\'s insight is that the body does not merely occupy space; it inhabits space from within, as the ground that any spatial reckoning already presupposes. The Diamond\'s reflection-coordinate names this embodied zero-point — not the abstract Nullpunkt of phenomenological method but the living flesh whose very being is already a form of orientation.',
    gloss_at_secondary: {
      birth: 'corporeal arrival as the lower limit out of which the zero-point coheres',
    },
    excerpt: 'One\'s own body is in the world just as the heart is in the organism… it breathes life into it and sustains it inwardly.',
    reference: 'Merleau-Ponty, Maurice. Phenomenology of Perception. Trans. Donald Landes. Routledge, 2012 [1945].',
  },

  {
    id: 'tillich-courage',
    author: 'Paul Tillich', work: 'The Courage to Be', year: '1952',
    primary:   { type: 'point', coord: 'oppression' },
    placement_rationale: 'The Courage to Be is specifically about the courage that holds against existential anxiety — non-being pressing on being. This is the first shadow of Shell 1 upward: mild restraint, the initial weight of finitude.',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['BEING'],
    gloss_at_primary: 'existential anxiety as the weight of non-being on being — the first upward shadow the Diamond names, the earliest tremor of finitude before it intensifies into dread. Tillich\'s The Courage to Be maps the three modes of anxiety — of fate, guilt, and meaninglessness — as the characteristic forms taken by non-being as it presses against existence. At oppression, Shell 1 upward, the pressure is mild and pervasive rather than acute; the self feels the constraint of its finitude without yet confronting the pole directly. Courage is the name for the act that holds at this coordinate without recoiling.',
    gloss_at_secondary: {
      BEING: 'the acceptance without an accepting subject — pure ground beneath every existential anxiety',
    },
    excerpt: 'It is the accepting of the acceptance without somebody or something that accepts. It is the power of being-itself…',
    reference: 'Tillich, Paul. The Courage to Be. New Haven: Yale UP, 1952, p. 185.',
  },

  {
    id: 'cloud-of-unknowing',
    author: 'Anonymous (English mystic)', work: 'The Cloud of Unknowing', year: 'c. 1380',
    primary:   { type: 'point', coord: 'reflection' },
    placement_rationale: 'The Cloud teaches a sustained gentle turning-away from all images toward a bare not-knowing that is itself a form of presence — the first reflective inward turn as method, not yet the breakthrough that Eckhart or Hakuin describe.',
    secondary: [{ type: 'point', coord: 'meditation' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['awakening_zone', 'meditation'],
    gloss_at_primary: 'the cloud of unknowing as the first inward turning: letting go of all images, dwelling in bare not-knowing — not as a failure of cognition but as the correct posture before what cannot be thought. The anonymous English mystic\'s instruction is methodical and patient; this is not the sudden piercing of Eckhart\'s Durchbruch but a sustained gentle withdrawal from the content of mind toward the naked intent that reaches past all content. Reflection receives this source because the Cloud describes the beginning of the inward movement — the orientation before the depth is plumbed.',
    gloss_at_secondary: {
      meditation:     'the practice of sustained dwelling in the cloud — Shell 2 as the committed meditative state',
      awakening_zone: 'the descent through the cloud of forgetting into a not-knowing that is itself love',
    },
    excerpt: 'thou findest but a darkness; and as it were a cloud of unknowing… letteth thee that thou mayest neither see Him clearly by light of understanding.',
    reference: 'The Cloud of Unknowing. Ed. James Walsh, SJ. Paulist Press, 1981.',
  },

  // ── SHELL 2: sustained departures — practices, states ────────

  {
    id: 'plotinus-enneads-vi-9-11',
    author: 'Plotinus', work: 'Enneads VI.9.11', year: 'c. 270',
    primary:   { type: 'point', coord: 'meditation' },
    placement_rationale: 'The "utterly resting" passage — the soul in sustained interior stillness prior to the final henōsis; this is the meditative state held over time (Shell 2 below) rather than the limit-event itself, which is henōsis. (Companion entry: plotinus-henosis, the same chapter at the obliteration coordinate.)',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }, { type: 'point', coord: 'BEING' }],
    resonances: ['obliteration_zone', 'BEING'],
    gloss_at_primary: 'the soul in perfect stillness — sustained interior rest as the precondition of henōsis, a rest so complete that the soul becomes, as Plotinus says, very rest itself. This is not the union-event (which belongs at the obliteration-zone) but the prolonged meditative state that makes union possible: the soul ceasing to move outward, withdrawing from Intellect, utterly resting in the approach. The Diamond\'s meditation-coordinate at Shell 2 receives this: the sustained commitment to interiority that holds without yet dissolving, the inner life in its most sustained and purified form. Enneads VI.9.11 makes two distinct position-claims and accordingly carries two glyphs in the figure — this one at meditation, and a second (plotinus-henosis) at the obliteration coordinate, where the same chapter\'s union-event lives.',
    gloss_at_secondary: {
      obliteration_zone: 'henōsis as the limit event that emerges from this sustained rest',
      BEING:             'the One toward which the ascent moves — the ground the stillness approaches',
    },
    excerpt: 'caught away, filled with God, he has in perfect stillness attained isolation… utterly resting he has become very rest.',
    reference: 'Plotinus. The Enneads VI.9.11. Trans. Stephen MacKenna. London: Faber & Faber, 1956.',
  },

  {
    id: 'kenosis-philippians',
    author: 'Paul / Maximus the Confessor', work: 'Philippians 2:5–11; Ambigua 41', year: 'c. 60 / c. 630',
    primary:   { type: 'point', coord: 'excitement' },
    placement_rationale: 'Kenōsis as active self-emptying — not the completed void but the energetic letting-go; "he emptied himself" is an act, a movement. Shell 2 upward (excitement as activated being) captures this dynamic movement better than the static limit-zone.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['obliteration_zone', 'awakening_zone'],
    gloss_at_primary: 'kenōsis as active self-emptying — the dynamic movement of letting-go as activated being, not the void already achieved but the motion of voiding still in progress. The Philippians hymn describes Christ not as already emptied but as one who actively empties himself: the verb is aorist, the act is decisive, the movement is vigorous. Shell 2 upward — excitement as energized departure from BEING toward the limit — captures this: the self in full motion toward its own relinquishment, not yet annihilated but irrevocably in the act of giving way.',
    gloss_at_secondary: {
      obliteration_zone: 'kenōsis completed as the upper piercing — the emptying that reaches its limit',
      awakening_zone:    'theōsis as the lower correlate — the human absorbed into the divine',
    },
    excerpt: 'He emptied himself [ἐκένωσεν], taking the form of a servant… God became whole man while remaining whole God.',
    reference: 'Philippians 2:5–11 (NRSV); Maximus, Ambigua 41. Trans. Constas. Harvard UP, 2014.',
  },

  // ── SHELL 3: concentrated states approaching the limit ────────

  {
    id: 'jung-aion',
    author: 'C.G. Jung', work: 'Aion', year: '1951',
    primary:   { type: 'point', coord: 'intensity' },
    placement_rationale: 'Individuation toward the supraordinate Self — a concentrated movement approaching the limit of the psyche without dissolving into it. Shell 3 intensity captures this bounded culmination that stops short of the piercing.',
    secondary: [{ type: 'point', coord: 'insight' }, { type: 'point', coord: 'BEING' }],
    resonances: ['insight', 'BEING'],
    gloss_at_primary: 'individuation as concentrated ascent toward the Self — the psyche\'s approach to its own limit without dissolution; Jung\'s Aion maps the development of the Self through the assimilation of shadow, anima/animus, and the self-symbol into a coherent supraordinate centre. This is not the breakthrough but the sustained concentration that precedes it — the opus approaching its crystalline completion. At Shell 3 upward, intensity names precisely this: the psyche\'s maximal concentration in the approach to the upper limit, form still holding yet tautened to its utmost.',
    gloss_at_secondary: {
      insight:  'the descent into unconscious material as the necessary counter-movement through depth',
      BEING:    'the Self as the centre that organises ascent and descent',
    },
    excerpt: 'The descent into the unconscious… and the ascent toward the Self.',
    reference: 'Jung, C.G. Aion. CW 9/II. Trans. Hull. Princeton: PUP, 1959, esp. Ch. 14.',
  },

  {
    id: 'cusa-coincidentia',
    author: 'Nicholas of Cusa', work: 'De Docta Ignorantia I.4 (coincidentia oppositorum)', year: '1440',
    primary:   { type: 'point', coord: 'intensity' },
    placement_rationale: 'Coincidentia oppositorum names the zone where extremes meet — concentrated being approaching its limit where maximum and minimum coincide. This is the theoretical articulation of what intensity points toward; not the piercing itself.',
    secondary: [{ type: 'region', name: 'tau_axis' }, { type: 'point', coord: 'obliteration_zone' }],
    resonances: ['obliteration_zone'],
    gloss_at_primary: 'coincidentia oppositorum at the concentrated limit — where maximum and minimum, birth and death, coincide without dissolving; Cusa\'s formula belongs at intensity because it articulates the theoretical peak of what Shell 3 points toward: the zone where opposites are not yet identical (that would be BEING) but so proximate that the intellect can no longer hold them apart. The Diamond maps this as an extreme of approach — form giving way at the inner edge of the sphere, the structure still present but strained to the point where coincidence becomes thinkable.',
    gloss_at_secondary: {
      tau_axis:          'the speculative passage from contradiction to coincidence as the τ deformation itself',
      obliteration_zone: 'the upper-limit event that the coincidence of opposites approaches but does not name',
    },
    excerpt: 'a kind of "coincidence of opposites" that is a figure of how we may think beyond limited things toward the transcendent One.',
    reference: 'Nicholas of Cusa. De Docta Ignorantia. Trans. Hopkins. Banning Press, 1985. I.4–5.',
  },

  {
    id: 'vajra-dorje',
    author: 'Tibetan Buddhist tradition', work: 'Vajra / Dorje symbolism', year: 'classical',
    primary:   { type: 'point', coord: 'intensity' },
    placement_rationale: 'The thunderbolt-diamond as symbol concentrates indestructibility, illumination, and cutting force in one form — this is concentrated being approaching its limit (Shell 3 upper), the power before its release.',
    secondary: [{ type: 'point', coord: 'BEING' }, { type: 'point', coord: 'obliteration_zone' }],
    resonances: ['BEING', 'obliteration_zone'],
    gloss_at_primary: 'thunderbolt-and-diamond at Shell 3 intensity — indestructible concentrated being before the strike; the vajra is not yet in motion but already charged, its double nature — the diamond\'s absolute hardness and the thunderbolt\'s annihilating force — held in suspension. This dual quality maps exactly to intensity: the terminal concentration that has not yet discharged. The Tibetan tradition\'s elaboration of dorje symbolism belongs here because it names a state of readiness, not an act — the full gathering of being at the last shell before the limit is crossed.',
    gloss_at_secondary: {
      BEING:             'the indestructible mind as the centre that directly sees emptiness',
      obliteration_zone: 'the vajra\'s strike as the moment that pierces the sphere',
    },
    excerpt: 'The vajra (dorje in Tibetan) is simultaneously thunderbolt and diamond. It is the most powerful and durable of all things.',
    reference: 'Powers, John. Introduction to Tibetan Buddhism. Snow Lion, 2007.',
  },

  {
    id: 'jung-psychology-alchemy',
    author: 'C.G. Jung', work: 'Psychology and Alchemy', year: '1944',
    primary:   { type: 'point', coord: 'intensity' },
    placement_rationale: 'The lapis philosophorum as the crystalline Self — individuation\'s end-product as concentrated indestructible being. The opus moves toward intensity at Shell 3; the lapis is not BEING-itself but the crystallized approach to it.',
    secondary: [{ type: 'point', coord: 'BEING' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['BEING', 'awakening_zone'],
    gloss_at_primary: 'the lapis philosophorum as the crystalline Self — concentrated indestructible being as individuation\'s end; Jung\'s discovery that the alchemists were projecting the individuation process onto chemical matter means that their stone — imperishable, self-contained, capable of transmuting everything it touches — is the psyche\'s own goal seen in material form. Intensity at Shell 3 names the approach to this crystallization: the opus not yet concluded but its product already latent in the concentrated work, form not yet dissolved but luminous at its own inner edge.',
    gloss_at_secondary: {
      BEING:          'the individuated Self as the indestructible centre at the end of the opus',
      awakening_zone: 'the conjunction as the transformative moment in the alchemical process',
    },
    excerpt: 'the alchemist projected what I have called the process of individuation into the phenomena of chemical change.',
    reference: 'Jung, C.G. Psychology and Alchemy. CW 12. Trans. Hull. PUP, 1953 [1944].',
  },

  // ── APEX / LIMIT EVENTS ──────────────────────────────────────
  // Sources about the piercing events: the upper and lower
  // sphere-boundaries where ordinary structure ends.
  // ─────────────────────────────────────────────────────────────

  {
    id: 'buddhist-bodhi',
    author: 'Pāli Canon', work: 'Sāmaññaphala Sutta (DN 2) and parallels', year: 'classical',
    primary:   { type: 'point', coord: 'awakening_zone' },
    placement_rationale: 'Sambodhi as the cessation of effluents — the Pāli Canon\'s canonical name for the lower piercing. This is the limit-event of clarity, not the ongoing practice (meditation) nor the identity already present (BEING).',
    secondary: [{ type: 'point', coord: 'insight' }],
    resonances: ['insight'],
    gloss_at_primary: 'sambodhi as the cessation of effluents — the lower piercing in its earliest canonical form; the Pāli Canon is precise: awakening is not a state added to mind but the ending of what clouded it — the āsavā, the fermentations that leak from moment to moment and sustain the running-on of saṃsāra. When they cease, there is nothing remaining to announce the fact except the clarity itself. The awakening_zone marks this lower-piercing event: not the deepening path of insight that precedes it but the rupture at which the effluents are seen through and the running-on stops.',
    gloss_at_secondary: {
      insight: 'the depth of insight that sees through to the ending — the last station before the break',
    },
    excerpt: '"Birth is ended, the holy life fulfilled, the task done. There is nothing further for the sake of this world."',
    reference: 'Ñāṇamoli & Bodhi, trans. Middle Length Discourses. Wisdom Publications, 1995.',
  },

  {
    id: 'sufi-fana-baqa',
    author: 'al-Hallāj / Ibn ʿArabī / Rūmī', work: 'Kitāb al-Ṭawāsīn / Fuṣūṣ al-Ḥikam / Mathnawī', year: 'c. 922 / 1229 / 1273',
    primary:   { type: 'point', coord: 'obliteration_zone' },
    placement_rationale: 'Fanāʾ — annihilation in the Real — is the Sufi term for the upper piercing: the self dissolved into God without remainder. Unlike Zen\'s great-death (which resolves as BEING), the Sufi emphasis is on the annihilative event itself.',
    secondary: [{ type: 'point', coord: 'awakening_zone' }, { type: 'point', coord: 'love' }],
    resonances: ['awakening_zone', 'love'],
    gloss_at_primary: 'fanāʾ: annihilation in the Real — the upper piercing in its Sufi articulation, where the self is not transformed but extinguished, so that what remains speaks as the Real and not as a self that has achieved a relationship with the Real. Al-Hallāj\'s ana\'l-Haqq — "I am the Real" — is not a metaphysical assertion but the utterance from the site where the asserting subject has been consumed. The Diamond\'s obliteration_zone names this event: the limit where individual form gives way entirely, not as loss but as the removal of what was always an obstacle.',
    gloss_at_secondary: {
      awakening_zone: 'baqāʾ: subsistence in God after annihilation — the return that is no longer the ordinary self',
      love:           'the love at the rim that is, all along, the love of the Real for itself',
    },
    excerpt: '"Other than He, nothing else existed. Hallaj had been annihilated; so those were the words of the Real."',
    reference: 'Ibn ʿArabī, Fuṣūṣ al-Ḥikam. Trans. R.W.J. Austin. SPCK, 1980. Rūmī, Mathnawī. Trans. Nicholson, 1925–1940.',
  },

  {
    id: 'plotinus-henosis',
    author: 'Plotinus', work: 'Enneads VI.9.11 (henōsis)', year: 'c. 270',
    primary:   { type: 'point', coord: 'obliteration_zone' },
    placement_rationale: 'Henōsis as the soul\'s ascent beyond Intellect — passage out of the structured cosmos into the One. Distinct from VI.9.8\'s identity claim and from VI.9.11\'s sustained-rest claim: this entry isolates the limit-event of union, not the structural identity nor the meditative approach. (Companion entry: plotinus-enneads-vi-9-11, the sustained-rest passage from the same chapter at the meditation coordinate.)',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['BEING'],
    gloss_at_primary: 'henōsis: the soul\'s ascent beyond Intellect — passage out of the structured cosmos into the One; unlike the sustained rest of VI.9.11 (which belongs at meditation), this entry names the event of union itself — the moment when the soul, having been utterly still, is as if carried away, and the distance between the ascending soul and the One simply ceases to obtain. Plotinus describes this not as loss but as the most alive moment possible — the self that disappears was only ever a contracted version of what the One already is. The obliteration_zone marks the upper piercing; henōsis is its Neoplatonic name.',
    gloss_at_secondary: {
      BEING: 'the One toward which the ascent moves and from which it never separated',
    },
    excerpt: 'he himself was not there… he was as if carried away or possessed by a god, in a quiet solitude and a state of calm.',
    reference: 'Plotinus. Enneads VI.9.11. Trans. Sheehan.',
  },

  {
    id: 'bonaventure-itinerarium',
    author: 'Bonaventure', work: 'Itinerarium Mentis in Deum', year: '1259',
    primary:   { type: 'point', coord: 'obliteration_zone' },
    placement_rationale: 'The seventh stage as ecstatic excessus mentis — beyond concept, into fire; this is the limit-event that exhausts the structured mind. The upper piercing as the explicit culmination of a mapped ascent.',
    secondary: [{ type: 'point', coord: 'intensity' }],
    resonances: ['intensity'],
    gloss_at_primary: 'the seventh stage as ecstatic excessus mentis — passage into divine darkness beyond concept; Bonaventure\'s Itinerarium is a rigorously mapped ascent through six stages of the mind\'s journey into God, and the seventh is the place where the map ends and fire begins. It is explicitly beyond understanding — not the limit of a finite intellect but the point where intellect as such gives way to a desire that carries the soul past every cognitive form. The obliteration_zone names this upper limit: the piercing that cannot be described from within the structure that precedes it.',
    gloss_at_secondary: {
      intensity: 'the sixth stage as the highest the structured mind can reach before the break',
    },
    excerpt: 'desire, not understanding… darkness, not clarity; not light but the fire that totally inflames and carries us into God.',
    reference: 'Bonaventure. Itinerarium Mentis in Deum. Trans. Oleg Bychkov.',
  },

  {
    id: 'eckhart-durchbruch',
    author: 'Meister Eckhart', work: 'Sermon 52 ("Beati pauperes spiritu") and parallels', year: 'c. 1300–1327',
    primary:   { type: 'point', coord: 'awakening_zone' },
    placement_rationale: 'Durchbruch — the soul breaks THROUGH God into the Gottheit beyond name — is the lower piercing as understood in the apophatic tradition: clarity achieved by radical downward negation, not upward annihilation.',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['BEING'],
    gloss_at_primary: 'Durchbruch — the soul breaks through God into the Gottheit beyond name; clarity by radical poverty of spirit, stripping even the will-to-God until nothing remains but the bare ground the soul shares with the divine. Eckhart\'s move is directed downward through negation rather than upward through ascent: the awakening_zone in the Diamond receives this lower-piercing logic, where radical detachment from every cognitive and volitional content opens onto the groundless ground. The poverty of spirit is not an attainment; it is the removal of every obstruction to what was always already the case.',
    gloss_at_secondary: {
      BEING: 'the ground of the soul as the ground of God — identical in the piercing moment',
    },
    excerpt: 'We beg God to rid us of God, so that we may grasp and eternally enjoy the truth where the highest angel and the fly and the soul are equal.',
    reference: 'Eckhart, Meister. Complete Mystical Works. Trans. Walshe/McGinn. Crossroad, 2009.',
  },

  {
    id: 'bardo-clear-light',
    author: 'Bardo Thödol', work: 'The Tibetan Book of the Dead — clear light at the moment of death', year: '14th c.',
    primary:   { type: 'point', coord: 'awakening_zone' },
    placement_rationale: 'The clear-light recognition at the moment of dying is awakening occasioned by the death-event — not the upper pole itself but the lower-piercing recognition the upper pole triggers. The Bardo text\'s primary gift is this recognition. (Companion entry: bardo-thodol, the work as a whole at the death coordinate; the prose treats the text\'s structural occasion and the chikhai-bardo recognition as two distinct position-claims.)',
    secondary: [{ type: 'point', coord: 'death' }, { type: 'point', coord: 'obliteration_zone' }],
    resonances: ['death', 'obliteration_zone'],
    gloss_at_primary: 'the clear-light recognition at death — awakening occasioned by dying; the lower piercing that the upper pole triggers, a recognition that the dying person may achieve in the moment the breath stops if they can remain present and unafraid. The Bardo text\'s genius is to map this: the clear light is always already the nature of mind, but in ordinary life it is never naked enough to be seen. Death strips every overlay, and for one who has prepared, the stripping is itself the liberation. Awakening_zone receives this because the event is clarity achieved, not destruction endured.',
    gloss_at_secondary: {
      death:             'the moment of cessation that occasions the recognition',
      obliteration_zone: 'the same recognition as obliteration when met without flinching',
    },
    excerpt: 'When the breath has stopped, the clear light of reality arises in the mind of the dying person.',
    reference: 'Bardo Thödol. Trans. Gyurme Dorje. Penguin Classics, 2005.',
  },

  {
    id: 'nagarjuna-mmk-25',
    author: 'Nāgārjuna', work: 'Mūlamadhyamakakārikā, Ch. 25', year: 'c. 200',
    primary:   { type: 'point', coord: 'awakening_zone' },
    placement_rationale: '"Samsāra and nirvāṇa not differing" — the Mādhyamaka formula for awakening as a cognitive shift rather than a departure; the lower piercing that sees through all positions, not the identity-claim itself (which would be BEING).',
    secondary: [{ type: 'point', coord: 'BEING' }, { type: 'point', coord: 'insight' }],
    resonances: ['BEING', 'insight'],
    gloss_at_primary: 'samsāra and nirvāṇa not differing — the Mādhyamaka formula for the lower piercing that sees through all positions; Nāgārjuna does not assert that they are one (which would be a substantialist claim) but that there is not the slightest difference between them — a precise logical move that collapses the opposition without creating a new synthesis. Awakening, on this analysis, is not a departure from saṃsāra but the shift in cognitive posture that ceases to superimpose inherent existence on it. The Diamond\'s awakening_zone names this event: the piercing that is a change of view, not a change of location.',
    gloss_at_secondary: {
      BEING:   'śūnyatā as the Mādhyamaka name for being-itself — emptiness not as void but as groundless ground',
      insight: 'the penetrating clarity that sees the lack of inherent existence — the last station before awakening',
    },
    excerpt: 'There is not the slightest difference between cyclic existence [saṃsāra] and nirvāṇa.',
    reference: 'Nāgārjuna. Mūlamadhyamakakārikā. Trans. Jay Garfield. OUP, 1995.',
  },

  {
    id: 'eckhart-gottheit',
    author: 'Meister Eckhart', work: 'Sermons (the Gottheit beyond God)', year: 'c. 1300–1327',
    primary:   { type: 'region', name: 'interstitial' },
    placement_rationale: 'The Gottheit as Abgrund — the formless ground beneath the personal God; this entry isolates the place rather than the act, which belongs to the lower piercing. (Companion entry: eckhart-durchbruch, the breakthrough-act at the awakening coordinate; the prose, in interstitial, treats the act and the place as deliberately split across two coordinates.)',
    secondary: [{ type: 'point', coord: 'awakening_zone' }, { type: 'point', coord: 'BEING' }],
    resonances: ['awakening_zone', 'BEING'],
    gloss_at_primary: 'the Gottheit as Abgrund — the formless abyss as place rather than passage; where the personal God still has a name, the Gottheit has none — it is the divine before divinity is a determination, the ground that underlies even the ground. Eckhart\'s term Abgrund — groundlessness, the abyss of ground — is the most precise Western name for what the lower piercing opens onto: not a new territory but the removal of every floor, so that what remains is what was always already the case beneath every conceptual floor one had previously rested on. The Diamond places the act of breakthrough (Durchbruch) at awakening and the place broken into (Gottheit) in the interstitial, on the principle that the act and the place it enters are different position-claims.',
    gloss_at_secondary: {
      awakening_zone: 'the lower piercing whose breakthrough opens onto this ground — the act whose terminus is here',
      BEING:          'a ground that has neither name nor form — yet is the unspoken presupposition of all presencing',
    },
    excerpt: 'a ground that has neither name nor form.',
    reference: 'Eckhart, Meister. Complete Mystical Works. Trans. Walshe/McGinn. Crossroad, 2009.',
  },

  // ── UPPER / LOWER POLES ───────────────────────────────────────

  {
    id: 'bardo-thodol',
    author: 'Karma Lingpa (revealer) / Padmasambhava (attrib.)', work: 'Bardo Thödol', year: '14th c.',
    primary:   { type: 'point', coord: 'death' },
    placement_rationale: 'The Bardo Thödol\'s central occasion is physical dying — the chikhai bardo opens at the very moment of death. The text as a whole is guidance through the actual upper pole. (Companion entry: bardo-clear-light, the chikhai-bardo recognition at the awakening coordinate; the work\'s structural occasion is death, but the recognition the text instructs into is awakening.)',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }, { type: 'point', coord: 'birth' }],
    resonances: ['birth', 'obliteration_zone'],
    gloss_at_primary: 'the chikhai bardo: clear light arising at the very moment of dying — guidance through the upper pole; the Bardo Thödol is addressed to the dead person directly, as if the text itself were the voice accompanying a passage no other voice can accompany. The chikhai bardo is the primary moment: all the subsequent bardo stages are, in a sense, what happens when this first recognition fails. As the whole text coheres around the death-event, this source belongs at the death-coordinate — the upper pole as the occasion, and the clear-light instruction as its most exacting articulation.',
    gloss_at_secondary: {
      obliteration_zone: 'the recognition of clear light as the upper piercing — annihilation that is also illumination',
      birth:             'the closing of the cycle — descent back to embodiment as the lower limit',
    },
    excerpt: 'The first phase is the chikhai bardo… featuring the experience of the "clear light of reality."',
    reference: 'Bardo Thödol. Trans. Gyurme Dorje. Ed. Coleman & Jinpa. Penguin Classics, 2005.',
  },

  {
    id: 'heidegger-sein-zum-tode',
    author: 'Martin Heidegger', work: 'Being and Time, §§53–60 (Sein-zum-Tode)', year: '1927',
    primary:   { type: 'point', coord: 'death' },
    placement_rationale: 'Sein-zum-Tode is Heidegger\'s analysis of death as the structural upper pole — ownmost, non-relational, certain. This is not the BEING claim of §41 but the pole-analysis of §§53–60.',
    secondary: [{ type: 'point', coord: 'intensity' }],
    resonances: ['BEING', 'intensity'],
    gloss_at_primary: 'death as ownmost, non-relational, certain — the structural upper pole as the condition of authentic disclosure; Heidegger\'s analysis in Division II distinguishes itself from every empirical or theological account of dying by insisting that death is not a future event the self will undergo but a structural feature of existence now — the possibility that is always already mine and that cannot be delegated. It is this non-relational character that makes death the pole it is in the Diamond: not a destination but the horizon that individuates, isolating Dasein in its ownmost possibility and thereby opening it to authentic selfhood.',
    gloss_at_secondary: {
      intensity: 'anticipatory resoluteness as concentrated being-toward-death — the approach before crossing',
    },
    excerpt: 'Death is Dasein\'s ownmost possibility — non-relational, certain, and as such indefinite, not to be outstripped.',
    reference: 'Heidegger, Martin. Being and Time, Division II, §§53–60. Trans. Macquarrie & Robinson.',
  },

  {
    id: 'heidegger-poetry-language',
    author: 'Martin Heidegger', work: 'Poetry, Language, Thought', year: '1971',
    primary:   { type: 'point', coord: 'death' },
    placement_rationale: '"Death is the shrine of Nothing" — the upper pole as the ontological clearing where Nothing and Being nearly coincide. This is an analysis of the death-limit as a site, distinct from §41\'s identity claim.',
    secondary: [{ type: 'point', coord: 'BEING' }, { type: 'point', coord: 'obliteration_zone' }],
    resonances: ['BEING', 'obliteration_zone'],
    gloss_at_primary: 'death as the shrine of Nothing in which BEING presences — the upper limit as ontological clearing; Heidegger\'s poetic essay moves beyond the structural analysis of Sein-zum-Tode to a meditative naming: death is not the absence of being but the site — the shrine — where being\'s intimacy with Nothing is most exposed. The Diamond\'s death-coordinate names this: the upper pole not as terminus but as the zone of maximal ontological transparency, where every covering that ordinarily mediates between Dasein and being-itself has been stripped away.',
    gloss_at_secondary: {
      BEING:             'presencing-in-Nothing as another name for the centre that holds without grasping',
      obliteration_zone: 'the mortal opening figured as a passage rather than terminus',
    },
    excerpt: 'Death is the shrine of Nothing… As the shrine of Nothing, death harbors within itself the presencing of Being.',
    reference: 'Heidegger, Martin. Poetry, Language, Thought. Trans. Albert Hofstadter. Harper & Row, 1971.',
  },

  {
    id: 'blanchot-space-literature',
    author: 'Maurice Blanchot', work: 'The Space of Literature', year: '1955',
    primary:   { type: 'point', coord: 'death' },
    placement_rationale: 'The "impossible death" — the dying that no "I" can undergo — articulates the upper pole as that which escapes ownership entirely. A literary-philosophical analysis of the death-limit as structural.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }],
    resonances: ['obliteration_zone'],
    gloss_at_primary: 'death as the impossible toward which "I" cannot go — the upper limit that escapes ownership and completes nothing; Blanchot\'s analysis is the precise literary-philosophical complement to Heidegger\'s ownmost-possibility: where Heidegger insists death is mine, Blanchot insists it is precisely not — the impersonal neuter, the dying that cannot be first-person. Both analyses belong at the death-coordinate but from opposite directions, and Blanchot\'s version is the more vertiginous: the upper pole as the zone where the first-person dissolves without a dissolution it can claim.',
    gloss_at_secondary: {
      obliteration_zone: 'the impersonal dying that no subject completes — the upper piercing read as anonymity',
    },
    excerpt: 'I have no relationship with [death]… in it I do not die, I have fallen from the power to die. In it they die.',
    reference: 'Blanchot, Maurice. The Space of Literature. Trans. Ann Smock. U Nebraska P, 1982 [1955].',
  },

  {
    id: 'teilhard-omega',
    author: 'Pierre Teilhard de Chardin', work: 'The Phenomenon of Man', year: '1955',
    primary:   { type: 'point', coord: 'death' },
    placement_rationale: 'The Omega Point is Teilhard\'s name for the absolute terminus of evolution — the eschatological convergence of all complexity. This is the upper pole as eschatological limit, structurally equivalent to death.',
    secondary: [{ type: 'point', coord: 'intensity' }, { type: 'point', coord: 'birth' }],
    resonances: ['intensity'],
    gloss_at_primary: 'evolution culminating in the Omega Point — the absolute upper limit as eschatological convergence of all complexity; Teilhard\'s model is neither mystical nor merely biological but both at once: the universe\'s increasing complexification is simultaneously a movement toward consciousness and toward the divine. The Omega Point is structurally equivalent to the death-coordinate in the Diamond because it is the pole toward which the entire vertical axis tends — not a static terminus but the final attractor, pulling every thread of becoming toward its own eventual coincidence with the One.',
    gloss_at_secondary: {
      intensity: 'the noosphere as the concentrated penultimate — approaching the limit before it is crossed',
      birth:     'the cosmological beginning that the Omega Point retrospectively illuminates',
    },
    excerpt: 'Layers of consciousness will converge in Omega, fusing and consuming them in itself.',
    reference: 'Teilhard de Chardin, Pierre. The Phenomenon of Man. Trans. Bernard Wall. Collins, 1959.',
  },

  {
    id: 'plato-myth-er',
    author: 'Plato', work: 'Republic X (Myth of Er)', year: 'c. 380 BCE',
    primary:   { type: 'point', coord: 'death' },
    placement_rationale: 'Er dies and returns — the Myth is the first Western narrative of the upper pole: judgment, afterlife zones, and reincarnation all pivot on the death-event as passage.',
    secondary: [{ type: 'point', coord: 'birth' }, { type: 'point', coord: 'obliteration_zone' }],
    resonances: ['birth'],
    gloss_at_primary: 'the Myth of Er: the earliest Western architecture of what lies at the upper pole — death as passage and return; Er dies, travels through the post-mortem cosmos, sees the mechanism of metempsychosis, and is sent back to report. The myth is Plato\'s most ambitious cosmological construction — a full schema of judgment, interlude, and re-embodiment — and it places death at the pivot. The Diamond\'s death-coordinate is not a blank terminus; it has structure. Plato\'s schema is the first Western attempt to articulate that structure as a navigable geometry.',
    gloss_at_secondary: {
      birth:             'metempsychosis as return to the lower limit — souls choosing the next life',
      obliteration_zone: 'the corridor of judgment as the upper piercing before descent',
    },
    excerpt: 'All freshly dead souls travel to an unearthly junction, where they are judged and sent either up to the heavens or down into earth.',
    reference: 'Plato. Republic, Book X, 614a–621d. Trans. Grube/Reeve. Hackett, 1997.',
  },

  {
    id: 'eliade-patterns',
    author: 'Mircea Eliade', work: 'Patterns in Comparative Religion', year: '1958',
    primary:   { type: 'point', coord: 'birth' },
    placement_rationale: '"A universe comes to birth from its center" — Eliade\'s cosmogenesis formula is about the origin-event that initiates a world: the lower pole as the generative moment of becoming.',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['BEING'],
    gloss_at_primary: 'cosmogenesis: the world born from its own centre — the lower-pole event that initiates a universe; Eliade\'s comparative analysis shows that across cultures, the originary act is not creation from outside but irruption from within — a navel, a seed, a point of rupture where the undifferentiated becomes the first difference. The Diamond\'s birth-coordinate names this: not biological birth alone but the cosmological event of which biological birth is the individual echo — the lower limit where the vertical axis begins to be something rather than nothing.',
    gloss_at_secondary: {
      BEING: 'the navel-centre from which the spread begins — origin as presence rather than event',
    },
    excerpt: 'A universe comes to birth from its center; it spreads out from a central point that is, as it were, its navel.',
    reference: 'Eliade, Mircea. Patterns in Comparative Religion. Trans. Rosemary Sheed. Sheed & Ward, 1958.',
  },

  // ── VERTICAL AXIS & TEMPORAL POLES ───────────────────────────

  {
    id: 'eliade-sacred-profane',
    author: 'Mircea Eliade', work: 'The Sacred and the Profane', year: '1957',
    primary:   { type: 'region', name: 'vertical_axis' },
    placement_rationale: 'Axis mundi as the cosmic pillar joining heaven, earth, and underworld — this text is genuinely about the WHOLE vertical as such, not any single station; the paradigm case for vertical_axis placement.',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['obliteration_zone', 'awakening_zone'],
    gloss_at_primary: 'axis mundi: the vertical that joins the three cosmic levels — the entire birth↔death line as sacred structure; Eliade\'s phenomenology of the sacred reveals that virtually every traditional culture posits such a pillar — the World Tree, the Sacred Mountain, the Temple at the Navel of the Earth — as the structural presupposition of orientation. Without an axis, space is homogeneous and directionless; with it, above and below, centre and periphery, sacred and profane, all become possible. The Diamond\'s vertical_axis is this axis mundi made explicit as a coordinate structure.',
    gloss_at_secondary: {
      BEING: 'the centre as the irruption that makes orientation possible at all',
    },
    excerpt: 'The three cosmic levels — earth, heaven, underworld — have been put in communication… through the image of a universal pillar, axis mundi.',
    reference: 'Eliade, Mircea. The Sacred and the Profane. Trans. Willard R. Trask. Harcourt, Brace & World, 1959.',
  },

  {
    id: 'jacobs-ladder',
    author: 'Genesis 28 / Zohar / Philo', work: 'Jacob\'s Ladder', year: 'biblical / classical',
    primary:   { type: 'region', name: 'vertical_axis' },
    placement_rationale: 'The ladder resting on earth with its top reaching to heaven — not a single station but the whole vertical arc from the chthonic to the divine; the axis traversal as scriptural image.',
    secondary: [{ type: 'point', coord: 'obliteration_zone' }, { type: 'point', coord: 'awakening_zone' }],
    resonances: ['obliteration_zone', 'awakening_zone'],
    gloss_at_primary: 'the ladder as the whole vertical — from earth (awakening-pole) to heaven (obliteration-pole) in one structure; Jacob\'s dream is not a vision of ascent but of bidirectional traversal — angels ascend and descend simultaneously, which means the axis is not a one-way passage but a living connection between registers. The Zoharic and Philonic commentaries elaborate this: the ladder is the Torah, the logos, the divine measure that permits traffic between heaven and earth. In the Diamond, Jacob\'s ladder is the vertical_axis\'s earliest scriptural name — the image in which both poles and all their intermediate stations are already present.',
    gloss_at_secondary: {
      obliteration_zone: 'angels ascending: the upper pole reached at the ladder\'s highest rung',
      awakening_zone:    'angels descending: the lower pole where heaven touches ground',
    },
    excerpt: 'He had a dream in which he saw a stairway resting on the earth, with its top reaching to heaven.',
    reference: 'Genesis 28:10–19; Zohar I, 149b–150a (Vayetze); Philo, De Somniis I, 133–142.',
  },

  {
    id: 'dante-commedia',
    author: 'Dante Alighieri', work: 'La Divina Commedia', year: '1308–1320',
    primary:   { type: 'region', name: 'vertical_axis' },
    placement_rationale: 'The Commedia traverses the WHOLE vertical axis: Inferno (nadir) → Purgatorio (middle) → Paradiso (apex) → Empyrean (limit). No single station captures it; this is the vertical_axis par excellence.',
    secondary: [{ type: 'point', coord: 'death' }, { type: 'point', coord: 'birth' }],
    resonances: ['death', 'birth'],
    gloss_at_primary: 'the Commedia as the vertical_axis in motion — the most complete literary mapping of the birth↔death line; Dante\'s three canticles move through the entire Diamond structure in sequence: the descent into the pit of contraction and constriction, the long ascent through purgatorial return, and the expansion through the celestial spheres to the Empyrean where form gives way entirely to light. No single coordinate can hold this poem; it requires the full vertical_axis as its placement because it is the only work that has traversed every station and turned each one into verse.',
    gloss_at_secondary: {
      death:  'the journey\'s pretext and horizon: only the dead can ascend the cosmography',
      birth:  'the Primum Mobile as origin; the birth of light that ends the Paradiso',
    },
    excerpt: 'In the middle of the journey of our life I came to myself within a dark wood where the straight way was lost.',
    reference: 'Dante Alighieri. The Divine Comedy. Trans. Charles S. Singleton. 3 vols. PUP, 1970–1975.',
  },

  {
    id: 'heraclitus-fragment-60',
    author: 'Heraclitus', work: 'Fragment B60 (DK)', year: 'c. 500 BCE',
    primary:   { type: 'region', name: 'vertical_axis' },
    placement_rationale: '"The way up and the way down are one and the same" — the most economical formula of the vertical_axis: ascent and descent are a single axis, not two opposed movements.',
    secondary: [{ type: 'region', name: 'tau_axis' }],
    resonances: ['BEING'],
    gloss_at_primary: '"the way up and way down are one and the same" — the vertical_axis as a single movement, not two opposed ones; Heraclitus\'s fragment is the most economical philosophical formula for what the Diamond\'s vertical_axis depicts: not two trajectories running in opposite directions but a single axis whose upward and downward readings are the same path traversed differently. The fragment belongs at the full axis rather than at any single point because its claim is structural — about the character of the axis itself, not about any station along it, and not about the logos that pervades it (which DK 50 handles).',
    gloss_at_secondary: {
      tau_axis: 'the single path along which ascent and descent collapse into the same passage',
    },
    excerpt: 'The way upward and downward are one and the same. (Ἁνω κάτω μία καὶ ὡυτή)',
    reference: 'Heraclitus. Fragment B60 (DK). In Kirk, Raven, Schofield. CUP, 1983.',
  },

  {
    id: 'foucault-order-things',
    author: 'Michel Foucault', work: 'The Order of Things', year: '1966',
    primary:   { type: 'point', coord: 'past' },
    placement_rationale: 'The Order of Things maps the historical succession of epistemes — the unthought as an artefact of past configurations. The book\'s entire argument concerns how knowledge was structured in the past.',
    secondary: [{ type: 'point', coord: 'insight' }],
    resonances: ['insight'],
    gloss_at_primary: 'epistemic ruptures in history — the unthought as the blind spot left by past configurations of knowledge; Foucault\'s archaeology does not reconstruct what people thought but maps the unconscious rules that made certain thoughts possible and others unthinkable. The past-coordinate in the Diamond is the register of sediment — what has already been shaped, what has already closed off — and The Order of Things is its most rigorous philosophical analysis: the past not as continuous heritage but as the invisible constraint that each episteme exerts on those living within it.',
    gloss_at_secondary: {
      insight: 'the archaeology of knowledge as penetrating clarity about how past arrangements limited vision',
    },
    excerpt: '[the cogito] can only think its way towards the unthought that escapes it.',
    reference: 'Foucault, Michel. The Order of Things. Trans. Alan Sheridan. Vintage, 1970 [1966].',
  },

  {
    id: 'corbin-mundus-imaginalis',
    author: 'Henry Corbin', work: 'Spiritual Body and Celestial Earth', year: '1977',
    primary:   { type: 'point', coord: 'future' },
    placement_rationale: 'The mundus imaginalis as median world — forms that are real without being empirical; Corbin\'s imaginal is prospective and anticipatory, orienting the soul toward unrealised form: the future pole.',
    secondary: [{ type: 'point', coord: 'desire' }],
    resonances: ['desire'],
    gloss_at_primary: 'mundus imaginalis as the forward-oriented median world — forms not yet realised, anticipating the future; Corbin\'s imaginal realm is not fantasy but a real intermediate zone between the sensory and the purely intelligible, inhabited by forms that exist in their own right and that orient the soul toward what it has not yet become. The future-coordinate in the Diamond is not simply chronological ahead but the pull of unrealised form — the attractor that gives the present its directionality. The mundus imaginalis is the philosophical cartography of that pull: the forward-facing median world through which not-yet-realised being presses into the present.',
    gloss_at_secondary: {
      desire: 'the imaginal as the zone of desire-oriented form — wanting toward unrealised possibility',
    },
    excerpt: 'The mundus imaginalis is the link in whose absence the schema of the worlds is put out of joint… median and mediating.',
    reference: 'Corbin, Henry. Spiritual Body and Celestial Earth. Trans. Nancy Pearson. PUP, 1977.',
  },

  // ── AFFECT AXIS ───────────────────────────────────────────────

  {
    id: 'bhavacakra',
    author: 'Tibetan / Indian Buddhist iconography', work: 'Bhavacakra (Wheel of Becoming)', year: 'classical',
    primary:   { type: 'region', name: 'affect_axis' },
    placement_rationale: 'The three poisons (attachment/aversion/ignorance) at the hub and twelve nidānas at the rim map the entire affective structure from hate to love — genuinely about the affect spectrum as a whole.',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['hate', 'love'],
    gloss_at_primary: 'the Wheel of Becoming as the full affect_axis: hub of poisons spinning out to the rim of saṃsāric affect; the Bhavacakra is one of the most complete Buddhist cosmograms — the three root poisons at the centre generate the six realms of existence at the rim, with the twelve nidānas linking cause to condition at each spoke. What it maps is the full spectrum from the contracted centre of aversion-attachment-ignorance to the outer extreme of every affect\'s intensified expression. The Diamond\'s affect_axis names this horizontal plane of the model; the Bhavacakra is its iconographic archetype.',
    gloss_at_secondary: {
      BEING: 'the hub of ignorance/attachment/aversion as the inverted shadow of the centre',
    },
    excerpt: 'The three inner circles show that the three poisons of ignorance, attachment, and aversion give rise to positive and negative actions.',
    reference: 'Gethin, Rupert. The Foundations of Buddhism. Oxford: OUP, 1998, Ch. 5.',
  },

  {
    id: 'spinoza-ethics-iii',
    author: 'Baruch Spinoza', work: 'Ethics, Part III (Affects)', year: '1677',
    primary:   { type: 'region', name: 'affect_axis' },
    placement_rationale: 'Ethics Part III maps the entire affective spectrum with geometric rigor — joy/sadness, love/hate, desire/fear, and all their derivations. The most complete philosophical mapping of the affect_axis as a whole.',
    secondary: [{ type: 'point', coord: 'love' }, { type: 'point', coord: 'hate' }],
    resonances: ['love', 'hate'],
    gloss_at_primary: 'joy and sadness as transitions in perfection — the entire affect_axis mapped geometrically from hate to love; Spinoza\'s Ethics Part III derives the whole affective life of the human being from three primitive affects — desire, joy, sadness — as rigorously as a geometer derives theorems from axioms. Love and hate are not primaries but derivatives: love is joy with a cause, hate is sadness with a cause. The Diamond\'s affect_axis receives the Ethics because its entire architecture is the same geometry the Diamond makes spatial: the spectrum of increase and decrease in the power of existing, running from the rim of hate to the rim of love.',
    gloss_at_secondary: {
      love: 'joy at the rim: maximal increase in conatus toward the loved object',
      hate: 'sadness at the rim: maximal decrease in conatus toward the hated object',
    },
    excerpt: 'Joy is man\'s transition from a lesser to a greater perfection. Sadness is man\'s transition from a greater to a lesser perfection.',
    reference: 'Spinoza, Benedict de. Ethics. Trans. Jonathan Bennett. Early Modern Texts, 2007.',
  },

  {
    id: 'brahmaviharas',
    author: 'Nyanaponika Thera (and the Pāli Canon)', work: 'The Four Sublime States (brahmavihārās)', year: '1958 / classical',
    primary:   { type: 'point', coord: 'love' },
    placement_rationale: 'The brahmavihārās culminate in mettā (loving-kindness) radiated without limit — cultivated love expanded to the sphere equator. The positive affective limit articulated as contemplative practice.',
    secondary: [{ type: 'point', coord: 'attraction' }, { type: 'point', coord: 'BEING' }],
    resonances: ['attraction', 'BEING'],
    gloss_at_primary: 'mettā as love expanded past possessiveness into the limitless — the positive affective limit as practice; the brahmavihārās are not emotions but cultivated orientations — mettā (loving-kindness), karuṇā (compassion), muditā (sympathetic joy), and upekkhā (equanimity) — each expanding the circle of regard until no being is excluded. The Diamond\'s love-coordinate names the outer positive rim of the affect axis: not the sentiment of liking but the radical unconstriction of the heart that the brahmavihārā practice reaches when all boundaries have been dissolved and the radiation of goodwill is, as the texts say, measureless.',
    gloss_at_secondary: {
      attraction: 'the inner-shell orientation-toward from which mettā begins',
      BEING:      'upekkhā: equanimity as the centre into which the four brahmavihārās collapse',
    },
    excerpt: 'loving-kindness (mettā), compassion (karuṇā), sympathetic joy (muditā), and equanimity (upekkhā).',
    reference: 'Nyanaponika Thera. The Four Sublime States. BPS, 1958.',
  },

  {
    id: 'jung-mysterium',
    author: 'C.G. Jung', work: 'Mysterium Coniunctionis', year: '1956',
    primary:   { type: 'point', coord: 'love' },
    placement_rationale: 'Mysterium Coniunctionis is about the final union of opposites — the coniunctio as the alchemical resolution that must hold love and hate together. The positive affective limit is where the resolution completes.',
    secondary: [{ type: 'point', coord: 'hate' }, { type: 'point', coord: 'BEING' }],
    resonances: ['hate', 'BEING'],
    gloss_at_primary: 'enantiodromia completing as coniunctio — opposites resolved at the positive affective limit; Jung\'s Mysterium Coniunctionis is his most exhaustive work — a massive survey of alchemical symbolism in which the marriage of Sol and Luna, sulphur and mercury, King and Queen, represents the psyche\'s deepest aspiration: the union of what has been split. The love-coordinate receives this not because love is sentimental union but because it is the positive extreme that can hold its own opposite within itself — the conjunction that does not suppress the tension but lives from it.',
    gloss_at_secondary: {
      hate:  'the dark side of the conjunction — the equal weight of the negative that must be held',
      BEING: 'coniunctio as the centre that resolves the tension without flattening it',
    },
    excerpt: 'the affective poles… require reconciliation at a deeper level — not suppression but transcendence through the tension itself.',
    reference: 'Jung, C.G. Mysterium Coniunctionis. CW 14. Trans. Hull. PUP, 1963.',
  },

  {
    id: 'aquinas-augustine-vice',
    author: 'Augustine of Hippo / Thomas Aquinas', work: 'City of God XIV; Summa Theologiae I-II QQ. 71–84', year: 'c. 426 / c. 1274',
    primary:   { type: 'point', coord: 'hate' },
    placement_rationale: 'The seven capital vices are disordered loves, and Augustine\'s analysis culminates in wrath and envy — love fully inverted to its extreme. The negative affective limit named theologically.',
    secondary: [{ type: 'point', coord: 'love' }, { type: 'point', coord: 'aversion' }],
    resonances: ['love', 'aversion'],
    gloss_at_primary: 'capital vices as love fully inverted — wrath and envy as the negative affective limit; Augustine\'s analysis in the City of God establishes that every vice is a disordered love — not the absence of love but love misdirected, overstretched, or inverted. Aquinas systematizes this in his tract on the passions, deriving wrath and envy as the extreme contractions of the will toward its opposite. The Diamond\'s hate-coordinate names this negative rim: the place where the affective impulse has so fully reversed its orientation that every form of the original inclination has been consumed by its own negation.',
    gloss_at_secondary: {
      love:     'caritas as the theological virtue that orders all affect rightly — the equal and opposite limit',
      aversion: 'the inner-shell mode of disordered turning-away from which vice grows',
    },
    excerpt: 'the seven capital vices… arrayed around a deficiency of ordered love.',
    reference: 'Aquinas. Summa Theologiae I-II, QQ. 71–84; Augustine. City of God XIV.',
  },

  {
    id: 'stoic-pathe',
    author: 'Epictetus / Marcus Aurelius', work: 'Stoic theory of passions (pathē, eupatheiai)', year: 'c. 100 / 175',
    primary:   { type: 'point', coord: 'fear' },
    placement_rationale: 'The Stoic pathē are four: desire, fear, pleasure, pain — with fear (deilia) as the paradigmatic passion to be overcome. Fear = Shell 2 −affect, the sustained recoiling from; distinct from mere aversion (Shell 1) or hate (rim).',
    secondary: [{ type: 'point', coord: 'desire' }, { type: 'point', coord: 'aversion' }],
    resonances: ['desire', 'aversion'],
    gloss_at_primary: 'fear (deilia) as the primary pathē — the Stoic analysis of recoiling from as the paradigmatic error of judgment; the Stoics mapped four primary passions — desire, fear, pleasure, pain — as distortions of rational assent, arising when the mind falsely judges external things to be goods or evils. Fear is the pivotal one: it contracts the soul in advance of an anticipated harm that may never arrive, and it is the passion that most thoroughly undermines rational agency. The Diamond\'s fear-coordinate at Shell 2 negative names this sustained, habituated recoiling — more than aversion but not yet the full inversion that hate names.',
    gloss_at_secondary: {
      desire:   'epithumia: the positive pathē — wanting-toward as the symmetrical error',
      aversion: 'eupatheiai as the rational inner-shell correlate — healthy turning-away that is not passion',
    },
    excerpt: 'The Stoics recognized certain affective responses as entirely rational and beneficial, categorizing them as eupatheiai.',
    reference: 'Epictetus. Discourses and Selected Writings. Trans. Robert Dobbin. Penguin, 2008.',
  },

  {
    id: 'buddhist-three-poisons',
    author: 'Pāli Canon / Abhidhamma', work: 'rāga, dosa, moha (three poisons)', year: 'classical',
    primary:   { type: 'point', coord: 'aversion' },
    placement_rationale: 'The three poisons are the FIRST departures from being. Dosa (aversion/hatred) is foregrounded as the turning-away movement — aversion at Shell 1 −affect captures the first orientation away from the centre.',
    secondary: [{ type: 'point', coord: 'attraction' }, { type: 'point', coord: 'hate' }],
    resonances: ['attraction', 'hate'],
    gloss_at_primary: 'dosa as the first aversive orientation — the innermost affective turning-away that seeds saṃsāra; the three poisons are not gradations on a scale but three qualitatively distinct root movements — rāga (grasping), dosa (aversion), moha (delusion) — from which the entire wheel of conditioned existence unspools. Dosa is the negative root at Shell 1 because aversion is the first orientation-away, prior to its consolidation into fear or its inversion into hate. The Diamond places this source at the aversion-coordinate because the Abhidhamma analysis is the most precise philosophical taxonomy of the negative affect-axis\'s innermost register.',
    gloss_at_secondary: {
      attraction: 'rāga as the first attractive orientation — clinging as the equal and opposite first movement',
      hate:       'dosa intensified to its limit at the rim',
    },
    excerpt: 'The three poisons (of ignorance, attachment, and aversion) are the primary causes that keep sentient beings trapped in samsara.',
    reference: 'Bodhi, Bhikkhu. A Comprehensive Manual of Abhidhamma. BPS, 1993.',
  },

  {
    id: 'aristotle-mean',
    author: 'Aristotle', work: 'Nicomachean Ethics II.6–7 (mesotēs)', year: 'c. 335 BCE',
    primary:   { type: 'point', coord: 'attraction' },
    placement_rationale: 'The doctrine of the mean places virtue at the first positive shell: the right degree of orientation-toward (attraction) that avoids deficiency and excess. The mean is a living Shell 1 equilibrium in the attractive direction.',
    secondary: [{ type: 'point', coord: 'BEING' }],
    resonances: ['BEING'],
    gloss_at_primary: 'the mean as the inner-shell orientation-toward — the first positive departure from BEING that virtue inhabits; Aristotle\'s mesos is not a tepid compromise but a precise attunement — the exactly right degree of the right feeling at the right time toward the right person for the right reason. This precision is what makes it a Shell 1 positive placement: not absence of affect but its correct calibration, the first articulate orientation-toward that does not veer into excess. The Diamond\'s attraction-coordinate names the region where desire has not yet become compulsion — the well-ordered inclination that practical wisdom can sustain.',
    gloss_at_secondary: {
      BEING: 'the mean determined by practical wisdom — not arithmetic midpoint but living centre',
    },
    excerpt: 'Virtue, then, is a state of character concerned with choice, lying in a mean… determined by a rational principle.',
    reference: 'Aristotle. Nicomachean Ethics. Trans. Ross / Urmson. Princeton: PUP, 1984.',
  },

  // ── φ-CASCADE AND PENTAGONAL GEOMETRY ────────────────────────

  {
    id: 'plato-timaeus',
    author: 'Plato', work: 'Timaeus', year: 'c. 360 BCE',
    primary:   { type: 'shell', radius: S2 },
    placement_rationale: 'The Demiurge\'s geometric cosmology — proportional means, regular solids, the dodecahedron for the cosmos — articulates the φ-shell structure. Shell 2 (S2 = 0.382) as the middle shell of the structure.',
    secondary: [{ type: 'shell', radius: S1 }],
    resonances: [],
    gloss_at_primary: 'the dodecahedron assigned to the cosmos — φ as cosmological signature, the φ-shell structure made geometric; the Timaeus is the locus classicus of geometrical cosmology: the Demiurge constructs the world-soul from proportional means and assigns the five regular solids to the five elements, reserving the dodecahedron — whose faces are pentagons and whose proportions are governed by φ — for the whole cosmos. Plato\'s placement here at Shell 2 is precise: the middle shell as the register of form-within-proportion, before the approach to the centre but beyond the outermost bounding.',
    gloss_at_secondary: {
      shell_618: 'regular solids as the geometric grammar of which φ-shells are the inner echo',
    },
    excerpt: 'God used it [the dodecahedron] for the whole, making a pattern of animal figures thereon.',
    reference: 'Plato. Timaeus. Trans. Donald Zeyl. Hackett, 1997.',
  },

  {
    id: 'burkert-pythagoreanism',
    author: 'Walter Burkert', work: 'Lore and Science in Ancient Pythagoreanism', year: '1972',
    primary:   { type: 'shell', radius: S2 },
    placement_rationale: 'Burkert situates the pentagram and φ in ritual cosmology — the φ-shell structure as philosophical and devotional foundation; the middle shell as the register of number-in-ritual.',
    secondary: [],
    resonances: [],
    gloss_at_primary: 'the pentagram and φ embedded in ritual cosmology — ancestor of the Diamond\'s synthesis of number and being; Burkert\'s scholarship establishes that for early Pythagoreanism, number was not an abstract instrument but a living power — the very substance of things — and the pentagram was the symbol by which the community recognized itself. The φ-ratios encoded in the pentagram were simultaneously mathematical law and devotional form, which is precisely the synthesis the Diamond\'s shell-structure requires: the geometric not as decoration but as the structural grammar of being.',
    gloss_at_secondary: {},
    excerpt: 'In that twilight period between old and new… Pythagoras represents… the survival or revival of ancient, pre-scientific lore.',
    reference: 'Burkert, Walter. Lore and Science in Ancient Pythagoreanism. Trans. Edwin Minar Jr. Harvard UP, 1972.',
  },

  {
    id: 'kepler-harmonices',
    author: 'Johannes Kepler', work: 'Harmonices Mundi', year: '1619',
    primary:   { type: 'shell', radius: S2 },
    placement_rationale: 'Sectio divina as the divine signature of cosmic harmony — φ as continuing self-similar procreation; the φ-shell structure articulated as musical-geometric law at the middle register.',
    secondary: [{ type: 'shell', radius: S1 }],
    resonances: [],
    gloss_at_primary: 'sectio divina as the divine signature of cosmic order — φ as continuing procreation, the harmonic of self-division; Kepler\'s Harmonices Mundi is the most rigorous pre-modern analysis of φ as a structural principle of nature, showing how the ratio governs musical consonance, planetary motion, and geometrical proportion through a single self-similar logic. Where other thinkers invoke φ symbolically, Kepler derives it: the beautiful idea of continuing procreation — a ratio that generates itself endlessly — is the mathematical signature the Diamond model reads as the inner measure of its own shell-structure.',
    gloss_at_secondary: {
      shell_618: 'the larger φ-radius as the outer harmonic of self-similar division',
    },
    excerpt: 'The golden ratio (sectio divina) is central to Kepler\'s theory… the beautiful idea of continuing procreation.',
    reference: 'Kepler, Johannes. Harmonices Mundi Libri V. Linz, 1619.',
  },

  {
    id: 'kepler-mysterium',
    author: 'Johannes Kepler', work: 'Mysterium Cosmographicum', year: '1596',
    primary:   { type: 'shell', radius: S3 },
    placement_rationale: 'Nested Platonic solids — the outer-but-bounded geometry of the solar system; Shell 3 (S3 = 0.618, the outermost bounded shell) is the appropriate register for this cosmographic architecture.',
    secondary: [],
    resonances: [],
    gloss_at_primary: 'nested Platonic solids as the structural skeleton of the cosmos — φ-solid mediating Earth and Mars; Kepler\'s youthful construction in the Mysterium Cosmographicum is the first modern attempt to derive the distances of the planets from pure geometrical necessity rather than mere observation. The nesting of the five Platonic solids between six planetary spheres places the dodecahedron — the φ-governed solid — at a specific structural register. Shell 3 as the outermost bounded shell receives this: the geometry that frames the cosmos without yet being at its centre, the bounding form before the approach to the origin.',
    gloss_at_secondary: {},
    excerpt: 'the five Platonic solids could be nested to account for the spacing of the six planetary orbits.',
    reference: 'Kepler, Johannes. Mysterium Cosmographicum. Trans. A.M. Duncan. Abaris Books, 1981 [1596].',
  },

  {
    id: 'livio-golden-ratio',
    author: 'Mario Livio', work: 'The Golden Ratio: The Story of Phi', year: '2002',
    primary:   { type: 'shell', radius: S2 },
    placement_rationale: 'Livio\'s scholarly analysis of φ\'s mathematical ubiquity — the φ-shell structure articulated with scientific sobriety at the middle register, correcting both mystical overreach and dismissive skepticism.',
    secondary: [],
    resonances: [],
    gloss_at_primary: 'scholarly corrective — φ\'s mathematical ubiquity is real; the Diamond\'s use is geometric, not decorative; Livio distinguishes carefully between the genuine mathematical appearances of φ — in Fibonacci sequences, pentagonal symmetry, continued fractions — and the overblown claims of popular mysticism. This matters for the Diamond model: its deployment of φ-shells is not a gesture toward the esoteric but a structural choice grounded in the same self-similar logic Livio documents. The Shell 2 placement marks the register at which this rigor belongs — the middle distance where mathematics and meaning meet without collapsing into each other.',
    gloss_at_secondary: {},
    excerpt: 'The Golden Ratio… has shown a propensity to appear in the most astonishing variety of places, from mollusk shells… to the shape of the galaxy.',
    reference: 'Livio, Mario. The Golden Ratio. Broadway Books, 2002.',
  },

  {
    id: 'pentagon-mala-108',
    author: 'Geometric/devotional convergence', work: 'The pentagon\'s 108° interior angle and the Buddhist mala', year: 'classical',
    primary:   { type: 'shell', radius: S2 },
    placement_rationale: 'The 108° interior angle of the regular pentagon and the 108-bead mala — a formal convergence of φ-geometry and devotional structure at the middle shell where number meets practice.',
    secondary: [{ type: 'shell', radius: S1 }],
    resonances: [],
    gloss_at_primary: 'a regular pentagon\'s 108° angle and the 108-bead mala — φ-geometry meeting devotional form at the middle shell; the convergence is not coincidental but structural: the 108° interior angle is a direct consequence of the pentagonal φ-proportion, and the mala\'s 108 beads encode a compact cosmology — six senses, three sensations, two responses, three timeframes — in a number that the geometric form independently delivers. At Shell 2, the Diamond marks the register where formal necessity and contemplative practice arrive at the same figure by different paths, which is itself a kind of φ-property: self-similarity across domains.',
    gloss_at_secondary: {
      shell_618: 'the φ-shell as the crossing point at which the form\'s angle becomes affective measure',
    },
    excerpt: 'A regular pentagon has interior angles of 108°. The Buddhist mālā contains 108 beads — a number around which traditional cosmologies cluster (six senses, three sensations, two responses, three timeframes among them).',
    reference: 'Buswell, Robert E., and Donald S. Lopez Jr. The Princeton Dictionary of Buddhism. Princeton UP, 2013, s.v. "mālā." Geometric note on pentagonal interior angles independent.',
  },

  // ── INSIGHT / LACAN / INTERSTITIAL ───────────────────────────

  {
    id: 'lacan-real',
    author: 'Jacques Lacan', work: 'Écrits and Seminar XI (le réel)', year: '1964 / 1966',
    primary:   { type: 'point', coord: 'insight' },
    placement_rationale: 'The Real as "that which does not cease not to be written" — a structural insight that sees through the Symbolic order from within; penetrating clarity at Shell 3 below, not a zone beyond the sphere.',
    secondary: [{ type: 'point', coord: 'reflection' }],
    resonances: ['reflection'],
    gloss_at_primary: 'the Real as the structural impossible — the penetrating insight that sees through the Symbolic from within; Lacan\'s Real is not a realm beyond language but the irreducible remainder that language cannot absorb — what keeps returning to the same place because no signifier can finally capture it. Insight at Shell 3 downward is the appropriate coordinate because the Real is not a revelation from outside the structure but a force that acts on it from within, disrupting the smooth surface of the Symbolic at the points where the structure\'s own internal necessity is most strained. Form does not give way here; it wrinkles — the approach to what cannot be said.',
    gloss_at_secondary: {
      reflection: 'the Imaginary as the first reflective shell that the Real perpetually disrupts',
    },
    excerpt: 'the logical obstacle of what, in the symbolic, declares itself to be impossible. This is where the real emerges from.',
    reference: 'Lacan, Jacques. Écrits. Trans. Bruce Fink. Norton, 2006. Seminar XI. Trans. Sheridan, 1981.',
  },

];

// ------------------------------------------------------------
// Spatial index — one pass over SOURCES.
// Keys are stable strings; the same vocabulary is used by the
// hover system (HOVER_TO_POINT) and the glyph layer.
// ------------------------------------------------------------
const slotKey = slot =>
    slot.type === 'point'  ? `point:${slot.coord}`
  : slot.type === 'shell'  ? `shell:${Math.round(slot.radius * 1000)}`
  : /* region */             `region:${slot.name}`;

export const POSITION_INDEX = (() => {
  const idx = {};
  for (const s of SOURCES) {
    for (const slot of [s.primary, ...s.secondary]) {
      const k = slotKey(slot);
      (idx[k] ||= []).push(s.id);
    }
  }
  return idx;
})();

export const sourcesAt = key => POSITION_INDEX[key] || [];
export const sourceById = id => SOURCES.find(s => s.id === id) || null;
export const slotKeyOf  = slotKey;
export const hasResonances = s => Array.isArray(s.resonances) && s.resonances.length > 0;

// What gloss applies when source `s` is rendered at hover/glyph location `key`?
export function glossFor(s, key) {
  if (slotKey(s.primary) === key) return s.gloss_at_primary;
  for (const slot of s.secondary) {
    if (slotKey(slot) !== key) continue;
    const slotName = slot.type === 'point' ? slot.coord
                   : slot.type === 'shell' ? `shell_${Math.round(slot.radius * 1000)}`
                                           : slot.name;
    return s.gloss_at_secondary[slotName] || s.gloss_at_primary;
  }
  return s.gloss_at_primary;
}
