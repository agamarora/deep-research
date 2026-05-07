# Sub-question 2: RAM/SSD upgradability landscape (May 2026)

## Answer (TL;DR)

- The **Lenovo ThinkBook 14/16 G7** and **ThinkPad E14/E16 Gen 2** lines are the gold-standard "low base, upgrade aftermarket" budget chassis available in India: **2x DDR5 SODIMM (up to 64GB officially, AMD variants run at 4800 vs Intel's 5600 MT/s)** plus **2x M.2 PCIe 4.0** slots. Buy 8/16 GB + 256/512 GB now, double both later.
- **ThinkPad T14 Gen 5 Intel** also retains 2x SODIMM (64GB official) — but **T14s Gen 5** and **T14 Gen 5 AMD** ship soldered LPDDR5x (32GB cap, no upgrade). Spec sheet is the only way to tell them apart at a glance.
- **HP ProBook 440 G11** and **EliteBook 645/655 G11** keep 2x SODIMM DDR5 (HP officially caps 440 G11 at 32GB but community reports ship 2x32GB = 64GB on some BIOS revisions; 645 G11 documents 64GB officially).
- **Dell Inspiron 14 5440 / 16 5640 / Vostro 14 3440** retain 2x DDR5 SODIMM and accept 2x32GB = 64GB per memory-vendor compatibility lists despite Dell's spec sheet listing 32GB max — practical 64GB is well-validated.
- **Soldered-RAM trap list** (LOOKS like a budget pick, isn't upgradable): all **Acer Swift Go 14**, **Xiaomi RedmiBook Pro 14/16**, **most Lenovo IdeaPad Slim 3/5 Intel Core Ultra V-series and AMD U-series** SKUs sold in India 2024-25, **HP Pavilion Plus / OmniBook Ultra** Core Ultra variants, ASUS Vivobook S 14/16 OLED Core Ultra/Snapdragon X, ThinkPad T14s/X1 line.

## Findings — model line by model line

### Lenovo ThinkBook 14 G7 (IML / ARP) — best-in-class budget upgradable

- **RAM**: **2x SODIMM DDR5**, dual-channel. IML (Intel Core Ultra 5/7-1xxU) runs **DDR5-5600**; ARP (Ryzen 5/7 7000-series) runs **DDR5-5600** (sometimes spec'd 4800 in datasheet). Official max: **64GB**. Community-validated 2x32GB works. Crucial and Kingston both list compatible 64GB kits.
- **SSD**: **2x M.2 NVMe PCIe 4.0 x4**. Stock SSD on some SKUs is M.2 2242; the second slot is full-length **2280** (Lenovo explicitly markets "user self-expansion" of the second slot).
- **CPU options in India**: Core Ultra 5 125U / 7 155U (IML); Ryzen 5 7535HS / 7 7735HS (ARP).
- **Source**: psref.lenovo.com (PSREF spec PDF), crucial.com compatibility tool.
- **Confidence**: high.

### Lenovo ThinkBook 16 G7 (IML / ARP)

- **RAM**: 2x SODIMM DDR5-5600 (IML) / DDR5-4800 (ARP), max **64GB**.
- **SSD**: **2x M.2 PCIe 4.0** (one 2242 + one 2280).
- **Source**: psref.lenovo.com PSREF, parts-quick / crucial.com.
- **Confidence**: high.

### Lenovo ThinkPad E14 Gen 6 / E16 Gen 2 (Intel Core Ultra & AMD Ryzen 7000-series)

- **RAM**: **2x SODIMM DDR5**. Intel: DDR5-5600. AMD: DDR5-4800. Max **64GB** (memorystock.com explicitly: "you can upgrade your Lenovo ThinkPad E14 Gen 6 Laptop to up to a maximum memory capacity of 64GB").
- **SSD**: **2x M.2** — one PCIe 4.0 2280 main + one PCIe 4.0 2242 secondary.
- **Gotcha**: Older E14 **Gen 5** had **1x SODIMM + 8/16GB soldered** (max 48GB hybrid). Gen 6 dropped soldered RAM in favor of clean dual-SODIMM. Ensure you're buying Gen 6 / E16 Gen 2 not Gen 5.
- **Source**: xda-developers teardown of E14 Gen 5; memorystock.com / crucial.com for Gen 6.
- **Confidence**: high.

### Lenovo ThinkPad L14 Gen 5 / L16 Gen 5

- **RAM**: **2x SODIMM DDR5-5600**, max **64GB official, 96GB possible** per CPU memory controller (mrmemory.co.uk lists 96GB compatibility for L16 Gen 5).
- **SSD**: 1x M.2 2280 PCIe 4.0 (single slot — minus vs E-series).
- **Source**: psref ThinkPad_L14_Gen_5_AMD_Spec.pdf, computercompatibility.com L-series guide.
- **Confidence**: high (RAM); medium (96GB unofficial cap).

### Lenovo ThinkPad T14 Gen 4 / Gen 5 (Intel only — AMD is soldered)

- **RAM**: T14 Gen 5 Intel: **2x SODIMM DDR5-5600**, **64GB max**. ThinkPads forum thread "T14 G5 and T16 G3 have two SO-DIMM slots again" confirms Lenovo reverted from prior Gen-4 hybrid soldered+SODIMM design.
- **SSD**: 1x M.2 2280 PCIe 4.0.
- **AVOID**: **T14 Gen 5 AMD** = soldered LPDDR5x, 32GB cap, **not upgradable**. **T14s Gen 5** = soldered LPDDR5x-6400, 16/32GB, **not upgradable**.
- **Source**: thinkpads.com forum, crucial.com, Lenovo PSREF.
- **Confidence**: high.

### Lenovo IdeaPad Slim 5 16IRH10 / 16IRL8 (Intel HX/H-series 16-inch only)

- **RAM**: 2x SODIMM DDR5-5600 on the **16IRH10** (Core 7 240H), max **32GB official, 64GB community-confirmed** via Crucial. The **16IRL8** (Core i7-1355U / 1335U) has SODIMM but max 16GB on-board for some SKUs.
- **SSD**: 1x or 2x M.2 NVMe PCIe 4.0 depending on SKU.
- **AVOID**: **IdeaPad Slim 5 14"** Intel Core Ultra V-series and **Slim 3 14/15** with Core Ultra/Core 5 120U variants ship soldered LPDDR5. Lenovo PSREF for Slim 3 15AMN8 explicitly shows soldered LPDDR5-5500.
- **Confidence**: medium-high (depends heavily on exact PSREF code).

### HP ProBook 440 14" G11

- **RAM**: **2x SODIMM DDR5-5600**. HP QuickSpecs c08915500 caps spec at **32GB (2x16GB)**, but Crucial/A-Tech list 64GB kits as compatible and an HP Support Community thread (id 9369135) discusses validated 64GB+4TB upgrade.
- **SSD**: 1x M.2 2280 PCIe 4.0 (single slot).
- **Source**: HP datasheet c08947328, crucial.com, hp.com support community.
- **Confidence**: high (slots + SODIMM); medium (64GB exceeds spec; Intel Core Ultra 5/7-1xxU memory controller does support it but BIOS may flag).

### HP EliteBook 645 G11 / 655 G11 (AMD Ryzen 7035/8040)

- **RAM**: **2x SODIMM DDR5-4800/5600**, **64GB max official** (memorystock.com, A-Tech).
- **SSD**: 1x M.2 2280 PCIe 4.0.
- **Source**: HP datasheet c08953476, crucial.com.
- **Confidence**: high.

### HP Pavilion 14 / 15 (2024-25 — varies by SKU)

- **RAM**: Mixed bag. **15-eh / 15-eg** SKUs with Ryzen 7000 or Intel Core 5 1xxxU → 2x SODIMM DDR4-3200 or DDR5-4800 depending on chip; iFixit guide for **15-eh** confirms SODIMM slots, max **16GB official / 64GB community**. **Pavilion Plus 14/16** (2024+) Core Ultra → soldered LPDDR5x, **avoid**.
- **SSD**: 1x M.2 2280 PCIe.
- **Gotcha**: HP's spec sheets often say "16GB max" while motherboard chipset supports more — but no community-wide confirmation across the whole Pavilion 2024 lineup. T3 source warning.
- **Confidence**: low-medium.

### ASUS ExpertBook B1 (B1503 / B1403 — 2024 Intel Core Ultra)

- **RAM**: **2x SODIMM DDR5-5200/5600**, max **64GB** (A-Tech and Kingston list 2x32GB kits). Some special SKUs (B1503CTA / B1403CTA stripped-down models) have only 1 SODIMM slot, 16GB cap.
- **SSD**: 1x M.2 2280 PCIe 4.0; some SKUs have a second 2280 slot.
- **Source**: laptopmedia.com teardown, edge-up ASUS post for B3 series, A-Tech compatibility.
- **Confidence**: high (B1503/B1403 standard).

### ASUS Vivobook 14 / 15 (2024-25)

- **RAM**: **Highly variable**. Older Vivobook X415/X512 = 1 soldered + 1 SODIMM (DDR4). 2024 Vivobook 14/15 with **Core Ultra V-series** or **Snapdragon X** = soldered LPDDR5x (no upgrade). Vivobook 15 X1504/X1605 with **Core i3/i5 1xxxU non-Ultra** retain SODIMM. **Vivobook 16X (M3604)** = 2x SODIMM DDR5, up to 32GB.
- **SSD**: 1x M.2 2280 PCIe 3.0 or 4.0 on most.
- **Source**: ultrabookreview.com, crucial.com VivoBook listings.
- **Confidence**: low — must verify exact SKU per PSREF/datasheet.

### Acer Aspire 5 / Aspire 7 / Aspire Lite

- **Aspire Lite AL15-52 (current India SKU)**: **2x DDR4-3200 SODIMM**, **32GB max** per Acer India store and crucial.in. DDR4 is a downgrade in 2026 but the upgrade path is real.
- **Aspire 5 A515 / Aspire 7 A715** (2024 12th-13th gen Intel): 2x SODIMM DDR4-3200, max 32-64GB. **Aspire 5 A514-53 (older gen) is 1 soldered + 1 SODIMM.**
- **AVOID**: **Acer Swift Go 14 (SFG14-71/72/73)** and Swift Edge series — soldered LPDDR5x, max 16/32GB, **not upgradable**.
- **Source**: store.acer.com (India), crucial.in, laptopmedia.com.
- **Confidence**: high (Aspire Lite); medium (Aspire 5 newer gen mix).

### Dell Inspiron 14 5440 / 16 5640

- **RAM**: **2x SODIMM DDR5-5200**. Dell spec sheet says **32GB max**, but A-Tech / crucial.com list 2x32GB = **64GB** kits as compatible. Practical 64GB is well-confirmed by memory vendors.
- **SSD**: 1x M.2 2230 + 1x M.2 2280 (some SKUs only have the 2230). Owner's Manual confirms.
- **Source**: dell.com support manuals, crucial.com, A-Tech listings.
- **Confidence**: high.

### Dell Vostro 14 3440 / Vostro 15 3530 / Vostro 16 5640

- **Vostro 14 3440** (DDR5, 13th-gen Intel U-series): 2x SODIMM DDR5-5200, max **32GB official, 64GB validated by memory vendors**.
- **Vostro 15 3530** (12th-13th gen Intel): **2x SODIMM DDR4-3200**, max 64GB per Dell owner's manual / laptopmedia teardown.
- **Vostro 16 5640**: 2x SODIMM DDR5-5200, max **32GB per Dell**, 64GB per A-Tech.
- **SSD**: 1x or 2x M.2 NVMe (varies).
- **Source**: dell.com support manuals, laptopmedia.com Vostro 15 3530 teardown, crucial.com.
- **Confidence**: high.

### MSI Modern 14 / 15 (varies)

- **Modern 15 H C13M (12-13th gen Intel)**: 2x SODIMM **DDR4-3200**, max 64GB per LaptopMedia teardown.
- **Modern 14 / 15 with Intel Core Ultra (2024)**: many SKUs ship soldered LPDDR5x. Verify per SKU.
- **SSD**: 1x M.2 2280 PCIe 4.0 + sometimes a second slot.
- **Source**: laptopmedia.com C13M teardown, crucial.com.
- **Confidence**: medium.

## Soldered-RAM trap list (LOOKS budget but RAM is locked at purchase)

- **Acer Swift Go 14 (all SFG14-71/72/73 variants)** — LPDDR5x soldered, 16/32GB cap.
- **Xiaomi RedmiBook Pro 14 / 16 (2024 / 2025)** — LPDDR5x soldered. Has M.2 SSD slot expandable, but RAM fixed.
- **Lenovo IdeaPad Slim 3 14/15 with Core 5 120U / Ryzen U-series** — LPDDR5/5x soldered (PSREF: e.g. Slim 3 15AMN8 = LPDDR5).
- **Lenovo IdeaPad Slim 5 14" Core Ultra V-series** — soldered. Only 16IRH10 (H-series) keeps SODIMM.
- **HP Pavilion Plus 14 / OmniBook Ultra / OmniBook X (Snapdragon X)** — soldered.
- **ASUS Vivobook S 14/16 OLED with Core Ultra / Snapdragon X / Ryzen AI 300** — soldered LPDDR5x.
- **ThinkPad T14s Gen 5, T14 Gen 5 AMD, X1 Carbon, X13** — soldered.
- Any laptop spec line that says "**LPDDR5**" / "**LPDDR5x**" / "**onboard**" / "**memory not upgradable**" — soldered. SODIMM laptops always say "**DDR5 SODIMM**" or just "**DDR5**" with slot count >=1.

## Conflicts / disagreements

- **Dell official spec sheets vs memory-vendor lists**: Dell consistently spec'd Inspiron 5440 / Vostro 16 5640 / Vostro 14 3440 at 32GB max, but Crucial, Kingston, A-Tech, memory.net all list 2x32GB = 64GB kits as compatible. This is a known Dell pattern (validate-only-up-to-spec'd-config) — chipset supports 64GB on Meteor Lake / Raptor Lake-U.
- **HP ProBook 440 G11**: HP QuickSpecs caps at 32GB; HP Support Community thread 9369135 has user reports of working 64GB. T3 forum source — confidence medium.
- **ThinkPad L16 Gen 5 96GB**: mrmemory.co.uk advertises 96GB compatibility, but Lenovo PSREF says 64GB. T2/T3 conflict; treat 96GB as plausible-but-not-Lenovo-validated.

## Gaps

- **Snapdragon X variants in India**: limited data on Indian SKUs, but Snapdragon X Plus/Elite chipset uses package-on-package LPDDR5x exclusively → all soldered. Confidence high but not directly sourced for India SKUs.
- **2026 model refreshes** (Lunar Lake / Panther Lake / Arrow Lake-U Indian SKUs): no teardowns yet for any 2026 Indian-market refresh. Lunar Lake architecture mandates on-package LPDDR5x → expect Pavilion 14/Vivobook 14/IdeaPad Slim refreshes with Lunar Lake to be **soldered-only**.
- **Bios/EC locks**: no specific BIOS-lock reports on the Lenovo/HP/Dell budget lines, but Lenovo ThinkPad has historically required whitelisted Wi-Fi cards (not RAM/SSD). Generally the budget lines don't BIOS-lock RAM or SSD.
- **MSI Modern 14 H Core Ultra**: unclear from data whether the 2024 Core Ultra Modern 14 retains SODIMM. Likely soldered if Core Ultra V-series; possibly SODIMM if H-series.

## Sources consulted

- [S1] https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_14_G7_IML/ThinkBook_14_G7_IML_Spec.pdf — Lenovo PSREF ThinkBook 14 G7 IML
- [S2] https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_16_G7_IML/ThinkBook_16_G7_IML_Spec.pdf — PSREF ThinkBook 16 G7 IML
- [S3] https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_16_G7_ARP/ThinkBook_16_G7_ARP_Spec.pdf — PSREF ThinkBook 16 G7 ARP
- [S4] https://www.crucial.com/compatible-upgrade-for/lenovo/thinkbook-14-g7-arp — Crucial ThinkBook 14 G7 ARP
- [S5] https://www.kingston.com/en/memory/search/model/109907/lenovo-thinkbook-14-g7-iml — Kingston ThinkBook 14 G7
- [S6] https://www.crucial.com/compatible-upgrade-for/lenovo/thinkpad-e14-gen-6-(amd) — Crucial E14 Gen 6 AMD
- [S7] https://www.memorystock.com/memory/LenovoThinkPadE14Gen6.html — memorystock E14 Gen 6
- [S8] https://www.xda-developers.com/upgrade-ram-ssd-thinkpad-e14-gen-5/ — xda E14 Gen 5 teardown
- [S9] https://www.crucial.com/compatible-upgrade-for/lenovo/thinkpad-l14-gen-5-(intel) — Crucial L14 Gen 5
- [S10] https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_L14_Gen_5_AMD/ThinkPad_L14_Gen_5_AMD_Spec.pdf — PSREF L14 Gen 5 AMD
- [S11] https://thinkpads.com/forum/viewtopic.php?t=136069 — T14 G5 / T16 G3 dual SODIMM confirmation (T3, but corroborates Crucial)
- [S12] https://www.crucial.com/compatible-upgrade-for/lenovo/thinkpad-t14-gen-5-(intel) — Crucial T14 Gen 5 Intel
- [S13] https://laptopmedia.com/guides/how-to-open-lenovo-thinkpad-t14-gen-5-intel-disassembly-and-upgrade-options/ — LaptopMedia T14 Gen 5 teardown
- [S14] https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_T14s_Gen_5/ThinkPad_T14s_Gen_5_Spec.pdf — PSREF T14s Gen 5 (soldered)
- [S15] https://www.crucial.com/compatible-upgrade-for/lenovo/thinkpad-e16-gen-2-(intel) — Crucial E16 Gen 2 Intel
- [S16] https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_E16_Gen_2_AMD/ThinkPad_E16_Gen_2_AMD_Spec.pdf — PSREF E16 Gen 2 AMD
- [S17] https://laptopmedia.com/guides/how-to-open-lenovo-thinkpad-e16-gen-2-disassembly-and-upgrade-options/ — LaptopMedia E16 Gen 2 teardown
- [S18] https://h20195.www2.hp.com/v2/GetDocument.aspx?docname=c08915500 — HP QuickSpecs ProBook 440 G11
- [S19] https://www.crucial.com/compatible-upgrade-for/hp/probook-440-g11 — Crucial ProBook 440 G11
- [S20] https://h30434.www3.hp.com/t5/Notebook-Hardware-and-Upgrade-Questions/Compatibility-of-HP-ProBook-440-G11-with-64GB-RAM-and-4TB/td-p/9369135 — HP support 64GB ProBook discussion (T3)
- [S21] https://h20195.www2.hp.com/v2/GetPDF.aspx/c08953476.pdf — HP datasheet EliteBook 645 G11
- [S22] https://www.crucial.com/compatible-upgrade-for/hp/elitebook-645-g11 — Crucial EliteBook 645 G11
- [S23] https://www.crucial.com/compatible-upgrade-for/dell/inspiron-14-(5440) — Crucial Inspiron 14 5440
- [S24] https://www.dell.com/support/manuals/en-us/inspiron-14-5430-laptop/inspiron-14-5430-setup-and-specifications/memory — Dell Inspiron 5430 manual
- [S25] https://www.dell.com/support/manuals/en-bn/inspiron-14-5440-laptop/inspiron-14-5440-owners-manual/memory — Dell 5440 owner's manual
- [S26] https://www.crucial.com/compatible-upgrade-for/dell/vostro-15-(3530) — Crucial Vostro 15 3530
- [S27] https://laptopmedia.com/highlights/how-to-open-dell-vostro-15-3530-disassembly-and-upgrade-options/ — LaptopMedia Vostro 15 3530 teardown
- [S28] https://www.crucial.com/compatible-upgrade-for/dell/vostro-16-(5640) — Crucial Vostro 16 5640
- [S29] https://store.acer.com/en-in/laptops/aspire/aspire-lite — Acer India Aspire Lite store page
- [S30] https://www.crucial.in/upgrades/acer/aspire-lite — Crucial India Aspire Lite
- [S31] https://laptopmedia.com/highlights/how-to-open-acer-swift-go-14-sfg14-71-disassembly-and-upgrade-options/ — Swift Go 14 teardown (LPDDR5 soldered)
- [S32] https://www.notebookcheck.net/Xiaomi-RedmiBook-Pro-14-2024-laptop-review-The-affordable-subnotebook-with-lots-of-stamina.856082.0.html — NotebookCheck RedmiBook Pro 14 2024 (LPDDR5x soldered)
- [S33] https://www.crucial.com/compatible-upgrade-for/asus/expertbook-b1-b1500 — Crucial ExpertBook B1 B1500
- [S34] https://laptopmedia.com/guides/how-to-open-asus-expertbook-b1-b1503-disassembly-and-upgrade-options/ — LaptopMedia ExpertBook B1 B1503 teardown
- [S35] https://laptopmedia.com/guides/how-to-open-msi-modern-15-h-c13m-disassembly-and-upgrade-options/ — LaptopMedia MSI Modern 15 H C13M
- [S36] https://psref.lenovo.com/syspool/Sys/PDF/IdeaPad/IdeaPad_Slim_3_15AMN8/IdeaPad_Slim_3_15AMN8_Spec.pdf — PSREF IdeaPad Slim 3 15AMN8 (soldered LPDDR5)
- [S37] https://psref.lenovo.com/syspool/Sys/PDF/IdeaPad/IdeaPad_Slim_5_16IRH10/IdeaPad_Slim_5_16IRH10_Spec.pdf — PSREF IdeaPad Slim 5 16IRH10
- [S38] https://www.ifixit.com/Guide/HP+Pavilion+15-eh+RAM+Replacement/160483 — iFixit Pavilion 15-eh RAM
- [S39] https://www.mrmemory.co.uk/memory-ram-upgrades/lenovo/thinkpad/l14-gen-5-intel/ddr5-pc5-44800-5600mhz-262-pin-sodimm — MrMemory L14 Gen 5 (T2)
- [S40] https://computercompatibility.com/lenovo-thinkpad-l-series-upgrade-guide/ — ThinkPad L-series upgrade guide (T2)
