# Sub-question 3: Linux compatibility — budget Indian laptops

## Answer (TL;DR)
- **Wi-Fi is the #1 risk** on budget laptops. MediaTek MT7925 needs **kernel 6.7+**; Intel BE200/BE201 need **6.5+**; Realtek RTL8852BE/CE work on **6.2+** but are unstable (drops, slow speeds, MAC randomization fights). Ubuntu 24.04 LTS ships kernel 6.8 (HWE 6.11) — borderline OK; Fedora 41 (kernel 6.11+) is safer; Pop!_OS 22.04 (kernel 6.9 OEM) is risky for newest Wi-Fi 7 silicon.
- **Vendor-certified models are the safe path**: Lenovo ThinkPad E14/E16 G6 and HP ProBook 440 G11 are both Ubuntu-certified; ThinkBooks and IdeaPad Slim 5 are usually OK but unofficial.
- **AVOID for Linux**: ASUS Vivobook 16 (MediaTek AzureWave Wi-Fi often missing drivers, RGB keyboard quirks) and ASUS ExpertBook B1 (UEFI/shim issues block install). Acer Aspire 5 and Swift Go 14 (Meteor Lake) need 6.6+ kernel and have audio quirks.
- **s2idle on 13th-gen+ Intel has documented battery-drain regressions** (~5-7%/h vs the ~1-2%/h S3 used to give). AMD Ryzen 7000/8000 mostly s2idle as well — drain reports vary by model. S3 sleep is largely gone on modern Intel.
- **iGPUs are mostly fine on recent kernels**: Intel Arc / Meteor Lake i915 works on kernel 6.7+ (Ubuntu 24.04 HWE OK); AMD Radeon 780M/880M needs kernel 6.5+ (RDNA3.5 / 880M ideally 6.10+).

## Hardware compatibility matrix

### Wi-Fi/Bluetooth chipsets
| Chipset | Linux status | Min kernel | Notes |
|---|---|---|---|
| MediaTek MT7922 / RZ616 | Works, sometimes flaky | 5.17+ | mt7921e driver. 5GHz issues on 6.2+ reported; ASPM-disable workaround needed; some users still see drops on FW13 AMD. [Framework forum](https://community.frame.work/t/tracking-unstable-and-unreliable-wlan-rz616-mt7922-fw13-amd-diy/40316) |
| MediaTek MT7925 / RZ717 | Works | 6.7+ | mt7925e driver merged in 6.7; Wi-Fi 7 features still WIP. [LWN](https://lwn.net/Articles/944390/), [kernel docs](https://wireless.docs.kernel.org/en/latest/en/users/drivers/mediatek.html). NixOS report of 6.18.3 regression suggests fragile. |
| Realtek RTL8852BE | Works, unstable | 6.2+ | rtw89 driver. Disconnects, slow speeds; MAC randomization workaround. [Linux Mint forum](https://forums.linuxmint.com/viewtopic.php?t=392752) |
| Realtek RTL8852CE | Works, more unstable | 6.2+ | Same rtw89 driver, more user reports of unreliable Wi-Fi & slow speeds. [Linux Mint forum](https://forums.linuxmint.com/viewtopic.php?t=443611), [Arch BBS](https://bbs.archlinux.org/viewtopic.php?id=309941) |
| Intel AX211 | Works | 5.14+ (real-world 6.6+) | iwlwifi. Ubiquitous on Raptor/Meteor Lake. Some users hit firmware issues on 22.04. [Acer Swift Go 14 article on Medium](https://medium.com/@ujjwal0501/linux-wifi-support-for-ax211-aka-x1675-8db71fa5a7a1) |
| Intel BE200 / BE201 | Works | 6.5+ | iwlwifi. **Suspend/resume regression** widely reported (loses connection on resume) — see Intel Community thread. [Intel Community](https://community.intel.com/t5/Wireless/Intel-WiFi-7-BE200-loses-connection-after-suspend-resume-on/td-p/1693034) |

### Suspend/sleep
- **Intel 13th-gen Raptor Lake / Meteor Lake / Arrow Lake**: only s2idle (S0ix) is exposed, no S3. Drain ~5-7%/h reported on Linux vs ~1-2% expected. Regression on kernels 6.9+; some workarounds: disable Wi-Fi, disable Thunderbolt in UEFI. [Qubes forum](https://forum.qubes-os.org/t/qubes-users-s0ix-s2idle-sleep-on-13th-gen-intel-draining-battery/25539), [Arch BBS](https://bbs.archlinux.org/viewtopic.php?id=296652)
- **AMD Ryzen 7000/8000 (Phoenix/Hawk Point)**: s2idle only on most. Some ThinkPads (T14 G5 Intel) reported 1.3%/h on Fedora 42 — borderline acceptable. [Fedora Discussion](https://discussion.fedoraproject.org/t/thinkpad-t14s-g6-intel-high-battery-drain-during-suspend-1-3-h-f42/165042)
- **Lenovo ThinkPads** still expose S3 in BIOS on some E-series (Config → Power → Sleep State: "Linux"). [ArchWiki Lenovo](https://wiki.archlinux.org/title/Laptop/Lenovo)

### iGPU drivers
- **Intel Arc / Meteor Lake (Core Ultra 1xx, Xe-LPG)**: i915 driver, works well on kernel 6.7+. Ubuntu 24.04 HWE stack (kernel 6.11) handles it cleanly; PPA `kobuk-team/intel-graphics` recommended for newest hardware. Ubuntu 25.10 measured ~4× faster than 24.04 on glmark2 due to Mesa/kernel updates. [Intel Community](https://community.intel.com/t5/Graphics/Request-for-Intel-Arc-Driver-Support-on-Ubuntu-24-04-LTS/td-p/1719402)
- **AMD Radeon 780M (RDNA3, Phoenix)**: amdgpu, needs kernel 6.1+, ideally 6.5+. Reports of brightness flicker, white-screen bugs. [Fedora Discussion](https://discussion.fedoraproject.org/t/amd-radeon-780m-igpu-issues/116114/2)
- **AMD Radeon 880M (RDNA3.5, Strix Point)**: amdgpu, needs kernel 6.10+ for clean support. Ubuntu 24.04 GA kernel (6.8) misses it; HWE 6.11 OK.

### Touchpad
- **Synaptics RMI4 (SMBus)**: needs `CONFIG_RMI4_SMB`. Sometimes the device defaults to the slower PS/2 protocol; fixed via `psmouse.synaptics_intertouch=1` or distros that build RMI4 in. [Debian bug 875621](https://bugs.debian.org/875621), [ArchWiki Touchpad Synaptics](https://wiki.archlinux.org/title/Touchpad_Synaptics)
- **Elan I²C-HID**: most modern budget chassis. Recent quirk on MSI Modern C14 (kernel 6.17) — intermittent failures from I²C controller timeouts. [Ubuntu Discourse](https://discourse.ubuntu.com/t/msi-modern-c14-i2c-touchpad-intermittently-not-working-on-ubuntu-25-10-kernel-6-17/72550)

### Other peripherals
- **Fingerprint readers**: Goodix/Synaptics in budget laptops are mostly **unsupported** on Linux. Treat as non-functional.
- **Brightness/keyboard backlight**: usually works on ThinkPad/HP ProBook. ASUS Vivobook brightness has had issues; MSI Modern 14 brightness flicker on kernel 5.x (improves on 6.x). [Linux Mint forum](https://forums.linuxmint.com/viewtopic.php?t=372127)
- **16:10 panels**: no specific scaling issues; GNOME 46 (Ubuntu 24.04) handles fractional scaling well.

## Per-model assessment

### Lenovo ThinkPad E14 / E16 Gen 6
- **Status**: Known-good — **Ubuntu certified**.
- **Issues**: minor; depends on Wi-Fi SKU (Intel AX211 or BE200).
- **Source**: [Ubuntu certification page](https://ubuntu.com/certified/202403-33875), [Lenovo Linux user guide PDF](https://download.lenovo.com/pccbbs/mobiles_pdf/e14_g6_e16_g2_linux_ug.pdf)

### Lenovo ThinkBook 14 / 16 Gen 7
- **Status**: Tweak-required (no Gen 7 official certification at time of research; Gen 4 was certified).
- **Issues**: Possible Wi-Fi-after-suspend, depending on Wi-Fi card; common on ThinkBook line.
- **Fix**: Newer kernel (6.11+); BIOS sleep state setting if exposed.
- **Source**: [Lenovo forum on ThinkBook 14 G2 Ubuntu battery use during sleep](https://forums.lenovo.com/t5/Ubuntu/Thinkbook-14-g2-intel-ubuntu-high-battery-use-during-sleep/m-p/5157409), [Ubuntu certified ThinkBook 14 Gen 4](https://ubuntu.com/certified/202206-30377). **T3** (forum-extrapolated for Gen 7).

### Lenovo IdeaPad Slim 5
- **Status**: Tweak-required.
- **Issues**: Intermittent Wi-Fi on 24.04 LTS; suspend issues with ath11k_pci on some SKUs.
- **Fix**: Kernel 6.14+, `modprobe -r ath11k_pci` reload after suspend.
- **Source**: [Ubuntu Discourse intermittent Wi-Fi report](https://discourse.ubuntu.com/t/intermitent-wifi-issues-on-ubuntu-studio-24-04-2-lts-lenovo-ideadpad-5-flex-14abr8/63030), [Medium post on T14 G5 ath11k_pci fix](https://elizariy.medium.com/ubuntu-24-04-wi-fi-not-reconnecting-after-suspend-the-fix-that-worked-on-my-thinkpad-t14-gen-5-bc429c5d3c99)

### HP ProBook 440 G11
- **Status**: Known-good — **Ubuntu 22.04 LTS certified** (Core Ultra 7 155U SKU).
- **Issues**: Minimal.
- **Source**: [Ubuntu certified page](https://ubuntu.com/certified/202405-34002/22.04%20LTS)

### HP Pavilion Plus 14
- **Status**: Tweak-required (no specific certification; consumer line).
- **Issues**: Older Pavilions have used Realtek RTL8723 / ALC285 with hit-or-miss Linux; B&O audio profile not exposed on Linux.
- **Source**: [HP Support Community B&O Ubuntu thread](https://h30434.www3.hp.com/t5/Notebook-Audio/B-amp-O-Audio-Drivers-for-Ubuntu/td-p/7573371). **T3** — nothing definitive on Pavilion Plus 14 specifically.

### ASUS Vivobook 16
- **Status**: Known-bad / Tweak-required.
- **Issues**: MediaTek AzureWave Wi-Fi cards often missing kernel driver until very recent kernels; keyboard hotkey IRQ bugs reported on 2022+ models; RGB keyboard control on newer models requires HID LampArray support.
- **Fix**: USB Wi-Fi dongle as workaround; kernel 6.10+ helps.
- **Source**: [Linux.org thread on Vivobook 16 Wi-Fi](https://www.linux.org/threads/wifi-not-working-on-asus-vivobook-16.46047/), [Arch BBS keyboard hotkeys](https://bbs.archlinux.org/viewtopic.php?id=257963)

### ASUS ExpertBook B1
- **Status**: Tweak-required (UEFI-hostile).
- **Issues**: UEFI Secure Boot + shim issues block standard Ubuntu 22.04 / 24.10 USB installs; "Linux" boot mode confusion.
- **Fix**: Manual shim swap on installer USB; disable Secure Boot.
- **Source**: [Digital Nomad blog post](https://gaggl.com/blogs/2026-02-25-installing-ubuntu-on-asus-expertbook-uefi-issues/), [Launchpad question 821105](https://answers.launchpad.net/ubuntu/+question/821105). **T3**.

### Dell Inspiron 14 5440
- **Status**: Known-good — **Ubuntu certified**.
- **Issues**: Generally fine; certified for the i5-1335U SKU.
- **Source**: [Ubuntu certification](https://ubuntu.com/certified/202311-32319)

### Dell Latitude 3550 / Vostro 5640
- **Status**: Latitude 3550 has historic Dell-supplied Ubuntu drivers (14.04). Vostro 5640 (Meteor Lake) — no specific certification surfaced in search; should mostly work given Dell's general Ubuntu-friendliness.
- **Source**: [Dell Latitude 3450/3550 Ubuntu 14.04 driver pack](https://www.dell.com/support/home/en-us/drivers/driversdetails?driverid=m3vrp). **T3** for 5640.

### Acer Aspire 5 (2025 refresh)
- **Status**: Tweak-required.
- **Issues**: Wi-Fi card varies by SKU (Intel iwlwifi or Realtek/Broadcom — non-free firmware needed); some SKUs use rtw89 with stability issues.
- **Source**: [Acer Community thread on Aspire 5 Ubuntu Wi-Fi](https://community.acer.com/en/discussion/644712/acer-aspire-5-with-ubuntu-not-working-wifi)

### Acer Swift Go 14 (Meteor Lake)
- **Status**: Tweak-required.
- **Issues**: Ubuntu 23.10 (kernel 6.5) lacks working network on this machine; needs **6.6-6.7+**. Audio (SOF) on Meteor Lake initially broken — speakers as Dummy Output.
- **Fix**: Use Ubuntu 24.04 with HWE kernel; install sof-firmware-bin.
- **Source**: [Linux Mint forum thread SFG14-72](https://forums.linuxmint.com/viewtopic.php?t=422210), [thesofproject GitHub issue 173](https://github.com/thesofproject/sof-bin/issues/173)

### MSI Modern 14
- **Status**: Tweak-required.
- **Issues**: Brightness control flicker, suspend softlock, intermittent I²C touchpad on newer kernels (6.17 on Modern C14), occasional Wi-Fi (older models).
- **Fix**: Kernel 6.x+ (5.13 minimum noted); ACPI workarounds.
- **Source**: [Linux Mint brightness fix thread](https://forums.linuxmint.com/viewtopic.php?t=372127), [Ubuntu Discourse on touchpad](https://discourse.ubuntu.com/t/msi-modern-c14-i2c-touchpad-intermittently-not-working-on-ubuntu-25-10-kernel-6-17/72550)

## Vendor-validated lines
- **Lenovo Ubuntu certified**: ThinkPad E14/E16 G6, ThinkPad L14 G6, ThinkPad P14s G6 AMD, ThinkBook 14 G4, plus most ThinkPad T/X/P-series. Browse master list at [ubuntu.com/certified/laptops?vendor=Lenovo](https://ubuntu.com/certified/laptops?vendor=Lenovo). Lenovo also sells Ubuntu-preinstalled SKUs in select regions.
- **Dell Project Sputnik**: XPS 13/13+ Developer Edition (12 generations), Precision 3000/5000/7000 mobile workstations, some Latitude SKUs. Inspiron 14 5440 is Ubuntu-certified but not "developer edition." [Bartongeorge.io 10-year retro](https://bartongeorge.io/2025/04/13/dells-developer-line-turns-10-looking-back-at-a-project-sputniks-first-decade/), [Ubuntu Project Sputnik retrospective](https://ubuntu.com/blog/project-sputnik-retrospective-10-years-of-developer-laptops-with-dell)
- **HP Linux dev**: ProBook 440 G9-G11 line is consistently Ubuntu-certified. Z-series workstations (ZBook Fury/Power) Ubuntu 20.04+ certified. HP Dev One was Pop!_OS preloaded but discontinued. [9to5Linux on HP Z series](https://9to5linux.com/hps-z-series-of-laptops-and-workstations-are-now-certified-with-ubuntu-20-04-lts), [Phoronix HP Dev One review](https://www.phoronix.com/review/hp-dev-one)

## Conflicts / disagreements
- MT7922/RZ616 stability: kernel docs say "supported since 5.17" but Framework community and Arch reports show ongoing 5GHz/ASPM/firmware issues even on current kernels. Reality: works for most but not bulletproof.
- AMD 780M Linux maturity: AMD's docs say "supported," but Linux Mint and Fedora users still report flicker/firmware issues — evolving target.
- Vivobook RGB keyboard: ASUS uses HID LampArray on newest models (kernel-supported) vs older WMI variants (asusctl) — varies by sub-model.

## Gaps
- **Vostro 5640** specifically — no Linux-specific reports surfaced; need direct Dell/Ubuntu certification check.
- **Pavilion Plus 14 (2024+)** — no model-specific Linux test data found; only legacy Pavilion data.
- **ThinkBook 14/16 G7** — newer than most write-ups; assume similar to G6 with appropriate kernel.
- Detailed measurements of s2idle drain on AMD Phoenix/Hawk Point in Indian-market specific models.

## Sources consulted
- [Linux Wireless docs — MediaTek](https://wireless.docs.kernel.org/en/latest/en/users/drivers/mediatek.html)
- [LWN — mt7925 driver merge](https://lwn.net/Articles/944390/)
- [Framework Community — RZ616/MT7922 tracking](https://community.frame.work/t/tracking-unstable-and-unreliable-wlan-rz616-mt7922-fw13-amd-diy/40316)
- [Intel Community — BE200 suspend/resume](https://community.intel.com/t5/Wireless/Intel-WiFi-7-BE200-loses-connection-after-suspend-resume-on/td-p/1693034)
- [Linux Mint forum — RTL8852BE](https://forums.linuxmint.com/viewtopic.php?t=392752); [RTL8852CE](https://forums.linuxmint.com/viewtopic.php?t=443611)
- [Arch BBS — RTL8852CE instability](https://bbs.archlinux.org/viewtopic.php?id=309941)
- [Ubuntu Certification — ThinkPad E14 G6](https://ubuntu.com/certified/202403-33875), [HP ProBook 440 G11](https://ubuntu.com/certified/202405-34002/22.04%20LTS), [Dell Inspiron 14 5440](https://ubuntu.com/certified/202311-32319), [Lenovo certified list](https://ubuntu.com/certified/laptops?vendor=Lenovo)
- [Lenovo ThinkPad E14/E16 G6 Linux User Guide](https://download.lenovo.com/pccbbs/mobiles_pdf/e14_g6_e16_g2_linux_ug.pdf)
- [ArchWiki — Laptop/Lenovo](https://wiki.archlinux.org/title/Laptop/Lenovo); [Touchpad Synaptics](https://wiki.archlinux.org/title/Touchpad_Synaptics)
- [Qubes Forum — 13th gen s2idle drain](https://forum.qubes-os.org/t/qubes-users-s0ix-s2idle-sleep-on-13th-gen-intel-draining-battery/25539)
- [Arch BBS — battery drain regression on 6.9+](https://bbs.archlinux.org/viewtopic.php?id=296652)
- [Phoronix — Meteor Lake Windows vs Linux](https://www.phoronix.com/review/intel-meteorlake-windows-linux); [HP Dev One review](https://www.phoronix.com/review/hp-dev-one)
- [Ubuntu Discourse — MSI Modern C14 touchpad](https://discourse.ubuntu.com/t/msi-modern-c14-i2c-touchpad-intermittently-not-working-on-ubuntu-25-10-kernel-6-17/72550)
- [Acer Community — Swift Go 14 Linux SFG14-72](https://forums.linuxmint.com/viewtopic.php?t=422210)
- [Bartongeorge.io — Project Sputnik retro](https://bartongeorge.io/2025/04/13/dells-developer-line-turns-10-looking-back-at-a-project-sputniks-first-decade/)
- [Ubuntu blog — Project Sputnik 10 years](https://ubuntu.com/blog/project-sputnik-retrospective-10-years-of-developer-laptops-with-dell)
- [Digital Nomad blog — Installing Ubuntu on ASUS ExpertBook](https://gaggl.com/blogs/2026-02-25-installing-ubuntu-on-asus-expertbook-uefi-issues/)
- [9to5Linux — HP Z series Ubuntu certification](https://9to5linux.com/hps-z-series-of-laptops-and-workstations-are-now-certified-with-ubuntu-20-04-lts)
- [Debian bug 875621 — RMI4_SMB enablement](https://bugs.debian.org/875621)
- [Fedora Discussion — Radeon 780M issues](https://discussion.fedoraproject.org/t/amd-radeon-780m-igpu-issues/116114/2); [T14s G6 suspend drain](https://discussion.fedoraproject.org/t/thinkpad-t14s-g6-intel-high-battery-drain-during-suspend-1-3-h-f42/165042)
