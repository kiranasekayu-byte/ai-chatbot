async function kirimPesan() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const pesan = input.value.trim();
    if (pesan === "") return;

    // tampilkan pesan user
    chatBox.innerHTML += `<div class="user">${pesan}</div>`;
    input.value = "";

    // loading
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "bot";
    loadingDiv.id = "loading";
    loadingDiv.innerText = "AI lagi ngetik...";
    chatBox.appendChild(loadingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: pesan })
        });

        console.log("STATUS:", response.status);

        const data = await response.json();
        console.log("RESPONSE:", data);

        // hapus loading
        document.getElementById("loading")?.remove();

        // tampilkan jawaban AI
        chatBox.innerHTML += `<div class="bot">${marked.parse(data.reply)}</div>`;

    } catch (error) {
        document.getElementById("loading")?.remove();
        chatBox.innerHTML += `<div class="bot">Error: AI tidak merespon 😭</div>`;
        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// tombol klik
document.querySelector("button").addEventListener("click", kirimPesan);

// enter
document.getElementById("user-input").addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        kirimPesan();
    }
});