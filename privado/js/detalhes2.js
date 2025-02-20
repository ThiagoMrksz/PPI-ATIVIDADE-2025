document.addEventListener("DOMContentLoaded", function () {
    const precoBase = 9800; // Preço por pessoa
    const quantidadeInput = document.getElementById("quantidade");
    const totalSpan = document.getElementById("total");
    const reservarBtn = document.getElementById("reservar");

    quantidadeInput.addEventListener("input", function () {
        let quantidade = parseInt(quantidadeInput.value) || 1; // Garante um valor mínimo de 1
        let total = precoBase * quantidade;
        totalSpan.textContent = total.toLocaleString("pt-BR");
    });

    reservarBtn.addEventListener("click", function () {
        alert("Reserva concluída com sucesso!");
    });
});
