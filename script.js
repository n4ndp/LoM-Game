const champs = [
    "aatrox", "ahri", "akali", "akshan", "alistar", "amumu", "anivia",
    "annie", "aphelios", "ashe", "aurelionsol", "azir", "bardo", "belveth",
    "blitzcrank"/*, "brand", "braum", "briar", "caitlyn", "camille", "cassiopeia",
    "chogath", "corki", "darius", "diana", "draven", "drmundo", "ekko",
    "elise", "evelynn", "ezreal", "fiddlesticks", "fiora", "fizz", "galio",
    "gangplank", "garen", "gnar", "gragas", "graves", "gwen", "hecarim",
    "heimerdinger", "illaoi", "irelia", "ivern", "janna", "jarvaniv", "jax",
    "jayce", "jhin", "jinx", "kaisa", "kalista", "karma", "karthus",
    "kassadin", "katarina", "kayle", "kayn", "kennen", "khazix", "kindred",
    "kled", "kogmaw", "ksante", "leblanc", "leesin", "leona", "lillia",
    "lissandra", "lucian", "lulu", "lux", "malaphite", "malzahar", "maokai",
    "masteryi", "milio", "missfortune", "mordekaiser", "morgana", "naafiri", "nami",
    "nasus", "nautilus", "neeko", "nidalee", "nilah", "nocturne", "nunu",
    "olaf", "orianna", "ornn", "pantheon", "poppy", "pyke", "qiyana",
    "quinn", "rakan", "rammus", "reksai", "rell", "renataglasc", "renekton",
    "rengar", "riven", "rumble", "ryze", "samira", "sejuani", "senna",
    "seraphine", "sett", "shaco", "shen", "shyvana", "singed", "sion",
    "sivir", "skarner", "sona", "soraka", "swain", "sylas", "syndra",
    "tahmkench", "taliyah", "talon", "taric", "teemo", "thresh", "tristana",
    "trundle", "tryndamere", "twistedfate", "twitch", "udyr", "urgot", "varus",
    "vayne", "veigar", "velkoz", "vex", "vi", "viego", "viktor",
    "vladimir", "volibear", "warwick", "wukong", "xayah", "xeratth", "xinzhao",
    "yasuo", "yone", "yorick", "yuumi", "zac", "zed", "zeri",
    "ziggs", "zilean", "zoe", "zyra"*/
]; // 152 champs in total
   // https://www.leagueoflegends.com/es-es/champions/

let first_card = null;
let second_card = null;
let matches = 0;

const checkMatch = () => {
    const first_champ = first_card.querySelector(".front").style.backgroundImage;
    const second_champ = second_card.querySelector(".front").style.backgroundImage;

    if (first_champ === second_champ) {
        first_card.firstChild.classList.add("match-card");
        second_card.firstChild.classList.add("match-card");
        first_card = null;
        second_card = null;

        matches++;
        if (matches === 9) {
            clearInterval(this.loop);
        }
    } else {
        setTimeout(() => {
            first_card.classList.remove("reveal-card");
            second_card.classList.remove("reveal-card");
            first_card = null;
            second_card = null;
        }, 1000);
    }
};

const createCard = (champ) => {
    /*<div class="card">
        <div class="face front"></div>
        <div class="face back"></div>
      </div>*/

    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("face", "front");
    front.style.backgroundImage = `url(img/${champ}.png)`; // Set image of champ

    const back = document.createElement("div");
    back.classList.add("face", "back");

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", ({target}) => {
        if (target.parentNode.classList.contains("reveal-card")) {
            return;
        } // If card is already revealed, do nothing

        if (first_card === null) {
            target.parentNode.classList.add("reveal-card");
            first_card = target.parentNode;
        } else if (second_card === null) {
            target.parentNode.classList.add("reveal-card");
            second_card = target.parentNode;
            checkMatch(); // Check if cards match
        } // If firstCard or secondCard is empty, set card as firstCard or secondCard
        
    }); // Reveal card on click

    return card;
    
}; // Create card element with image of champ

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}; // Shuffle array

const startGame = (size) => {
    const shuffled_champs = shuffleArray(champs);
    const selected_champs = shuffled_champs.slice(0, size);
    const duplicated_champs = selected_champs.concat(selected_champs);
    const shuffled_duplicated_champs = shuffleArray(duplicated_champs);

    const grid = document.querySelector(".grid");

    shuffled_duplicated_champs.forEach((champ) => {
        const card = createCard(champ);
        grid.appendChild(card);
    });

    const timer = document.querySelector("header span:last-child");
    let seconds = 0;
    let minutes = 0;
    this.loop = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timer.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }, 1000);
    
}; // Start game with selected size


document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".login__input");
    const button = document.querySelector(".login__button");
    const form = document.querySelector(".login-form");

    input.addEventListener("keyup", ({ target }) => {
        if (target.value.length > 2) {
            button.removeAttribute("disabled");
            return;
        }
        button.setAttribute("disabled", "");
    }); // Enable button when input length is greater than 2

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting to server and reloading page (default behaviour)
        localStorage.setItem("playername", input.value);

        form.remove(); // Remove form from DOM, no longer needed
        const header = document.createElement("header");

        const player = document.createElement("span");
        player.textContent = localStorage.getItem("playername");
        header.appendChild(player);

        const timer = document.createElement("span");
        timer.textContent = "00:00";
        header.appendChild(timer);

        const main = document.querySelector("main");
        main.insertBefore(header, main.firstChild);

        // Start game with 9 or 12 pairs of cards, depending if is computer or mobile
        const size = window.innerWidth > 920 ? 12 : 6;
        startGame(size);

    }); // Save player name to localStorage and redirect to game.html
});
