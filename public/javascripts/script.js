function swiper() {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   dynamicBullets: true,
    //   clickable: true,

    // },
  });

  var swiper = new Swiper(".mySwiper6", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  var swiper = new Swiper(".mySwiper4b", {
    slidesPerView: 4,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
    },
  });
  
  var swiper = new Swiper(".mySwiper6c", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  var swiper = new Swiper(".mySwiper2", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  var swiper = new Swiper(".mySwiper4", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  var swiper = new Swiper(".mySwiper5", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  });
  
  var swiper = new Swiper(".mySwiper8", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  });
}
swiper();

function boxInfo() {
  const detsButtons = document.querySelectorAll(".dets"); // Select all elements with .dets
  const detsBoxes = document.querySelectorAll(".dets-box"); // Select all elements with .dets-box

  detsButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
  
      detsBoxes[index].classList.toggle("active"); // Toggle the corresponding dets-box
    });
  });
}
boxInfo();

function numbers() {
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const counters = document.querySelectorAll(".num");

    counters.forEach((counter) => {
      let finalValue = parseInt(counter.getAttribute("data-target"), 10);

      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: finalValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            // markers:true,
            start: "top 95%", // When the top of the element reaches 80% of the viewport
            once: true, // Ensures animation happens only once
          },
        }
      );
    });
  });
}
numbers();

function nav() {
  gsap.to(".banner", {
    backgroundColor: "#fff",
    // backdropFilter: "blur(10px)",
    duration: 0.5,
    height: "70px",
    scrollTrigger: {
      trigger: ".banner",
      scroller: "body",
      // markers:true,
      start: "top -10%",
      end: "top -11%",
      scrub: 1,
    },
  });

  const title = document.querySelector(".title");
  gsap.to(".title", {
    color: "#00508a",
    duration: 0.5,
    scrollTrigger: {
      trigger: ".banner",
      scroller: "body",
      // markers:true,
      start: "top -10%",
      end: "top -11%",
      scrub: 1,
    },
  });
  const icons = document.querySelector(".icons2");
  gsap.to(".icons2 i", {
    color: "#00508a",
    duration: 0.5,
    scrollTrigger: {
      trigger: ".banner",
      scroller: "body",
      // markers:true,
      start: "top -10%",
      end: "top -11%",
      scrub: 1,
    },
  });


  gsap.to(".overlay", {
    backgroundColor: "#fff",
    // backdropFilter: "blur(10px)",
    duration: 0.5,
    height: "70px",
    scrollTrigger: {
      trigger: ".overlay",
      scroller: "body",
      // markers:true,
      start: "top -10%",
      end: "top -11%",
      scrub: 1,
    },
  });
  // Use a single DOMContentLoaded handler for everything.
  if (window.innerWidth > 438) {
    document.addEventListener("DOMContentLoaded", function () {
      // ---------------------------
      // Nav open/close animation
      // ---------------------------
      const overlay = document.querySelector(".overlay");
      const openBtn = document.querySelector(".open");
      const closeBtn = document.querySelector(".close");

      let menuAnimation = gsap.timeline({ paused: true });
      menuAnimation.to(overlay, {
        clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        duration: 0.5,
        ease: "power2.out",
      });

      openBtn.addEventListener("click", () => {
     
        menuAnimation.play();
      });
      document.addEventListener("click", (event) => {
        // Check if the clicked element is NOT inside secondBox, secondBox2, or a menu item
        if (
          !secondBox.contains(event.target) &&
          !secondBox2.contains(event.target) &&
          !event.target.closest(".menu-item") &&
          !event.target.closest(".open") &&
          !event.target.closest(".overlay")
        ) {
          secondBox.style.display = "none";
          secondBox2.style.display = "none";
          currentMenu = null;
        }
      });
      // When closing the nav, also hide the subheading div.
      closeBtn.addEventListener("click", () => {
        menuAnimation.reverse();
        const secondBox = document.getElementById("secondBox");
        const secondBox2 = document.getElementById("secondBox2");
        if (secondBox) {
          secondBox.style.display = "none";
        }
        if (secondBox2) {
          secondBox2.style.display = "none";
        }
        currentMenu = null;
      });

      // -----------------------------------
      // Subheading (secondBox) functionality
      // -----------------------------------
      const menuContent = {
        about: `
        `,
        explore: `
    <div class="flex justify-between py-2">
        <div class="w-[30%]">
          <h1 class=" lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
            <a href="#">Technical Clubs</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/dotslash">Dotslash</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/elevate">Elevate</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/crispr">Crispr</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/udhyam">Udhyam</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/iotics">Iotics</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/strokes">Strokes</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/dimensions">Dimensions</a>
          </h1>
        </div>
      
        <div class="w-[30%]">
          <h1 class=" lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white border-b-2 border-[#00457b]/20">
            <a href="#">Cultural Clubs</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/crescendo">Crescendo</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/dtraxia">Dtraxia</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/estoria">Estoria</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/orator">Orator</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="/club/probe">Probe</a>
          </h1>
        </div>
      
        <div class="w-[30%]">
          <h1 class=" lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
            <a href="#">Events</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="https://www.tantrafiesta.in/">Tantrafiesta</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
            <a href="https://www.abhivyaktifest.in/">Abhivyakti</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
               <a href="/others/Kshitij">Kshitij</a>
          </h1>
        </div>
      </div>
        `,
        governance: `
          <div class="flex justify-between py-2">
            <div class="w-[48%]">
                <h1 class=" lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
                <a href="#">Committee</a>
              </h1>
                <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/board-of-governors">Board of Governors</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/finance-committee">Finance Committee</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/senate">Senate</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/building-works-committee">Building Works Committee</a>
              </h1>
            </div>
            <div class="w-[48%]">
              <h1 class=" lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
                <a href="#">Admintration</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/chairman">Chairman</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/director">Director</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/registrar">Registrar</a>
              </h1>
              <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                <a href="/governance/staff">Staff</a>
              </h1>
            </div>
          </div>
        `,
        department: `
        `,
        admissions: `
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="admissions/undergraduate-btech">Undergraduate B.Tech</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="admissions/postgraduate">Postgraduate</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="admissions/ug-academic-rule-book">UG Academic Rule Book</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="admissions/pg-academic-rule-book">PG Academic Rule Book</a>
          </h1>
       
        `,
        alumni: `
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/alumni/Member">Members</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/alumni/MemberLogin">Member Login</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/alumni/AboutUs">About Us</a>
          </h1>
        `,
        placements: `
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/about-us">About Us</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/why-recruit-from-iiit-nagpur">Why Recruit from IIITN Nagpur?</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/placement-statistics">Placement Statistics</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/for-companies">For Companies</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/for-students">For Students</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/contact-tp">Contact T&amp;P</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/placements/internships">Internships</a>
          </h1>
        `,
        student: `
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/activities">Activities</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/achievements">Achievements</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/clinical-counselling">Clinical Counselling</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/scholarship">Scholarships</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/hostel">Hostel</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/student-mess">Student Mess</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/download">Download</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/convocation-2023">Convocation 2023</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/student/fees">Fees</a>
          </h1>
        `,
        nirf: `
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/nirf/nirf-2025">NIRF 2025</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/nirf/nirf-2024">NIRF 2024</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/nirf/nirf-2023">NIRF 2023</a>
          </h1>
        `,
        others: `
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/consultancy">Consultancy</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/institution-innovation-council">Institution Innovation Council</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/offcial-documents">Offcial Documents</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/electoral-literacy-club">Electoral Literacy Club</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/guest-house">Guest House</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/press-release">Press Release</a>
          </h1>
           <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/tender">Tender</a>
          </h1>
          <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/rti">RTI</a>
          </h1>
               <h1 class="hover:bg-[#00457b] hover:text-white lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
            <a href="/others/recruitment">Recruitment</a>
          </h1>
        `,
      };

      // Functions to update the top value for subheading div
      function updateSecondBoxTop() {
        const nav = document.getElementById("firstBox");
        const navHeight = nav.offsetHeight;
        const isTablet = window.matchMedia(
          "(min-width: 768px) and (max-width: 1024px)"
        ).matches;
        let navMin, navMax, topMin, topMax;
        if (isTablet) {
          navMin = 50;
          navMax = 80;
          topMin = 5.8;
          topMax = 10.3;
        } else {
          navMin = 70;
          navMax = 100;
          topMin = 4.5;
          topMax = 6.42;
        }
        const clampedNavHeight = Math.min(Math.max(navHeight, navMin), navMax);
        const ratio = (clampedNavHeight - navMin) / (navMax - navMin);
        const newTop = topMin + ratio * (topMax - topMin);
        gsap.to([secondBox, secondBox2], { duration: 0.3, top: newTop + "vw" });
      }

      function updateSecondBoxTopUp() {
        const nav = document.getElementById("firstBox");
        const navHeight = nav.offsetHeight;
        const isTablet = window.matchMedia(
          "(min-width: 768px) and (max-width: 1024px)"
        ).matches;
        let navMin, navMax, topMin, topMax;
        if (isTablet) {
          navMin = 50;
          navMax = 80;
          topMin = 5.8;
          topMax = 10.3;
        } else {
          navMin = 70;
          navMax = 100;
          topMin = 4.5;
          topMax = 6.42;
        }
        let newTop;
        if (window.scrollY === 0) {
          newTop = topMax;
        } else {
          const clampedNavHeight = Math.min(
            Math.max(navHeight, navMin),
            navMax
          );
          const ratio = (clampedNavHeight - navMin) / (navMax - navMin);
          newTop = topMin + ratio * (topMax - topMin);
        }
        gsap.to([secondBox, secondBox2], { duration: 0.3, top: newTop + "vw" });
      }

      let currentMenu = null;
      const menuItems = document.querySelectorAll(".menu-item");
      const secondBox = document.getElementById("secondBox");
      const secondBox2 = document.getElementById("secondBox2");

      menuItems.forEach((item) => {
        item.addEventListener("click", () => {
          const menuKey = item.getAttribute("data-menu");
          // Always hide both boxes
          secondBox.style.display = "none";
          secondBox2.style.display = "none";

          // Toggle off if same menu is clicked
          if (currentMenu === menuKey) {
            currentMenu = null;
            return; // Nothing else to do
          }

          // Otherwise, show the proper box
          if (menuKey === "governance" || menuKey === "department" || menuKey === "explore") {
            secondBox2.innerHTML =
              menuContent[menuKey] || "<p>No content available.</p>";
            // For governance, position is full width so we don't adjust left offset
            secondBox2.style.left = "0px";
            requestAnimationFrame(updateSecondBoxTop);
            secondBox2.style.display = "block";
          } else {
            const rect = item.getBoundingClientRect();
            const left = rect.left + window.scrollX;
            secondBox.innerHTML =
              menuContent[menuKey] || "<p>No content available.</p>";
            secondBox.style.left = left - 90 + "px";
            requestAnimationFrame(updateSecondBoxTop);
            secondBox.style.display = "block";
          }
          currentMenu = menuKey;
        });
      });
      let lastScroll = window.scrollY;
      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll) {
          // Scrolling down
          requestAnimationFrame(updateSecondBoxTop);
        } else {
          // Scrolling up
          requestAnimationFrame(updateSecondBoxTopUp);
        }
        lastScroll = currentScroll;
      });
    });
  }
}
nav();

function navMobile() {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Close all other open accordion contents
      document
        .querySelectorAll(".accordion-content")
        .forEach((otherContent) => {
          if (
            otherContent !== content &&
            otherContent.style.display === "block"
          ) {
            gsap.to(otherContent, {
              duration: 0.5,
              height: 0,
              ease: "power2.in",
              onComplete: () => {
                otherContent.style.display = "none";
              },
            });
          }
        });

      // Toggle the clicked accordion content
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        gsap.fromTo(
          content,
          { height: 0 },
          { duration: 0.5, height: "auto", ease: "power2.out" }
        );
      } else {
        gsap.to(content, {
          duration: 0.5,
          height: 0,
          ease: "power2.in",
          onComplete: () => {
            content.style.display = "none";
          },
        });
      }
    });
  });

  if (window.innerWidth <= 438) {
    document.addEventListener("DOMContentLoaded", function () {
      // ---------------------------
      // Nav open/close animation
      // ---------------------------
      const overlay = document.querySelector(".overlay2");
      const openBtn = document.querySelector(".open");
      const closeBtn = document.querySelector(".close2");

      let menuAnimation = gsap.timeline({ paused: true });
      menuAnimation.to(overlay, {
        clipPath: "circle(141.7% at 100% 0)",
        duration: 0.5,
        ease: "power2.out",
      });

      openBtn.addEventListener("click", () => {
        menuAnimation.play();
      });

      // When closing the nav, also hide the subheading div.
      closeBtn.addEventListener("click", () => {
        menuAnimation.reverse();
      });
    });
  }
}
navMobile();

function title() {
 
    gsap
    .timeline({ repeat: -1 }) // Infinite loop
    .to(".text-container", {
      y: "-35%",
      duration: 1,
      ease: "power2.inOut",
      delay: 2,
    }) // Move 2nd h1 up
    .to(".text-container", {
      y: "-80%",
      duration: 1,
      ease: "power2.inOut",
      delay: 2,
    }) // Move 3rd h1 up

  
}
title();

  let isOpen = false;
function toggleLanguages() {
        const langContainer = document.getElementById("languageSwitcher");
        const arrow = document.getElementById("arrow");

        if (!isOpen) {
            gsap.to(langContainer, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 0.4, ease: "power2.out" });
            gsap.to(arrow, { rotate: 180, duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(langContainer, { clipPath: "polygon(0 75%, 100% 75%, 100% 100%, 0% 100%)", duration: 0.4, ease: "power2.in" });
            gsap.to(arrow, { rotate: 0, duration: 0.3, ease: "power2.out" });
        }

        isOpen = !isOpen;
}

function updates(){
  function showContent(contentId) {

    document.querySelectorAll('.content-div').forEach(div => {
      div.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.classList.remove('active');
    });
    
    document.getElementById(contentId).classList.add('active');
    document.querySelector(`[onclick="showContent('${contentId}')"]`).classList.add('active');
  }
  document.addEventListener('DOMContentLoaded', () => {
    showContent('news');
  });
}
updates();

function announcement(){
  function handleResponsiveClass() {
    const elements = document.querySelectorAll('.ann1');
    
    if (window.innerWidth < 768) {
      // Remove .ann1 on mobile screens
      elements.forEach(el => el.classList.remove('ann1'));
    } else {
      // Add .ann1 on tablets and desktops
      elements.forEach(el => el.classList.add('ann1'));
    }
  }
  handleResponsiveClass();
  window.addEventListener('resize', handleResponsiveClass);  
}
announcement();
const searchIcon = document.getElementById('searchIcon');
const searchForm = document.getElementById('searchForm');
const searchInput = searchForm.querySelector('input[name="q"]');
const title2 = document.querySelector('.name'); // Get title2 element

searchIcon.addEventListener('click', function() {
  if (searchForm.classList.contains('active')) {
    searchForm.classList.remove('active');
    if(window.innerWidth<1024)
    title2.style.display = 'block'; // Show title2 when search is hidden
  } else {
    searchForm.classList.add('active');
    searchInput.focus();
    if(window.innerWidth<1024)
    title2.style.display = 'none'; // Hide title2 when search is active
  }
});


    // Optionally, hide the search field if it loses focus and is empty
    searchInput.addEventListener('blur', function() {
      if (searchInput.value.trim() === '') {
        searchForm.classList.remove('active');
        if(window.innerWidth<1024)
        title2.style.display = 'block';
      }
    });

    
    document.querySelectorAll('.category-heading').forEach(item => {
      item.addEventListener('click', function () {
          const link = this.getAttribute('data-link'); // Get the link from the data-link attribute
          if (link) {
              window.location.href = link; // Redirect to the link
          }
      });
  });
  