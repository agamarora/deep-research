# assets

Image and demo assets for the project README.

- `demo.gif` — `720×405`, ~5.6 MB. A 29 sec screencast of one real `/research` run (the laptop sample, scrolled). Referenced from the top of the project README.

## Recording + conversion notes

The MP4 source lives outside the repo. To convert MP4 → GIF for the README, use ffmpeg's two-pass palette method — the only approach that gives acceptable text-scrolling quality at GitHub-friendly sizes:

```bash
ffmpeg -y -i source.mp4 -vf "fps=10,scale=720:-1:flags=lanczos,palettegen=max_colors=64:stats_mode=diff" palette.png
ffmpeg -y -i source.mp4 -i palette.png -lavfi "fps=10,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" demo.gif
```

Targets: ≤ 6 MB so GitHub renders quickly; 720 wide so terminal text stays legible; 10 fps so motion still reads. If the demo grows, drop to 640×… or 8 fps before scaling beyond ~6 MB.

For LinkedIn / X / video-friendly platforms, upload the source MP4 directly — the algorithm and quality both win over an embedded GIF.
