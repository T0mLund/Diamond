// ============================================================
// content/readings.js — the prose, structured by spatial position.
//
// Fourteen ordered sections, one per region of the Diamond.
// Inline source references use:
//   <a class="source-ref" data-source-id="...">Author, Work</a>
//
// app.js wires these to scroll into the matching label / tooltip.
// ============================================================

import { SOURCES } from './sources.js';

// Stable lookup so the prose can reference a source by id and the
// rendered HTML inserts the canonical short citation.
const byId = Object.fromEntries(SOURCES.map(s => [s.id, s]));
const ref  = id => {
  const s = byId[id];
  if (!s) throw new Error(`unknown source id: ${id}`);
  return `<a class="source-ref" data-source-id="${id}">${s.author}, <em>${s.work}</em></a>`;
};

// Inline chip used in summaries for sections still under elaboration.
const chip = (label = 'in development') => `<span class="chip">${label}</span>`;

// ------------------------------------------------------------
// SECTIONS — ordered as the eye reads the Diamond, beginning at
// the centre and radiating outward, then descending the τ axis.
// ------------------------------------------------------------
export const READINGS = [
  // 0 ─────────────────────────────────────────────────────────
  {
    id: 'begin-here',
    open: true,
    title: 'Begin here',
    body: `
      <p>The Diamond is a coordinate model of inner experience. Every position has been earned: not chosen for elegance and not arrived at by survey, but reasoned to from a small set of geometric and metaphysical commitments. Each name in the figure is a load-bearing element, and each source listed in this page is a position-claim — a statement, by some thinker or text, about what belongs at the coordinate in question.</p>
      <p>You can read the page in either order. From above, scroll the figure: drag to orbit, hover a label, and the panel that appears renders five sources drawn from the pool of authors who have, in their own vocabulary, named that position. The same five do not appear twice — each hover re-shuffles the pool. Or read from below, by scrolling the prose. The two modes are deliberately interleaved: the figure is the geometry, and the prose is the geometry put back into language.</p>
      <p>What follows is a <em>diagrammatic phenomenology</em> — a synthesis in the lineage of the Kabbalistic Tree of Life and Jung's mandalic self-diagrams. The Diamond does not claim to discover the structure of inner experience. It claims that <em>if</em> one adopts three commitments — a centred origin (BEING), a vertical axis with limit-states past the horizon, and an affect axis perpendicular to it — the φ-cascade renders the relations among classical contemplative positions surveyable. φ is here a geometric and mnemonic choice, not a metaphysical proof. What the figure offers is the precision of a <em>map</em>, not of a <em>territory</em>.</p>
      <p>This is a working model. Sections marked ${chip()} are still being thought through. The aspiration is not encyclopaedic completeness but architectural honesty — that everything which appears in the Diamond can be defended on geometric, philological, and contemplative grounds simultaneously.</p>
    `,
  },

  // 1 ─────────────────────────────────────────────────────────
  {
    id: 'being',
    title: 'BEING — the centre that holds',
    body: `
      <p>At the origin sits BEING: not a being among beings, but the structural zero from which every other position is measured. The gold dot is small on purpose. A larger dot would suggest that the centre is one of the things in the figure, when in fact the centre is the condition for any thing being in the figure at all. The Diamond is, in this sense, a sphere whose centre is everywhere. The formula has a longer lineage than its most famous waypoint suggests. ${ref('liber-xxiv-philosophorum')} states it as the second of twenty-four pseudo-Hermetic propositions in the twelfth century; ${ref('alain-de-lille-regulae')} sets it down in the same century as Regula VII of his Theologicae Regulae. ${ref('cusa-docta-ignorantia')} systematised this inheritance two and a half centuries later, and gave it the form most readers know — still nearly five hundred years before there was a way to draw it.</p>
      <p>Three philosophical traditions have arrived at this point along three different routes. ${ref('plotinus-enneads-vi-9-8')} reached it through a Neoplatonic discipline of ascent: each finite centre converges on the centre of all centres, until the soul holds itself there, in the One, at perfect rest. ${ref('chandogya-upanishad')} reached it earlier, by a single sentence — <em>sat ekam evādvitīyam</em>, "Being, one only, without a second" — placed at the headwaters of every later Vedāntic articulation. ${ref('tillich-systematic')} reached it with twentieth-century theological grammar: God is not a being above other beings but being-itself, the ground in which any entity comes to stand.</p>
      <p>From the phenomenological side, ${ref('husserl-ideas-ii')} placed the lived body at this same position — the absolute <em>here</em>, the <em>Nullpunkt</em> of orientation, the standpoint that cannot be transcended because every "there" is constituted with respect to it. ${ref('merleau-ponty-pp')} sharpened this into the somatic claim that "one's own body is in the world just as the heart is in the organism." The body is not at the centre by accident; it is the centre because all spatial sense radiates from it. Husserl's <em>Nullpunkt</em> is bodily-perceptual; Tillich's <em>being-itself</em> is ontological. They are not the same concept in their original literatures. Their co-location at this coordinate is the Diamond's synthesis, not Husserl's or Tillich's.</p>
      <p>Eastern wisdom literature names the same point in still other registers. ${ref('tathata-mahayana')} calls it <em>tathatā</em>, bare suchness prior to conceptual overlay. ${ref('brhadaranyaka-upanishad')} calls it <em>ātman</em>, the self-luminous light prior to subject-object division. ${ref('bindu-tantric')} calls it the <em>bindu</em>, the dimensionless point from which mandala-geometry radiates. Each of these traditions identifies a position at this place from within its own vocabulary. The Diamond proposes that these positions co-locate at a level of geometric abstraction. Tillich's <em>being-itself</em> is not the Upaniṣadic <em>ātman</em>; Plotinus's <em>One</em> is famously <em>epekeina tēs ousias</em>, beyond Being. What these traditions name with different words is structurally close enough to be plotted together. ${ref('tillich-courage')} adds the existential register: the courage that holds against the weight of non-being draws directly on this centre and on nothing else.</p>
    `,
  },

  // 2 ─────────────────────────────────────────────────────────
  {
    id: 'vertical-axis',
    title: 'The vertical axis — and why Birth is below',
    body: `
      <p>The vertical axis runs from <em>Birth</em> below to <em>Death</em> above. The inversion is intentional. Mythography across traditions agrees that the cosmos has a structural verticality, and that the upper limit is the side of dissolution and the lower the side of arrival — ${ref('eliade-sacred-profane')} formalised this as the <em>axis mundi</em>, the universal pillar that puts the three cosmic levels into communication, with sacred space breaking the homogeneity of profane space at the upper apex. ${ref('eliade-patterns')} elaborated the same figure as <em>imago mundi</em>: a universe is born from its centre and spreads from its navel.</p>
      <p>The vertical positions arrange themselves on the φ-cascade. Reading downward from BEING toward Birth: <em>reflection</em>, <em>meditation</em>, <em>insight</em>, the bipyramid's lower tip, the <em>awakening</em> shell at the sphere's south pole, and Birth itself just past φ. Reading upward: <em>oppression</em>, <em>excitement</em>, <em>intensity</em>, the upper tip, the <em>obliteration</em> shell at the north pole, and Death past φ. The symmetry is not decorative. The upward path passes through states of intensification — being seized, raised, pressured — until the structure breaks open at the top. The downward path passes through states of settling — turning around, dwelling, seeing into — until the structure breaks open at the bottom. Both pierce the sphere of the imaginable, but at opposite tempos.</p>
      <p>${ref('jacobs-ladder')} gave the West its earliest figure of the bounded ladder: the foot resting on earth, the top reaching to heaven. ${ref('plato-myth-er')} gave its earliest cosmography: ascending celestial spheres above, metempsychosis returning souls below. ${ref('dante-commedia')} gave its most elaborated literary figure: descending circles of Inferno, ascending cornices of Purgatory, the Empyrean as apex. ${ref('jung-aion')} gave its psychological inversion: individuation as ascent toward the supraordinate Self, descent into the prima materia as the necessary counter-movement. ${ref('bhavacakra')} gave its Buddhist articulation: the three poisons at the hub, the twelve nidānas at the rim, and a vertical ordering that runs from hells below to formless heavens above. The Diamond inherits all of these and corrects only the implicit valence: Birth is not less than Death, only earlier in the axis.</p>
    `,
  },

  // 3 ─────────────────────────────────────────────────────────
  {
    id: 'affect-axis',
    title: 'The affect equator',
    body: `
      <p>The affect axis is perpendicular and symmetric. From BEING outward in either direction the same φ-shells appear: <em>aversion / attraction</em> at the inner shell (φ⁻³), <em>fear / desire</em> at the middle shell (φ⁻²), <em>hate / love</em> at the outer shell (φ⁻¹). Affect is here a geometry, not a list. Cross the rim — past hate, past love — and one is past the sphere of the imaginable: not because affect ends, but because what lies beyond stops being recognisably emotional and becomes something else.</p>
      <p>${ref('buddhist-three-poisons')} provides the earliest systematic articulation: the three poisons of attachment, aversion, and confusion as the affective geometry of <em>saṃsāra</em> — the entire equator named in classical Pāli analysis. The shells of equivalence on this axis make a position-claim: hate and love sit at the same radius from the centre because they are the same magnitude in opposite directions, and Buddhist analysis was the first to insist on this point in geometric terms.</p>
      <p>The Diamond reads this equator with two further commitments. First, that affect is not strictly a passion to be overcome — ${ref('aristotle-mean')} placed virtue precisely at the inner shell, where excess and deficiency are equally close to the centre, and ${ref('stoic-pathe')} distinguished raw <em>pathē</em> at the rim from <em>eupatheiai</em> as the rational inner-shell mode. Second, that affect is in motion: ${ref('spinoza-ethics-iii')} gave the cleanest geometric account of joy and sadness as transitions in perfection, the shell logic stated in the syntax of conatus. ${ref('jung-mysterium')} added that the rim itself folds: at the outermost remove, extremes pass into their opposites, the alchemical <em>enantiodromia</em> as the symmetry of the affect axis seen from inside.</p>
      <p>${ref('aquinas-augustine-vice')} maps the seven capital vices as disordered loves arrayed around a deficiency of right ordering, and ${ref('brahmaviharas')} gives the four sublime states — <em>mettā</em>, <em>karuṇā</em>, <em>muditā</em>, <em>upekkhā</em> — as the affective rim cultivated rather than left raw. The brahmavihārās are particularly instructive: <em>mettā</em> at the rim is love expanded past possessiveness into the limitless, while <em>upekkhā</em> at the centre is equanimity as the ground into which the four collapse. Affect, on the Diamond, is what the centre radiates and what radiates back into the centre.</p>
    `,
  },

  // 4 ─────────────────────────────────────────────────────────
  {
    id: 'symmetric-piercings',
    title: 'The symmetric piercings — the work\'s central claim',
    body: `
      <p>The Diamond's most original move is structural, not literary. <em>Obliteration</em> (the upper piercing — <em>fanāʾ</em>, <em>henōsis</em>, the sublime, the Great Death) and <em>Awakening</em> (the lower piercing — <em>sambodhi</em>, <em>satori</em>, <em>Durchbruch</em>) are placed <em>symmetrically</em> across BEING. In most prior diagrammatic mysticism — the Tree of Life, the <em>bhavacakra</em>, Plotinus's ascent — only one of these directions is named at the limit. The Diamond claims that ecstatic dissolution and contemplative dissolution are <em>twin boundary conditions</em> of one geometry, approached from opposite directions, identified at τ=1.</p>
    `,
  },

  // 5 ─────────────────────────────────────────────────────────
  {
    id: 'awakening',
    title: 'Awakening — the lower piercing',
    body: `
      <p>Where the vertical axis crosses the sphere from below it is named <em>awakening</em>. The position is structurally precise: not at the centre, not above the centre, but at the south pole of the sphere of the imaginable. Awakening on this model is not a higher kind of imagining; it is the moment the imagined is dropped, and what remains is what was imagined in.</p>
      <p>${ref('buddhist-bodhi')} gives this its earliest canonical form: <em>sambodhi</em> as the cessation of effluents — "Birth is ended, the holy life fulfilled, the task done." The earlier station of <em>insight</em> sees through to this ending; awakening is the ending itself, named as a position rather than a process. ${ref('dogen-genjokoan')} articulates the discontinuity at its sharpest: kenshō is not the deluded person becoming undeluded but the deluded person being dropped away. Firewood becomes ash and does not become firewood again — each is its own complete expression.</p>
      <p>${ref('hakuin-wild-ivy')} gives the experiential register: Great Doubt collapsing into Great Death and back into Great Joy — the sphere-piercing as it is felt from inside. ${ref('eckhart-durchbruch')} gives the mystical-Christian register: <em>Durchbruch</em>, the soul breaking through God into the Gottheit beyond name. ${ref('heart-sutra')} gives the most compressed liturgical statement: "form is emptiness, emptiness is form" — awakening as the discipline of voiding every position from inside. The Heart Sūtra's primary placement is here, at the lower piercing, even though the omega point is its most famous theological resonance: the working insight is what the verse does on the way to that identity, and that work happens precisely at the south pole where the structured falls away.</p>
    `,
  },

  // 5 ─────────────────────────────────────────────────────────
  {
    id: 'obliteration',
    title: 'Obliteration — the upper piercing',
    body: `
      <p>The same sphere is pierced from above. <em>Obliteration</em> names the position where what is intensified — the path of pressure, of being seized — exceeds the bounded form and goes through the upper shell. The Diamond marks this region with a faint band that thins into a ring as τ rises. At τ=0 the band is a kind of weather; by τ=1 it has become an outline through which the form opens.</p>
      <p>${ref('zen-great-death')} gives the cleanest articulation in the Zen idiom: the Great Death as ego-dissolution, not biological cessation. Both ${ref('hakuin-wild-ivy')} and ${ref('zen-great-death')} insist that this passage is not metaphor for actual dying but the spiritual event that physical dying figures. ${ref('kenosis-philippians')} gives the Christological grammar: <em>kenōsis</em>, the divine self-emptying — "He emptied himself, taking the form of a servant." Maximus then completes the chiasm with <em>theōsis</em> as the lower correlate. ${ref('sufi-fana-baqa')} gives the Sufi articulation: <em>fanāʾ</em> as annihilation in the Real, <em>baqāʾ</em> as the subsistence after annihilation that is no longer the ordinary self. ${ref('plotinus-henosis')} names the Neoplatonic ascent: <em>henōsis</em> as the soul's passage beyond Intellect, out of the structured cosmos into the unbounded.</p>
      <p>${ref('bonaventure-itinerarium')} explicitly distinguishes the highest reach of the structured mind from what lies beyond it: the sixth stage as the apex of cognition, the seventh as <em>excessus mentis</em>, ecstatic passage into the divine darkness. ${ref('blanchot-space-literature')} gives a secular twentieth-century version: death as the impossible toward which "I" cannot go, the limit that escapes ownership — the upper piercing read as an anonymous <em>they-die</em> that no subject completes.</p>
    `,
  },

  // 6 ─────────────────────────────────────────────────────────
  {
    id: 'birth-death-omega',
    title: 'Birth, Death, and the omega point',
    body: `
      <p>Birth and Death sit at ±φ, just past the sphere. They are the only positions in the figure that lie outside the sphere of the imaginable: figured as luminous points connected to the bipyramid's tips by dotted lines. The dot is not the bipyramid's apex; the apex is at φ⁻¹/². The dot is a position-claim about the existential limits — the points one can name but cannot enter as ordinary experience.</p>
      <p>Then τ rises. The bipyramid's tips travel inward; the surface deforms toward the horn torus; and at τ=1 the upper and lower limit dots collapse into a single point on the +y axis at +φ. We call this position the <em>omega point</em>. It is not an additional doctrine. It is what the figure becomes when the structural distinction between Birth and Death is allowed to fall. <span class="footnote">A note on terminology: we borrow Teilhard\'s <em>Omega</em> as a useful word for the τ=1 identity, but the Diamond\'s omega point is <em>topological</em> and <em>structural</em> — a fixed point of the morph — not the eschatological-Christological convergence Teilhard intended in <em>The Phenomenon of Man</em>. When precision matters, read it as "the τ=1 identity" or "the unitive collapse."</span></p>
      <p>${ref('nagarjuna-mmk-25')} gives the Mādhyamaka name in two lines: "There is not the slightest difference between cyclic existence and nirvāṇa." That sentence is the τ=1 identity of birth and death, said at the moment the structured positions are seen as empty designations. ${ref('heraclitus-fragment-60')} gives the earliest Western formula: "the way upward and downward are one and the same" — five words for the entire identity. ${ref('cusa-coincidentia')} gives the geometric warrant: opposites coinciding at infinity is not a contradiction but a figure of how thinking moves beyond limited things toward the transcendent One.</p>
      <p>${ref('teilhard-omega')} contributes the eschatological vocabulary: layers of consciousness converging in Omega, fusing and consuming them in itself. ${ref('bardo-clear-light')} gives the phenomenological side: the clear light arises at the moment of dying, a recognition rather than a conclusion. ${ref('bardo-thodol')} as a whole work belongs to <em>death</em>; the clear-light passage at the moment of cessation belongs here, where death and rebirth converge in a single luminous identity.</p>
      <p>${ref('heidegger-sein-zum-tode')} placed death as Dasein's ownmost, non-relational, certain possibility — the structural condition of authentic disclosure. ${ref('heidegger-poetry-language')} sharpened the same thought into a more compressed figure: "Death is the shrine of Nothing… the shrine of Nothing harbors within itself the presencing of Being." Death, on the upper limit, holds the centre.</p>
    `,
  },

  // 7 ─────────────────────────────────────────────────────────
  {
    id: 'bipyramid-form',
    title: 'The bipyramid — form, φ, and the diamond',
    body: `
      <p>The form at the centre of the Diamond is a square bipyramid whose apex is at φ⁻¹/². The choice is not aesthetic. ${ref('plato-timaeus')} assigned the dodecahedron — the φ-solid <em>par excellence</em> — to the cosmos as a whole, and ${ref('kepler-mysterium')} extended this into a nested-solids cosmology in which the φ-solid mediated Earth and Mars. ${ref('kepler-harmonices')} named the golden section <em>sectio divina</em>, the divine signature of cosmic order. ${ref('burkert-pythagoreanism')} traces the embedding of φ in pre-philosophical ritual: the pentagram and the golden ratio not as later mathematics but as inherited cosmological signs.</p>
      <p>${ref('livio-golden-ratio')} adds a corrective: most decorative claims about φ in art and architecture are myth, but its mathematical ubiquity in self-similar geometry is real. The Diamond's use of φ is geometric — it is what the φ-cascade <em>does</em>, not what it is rumoured to do. ${ref('heraclitus-logos')} gives the deepest pre-Socratic ancestor: the <em>logos</em> as the hidden proportional principle — "the hidden harmony is stronger than the apparent one." ${ref('pentagon-mala-108')} notes a small empirical convergence worth keeping: a regular pentagon has interior angles of 108°, and the Buddhist mala has 108 beads — geometry meeting devotion at φ, in figures separated by continents and millennia.</p>
      <p>φ is the only ratio that satisfies <em>a:b = b:(a+b)</em>, and the most compact geometric expression of "neither same nor other." We do not claim, beyond this, that φ is the cosmos's signature. Livio's corrective stands: most cultural claims for φ are decorative. The φ-cascade in the Diamond is an <em>aesthetic and mnemonic</em> choice — it spreads the labels at perceptually distinct radii, prevents the figure from collapsing into discrete tiers, and inherits the self-similarity intuition from Pythagorean ritual cosmology. The shells would still work, geometrically, at radii ½, ¼, ⅛ or e⁻¹, e⁻², e⁻³. We chose φ for the resonances; we do not derive ontology from them.</p>
      <p>The bipyramid is also a diamond in the gemmological and the symbolic sense. ${ref('diamond-sutra')} names the form's function directly: the <em>vajra</em> as indestructible wisdom-weapon that cuts through every conditioned appearance, the diamond mind that directly cognises emptiness. ${ref('vajra-dorje')} adds the Tibetan reading: simultaneously thunderbolt and diamond, the most powerful and durable of all things. ${ref('vajrasattva')} personifies it: the diamond being whose nature is the diamond itself. ${ref('jung-psychology-alchemy')} gives the Western counterpart: the <em>lapis philosophorum</em> as the crystalline Self, projected by the alchemists onto chemical change.</p>
    `,
  },

  // 8 ─────────────────────────────────────────────────────────
  {
    id: 'interstitial',
    title: 'The interstitial — the unstructured ground',
    body: `
      <p>Between the bipyramid and the sphere lies a region the figure cannot label without falsifying it. We call it <em>interstitial</em>: the volume in which structured positions cease to bind. It is the formless ground beneath any picture of the formless. The figure renders this with a faint mist, just inside the shell — barely there on purpose.</p>
      <p>${ref('pseudo-dionysius')} gave the Christian apophatic articulation: "we enter into the darkness that is above intellect… the intangible and invisible darkness of that Light which is unapproachable." ${ref('eckhart-gottheit')} gave the Rhineland vernacular: the <em>Gottheit</em> as <em>Abgrund</em>, formless ground beneath the personal God — "a ground that has neither name nor form." Eckhart's two doctrines are placed separately on the Diamond: <em>Durchbruch</em> belongs to the lower piercing because it names the act, while the <em>Gottheit</em> belongs here because it names the place that act enters.</p>
      <p>${ref('cloud-of-unknowing')} gives the English mystical formulation: "thou findest but a darkness; and as it were a cloud of unknowing… thou mayest neither see Him clearly by light of understanding." The cloud is the only zone in which the soul can approach what reason cannot grasp. ${ref('lacan-real')} gives a secular twentieth-century articulation: the Real as that which "does not cease not to be written," the structural unthought that any symbolic order must produce by its own consistency. ${ref('foucault-order-things')} sharpens this to an epistemic claim: the unthought as the structural blind spot of any arrangement of knowledge — "the cogito can only think its way towards the unthought that escapes it."</p>
      <p>${ref('corbin-mundus-imaginalis')} adds an indispensable figure: the <em>mundus imaginalis</em>, the median world of forms that are real without being empirical. The imaginal is not the imaginary; it is the middle shell where intellectual forms acquire dimension before settling into image. The interstitial of the Diamond holds this as a structural possibility.</p>
    `,
  },

  // 9 ─────────────────────────────────────────────────────────
  {
    id: 'tau-axis',
    title: 'τ — the deformation from diamond to torus',
    body: `
      <p>The slider beneath the figure controls a single parameter, τ ∈ [0, 1]. At τ=0 the form is the bipyramid, the sphere is at full opacity, the awakening and obliteration bands are filled. At τ=1 the form is a horn torus with R = r = 1, the sphere is gone, the bands have thinned into outline rings, and the Birth and Death dots have collapsed into the omega point — understood here as the topological identity at τ=1, not Teilhard\'s eschatological terminus (see the note in the previous section). Every other state is a linear interpolation on the meridian profile (r, y). The morph is not metaphor; it is a single equation of two surfaces.</p>
      <p>${ref('cusa-docta-ignorantia')} furnishes the speculative bridge: <em>coincidentia oppositorum</em>, the coincidence of opposites at infinity, is precisely what the τ axis demonstrates as a continuous passage. ${ref('cusa-coincidentia')} restates this as the warrant for the τ=1 identity. ${ref('dogen-genjokoan')} gives the contemplative correlate: firewood-and-ash as a topological figure in which each is its own complete expression — no point of arrival, no point of departure, only the continuous profile.</p>
      <p>${ref('teilhard-omega')} reads the τ axis eschatologically — the noosphere ascending as a τ-deformation of biology toward unity. ${ref('heraclitus-fragment-60')} gives the path's compressed grammar: one and the same way upward and downward, walked twice. ${ref('plotinus-enneads-vi-9-11')} reads the τ axis ascetically: the soul's ascent as a topological passage through the structured into the unstructured, with rest as the destination ("utterly resting he has become very rest").</p>
    `,
  },

  // 10 ────────────────────────────────────────────────────────
  {
    id: 'shells',
    title: 'Shells of equivalence — why φ⁻¹, φ⁻², φ⁻³',
    body: `
      <p>Three concentric shells appear at radii φ⁻¹ ≈ 0.618, φ⁻² ≈ 0.382, φ⁻³ ≈ 0.236. The same shells house the vertical and the affect tiers. The cross-axis identity is not a coincidence to be commented upon: it is encoded as a single data structure in <em>coordinates.js</em>, where both axes derive their tier positions from the same shell array. <em>oppression</em> and <em>hate</em> sit at φ⁻¹ along their respective axes; <em>excitement</em> and <em>desire</em> at φ⁻²; <em>intensity</em> and <em>love</em> at φ⁻³ from the centre on the axis but at φ⁻¹ from the centre as a magnitude — the smaller index is the larger remove.</p>
      <p>${ref('aristotle-mean')} occupies the innermost shell as primary: the doctrine of the mean is not an arithmetic midpoint but a living centre in which excess and deficiency are equally close at hand. Mesotēs is a shell-claim, not a point-claim, and the inner φ⁻³ shell is its proper home. ${ref('spinoza-ethics-iii')} occupies the middle shell: the <em>Ethics</em>'s geometric derivation of joy and sadness as transitions in perfection is precisely what one would expect at φ⁻², halfway between the centre and the rim — the affects already moving but not yet at the edge.</p>
      <p>${ref('buddhist-three-poisons')} and ${ref('stoic-pathe')} take the outer shell as primary: the three poisons and the <em>pathē</em> name the equator at its full magnitude, where the radii of the affect axis are at their maximum within the sphere. ${ref('brahmaviharas')} sits with them: <em>mettā</em>, <em>karuṇā</em>, <em>muditā</em>, <em>upekkhā</em> as the rim cultivated rather than left raw. ${ref('aquinas-augustine-vice')} reads the same shell in the Christian register: capital vices as disordered loves arrayed around a deficiency of ordered love. ${ref('jung-mysterium')} adds the <em>enantiodromia</em>: the rim folds, and at the outermost remove extremes pass into their opposites — the symmetry of the affect axis seen from the inside.</p>
      <p>${ref('bhavacakra')} reads the entire vertical-affect lattice as a wheel: three poisons at the hub, twelve nidānas at the rim, the affective shells made cosmic. ${ref('corbin-mundus-imaginalis')} reads the middle shell as the imaginal: forms that are real without being empirical, suspended halfway between the centre's bare BEING and the rim's full deployment.</p>
    `,
  },

  // 11 ────────────────────────────────────────────────────────
  {
    id: 'time-axis',
    title: `The bare time axis ${chip('reserved')}`,
    body: `
      <p>The third axis runs through the form on the z direction and is left bare. No labels, no ticks, no positions. It exists structurally so that vertical and affect labels can be placed in 3D without ambiguity, and so that a later version of the model can lay narrative trajectories — a life, a tradition, a history — along it.</p>
      <p>${ref('heidegger-being-time')} provides the philosophical warrant: temporality as the threefold ekstatic structure of care, the standing present from which retention and protention unfold. ${ref('husserl-ideas-ii')} provides the phenomenological warrant: the body's zero-point as the standing present that constitutes "before" and "after" without itself having either. The time axis on the Diamond is a placeholder for the trajectory module to come — for now it is a faint line, doing the work of structural support without yet carrying content.</p>
      <p>${chip()} The decision about whether time should be linear, cyclic, or a hybrid (life-history linear, tradition-history cyclic) has not been made and will not be made by force.</p>
    `,
  },

  // 12 ────────────────────────────────────────────────────────
  {
    id: 'what-this-is',
    title: 'What this is and what it isn\'t',
    body: `
      <p><strong>What it is.</strong> A coordinate system for inner experience. A position-graph for the classical contemplative literatures, drawn under one synthetic vocabulary. A diagrammatic phenomenology in the lineage of the Tree of Life and Jung's mandalas.</p>
      <p><strong>What it isn't.</strong> A deductive metaphysics. A discovery of empirical structure. A religious revelation. A complete bibliography of any tradition it touches.</p>
      <p><strong>What you owe the figure.</strong> That you treat each position-claim as a <em>coordinate co-location</em> under one vocabulary, not as a claim that the cited authors meant the same thing in their own terms.</p>
    `,
  },

  // 13 ────────────────────────────────────────────────────────
  {
    id: 'open-questions',
    title: 'Open questions',
    body: `
      <p>Several of the placements in this map are working hypotheses, not final positions. The Heart Sūtra is placed primarily at the lower piercing (awakening) and secondarily at the omega point and the interstitial. A defensible alternative would be to place it primarily at the omega point, since "no attainment, no non-attainment" is the τ=1 identity in liturgical compression. The argument for the awakening primary is that the verse <em>does</em> its work on the way to that identity — voiding every position from inside, which is what the lower piercing names. ${chip('open')}</p>
      <p>The two Eckhart placements — <em>Durchbruch</em> at the lower piercing, the <em>Gottheit</em> in the interstitial — split a single mystic into two doctrinal coordinates. This is correct in principle (the act and the place that the act enters are different positions) but it asks the reader to hold both at once. ${chip('open')}</p>
      <p>The Bardo Thödol is split similarly: the work as a whole sits at <em>death</em>, the clear-light passage at the omega point. The split tracks the text's own structure, but a synoptic placement at <em>death</em> would also be defensible.</p>
      <p>The interstitial is the section the figure works hardest to under-render. There is a strong case for adding more sources here — perhaps the Pseudo-Dionysian <em>Divine Names</em> alongside the <em>Mystical Theology</em>, perhaps Ibn ʿArabī's <em>al-Ḥaqq</em> alongside the Sufi rim sources — but each addition risks turning the interstitial into a region of saying when it ought to remain a region of unsaying. ${chip('open')}</p>
    `,
  },

  // 13 ────────────────────────────────────────────────────────
  {
    id: 'sources-index',
    title: 'Sources — full bibliography',
    body: `
      <p>What follows is the full citation bank, ${SOURCES.length} sources in the order each was first invoked above, with the full reference and the position-claim each makes. Click any author name in a hover panel on the figure to scroll to the matching entry; the entry will pulse briefly on arrival.</p>
      ${SOURCES.map(s => `
        <div class="src-entry" id="src-${s.id}">
          <div class="src-name">${s.author} — <em>${s.work}</em>${s.year ? ` <span class="src-year">(${s.year})</span>` : ''}</div>
          <div class="src-gloss">${s.gloss_at_primary}</div>
          ${s.excerpt ? `<div class="src-excerpt">"${s.excerpt}"</div>` : ''}
          <div class="src-ref">${s.reference}</div>
        </div>
      `).join('')}
      <p class="updated">Last updated: 2026-05-07 · v3.15 · ${SOURCES.length} sources.</p>
    `,
  },

  // 14 ────────────────────────────────────────────────────────
  // Glossary — the technical vocabulary in one A–Z table.
  {
    id: 'glossary',
    title: 'Glossary — a key to the vocabulary',
    body: `
      <p>The Diamond draws on technical terms from several traditions. This is not an attempt to define them in their own literatures — each term has libraries devoted to it — but to give the working sense in which the model uses them. Where a term is the Diamond\'s own coinage, that is noted.</p>
      <dl class="glossary">
        <dt><em>Abgrund</em></dt>
          <dd>(German, "abyss" or "groundlessness") — Eckhart\'s name for the Gottheit as the ground beneath ground; on the Diamond, the interior of the interstitial.</dd>
        <dt><em>anātman</em></dt>
          <dd>(Sanskrit/Pāli, "no-self") — the Buddhist teaching that no enduring substantial self underlies experience. The Diamond\'s BEING is closer to anātman than to ātman: the structural condition of any self being there at all, not a self.</dd>
        <dt><em>ātman</em></dt>
          <dd>(Sanskrit, "self") — in the Upaniṣads, the self-luminous innermost. In <em>Tat tvam asi</em>, identical with brahman.</dd>
        <dt>BEING</dt>
          <dd>The centre of the Diamond. Not a being among beings; the structural zero from which every other coordinate is measured. Capitalised throughout to distinguish from the empirical self.</dd>
        <dt><em>bindu</em></dt>
          <dd>(Sanskrit, "point, drop") — the dimensionless point from which mandala-geometry radiates in Tantric cosmology.</dd>
        <dt><em>coincidentia oppositorum</em></dt>
          <dd>(Latin, "coincidence of opposites") — Cusa\'s formula for the way opposites identify at the limit. The Diamond\'s τ=1 identity is the geometric realisation.</dd>
        <dt><em>Durchbruch</em></dt>
          <dd>(German, "breakthrough") — Eckhart\'s term for the soul\'s breaking through God into the Gottheit. Placed at the lower piercing on the Diamond.</dd>
        <dt><em>enantiodromia</em></dt>
          <dd>(Greek, "running into the opposite") — Heraclitus\'s and Jung\'s figure for the rim folding back on itself: extremes pass into their opposites.</dd>
        <dt><em>epekeina tēs ousias</em></dt>
          <dd>(Greek, "beyond Being") — Plato\'s phrase for the Good in <em>Republic</em> VI; later Plotinus\'s for the One.</dd>
        <dt><em>fanāʾ</em></dt>
          <dd>(Arabic, "annihilation") — Sufi term for the self\'s extinction in the Real. Placed at the upper piercing.</dd>
        <dt><em>Gottheit</em></dt>
          <dd>(Middle High German) — Eckhart\'s "Godhead beyond God": the formless ground beneath the personal God. Placed in the interstitial.</dd>
        <dt><em>henōsis</em></dt>
          <dd>(Greek, "unification") — the soul\'s union with the One in Plotinus. Placed at the upper piercing.</dd>
        <dt>Interstitial</dt>
          <dd>The Diamond\'s name for the volume between the bipyramid and the sphere — the formless ground that no label can fix without falsifying. Faintly misted in the figure.</dd>
        <dt><em>kenshō</em></dt>
          <dd>(Japanese, "seeing one\'s nature") — Zen\'s name for the awakening event. The lower piercing as discontinuity.</dd>
        <dt><em>logos</em></dt>
          <dd>(Greek, "word, account, ratio") — Heraclitus\'s hidden proportional principle. The pre-Socratic name for what the Diamond places at BEING.</dd>
        <dt><em>mundus imaginalis</em></dt>
          <dd>(Latin, via Henry Corbin) — the imaginal world of forms that are real without being empirical. The middle shell of the interstitial.</dd>
        <dt><em>Nullpunkt</em></dt>
          <dd>(German, "zero-point") — Husserl\'s term for the body\'s absolute <em>here</em>, the standpoint of all spatial sense.</dd>
        <dt>Omega point / τ=1 identity</dt>
          <dd>The position at +φ on the vertical axis where, at τ=1, the Birth and Death dots collapse into one. <em>Topological</em> and <em>structural</em>, not Teilhard\'s eschatological terminus — we borrow the word, not the doctrine.</dd>
        <dt>Piercing (upper / lower)</dt>
          <dd>The Diamond\'s names for the two points where the vertical axis crosses the unit sphere: <em>obliteration</em> at +1 (the upper piercing, ecstatic dissolution), <em>awakening</em> at −1 (the lower piercing, contemplative dissolution). The work\'s central structural claim: these are twin boundary conditions of one geometry, identified at τ=1.</dd>
        <dt><em>sambodhi</em></dt>
          <dd>(Pāli/Sanskrit, "complete awakening") — the Buddha\'s realisation. The lower piercing as canonical Buddhist articulation.</dd>
        <dt><em>satori</em></dt>
          <dd>(Japanese) — Zen\'s term for sudden awakening, often used interchangeably with kenshō.</dd>
        <dt><em>Sein-zum-Tode</em></dt>
          <dd>(German, "being-toward-death") — Heidegger\'s formula for the structure of authentic existence. The vertical axis read existentially.</dd>
        <dt>Shell</dt>
          <dd>One of the three concentric φ-radii in the Diamond: φ⁻¹ ≈ 0.618, φ⁻² ≈ 0.382, φ⁻³ ≈ 0.236. Vertical and affect tiers share these radii.</dd>
        <dt><em>tathatā</em></dt>
          <dd>(Sanskrit, "suchness") — Mahāyāna term for reality in its unqualified givenness. Placed at BEING.</dd>
        <dt>τ (tau)</dt>
          <dd>The morph parameter, τ ∈ [0, 1]. At τ=0 the form is the bipyramid; at τ=1 the horn torus. Each value is a state of the figure.</dd>
        <dt>Time axis</dt>
          <dd>The third orthogonal axis (z), running through BEING. Currently bare; reserved for a later trajectory module.</dd>
        <dt><em>vajra</em> / <em>dorje</em></dt>
          <dd>(Sanskrit / Tibetan, "diamond, thunderbolt") — the indestructible wisdom-weapon. The form at the centre of the Diamond is also a vajra.</dd>
        <dt>φ (phi)</dt>
          <dd>The golden ratio, φ = (1 + √5)/2 ≈ 1.618; the unique positive solution of <em>a:b = b:(a+b)</em>. The Diamond uses φ as a geometric and mnemonic spacing principle, not as a metaphysical signature.</dd>
      </dl>
    `,
  },
];

// ------------------------------------------------------------
// Map a hover region id (vertical/affect tier or BEING) to the
// readings section the tooltip should scroll the page to when
// a reader clicks "see in prose" or any source-ref. Most positions
// resolve to multiple sections; we choose the single best target.
// ------------------------------------------------------------
export const HOVER_TO_SECTION = Object.freeze({
  being:        'being',
  death:        'birth-death-omega',
  birth:        'birth-death-omega',
  obliteration: 'obliteration',
  awakening:    'awakening',
  intensity:    'vertical-axis',
  excitement:   'vertical-axis',
  oppression:   'vertical-axis',
  reflection:   'vertical-axis',
  meditation:   'vertical-axis',
  insight:      'vertical-axis',
  hate:         'affect-axis',
  fear:         'affect-axis',
  aversion:     'affect-axis',
  attraction:   'affect-axis',
  desire:       'affect-axis',
  love:         'affect-axis',
});

// Short blurbs shown in the hover tooltip (above the source list).
// Keyed by hover id; brief, one phrase each.
export const HOVER_BLURBS = Object.freeze({
  being:        'The centre that holds. Not a being among beings but being-itself — the silent fact of presence from which every axis of experience extends. Every dot, every shell, every limit is read from here.',
  death:        'The upper limit, just past the sphere of the imaginable. Not an event inside life but the horizon that grants life its shape — the place thinking arrives at and cannot enter. Above the apex, beyond what form can hold.',
  birth:        'The lower limit, just past the sphere of the imaginable. The unrememberable arrival from which every memory is already late. Symmetric to Death across BEING: the other horizon from which a life is given.',
  obliteration: 'The upper piercing. Intensity raised until form gives way — ecstasy, terror, the sublime; the rapture that breaks the vessel. Just inside the limit, where experience is still felt but no longer contained.',
  awakening:    'The lower piercing. Settled past form — the stillness that opens beneath every state. Not a peak but a release: the floor of attention falls out and what remains is unbothered, lucid, plain.',
  intensity:    'The third upward shell. Being seized — caught and concentrated by what matters. The taut, vivid grip of full attention before it tips into rapture.',
  excitement:   'The second upward shell. Being raised — the lift of energy gathering, anticipation just shy of its object. The body leaning forward.',
  oppression:   'The first upward shell. Being pressed — the weight of the world bearing down on the centre, the close surface of what crowds in.',
  reflection:   'The first downward shell. Turning around — the small inward pivot, attention catching itself in the act of attending.',
  meditation:   'The second downward shell. Dwelling within — sustained, quiet inhabitation of the inner field; thought slowed to its own breathing.',
  insight:      'The third downward shell. Seeing into — the clear, unhurried apprehension that arrives when stillness has done its work. Knowledge that does not look like effort.',
  hate:         'The outer rim of the negative affect axis. Repulsion at full extension — the world held at maximum distance, the other refused. The far edge of aversion, where revulsion becomes a stance.',
  fear:         'The middle shell of the negative affect axis. The body’s flinch before the mind has named the threat — contraction, narrowing, the world becoming sharp and small.',
  aversion:     'The inner shell of the negative affect axis. The faint, near-silent turning-away that precedes fear and outlives it; the small no the body keeps saying.',
  attraction:   'The inner shell of the positive affect axis. The faint, near-silent turning-toward that precedes desire — the small yes the body offers before it knows why.',
  desire:       'The middle shell of the positive affect axis. Wanting given a direction — the felt pull toward what is not yet, the body leaning into a future.',
  love:         'The outer rim of the positive affect axis. Affirmation at full extension — the world held close, the other welcomed. Where wanting becomes a way of attending.',
});
