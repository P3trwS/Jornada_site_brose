document.addEventListener('DOMContentLoaded', function () {
    const videoList = document.getElementById('video-list');
    const videoPlayer = document.getElementById('main-video');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');

    videoList.addEventListener('click', function (e) {
        const target = e.target.closest('li');
        if (target) {
            const videoSrc = target.getAttribute('data-video');
            const title = target.getAttribute('data-title');
            const description = target.getAttribute('data-description');

            videoPlayer.src = videoSrc;
            videoTitle.textContent = title;
            videoDescription.textContent = description;

            videoPlayer.play();
        }
    });
});
