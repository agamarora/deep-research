# Sub-question 5 (correction round): SKU verification

Verified 2026-05-06 against Lenovo PSREF, Lenovo.in, Smartprix, Notebookcheck, Crucial, Tech Stories India, and 91mobiles. Critic flags were largely correct: SKU 3 was a generation/CPU mislabel, SKU 4 was a CPU/iGPU mislabel, SKU 5 needed an explicit 14" confirmation. SKU 2 is genuine and was missing from prior research.

## Corrections to prior research

### SKU 1 — Lenovo ThinkPad E14 Gen 6 (Intel) — 21M700AGIG
- **Prior claim**: Core Ultra 5 125U / 16GB / 512GB / 14" 1920×1200 IPS / 2× SODIMM / 64GB max / 2× M.2 / ₹72,444
- **Verified**: Confirmed correct.
- **CPU**: Intel Core Ultra 5 125U (Meteor Lake-U, 12C/14T, 2P+8E+2LPE, up to 4.3 GHz, 12MB cache) — confirmed via Tech Stories India listing of 21M700AGIG
- **iGPU**: Intel Graphics (integrated, Meteor Lake-U "Intel Graphics" 4 Xe-core class)
- **RAM**: 2× SO-DIMM DDR5-5600, expandable to 64GB max (16GB shipped)
- **SSD**: 2× M.2 slots; ships with 512GB M.2 2242 PCIe 4.0 ×4 NVMe; second slot M.2 2280 free
- **Display**: 14" WUXGA 1920×1200 IPS, 16:10, 300 nits, anti-glare, 60 Hz
- **Numpad**: No (14" ThinkPad E-series does not have numpad)
- **Wi-Fi chipset**: Intel Wi-Fi 6E AX211 + BT 5.3
- **India retail price**: ₹72,444 launch / ₹91,440 MRP (Tech Stories India, fetched 2026-05-06)
- **Confidence**: High — multiple sources align with Lenovo PSREF model code.
- **Sources**: [Tech Stories India 21M700AGIG](https://techstoriesindia.in/2025/12/lenovo-thinkpad-e14-gen-6-intel-21m700agig-price-specifications/), [Lenovo IN E14 Gen 6](https://www.lenovo.com/in/en/p/laptops/thinkpad/thinkpade/lenovo-thinkpad-e14-gen-6-14-inch-intel/21m7006big), [PSREF E14 Gen 6 Intel](https://psref.lenovo.com/Detail/ThinkPad_E14_Gen_6_Intel?M=21M700AGIG)

### SKU 2 — Lenovo ThinkPad E14 Gen 7 (Intel) — 21T9005SIG (newly surfaced)
- **Prior claim**: Not in prior research.
- **Verified**: SKU exists on Lenovo.in and Smartprix India. Genuine Indian variant.
- **CPU**: **Intel Core 5 210H** (Arrow Lake-H, 8C/12T, 4P+4E, 2.2 GHz base / up to 4.8 GHz turbo, 12MB cache). Note: this is the new "Core 5" non-Ultra branding, NOT Core Ultra 5.
- **iGPU**: Intel Graphics (integrated Arrow Lake-H, 4 Xe-cores)
- **RAM**: 2× SO-DIMM DDR5-5600, 16GB shipped (single SODIMM populated, one free), 64GB max
- **SSD**: 2× M.2 slots (one M.2 2242 populated with 512GB PCIe 4.0 ×4 + Opal 2.0; one M.2 2280 free), up to 2TB total
- **Display**: 14" WUXGA 1920×1200 IPS, 16:10, 300 nits, anti-glare, 60 Hz, 90% screen-to-body
- **Numpad**: No
- **Wi-Fi chipset**: Intel Wi-Fi 6E AX211 + BT 5.3
- **India retail price**: ₹80,709 launch / ₹89,990 current Lenovo / ₹1,12,500 MRP / ~₹1,04,490 on Amazon.in (Tech Stories India + Smartprix, fetched 2026-05-06)
- **Confidence**: High — Lenovo IN product page + PSREF + Smartprix all confirm 21T9005SIG = Core 5 210H.
- **Sources**: [Lenovo IN 21T9005SIG](https://www.lenovo.com/in/en/p/laptops/thinkpad/thinkpade/lenovo-thinkpad-e14-gen-7-14-inch-intel/21t9005sig), [Tech Stories India 21T9005SIG](https://techstoriesindia.in/2025/12/lenovo-21t9005sig-thinkpad/), [Smartprix 21T9005SIG](https://www.smartprix.com/laptops/lenovo-thinkpad-e14-21t9005sig-laptop-intel-ppd10xif5rln), [PSREF E14 Gen 7 Intel](https://psref.lenovo.com/Detail/ThinkPad_E14_Gen_7_Intel?M=21T9005SIG)

### SKU 3 — Lenovo ThinkBook 14 — 21SJA0K9IG (CRITIC CORRECT)
- **Prior claim**: ThinkBook 14 G7 IML / Core 5 210H
- **Verified correction**: This SKU is **ThinkBook 14 G8 IAL**, not G7 IML. CPU is **Intel Core Ultra 5 225U** (Arrow Lake-U), confirmed via the Lenovo PSREF "21SJ" product line and Smartprix India listing. The "21SJ" prefix exclusively maps to ThinkBook 14 G8 IAL in Lenovo's PSREF database; G7 IML uses "21MR".
- **CPU**: **Intel Core Ultra 5 225U** (Arrow Lake-U, 12C/14T, 2P+8E+2LPE, up to 4.8 GHz, 12MB cache)
- **iGPU**: Intel Graphics (integrated, Arrow Lake-U class — NOT Arc 130T/140T; those come with Core Ultra 5 225H / 235U / Ultra 7 255H configs in the same chassis)
- **RAM**: 2× SO-DIMM DDR5-5600, 16GB shipped, 64GB officially supported (Crucial / Notebookcheck note 2×64GB also works in practice)
- **SSD**: 2× M.2 2280 PCIe 4.0 ×4 slots; 512GB shipped; up to 4TB total per PSREF platform spec
- **Display**: 14" WUXGA 1920×1200 IPS, 16:10, 300 nits, anti-glare, 45% NTSC, 60 Hz
- **Numpad**: No
- **Wi-Fi chipset**: Wi-Fi 6E (Intel AX211 class on this config; BE201 only on higher Arrow Lake-H configs) + BT 5.3
- **India retail price**: ₹79,990 lowest current (Smartprix, fetched 2026-05-06)
- **Confidence**: High on platform + CPU; medium on exact Wi-Fi card (config-dependent).
- **Sources**: [Smartprix 21SJA0K9IG](https://www.smartprix.com/laptops/lenovo-thinkbook-14-21sja0k9ig-laptop-intel-ppd10d1ykwn9), [PSREF ThinkBook 14 G8 IAL](https://psref.lenovo.com/Product/ThinkBook/ThinkBook_14_G8_IAL), [Notebookcheck G8 IAL review](https://www.notebookcheck.net/This-affordable-Lenovo-laptop-is-more-upgradeable-than-most-ThinkPads-ThinkBook-14-Gen-8-IAL-review.1031134.0.html), [rkblog G8 deep-dive](https://rkblog.dev/posts/pc-hardware/pushing_thinkbook_g8/)

### SKU 4 — Lenovo ThinkBook 14 G7 ARP — 21MVA096IN (CRITIC CORRECT)
- **Prior claim**: Ryzen 7 7735HS / Radeon 780M
- **Verified correction**: 21MVA096IN ships with **Ryzen 5 7535HS / Radeon 660M**, confirmed across 91mobiles, MySmartPrice, Swapna Infotech, and Lenovo.in. The 7735HS / 780M variant is the sibling SKU **21MVA097IN**. Critic was correct.
- **CPU**: **AMD Ryzen 5 7535HS** (Rembrandt-R, Zen 3+, 6C/12T, 3.3 GHz base / up to 4.55 GHz boost, 16MB L3)
- **iGPU**: **AMD Radeon 660M** (RDNA 2, 6 CUs / 384 SPs, up to 1.9 GHz). NOT 780M (which is RDNA 3 and ships with the 7735HS/7840HS class).
- **RAM**: 2× SO-DIMM DDR5-5600, 16GB shipped, 64GB max per PSREF platform spec
- **SSD**: 2× M.2 2280 PCIe 4.0 ×4 slots; 512GB shipped
- **Display**: 14" WUXGA 1920×1200 IPS, 16:10, 300 nits, anti-glare, 60 Hz (non-touch on this Indian SKU)
- **Numpad**: No
- **Wi-Fi chipset**: Wi-Fi 6 (MediaTek MT7922 / "RZ616" common on AMD ThinkBook G7 ARP — Linux iwlwifi N/A; uses mt76 driver) + BT 5.2
- **India retail price**: ₹48,990 (91mobiles, fetched 2026-05-06; currently low-stock per listing)
- **Confidence**: High on CPU + iGPU (4 independent India sources align); medium on Wi-Fi exact part (PSREF lists MT7922 as the standard option for ARP variant).
- **Sources**: [91mobiles 21MVA096IN](https://www.91mobiles.com/lenovo-gen-7-21mva096in-amd-hexa-core-ryzen-5-16-gb-512-gb-windows-11-laptop-price-in-india-167013), [Lenovo IN 21MVA096IN](https://www.lenovo.com/in/en/p/laptops/thinkbook/thinkbook-series/lenovo-thinkbook-14-gen-7-14-inch-amd/21mva096in), [Swapna Infotech 21MVA096IN](https://swapnainfotech.com/products/lenovo-thinkbook-14-35-56cms-amd-ryzen-5-7535hs-16gb-512gb-windows11-mso-21mva096in), [MySmartPrice 21MVA096IN](https://www.mysmartprice.com/computer/lenovo-thinkbook-14-gen-7-21mva096in-laptop-msf1003578), [PSREF G7 ARP PDF](https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_14_G7_ARP/ThinkBook_14_G7_ARP_Spec.pdf)

### SKU 5 — Lenovo IdeaPad Slim 5 14IRH10 (14" SODIMM check)
- **Prior claim**: Only 16IRH10 confirmed dual-SODIMM; 14IRH10 unverified.
- **Verified**: **14IRH10 also has 2× SO-DIMM DDR5-5600 slots, dual-channel, max 32GB.** Both Crucial compatibility and Lenovo PSREF confirm. RAM is NOT soldered.
- **CPU** (representative India SKU 83HR009MIN): Intel Core i5-13420H (Raptor Lake-H, 8C/12T, 4P+4E, up to 4.6 GHz, 12MB) — also offered with i7-13620H
- **iGPU**: Intel UHD Graphics (Raptor Lake-H "UHD" — 48 EUs)
- **RAM**: **2× SO-DIMM DDR5-5600, dual-channel, 32GB max** (16GB shipped). Lower max than the 16IRH10 (64GB).
- **SSD**: 1× M.2 2280 PCIe 4.0 ×4 slot (single slot, not dual — this is a real difference from 16IRH10 which has 2)
- **Display**: 14" WUXGA 1920×1200 IPS or WUXGA OLED (config-dependent), 16:10, 300/400 nits
- **Numpad**: No
- **Wi-Fi chipset**: Intel Wi-Fi 6E AX211 (per PSREF) + BT 5.3
- **India retail price**: ₹58,990–₹85,390 depending on config / retailer (Smartprix 83HR009MIN, fetched 2026-05-06)
- **Confidence**: High on RAM (multi-source); medium on M.2 slot count (PSREF says 1× on 14IRH10 vs 2× on 16IRH10 — the chassis is smaller).
- **Sources**: [Crucial 14IRH10 compatibility](https://www.crucial.com/compatible-upgrade-for/lenovo/ideapad-slim-5-14irh10), [PSREF 14IRH10](https://psref.lenovo.com/Product/IdeaPad_Slim_5_14IRH10), [Smartprix 83HR009MIN](https://www.smartprix.com/laptops/lenovo-ideapad-slim-5-14irh10-83hr009min-ppd1qwzmrovz), [LaptopMedia 14IRH10/14IRH10R](https://laptopmedia.com/series/lenovo-ideapad-slim-5-14irh10r/)

## Reconciled facts (single source of truth)

| Model | SKU | CPU | iGPU | RAM | SSD | Display | Numpad | Wi-Fi | Price (May 2026) |
|---|---|---|---|---|---|---|---|---|---:|
| ThinkPad E14 Gen 6 (Intel) | 21M700AGIG | Core Ultra 5 125U (12C/14T) | Intel Graphics (MTL-U) | 2× SODIMM DDR5-5600, 64GB max | 2× M.2 (2242+2280), 512GB shipped | 14" 1920×1200 IPS 16:10, 300 nits | No | Intel AX211 (Wi-Fi 6E) | ₹72,444 |
| ThinkPad E14 Gen 7 (Intel) | 21T9005SIG | Core 5 210H (8C/12T) | Intel Graphics (ARL-H) | 2× SODIMM DDR5-5600, 64GB max | 2× M.2 (2242+2280), 512GB shipped | 14" 1920×1200 IPS 16:10, 300 nits | No | Intel AX211 (Wi-Fi 6E) | ₹89,990 |
| ThinkBook 14 G8 IAL | 21SJA0K9IG | Core Ultra 5 225U (12C/14T) | Intel Graphics (ARL-U) | 2× SODIMM DDR5-5600, 64GB max | 2× M.2 2280 PCIe 4.0, 512GB shipped | 14" 1920×1200 IPS 16:10, 300 nits | No | Intel AX211 (Wi-Fi 6E) | ₹79,990 |
| ThinkBook 14 G7 ARP | 21MVA096IN | Ryzen 5 7535HS (6C/12T, Zen 3+) | Radeon 660M (RDNA 2) | 2× SODIMM DDR5-5600, 64GB max | 2× M.2 2280 PCIe 4.0, 512GB shipped | 14" 1920×1200 IPS 16:10, 300 nits | No | MediaTek MT7922 (Wi-Fi 6) | ₹48,990 |
| IdeaPad Slim 5 14IRH10 | 83HR009MIN | Core i5-13420H (8C/12T) | Intel UHD (RPL-H) | 2× SODIMM DDR5-5600, 32GB max | 1× M.2 2280 PCIe 4.0, 512GB/1TB | 14" 1920×1200 IPS or OLED 16:10 | No | Intel AX211 (Wi-Fi 6E) | ₹58,990 |

## Notes for synthesis revision

- **Replace SKU 3 fully**: 21SJA0K9IG is **ThinkBook 14 G8 IAL with Core Ultra 5 225U**, not G7 IML / Core 5 210H. The G8 IAL is Arrow Lake-U; the closest G7 IML SKU on Lenovo IN with similar specs is on a different model code (21MR).
- **Replace SKU 4 CPU/iGPU**: 21MVA096IN is **Ryzen 5 7535HS + Radeon 660M (Zen 3+ / RDNA 2)**, not 7735HS/780M. This significantly changes the iGPU performance story — 660M is meaningfully weaker than 780M for any GPU-bound work. The 7735HS+780M variant is the sibling SKU 21MVA097IN at a higher price.
- **Add SKU 2**: ThinkPad E14 Gen 7 (21T9005SIG) is a real, current Lenovo IN SKU at ~₹89,990. CPU is Core 5 210H (Arrow Lake-H, 8C/12T) — strong upgrade path over the Gen 6 / 125U at ~₹17k premium. Worth featuring as a "newer-gen" alternative.
- **Confirm SKU 5 14IRH10**: dual-SODIMM, but **32GB max (not 64GB like the 16IRH10)** and **only 1× M.2 slot** (vs 2× on 16IRH10). If the user prioritizes future RAM headroom or dual-SSD, the 16IRH10 is the better pick.
- All five SKUs are 14" 1920×1200 16:10 IPS, no numpad, ~300 nits, Wi-Fi 6 or 6E. The differentiators are CPU/iGPU, max RAM, and price — not form factor.
- **Linux note for synthesis**: ThinkBook G7 ARP (MediaTek MT7922 Wi-Fi) needs kernel ≥5.18 for stable mt76 driver; the others use Intel AX211 which has rock-solid iwlwifi support since 5.16.

## Sources

- [Tech Stories India — 21M700AGIG](https://techstoriesindia.in/2025/12/lenovo-thinkpad-e14-gen-6-intel-21m700agig-price-specifications/)
- [Tech Stories India — 21T9005SIG](https://techstoriesindia.in/2025/12/lenovo-21t9005sig-thinkpad/)
- [Lenovo.in — ThinkPad E14 Gen 7 21T9005SIG](https://www.lenovo.com/in/en/p/laptops/thinkpad/thinkpade/lenovo-thinkpad-e14-gen-7-14-inch-intel/21t9005sig)
- [Smartprix — 21T9005SIG](https://www.smartprix.com/laptops/lenovo-thinkpad-e14-21t9005sig-laptop-intel-ppd10xif5rln)
- [Smartprix — 21SJA0K9IG](https://www.smartprix.com/laptops/lenovo-thinkbook-14-21sja0k9ig-laptop-intel-ppd10d1ykwn9)
- [PSREF — ThinkBook 14 G8 IAL](https://psref.lenovo.com/Product/ThinkBook/ThinkBook_14_G8_IAL)
- [Notebookcheck — ThinkBook 14 G8 IAL review](https://www.notebookcheck.net/This-affordable-Lenovo-laptop-is-more-upgradeable-than-most-ThinkPads-ThinkBook-14-Gen-8-IAL-review.1031134.0.html)
- [rkblog — ThinkBook 14 G8 deep-dive](https://rkblog.dev/posts/pc-hardware/pushing_thinkbook_g8/)
- [91mobiles — 21MVA096IN](https://www.91mobiles.com/lenovo-gen-7-21mva096in-amd-hexa-core-ryzen-5-16-gb-512-gb-windows-11-laptop-price-in-india-167013)
- [Lenovo.in — ThinkBook 14 G7 ARP 21MVA096IN](https://www.lenovo.com/in/en/p/laptops/thinkbook/thinkbook-series/lenovo-thinkbook-14-gen-7-14-inch-amd/21mva096in)
- [MySmartPrice — 21MVA096IN](https://www.mysmartprice.com/computer/lenovo-thinkbook-14-gen-7-21mva096in-laptop-msf1003578)
- [Swapna Infotech — 21MVA096IN](https://swapnainfotech.com/products/lenovo-thinkbook-14-35-56cms-amd-ryzen-5-7535hs-16gb-512gb-windows11-mso-21mva096in)
- [PSREF — ThinkBook 14 G7 ARP PDF](https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_14_G7_ARP/ThinkBook_14_G7_ARP_Spec.pdf)
- [Crucial — IdeaPad Slim 5 14IRH10 compatibility](https://www.crucial.com/compatible-upgrade-for/lenovo/ideapad-slim-5-14irh10)
- [PSREF — IdeaPad Slim 5 14IRH10](https://psref.lenovo.com/Product/IdeaPad_Slim_5_14IRH10)
- [Smartprix — 14IRH10 83HR009MIN](https://www.smartprix.com/laptops/lenovo-ideapad-slim-5-14irh10-83hr009min-ppd1qwzmrovz)
- [LaptopMedia — IdeaPad Slim 5 14IRH10/14IRH10R](https://laptopmedia.com/series/lenovo-ideapad-slim-5-14irh10r/)
