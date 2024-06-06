import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    if (fighter) {
        const { name, health, source } = fighter;

        const fighterImage = createElement({
            tagName: 'img',
            className: 'fighter-preview___img',
            attributes: { src: source, alt: name }
        });

        const fighterName = createElement({
            tagName: 'p',
            className: 'fighter-preview___name'
        });
        fighterName.innerHTML = name;

        const fighterHealth = createElement({
            tagName: 'p',
            className: 'fighter-preview___health'
        });
        fighterHealth.innerHTML = `Health: ${health}`;

        fighterElement.append(fighterImage, fighterName, fighterHealth);
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
