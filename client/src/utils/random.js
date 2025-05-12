export function createSeededRandomGenerator(seedString) {
    // Преобразуем строку в начальный seed
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
        const char = seedString.charCodeAt(i);
        seed = (seed << 5) - seed + char;
        seed |= 0; // Обеспечиваем 32-битное целое число
    }

    // Линейный конгруэнтный генератор (LCG)
    const next = () => {
        seed = (1664525 * seed + 1013904223) >>> 0; // Обновляем seed
        return (seed & 0x7FFFFFFF) / 2147483647; // Нормализуем в [0, 1)
    };

    // Возвращает число от 0 до 100
    return {
        nextInt: () => Math.floor(next() * 101), // 0-100
        nextFloat: next,                         // 0-1
        reset: () => {                           // Сброс seed
            seed = 0;
            for (let i = 0; i < seedString.length; i++) {
                const char = seedString.charCodeAt(i);
                seed = (seed << 5) - seed + char;
                seed |= 0;
            }
        },
        // Насыщенность (S) – от 60% до 100% (чтобы цвет не был блёклым)
        nextSaturation: () => 60 + Math.floor(next() * 41), // 60-100%

        // Светлота (L) – от 50% до 90% (чтобы не слишком темно и не выбелено)
        nextLightness: () => 50 + Math.floor(next() * 41), // 50-90%

        // Получить HSL-цвет с фиксированным hue (оттенком)
        nextHslColor: (hue = 271) => {
            const s = 60 + Math.floor(next() * 41); // S: 60-100%
            const l = 50 + Math.floor(next() * 41); // L: 50-90%
            return `hsl(${hue}, ${s}%, ${l}%)`;
        },
    };
}