import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        let firstFighterBlocking = false;
        let secondFighterBlocking = false;
        let firstFighterCriticalHitAvailable = true;
        let secondFighterCriticalHitAvailable = true;

        const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
        const secondFighterHealthBar = document.getElementById('right-fighter-indicator');

        const updateHealthBar = (fighter, health, healthBar) => {
            const percentage = (health / fighter.health) * 100;
            healthBar.style.width = `${percentage}%`;
        };

        const handleKeyDown = event => {
            switch (event.code) {
                case controls.PlayerOneAttack:
                    if (!firstFighterBlocking) {
                        const damage = getDamage(firstFighter, secondFighter);
                        secondFighterHealth -= damage;
                        updateHealthBar(secondFighter, secondFighterHealth, secondFighterHealthBar);
                    }
                    break;
                case controls.PlayerTwoAttack:
                    if (!secondFighterBlocking) {
                        const damage = getDamage(secondFighter, firstFighter);
                        firstFighterHealth -= damage;
                        updateHealthBar(firstFighter, firstFighterHealth, firstFighterHealthBar);
                    }
                    break;
                case controls.PlayerOneBlock:
                    firstFighterBlocking = true;
                    break;
                case controls.PlayerTwoBlock:
                    secondFighterBlocking = true;
                    break;
                case controls.PlayerOneCriticalHitCombination[0]:
                case controls.PlayerOneCriticalHitCombination[1]:
                case controls.PlayerOneCriticalHitCombination[2]:
                    if (firstFighterCriticalHitAvailable) {
                        const damage = firstFighter.attack * 2;
                        secondFighterHealth -= damage;
                        updateHealthBar(secondFighter, secondFighterHealth, secondFighterHealthBar);
                        firstFighterCriticalHitAvailable = false;
                        setTimeout(() => {
                            firstFighterCriticalHitAvailable = true;
                        }, 10000); 
                    }
                    break;
                case controls.PlayerTwoCriticalHitCombination[0]:
                case controls.PlayerTwoCriticalHitCombination[1]:
                case controls.PlayerTwoCriticalHitCombination[2]:
                    if (secondFighterCriticalHitAvailable) {
                        const damage = secondFighter.attack * 2;
                        firstFighterHealth -= damage;
                        updateHealthBar(firstFighter, firstFighterHealth, firstFighterHealthBar);
                        secondFighterCriticalHitAvailable = false;
                        setTimeout(() => {
                            secondFighterCriticalHitAvailable = true;
                        }, 10000);
                    }
                    break;
                default:
                    break;
            }

            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);
                const winner = firstFighterHealth > 0 ? firstFighter : secondFighter;
                resolve(winner);
            }
        };

        const handleKeyUp = event => {
            if (event.code === controls.PlayerOneBlock) {
                firstFighterBlocking = false;
            } else if (event.code === controls.PlayerTwoBlock) {
                secondFighterBlocking = false;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = getRandomNumber(1, 2);
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = getRandomNumber(1, 2);
    return defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);

    return hitPower > blockPower ? hitPower - blockPower : 0;
}
