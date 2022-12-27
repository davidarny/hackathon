import { categories } from "../constants/categories";
import { childrens } from "../seed/childrens";
import { prizes } from "../seed/prizes";
import { Child } from "../types/Child";
import { Prize, PrizeType } from "../types/Prize";

interface OrderItem {
    giftID: number;
    childID: number;
}

const MAX_COST = 50_000;
let currentCost = 0;

const result: OrderItem[] = [];
const emptyCategories: PrizeType[] = [];

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getPrizesByCategories = () => {
    return prizes.reduce((result, { id, type, price }) => {
        result[type] = result[type] || [];

        result[type].push({
            id,
            price,
        });

        return result;
    }, {} as Record<PrizeType, Omit<Prize, "type">[]>);
};

// 1 - перебрать всех детей
// 2 - для каждого ребенка взять рандомную категорию по возрасту и полу
// 3 - взять рандомный подарок из полученной категории, если он там есть
// 3.1 - если в категории уже пусто - добавить ее в список исключений и выбрать другую
// 4 - записать связку ребенок - подарок в массив, к общей цене прибавить цену подарка
export const preparePrizes = () => {
    const prizesByCategories = getPrizesByCategories();
    for (let i = 0; i < childrens.length; i++) {
        const currentChild = childrens[i];

        const getRandomPrize = () => {
            const ageCategories = categories[currentChild.age][currentChild.gender].filter(
                (cat) => !emptyCategories.includes(cat)
            );
            const randomInt = randomIntFromInterval(0, ageCategories.length - 1);
            const randomCategory = ageCategories[randomInt];
            const randomPrizes = prizesByCategories[randomCategory].filter(
                (prize) => !result.find((item) => item.giftID === prize.id)
            );

            if (!randomPrizes.length) {
                emptyCategories.push(randomCategory);
                getRandomPrize();
            }

            const randomPrize = randomPrizes[randomIntFromInterval(0, randomPrizes.length - 1)];
            if (randomPrize) {
                if (currentCost + randomPrize.price < MAX_COST) {
                    currentCost += randomPrize.price;
                    result.push({
                        childID: currentChild.id,
                        giftID: randomPrize.id,
                    });
                }
            }
        };

        getRandomPrize();
    }

    return JSON.stringify(result);
};
