ffmpeg -i work.mp4 -vf reverse reversed.mp4
ffmpeg -f concat -safe 0 -i list.txt -c copy concat.mp4
ffmpeg -ss 00:00:00 -i concat.mp4 -to 00:00:30 -c copy work-looped.mp4
ffmpeg -i work-looped.mp4 -vcodec libx264 -crf 28 work-looped-comp.mp4
rm reversed.mp4 concat.mp4 work-looped.mp4
