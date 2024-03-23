class Order {
    constructor(userId) {
        this.userId = userId;
        this.timeOrder = Date.now();
        this.products = [];
    }
}

// const Order = (req, res) => {
//     const { userId, products } = req.body;
//     const timeOrders = Date.now();
// };

class OrderManager {
    constructor() {
        this.order = null;
    }
    //create a new order
    createOrder(userId) {
        this.order = new Order(userId);
        console.log("created order:::", this.order);
        return this.order;
    }

    //add order
    addProduct(product) {
        this.order.products.push(product);
    }
    //get Order
    getOrder() {
        return this.order;
    }
}

const orderManager = new OrderManager();
orderManager.createOrder("userId-10001");
orderManager.addProduct({
    productId: 101,
    quantity: 2,
    price: 33,
    unit: "USD",
});
console.log("order Info:::", orderManager.getOrder());
