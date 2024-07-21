let userIDBox = document.getElementById("userIDBox");
let pwdBox = document.getElementById("pwdBox");
let viewOrders = document.getElementById("viewOrders");
let orderResult = document.getElementById("orderResult");

viewOrders.onclick = function() {
    let user = userIDBox.value;
    let pwd = pwdBox.value;
    
    // Simulated fetch call to wworders.pl
    fetch(`wworders.pl?id=${user}&pwd=${pwd}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            buildOrderTable(json);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

function buildOrderTable(obj) {
    if (obj.status === "Orders Not Found") {
        orderResult.innerHTML = "No orders found for this user id and password";
    } else {
        let htmlCode = `
            <table>
                <caption>Order History for ${obj.username}</caption>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Cost</th>
                        <th>Items Ordered</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        obj.orderHistory.forEach(order => {
            htmlCode += `
                <tr>
                    <td>${order.orderDate}</td>
                    <td>${order.orderCost}</td>
                    <td>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            order.items.forEach(item => {
                htmlCode += `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.qty}</td>
                        <td>${item.price}</td>
                        <td>${item.total}</td>
                    </tr>
                `;
            });
            
            htmlCode += `
                        </tbody>
                    </table>
                </td>
            </tr>
            `;
        });
        
        htmlCode += `
                </tbody>
            </table>
        `;
        
        orderResult.innerHTML = htmlCode;
    }
}
