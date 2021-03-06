var products = [] // create an empty array of products
var category = [] // create an empty array of categories
const ids = [] // selected id

var total = 0 // total of products price


//** Format Money To Currency */
const formatMoney = (money) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'EUR',
	}).format(money);
};


//** Create row, table of products */
function tableRow(product) {
	return `<tr for="check_${product._id}" id="product_${product._id}">
    <th class="me-3 text-center">
      <input type="checkbox" id="check_${product._id}">
      <input type="hidden" value="${product._id}">
    </th>
    <th>${product.product}</th>
    <td>${product.time}</td> 
    <td>${formatMoney(product.price)}</td>
  </tr>`;
}

//** Construct the products align to the category */
function categoryTableConstruct(category) {
	return `<tr id="${category.cod}" class="table-secondary"><td colspan="5"><h4>${category.name}</h4></td></tr>`;
}

//** Construct de dropdown category */
function categoryDropDown(category) {
	return `<option value="${category.cod}">${category.name}</option>`;
}

//** When select a Category */
function chooseCategory(product) {
	$(`#${product.categoryCod}`).after(tableRow(product));
}

//** Sum Total of Products */
function sumTotal(id) {
	const product = products.find((product) => product._id == id);

	if (product) {
		total += product.price;
		$('#total').text(formatMoney(total));
	}
}

//** When remove a product */
function minusTotal(id) {
	const product = products.find((product) => product._id == id);

	if (product) {
		total -= product.price;
		$('#total').text(formatMoney(total));
	}
}

//** Format Total */
$('#total').text(formatMoney(total));


//** Get categoryes from endpoint /category */
$.ajax({
	url: 'https://barber-shop-carlos-api.herokuapp.com/api/category',
}).done((data) => {
	category = data.list;
	for (var i = 0; i < category.length; i++) {
		$('#categories').append(categoryDropDown(category[i]));
		$('#tbody-products').append(categoryTableConstruct(category[i]));
	}

	//** Get products from endpoint /products */
	$.ajax({
		url: 'https://barber-shop-carlos-api.herokuapp.com/api/products',
	}).done((data) => {
		products = data.list;

		//** choose the category and sum the total of products */
		for (var i = 0; i < products.length; i++) {
			chooseCategory(products[i]);
			$(`#check_${products[i]._id}`).change(function () {
				if ($(this).is(':checked')) {
					const id = $(this).next().val();

					ids.push(id)

					sumTotal(id);
					$(`#product_${id}`).addClass('table-success');
				} else {
					const id = $(this).next().val();

					minusTotal(id);
					$(`#product_${$(this).next().val()}`).removeClass('table-success');
				}
			});
		}
	});
});

//** Delete a product from the mongodb */
$('#delete').click(function (e) {
	e.preventDefault();
	ids.forEach(id => {
		$.ajax({
			url: `https://barber-shop-carlos-api.herokuapp.com/api/products/${id}`,
			type: 'DELETE',
			success: (res) => {
				window.location.reload();
			}
		})
	});
});
