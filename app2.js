// player profile

const cardArray = [
    {
        name: 'Messi',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_20180626.jpg/220px-Lionel_Messi_20180626.jpg',
    },

    {
        name: 'Ronaldo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg',
    },

    {
        name: 'Neymar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/220px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg',
    },

    {
        name: 'Mbappe',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg/220px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg',
    },

    {
        name: 'Lewandowski',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg/220px-2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg',
    },

    {
        name: 'Salah',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/220px-Mohamed_Salah_2018.jpg',
    },

    {
        name: 'Messi',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_20180626.jpg/220px-Lionel_Messi_20180626.jpg',
    },

    {
        name: 'Ronaldo',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg',
    },

    {
        name: 'Neymar',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/220px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg',
    },

    {
        name: 'Mbappe',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg/220px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg',
    },

    {
        name: 'Lewandowski',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg/220px-2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg',
    },

    {
        name: 'Salah',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/220px-Mohamed_Salah_2018.jpg',
    }
]

// modify dom text

let listOfPlayersNotMatched = []
let listOfPlayersMatched = []

for (let i = 0 ; i < 6 ; i ++ ) {
    let player = cardArray[i]['name']
    listOfPlayersNotMatched.push(player)   
}

const result1 = document.getElementById('result-1')
const result2 = document.getElementById('result-2')
const result3 = document.getElementById('result-3')
const result4 = document.getElementById('result-4')

function createText() {
    let listOfPlayersNotMatchedDisplay = listOfPlayersNotMatched.join(', ')
    let listOfPlayersMatchedDisplay = listOfPlayersMatched.join(', ')
    
    result1.innerHTML = listOfPlayersMatched.length
    result2.innerHTML = listOfPlayersMatchedDisplay
    result3.innerHTML = listOfPlayersNotMatched.length
    result4.innerHTML = listOfPlayersNotMatchedDisplay
}

createText()

// rearrange card array

cardArray.sort(() => 0.5 - Math.random())

// modify dom pictures

const gridDisplay = document.querySelector('#grid')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
    for (let i = 0 ; i < 12 ; i ++ ) {
        const card = document.createElement('img')
        card.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/220px-Maradona-Mundial_86_con_la_copa.JPG')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}

createBoard()

// check whether two consecutive selections match each other

function checkMatch() {
    const cards = document.querySelectorAll('div#grid img')

    if (cardsChosen[0] === cardsChosen[1]) {
        alert(`You just matched ${cardsChosen[1]}.`)
        cards[cardsChosenIds[0]].setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pele_by_John_Mathew_Smith.jpg/220px-Pele_by_John_Mathew_Smith.jpg')
        cards[cardsChosenIds[1]].setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pele_by_John_Mathew_Smith.jpg/220px-Pele_by_John_Mathew_Smith.jpg')
        cards[cardsChosenIds[0]].removeEventListener('click' , flipCard)
        cards[cardsChosenIds[1]].removeEventListener('click' , flipCard)
        
        let indexToRemove = listOfPlayersNotMatched.indexOf(cardsChosen[1])
        listOfPlayersNotMatched.splice(indexToRemove, 1)
        listOfPlayersMatched.push(cardsChosen[1])
        createText()
    } else {
        alert(`Not matched. Try again.`)
        cards[cardsChosenIds[0]].setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/220px-Maradona-Mundial_86_con_la_copa.JPG')
        cards[cardsChosenIds[1]].setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/220px-Maradona-Mundial_86_con_la_copa.JPG')
    }
    cardsChosen =[]
    cardsChosenIds = []
    
    if (listOfPlayersNotMatched.length === 0) {
        document.getElementById('result-5').innerHTML = `You won. Game over. Refresh the page to play again.`
    }

}

function flipCard() {
    let cardId = this.getAttribute('data-id')
    this.setAttribute('src', cardArray[cardId].img)
    
    if (cardId !== cardsChosenIds[0]) {
        cardsChosenIds.push(cardId)
        cardsChosen.push(cardArray[cardId].name)
    }
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch , 500 )
    }
}