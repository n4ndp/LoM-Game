"use strict";
/* 

aatrox.jpg       braum.jpg         fiora.jpg         jarvaniv.jpg  kled.jpg       missfortune.jpg  poppy.jpg        senna.jpg      taliyah.jpg      vex.jpg       zed.jpg
ahri.jpg         briar.jpg         fizz.jpg          jax.jpg       kogmaw.jpg     mordekaiser.jpg  pyke.jpg         seraphine.jpg  talon.jpg        vi.jpg        zeri.jpg
akali.jpg        caitlyn.jpg       galio.jpg         jayce.jpg     ksante.jpg     morgana.jpg      qiyana.jpg       sett.jpg       taric.jpg        viego.jpg     ziggs.jpg
akshan.jpg       camille.jpg       gangplank.jpg     jhin.jpg      leblanc.jpg    naafiri.jpg      quinn.jpg        shaco.jpg      teemo.jpg        viktor.jpg    zilean.jpg
alistar.jpg      cassiopeia.jpg    garen.jpg         jinx.jpg      leesin.jpg     nami.jpg         rakan.jpg        shen.jpg       thresh.jpg       vladimir.jpg  zoe.jpg
amumu.jpg        chogath.jpg       gnar.jpg          kaisa.jpg     leona.jpg      nasus.jpg        rammus.jpg       shyvana.jpg    tristana.jpg     volibear.jpg  zyra.jpg
anivia.jpg       corki.jpg         gragas.jpg        kalista.jpg   lillia.jpg     nautilus.jpg     reksai.jpg       singed.jpg     trundle.jpg      warwick.jpg
annie.jpg        darius.jpg        graves.jpg        karma.jpg     lissandra.jpg  neeko.jpg        rell.jpg         sion.jpg       tryndamere.jpg   wukong.jpg
aphelios.jpg     diana.jpg         gwen.jpg          karthus.jpg   lucian.jpg     nidalee.jpg      renataglasc.jpg  sivir.jpg      twistedfate.jpg  xayah.jpg
ashe.jpg         draven.jpg        hecarim.jpg       kassadin.jpg  lulu.jpg       nilah.jpg        renekton.jpg     skarner.jpg    twitch.jpg       xeratth.jpg
aurelionsol.jpg  drmundo.jpg       heimerdinger.jpg  katarina.jpg  lux.jpg        nocturne.jpg     rengar.jpg       sona.jpg       udyr.jpg         xinzhao.jpg
azir.jpg         ekko.jpg          hwei.jpg          kayle.jpg     malaphite.jpg  nunu.jpg         riven.jpg        soraka.jpg     urgot.jpg        yasuo.jpg
bard.jpg         elise.jpg         illaoi.jpg        kayn.jpg      malzahar.jpg   olaf.jpg         rumble.jpg       swain.jpg      varus.jpg        yone.jpg
belveth.jpg      evelynn.jpg       irelia.jpg        kennen.jpg    maokai.jpg     orianna.jpg      ryze.jpg         sylas.jpg      vayne.jpg        yorick.jpg
blitzcrank.jpg   ezreal.jpg        ivern.jpg         khazix.jpg    masteryi.jpg   ornn.jpg         samira.jpg       syndra.jpg     veigar.jpg       yuumi.jpg
brand.jpg        fiddlesticks.jpg  janna.jpg         kindred.jpg   milio.jpg      pantheon.jpg     sejuani.jpg      tahmkench.jpg  velkoz.jpg       zac.jpg

https://www.leagueoflegends.com/es-mx/champions/

*/

const champs = [
    "aatrox", "ahri", "akali", "akshan", "alistar", "amumu", "anivia", "annie", "aphelios", "ashe", "aurelionsol", "azir", "bard", "belveth", "blitzcrank", "brand",
    "braum", "briar", "caitlyn", "camille", "cassiopeia", "chogath", "corki", "darius", "diana", "drmundo", "draven", "evelynn", "ezreal", "fiddlesticks", "fiora",
    "fizz", "galio", "gangplank", "garen", "gnar", "gragas", "graves", "gwen", "hecarim", "heimerdinger", "hwei", "illaoi", "irelia", "ivern", "jax", "jayce", "jhin",
    "jinx", "kaisa", "kalista", "karma", "karthus", "kassadin", "katarina", "kayle", "kayn", "kennen", "khazix", "kindred", "kled", "kogmaw", "ksante", "lillia",
    "lissandra", "lucian", "lulu", "lux", "malaphite", "malzahar", "masteryi", "maokai", "milio", "missfortune", "mordekaiser", "morgana", "naafiri", "nautilus",
    "nami", "nasus", "nautilus", "neeko", "nidalee", "nilah", "nocturne", "nunu", "olaf", "orianna", "ornn", "pantheon", "poppy", "pyke", "qiyana", "quinn", "rakan",
    "rammus", "reksai", "rell", "renekton", "rengar", "renataglasc", "riven", "rumble", "ryze", "samira", "sejuani", "senna", "seraphine", "sett", "shaco", "shen",
    "shyvana", "singed", "sion", "sivir", "skarner", "sona", "soraka", "swain", "sylas", "syndra", "tahmkench", "taliyah", "talon", "taric", "teemo", "thresh",
    "tristana", "trundle", "tryndamere", "twistedfate", "twitch", "udyr", "urgot", "varus", "vayne", "veigar", "velkoz", "vi", "viktor", "viego", "vladimir",
    "volibear", "warwick", "wukong", "xayah", "xeratth", "xinzhao", "yasuo", "yone", "yorick", "yuumi", "zac", "zed", "zilean", "zoe", "zyra"
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const createBoard = (size) => {
    const board = document.querySelector(".board");
    const cards = shuffleArray(champs).slice(0, size);
    const duplicatedCards = shuffleArray([...cards, ...cards]);

    const fragment = document.createDocumentFragment();

    duplicatedCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.name = card;
        
        const front = document.createElement("div");
        front.classList.add("face", "front");
        front.style.backgroundImage = `url("img/${card}.jpg")`;

        const back = document.createElement("div");
        back.textContent = "?";
        back.classList.add("face", "back");

        cardElement.appendChild(front);
        cardElement.appendChild(back);
        cardElement.addEventListener("click", ({target}) => {
            if (target.parentNode.classList.contains("reveal-card")) return;
            if (first_card === null) {
                first_card = target.parentNode;
                first_card.classList.add("reveal-card");
            } else if (second_card === null) {
                second_card = target.parentNode;
                second_card.classList.add("reveal-card");
                setTimeout(checkMatch, 1000);
            }
        });

        fragment.appendChild(cardElement);
    });

    board.appendChild(fragment);
}

let timer = null;
let first_card = null;
let second_card = null;
let matches = 0;

const checkMatch = () => {
    if (first_card.dataset.name === second_card.dataset.name) {
        matches++;
        first_card.firstChild.classList.add("match-card");
        second_card.firstChild.classList.add("match-card");
    } else {
        first_card.classList.remove("reveal-card");
        second_card.classList.remove("reveal-card");
    }

    if (matches === 16) {
        clearInterval(timer);
        const time = document.querySelector("header span:last-child").textContent;
        setTimeout(() => {
            alert(`Lo lograste en ${time}`);
            location.reload();
        }, 500);
    }

    resetCards();
}

const resetCards = () => {
    first_card = null;
    second_card = null;
}

const startGame = () => {
    createBoard(16);
    timer = setInterval(() => {
        const timerElement = document.querySelector("header span:last-child");
        const [minutes, seconds] = timerElement.textContent.split(":");
        if (seconds === "59") {
            timerElement.textContent = `${String(parseInt(minutes) + 1).padStart(2, "0")}:00`;
        } else {
            const updatedSeconds = String(parseInt(seconds) + 1).padStart(2, "0");
            timerElement.textContent = `${minutes}:${updatedSeconds}`;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".login__input");
    const button = document.querySelector(".login__button");
    const form = document.querySelector(".login-form");

    input.addEventListener("keyup", ({ target }) => {
        if (target.value.length > 2) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        localStorage.setItem("playername", input.value);

        form.remove();

        const fragment = document.createDocumentFragment();

        const header = document.createElement("header");
        const player = document.createElement("span");
        const timer = document.createElement("span");

        player.textContent = localStorage.getItem("playername");
        timer.textContent = "00:00";
        header.appendChild(player);
        header.appendChild(timer);

        fragment.appendChild(header);


        const main = document.querySelector("main");
        main.insertBefore(fragment, main.firstChild);

        startGame();
    });
});
