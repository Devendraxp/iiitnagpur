function swiper() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
    }
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
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
    });

    var swiper = new Swiper(".mySwiper9", {
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
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  
  }
  swiper();
  
  function boxInfo() {
    const detsButtons = document.querySelectorAll(".dets"); // Select all elements with .dets
    const detsBoxes = document.querySelectorAll(".dets-box"); // Select all elements with .dets-box
  
    detsButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        console.log("Clicked:", index);
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
          console.log("fef");
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
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
              <a href="#">Technical Clubs</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/dotslash">Dotslash</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/elevate">Elevate</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/crispr">Crispr</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/udhyam">Udhyam</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/iotics">Iotics</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/strokes">Strokes</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/technical/dimensions">Dimensions</a>
            </h1>
          </div>
        
          <div class="w-[30%]">
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white border-b-2 border-[#00457b]/20">
              <a href="#">Cultural Clubs</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/cultural/crescendo">Crescendo</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/cultural/dtraxia">Dtraxia</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/cultural/estoria">Estoria</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/cultural/orator">Orator</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/cultural/probe">Probe</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/clubs/cultural/eklavya">Eklavya</a>
            </h1>
          </div>
        
          <div class="w-[30%]">
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
              <a href="#">Events</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/events/tantrafiesta">Tantrafiesta</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/events/abhivyakti">Abhivyakti</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
              <a href="/events/kshitij">Kshitij</a>
            </h1>
          </div>
        </div>
          `,
          governance: `
            <div class="flex justify-between py-2">
              <div class="w-[48%]">
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
                  <a href="#>Committee</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/board-of-governors">Committee</a>
                </h1>
                  <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/board-of-governors">Board of Governors</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/finance-committee">Finance Committee</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/senate">Senate</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/building-works-committee">Building Works Committee</a>
                </h1>
              </div>
              <div class="w-[48%]">
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular bg-[#f26e32] text-center font-bold text-white">
                  <a href="#">Admintration</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/chairman">Chairman</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/director">Director</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/registrar">Registrar</a>
                </h1>
                <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border-b-2 border-[#00457b]/20">
                  <a href="/governance/staff">Staff</a>
                </h1>
              </div>
            </div>
          `,
          department: `
          `,
          admissions: `
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="admissions/undergraduate-btech">Undergraduate B.Tech</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="admissions/postgraduate">Postgraduate</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="admissions/ug-academic-rule-book">UG Academic Rule Book</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="admissions/pg-academic-rule-book">PG Academic Rule Book</a>
            </h1>
              <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="admissions/recruitment">Recruitment</a>
            </h1>
          `,
          alumni: `
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/alumni/Member">Members</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/alumni/MemberLogin">Member Login</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/alumni/AboutUs">About Us</a>
            </h1>
          `,
          placements: `
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/about-us">About Us</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/why-recruit-from-iiit-nagpur">Why Recruit from IIITN Nagpur?</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/placement-statistics">Placement Statistics</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/for-companies">For Companies</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/for-students">For Students</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/contact-tp">Contact T&amp;P</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/placements/internships">Internships</a>
            </h1>
          `,
          student: `
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/activities">Activities</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/achievements">Achievements</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/clinical-counselling">Clinical Counselling</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/scholarships">Scholarships</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/hostel">Hostel</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/student-mess">Student Mess</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/download">Download</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/convocation-2023">Convocation 2023</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/fees">Fees</a>
            </h1>
             <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/student/fees">Exchange Program</a>
            </h1>
          `,
          nirf: `
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/nirf/nirf-2025">NIRF 2025</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/nirf/nirf-2024">NIRF 2024</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/nirf/nirf-2023">NIRF 2023</a>
            </h1>
          `,
          others: `
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/consultancy">Consultancy</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/institution-innovation-council">Institution Innovation Council</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/offcial-documents">Offcial Documents</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/electoral-literacy-club">Electoral Literacy Club</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/guest-house">Guest House</a>
            </h1>
            <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/press-release">Press Release</a>
            </h1>
             <h1 class="lg:py-2 md:py-[2.5px] px-4 lg:text-[1vw] md:text-[1.2vw] font-regular text-[#00457b] border border-[#00457b]/20">
              <a href="/others/tender">Tender</a>
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
          console.log("updateSecondBoxTop:", newTop);
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
        y: "-75%",
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
  
  // Run on page load
  handleResponsiveClass();
  
  // Listen for window resize events
  window.addEventListener('resize', handleResponsiveClass);


  const searchIcon = document.getElementById('searchIcon');
    const searchForm = document.getElementById('searchForm');
    const searchInput = searchForm.querySelector('input[name="q"]');

    searchIcon.addEventListener('click', function() {
      // Toggle the active class to show or hide the search form
      if (searchForm.classList.contains('active')) {
        searchForm.classList.remove('active');
      } else {
        searchForm.classList.add('active');
        searchInput.focus();
      }
    });

    // Optionally, hide the search field if it loses focus and is empty
    searchInput.addEventListener('blur', function() {
      if (searchInput.value.trim() === '') {
        searchForm.classList.remove('active');
      }
    });


    // Department Data (Descriptions & Links)
    const departments = {
      basic_science: {
          description: `
            <div class="about px-4 pt-10 text-xl">
    <p class="text-gray-700">
        The Department of Basic Sciences at <b>Indian Institute of Information Technology Nagpur</b> was established in 2016 and is currently headed by <b>Dr. Prasad V. Joshi</b>.
        The Department of Basic Sciences brings together the disciplines of Mathematics, Applied Sciences, Humanities, Social Sciences, Mechanical Engineering, and Electrical Engineering under one roof.
        <br><br>
        The department envisages high-quality education and cutting-edge interdisciplinary research in science and technology. It acts as a foundation for all core Information Technology branches and offers various core courses such as:
        <b>Applied Sciences, Applied Mathematics, Communication Skills, Environmental Studies, Mechanics and Graphics, Electrical Engineering.</b>
        <br><br>
        The department caters to Information Technology streams by offering electives like <b>Robotics, Technical Communication, Professional Ethics, Policy Governance, Neuro-fuzzy techniques</b>, etc.
        The 15 proficient faculty members of the department bring various interdisciplinary research-oriented areas under one gambit as envisioned in <b>NEP 2020</b>.
        This unique course blends the best of contemporary Basic Sciences and Engineering to create professionals equally comfortable with human values, applied science, and technology.
        <br><br>
        The department integrates software tools such as <b>MATLAB, AUTOCAD, 3Ds Max</b>, and applications of programming in <b>C/C++</b> into Mathematics, Graphics, and other courses.
        Modeling and Simulation platforms like <b>Webots, Robot Operating System, RVC Toolbox</b> make the curriculum enriching for Electronics and Computer Science students.
        <br><br>
        Complete with human and social understanding, the department is well-known for its breadth of knowledge and fosters appreciation of intellectual excellence, academic integrity, accountability, and creativity.
        <br><br>
        The department is privileged with proficient faculty, all holding <b>PhD degrees</b> from renowned institutes across India and abroad, specializing in interdisciplinary fields.
        <br><br>
        The department hosts <b>five developed laboratories:</b>
        <ul class="list-disc pl-6">
            <li>Applied Sciences Lab</li>
            <li>Mechanics & Graphics Lab</li>
            <li>Robotics Lab</li>
            <li>Language Lab</li>
            <li>Electrical Engineering Lab</li>
        </ul>
    </p>
</div>

          `,
          links: ["Faculty", "Achievements", "Research", "Events", "Staff", "Projects", "Laboratory", "BoS"]
      },
      cse: {
        description: `
       <div class="about px-4 py-10 text-xl">
    <p class="text-gray-700">
        The <b>Department of Computer Science and Engineering</b> at <b>IIIT Nagpur</b> was established in the year <b>2016</b>.
        Since then, it has grown into a <b>center for excellence, innovation, and research</b> with dedicated faculty and staff, highly motivated students, 
        state-of-the-art facilities, and an innovative teaching-learning environment.
        <br><br>
        The department offers four undergraduate programs:
        <ul class="list-disc pl-6">
            <li>B.Tech in Computer Science and Engineering (Intake: 223)</li>
            <li>B.Tech in CSE with specialization in Artificial Intelligence & Machine Learning (Intake: 66)</li>
            <li>B.Tech in CSE with specialization in Data Science & Analytics (Intake: 66)</li>
            <li>B.Tech in CSE with specialization in Human-Computer Interaction & Gaming Technology (Intake: 66)</li>
        </ul>
        Additionally, the department introduced a <b>Ph.D. program</b> in the academic year <b>2018-19</b> for research enthusiasts.
        <br><br>
        The department is committed to fostering <b>interdisciplinary research and innovation</b>, continuously working to provide students 
        with a cutting-edge curriculum aimed at solving real-world problems in industry and society.
        <br><br>
        Equipped with advanced laboratories, the latest technologies, platforms, and best-in-class computing facilities, 
        the department also acquires specialized hardware and software for research projects based on specific needs.
        Additionally, it features a <b>dedicated research lab</b> for research activities.
        <br><br>
        The department has proficient faculty members with <b>PhDs</b> from prestigious institutions such as IITs, NITs, IIITs, foreign universities, 
        and other renowned universities across India, specializing in various research areas:
        <ul class="list-disc pl-6">
            <li>Artificial Intelligence and Machine Learning</li>
            <li>Deep Learning</li>
            <li>Natural Language Processing</li>
            <li>Parallel Computing</li>
            <li>High-Performance Computing</li>
            <li>Bioinformatics</li>
            <li>Internet of Things (IoT)</li>
            <li>Pattern Recognition</li>
        </ul>
        <br>
        The department is currently headed by <b>Dr. Nishat Afshan Ansari</b>.
    </p>
</div>

    `,
            links: ["Faculty", "Achievements", "Research", "Events", "Staff", "Projects", "Laboratory", "BoS"]
      },
      ece: {
          description: `
          <div class="about px-4 pt-10 text-xl">
    <p class="text-gray-700">
        The <b>Department of Electronics & Communication Engineering (ECE)</b> was established in <b>2016</b>. It is currently headed by <b>Dr. Harsh Goud</b>. 
        The department offers two undergraduate programs:
        <ul class="list-disc pl-6">
            <li>B.Tech in Electronics & Communication Engineering</li>
            <li>B.Tech in ECE with specialization in Internet of Things (IoT)</li>
        </ul>
        The department also offers a <b>Ph.D. program</b>, with <b>32 research scholars</b> currently enrolled.
        <br><br>
        The department is dedicated to <b>innovation and research</b> in inter-disciplinary areas, specializing in:
        <ul class="list-disc pl-6">
            <li>Signal, Image, and Video Processing</li>
            <li>Embedded Systems</li>
            <li>Antenna Design</li>
            <li>VLSI Design</li>
        </ul>
        <br>
        The department has strong <b>industry collaborations</b>, engages in <b>consultancy activities</b>, and regularly organizes events such as:
        <ul class="list-disc pl-6">
            <li>Short-Term Training Programs (STTP)</li>
            <li>Faculty Development Programs (FDP)</li>
            <li>AICTE-sponsored Workshops</li>
            <li>Expert Lectures</li>
        </ul>
        <br>
        The department is equipped with <b>state-of-the-art laboratories</b> and an advanced curriculum tailored for industry needs.
        <br><br>
        Faculty members hold <b>PhDs</b> from renowned institutes like <b>IITs, NITs, and international universities</b>. 
        <br><br>
        <b>Faculty Achievements:</b>
        <ul class="list-disc pl-6">
            <li>Over <b>7 patents</b> to their name</li>
            <li>More than <b>120 journal publications</b></li>
            <li>Over <b>55 conference papers</b></li>
            <li><b>13+ book chapters</b> published internationally</li>
            <li>Secured research project funding of <b>₹1.5 Cr+</b></li>
        </ul>
        <br>
        
        <h2 class="font-bold text-xl text-[#00457b]">B.Tech. in Electronics & Communication Engineering</h2>
        <br>
        The department offers a <b>B.Tech in Electronics and Communication Engineering</b>, focusing on:
        <ul class="list-disc pl-6">
            <li>Embedded Systems</li>
            <li>Internet of Things (IoT)</li>
            <li>Communication Technologies</li>
            <li>Control Systems</li>
            <li>Image and Computer Vision</li>
            <li>CMOS Design</li>
            <li>Machine Learning & Artificial Intelligence</li>
        </ul>
        <br>
        The curriculum is updated regularly to align with <b>industry trends</b>. The department offers <b>advanced experimental labs</b>, rigorous lab sessions, 
        and <b>mini-projects</b> to enhance practical skills. More than <b>480 students</b> are currently enrolled in this program.
        <br><br>
        
        <b>Career Opportunities:</b>
        <ul class="list-disc pl-6">
            <li>Wireless Communication & Sensor Networks</li>
            <li>Image and Video Processing</li>
            <li>Biomedical Signal Processing</li>
            <li>IoT and Artificial Intelligence</li>
            <li>Computer Vision</li>
            <li>Antenna Design</li>
            <li>VLSI Design</li>
            <li>Embedded System Design</li>
        </ul>
        <br>

        <h2 class="font-bold text-xl text-[#00457b]">B.Tech. in ECE (Internet of Things)</h2>
        <br>
        The B.Tech program in <b>ECE (Internet of Things - IoT)</b> equips students with:
        <ul class="list-disc pl-6">
            <li>A strong foundation in <b>Electronic Engineering</b> and <b>Computer Science</b></li>
            <li>Deep knowledge of <b>IoT devices, systems, and networks</b></li>
            <li>Expertise in <b>Sensors & Instrumentation</b>, <b>Chip Design</b>, and <b>IoT Security</b></li>
        </ul>
        <br>
        IoT applications are expanding rapidly, influencing areas such as:
        <ul class="list-disc pl-6">
            <li>Urban Transport</li>
            <li>Medical Devices</li>
            <li>Smart Homes</li>
            <li>Wearable Tech</li>
        </ul>
        <br>
        Currently, the department houses more than <b>645 students</b>.
    </p>
</div>

          `,
            links: ["Faculty", "Achievements", "Research", "Events", "Staff", "Projects", "Laboratory", "BoS"]
      },
      doctoral: {
          description: `
              The Doctoral Program at IIIT Nagpur is designed for researchers and scholars who wish to pursue advanced studies in engineering and sciences. 
              The program offers Ph.D. opportunities in Computer Science, Electronics, Applied Mathematics, and more.
              <br><br>
              The department provides financial support, research funding, and international collaboration opportunities.
          `,
          links: ["Research Areas", "Guides", "Admissions", "Publications", "Funding Opportunities", "Conferences", "Workshops"]
      },
      programs: {
          description: `
              IIIT Nagpur offers a variety of programs across multiple disciplines. From undergraduate B.Tech courses to postgraduate and Ph.D. programs, 
              the institute is committed to providing quality education in emerging technologies.
              <br><br>
              Programs focus on industry-relevant skills, innovation, and interdisciplinary learning.
          `,
          links: ["B.Tech Programs", "M.Tech Programs", "Ph.D.", "Research Collaborations", "Internships", "Placements", "Workshops"]
      }
  };

  // Function to change department
  function changeDepartment(dept) {
    // Get all tab buttons
    const tabs = document.querySelectorAll(".tab-btn2");

    // Remove active styles from all buttons
    tabs.forEach(tab => {
        tab.classList.remove("bg-[#00457b]", "text-white");
        tab.classList.add("bg-white", "text-[#00457b]");
    });

    // Highlight the active tab
    const activeTab = document.querySelector(`[onclick="changeDepartment('${dept}')"]`);
    if (activeTab) {
        activeTab.classList.add("bg-[#00457b]", "text-white");
        activeTab.classList.remove("bg-white", "text-[#00457b]");
    }

    // Update the about section
    document.getElementById("tab-description").innerHTML = departments[dept].description;

    // Update explore links
    const exploreLinksContainer = document.getElementById("explore-links");
    exploreLinksContainer.innerHTML = ""; // Clear previous links

    departments[dept].links.forEach(link => {
        const anchor = document.createElement("a");
        anchor.href = `/${dept}/${link.toLowerCase().replace(/\s+/g, '')}`; // Generate URL dynamically
        anchor.innerHTML = `<h1 class="bg-white border-2 border-[#00457b] text-[#00457b] px-4 py-2 rounded-md hover:bg-[#00457b] hover:text-white transition-all">${link}</h1>`;
        exploreLinksContainer.appendChild(anchor);
    });
}


  // Load Basic Science by default on page load
  window.onload = function() {
      changeDepartment('cse');
  };

  document.getElementById('yearFilter').addEventListener('change', filterItems);
  document.getElementById('deptFilter').addEventListener('change', filterItems);
  document.getElementById('categoryFilter').addEventListener('change', filterItems);

  function filterItems() {
    const year = document.getElementById('yearFilter').value;
    const dept = document.getElementById('deptFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const items = document.querySelectorAll('.data-item');

    // Update the URL with query parameters
    const params = new URLSearchParams();
    if (year !== "all") params.set("year", year);
    if (dept !== "all") params.set("dept", dept);
    if (category !== "all") params.set("category", category);

    // Push updated URL without reloading the page
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);

    // Apply filtering logic
    items.forEach(item => {
        const itemYear = item.getAttribute('data-year');
        const itemDept = item.getAttribute('data-dept');
        const itemCategory = item.getAttribute('data-category');

        if ((year === "all" || year === itemYear) &&
            (dept === "all" || dept === itemDept) &&
            (category === "all" || category === itemCategory)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}


  // Assign Tailwind colors dynamically to category badges
  document.querySelectorAll('.category-badge').forEach(badge => {
      const category = badge.getAttribute('data-category');
      const colors = {
          "research": "bg-green-500",
          "seminar": "bg-blue-500",
          "workshop": "bg-orange-500",
          "funded": "bg-red-500"
      };

      badge.classList.add(colors[category] || "bg-gray-500");
  });

  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category"); // Get 'category' from URL

    if (category) {
        const categoryFilter = document.getElementById("categoryFilter");
        if (categoryFilter) {
            categoryFilter.value = category; // Set the dropdown value
        }
    }

    // Call filterItems() after setting the dropdown
    filterItems();
});
