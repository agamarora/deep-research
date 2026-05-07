# assets

Image and demo assets for the project README.

- `demo.gif` — `540×540`, ~6.8 MB. A 29 sec screencast of one real `/research` run (the laptop sample, scrolled). Square aspect (matches the source recording — earlier 16:9 conversions letterboxed it). Referenced from the top of the project README.

## Recording + conversion notes

The MP4 source lives outside the repo. To convert MP4 → GIF for the README, use ffmpeg's two-pass palette method — the only approach that gives acceptable text-scrolling quality at GitHub-friendly sizes:

```bash
# square 1:1 source (current convention)
ffmpeg -y -i source.mp4 -vf "fps=8,scale=540:540:flags=lanczos,palettegen=max_colors=32:stats_mode=diff" palette.png
ffmpeg -y -i source.mp4 -i palette.png -lavfi "fps=8,scale=540:540:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" demo.gif

# 16:9 source (use scale=720:-1 instead)
# fps=10, scale=720:-1, max_colors=64 → ~5.5 MB
```

Targets: ≤ 7 MB so GitHub renders quickly; 540 px on the long side for square / 720 px wide for 16:9 keeps terminal text legible. **Always check the source aspect ratio with `ffprobe` first** — square sources letterbox into 16:9 frames if you reuse a generic `scale=720:-1` filter.

For LinkedIn / X / video-friendly platforms, upload the source MP4 directly — the algorithm and quality both win over an embedded GIF.
