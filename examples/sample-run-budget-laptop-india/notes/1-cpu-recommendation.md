# Sub-question 1: CPU recommendation for Linux dev (no dGPU)

## Answer (TL;DR)

- **Top sweet-spot pick: AMD Ryzen 7 7840HS / Ryzen 5 7640HS (Phoenix, Zen 4)** - widely available in Indian budget chassis (~Rs 70-75k), Linux drivers fully mature on any 6.6+ kernel, Radeon 780M iGPU is genuinely strong for daily dev use (multi-monitor, video calls, occasional GPU compute).
- **Aspirational pick if budget stretches: AMD Ryzen AI 7 350 / Ryzen AI 9 365 (Strix / Krackan Point, Zen 5 + RDNA 3.5)** - now (May 2026) on a >1-year-mature Linux stack; ASUS Vivobook 16 with Ryzen AI 7 350 is in India around Rs 97,990 which is the upper edge of "budget."
- **Avoid (for Linux on cheap chassis right now):** Intel Core Ultra 200H "Arrow Lake-H" (driver gaps, suspend regressions still being shaken out); Core Ultra 5/7 155H/125H in <14-inch chassis (documented ~25 percent thermal throttling).
- **Safe budget fallback: Ryzen 5 7530U (Barcelo-R / Zen 3)** - boring but flawlessly Linux-supported; Indian street price ~Rs 57,990; iGPU (Vega 7) only adequate, not great.
- **U vs H in cheap chassis:** prefer H/HS in 15.6-inch+ models (cooling exists), prefer U in slim 14-inch models (sustained-load throttling is real).

## Evidence

### Finding 1: Strix Point (Ryzen AI 300) Linux support is now solid but needs a recent distro
- **Source**: https://www.phoronix.com/review/framework-13-amd-strix-point - **T1 (Phoronix)**
- **Source**: https://www.phoronix.com/review/amd-strix-point-2025/5 - **T1 (Phoronix - one-year retrospective)**
- **Excerpt/paraphrase**: "Linux support is in great shape when using a fresh Linux distribution... Ubuntu 25.04 with the Framework 13 paired with the AMD Ryzen AI 9 HX 370 has been working out great... no issues reported around usage with its Linux 6.14 kernel and Mesa 25.0 graphics drivers." Earlier kernels needed updated DMCUB firmware to work around RDNA 3.5 screen freezes; "linux-lts does not yet include patches for the Strix Point, Krackan Point APU and Zen 5 platform."
- **Confidence**: high - Phoronix is the canonical Linux-laptop benchmarking source; multiple confirming articles across 12+ months.

### Finding 2: Strix Point beats Lunar Lake on Linux
- **Source**: https://www.tomshardware.com/pc-components/cpus/amd-ryzen-ai-300-cpu-beats-intel-core-ultra-200v-cpu-in-linux-showdown-strix-point-was-up-to-1-6x-faster-than-lunar-lake - **T2 (Tom's Hardware reporting Phoronix data)**
- **Excerpt/paraphrase**: "Strix Point was up to 1.6X faster than Lunar Lake" in Linux benchmarks.
- **Confidence**: high - aligns with Phoronix one-year-on data showing Strix matured faster than Xe2.

### Finding 3: Ryzen 7 7840HS (Phoenix) is fully Linux-supported and well-benchmarked
- **Source**: https://www.phoronix.com/review/amd-ryzen-7840hs-linux - **T1**
- **Excerpt/paraphrase**: Tested on TUXEDO Pulse 14 Gen 3 with Ryzen 7 7840HS, 32 GB LPDDR5-6400, Radeon 780M. Test stack: Ubuntu 23.10 + Linux 6.7 + Mesa Git via Oibaf PPA. 8C/16T Zen 4 at up to 5.1 GHz. Reviewed favorably as a Linux laptop CPU.
- **Confidence**: high.

### Finding 4: Intel Arc iGPU (Meteor Lake) Linux drivers were stable from kernel 6.6+, but Xe driver still maturing
- **Source**: https://www.phoronix.com/review/meteor-lake-arc-graphics - **T1** (per search summary; full page 403 to fetch)
- **Source**: https://wiki.archlinux.org/title/Intel_graphics - **T1 (ArchWiki)**
- **Excerpt/paraphrase**: Meteor Lake graphics declared stable and enabled by default starting Linux 6.6; Mesa 23.2+ required. Two driver options: i915 (default, mature) and Xe (experimental, performance gains coming). Late-2025 distros like Mint 22.2 still default to i915.
- **Confidence**: high.

### Finding 5: Synthetic iGPU - Intel Arc on 125H beats Radeon 780M, but real-world favors AMD
- **Source**: https://wccftech.com/intel-core-ultra-5-125h-meteor-lake-cpu-loses-amd-ryzen-7-7840hs-65w-tdp-strong-igpu-performance/ - **T2/T3 (wccftech, flagged)**
- **Source**: https://videocardz.com/newz/intel-ultra-5-125h-and-ryzen-7-7840hs-tested-at-65w-intel-with-higher-igpu-score-but-falls-short-in-cpu-tests - **T2 (VideoCardz)**
- **Excerpt/paraphrase**: At 65 W, Core Ultra 5 125H wins Time Spy by 17 percent and Fire Strike by 6 percent over Radeon 780M; but Intel loses every multi-core CPU benchmark. Real-world gaming favors AMD due to better drivers.
- **Confidence**: medium - synthetic numbers are accurate; "real-world" caveat is widely repeated but the dev workload (no gaming) makes both adequate.

### Finding 6: 14-inch Core Ultra 7 155H laptops thermal-throttle by ~25 percent
- **Source**: https://www.notebookcheck.net/Core-Ultra-7-155H-exhibiting-throttling-behavior-by-up-to-25-percent-on-smaller-laptop-models.977246.0.html (search summary; 403 on direct fetch) - **T1 (NotebookCheck)**
- **Excerpt/paraphrase**: "certain 14-inch laptops running on the Core Ultra 7 155H throttling by up to 25 percent when compared to larger laptops with the same CPU"; in extreme cases the larger chassis runs the same chip "up to 70 percent faster." Implication: in cheap 14-inch shells, U-series is the saner pick.
- **Confidence**: high.

### Finding 7: Suspend/resume on Intel Core Ultra (Meteor Lake / Arrow Lake) on Linux is still flaky in 2025
- **Source**: https://bbs.archlinux.org/viewtopic.php?id=295263 - **T2 (Arch forum, but multiple confirmed reports)**
- **Source**: https://discussion.fedoraproject.org/t/thinkpad-t14-gen-5-intel-issues-with-sleep-suspend-on-fedora-40-and-41/131456 - **T2**
- **Excerpt/paraphrase**: Multiple users report Core Ultra 7 155H/155U laptops failing to wake, hard freezes on suspend, on Fedora 40/41 and Ubuntu 26.04. ThinkPad T14 Gen 5 Intel is a confirmed problem case. BIOS updates issued in Aug for gen-13/14 partly help.
- **Confidence**: medium-high - many independent reports; not catastrophic but a real friction.

### Finding 8: Strix Point on Framework 13 had GPU MES timeouts; resolved by recent firmware
- **Source**: https://community.frame.work/t/amd-gpu-mes-timeouts-causing-system-hangs-on-framework-laptop-13-amd-ai-300-series/71364 - **T2**
- **Excerpt/paraphrase**: System hangs traced to MES firmware on RDNA 3.5; fixed in newer linux-firmware.git binaries; not yet in all distro packages.
- **Confidence**: medium - non-blocker if user is on 6.14+ with current firmware.

### Finding 9: Lunar Lake (Core Ultra 200V) Linux iGPU was disappointing at launch, has improved
- **Source**: https://www.phoronix.com/review/lunar-lake-xe2 - **T1**
- **Source**: https://www.phoronix.com/review/intel-lunar-lake-linux-improved - **T1**
- **Source**: https://www.phoronix.com/review/ubuntu-2604-xe2-lunar-lake - **T1**
- **Excerpt/paraphrase**: "Initial Linux graphics performance on Core Ultra 200V Lunar Lake was disappointing"; Mesa 24.2.2 enabled Xe2 out-of-box, needed Linux 6.12+. By mid-2025 (Ubuntu 25.04 + 6.14 + Mesa 25.0) parity with Windows; Ubuntu 26.04 (Linux 7.0 + Mesa 26.0.3) up "~17 percent over past year." Still: needed cutting-edge stack means LTS distros lag.
- **Confidence**: high.

### Finding 10: Indian budget Ryzen pricing (May 2026)
- **Source**: https://www.smartprix.com/laptops/best-laptops-under-80000-list - **T2 (Indian price aggregator)**
- **Source**: https://www.flipkart.com/asus-vivobook-16-2026-ai-pc-...M1607GA-MB029WS-...laptop/p/itm2d63dd66b4319 - **T1 (retailer)**
- **Source**: https://zigfeed.com/technology/best-laptop-under-60000/ - **T3 (flagged - SEO listicle, used only for price corroboration)**
- **Excerpt/paraphrase**: Ryzen 5 7530U + 16 GB DDR4 + 512 GB SSD ~Rs 57,990. Ryzen 5 7535HS + 16 GB DDR5 + 512 GB ~Rs 70,490. Ryzen 7 7840HS gaming chassis (HP Victus 16-s0089AX) under Rs 70k. ASUS Vivobook 16 with Ryzen AI 7 350 + 16 GB + 512 GB at Rs 97,990. Ryzen AI 9 HX 370 OLED Vivobook S 14 at Rs 1,52,990 (above budget).
- **Confidence**: high for relative tiers; exact prices fluctuate.

### Finding 11: 12th/13th-gen Intel laptops (Alder/Raptor Lake) Linux suspend largely fixed via BIOS + kernel params
- **Source**: https://forums.lenovo.com/t5/Ubuntu/Suspend-is-not-working-in-Linux-for-gen-12-Intel-laptops/m-p/5163758 - **T2**
- **Excerpt/paraphrase**: 12th-gen Intel + Linux required BIOS updates and `acpi_osi="!Windows 2020"`; widely worked-around by 2025. Still: a config tax that AMD platforms don't impose.
- **Confidence**: medium - works fine if user is OK editing kernel cmdline.

## Conflicts / disagreements

- **iGPU winner for daily dev**: synthetic benchmarks (wccftech, VideoCardz) put Intel Arc 8-Xe-cores on 125H ahead of Radeon 780M by ~17 percent in Time Spy. Phoronix's broader Linux iGPU testing and real-world gaming reviews put AMD ahead due to mature drivers. For this user's workload (no gaming, multi-monitor + video calls + light ML), the gap is irrelevant either way - both are sufficient.
- **Strix vs Lunar Lake battery**: Lunar Lake reportedly wins efficiency/battery; Strix Point wins multi-thread CPU and Linux maturity. No single source disputes the tradeoff, but the right pick depends on whether the user weighs battery higher than perf.

## Gaps

- No India-specific Phoronix-style Linux laptop review found - all Linux benchmarks are on Western SKUs (Framework, TUXEDO, ASUS Zenbook). Indian budget SKUs (HP Victus, ASUS Vivobook, Lenovo IdeaPad Slim) ship the same silicon, but cooling/firmware/keyboard quirks are not Linux-tested in public.
- Geekyranjit / IndianTech-tier reviewers tend not to test Linux specifically; could not find an Indian-reviewer Linux dogfooding source.
- Concrete suspend-resume status on Ryzen AI 7 350 (Krackan Point) on May 2026 LTS distros not directly confirmed; inferred from Strix Point's better-of-two-twins lineage.
- Could not deep-fetch Phoronix or NotebookCheck (403 blocks); relied on search summaries which paraphrase those T1 sources.

## Sources consulted

- [S1] https://www.phoronix.com/review/framework-13-amd-strix-point - Phoronix: Framework 13 with Ryzen AI 300 Linux review
- [S2] https://www.phoronix.com/review/amd-strix-point-2025/5 - Phoronix: Strix Point Linux performance one year on
- [S3] https://www.phoronix.com/review/amd-ryzen-7840hs-linux - Phoronix: Ryzen 7 7840HS Linux review (TUXEDO Pulse 14)
- [S4] https://www.phoronix.com/review/meteor-lake-arc-graphics - Phoronix: Meteor Lake Arc Graphics vs RDNA3
- [S5] https://www.phoronix.com/review/lunar-lake-xe2 - Phoronix: Lunar Lake Xe2 Linux launch review
- [S6] https://www.phoronix.com/review/intel-lunar-lake-linux-improved - Phoronix: Lunar Lake Linux mid-2025 improvements
- [S7] https://www.phoronix.com/review/ubuntu-2604-xe2-lunar-lake - Phoronix: Xe2 Lunar Lake performance up ~17 percent over past year
- [S8] https://www.tomshardware.com/pc-components/cpus/amd-ryzen-ai-300-cpu-beats-intel-core-ultra-200v-cpu-in-linux-showdown-strix-point-was-up-to-1-6x-faster-than-lunar-lake - Tom's Hardware
- [S9] https://www.notebookcheck.net/Core-Ultra-7-155H-exhibiting-throttling-behavior-by-up-to-25-percent-on-smaller-laptop-models.977246.0.html - NotebookCheck
- [S10] https://wccftech.com/intel-core-ultra-5-125h-meteor-lake-cpu-loses-amd-ryzen-7-7840hs-65w-tdp-strong-igpu-performance/ - wccftech (T3 caveat)
- [S11] https://videocardz.com/newz/intel-ultra-5-125h-and-ryzen-7-7840hs-tested-at-65w-intel-with-higher-igpu-score-but-falls-short-in-cpu-tests - VideoCardz
- [S12] https://wiki.archlinux.org/title/Intel_graphics - ArchWiki Intel graphics
- [S13] https://wiki.archlinux.org/title/Framework_Laptop_13_(AMD_Ryzen_AI_300_Series) - ArchWiki Framework 13 AMD AI
- [S14] https://bbs.archlinux.org/viewtopic.php?id=295263 - Arch forum: Core Ultra suspend
- [S15] https://discussion.fedoraproject.org/t/thinkpad-t14-gen-5-intel-issues-with-sleep-suspend-on-fedora-40-and-41/131456 - Fedora discussion
- [S16] https://community.frame.work/t/amd-gpu-mes-timeouts-causing-system-hangs-on-framework-laptop-13-amd-ai-300-series/71364 - Framework community
- [S17] https://forums.lenovo.com/t5/Ubuntu/Suspend-is-not-working-in-Linux-for-gen-12-Intel-laptops/m-p/5163758 - Lenovo forums
- [S18] https://www.smartprix.com/laptops/best-laptops-under-80000-list - Smartprix India pricing
- [S19] https://www.flipkart.com/asus-vivobook-16-2026-ai-pc-office-2024-m365-basic-copilot-amd-ryzen-7-hexa-core-16-gb-512-gb-ssd-windows-11-home-m1607ga-mb029ws-thin-light-laptop/p/itm2d63dd66b4319 - Flipkart Vivobook 16 Ryzen AI 7 350
- [S20] https://www.flipkart.com/asus-vivobook-s-14-2024-oled-ai-pc-amd-ryzen-9-12-core-hx-370-24-gb-512-gb-ssd-windows-11-home-m5406wa-pp962ws-thin-light-laptop/p/itm5f745830beac8 - Flipkart Vivobook S14 Ryzen AI 9 HX 370
- [S21] https://www.tomshardware.com/pc-components/cpus/intel-launches-arrow-lake-mobile-family-with-core-ultra-200hx-and-200h-processors - Tom's: Arrow Lake mobile launch
- [S22] https://en.wikipedia.org/wiki/Arrow_Lake_(microprocessor) - Arrow Lake Wikipedia
- [S23] https://www.tomshardware.com/news/intel-arc-driver-linux-boost - Tom's: Intel Arc Linux driver gains
- [S24] https://www.cpu-monkey.com/en/compare_cpu-amd_ryzen_7_7840hs-vs-amd_ryzen_ai_9_365 - CPU-Monkey 7840HS vs Ryzen AI 9 365
- [S25] https://refurbo.in/blogs/best-budget-developer-laptops-for-software-developers-in-india-2026 - Refurbo India dev-laptop guide (T3, light corroboration only)
