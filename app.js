// const videos = gsap.utils.toArray(".video");
// gsap.set(videos, { opacity: 0 });

// videos.forEach((video) => {
//   ScrollTrigger.create({
//     trigger: video,
//     start: "top center",
//     end: "bottom center",

//     onEnter: () => {
//       gsap.to(video, { opacity: 1 });
//       video.play();
//     },
//     onEnterBack: () => video.play(),
//     onLeave: () => video.pause(),
//     onLeaveBack: () => video.pause(),
//   });
// });



function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    },
                    { threshold: 5 }
                );
                observer.observe(video);
            });
        }
    });
}

// And you would kick this off where appropriate with:
playPauseVideo();
