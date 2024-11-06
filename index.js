const evHonapElem = document.getElementById("ev_honap");
const elozoGomb = document.getElementById("elozo");
const kovetkezoGomb = document.getElementById("kovetkezo");
const napokRacs = document.querySelector(".napok");
const modal = document.getElementById("modal");
const bezar_modal = document.getElementById("bezar_modal");
const esemenyform = document.getElementById("esemenyform");
const esemenynevInput = document.getElementById("esemenynev");
const esemeny_datumInput = document.getElementById("esemeny_datum");

let aktualisDatum = new Date();
let esemenyek = JSON.parse(localStorage.getItem('esemenyek')) || [];

function Naptar(month, year) {
    napokRacs.innerHTML = `
        <div>H</div>
        <div>K</div>
        <div>Sze</div>
        <div>Cs</div>
        <div>P</div>
        <div>Szo</div>
        <div>V</div>
    `;

    const honap_elsonap = new Date(year, month, 1);
    const legutobb = new Date(year, month + 1, 0);
    const mennyi_nap = legutobb.getDate();
    const nap_start = honap_elsonap.getDay();

    for (let i = 0; i < nap_start; i++) {
        napokRacs.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= mennyi_nap; day++) {
        const nap = (day === aktualisDatum.getDate() && month === aktualisDatum.getMonth() && year === aktualisDatum.getFullYear()) ? "aktualis-nap" : "";
        const event = esemenyek.find(event => new Date(event.date).getDate() === day && new Date(event.date).getMonth() === month && new Date(event.date).getFullYear() === year);

        napokRacs.innerHTML += `
            <div class="${nap}" napi_adat="${day}" havi_adat="${month}" evi_adat="${year}">
                ${day} ${event ? `<span class="event">${event.name}</span>` : ''}
            </div>
        `;
    }

    evHonapElem.innerText = `${year}. ${month + 1}. hónap`;
}

esemenyform.addEventListener("submit", (e) => {
    const esemenynev = esemenynevInput.value;
    const esemeny_datum = esemeny_datumInput.value;

    if (esemenynev && esemeny_datum) {
        esemenyek.push({ name: esemenynev, date: esemeny_datum });
        localStorage.setItem('esemenyek', JSON.stringify(esemenyek));
        Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());
        modal.style.display = "none"; 
    }
});

napokRacs.addEventListener("click", (e) => {
    if (e.target && e.target.matches("div")) {
        const nap = e.target.getAttribute("napi_adat");

        if (nap) {
            modal.style.display = "block";
        }
    }
});

bezar_modal.addEventListener("click", () => {
    modal.style.display = "none";
});


elozoGomb.addEventListener("click", () => {
    aktualisDatum.setMonth(aktualisDatum.getMonth() - 1);
    Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());
});

kovetkezoGomb.addEventListener("click", () => {
    aktualisDatum.setMonth(aktualisDatum.getMonth() + 1);
    Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());
});


Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());
