const calculateItems = (items) => {
    return items.reduce((total, item) => {
        const quantity = Number(item.quantity);
        
        // Verifica se quantity è un numero valido
        if (!isNaN(quantity)) {
            total += quantity;
        } else {
            console.log('Invalid data for item:', item); // Log per identificare eventuali errori
        }

        return total;
    }, 0);
};


export default calculateItems;

