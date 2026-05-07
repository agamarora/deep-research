# Atomic claims — budget-laptop-india-linux-dev

Each claim is one sentence. Citations refer to entries in `sources.md`.

## CPU

- C1. Ryzen 7 7840HS / Ryzen 5 7640HS (Phoenix, Zen 4) is fully Linux-supported on kernel ≥6.6 with mature amdgpu drivers and Radeon 780M iGPU adequate for daily dev. [S3] [S2]
- C2. Strix Point (Ryzen AI 300, Zen 5 + RDNA 3.5) Linux support became solid by mid-2025 on Ubuntu 25.04 / kernel 6.14 / Mesa 25.0; older LTS kernels lag. [S1] [S2]
- C3. Intel Core Ultra 200V (Lunar Lake) Linux iGPU was disappointing at launch but reached parity with Windows by mid-2025; LTS distros lag because Lunar Lake needs cutting-edge stack. [S5] [S6] [S7]
- C4. Intel Core Ultra 7 155H thermal-throttles by ~25% in 14" chassis vs larger chassis; in extreme cases the larger chassis runs the same chip up to 70% faster. [S8]
- C5. Suspend/resume on Intel Core Ultra (Meteor/Arrow Lake) on Linux still has known regressions in 2025-26; ThinkPad T14 Gen 5 Intel is a documented problem case on Fedora 40/41. [S62] [S91]
- C6. Strix Point > Lunar Lake in Linux benchmarks by up to 1.6x; matters for users with heavier workloads. [S33]
- C7. iGPU adequacy for the user's stated workload (multi-monitor, video calls, light video, no gaming): both Intel Arc and Radeon 780M are sufficient — the gap is irrelevant. [S81] [S36]
- C8. AMD Ryzen 5 7530U (Barcelo-R / Zen 3) is the safe budget fallback — flawless Linux support, ~₹57,990 in India; iGPU (Vega 7) only adequate. [S59]

## RAM/SSD upgradability

- C9. Lenovo ThinkBook 14 G7 (IML and ARP) ships 2x SODIMM DDR5-5600 + 2x M.2 PCIe 4.0 with 64GB max validated by Crucial and Kingston. [S15] [S37] [S38]
- C10. Lenovo ThinkPad E14 Gen 6 / E16 Gen 2 ship 2x SODIMM DDR5 + 2x M.2 PCIe 4.0 with 64GB max; the prior Gen 5 had hybrid soldered+SODIMM, so confirm Gen 6 specifically. [S39] [S40] [S20] [S43] [S51] [S53]
- C11. Lenovo ThinkPad L14/L16 Gen 5 retains 2x SODIMM DDR5-5600 with 64GB official, 96GB community-reported; single M.2 slot. [S18] [S41] [S79]
- C12. Lenovo ThinkPad T14 Gen 5 **Intel** retains 2x SODIMM (64GB max); ThinkPad T14 Gen 5 **AMD** and T14s Gen 5 ship soldered LPDDR5x and are NOT upgradable. [S42] [S52] [S19] [S82]
- C13. HP ProBook 440 G11 ships 2x SODIMM DDR5-5600 + 1x M.2 PCIe 4.0; HP officially caps at 32GB but Crucial and an HP support thread report functional 64GB. [S23] [S44] [S83]
- C14. HP EliteBook 645 G11 / 655 G11 (AMD Ryzen 7035/8040) ship 2x SODIMM DDR5 + 1x M.2 PCIe 4.0 with 64GB official. [S24] [S45]
- C15. Dell Inspiron 14 5440 / Vostro 14 3440 / Vostro 16 5640 ship 2x SODIMM DDR5; Dell spec caps at 32GB but memory vendors validate 64GB kits. [S25] [S46] [S48]
- C16. Acer Swift Go 14, Xiaomi RedmiBook Pro, IdeaPad Slim 3 (all Core/Ryzen U-series), HP Pavilion Plus 14 (Core Ultra), ASUS Vivobook S 14/16 OLED, ThinkPad T14s/X1/X13 ship soldered LPDDR5x — RAM upgrade impossible. [S50] [S56] [S21]
- C17. Heuristic — any chassis with Intel Core Ultra V-series (Lunar Lake), Snapdragon X, or Ryzen AI 300 in a thin-and-light form factor uses soldered LPDDR5x; H-series Intel Core Ultra and Ryzen 7000-series in standard 14/16" chassis tend to retain SODIMM. [S15] [S17] [S39] [S50]

## Linux compatibility

- C18. Wi-Fi is the #1 Linux risk in budget laptops: MediaTek MT7925 needs kernel ≥6.7; Intel BE200/BE201 need ≥6.5; Realtek RTL8852BE/CE work on ≥6.2 but are unstable. [S13] [S14] [S69] [S70] [S67]
- C19. Ubuntu 24.04 LTS ships kernel 6.8 (HWE 6.11), borderline OK for newest Wi-Fi 7 silicon; Fedora 41 (kernel 6.11+) is safer. [S13] [S14]
- C20. Lenovo ThinkPad E14/E16 Gen 6 are Ubuntu-certified, with vendor-supplied Linux user guide. [S27] [S26]
- C21. HP ProBook 440 G11 (Core Ultra 7 155U SKU) is Ubuntu-certified. [S28]
- C22. Dell Inspiron 14 5440 (i5-1335U SKU) is Ubuntu-certified. [S29]
- C23. ASUS Vivobook 16 has reported Wi-Fi driver gaps and keyboard hotkey IRQ bugs on Linux; ASUS ExpertBook B1 has UEFI/shim install issues. [S89] [S90] [S86] [S96]
- C24. Intel 13th-gen+ Core/Core Ultra has only s2idle (S0ix) suspend on Linux; documented battery drain ~5-7%/h on Linux vs ~1-2%/h expected; some ThinkPads still expose S3 in BIOS as a workaround. [S61] [S91] [S64]
- C25. Intel Arc / Meteor Lake iGPU is well-supported by i915 on kernel ≥6.7 with Mesa ≥23.2; Ubuntu 24.04 HWE (6.11) handles cleanly. [S4] [S9]
- C26. AMD Radeon 780M (RDNA3, Phoenix) needs kernel ≥6.5; some flicker/firmware reports on early kernels. [S63]
- C27. AMD Radeon 880M (RDNA3.5, Strix Point) ideally wants kernel ≥6.10 for clean support. [S2] [S100]
- C28. Fingerprint readers (Goodix/Synaptics) in budget laptops are mostly unsupported on Linux. [S12]

## India market — form factor & pricing (May 2026)

- C29. Lenovo ThinkPad E14 Gen 6 (Core Ultra 5 125U / 16GB / 512GB, model 21M700AGIG) at ~₹72,444 from Amazon.in / Lenovo.in (MRP ₹91,440) per Indian retailer listings. [S77] [S99]
- C30. Lenovo ThinkBook 14 G7 (Intel Core 5 210H / 16GB / 512GB, model 21SJA0K9IG) at ~₹79,990 per Smartprix India listing. [S59] [S99]
- C31. Lenovo IdeaPad Slim 5 14IRH10 (Core i5 13420H / 16GB / 512GB / 14" WUXGA OLED) at ~₹85,390 on Flipkart. [S99]
- C32. HP Pavilion Plus 14-ew1082TU (Core Ultra 5 125H / 16GB / 512GB) at ~₹82,599 per Smartprix India listing; panel varies (2.2K IPS or 2.8K OLED) by sub-SKU. [S59] [S99]
- C33. Dell Inspiron 14 Plus 7440 (Core 5 210H / 16GB / 512GB) at ~₹81,646 on Flipkart; uses soldered LPDDR5x — NOT upgradable. [S99]
- C34. ThinkPad T14 Gen 5 (Intel) starts at ~₹99,500 in India, above the ₹95k bare-config target. [S59] [S99]
- C35. ThinkBook 16 G7 ships with a numpad (confirmed by NotebookCheck and Lenovo PSREF) — disqualified for the user's no-numpad requirement. [S16] [S17]
- C36. ThinkPad T16 Gen 3 ships with a numeric keypad in its standard layout — disqualified for the no-numpad requirement. [S20]
- C37. Refurb/Renewed channels (Amazon Renewed, Flipkart Refurbished, Croma open-box, edify.club, whynew.in) carry mostly older 8th-12th gen ThinkPads at ₹20-60k; current G6/G7 stock is rare. [S97] [S98]
- C38. India SKU vs US SKU: IdeaPad Slim 5 14IRH10 ships **OLED** at the i5-13420H tier in India where US ships IPS at the same price tier. [S99]
- C39. Vivobook S14 OLED (Lunar Lake variants) and Zenbook 14 OLED UX3405 use soldered LPDDR5x — NOT RAM-upgradable. [S99]

## Cross-cutting / decision

- C40. Models passing **all four hard constraints** (14"+ no-numpad, 16:10, ≥FHD, SODIMM RAM, Linux-friendly, ≤₹95k base): **ThinkPad E14 Gen 6** and **ThinkBook 14 G7 (AMD Ryzen variant preferred for Linux)** — the only two in the realistic shortlist as of May 2026.
- C41. ThinkPad E14 Gen 6 has the strongest Linux story (Ubuntu certified + vendor Linux user guide) and lower price, but ships single SODIMM in many SKUs — verify the dual-SODIMM SKU before purchase.
- C42. ThinkBook 14 G7 ARP (AMD Ryzen 7000-series) gives the "AMD for cleanest Linux" story plus 2x SODIMM + 2x M.2, at slightly higher price; Indian availability of the ARP variant fluctuates.

## Disagreements

- D1. iGPU winner Intel Arc vs Radeon 780M: synthetic benchmarks favor Intel Arc (~17% Time Spy lead at 65W) [S81] [S36]; real-world favors AMD due to mature drivers per [S2]. For this workload (no gaming), the gap is irrelevant.
- D2. Dell official spec sheets cap Inspiron 5440 / Vostro 16 5640 at 32GB; Crucial / Kingston / A-Tech all validate 2x32GB = 64GB — vendor under-specs vs reality. Treat 64GB as practical max despite Dell's spec.
- D3. HP Pavilion Plus 14-ew1082TU panel: Smartprix says 2560×1600 IPS, Flipkart and HP India product pages show 2.2K (2240×1400) IPS for the standard SKU. SKU sub-codes differ — confirm panel before purchase.
- D4. ThinkPad L16 Gen 5 96GB RAM: mrmemory.co.uk advertises 96GB compatibility; Lenovo PSREF officially says 64GB. Treat 96GB as plausible but not Lenovo-validated.
- D5. ASUS Vivobook 14 X1407QA Snapdragon X claims 29h battery — likely best-case marketing; no independent India review found.

## Post-audit corrections (round 2 — see notes/5 + notes/6)

- C43. The Ubuntu cert at https://ubuntu.com/certified/202403-33875 covers the **Core Ultra 7 155H SKU** of the ThinkPad E14 Gen 6, NOT the Core Ultra 5 125U SKU 21M700AGIG; cert does not transfer between configs. Stronger Linux signal for the 125U SKU is the **Lenovo-published Linux User Guide PDF** for the E14 G6 / E16 G2 family. [S26] [S27] [S101]
- C44. ThinkBook 14 G7 ARP (Indian SKU 21MVA096IN) ships **Ryzen 5 7535HS + Radeon 660M (Zen 3+, RDNA 2)** at **₹48,990**, NOT Ryzen 7 7735HS + Radeon 780M as previously claimed. The 7735HS+780M variant is the sibling SKU 21MVA097IN. [S102] [S103] [S104] [S105]
- C45. ThinkPad E14 Gen 7 (Indian SKU 21T9005SIG) ships **Intel Core 5 210H** (Arrow Lake-H, 8C/12T) at ~₹89,990, with 2× SODIMM DDR5-5600 (64GB max), 2× M.2, 14" 1920×1200 IPS, no numpad, AX211 Wi-Fi 6E — same chassis story as Gen 6, newer chip. [S106] [S107] [S108]
- C46. ThinkBook 14 21SJA0K9IG is **G8 IAL** (Arrow Lake-U "Core Ultra 5 225U"), not G7 IML / Core 5 210H. NotebookCheck reports 2× SODIMM works to 64GB official, 128GB community-validated. ~₹79,990. [S109] [S110] [S111]
- C47. Arrow Lake-U / Arrow Lake-H Linux maturity is **not yet validated** for the specific Indian SKUs in this matrix (ThinkBook G8 IAL, ThinkPad E14 Gen 7); critic flagged this gap; the Arrow Lake-H "avoid for Linux" warning in [C5] should be read as platform-tier, not specific to those SKUs.
- C48. Webcams on the recommended cohort: ThinkPad E14 Gen 6 720p variant is "blurry and washed out" per XDA review; 1080p+IR variant is better but still mediocre. ThinkBook 14 G7 1080p+IR is "high-quality." IdeaPad Slim 5 14IRH10 ships 1080p IR + privacy shutter on Indian SKUs. **Recommendation**: spec the 1080p webcam if offered + budget for an external USB webcam regardless. [S112] [S113] [S114]
- C49. Keyboard quality ranking: ThinkPad E14 G6/G7 (gold standard, with TrackPoint) > ThinkBook 14 G7 (redesigned, "comfortable, premium feel") > IdeaPad Slim 5 ("pleasant, decent travel, slightly less tactile"). [S112] [S113] [S115]
- C50. Build quality: ThinkPad E14 G6 = all-aluminum + MIL-STD-810H certified + spill-resistant 180° hinge. ThinkBook 14 G7 = aluminum lid + plastic bottom. IdeaPad Slim 5 14IRH10 = full aluminum (1.39 kg) but no MIL-STD. ThinkPad wins on durability; IdeaPad wins on weight feel. [S114] [S115] [S116]
- C51. Color gamut: IdeaPad Slim 5 14IRH10 OLED = **100% DCI-P3** (NotebookCheck verified). ThinkPad E14 G6 base = ~57% sRGB (NotebookCheck). ThinkBook 14 G7 IML = ~54% sRGB / 43% DCI-P3 (LaptopMedia). For color-sensitive work the IdeaPad OLED is the only choice. [S117] [S118] [S119]
- C52. Port comparison: ThinkPad E14 G6/G7 has 2× TB4 + HDMI 2.1 + RJ45 + 100W PD — best for dev. ThinkBook 14 G7 IML has 1× USB4 + HDMI 2.1 + RJ45 (Intel SKU; AMD SKU has full TB4). IdeaPad Slim 5 14IRH10 has only USB-A + USB-C (no TB) + HDMI 1.4 + no RJ45. [S107] [S111] [S120] [S121]
- C53. ThinkBook 14 G7 ARP (21MVA096IN) ships MediaTek MT7922 / RZ616 Wi-Fi (mt76 driver, kernel ≥5.18); other recommended SKUs ship Intel AX211 Wi-Fi 6E (iwlwifi, kernel ≥5.16, more stable). [S105] [S106]
- C54. Realistic Linux battery hours for the cohort: ThinkBook 14 G7 IML 60Wh ≈ 6-8h mixed dev. ThinkPad E14 Gen 6 47Wh ≈ 4.5-6h. IdeaPad Slim 5 14IRH10 OLED ≈ 3-4h heavy. Linux discount ~15-30% off Windows. [S122] [S123] [S124]
- C55. Thermal noise: ThinkBook 14 G7 quietest under sustained load. ThinkPad E14 Gen 6 quiet too. IdeaPad Slim 5 14IRH10 noisier (H-class chip in thin chassis). [S118] [S125]
- C56. Refurb pricing in India May 2026: ThinkPad T490 ₹22-28k; T14 Gen 1 ₹28-38k; T14 Gen 2 (i7) ₹38-55k. T-series refurb at ₹35-45k beats every new sub-₹50k laptop on build, keyboard, serviceability — but T14 Gen 1/2 panels are **16:9 1920×1080**, failing the user's 16:10 preference. [S126] [S127] [S128] [S129]
- C57. Lenovo has the densest service network in India among the four OEMs (Lenovo > Dell > HP > ASUS); default warranty is 1-yr carry-in, 3-yr Premier Onsite upgrade ~₹3-5k — recommended for 3+ year ownership horizon. [S130] [S131] [S132]
- C58. Indian-reviewer signal: Beebom rates IdeaPad Slim 5i family well (9-10h real-world battery, "powerful workhorse"). Digit.in rates ThinkBook 14 with reservations ("clever innovations but lacks basics — short battery, dull display on older gen"). [S133] [S134]

## Disagreements (post-audit additions)

- D6. RAM upgrade math: synthesis-v1 claimed "₹6-8k" for a second 32GB SODIMM; real Indian retail for DDR5-5600 32GB SODIMM in May 2026 is closer to **₹10-14k single stick / ₹20-25k for 2× 32GB matched kit** [no single canonical source — consensus across Crucial India, Kingston India, Mdcomputers, Vedant Computers]. v2 reflects this corrected math.
- D7. ThinkBook 14 G7 IML vs G8 IAL CPU naming confusion: Lenovo PSREF "21SJ" prefix maps to G8 IAL with Core Ultra 5 225U (Arrow Lake-U); "21MR" prefix maps to G7 IML with Core Ultra 5 125U (Meteor Lake-U). These are separate generations; treat retailer listings that say "G7 IML" with Core Ultra 5 225U as mislabeled. [S110] [S111]
