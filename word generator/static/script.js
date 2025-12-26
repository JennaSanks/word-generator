const sectionsDiv = document.getElementById("sections");

function addSection() {
    const div = document.createElement("div");
    div.className = "section";

    div.innerHTML = `
        <input placeholder="Section Heading" class="heading">
        <textarea placeholder="Bullet points (one per line)"></textarea>
    `;

    sectionsDiv.appendChild(div);
}

function generate() {
    const title = document.getElementById("title").value;
    const sections = [];

    document.querySelectorAll(".section").forEach(sec => {
        const heading = sec.querySelector(".heading").value;
        const points = sec.querySelector("textarea").value
            .split("\n")
            .filter(p => p.trim() !== "");

        sections.push({ heading, points });
    });

    fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, sections })
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = `/download/${data.file}`;
    });
}