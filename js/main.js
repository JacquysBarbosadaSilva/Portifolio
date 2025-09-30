function Typewriter(targetEl, text, options = {}) {
    this.target = targetEl;
    this.fullText = text.replace(/\r/g, ""); // remove CR em casos Windows
    this.speed = options.speed ?? 45; // ms por caractere
    this.delayBeforeStart = options.delayBeforeStart ?? 0;
    this.index = 0;
    this.timer = null;
    this.running = false;

    // mostra cursor (CSS)
    this._updateCursorClass = () => {
        if (this.running) this.target.classList.add("typing");
        else this.target.classList.remove("typing");
    };

    // escreve um caractere (mantendo quebras de linha)
    this._step = () => {
        if (this.index > this.fullText.length) {
            this.stop();
            return;
        }
        // slice até index (inclui espaços e acentos corretamente)
        const visible = this.fullText.slice(0, this.index);
        this.target.textContent = visible;
        this.index++;
    };

    this.start = () => {
        if (this.running) return;
        this.running = true;
        this._updateCursorClass();

        // se já estava no final e quiser reiniciar:
        if (this.index > this.fullText.length) this.index = 0;

        this.timer = setTimeout(() => {
            this.timer = setInterval(() => {
                this._step();
                if (this.index > this.fullText.length) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.running = false;
                    this._updateCursorClass();
                }
            }, this.speed);
        }, this.delayBeforeStart);
    };

    this.finishNow = () => {
        this.pause();
        this.index = this.fullText.length + 1;
        this.target.textContent = this.fullText;
    };
}

// --- Uso do exemplo ---
const exampleText = `Sou Desenvolvedor Full Stack Júnior, concluindo formação técnica no SENAI. Tenho experiência em desenvolvimento Front-end, criando interfaces modernas, responsivas e acessíveis, utilizando HTML, CSS, JavaScript e frameworks como React. No Back-end, desenvolvo aplicações com Node.js, PHP e integração com bancos de dados MySQL.`;

const p = document.getElementById("target");
const tw = new Typewriter(p, exampleText, { speed: 40, delayBeforeStart: 200 });

// opcional: iniciar automaticamente
tw.start();
