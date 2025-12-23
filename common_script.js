// 현재 슬라이드 위치를 추적할 변수
let currentIdx = 0;
const wrapper = document.querySelector(".slider-wrapper");
const dots = document.querySelectorAll(".dot");
const totalSlides = dots.length;

// 슬라이드 이동 함수
function moveSlide(idx) {
  currentIdx = idx; // 현재 인덱스 업데이트

  // 슬라이더 이동 (100% 단위로 이동)
  wrapper.style.transform = `translateX(-${currentIdx * 100}%)`;

  // 모든 도트의 active 클래스 제거 후 현재 도트에만 추가
  dots.forEach((dot, i) => {
    if (i === currentIdx) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// 자동 슬라이드 설정 (3초마다 실행)
let autoSlide = setInterval(() => {
  currentIdx++;
  if (currentIdx >= totalSlides) {
    currentIdx = 0; // 마지막 슬라이드면 첫 번째로 돌아감
  }
  moveSlide(currentIdx);
}, 3000);

// 사용자가 수동으로 도트를 클릭했을 때 자동 슬라이드를 초기화 (선택 사항)
// 도트를 클릭했는데 바로 다음으로 넘어가버리는 현상을 방지합니다.
dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    clearInterval(autoSlide); // 기존 타이머 정지
    moveSlide(idx); // 슬라이드 이동

    // 타이머 재시작
    autoSlide = setInterval(() => {
      currentIdx++;
      if (currentIdx >= totalSlides) {
        currentIdx = 0;
      }
      moveSlide(currentIdx);
    }, 3000);
  });
});

// 미디어 호버 시 비디오 자동 재생/정지
document.querySelectorAll(".media-box").forEach((box) => {
  const video = box.querySelector(".hover-vid");
  if (video) {
    box.addEventListener("mouseenter", () => video.play());
    box.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});
