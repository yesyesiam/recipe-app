import React from 'react'
import Card from './Card'

const CardList = ({cards = []}) => {
    return(
        <>
        {
            cards.map((card) => 
                <Card 
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    descrip={card.description}
                    ingred_n={card.ingredients.length} 
                />
            )
        }
        </>
    )
}

export default CardList