
const evHonapElem = document.getElementById("ev_honap");
const elozoGomb = document.getElementById("elozo");
const kovetkezoGomb = document.getElementById("kovetkezo");
const napokRacs = document.querySelector(".napok");

let aktualisDatum = new Date();


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
        napokRacs.innerHTML += `<div class="${nap}">${day}</div>`;
    }


    evHonapElem.innerText = `${year}. ${month + 1}. hónap`;
}


Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());


elozoGomb.addEventListener("click", () => {
    aktualisDatum.setMonth(aktualisDatum.getMonth() - 1);
    Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());
});


kovetkezoGomb.addEventListener("click", () => {
    aktualisDatum.setMonth(aktualisDatum.getMonth() + 1);
    Naptar(aktualisDatum.getMonth(), aktualisDatum.getFullYear());
});
