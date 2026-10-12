/**
 * ==========================================================================
 * 🌸 PROJECT: HAPPY BIRTHDAY CẨM LÌNH (20TH BIRTHDAY) - RESCUE EARTH
 * 👨‍💻 DEVELOPED & ARCHITECTED BY: HoangTung24Jul
 * 🔒 COPYRIGHT (C) 2026 HoangTung24Jul. ALL RIGHTS RESERVED.
 * 💡 All rights reserved. Logic, animations, state management by HoangTung24Jul.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 🌟 DevTools Signature / Đánh dấu bản quyền tác giả
    console.log(
        "%c🌸 DỰ ÁN SINH NHẬT CẨM LÌNH 20 TUỔI 🌸\n" +
        "%c👨‍💻 Được thiết kế & lập trình độc quyền bởi: HoangTung24Jul\n" +
        "%c🔒 Copyright (c) 2026 HoangTung24Jul. All rights reserved.",
        "color: #FF5E7E; font-size: 15px; font-weight: bold; padding: 4px 0;",
        "color: #8E24AA; font-size: 13px; font-weight: bold; padding: 2px 0;",
        "color: #777; font-size: 11px; font-style: italic;"
    );
    // ==========================================
    // 1. Canvas Background Doodle Animation
    // ==========================================
    const bgCanvas = document.getElementById("bg-canvas");
    const bgCtx = bgCanvas ? bgCanvas.getContext("2d") : null;
    let particles = [];

    function resizeBgCanvas() {
        if (!bgCanvas) return;
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeBgCanvas);
    resizeBgCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * bgCanvas.width;
            this.y = Math.random() * bgCanvas.height;
            this.size = Math.random() * 14 + 10;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = -Math.random() * 0.8 - 0.3;
            this.type = Math.random() > 0.4 ? "heart" : (Math.random() > 0.5 ? "atom" : "star");
            this.color = ["#FFB6C1", "#FFC0CB", "#E6E6FA", "#FFE4E1", "#D8BFD8"][Math.floor(Math.random() * 5)];
            this.alpha = Math.random() * 0.5 + 0.3;
            this.rot = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.02;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rot += this.rotSpeed;
            if (this.y < -50 || this.x < -50 || this.x > bgCanvas.width + 50) {
                this.reset();
                this.y = bgCanvas.height + 20;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;

            if (this.type === "heart") {
                const s = this.size / 15;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
                ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
                ctx.fill();
            } else if (this.type === "star") {
                const s = this.size * 0.6;
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * s, -Math.sin((18 + i * 72) * Math.PI / 180) * s);
                    ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (s / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (s / 2));
                }
                ctx.closePath();
                ctx.fill();
            } else {
                const s = this.size * 0.8;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.ellipse(0, 0, s, s / 3, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(0, 0, s, s / 3, Math.PI / 3, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, s / 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    if (bgCanvas) {
        for (let i = 0; i < 35; i++) {
            particles.push(new Particle());
        }
        function animateBg() {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw(bgCtx);
            });
            requestAnimationFrame(animateBg);
        }
        animateBg();
    }

    // ==========================================
    // 2. Confetti System
    // ==========================================
    const confettiCanvas = document.getElementById("confetti-canvas");
    const confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;
    let confettiPieces = [];
    let confettiActive = false;

    function resizeConfetti() {
        if (!confettiCanvas) return;
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeConfetti);
    resizeConfetti();

    function triggerConfetti(durationMs = 5000) {
        if (!confettiCanvas) return;
        confettiActive = true;
        confettiPieces = [];
        const colors = ["#FF8DA1", "#FFC0CB", "#E6E6FA", "#D8BFD8", "#FFF", "#FFD166", "#98DBC6", "#69F0AE"];
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 350,
                y: confettiCanvas.height / 2 + (Math.random() - 0.5) * 150,
                size: Math.random() * 12 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.8) * 20,
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 16,
                shape: Math.random() > 0.5 ? "circle" : "rect"
            });
        }

        const startTime = Date.now();
        function updateConfetti() {
            if (!confettiActive) return;
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiPieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35;
                p.vx *= 0.98;
                p.rot += p.rotSpeed;

                confettiCtx.save();
                confettiCtx.translate(p.x, p.y);
                confettiCtx.rotate((p.rot * Math.PI) / 180);
                confettiCtx.fillStyle = p.color;
                if (p.shape === "circle") {
                    confettiCtx.beginPath();
                    confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    confettiCtx.fill();
                } else {
                    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                }
                confettiCtx.restore();
            });

            if (Date.now() - startTime < durationMs || confettiPieces.some(p => p.y < confettiCanvas.height)) {
                requestAnimationFrame(updateConfetti);
            } else {
                confettiActive = false;
                confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }
        updateConfetti();
    }

    // ==========================================
    // 3. Stage Navigation Management
    // ==========================================
    const stages = {
        intro: document.getElementById("stage-intro"),
        stage1: document.getElementById("stage-1"),
        stage2: document.getElementById("stage-2"),
        stage3: document.getElementById("stage-3"),
        stage4: document.getElementById("stage-4")
    };

    function showStage(stageKey) {
        Object.values(stages).forEach(stage => {
            if (stage) {
                stage.classList.remove("active");
                stage.style.display = "none";
            }
        });
        const target = stages[stageKey];
        if (target) {
            target.style.display = "flex";
            setTimeout(() => {
                target.classList.add("active");
            }, 50);
        }

        if (stageKey === "stage1") initStage1();
        if (stageKey === "stage2") initStage2();
        if (stageKey === "stage3") initStage3();
        if (stageKey === "stage4") initStage4();
    }

    // ==========================================
    // 3.1 Đoạn Phim Mô Phỏng: Chernobyl Meltdown & Zoom Máy Tính
    // ==========================================
    const cutsceneStage = document.getElementById("stage-cutscene");
    const cutsceneViewport = document.getElementById("cutscene-viewport");
    const cutsceneEngineer = document.getElementById("cutscene-engineer");
    const engineerBubble = document.getElementById("engineer-bubble");
    const emergencySafetyBtn = document.getElementById("emergency-safety-btn");
    const btnSkipCutscene = document.getElementById("btn-skip-cutscene");
    const cutsceneWhiteFlash = document.getElementById("cutscene-white-flash");

    let isCutsceneRunning = false;
    let cutsceneTimers = [];

    function startCutsceneSequence() {
        if (isCutsceneRunning) return;
        isCutsceneRunning = true;
        let isSkipped = false;
        cutsceneTimers.forEach(t => clearTimeout(t));
        cutsceneTimers = [];

        function registerTimer(fn, ms) {
            const t = setTimeout(fn, ms);
            cutsceneTimers.push(t);
            return t;
        }

        function finishCutscene() {
            if (isSkipped) return;
            isSkipped = true;
            isCutsceneRunning = false;
            cutsceneTimers.forEach(t => clearTimeout(t));

            if (cutsceneWhiteFlash) {
                cutsceneWhiteFlash.classList.add("flash-active");
                setTimeout(() => {
                    if (cutsceneStage) {
                        cutsceneStage.classList.remove("active");
                        cutsceneStage.style.display = "none";
                    }
                    showStage("stage1");
                    setTimeout(() => {
                        cutsceneWhiteFlash.classList.remove("flash-active");
                    }, 350);
                }, 300);
            } else {
                if (cutsceneStage) {
                    cutsceneStage.classList.remove("active");
                    cutsceneStage.style.display = "none";
                }
                showStage("stage1");
            }
        }

        // Bắt đầu còi hú Chernobyl & Geiger Counter
        window.soundEngine.init();
        window.soundEngine.startMeltdownSiren();
        window.soundEngine.startGeigerCounter();

        // Ẩn Intro, Hiện Cutscene
        if (stages.intro) {
            stages.intro.classList.remove("active");
            stages.intro.style.display = "none";
        }
        if (cutsceneStage) {
            cutsceneStage.style.display = "flex";
            setTimeout(() => cutsceneStage.classList.add("active"), 30);
        }

        // Reset trạng thái các phần tử cutscene
        if (cutsceneEngineer) cutsceneEngineer.classList.remove("running", "at-desk");
        if (cutsceneViewport) cutsceneViewport.classList.remove("zooming-into-monitor", "screen-rumble");
        if (emergencySafetyBtn) emergencySafetyBtn.classList.remove("pressed");
        if (engineerBubble) {
            engineerBubble.classList.remove("show");
            engineerBubble.textContent = "BÁO ĐỘNG ĐỎ! LÒ PHẢN ỨNG QUÁ TẢI RỒI! 😱💥";
        }

        // 0.3s: Kỹ sư bắt đầu chạy dồn dập vào phòng điều khiển
        registerTimer(() => {
            if (cutsceneEngineer) cutsceneEngineer.classList.add("running");
            window.soundEngine.playFootsteps(7);
            if (engineerBubble) engineerBubble.classList.add("show");
        }, 300);

        // 2.0s: Kỹ sư chạy tới bàn máy tính
        registerTimer(() => {
            if (cutsceneEngineer) cutsceneEngineer.classList.add("at-desk");
            if (engineerBubble) {
                engineerBubble.textContent = "BẤM NÚT AN TOÀN TRÊN MÁY TÍNH CẨM LÌNH ƠI! 🚨";
            }
        }, 2000);

        // 2.3s: Kỹ sư đập sập nút An Toàn khẩn cấp!
        registerTimer(() => {
            if (emergencySafetyBtn) emergencySafetyBtn.classList.add("pressed");
            window.soundEngine.playButtonSlam();
            if (cutsceneViewport) cutsceneViewport.classList.add("screen-rumble");
        }, 2300);

        // 3.4s: Camera bắt đầu Zoom siêu thực 3D lao thẳng vào màn hình máy tính!
        registerTimer(() => {
            window.soundEngine.playCameraWhoosh();
            if (cutsceneViewport) cutsceneViewport.classList.add("zooming-into-monitor");
            if (engineerBubble) engineerBubble.classList.remove("show");
        }, 3400);

        // 5.2s: Chớp sáng và chuyển mượt mà sang Chặng 1 để nhập mật khẩu!
        registerTimer(() => {
            finishCutscene();
        }, 5200);

        // Nút bỏ qua nếu muốn vào thẳng
        if (btnSkipCutscene) {
            btnSkipCutscene.onclick = (e) => {
                e.stopPropagation();
                window.soundEngine.playClick();
                finishCutscene();
            };
        }
    }

    // Nút Bắt đầu từ Intro Screen -> Chạy Đoạn Phim Cutscene!
    const btnStartIntro = document.getElementById("btn-start-intro");
    if (btnStartIntro) {
        btnStartIntro.addEventListener("click", () => {
            window.soundEngine.playClick();
            startCutsceneSequence();
        });
    }

    // ==========================================
    // 4. CHẶNG 1: THẢM HỌA HẠT NHÂN CHERNOBYL BÙNG NỔ
    // ==========================================
    const alarmStrobe = document.getElementById("alarm-strobe");
    const reactorCard = document.getElementById("reactor-card");
    const pinInputs = Array.from(document.querySelectorAll(".pin-nuclear"));
    const reactorFeedback = document.getElementById("reactor-feedback");
    const btnNextStage1 = document.getElementById("btn-next-stage1");
    const atomNucleus = document.getElementById("atom-nucleus");
    const coreSymbol = document.getElementById("core-symbol");
    const warningTitle = document.getElementById("reactor-warning-title");
    const hudTemp = document.getElementById("hud-temp-val");
    const hudRad = document.getElementById("hud-rad-val");
    const hudCountdown = document.getElementById("hud-countdown-val");
    const btnToggleSiren = document.getElementById("btn-toggle-siren");
    const sirenStateText = document.getElementById("siren-state-text");

    let countdownSeconds = 45;
    let countdownInterval = null;
    let tempJitterInterval = null;
    let isSirenMuted = false;

    function initStage1() {
        // Bắt đầu còi hú Chernobyl & Geiger Counter
        if (alarmStrobe) alarmStrobe.classList.add("active");
        if (reactorCard) reactorCard.classList.add("meltdown-active");

        if (!isSirenMuted) {
            window.soundEngine.startMeltdownSiren();
            window.soundEngine.startGeigerCounter();
        }

        // Bắt đầu đếm ngược tự hủy kịch tính
        startMeltdownTimer();

        // Biến thiên nhiệt độ thời gian thực quanh 3,820°C - 3,890°C
        startTemperatureJitter();

        // Tự động focus ô đầu tiên
        if (pinInputs.length > 0) {
            pinInputs[0].focus();
        }
    }

    function startMeltdownTimer() {
        if (countdownInterval) clearInterval(countdownInterval);
        countdownSeconds = 45;
        countdownInterval = setInterval(() => {
            countdownSeconds--;
            if (countdownSeconds < 0) countdownSeconds = 45; // lặp lại căng thẳng
            const secStr = String(countdownSeconds).padStart(2, "0");
            if (hudCountdown) hudCountdown.textContent = `00:${secStr}`;
        }, 1000);
    }

    function startTemperatureJitter() {
        if (tempJitterInterval) clearInterval(tempJitterInterval);
        tempJitterInterval = setInterval(() => {
            if (reactorCard && !reactorCard.classList.contains("safe")) {
                const baseTemp = 3820;
                const jitter = Math.floor(Math.random() * 80);
                if (hudTemp) hudTemp.textContent = `${(baseTemp + jitter).toLocaleString()} °C`;
            }
        }, 350);
    }

    // Nút bật tắt còi hú & Geiger
    if (btnToggleSiren) {
        btnToggleSiren.addEventListener("click", () => {
            isSirenMuted = !isSirenMuted;
            if (isSirenMuted) {
                window.soundEngine.stopMeltdownSiren();
                window.soundEngine.stopGeigerCounter();
                if (sirenStateText) sirenStateText.textContent = "Đã tạm tắt còi";
            } else {
                if (!reactorCard.classList.contains("safe")) {
                    window.soundEngine.startMeltdownSiren();
                    window.soundEngine.startGeigerCounter();
                    if (sirenStateText) sirenStateText.textContent = "Đang hú dồn dập";
                }
            }
        });
    }

    window.toggleNuclearAlarm = function() {
        if (btnToggleSiren) btnToggleSiren.click();
    };

    pinInputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            const val = e.target.value.replace(/[^0-9]/g, "");
            e.target.value = val ? val[val.length - 1] : "";
            
            if (e.target.value) {
                input.classList.add("filled");
                window.soundEngine.playClick();
                if (index < pinInputs.length - 1) {
                    pinInputs[index + 1].focus();
                }
            } else {
                input.classList.remove("filled");
            }
            checkFullPasscode();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && index > 0) {
                pinInputs[index - 1].focus();
            }
        });

        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData).getData("text").trim();
            const digits = pasteData.replace(/[^0-9]/g, "").slice(0, 8);
            if (digits) {
                digits.split("").forEach((d, i) => {
                    if (pinInputs[i]) {
                        pinInputs[i].value = d;
                        pinInputs[i].classList.add("filled");
                    }
                });
                const nextFocus = Math.min(digits.length, 7);
                pinInputs[nextFocus].focus();
                checkFullPasscode();
            }
        });
    });

    function checkFullPasscode() {
        const entered = pinInputs.map(inp => inp.value).join("");
        if (entered.length === 8) {
            if (entered === CONFIG.passcode) {
                // ĐÚNG MẬT KHẨU: 13102006 -> KÍCH HOẠT DẬP TẮT LÒ AZ-5
                handleReactorSuccess();
            } else {
                // SAI MẬT KHẨU
                handleReactorError();
            }
        }
    }

    function handleReactorError() {
        window.soundEngine.playError();
        reactorFeedback.textContent = "💥 MÃ NGẮT SAI! LÕI PHẢN ỨNG CÀNG BÙNG NỔ DỮ DỘI HƠN! CẨM LÌNH THỬ LẠI NHANH LÊN NÀO! 🔥";
        reactorFeedback.className = "msg-feedback error";

        // Nhiệt độ vọt lên đột biến
        if (hudTemp) hudTemp.textContent = "4,250 °C ⚠️";

        pinInputs.forEach(inp => {
            inp.classList.add("shake");
            setTimeout(() => inp.classList.remove("shake"), 500);
        });
    }

    function handleReactorSuccess() {
        // DỪNG CÒI HÚ & DỪNG GEIGER COUNTER
        window.soundEngine.stopMeltdownSiren();
        window.soundEngine.stopGeigerCounter();

        // PHÁT TIẾNG ĐẬP THANH ĐIỀU KHIỂN AZ-5 & XẢ KHÍ LÀM MÁT
        window.soundEngine.playHeavyClank();
        setTimeout(() => window.soundEngine.playSteamRelease(), 250);
        setTimeout(() => window.soundEngine.playSuccess(), 800);

        // TẮT BÁO ĐỘNG ĐỎ & RUNG LẮC
        if (alarmStrobe) alarmStrobe.classList.remove("active");
        if (reactorCard) {
            reactorCard.classList.remove("meltdown-active");
            reactorCard.classList.add("safe");
        }

        // DỪNG ĐẾM NGƯỢC
        if (countdownInterval) clearInterval(countdownInterval);
        if (tempJitterInterval) clearInterval(tempJitterInterval);

        // HẠ NHIỆT ĐỘ VÀ BỨC XẠ XUỐNG MỨC HOÀN TOÀN AN TOÀN
        if (hudTemp) hudTemp.textContent = "25 °C";
        if (hudRad) hudRad.textContent = "0.00 R/h";
        if (hudCountdown) hudCountdown.textContent = "AN TOÀN";

        // LÕI PHẢN ỨNG BIẾN THÀNH TRÁI ĐẤT SINH NHẬT
        if (coreSymbol) coreSymbol.innerHTML = "🌍🌸";

        if (warningTitle) {
            warningTitle.textContent = "🎉 CẨM LÌNH ĐÃ DẬP TẮT THÀNH CÔNG VỤ NỔ CHERNOBYL! TRÁI ĐẤT AN TOÀN! 💖✨";
        }

        reactorFeedback.textContent = "✨ Thanh điều khiển AZ-5 đã chèn vào thành công! Toàn bộ bức xạ đã tan biến thành những bông hoa rực rỡ mừng sinh nhật Lình! 🌸";
        reactorFeedback.className = "msg-feedback success";

        // Khóa input
        pinInputs.forEach(inp => inp.setAttribute("disabled", "true"));

        // BẮN PHÁO HOA KHỔNG LỒ
        triggerConfetti(7000);

        // Hiện nút Tiếp tục
        if (btnNextStage1) {
            btnNextStage1.style.display = "inline-flex";
            btnNextStage1.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    if (btnNextStage1) {
        btnNextStage1.addEventListener("click", () => {
            window.soundEngine.playClick();
            showStage("stage2");
        });
    }

    // ==========================================
    // 5. CHẶNG 2: Cuộc Gọi Giải Cứu Từ Jungkook (Fake FaceTime)
    // ==========================================
    const callScreen = document.getElementById("call-screen");
    const inCallScreen = document.getElementById("in-call-screen");
    const btnAcceptCall = document.getElementById("btn-accept-call");
    const btnDeclineCall = document.getElementById("btn-decline-call");
    const callTimerEl = document.getElementById("call-timer");
    const vietsubEl = document.getElementById("vietsub-text");
    const btnNextStage2 = document.getElementById("btn-next-stage2");
    let callInterval = null;

    function initStage2() {
        if (callScreen) callScreen.style.display = "flex";
        if (inCallScreen) inCallScreen.classList.remove("active");
        if (btnNextStage2) btnNextStage2.style.display = "none";
        if (vietsubEl) vietsubEl.textContent = "";

        window.soundEngine.startRingtone();
    }

    const wrapDeclineCall = document.getElementById("wrap-decline-call");
    const captionDecline = document.getElementById("caption-decline");

    if (wrapDeclineCall && btnDeclineCall) {
        const evadeButton = () => {
            const container = wrapDeclineCall.parentElement;
            if (!container) return;
            const maxX = Math.max(80, container.clientWidth - wrapDeclineCall.clientWidth - 20);
            const randomX = Math.max(10, Math.floor(Math.random() * maxX));
            const randomY = (Math.random() - 0.5) * 60;

            wrapDeclineCall.style.position = "absolute";
            wrapDeclineCall.style.left = `${randomX}px`;
            wrapDeclineCall.style.transform = `translateY(${randomY}px) scale(0.95)`;
        };

        wrapDeclineCall.addEventListener("mouseenter", evadeButton);
        btnDeclineCall.addEventListener("mouseenter", evadeButton);
        btnDeclineCall.addEventListener("click", (e) => {
            e.preventDefault();
            evadeButton();
            if (captionDecline) {
                captionDecline.textContent = "Không được tắt! 🐰😜";
                captionDecline.style.color = "#FFD166";
            }
        });
    }

    if (btnAcceptCall) {
        btnAcceptCall.addEventListener("click", () => {
            window.soundEngine.stopRingtone();
            window.soundEngine.playClick();

            if (callScreen) callScreen.style.display = "none";
            if (inCallScreen) inCallScreen.classList.add("active");

            let seconds = 0;
            if (callInterval) clearInterval(callInterval);
            callInterval = setInterval(() => {
                seconds++;
                const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
                const secs = String(seconds % 60).padStart(2, "0");
                if (callTimerEl) callTimerEl.textContent = `${mins}:${secs}`;
            }, 1000);

            typewriterVietsub(CONFIG.jungkook.subtitle, () => {
                if (btnNextStage2) {
                    btnNextStage2.style.display = "inline-flex";
                }
            });
        });
    }

    function typewriterVietsub(text, onComplete) {
        if (!vietsubEl) return;
        vietsubEl.textContent = "";
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                vietsubEl.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, 45);
    }

    if (btnNextStage2) {
        btnNextStage2.addEventListener("click", () => {
            if (callInterval) clearInterval(callInterval);
            window.soundEngine.playClick();
            showStage("stage3");
        });
    }

    // ==========================================
    // 6. CHẶNG 3: Bản Thu Âm Âm Thanh Bí Mật (Đĩa Than & Waveform)
    // ==========================================
    const vinylRecord = document.getElementById("vinyl-record");
    const tonearm = document.getElementById("tonearm");
    const btnPlayVoice = document.getElementById("btn-play-voice");
    const btnNextStage3 = document.getElementById("btn-next-stage3");
    const waveformCanvas = document.getElementById("waveform-canvas");
    const waveCtx = waveformCanvas ? waveformCanvas.getContext("2d") : null;
    const voiceStatusText = document.getElementById("voice-status-text");
    let isPlayingVoice = false;
    let waveAnimId = null;

    function resizeWaveform() {
        if (!waveformCanvas) return;
        waveformCanvas.width = waveformCanvas.parentElement.clientWidth;
        waveformCanvas.height = waveformCanvas.parentElement.clientHeight;
    }
    window.addEventListener("resize", resizeWaveform);

    function initStage3() {
        resizeWaveform();
        drawIdleWaveform();
    }

    function startWaveformAnimation() {
        if (!waveformCanvas) return;
        let wavePhase = 0;

        function renderWave() {
            if (!isPlayingVoice) return;
            waveCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
            const freqData = window.soundEngine.getAudioFrequencyData();
            const w = waveformCanvas.width;
            const h = waveformCanvas.height;
            const mid = h / 2;

            waveCtx.beginPath();
            waveCtx.moveTo(0, mid);

            const gradient = waveCtx.createLinearGradient(0, 0, w, 0);
            gradient.addColorStop(0, "#FF8DA1");
            gradient.addColorStop(0.5, "#FF6584");
            gradient.addColorStop(1, "#D8BFD8");

            waveCtx.strokeStyle = gradient;
            waveCtx.lineWidth = 3.5;
            waveCtx.lineCap = "round";

            const step = 8;
            for (let x = 0; x < w; x += step) {
                let amp = 15;
                if (freqData && freqData.length > 0) {
                    const dataIdx = Math.floor((x / w) * (freqData.length / 2));
                    amp = (freqData[dataIdx] / 255) * (h / 2.3) + 6;
                } else {
                    amp = Math.sin(x * 0.05 + wavePhase) * 14 + 10;
                }
                const y = mid + Math.sin(x * 0.04 + wavePhase) * amp;
                waveCtx.lineTo(x, y);
            }

            waveCtx.stroke();
            wavePhase += 0.08;
            waveAnimId = requestAnimationFrame(renderWave);
        }
        renderWave();
    }

    function drawIdleWaveform() {
        if (!waveformCanvas) return;
        waveCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
        const w = waveformCanvas.width;
        const mid = waveformCanvas.height / 2;

        waveCtx.beginPath();
        waveCtx.moveTo(0, mid);
        waveCtx.strokeStyle = "#FFCCD5";
        waveCtx.lineWidth = 2;
        for (let x = 0; x < w; x += 10) {
            waveCtx.lineTo(x, mid + Math.sin(x * 0.05) * 4);
        }
        waveCtx.stroke();
    }

    if (btnPlayVoice) {
        window.soundEngine.setupVoice(
            CONFIG.voice.src,
            () => {
                onVoiceComplete();
            }
        );

        btnPlayVoice.addEventListener("click", () => {
            window.soundEngine.playClick();
            if (!isPlayingVoice) {
                isPlayingVoice = true;
                vinylRecord.classList.add("spinning");
                tonearm.classList.add("playing");
                btnPlayVoice.innerHTML = "⏸️";
                btnPlayVoice.style.transform = "scale(1.05)";
                if (voiceStatusText) voiceStatusText.textContent = "🎧 Đang phát bản thu âm từ Twiez...";

                const audio = window.soundEngine.voiceAudio;
                if (audio) {
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((err) => {
                            console.log("Audio play error, falling back to melody:", err);
                            if (voiceStatusText) voiceStatusText.innerHTML = "🎶 Đang phát giai điệu mừng sinh nhật Lình<br><small style=\"font-size:0.78rem; color:#888;\">(Bỏ file vy.m4a vào assets/audio/ để nghe giọng của Twiez nhé)</small>";
                            window.soundEngine.playFallbackHappyBirthday(() => {
                                onVoiceComplete();
                            });
                        });
                    }
                }
                startWaveformAnimation();
                if (btnNextStage3) btnNextStage3.style.display = "inline-flex";
            } else {
                isPlayingVoice = false;
                vinylRecord.classList.remove("spinning");
                tonearm.classList.remove("playing");
                btnPlayVoice.innerHTML = "🎧";
                btnPlayVoice.style.transform = "scale(1)";
                if (voiceStatusText) voiceStatusText.textContent = "Đã tạm dừng bản thu";

                if (window.soundEngine.voiceAudio) window.soundEngine.voiceAudio.pause();
                window.soundEngine.stopFallbackMelody();
                if (waveAnimId) cancelAnimationFrame(waveAnimId);
                drawIdleWaveform();
            }
        });
    }

    function onVoiceComplete() {
        isPlayingVoice = false;
        vinylRecord.classList.remove("spinning");
        tonearm.classList.remove("playing");
        if (btnPlayVoice) btnPlayVoice.innerHTML = "🎧";
        if (voiceStatusText) voiceStatusText.textContent = "✨ Đã kết thúc bản thu. Chuẩn bị nhận món quà cuối cùng nhé...";
        if (waveAnimId) cancelAnimationFrame(waveAnimId);
        drawIdleWaveform();

        setTimeout(() => {
            showStage("stage4");
        }, 1800);
    }

    if (btnNextStage3) {
        btnNextStage3.addEventListener("click", () => {
            if (isPlayingVoice) {
                if (window.soundEngine.voiceAudio) window.soundEngine.voiceAudio.pause();
                window.soundEngine.stopFallbackMelody();
            }
            window.soundEngine.playClick();
            showStage("stage4");
        });
    }

    // ==========================================
    // 7. CHẶNG 4: Món Quà Từ Twiez (Thư Chúc Mừng Sinh Nhật)
    // ==========================================
    const letterBodyEl = document.getElementById("letter-body");
    const letterTitleEl = document.getElementById("letter-title");
    const btnReplayAll = document.getElementById("btn-replay-all");
    let letterTypeTimer = null;

    function initStage4() {
        triggerConfetti(8000);
        window.soundEngine.playSuccess();

        if (letterTitleEl) {
            letterTitleEl.textContent = CONFIG.letter.title;
        }

        if (letterBodyEl) {
            letterBodyEl.innerHTML = "<span class=\"typewriter-cursor\"></span>";
            let charIndex = 0;
            const fullContent = CONFIG.letter.content;
            if (letterTypeTimer) clearInterval(letterTypeTimer);

            letterTypeTimer = setInterval(() => {
                if (charIndex < fullContent.length) {
                    const currentText = fullContent.substring(0, charIndex + 1);
                    letterBodyEl.innerHTML = escapeHtml(currentText) + "<span class=\"typewriter-cursor\"></span>";
                    charIndex++;
                } else {
                    clearInterval(letterTypeTimer);
                    triggerConfetti(6000);
                }
            }, 30);
        }
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");
    }

    if (btnReplayAll) {
        btnReplayAll.addEventListener("click", () => {
            window.soundEngine.playClick();
            pinInputs.forEach(inp => {
                inp.value = "";
                inp.classList.remove("filled");
                inp.removeAttribute("disabled");
            });
            if (reactorCard) {
                reactorCard.classList.remove("safe");
                reactorCard.classList.add("meltdown-active");
            }
            if (coreSymbol) coreSymbol.innerHTML = "💥";
            if (reactorFeedback) {
                reactorFeedback.textContent = "";
                reactorFeedback.className = "msg-feedback";
            }
            if (btnNextStage1) btnNextStage1.style.display = "none";

            // Reset trạng thái cutscene & nút gọi
            if (cutsceneStage) {
                cutsceneStage.classList.remove("active");
                cutsceneStage.style.display = "none";
            }
            if (cutsceneEngineer) cutsceneEngineer.classList.remove("running", "at-desk");
            if (cutsceneViewport) cutsceneViewport.classList.remove("zooming-into-monitor", "screen-rumble");
            if (emergencySafetyBtn) emergencySafetyBtn.classList.remove("pressed");
            if (wrapDeclineCall) {
                wrapDeclineCall.style.position = "";
                wrapDeclineCall.style.left = "";
                wrapDeclineCall.style.transform = "";
            }
            if (captionDecline) {
                captionDecline.textContent = "Tắt máy";
                captionDecline.style.color = "";
            }

            showStage("intro");
        });
    }

    // ==========================================
    // 8. Tùy Chỉnh Nhanh (Modal & File Uploaders)
    // ==========================================
    const btnCustomFiles = document.getElementById("btn-custom-files");
    const settingsModal = document.getElementById("settings-modal");
    const btnCloseModal = document.getElementById("btn-close-modal");

    if (btnCustomFiles && settingsModal) {
        btnCustomFiles.addEventListener("click", () => {
            window.soundEngine.playClick();
            settingsModal.classList.add("active");
        });
    }

    if (btnCloseModal && settingsModal) {
        btnCloseModal.addEventListener("click", () => {
            window.soundEngine.playClick();
            settingsModal.classList.remove("active");
        });
    }

    if (settingsModal) {
        settingsModal.addEventListener("click", (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove("active");
            }
        });
    }

    // Input voice
    const inputVoice = document.getElementById("input-custom-voice");
    if (inputVoice) {
        inputVoice.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                CONFIG.voice.src = objectUrl;
                window.soundEngine.setupVoice(objectUrl, () => onVoiceComplete());
                alert("✨ Đã nạp file voice thành công! Bạn có thể nghe thử tại Chặng 3 nhé.");
            }
        });
    }

    // Input avatar Jungkook
    const inputAvatar = document.getElementById("input-custom-avatar");
    if (inputAvatar) {
        inputAvatar.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                const avatarEl = document.getElementById("jungkook-avatar");
                if (avatarEl) avatarEl.src = objectUrl;
            }
        });
    }

    // Input Video / GIF Jungkook
    const inputVideo = document.getElementById("input-custom-video");
    if (inputVideo) {
        inputVideo.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                const container = document.getElementById("video-media-wrap");
                if (container) {
                    if (file.type.startsWith("video/")) {
                        container.innerHTML = `<video src="${objectUrl}" class="video-media" autoplay loop playsinline muted></video>`;
                    } else {
                        container.innerHTML = `<img src="${objectUrl}" alt="Jungkook FaceTime" class="video-media">`;
                    }
                }
            }
        });
    }

    // Input sticker đĩa than
    const inputSticker = document.getElementById("input-custom-sticker");
    if (inputSticker) {
        inputSticker.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                const stickerEl = document.getElementById("vinyl-sticker");
                if (stickerEl) stickerEl.src = objectUrl;
            }
        });
    }

    // Bắt đầu tại Intro
    showStage("intro");
});
