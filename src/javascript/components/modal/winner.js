import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const title = 'Winner';
    const bodyElement = createElement({
        tagName: 'div',
        className: 'winner-modal'
    });

    const nameElement = createElement({
        tagName: 'h2',
        className: 'winner-name',
        textContent: fighter.name
    });

    const imgElement = createElement({
        tagName: 'img',
        className: 'winner-image',
        attributes: { src: fighter.source }
    });

    bodyElement.append(nameElement, imgElement);

    showModal({ title, bodyElement });
}
