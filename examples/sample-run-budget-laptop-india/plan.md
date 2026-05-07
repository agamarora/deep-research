# Research plan — budget-laptop-india-linux-dev

## Restated query

Find 2026 Indian-market laptops that:
1. Have a CPU sufficient for web/mobile/light-ML dev work (no dGPU needed).
2. Have **user-upgradable** RAM to ≥32GB (rules out soldered LPDDR4X/LPDDR5/LPDDR5x).
3. Have user-upgradable SSD (≥1 M.2 slot, ideally 2).
4. Run Linux cleanly (Wi-Fi, BT, sleep, touchpad, fingerprint optional).
5. Are 14"+ screen, no numpad, 16:10 preferred, FHD+ resolution.
6. Are buyable in India (Flipkart/Amazon.in/Croma/Vijay Sales/Lenovo.in/etc.).

## Complexity tier

**Comparison** (per Anthropic scaling) — 4 sub-questions, 10-15 tool calls per agent. Multiple unknowns intersect (CPU + upgradability + Linux + Indian SKUs), each independent enough to parallelize.

## Sub-questions (4 parallel agents)

### A. CPU recommendation for Linux dev (no dGPU)
Which 2025-2026 mobile CPUs hit the right perf/watt/price sweet spot for web + mobile + light-ML dev on Linux?
- Intel: Core 5/7 200-series (Meteor Lake / Arrow Lake), Core Ultra 5/7 200V/200H, older 12-13th gen still in budget Indian SKUs.
- AMD: Ryzen 5/7 7xxx series (Phoenix), Ryzen AI 300 (Strix Point), older Ryzen 5/7 5000/6000.
- Linux compat notes per chip family (e.g. Intel Arc iGPU drivers, AMD RDNA3 iGPU).
- iGPU adequate for daily dev work + light video?
- U vs H series tradeoff for thermals in cheap chassis.

### B. RAM/SSD upgradability landscape — 2026
Which currently-shipping budget/mid laptop chassis in India still offer:
- SODIMM DDR5/DDR4 slots (1x or 2x) vs soldered LPDDR.
- 1x or 2x M.2 NVMe slots (PCIe 4.0 preferred but 3.0 acceptable).
- Realistic upgrade ceiling — many "32GB max" specs are conservative; community-validated higher caps?
List 8-12 specific model lines (Lenovo IdeaPad/ThinkBook, HP Pavilion/ProBook, ASUS Vivobook, Acer Aspire/Swift, Dell Inspiron/Vostro, MSI Modern, Mi/Redmi, Realme).

### C. Linux compatibility on budget Indian laptops
Specific known-good and known-bad models for Linux (Ubuntu 24.04 LTS, Fedora 41, Pop!_OS):
- Wi-Fi/Bluetooth chipset compat (MediaTek MT7922, Realtek RTL8852, Intel AX211).
- Touchpad (Synaptics/Elan firmware quirks).
- Sleep/suspend (s2idle vs S3 issues on modern Intel).
- Fingerprint reader (often unsupported, optional).
- 16:10 panel + brightness controls.
- Reference: linux-laptop.net, ArchWiki, /r/linuxhardware threads, vendor-validated lines (Lenovo with Ubuntu certification).

### D. Indian market — model availability + form factor + price reality
14"+ no-numpad 16:10 FHD+ models actually shipping in India in May 2026:
- Real prices on Flipkart, Amazon.in, Croma, Vijay Sales, Reliance Digital.
- Distinguish India SKUs from US/EU SKUs (often different RAM/SSD config + sometimes different motherboard).
- Refurb/open-box channels (Amazon Renewed, Flipkart Refurbished, Croma open-box).
- Used market rough pricing guidance (only as a sanity check).
- Highlight 16:10 panels — most Indian budget SKUs are 16:9; 16:10 is often a step-up.

## Source-quality bar

- T1: vendor spec sheets (lenovo.in, hp.com, asus.com, dell.com), iFixit teardowns, NotebookCheck reviews, Phoronix Linux benchmarks.
- T2: established reviewers (Linus Tech Tips, Dave2D, Hardware Canucks for global; Geekyranjit, Beebom, Tech Burner for India), community-validated upgrade reports (r/SuggestALaptop, r/linuxhardware, IndianGaming), Phoronix forums.
- T3: SEO listicles, anonymous YouTube reviews, AI-generated content. Use sparingly with explicit flag.

## Disqualifying conditions

A model is dropped from the shortlist if **any** of these fail:
- Soldered RAM (LPDDR4X/LPDDR5/LPDDR5x).
- No M.2 slot.
- Confirmed Linux Wi-Fi/sleep regression with no known fix.
- Numpad keyboard.
- Below FHD or 16:9 only with no 16:10 option.
- Below 14" screen.
- Not listed on any major Indian retailer.

## Output spec

- `notes/1-cpu-recommendation.md`
- `notes/2-ram-ssd-upgradability.md`
- `notes/3-linux-compat.md`
- `notes/4-india-market-form-factor.md`
- `sources.md` — deduped, T1/T2/T3 tiered
- `claims.md` — atomic claims with [S<n>] refs
- `synthesis.md` — TL;DR + per-sub-question findings + comparison matrix + recommendation + open questions
- `audit.md` — critic verdict + citation audit
- `meta.json` — run metadata
