const getMenuItems = async (restaurantId) => {
    let result = await (await fetch(`/api/restaurant/${restaurantId}/getMenuItems`)).json();
    return result.menuItems;
}

export default {
    getMenuItems,
}