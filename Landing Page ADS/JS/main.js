document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.querySelector(".hero-scroll");
    const nextSection = document.querySelector("#pilares");
    const cards = document.querySelectorAll('.pilar');

    // Elementos da seção Soluções
    const solucoesSection = document.querySelector('#solucoes');
    const solucoesHeader = document.querySelector('.solucoes-header');
    const solucoesItems = document.querySelectorAll('.solucao');

    // Elementos da seção Processo
    const processoSection = document.querySelector('#processo');
    const processoTimeline = document.querySelector('.processo-timeline');
    const processoItems = document.querySelectorAll('.processo-item');

    // Elementos da seção Contato
    const contatoSection = document.querySelector('#contato');
    const contatoTitle = document.querySelector('.contato-title');
    const contatoSubtitle = document.querySelector('.contato-subtitle');
    const formGroups = document.querySelectorAll('.form-group');
    const ctaButton = document.querySelector('.cta-button');

    // Inputs do formulário
    const nomeInput = document.querySelector('#nome');
    const mensagemInput = document.querySelector('#mensagem');

    let isScrollLocked = true;

    // === BLOQUEIA QUALQUER TIPO DE SCROLL PRA BAIXO ===
    const blockScrollDown = (e) => {
        if (e.deltaY > 0) {
            e.preventDefault();
            return false;
        }
    };

    const blockTouchDown = (e) => {
        e.preventDefault();
    };

    const blockKeyDown = (e) => {
        const downKeys = [32, 33, 34, 35, 40];
        if (downKeys.includes(e.keyCode)) {
            e.preventDefault();
        }
    };

    const blockScrollbar = () => {
        if (window.pageYOffset > 0 && isScrollLocked) {
            window.scrollTo(0, 0);
        }
    };

    const lockScroll = () => {
        window.addEventListener('wheel', blockScrollDown, { passive: false });
        window.addEventListener('touchmove', blockTouchDown, { passive: false });
        window.addEventListener('keydown', blockKeyDown);
        window.addEventListener('scroll', blockScrollbar);
    };

    const unlockScroll = () => {
        isScrollLocked = false;
        window.removeEventListener('wheel', blockScrollDown);
        window.removeEventListener('touchmove', blockTouchDown);
        window.removeEventListener('keydown', blockKeyDown);
        window.removeEventListener('scroll', blockScrollbar);
    };

    lockScroll();

    // === SCROLL SUAVE E ELEGANTE ===
    const smoothScrollTo = (target, duration = 1800) => {
        const start = window.pageYOffset;
        const targetPos = target.offsetTop;
        const distance = targetPos - start;
        let startTime = null;

        const easeInOutQuart = (t) =>
            t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuart(progress);

            window.scrollTo(0, start + distance * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    // === CLIQUE NA SETA ===
    if (scrollBtn && nextSection) {
        scrollBtn.addEventListener("click", (e) => {
            e.preventDefault();
            unlockScroll();
            smoothScrollTo(nextSection, 1800);
        });
    }

    // === ANIMAÇÃO DOS PILARES ===
    const pilaresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cards.forEach((card, index) => {
                    setTimeout(() => card.classList.add('visible'), index * 300);
                });
            } else {
                cards.forEach(card => card.classList.remove('visible'));
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -100px 0px" });

    if (nextSection) pilaresObserver.observe(nextSection);

    // === ANIMAÇÃO SOLUÇÕES ===
    if (solucoesSection && solucoesHeader) {
        const solucoesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    solucoesHeader.classList.add('animated');
                    solucoesItems.forEach((item, i) =>
                        setTimeout(() => item.classList.add('animated'), i * 300 + 400)
                    );
                } else {
                    solucoesHeader.classList.remove('animated');
                    solucoesItems.forEach(item => item.classList.remove('animated'));
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

        solucoesObserver.observe(solucoesSection);
    }

    // === ANIMAÇÃO PROCESSO ===
    if (processoSection && processoTimeline && processoItems.length) {
        const processoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    processoTimeline.classList.add('progress');
                    processoItems.forEach((item, i) =>
                        setTimeout(() => item.classList.add('revealed'), 800 + i * 800)
                    );
                } else {
                    processoTimeline.classList.remove('progress');
                    processoItems.forEach(item => item.classList.remove('revealed'));
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

        processoObserver.observe(processoSection);
    }

    // === ANIMAÇÃO CONTATO ===
    if (contatoSection && contatoTitle) {
        const contatoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contatoTitle.classList.add('animated');
                    contatoSubtitle?.classList.add('animated');

                    formGroups.forEach((group, i) =>
                        setTimeout(() => group.classList.add('animated'), i * 300 + 400)
                    );

                    setTimeout(() => ctaButton?.classList.add('animated'),
                        formGroups.length * 300 + 800
                    );
                } else {
                    contatoTitle.classList.remove('animated');
                    contatoSubtitle?.classList.remove('animated');
                    formGroups.forEach(g => g.classList.remove('animated'));
                    ctaButton?.classList.remove('animated');
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

        contatoObserver.observe(contatoSection);
    }

    // === TRAVA / LIBERA BOTÃO WHATSAPP ===
    const updateWhatsAppState = () => {
        const nomeValido = nomeInput.value.trim().length > 0;
        const mensagemValida = mensagemInput.value.trim().length > 0;

        if (nomeValido && mensagemValida) {
            ctaButton.classList.remove('disabled');
            ctaButton.style.pointerEvents = 'auto';
        } else {
            ctaButton.classList.add('disabled');
            ctaButton.style.pointerEvents = 'none';
        }
    };

    updateWhatsAppState();

    nomeInput.addEventListener('input', updateWhatsAppState);
    mensagemInput.addEventListener('input', updateWhatsAppState);
});