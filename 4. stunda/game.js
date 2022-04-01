console.log("game.js initiated")

// funkcijas, būs daudz

function shuffle(max) 
{
    let virkne = [];
    //tiek izveidota virkne no 1 līdz "max"
    for(let i = 1; i <=max; i++)
    {
        virkne[i] = i;
    }

    // storage nepieciešams lai uzglabātu vērtību pārneses procesā, rngesusNumber nepieciešams lai saglabātu skaitli, ar kuru maina, lai pēc skaitļa "paņemšanas" tam var iedot arī veco.
    let storage;
    let rngesusNumber;

    // cikls, kas sajauc skaitļus ar vietām.
    for(let i = 1; i <=max; i++)
    {
        rngesusNumber = Math.ceil(Math.random() * max);
        storage = virkne[i];
        virkne[i] = virkne[rngesusNumber];
        virkne[rngesusNumber] = storage;
    }

    return virkne;
}

function idToIA(id)
{
    let IAArray = [];
    IAArray[0] = Math.ceil(id/6);
    IAArray[1] = id - (IAArray[0]-1)*6;
    return IAArray;
}

function coverSquares(i,a)  //funkcija, kas aizklāj atklātās emocijzīmes. Izsauc, kad atklāj otro zīmi un pagaida mirkli.
{
    console.log("coverSquares ia " + i + " " + a);
    console.log("idddd " + idToIA(cardId)[0] + " " + idToIA(cardId)[1]);
    // zimejums1.fillStyle = "#FFFF22";
    
    zimejums1.fillRect(41 + (a - 1)*120, 41 + (i - 1)*120 ,98, 98);
}

function pointsToRG(inputPoints)    //pārvērs kartiņu score vērtību par red un green vērtībām
{
    let RGArray = []; //RGArray[0] = red, RGArray[1] = green.
    if(inputPoints = 500)
    {
        RGArray[0] = 255;
        RGArray[1] = 255;
        return RGArray;
    }
    else if(inputPoints > 500)
    {
        RGArray[0] = 256 - Math.pow(2,(inputPoints / 100) - 2); //256 128 64 32 8765
        RGArray[1] = 255;
        return RGArray;
    }
}
//beidzās funkcijas


//js tiek "savienots" ar pamatni. 🥵
let pamatne1 = document.getElementById("gamefield");
let zimejums1 = pamatne1.getContext("2d");
zimejums1.font = '48px serif';  //noteikts pamata fonts



// tiek uzzīmētas 36 kārtis
zimejums1.fillStyle = "#000000";
for(let i = 0; i<6; i++)
{
    for(let a = 0; a<6; a++)
    {
        zimejums1.strokeRect(40 + a*120, 40 + i*120 ,100, 100);
    }
}
let gamefieldPosition = gamefield.getBoundingClientRect(); //iegūst gamefield lauka koordinātes, tas ir nepieciešams jo clientX un clientY ņem no visas lapas, nevis paša lauka.

let virkne = shuffle(36); //izveidota virkne, 1-36 samainīti vietām.
let emojiSaraksts =       //saraksts ar emoji
[
0,
"👩‍💻",
"🤢",
"🥶",
"🤑",
"👽",
"👾",
"😈",
"🙃",
"😱",
"😴",
"🤡",
"👀",
"👄",
"👑",
"👍",
"😐",
"🤤",
"🥵"
];

let atverti = 0; //atvērto kāršu skaits. Kad sasniedz 36, spēle beidzās.

//saraksts ar atminētajiem, katrai vērtībai ir 0, līdz to izmaina uz 1.
let atminetie = [];
for(let atm = 0; atm<37; atm++)
{
    atminetie[atm] = 0;
}
console.log(atminetie);

let karsuPunkti = [,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000];

let guesses = 0; //mainīgais kas pārbauda, vai ir minēts divreiz. Ja ir, tad aizklāj minētos
let cardId; //mainīgais, kas saglabās pašreiz izvēlēto kārts kārtas numuru.
let lastcardId; //mainīgais kas saglabā pagājušo izvēlētās kārts kārtas numuru.

// on click event 🤢 
gamefield.addEventListener('click', function()
{
event.preventDefault
if(guesses < 2) //pārbaude, vai nav jau 2 lauciņi atvērti.
{
    // cikls, kurš izies cauri visām 36 kāršu hitboxiem, lai noteiktu kurai kārtij pieskarās. 👨‍🦽 
    for(let i = 0; i<6; i++)
    {
        for(let a = 0; a<6; a++)
       {
        let mouseX = event.clientX - gamefieldPosition.left;
        let mouseY = event.clientY - gamefieldPosition.top;
        if(mouseX > 40 + a*120 && mouseX < 140+ a*120 && mouseY > 40 + i * 120 && mouseY < 140 + 120 * i )  //pārbaude, vai pele sakrīt ar pašreizējo a vai i
            {
                if((cardId != (i*6 + a + 1) || guesses == 0) && atminetie[(i*6 + a + 1)] == 0)  //izpildās, kad atver kārti
                {
                    lastcardId = cardId;
                    cardId = (i*6 + a + 1);
                    console.log("card id is " + cardId);
                    zimejums1.fillText(emojiSaraksts[Math.ceil((virkne[cardId]/*kods ar kuru iegūst card id ievadīts shuffle metodē, rezultāts ir nejaušs skaitlis kas neatkārtojās*/)/2)/*dala ar 2 un tad apaļo uz augšu*/],57 + a*120, 105 + i*120/*koordinātes, ar a un i vērtībām, nosaka kur jāzīmē. */ )  //gl

                    guesses++;  //kods lai reaģētu uz 2. laukuma atvēršanu.
                    if(guesses > 1)     //izpildās, ja šī ir otrā atvērtā kārts
                    {
                        //UZMANĪBU SPAGHETTI    Lauciņa numurs pārveidots uz randomised vērtību, tad dala ar 2 un apaļu, un vēro kurš emoji atbilst. Ja sakrīt, tad ir vienādi.
                        if(Math.ceil(virkne[cardId]/2) == Math.ceil(virkne[lastcardId]/2))  //izpildās, ja atminētās kārtis ir vienādas.
                        {
                            console.log("vienādi")
                            guesses = 0;
                            atminetie[cardId] = 1;
                            atminetie[lastcardId] = 1;
                            //Iestata minējumus uz 0, lai var atkal minēt; iestata pašreizējās kārtis kā atminētas.
                            atverti+=2;
                            if (atverti > 35)
                            {
                                console.log(karsuPunkti);
                                // window.location.assign("./postgame.html");
                            }
                        }
                        else    //izpildās, ja abas atvērtās kārtis nav vienādas
                        {
                            //atņem punktus no nepareizajām kārtīm
                            karsuPunkti[cardId] -=100;
                            karsuPunkti[lastcardId] -=100;


                            //aizplda atvērtos četrstūrus ar aizkavi
                            setTimeout(() => 
                            {
                            zimejums1.fillStyle = "rgb(" + pointsToRG(karsuPunkti[cardId])[0] +",255,0)";
                            console.log(pointsToRG(karsuPunkti[cardId])[0]);
                            coverSquares(idToIA(cardId)[0], idToIA(cardId)[1]);
                            coverSquares(idToIA(lastcardId)[0], idToIA(lastcardId)[1]);
                            guesses = 0;}, 1000);
                        }
                    }
                }
            }
        }
    }
}
/*
Emoji id saraksts
1 👩‍💻
2 🤢
3 🥶
4 🤑
5 👽
6 👾
7 😈
8 🙃
9 😱
10😴
11🤡
12👀
13👄
14👑
15👍
16😐
17🤤
18🥵
*/
});
// score system: get less points for each correct guess based on how many times a card was clicked.