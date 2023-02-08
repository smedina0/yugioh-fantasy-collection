# Yu-Gi-Oh! Fantasy Collection!

## Summary
This application displays an index of all existing Yu-Gi-Oh! Cards as of Feb 5th, 2023. Each card displays their respective box sets, names, most up to date lowest pice, and the option for a user to add the card to their own personal list of cards. Users are able to then edit cards, delete cards, or create new custom cards. Whenever a card image or "show details link", custom or not, is selected, the user is taken to a page that has more information about the card such as card type, card description, rarity, attribute, attack, and defense.

## Technologies Used
- HTML
- Custom CSS combined with some Bootstrap
- JavaScript
- YGOPRODeck API
- Node.js
- Express
- MongoDB

## Screenshot

![Images of my project interface](https://res.cloudinary.com/dajbkbomv/image/upload/v1675635271/Github%20readme%20images/Screenshot_2023-02-05_at_4.51.36_PM_qdau71.png)

![Images of my project interface](https://res.cloudinary.com/dajbkbomv/image/upload/v1675635274/Github%20readme%20images/Screenshot_2023-02-05_at_4.50.18_PM_dhvigx.png)

![Images of my project interface](https://res.cloudinary.com/dajbkbomv/image/upload/v1675635273/Github%20readme%20images/Screenshot_2023-02-05_at_4.50.29_PM_mgitgl.png)

![Images of my project interface](https://res.cloudinary.com/dajbkbomv/image/upload/v1675635273/Github%20readme%20images/Screenshot_2023-02-05_at_4.50.45_PM_sumuga.png)

![Images of my project interface](https://res.cloudinary.com/dajbkbomv/image/upload/v1675635271/Github%20readme%20images/Screenshot_2023-02-05_at_4.50.35_PM_lhmkjj.png)

## Getting Started

[Link to Yu-Gi-Oh! Fantasy Collection!](https://yugioh-fantasy-collection.herokuapp.com/yugioh)

## Future Enhancements

- At the moment, a user is unable to delete/edit a card from their own list without deleting/editing it from the entire index. Also, any new custom cards goes to the main index. I would like to update my project such that the main index is untouchable by individual users and instead all creating/updating/deleting happens in their own "My Cards" list.
- I would like to paginate the main index page as well as add a filter so that the intial page load does not take as long as it does and so users can search for specific cards via specific categories.
- I want to add a default value to the schema as opposed to making it be autofilled when a user fills out a form. This applies to the image as well.
- I would like to make the page responsive since I used a lot of custom styling.