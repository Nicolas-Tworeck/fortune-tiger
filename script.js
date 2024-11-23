const symbols = ["🍀", "🍒", "⭐", "🍉", "🔔", "💎", "🍋", "🔑", "🐅"];
const reels = [
    document.getElementById("reel-1"),
    document.getElementById("reel-2"),
    document.getElementById("reel-3")
];
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");

let isSpinning = false;

// Adiciona os símbolos dentro das bobinas
function setupReels() {
    reels.forEach(reel => {
        reel.innerHTML = ""; // Limpa o conteúdo para evitar duplicatas
        const reelInner = document.createElement("div");
        reelInner.classList.add("reel-inner");

        // Adiciona símbolos suficientes para criar a ilusão de rotação contínua
        for (let i = 0; i < symbols.length * 2; i++) {
            const symbolDiv = document.createElement("div");
            symbolDiv.classList.add("symbol");
            symbolDiv.textContent = symbols[i % symbols.length];
            reelInner.appendChild(symbolDiv);
        }

        reel.appendChild(reelInner);
    });
}

// Inicia o giro das bobinas
function spinReels() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;
    resultDiv.textContent = "Girando...";

    reels.forEach((reel, index) => {
        const reelInner = reel.querySelector(".reel-inner");

        // Reduzimos o tempo de animação para tornar o giro mais rápido
        const duration = 0.5 + 0.2 * index; // Tempo de animação mais rápido

        reelInner.style.transition = `transform ${duration}s ease-out`;

        // Posição aleatória de parada e deslocamento para baixo
        const stopPosition = Math.floor(Math.random() * symbols.length); 
        const offset = stopPosition * 100; // Deslocamento para baixo
        reelInner.style.transform = `translateY(-${offset}px)`; // Gira para baixo (sentido negativo)

        // Garantir que a animação pare corretamente
        setTimeout(() => {
            if (index === reels.length - 1) {
                showResult(); // Verifica o resultado ao final do último giro
            }
        }, duration * 1000);
    });
}

// Exibe o resultado
function showResult() {
    const finalSymbols = reels.map(reel => {
        const reelInner = reel.querySelector(".reel-inner");
        const transformValue = reelInner.style.transform;
        const offset = parseInt(transformValue.match(/-?\d+/)[0], 10); // Extrai o valor do offset
        const stopIndex = (offset / 100) % symbols.length;
        return symbols[stopIndex < 0 ? stopIndex + symbols.length : stopIndex];
    });

    const isWinning = new Set(finalSymbols).size === 1;
    resultDiv.textContent = isWinning
        ? `🎉 Você ganhou com ${finalSymbols[0]}!`
        : "Você perdeu! Tente novamente.";

    isSpinning = false;
    spinButton.disabled = false;
}

// Configurações iniciais
spinButton.addEventListener("click", spinReels);
setupReels();
