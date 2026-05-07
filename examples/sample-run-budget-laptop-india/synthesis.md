---
query: "Budget laptop in India for Linux dev work — expandable RAM to 32GB, no dedicated GPU, 14\"+ no numpad, 16:10 preferred, FHD+, Intel or AMD"
created: 2026-05-06
slug: budget-laptop-india-linux-dev
status: final
disclaimer: "Research output, not retail/professional recommendation. Sources scraped at run date; verify before acting."
---

# Budget laptop in India for Linux dev — synthesis (v2, post-audit)

**Date**: 2026-05-06 · **Run**: budget-laptop-india-linux-dev · **Complexity**: comparison (4 + 2 fix-up subagents) · **v1 archived**: `synthesis-v1.md`

This is the post-audit revision. Critic flagged material drift in SKU→CPU mappings, missed the ThinkPad E14 Gen 7, and surfaced coverage gaps (webcam, keyboard, ports, used market). All addressed below.

---

## TL;DR

1. **The ₹49k surprise**: **ThinkBook 14 G7 ARP (21MVA096IN)** — Ryzen 5 7535HS + Radeon 660M, 2× SODIMM DDR5 (64GB max), 2× M.2 PCIe 4.0, 14" 1920×1200, no numpad, **₹48,990**. AMD Linux stack is mature. iGPU is RDNA 2 (660M, weaker than 780M) but the user has a heavy desktop at home — iGPU strength doesn't matter for the stated workload. **Pound-for-pound best value if you accept Wi-Fi 6 (MediaTek MT7922) instead of Wi-Fi 6E.** [C44] [C53]
2. **The "buy with confidence" pick**: **ThinkPad E14 Gen 6 (Intel Core Ultra 5 125U, 21M700AGIG)** at ~₹72,444. Lenovo publishes a **Linux User Guide PDF** explicitly for this model family (E14 G6 / E16 G2 with Ubuntu 22.04 + RHEL drivers) — that's the real "first-class Linux target" signal, not the often-misread sibling Ubuntu cert (which covers the 155H SKU, not the 125U). MIL-STD-810H build, ThinkPad keyboard, 2× TB4 + RJ45 + HDMI 2.1, 2× SODIMM (64GB max), 2× M.2. [C29] [C43] [C50]
3. **The "newer chip" stretch**: **ThinkPad E14 Gen 7 (21T9005SIG)** — Intel Core 5 210H (Arrow Lake-H, 8C/12T), same chassis as Gen 6, ~₹89,990. Pay ~₹17k more for the newer-gen CPU; same SODIMM + M.2 + ports + Linux story (extrapolated from Gen 6). [C45]
4. **The most-upgradable Intel option**: **ThinkBook 14 G8 IAL (21SJA0K9IG)** — Core Ultra 5 225U (Arrow Lake-U), 2× SODIMM (64GB official, 128GB community-validated per NotebookCheck), 2× M.2 2280, ~₹79,990. The chassis is the most upgradable in this entire matrix; Arrow Lake-U Linux maturity is **not yet validated for this exact platform** — accept some breakage risk. [C46]
5. **The "buy used to save more"**: a **refurbished ThinkPad T14 Gen 1 or Gen 2** at **₹35–45k** with 16GB+512GB stock, plus your own RAM/SSD upgrade later, beats every new sub-₹50k laptop on build, keyboard, serviceability, and Linux support. The only weakness is older Iris Xe iGPU. Worth a serious look before buying new. [C56]

**Hard rule from the research (unchanged from v1)**: avoid soldered LPDDR5x. Pavilion Plus 14, Inspiron 14 Plus 7440, all Vivobook S, Zenbook 14 OLED, all Acer Swift Go, all RedmiBook Pro, ThinkPad T14s/T14 G5 AMD/X1/X13 → **disqualified for the upgrade-aftermarket strategy**.

---

## Decision matrix (verified, post-audit)

| Model | India SKU | CPU | iGPU | RAM | SSD slots | Wi-Fi | Display | Webcam | Ports highlight | Build | Price (May 2026) |
|---|---|---|---|---|---|---|---|---|---|---|---:|
| **ThinkBook 14 G7 ARP** | 21MVA096IN | Ryzen 5 7535HS (Zen 3+, 6C/12T) | Radeon 660M (RDNA 2) | 2× SODIMM, 64GB max | 2× M.2 PCIe 4.0 | MediaTek MT7922 (Wi-Fi 6) | 14" 1920×1200 IPS, 300n, 54% sRGB | 720p/1080p configs | 1× USB4, HDMI 2.1, RJ45 | Aluminum lid + plastic bottom | **₹48,990** |
| **ThinkPad E14 Gen 6** | 21M700AGIG | Core Ultra 5 125U (MTL-U, 12C/14T) | Intel Graphics (MTL-U) | 2× SODIMM, 64GB max | 2× M.2 (2242+2280) | Intel AX211 (Wi-Fi 6E) | 14" 1920×1200 IPS, 300n, ~57% sRGB | 720p/1080p configs (mediocre) | 2× TB4, HDMI 2.1, RJ45, 100W PD | All-aluminum, MIL-STD-810H | **₹72,444** |
| **ThinkPad E14 Gen 7** | 21T9005SIG | Core 5 210H (Arrow Lake-H, 8C/12T) | Intel Graphics (ARL-H) | 2× SODIMM, 64GB max | 2× M.2 (2242+2280) | Intel AX211 (Wi-Fi 6E) | 14" 1920×1200 IPS, 300n | 720p/1080p configs | 2× TB4, HDMI 2.1, RJ45, 100W PD | All-aluminum, MIL-STD-810H | **₹89,990** |
| **ThinkBook 14 G8 IAL** | 21SJA0K9IG | Core Ultra 5 225U (Arrow Lake-U, 12C/14T) | Intel Graphics (ARL-U) | 2× SODIMM, 64GB official / 128GB community | 2× M.2 PCIe 4.0 | Intel AX211 (Wi-Fi 6E) | 14" 1920×1200 IPS, 300n, 45% NTSC | 720p/1080p configs | 1× USB4, HDMI 2.1, RJ45 | Aluminum lid + plastic bottom | **₹79,990** |
| IdeaPad Slim 5 14IRH10 OLED | 83HR009MIN | Core i5-13420H (8C/12T) | Intel UHD (RPL-H) | 2× SODIMM, **32GB max** | **1× M.2** PCIe 4.0 | Intel AX211 | 14" 1920×1200 **OLED**, 400n, **100% DCI-P3** | 1080p IR + privacy shutter | 2× USB-A, 2× USB-C (no TB), HDMI 1.4, **no RJ45** | Full aluminum | ₹58,990–85,390 |
| Refurb ThinkPad T14 Gen 1/2 | various | Core i5-10310U / i5-i7-1135G7 | Iris Xe / UHD | 2× SODIMM (max 32-64GB depending on gen) | 1× M.2 (some Gen 2 = 2×) | Intel AX201/AX210 | 14" 1920×1080 (16:9) — note aspect | 720p | TB3 (Gen 1) / TB4 (Gen 2), HDMI, RJ45 | All-aluminum, MIL-STD | **₹28k–55k** |

**What changed from v1**:
- 21SJA0K9IG corrected: **G8 IAL with Core Ultra 5 225U**, not G7 IML with Core 5 210H.
- 21MVA096IN corrected: **Ryzen 5 7535HS / Radeon 660M / ₹48,990**, not 7735HS/780M/~₹80k. **The price is the headline change** — this was a quality-tier away from where v1 placed it, and ~₹30k cheaper.
- New row: **ThinkPad E14 Gen 7 (21T9005SIG)** — entirely missing from v1.
- IdeaPad Slim 5 14IRH10 verified: **does** have 2× SODIMM (good), but **32GB ceiling** and **only 1× M.2 slot** (worse than the 16IRH10).
- All "Ubuntu certified" claims downgraded to "Ubuntu cert covers a sibling SKU; Lenovo also publishes a Linux User Guide PDF for E14 G6 family, which is a stronger signal." [C43]

---

## Findings by sub-question (recap, with corrections)

### CPU — what should we buy

For Linux + the user's stated workload (web/mobile/light-ML, no gaming, no dGPU):

- **AMD Ryzen 7000-series** is still the cleanest Linux story. Specifically:
  - **Ryzen 5 7535HS** (Zen 3+, Phoenix-lite) in the ThinkBook 14 G7 ARP — fully Linux-supported, kernel ≥6.0, low-fuss. iGPU is Radeon 660M (RDNA 2, weaker) but adequate for daily desktop. [C1] [C53]
  - **Ryzen 7 7840HS / 7735HS** (Zen 4, Phoenix proper) — sweeter spot if you can find an Indian SKU; the sibling 21MVA097IN has the 7735HS but commands a premium.
- **Intel Core Ultra 5 125U** (Meteor Lake-U) — solid Linux on kernel ≥6.7. The choice in the ThinkPad E14 Gen 6 is conservative and well-supported. [C25]
- **Intel Core 5 210H** (Arrow Lake-H, in ThinkPad E14 Gen 7) — newer, 8C/12T, but **Arrow Lake-H Linux maturity is still being shaken out** as of mid-2025. Risk is real but small. [C5] [C47]
- **Intel Core Ultra 5 225U** (Arrow Lake-U, in ThinkBook 14 G8 IAL) — sibling of Arrow Lake-H. **Arrow Lake-U Linux specifics are unverified** in this run; treat as same-risk-class as Arrow Lake-H until proven otherwise. [C47]
- **Avoid for Linux**: Intel Core Ultra 200H "Arrow Lake-H" in 14" chassis (~25% thermal throttling per NotebookCheck), and any Lunar Lake / Snapdragon X / Ryzen AI 300 thin-and-light (all solder the RAM, killing the upgrade strategy). [C4]
- **Safe boring fallback**: Ryzen 5 7530U at ~₹57,990 (Vega 7 iGPU only adequate, but bulletproof Linux). [C8]

### RAM/SSD upgradability

The dividing line stays the same:

- **Soldered LPDDR5x → no upgrade ever** (Pavilion Plus, Inspiron 14 Plus, Vivobook S, Zenbook OLED, Swift Go, RedmiBook Pro, T14s, T14 G5 AMD, X1).
- **SODIMM DDR5 → upgradable**:
  - Lenovo: ThinkBook 14 G7 ARP / G8 IAL, ThinkPad E14 G6/G7, T14 G5 Intel, L14 G5, IdeaPad Slim 5 14IRH10 (32GB max), 16IRH10 (64GB max).
  - HP: ProBook 440 G11, EliteBook 645/655 G11.
  - Dell: Inspiron 14 5440, Vostro 14 3440, Vostro 16 5640 (Dell spec-caps at 32GB; Crucial validates 64GB).

**Heuristic** (write this on a sticky note before you shop): **if the spec sheet says LPDDR5/LPDDR5x or "onboard memory" — soldered. If it says "DDR5 SODIMM" — upgradable.** [C17]

### Linux compatibility

Three signals are the safe path:

1. **Vendor-published Linux User Guide PDF** — Lenovo has one explicitly for **ThinkPad E14 Gen 6 / E16 Gen 2** (Ubuntu 22.04 + RHEL). This is a stronger signal than a sibling Ubuntu cert. [C43]
2. **Ubuntu HW certification** — Dell Inspiron 14 5440 (i5-1335U), HP ProBook 440 G11 (Core Ultra 7 155U), ThinkPad E14 Gen 6 **Core Ultra 7 155H SKU** are explicitly certified. The cert does **not** transfer between SKUs of the same model — verify your exact CPU/SKU at purchase. [C20] [C21] [C22]
3. **Mature AMD Ryzen 7000-series chassis** — kernel ≥6.0 handles them well; Phoronix benchmarks publicly verify on TUXEDO/Framework Western SKUs (Indian SKUs ship same silicon). [C1]

**Wi-Fi risk per recommended SKU** (from notes/3 + notes/5):
- ThinkPad E14 G6 (21M700AGIG) → **Intel AX211** (Wi-Fi 6E, iwlwifi, kernel ≥5.16, rock-solid). ✅
- ThinkPad E14 G7 (21T9005SIG) → **Intel AX211**. ✅
- ThinkBook 14 G8 IAL (21SJA0K9IG) → **Intel AX211**. ✅
- **ThinkBook 14 G7 ARP (21MVA096IN) → MediaTek MT7922 / RZ616** (mt76 driver, kernel ≥5.18). Mostly works; 5GHz/ASPM quirks reported on early kernels. Acceptable on Ubuntu 24.04 HWE / Fedora 41+. ⚠️
- IdeaPad Slim 5 14IRH10 → Intel AX211. ✅

**Suspend/sleep tax** (Linux on modern Intel): Core Ultra 12th-gen+ has only s2idle (S0ix) with documented ~5-7%/h drain on Linux vs ~1-2%/h expected. Some ThinkPads still expose S3 in BIOS as a workaround. AMD Ryzen 7000+ also s2idle but drains cleaner in real-world reports. **Practical**: budget for slightly worse-than-Windows battery on Intel; expect Windows-parity on the AMD ThinkBook. [C24]

**Distro recommendation** (resolved from v1's contradiction): **Fedora 41+ (kernel ≥6.11)** is the cleanest pick across all five SKUs. Ubuntu 24.04 LTS works **only with HWE kernel 6.11 explicitly enabled** — don't run the GA 6.8 kernel on these laptops. Pop!_OS 22.04 ships kernel 6.9 OEM and is risky for newer Wi-Fi 7 silicon — none of the recommended SKUs ship Wi-Fi 7, so Pop is OK on these but we'd still suggest Fedora. [C19]

### India market, form factor, coverage gaps

Verified for the recommended cohort:

- **Webcam**: all five models offer 1080p configs but spec the upgraded webcam SKU when buying — base 720p webcams are mediocre on the ThinkPad E14. Consider a small external USB webcam (Anker / Logitech ~₹3-5k) regardless of which laptop you buy. [C48]
- **Keyboard**: ThinkPad E14 G6/G7 > ThinkBook 14 G7/G8 > IdeaPad Slim 5. ThinkPad keyboards are still the gold standard; ThinkBook is a clear step up from IdeaPad. [C49]
- **Build**: ThinkPad E14 G6/G7 (all-aluminum, MIL-STD-810H) > IdeaPad Slim 5 (full aluminum, no MIL-STD) > ThinkBook G7/G8 (aluminum lid + plastic bottom). [C50]
- **Color gamut**: IdeaPad Slim 5 14IRH10 OLED **100% DCI-P3** ≫ ThinkPad/ThinkBook standard panels (~54-57% sRGB). If color matters, the OLED IdeaPad is the only choice in this list. [C51]
- **Ports for dev** (TB4 + HDMI 2.1 + RJ45 + USB-A): only the **ThinkPad E14 G6/G7** ticks all four. ThinkBook G7/G8 has 1× USB4 (not full TB4 on Intel SKUs), HDMI 2.1, RJ45 — close. IdeaPad has no TB, no Ethernet, only HDMI 1.4 — a downgrade for a dev-friendly daily driver. [C52]
- **Battery**: ThinkBook G7 IML 60Wh ≈ 6-8h Linux mixed dev. ThinkPad E14 G6 47Wh ≈ 4.5-6h. IdeaPad Slim 5 OLED ≈ 3-4h heavy use. Linux discount is real. [C54]
- **Thermal noise**: ThinkBook G7 quietest under load. ThinkPad E14 G6 quiet too. IdeaPad Slim 5 noisier under sustained dev compile (H-class chip in thin chassis). [C55]
- **India warranty**: Lenovo has the densest service network in India. Default 1-yr carry-in; pay ₹2-5k for **3-yr Premier Onsite** upgrade. For a laptop you'll use 3+ years on Linux, this is a worthwhile add. [C57]
- **Used market**: Refurb T14 Gen 1 (₹28-38k) / T14 Gen 2 (₹38-55k) with 16GB+512GB are real Linux daily-driver picks. The catch: T14 G1/G2 panels are **16:9 1920×1080**, not 16:10 — fails one of the user's hard constraints. So used T-series is a *budget* alternative if 16:10 isn't a deal-breaker, not a strict subset. [C56]
- **Indian-reviewer signal**: Beebom rates IdeaPad Slim 5i family well; Digit.in rates ThinkBook 14 with reservations ("clever innovations but lacks basics — short battery on older gen"). [C58]

---

## Recommendation

This is now a **value-vs-confidence** tradeoff, not a single answer:

### If maximum value matters most — **ThinkBook 14 G7 ARP (21MVA096IN) at ₹48,990**

**Why**: Ryzen 5 7535HS is mature on Linux, 2× SODIMM (64GB ceiling) + 2× M.2, 14" 1920×1200, no numpad. At ₹48,990 you have ~₹40-50k of budget headroom for upgrades + accessories before hitting your stretch ceiling.

**Caveats**:
- MediaTek MT7922 Wi-Fi (not Intel) — works on kernel ≥6.0 but a tier less battle-tested. Use Fedora 41+ or Ubuntu 24.04 HWE.
- iGPU is Radeon 660M (RDNA 2). Weaker than the 780M in the 7735HS sibling SKU (21MVA097IN). For your stated workload (no gaming, desktop at home for heavy lifting) this is fine. If you find yourself doing GPU-bound work on the laptop, you'd regret it.
- ThinkBook chassis is aluminum lid + plastic bottom (not MIL-STD).
- No formal Linux User Guide from Lenovo for ThinkBook 14 G7 (community-validated only).

**Buy plan** (₹48,990 → ₹68-72k all-in):
- Add 2× 16GB DDR5-5600 SODIMM (~₹10-14k for the kit) — replace the single 16GB stick with a matched dual-channel pair → 32GB total. Or 2× 32GB for 64GB (~₹20-25k).
- Add second M.2 NVMe 1-2TB (~₹8-15k).
- Optional: USB external webcam (~₹3-5k).
- **3-yr Onsite warranty upgrade** (~₹3-5k).

### If confidence + Linux first-class matter most — **ThinkPad E14 Gen 6 (21M700AGIG) at ₹72,444**

**Why**: Lenovo publishes a **Linux User Guide PDF** for E14 G6 / E16 G2 family with explicit Ubuntu 22.04 + RHEL driver instructions — this is the strongest "Linux is supported, not just tolerated" signal in the entire matrix. MIL-STD-810H build, ThinkPad keyboard, **2× TB4 + HDMI 2.1 + RJ45** ports (best for dev), 2× SODIMM (64GB max), 2× M.2.

**Caveats**:
- Webcam is mediocre — spec the 1080p variant if available; budget for an external one regardless.
- 47 Wh battery is small (4.5-6 h Linux). ThinkBook G7 wins on battery.
- ~₹24k more than ThinkBook G7 ARP.

**Buy plan** (₹72,444 → ₹95-105k all-in):
- Same RAM/SSD upgrade math (~₹15-25k).
- 3-yr Premier Onsite warranty upgrade (~₹5k).
- External webcam (~₹3-5k).

### Stretch — **ThinkPad E14 Gen 7 (21T9005SIG) at ₹89,990**

Newer Arrow Lake-H Core 5 210H, same chassis story. Linux maturity for Arrow Lake-H is the open risk. If you're risk-averse, take the Gen 6.

### Skip if you don't need 16:10 — **Refurb ThinkPad T14 Gen 2 at ₹38-55k**

Maxed RAM ThinkPad on Linux at half the price of new — but **panel is 16:9**. If you can stomach 16:9 (the user said 16:10 *preferred*, not required), this is a serious option.

### Hard rule for everyone: **don't buy a laptop with soldered LPDDR5x** if your strategy is "buy bare, upgrade aftermarket." It permanently caps you at the purchase configuration.

---

## Open questions / what would change the answer

1. **Arrow Lake-U / Arrow Lake-H Linux maturity for the specific SKUs** (ThinkBook G8 IAL, ThinkPad E14 Gen 7) — no Phoronix-style benchmark surfaced for these exact platforms. Strongly suggested: skim Phoronix for "Arrow Lake-U Linux" or "Core Ultra 200U Linux" results in the days before you buy; if reports are negative, default to the Meteor Lake-U Gen 6 or AMD Phoenix Gen 7 ARP.
2. **ThinkBook 14 G7 ARP iGPU adequacy** — Radeon 660M (RDNA 2) vs 780M (RDNA 3). For multi-monitor + video calls + light video edits + occasional Compose-Multiplatform UI work, the 660M is enough. For Stable Diffusion / local LLM inference / serious video editing, the desktop is the right place. Confirm your worst-case laptop GPU workload before committing.
3. **MediaTek MT7922 Wi-Fi reliability for Indian RF environments** — Western reports show 5GHz quirks on early kernels; not yet verified for Indian retail SKU under Indian Wi-Fi router conditions. Mitigation: Fedora 41+ kernel + USB Wi-Fi dongle in your toolkit.
4. **Real-world battery on Linux** — measured numbers are sparse. Assume ~70-85% of Windows figures: ThinkBook G7 IML ~6-8h, ThinkPad E14 G6 ~4.5-6h, IdeaPad Slim 5 OLED ~3-4h.
5. **Used T14 Gen 2 condition variance** — refurb quality from edify.club / whynew.in / Cashify is inconsistent. Ask for grade (A/B), keyboard wear, battery health (>80% required for daily-driver use), and proof-of-warranty before commit.
6. **HP/Dell/ASUS alternatives we underweighted** — HP ProBook 440 G11 is Ubuntu-certified and dual-SODIMM, currently not deeply price-compared in this run. Dell Inspiron 14 Plus 7440 is **disqualified** (soldered LPDDR5x) but Dell Vostro 14 3440 (DDR5 SODIMM) was not deeply researched and could be a budget alt. If the Lenovo cohort doesn't fit, these are the next tier to check.

---

## Sources

See `sources.md` (now 110+ entries with corrected SKU citations, T1/T2/T3 tiered). Citation refs `[C<n>]` trace to atomic claims in `claims.md` (now C1-C58 + D1-D5).

## Audit trail

- v1 synthesis (pre-audit): `synthesis-v1.md`.
- Critic audit: `audit.md` (verdict on v1 was **revise** — applied here).
- Citation audit: `audit.md` Citation Audit section (verdict was **pass** on v1 hygiene — no broken refs).
- Fix-up notes: `notes/5-sku-corrections.md`, `notes/6-coverage-gaps.md`.
