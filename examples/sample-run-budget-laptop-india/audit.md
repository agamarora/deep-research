# Audit — budget-laptop-india-linux-dev

## Verdict

**Revise** — material drift between cited sources and synthesis claims, plus several hard-constraint and load-bearing facts that don't survive spot-checking. The shape of the recommendation (ThinkPad E14 G6 / ThinkBook 14 G7 cohort) is plausible, but the specific SKUs, CPUs, prices, and "Ubuntu certified" claim attached to the headline pick are wrong or shaky enough that the user could buy the wrong laptop on the strength of this report.

Re-research is not required — the bones are good — but at least 4 material objections must be fixed before the user reads this as final.

---

## Material objections (must address before finalizing)

### 1. The recommended SKU's "Ubuntu certified" claim is drift, not fact

Synthesis says (line 10):
> "Recommended pick: ThinkPad E14 Gen 6 (Intel Core Ultra 5 125U, model 21M700AGIG) at ~₹72,444 — Ubuntu-certified, vendor-published Linux user guide…"

And again (line 84):
> "Only model in this price band with **formal Ubuntu certification** + vendor-published Linux user guide."

Spot-check: `https://ubuntu.com/certified/202403-33875` (the cert linked from S27 / [C20]) is for the **Core Ultra 7 155H** SKU on **Ubuntu 22.04 LTS** with kernel 6.5.0-1022-oem. It is **not** a certification of the 125U SKU 21M700AGIG that the synthesis recommends. The 125U is a different chip (Meteor Lake-U packaging — base power 15W) on a different platform tier from the 155H (Meteor Lake-H, 28W, full Arc Xe-LPG iGPU). Ubuntu HW certification is per-configuration; the cert does not transfer between SKUs.

Suggested fix: downgrade the claim to "Ubuntu has certified a sibling 155H SKU; the 125U variant likely works but is not formally listed." Then either (a) recommend the 155H SKU as the certified pick, with a note that 14" 155H thermal-throttles 25% (already noted in C4 — which would then collide with this recommendation), or (b) keep the 125U pick and acknowledge the cert is sibling-level, not exact-SKU. Both are honest; the current text is not.

### 2. CPU/SKU confusion in the comparison matrix

Synthesis comparison table (lines 61–63) lists:

| ThinkBook 14 G7 IML | 21SJA0K9IG | **Core 5 210H** |
| ThinkBook 14 G7 ARP | 21MVA096IN | **Ryzen 7 7735HS** |

Spot-checks:

- **21SJA0K9IG** is actually **Intel Core Ultra 5 225U** (Arrow Lake-U) — confirmed via Smartprix India listing for the model code. It is not a Core 5 210H. The Core 5 210H is in a different model — the **ThinkPad E14 Gen 7 (21T9005SIG)** at ~₹89,990, which the synthesis does not surface at all.
- **21MVA096IN** ships with **Ryzen 5 7535HS** (per Lenovo.in product page, 91mobiles, mysmartprice, Swapna Infotech listings) — not Ryzen 7 7735HS. Different chip tier (6C/12T vs 8C/16T) and different iGPU (Radeon 660M, RDNA 2, vs 680M).

These are not nitpicks: the recommendation in the synthesis ("Best AMD pick if in stock") rests on the iGPU and CPU tier, both of which are wrong by one tier. And [C1] in claims.md praises "Radeon 780M" — but the actual SKU has 660M, two iGPU generations down.

Suggested fix: re-pull the SKU codes from Lenovo.in / Smartprix and align CPU + iGPU + price into a single internally consistent row. Add the ThinkPad E14 Gen 7 (21T9005SIG) as a new row — it is the closer fit to "Core 5 210H + 14" 16:10 + SODIMM" than what the synthesis currently lists, *if* it has SODIMM (verify).

### 3. The "ThinkPad E14 Gen 7 with Core 5 210H" was missed entirely

Search hit: `https://www.smartprix.com/laptops/lenovo-thinkpad-e14-21t9005sig-laptop-intel-ppd10xif5rln` — ThinkPad E14 Gen 7 (21T9005SIG), Intel Core 5 210H, 16GB, 512GB, 14" WUXGA IPS, India price visible. Also surfaces on techstoriesindia.in (same publisher the synthesis already uses for the E14 G6 price reference — they have a page for the Gen 7 too).

This is a 2025-released chip in an apparently-current SKU at a directly comparable price band. The plan in `plan.md` says India SKUs must be examined, but the synthesis only treats the E14 Gen 6 line. The Gen 7 needs at minimum to be acknowledged, with a dual-SODIMM/Linux-cert verdict — or explicitly ruled out with reason.

Suggested fix: add the E14 Gen 7 to the matrix with verified spec + Linux story. If it dual-SODIMMs, it likely supersedes the E14 Gen 6 as the primary recommendation.

### 4. Coverage of user's video-call requirement is absent and the headline pick has a known-bad webcam

The query mentions video calls explicitly. The synthesis discusses webcams nowhere. Spot-check on the ThinkPad E14 Gen 6 review at `noypigeeks.com/laptops/lenovo-thinkpad-e14-gen-6-review/` (surfaced via search): "the 720p webcam has terrible image quality, but it should be enough for online meetings… the webcam is pretty cheap." This is the recommended laptop. The user should not learn this after purchase.

Suggested fix: add a webcam row to the comparison matrix. Note that all the qualifying models (E14 G6, ThinkBook 14 G7) ship 720p HD or 1080p webcams of variable quality; the disqualified Pavilion Plus / Vivobook S / Inspiron 14 Plus mostly have 1080p IR webcams that are objectively better. This is part of the soldered-RAM tradeoff and should be presented as such, not omitted.

### 5. Internal contradictions about E14 G6 SODIMM count

`notes/4-india-market-form-factor.md` line 21 states E14 G6 has "single SODIMM + soldered" — directly contradicting `notes/2-ram-ssd-upgradability.md` which says "2x SODIMM DDR5" and the synthesis claim of "Dual SODIMM DDR5." The techstoriesindia.in fetch I just ran confirms 2× SODIMM, max 64GB (so notes/4 is wrong, notes/2 and synthesis are right) — but this contradiction inside the run was never reconciled. C41 also flags "ships single SODIMM in many SKUs — verify the dual-SODIMM SKU before purchase," compounding the confusion.

Suggested fix: pick a side and state it cleanly. If the truth is "the chassis has 2 slots but some SKUs ship with 1 stick populated and the other slot empty" — say so in those words. Don't use "single SODIMM in many SKUs" which conflates slot count with population count.

---

## Soft objections (consider)

- **Strix Point premature dismissal.** [C2] / [C16] rule out all Strix Point laptops because they solder LPDDR5x. But this treats the user's "user-upgradable RAM to 32GB minimum (SODIMM, not soldered LPDDR)" constraint as load-bearing on the *mechanism* (SODIMM) rather than the *outcome* (eventually owning a 32GB-capable laptop). A laptop that ships with 32GB soldered LPDDR5x technically satisfies the *outcome* — sufficient for the listed workload — but not the *mechanism*. Synthesis treats them as identical. They aren't. A short paragraph on "if you'd accept 32GB soldered at purchase, here's what opens up (Strix Point AMD Linux maturity + better webcams + better battery + lighter chassis)" would honor the user's underlying need.

- **"Most premium-feeling… all solder the RAM" is a feature, not a bug, for some buyers.** Synthesis line 73 frames soldered RAM purely negatively. But LPDDR5x soldered = lower power, longer battery life, smaller chassis, cooler under load. The argument for the SODIMM camp is upgradability + future-proofing; the argument against is real and should be named, not buried.

- **No "buy older, save money" angle.** The plan section D.4 says "Used market rough pricing guidance (only as a sanity check)." The synthesis's Open Question #4 says nothing about it. notes/4 line 116-117 mentions ThinkBook 15 12th-gen i7 at ₹57,798 on Amazon Renewed and 5th-10th gen ThinkPads at ₹15-30k from edify.club / whynew.in. A T480 / T490 / T14 Gen 1-2 with maxed RAM at ₹35-45k is a legitimate Linux-dev pick for someone with a desktop at home. The synthesis doesn't even acknowledge this option exists. The recommendation arrives at "buy new ₹72k" without comparing it to "buy used T490s, max RAM, ₹40k." An adversarial reviewer flags this as motivated reasoning toward the new-purchase recommendation.

- **"Buy strategy" math doesn't hold.** Synthesis line 92-94: "Buy 16GB / 512GB base. Add second 32GB SODIMM aftermarket → 48GB total (or replace both → 64GB) for ~₹6-8k." A 32GB DDR5-5600 SODIMM in India at Crucial / Kingston is closer to ₹10–14k retail in May 2026 (single stick), not ₹6–8k. And mixing a 16GB stick with a 32GB stick will run dual-channel asymmetric (3+1 layout), with the upper 16GB of the 32GB stick running single-channel — well-known to cost real perf. The claimed "48GB total" works but it's not free. A clean path is buy bare → throw away the 16GB stick → install 2×16GB or 2×32GB. The synthesis numbers should reflect this honestly.

- **Distro choice contradicts itself.** Line 47-48 in synthesis says "Ubuntu 24.04 LTS … is borderline … Fedora 41+ is the safer bet." Then line 103: "Distro: Fedora 41 (kernel ≥6.11) is the safe choice; Ubuntu 24.04 LTS works with HWE kernel 6.11 explicitly enabled." Both technically agree. But the "borderline" framing implies "don't use Ubuntu LTS" while the recommendation in the buy-strategy section presents Ubuntu HWE as fine. Pick one tone.

- **Arrow Lake-U Linux maturity is unaddressed.** The synthesis says "Avoid for Linux right now: Intel Core Ultra 200H 'Arrow Lake-H'" (line 25). But ThinkBook 14 G7 21SJA0K9IG ships with Core Ultra 5 225U which is Arrow Lake-U (the U-series sibling). If Arrow Lake-H has Linux driver gaps, Arrow Lake-U likely has the same iGPU/EC issues at slightly different points. The synthesis silently treats the ThinkBook 14 G7 IML as Linux-friendly without verifying this. (And as noted in objection 2, the synthesis got the chip family wrong in the first place.)

---

## Coverage gaps

- **Webcam quality** — covered above as material objection 4; user mentioned video calls explicitly.
- **Keyboard quality / typing feel** — ThinkPad E and ThinkBook lines diverge here; ThinkPad keyboard is the gold standard, ThinkBook keys are shallower with less travel. This matters for a daily-driver dev laptop.
- **Build quality / hinge** — ThinkPad E G6 is plastic-bottom + aluminum top (per noypigeeks), ThinkBook G7 is full aluminum, IdeaPad Slim 5 is aluminum, Inspiron 14 Plus is aluminum. The synthesis surfaces weight (1.42 kg, 1.38 kg) but no chassis material, no MIL-STD spec mentions, no hinge durability notes.
- **Battery life under Linux measured (not just Wh rating)** — the synthesis states 47 Wh / 60 Wh / 75 Wh ratings but never converts to "hours under Linux at real workload." [C24] hints at 5-7%/h drain on Intel s2idle suspend, but waking-state battery life is unaddressed.
- **Thermal noise under load** — none. ThinkBook G7 is widely reviewed as fan-noisy under sustained load; not mentioned.
- **Screen color gamut / accuracy** — synthesis lists nits but not gamut. The 14IRH10 OLED at 100% DCI-P3 (per notes/4) is a real upside that disappears in the synthesis. The E14 G6's 45% NTSC panel is *not* good enough for any color-sensitive work; user didn't say they need this, but this is the kind of constraint that should be surfaced not omitted.
- **Port selection** — neither HDMI version, USB-C PD wattage, Thunderbolt 4 vs USB4, nor presence/absence of Ethernet are tabulated. ThinkBook 14 G7 has TB4 + HDMI 2.1 (per a search result) — that's a genuine differentiator vs ThinkPad E14 G6's HDMI 1.4 / USB-C charging. Worth a row.
- **Warranty + India service network coverage** — Lenovo's onsite warranty in tier-1 cities vs HP/Dell vs ASUS is meaningfully different in India (Lenovo and Dell are denser; ASUS is patchier). For a 3+ year ownership horizon, this matters. Synthesis is silent.
- **Where to actually buy** — the report names retailers but doesn't say "Lenovo.in vs Amazon.in vs Croma — which has the cleanest return policy + bank discount stacks for this specific SKU." Acceptable to skip if scope-constrained, but flag as out-of-scope rather than silently omitting.

---

## Source-quality concerns

- **techstoriesindia.in (S77, where the headline ₹72,444 price comes from) is T2 at best, possibly T3.** It's a SEO-style India tech blog, not a primary retailer or established outlet. The synthesis cites it as the price authority for the recommendation. The Amazon.in product page (B0G3XT4GT5, surfaced via search) is the primary source and should be the one cited. As of this audit's spot-check, the techstoriesindia.in claim of ₹72,444 / MRP ₹91,440 is consistent with the Amazon listing search snippet, but the citation hygiene is loose.

- **Single-source pricing risk.** [C29] cites only [S77] and [S99] (Flipkart product pages, generic) for the ThinkPad E14 G6 price. Indian laptop prices fluctuate weekly with bank discounts and exchange offers. A second corroborating source (Lenovo.in own page or Vijay Sales / Croma) was not checked. notes/4 line 134 acknowledges "Did not verify Croma / Vijay Sales / Reliance Digital web catalogs directly with WebFetch (403/socket errors on multiple attempts)" — gap acknowledged but not closed.

- **Vendor-page reliance for "model availability and price" is a known weak link.** The Lenovo.in product page can show in-stock for an SKU that no retailer has actually sold for weeks. No conflict-of-interest here exactly, but no independent corroboration of stock either.

- **T3 sources used for material decisions.** [C24] (suspend drain) cites [S61] Qubes forum, [S91] Arch BBS, [S64] Fedora forum — all forum threads. The conclusion "5-7%/h Linux suspend drain" is a real pattern but the magnitude is forum-level testimony, not benchmarked. For a "buy strategy" output where battery life matters, this should be flagged as evidence-class T2/T3, not asserted as a number.

- **No source from Beebom / GeekyRanjit / IndianGaming / Dave2D / Linus** despite the plan listing them as T2. All Linux benchmarking is Phoronix on Western chassis. India-specific reviewer perspective is genuinely missing (notes/4 line 137 admits this).

- **`refurbo.in` (S25 in note 1, S84 in master sources) used for India dev-laptop guidance.** A new SEO blog. Acceptable as light corroboration, not as a load-bearing source. Synthesis appears to use it appropriately (light/none).

- **One source serves multiple distinct claims without independent corroboration.** [S99] "Flipkart product pages (item IDs in note 4)" is a bulk-citation that anchors C29 (E14 G6 price), C31 (Slim 5 14IRH10 price), C32 (Pavilion Plus price), C33 (Inspiron 7440 price), C34 (T14 G5 price), C38 (India SKU OLED). One generic citation for six distinct pricing claims is poor citation hygiene — each Flipkart product page should be its own sub-source.

---

## Spot-check results

- Claim "Lenovo ThinkPad E14 Gen 6 are Ubuntu-certified" verified against `https://ubuntu.com/certified/202403-33875`: **✗ drift detected** — the certification is for the Core Ultra 7 155H SKU on Ubuntu 22.04 LTS, not the recommended Core Ultra 5 125U SKU 21M700AGIG. Synthesis treats sibling-cert as exact-cert.

- Claim "ThinkPad E14 Gen 6 (21M700AGIG) at ~₹72,444 with 16GB DDR5 / 512GB SSD / 2× SODIMM up to 64GB / 2× M.2 slots" verified against techstoriesindia.in fetch: **✓ matches** — price, RAM config, 2 SODIMM slots, 64GB max, 1× M.2 2242 occupied + 1× M.2 2280 free, all confirmed by the source. This contradicts the claim in `notes/4` line 21 ("single SODIMM + soldered") — that note is wrong; the synthesis is right on this specific point.

- Claim "ThinkBook 14 G7 IML 21SJA0K9IG ships Intel Core 5 210H" verified against Smartprix search hit: **✗ drift detected** — 21SJA0K9IG is Intel Core Ultra 5 225U (Arrow Lake-U). The Core 5 210H is in a different model (ThinkPad E14 Gen 7, 21T9005SIG, ~₹89,990).

- Claim "ThinkBook 14 G7 ARP (21MVA096IN) Ryzen 7 7735HS / Radeon 780M" verified against Lenovo.in / 91mobiles / Swapna Infotech: **✗ drift detected** — 21MVA096IN is Ryzen 5 7535HS / Radeon 660M (RDNA 2). Two tiers off both on CPU tier and on iGPU generation.

- Claim "Core 5 210H is Raptor Lake-H, 8C/12T (4P+4E), 45W base / 115W turbo, Iris Xe Graphics 48EU" verified against Intel ark / TechPowerUp / NotebookCheck: **✓ matches** — the chip exists and the architecture is as described. The drift is which laptop ships it.

- Claim "ThinkPad E14 G6 webcam is fine for the user's needs (video calls)" — **not asserted in synthesis at all**, but spot-check against noypigeeks review: 720p, "terrible image quality." A material gap given the user's stated workload.

- Claim "Two laptops pass every hard constraint" (synthesis line 9) verified end-to-end against constraints in query.md: **partial** — the ThinkPad E14 Gen 6 (21M700AGIG) does pass all six hard constraints (14"+ ✓, no numpad ✓, 16:10 ✓, FHD+ ✓ (1920×1200), SODIMM ✓, ≤₹95k ✓ at ₹72,444). The Linux-friendliness pass is *sibling*-cert not exact-SKU cert (see objection 1). But the 21SJA0K9IG ThinkBook claim cannot be verified as "Core 5 210H" because the SKU is actually Core Ultra 5 225U — so the second laptop in the "two pass" list is described with the wrong CPU. Whether 225U is Linux-friendly is a separate question that hasn't been answered (Arrow Lake-U Linux maturity is unaddressed in the run).

---

## What would strengthen this report

1. **Reconcile the SKU codes.** Re-pull each row of the comparison matrix with one fetch per SKU to a primary source (Lenovo.in / Amazon.in / Flipkart product page) and align CPU + iGPU + price + 16:10 + SODIMM/soldered + M.2 count + India warranty into one consistent row. Right now the row labels, CPU labels, and prices are not internally consistent.

2. **Surface the ThinkPad E14 Gen 7.** It exists, it's in India, it has the Core 5 210H the synthesis already wants to recommend, and it might supersede the Gen 6 as the primary pick. At minimum acknowledge and rule in/out.

3. **Address the user's stated workload of video calls.** Add webcam quality to the comparison matrix and flag the E14 G6's poor 720p webcam as a known tradeoff. Suggest an external webcam if it's the chosen pick.

4. **Add real coverage of: keyboard typing feel, build/hinge, color gamut, port selection (TB4 vs USB4 vs USB-C-PD-only, HDMI version, Ethernet), India warranty/service.** These are the implicit "is this actually a good daily driver" questions that buyers will have and that the plan's source-tier list (notebookcheck, Phoronix, Geekyranjit, Beebom) is set up to answer — but the notes never queried for.

5. **Be honest about the "Ubuntu certified" claim.** State exactly which SKU is certified, on which Ubuntu version, with which kernel — and admit the recommended SKU inherits the cert by sibling-extrapolation, not by direct testing.

6. **Add a "buy used" alternative.** A maxed T490 / T14 Gen 1 from edify.club at ₹35–45k for a Linux dev laptop with home-desktop fallback is well within the spirit of the user's brief ("smart purchase, not cheapest"). Even if rejected, the rejection should be reasoned, not omitted.

7. **Tighten the "Buy strategy" math.** Real DDR5-5600 32GB SODIMM prices in India + the asymmetric dual-channel cost of mixing a 16GB and a 32GB stick → spell out the cleanest upgrade path and its true cost.

8. **Reconcile the contradiction between notes/4 ("single SODIMM + soldered" for E14 G6) and notes/2 ("2× SODIMM DDR5") and synthesis ("Dual SODIMM DDR5").** notes/4 is wrong per the techstoriesindia.in fetch; pick one truth and propagate it.

9. **Get one Indian-reviewer source.** GeekyRanjit / Beebom / Indian Tech Reviews on the ThinkPad E14 G6 or ThinkBook 14 G7 — even one Indian-context dogfooding source would harden the recommendation. The plan called for this; the run didn't deliver.

10. **Tier the Wi-Fi / Bluetooth chipset risk per recommended SKU.** The synthesis says "confirm Intel AX211 SKU at purchase. Avoid Realtek-WLAN SKUs if Lenovo offers a choice." But Lenovo doesn't offer the buyer a WLAN-card choice on the E14 G6 21M700AGIG retail SKU — it ships what it ships. Verify which chipset the Indian retail SKU actually has and state it concretely, not as a buyer-facing instruction.
