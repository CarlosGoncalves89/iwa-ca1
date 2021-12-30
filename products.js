$('#submit').click(function () {
  //** Select the dropdown value */
	const categoryCod = $('#categories option:selected').val();

  //** Select the product name */
	const product = $('#product').val();

  //** Select the time of work value */
	const time = $('#time').val();

  //** Select the price of product */
	const price = $('#price').val();


  //** Sanitize values */
	const data = { categoryCod: Number(categoryCod), product: product.trim(), time: time.trim(), price: Number(price) }


  //** Create a product on the JSON */
	$.ajax({
		url: '/product',
		type: 'POST',
		contentType: 'application/json;charset=utf-8',
		dataType: 'json',
		data: JSON.stringify(data),
		success: (res) => {
			console.log('res', res);
		}
	})
});
