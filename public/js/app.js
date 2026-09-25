///////////// API - CONNECT ////////////////

function getGemData(data) {
	////////// INVOKING THE FUNCTION WITH LOGS - TEST /////////

	const shapePercentage = shapeRarity("Round", jsonData);
	console.log(
		" The average count of all objects with the shape Round is:",
		shapePercentage,
		"%"
	);

	const shapeCaratPercentage = shapeCaratRarity(
		"Round",
		"0.50-0.59",
		jsonData
	);
	console.log(
		" The average count of all objects with the shape Round and weight of 0.50-0.69 ct is:",
		shapeCaratPercentage,
		"%"
	);

	const shapeCaratClarityPercentage = shapeCaratClarityRarity(
		"Round",
		"0.30-0.39",
		"VS1",
		jsonData
	);
	console.log(
		" The average count of all objects with the shape Round and weight of 0.39-0.39 and clarity of VS1 ct is:",
		shapeCaratClarityPercentage,
		"%"
	);

	const shapeCaratClarityColorPercentage = shapeCaratClarityColorRarity(
		"Round",
		"1.50-1.99",
		"VS1",
		"H",
		jsonData
	);

	console.log(
		" The average count of all objects with the shape Round and weight of 1.50-1. and clarity of VS1 ct and color H is:",
		shapeCaratClarityColorPercentage,
		"%"
	);

	const shapeCaratClarityColorCutPercentage = shapeCaratClarityColorCutRarity(
		"Round",
		"0.30-0.39",
		"SI1",
		"G",
		"Very Good",
		jsonData
	);

	console.log(
		" The average count of all objects with the shape Round and weight of 0.39-0.39 and clarity of SI1 ct and color H, and cut Poor is:",
		shapeCaratClarityColorCutPercentage,
		"%"
	);

	const allShapedata = countAllShapes(jsonData);
	console.log(allShapedata);

	// console.log(jsonData);
	// console.log("DATA HAS BEEN CALLED");

	shapeSelect(jsonData);
	caratSelect(jsonData);
	claritySelect(jsonData);
	colorSelect(jsonData);
	cutSelect(jsonData);

	return jsonData;
}

getGemData(jsonData.data);

////////////// RARITY CALCULATIONS ////////

function rarityCalc(data) {
	return data.map((x) =>
		x.Count ? ((x.Count * 100) / sumTotal).toFixed(2) : 0
	);
}

function gemRarityAverage(data, key) {
	let total = 0;
	let Count = 0;

	let previousValue;
	for (let i = 0; i < data.length; i++) {
		if (i === 0 || data[i][key] === previousValue) {
			total += data[i].Count;
			Count++;
		} else {
			total = data[i].Count;
			Count = 1;
		}
		previousValue = data[i][key];
	}

	let averageTotal = ((total / Count) * 10).toFixed(1);

	return averageTotal;
}

function shapeRarity(shape, data) {
	const shapeCount = data
		.filter((d) => d.SHAPE_GROUP === shape)
		.map((d) => d.Count);

	const shapeSum = shapeCount.reduce((acc, val) => acc + val, 0);
	const totalCount = data
		.map((d) => d.Count)
		.reduce((acc, val) => acc + val, 0);

	const shapeAvg = ((shapeSum / totalCount) * 100).toFixed(1);

	return shapeAvg;
}

function shapeCaratRarity(shape, carat, data) {
	var filteredData = data.filter(function (item) {
		return item.CARAT_WEIGHT_GROUP === carat && item.SHAPE_GROUP === shape;
	});

	var sum = filteredData.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var totalCount = data.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var shapeCaratAvg = ((sum / totalCount) * 100).toFixed(1);

	return shapeCaratAvg;
}

///////// CLARITY AVERAGE ONLY ///////////

function shapeCaratClarityRarity(shape, carat, clarity, data) {
	var filteredData = data.filter(function (item) {
		return (
			item.SHAPE_GROUP === shape &&
			item.CARAT_WEIGHT_GROUP === carat &&
			item.CLARITY_GRADE === clarity
		);
	});

	var count = filteredData.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var totalCount = data.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var shapeCaratClarityAvg = ((count / totalCount) * 100).toFixed(2);

	return shapeCaratClarityAvg;
}

///////// COLOR AVERAGE ONLY ///////////

function shapeCaratClarityColorRarity(shape, carat, clarity, color, data) {
	var filteredData = data.filter(function (item) {
		return (
			item.SHAPE_GROUP === shape &&
			item.CARAT_WEIGHT_GROUP === carat &&
			item.CLARITY_GRADE === clarity &&
			item.COLOR_GRADE === color
		);
	});

	var count = filteredData.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var totalCount = data.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var shapeCaratClarityColorAvg = ((count / totalCount) * 100).toFixed(2);

	return shapeCaratClarityColorAvg;
}

///////// DIAMOND AVERAGE ///////////

function shapeCaratClarityColorCutRarity(
	shape,
	carat,
	clarity,
	color,
	cut,
	data
) {
	var filteredData = data.filter(function (item) {
		return (
			item.SHAPE_GROUP === shape &&
			item.CARAT_WEIGHT_GROUP === carat &&
			item.CLARITY_GRADE === clarity &&
			item.COLOR_GRADE === color &&
			item.CUT_GRADE === cut
		);
	});

	var count = filteredData.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var totalCount = data.reduce(function (accumulator, current) {
		return accumulator + current.Count;
	}, 0);

	var shapeCaratClarityColorAvg = ((count / totalCount) * 100).toFixed(2);

	return shapeCaratClarityColorAvg;
}

/////// GEM SPECIFIC DATA ///////

function caratRarity(carat, data) {
	const caratCount = data
		.filter((d) => d.CARAT_WEIGHT_GROUP === carat)
		.map((d) => d.Count);
	const caratSum = caratCount.reduce((acc, val) => acc + val, 0);
	const totalCount = data
		.map((d) => d.Count)
		.reduce((acc, val) => acc + val, 0);
	const caratAvg = ((caratSum / totalCount) * 100).toFixed(1);
	return caratAvg;
}

function clarityRarity(clarity, data) {
	const clarityCount = data
		.filter((d) => d.CLARITY_GRADE === clarity)
		.map((d) => d.Count);

	const claritySum = clarityCount.reduce((acc, val) => acc + val, 0);
	const totalCount = data
		.map((d) => d.Count)
		.reduce((acc, val) => acc + val, 0);

	const clarityAvg = ((claritySum / totalCount) * 100).toFixed(1);

	return clarityAvg;
}

function colorRarity(clarity, data) {
	const colorCount = data
		.filter((d) => d.COLOR_GRADE === clarity)
		.map((d) => d.Count);

	const colorSum = colorCount.reduce((acc, val) => acc + val, 0);
	const totalCount = data
		.map((d) => d.Count)
		.reduce((acc, val) => acc + val, 0);

	const colorAvg = ((colorSum / totalCount) * 100).toFixed(1);

	return colorAvg;
}

/////// CALCULATING RARITY RATIOS ///////

function calculatingRatios(shape, data) {
	data.forEach((obj, index) => {
		if (obj.SHAPE_GROUP === shape) {
			allShapeCount++;
		}
		totalCount++;

		if (index > 0 && (index + 1) % groupSize === 0) {
			totalCount++;
		}
	});

	const ratio = Math.floor(
		totalCount / (allShapeCount * groupSize + totalCount / groupSize)
	);

	Object.keys(shapeCounts).forEach((shapeType) => {
		const count = shapeCounts[shapeType];
		console.log(`Shape: ${shapeType}, Count: ${count}`);
	});

	const shapeCount = data.filter((obj) => obj.SHAPE_GROUP === shape).length;

	const shapeData = data.filter(
		(obj) => obj.SHAPE_GROUP !== undefined
	).length;

	return ratio;
}

function countAllShapes(data) {
	const shapeCounts = {};

	let totalCount = 0;

	data.forEach((obj) => {
		const shapeType = obj.SHAPE_GROUP;
		if (!shapeCounts[shapeType]) {
			shapeCounts[shapeType] = 1;
		} else {
			shapeCounts[shapeType]++;
		}
		totalCount++;
	});

	shapeCounts["all"] = totalCount;

	return shapeCounts;
}

/////// Calculate the common divisors //////////

function gcd(a, b) {
	let remainder;
	while (b !== 0) {
		remainder = a % b;
		a = b;
		b = remainder;
	}
	return a;
}

function calculateItemRatio(options, data) {
	let itemCount = 0;
	let totalCount = data.length;
	let otherItemCount = 0;

	// Merge the specified options with the default options
	const defaultOptions = {
		shape: undefined,
		carat: undefined,
		clarity: undefined,
		color: undefined,
		cut: undefined,
	};
	options = Object.assign(defaultOptions, options);

	// Loop through the data array to count the items
	data.forEach((obj) => {
		if (
			(options.shape === undefined ||
				obj.SHAPE_GROUP === options.shape) &&
			(options.carat === undefined || obj.CARAT === options.carat) &&
			(options.clarity === undefined ||
				obj.CLARITY === options.clarity) &&
			(options.color === undefined || obj.COLOR === options.color) &&
			(options.cut === undefined || obj.CUT === options.cut)
		) {
			itemCount++;
		} else {
			otherItemCount++;
		}
		totalCount++;
	});

	// Check for division by zero
	if (itemCount === 0) {
		return `<p style="font-size:16px; text-align:left; margin-top:-3px;line-height: 17.5px;">No data available</p>`;
	}

	// Calculate the ratio of the specified item type
	const numerator = Math.round((itemCount * 100) / otherItemCount);
	const itemNumerator = Math.ceil(numerator);
	const denominator = Math.round((itemCount * 100) / totalCount);
	const itemDenominator = Math.ceil(denominator);

	const itemRatio = itemNumerator / gcd(itemNumerator, itemDenominator);
	const ratio = itemDenominator / gcd(itemNumerator, itemDenominator);

	// Return the ratio as a formatted string
	return `${ratio} in ${itemRatio}`;
}

////////////////////// COLLECTING EVENT DATA /////////////////////////////////

let giaRarityData = {};

function logData() {
	let clickedElement = event.target;
	let elementId = clickedElement.parentNode.id;
	let elementValue = event.target.getAttribute("data-id");

	giaRarityData = $.extend(giaRarityData, { [elementId]: elementValue });

	console.log(giaRarityData);

	let giaRarityData_val = $.map(giaRarityData, function (value, key) {
		return value;
	});

	let giaRarityData_val_str = giaRarityData_val.join(", ");

	let giaRarityData_val_text = giaRarityData_val_str.replace(/"/g, "");

	$(".make-select").text(giaRarityData_val_text);
}

//////// UI - CLIENT SIDE CONNECTED DATA ///////

/// GLOBAL VARIABLES ///
let elementClicked = false;
let caratClicked = false;
let clarityClicked = false;
let colorClicked = false;
let cutClicked = false;
let lastClickedElementId;
let lastClickedCaratId;
let lastClickedClarityId;
let lastClickedColorId;
let lastClickedCutId;
let caratResult;
let clarityResult;
let clickedElement;
let colorResult;
let cutResult;
let options;
let result;
let selectedShape;
let selectedCarat;
let selectedClarity;
let selectedColor;
let selectedCut;

var gemSubHeading = document.querySelector(".main h2");
var rarityRatio = document.querySelector(".main .rare-data");
var roundElement = $(".shape [data-id='Round']");
var squareElement = $(".shape [data-id='Square']");

$(".clear-button").hide();

/// END ////

////////////// UI styles SELECTION CONTROL ////////

function changesUI(element, id) {
	console.log("changesUI invoked", element, id);
	$(element).parent().addClass("changes-ui-called");
	$(element).parent().removeClass("default-ui-called");
	let $header = $(element).closest(".content").prev(".header");
	$(element).css("border", "3px solid #3b84c2", id);
	$(element).css("background-color", "#F2FAFF", id);
	gemSubHeading.style.marginTop = "46.5px";
	$(".main h1").hide();
	$(".main .slidecontainer").css("opacity", "1");
	$header.find(".fa-info-circle").remove();
	$header.append(
		"<span class='gem-shape'>" + $(element).data("id") + "</span>"
	);
}

function defaultUI(element, id) {
	console.log("default invoked", element, id);
	$(element).parent().addClass("default-ui-called");
	$(element).parent().removeClass("changes-ui-called");
	$(element).closest(".content").prev(".header").find(".gem-shape").remove();
	$(element).css("border", "3px", id);
	$(element).css("border-style", "solid", id);
	$(element).css("border-color", "transparent", id);
	// $(".make-select").text("Make a selection");
	$(element)
		.closest(".content")
		.prev(".header")
		.find(".fa-check")
		.removeClass("checkmark");
	$(".main .slidecontainer").css("opacity", "0");
}

////////////// SHAPE //////////////

function shapeSelect(data) {
	$(".shape").on("click", ".box", function (event) {
		clickedElement = $(this);

		let id = clickedElement.attr("id");

		if (id === lastClickedElementId) {
			defaultUI(this, id);
			lastClickedElementId = null;
			selectedShape = null;
			gemSubHeading.innerHTML =
				"Start by selecting a dimension and value.";
			$(".main h1").show();
			gemSubHeading.style.marginTop = "20px";
		} else {
			if (lastClickedElementId) {
				defaultUI(
					document.querySelector(`#${lastClickedElementId}`),
					lastClickedElementId
				);
			}

			let shapeData = clickedElement.data("id");

			changesUI(this, id);

			switch (shapeData) {
				case "Round":
					selectedShape = "Round";
					elementClicked = true;
					result = shapeRarity("Round", data);
					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/round-only.png)",
						"background-size": "34px",
					});
					$(".clarity .box").css({
						background: "url(./img/round-only.png)",
						"background-size": "34px",
					});
					break;
				case "Square":
					selectedShape = "Square";
					elementClicked = true;
					console.log(elementClicked);
					result = shapeRarity("Square", data);
					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/square-only.png)",
						"background-size": "30px",
					});
					$(".clarity .box").css({
						background: "url(./img/square-only.png)",
						"background-size": "30px",
					});
					break;
				case "Heart":
					selectedShape = "Heart";
					elementClicked = true;
					result = shapeRarity("Heart", data);
					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/heart-only.png)",
						"background-size": "30px",
					});
					$(".clarity .box").css({
						background: "url(./img/heart-only.png)",
						"background-size": "30px",
					});
					break;
				case "Pear":
					selectedShape = "Pear";
					elementClicked = true;
					result = shapeRarity("Pear", data);
					break;
				case "Marquise":
					selectedShape = "Marquise";
					elementClicked = true;
					result = shapeRarity("Marquise", data);

					break;
				case "Cushion":
					selectedShape = "Cushion";
					elementClicked = true;
					result = shapeRarity("Cushion", data);
					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/cushion-only.png)",
						"background-size": "40px",
					});
					$(".clarity .box").css({
						background: "url(./img/cushion-only.png)",
						"background-size": "40px",
					});

					break;
				case "Oval":
					selectedShape = "Oval";
					elementClicked = true;
					result = shapeRarity("Oval", data);

					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/Oval.png)",
						"background-size": "45px",
					});
					$(".clarity .box").css({
						background: "url(./img/Oval.png",
						"background-size": "45px",
					});

					break;
				case "Rectangle":
					selectedShape = "Rectangle";
					elementClicked = true;
					result = shapeRarity("Rectangle", data);
					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/rectangle-only.png)",
						"background-size": "30px",
					});
					$(".clarity .box").css({
						background: "url(./img/rectangle-only.png)",
						"background-size": "30px",
					});

					break;
				case "Emerald":
					selectedShape = "Emerald";
					elementClicked = true;
					result = shapeRarity("Emerald", data);
					shapeRendering(carat, clarity);
					$(".carat .box").css({
						background: "url(./img/emerald-only.png)",
						"background-size": "40px",
					});
					$(".clarity .box").css({
						background: "url(./img/emerald-only.png)",
						"background-size": "40px",
					});

					break;
				default:
					elementClicked = false;
					defaultUI(this, id);
			}
			logData();
			gemSubHeading.innerHTML = `<b>${result}%</b> of diamonds graded by <br><b>GIA</b> are ${selectedShape} `;
			lastClickedElementId = id;
			options = { shape: selectedShape };
			rarityRatio.innerHTML = calculateItemRatio(options, data);
		}
	});
}

////////////// CARAT //////////////

function caratSelect(data) {
	$(".carat").on("click", ".box", function (event) {
		clickedElement = $(this);

		$(".clear-button").show();

		let id = clickedElement.attr("id");

		console.log("before", clickedElement);

		if (id === lastClickedCaratId) {
			defaultUI(this, id);
			lastClickedCaratId = null;
			selectedCarat = null;

			$(".clear-button").hide();

			console.log("hide button");

			gemSubHeading.innerHTML = `<b>${result}%</b> of diamonds graded by <br><b>GIA</b> are ${selectedShape} `;
		} else {
			if (lastClickedCaratId) {
				defaultUI(
					document.querySelector(`#${lastClickedCaratId}`),
					lastClickedCaratId
				);
			}
			let caratData = clickedElement.attr("id");

			changesUI(this, id);

			switch (caratData) {
				case "carat1-030-039":
					selectedCarat = "0.30-0.39";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);

					break;
				case "carat1-040-049":
					selectedCarat = "0.40-0.49";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						"0.40-0.49",
						data
					);

					break;
				case "carat-150-199":
					selectedCarat = "1.50-1.99";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);

					break;
				case "carat1-050-069":
					selectedCarat = "0.50-0.69";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);
					break;
				case "carat-100-149":
					selectedCarat = "1.00-1.49";
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);
					caratClicked = true;
					break;

				case "carat2-030-039":
					selectedCarat = "0.30-0.39";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);

					break;
				case "carat2-040-049":
					selectedCarat = "0.40-0.49";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);

					break;

				case "carat2-050-069":
					selectedCarat = "0.50-0.69";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);

					break;

				case "carat-200":
					selectedCarat = "200";
					caratClicked = true;
					caratResult = shapeCaratRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						data
					);

					break;
				default:
					caratClicked = false;
					console.log("after", clickedElement);
					defaultUI(this, id);
			}
			logData();
			lastClickedCaratId = id;
			options = { carat: selectedCarat };
			rarityRatio.innerHTML = calculateItemRatio(options, data);
			gemSubHeading.innerHTML = `<b>${caratResult}%</b> of  ${selectedShape}, ${selectedCarat}ct <br>diamonds graded by <b>GIA</b> fall into this range`;
		}
	});
}

////////////// CLARITY //////////////

function claritySelect(data) {
	$(".clarity").on("click", ".box", function (event) {
		clickedElement = $(this);

		let id = clickedElement.attr("id");

		if (id === lastClickedClarityId) {
			defaultUI(this, id);
			lastClickedClarityId = null;
			selectedClarity = null;
			gemSubHeading.innerHTML = `<b>${caratResult}%</b> of  ${selectedShape}, ${selectedCarat}ct <br>diamonds graded by <b>GIA</b> fall into this range`;
		} else {
			if (lastClickedClarityId) {
				defaultUI(
					document.querySelector(`#${lastClickedClarityId}`),
					lastClickedClarityId
				);
			}
			let clarityData = clickedElement.data("id");

			console.log(`${selectedShape}`, `${selectedCarat}`);

			changesUI(this, id);

			switch (clarityData) {
				case "VS1":
					selectedClarity = "VS1";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);

					break;
				case "VS2":
					selectedClarity = "VS2";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);

					break;
				case "SI1":
					selectedClarity = "SI1";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);

					break;
				case "SI2":
					selectedClarity = "SI2";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);

					break;
				case "I1":
					selectedClarity = "I1";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);
					break;
				case "I2":
					selectedClarity = "I2";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);
					break;
				case "I3":
					selectedClarity = "I3";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);

					break;
				case "FL":
					selectedClarity = "FL";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);
					break;
				case "IF":
					selectedClarity = "IF";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);
					break;
				case "VVS1":
					selectedClarity = "VVS1";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						"VVS1",
						data
					);
					break;
				case "VVS2":
					selectedClarity = "VVS2";
					clarityClicked = true;
					clarityResult = shapeCaratClarityRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						data
					);

					break;
				default:
					clarityClicked = false;
					defaultUI(this, id);
			}
			lastClickedClarityId = id;
			gemSubHeading.innerHTML = `<b>${clarityResult}%</b> of  ${selectedShape}, ${selectedCarat}ct, ${selectedClarity} <br>diamonds graded by <b>GIA</b> fall into this range`;
			logData();
			options = { clarity: selectedClarity };
			rarityRatio.innerHTML = calculateItemRatio(options, data);
		}
	});
}

////////////// COLOR //////////////

function colorSelect(data) {
	$(".color").on("click", ".box", function (event) {
		clickedElement = $(this);

		let id = $(this).attr("id");

		if (id === lastClickedColorId) {
			defaultUI(this, id);
			lastClickedColorId = null;
			selectedColor = null;
			gemSubHeading.innerHTML = `<b>${clarityResult}%</b> of  ${selectedShape}, ${selectedCarat}ct, ${selectedClarity} <br>diamonds graded by <b>GIA</b> fall into this range`;
		} else {
			if (lastClickedColorId) {
				defaultUI(
					document.querySelector(`#${lastClickedColorId}`),
					lastClickedColorId
				);
			}
			let colorData = clickedElement.data("id");

			changesUI(this, id);

			switch (colorData) {
				case "D":
					selectedColor = "D";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);
					break;
				case "E":
					selectedColor = "E";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "F":
					selectedColor = "F";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);
					break;
				case "G":
					selectedColor = "G";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);
					break;
				case "H":
					selectedColor = "H";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "I":
					selectedColor = "I";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "J":
					selectedColor = "J";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "M":
					selectedColor = "M";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "N":
					selectedColor = "N";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "O":
					selectedColor = "O";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				case "P":
					selectedColor = "P";
					colorClicked = true;
					colorResult = shapeCaratClarityColorRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						data
					);

					break;
				default:
					colorClicked = false;
					defaultUI(this, id);
			}

			lastClickedColorId = id;
			gemSubHeading.innerHTML = `<b>${colorResult}%</b> of  ${selectedShape}, ${selectedCarat}ct, ${selectedClarity}, ${selectedColor} <br>diamonds graded by <b>GIA</b> fall into this range`;
			logData();
		}
	});
}

////////////// CUT //////////////

function cutSelect(data) {
	$(".cut").on("click", ".box", function (event) {
		clickedElement = $(this);

		let id = clickedElement.attr("id");
		console.log("before", clickedElement);

		if (id === lastClickedCutId) {
			defaultUI(this, id);
			lastClickedCutId = null;
			selectedCut = null;
			gemSubHeading.innerHTML = `<b>${colorResult}%</b> of  ${selectedShape}, ${selectedCarat}ct, ${selectedClarity}, ${selectedColor} <br>diamonds graded by <b>GIA</b> fall into this range`;
		} else {
			if (lastClickedCutId) {
				defaultUI(
					document.querySelector(`#${lastClickedCutId}`),
					lastClickedCutId
				);
			}

			let cutData = clickedElement.attr("id");

			changesUI(this, id);

			switch (cutData) {
				case "Poor-1":
					selectedCut = "Poor";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Fair-1":
					selectedCut = "Fair";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Good-1":
					selectedCut = "Good";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Very-Good-2":
					selectedCut = "Very Good";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Excellent":
					selectedCut = "Excellent";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Very-Good-1":
					selectedCut = "Very Good";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;

				case "Good-2":
					selectedCut = "Good";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Fair-2":
					selectedCut = "Fair";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				case "Poor-2":
					selectedCut = "Poor";
					cutClicked = true;
					cutResult = shapeCaratClarityColorCutRarity(
						`${selectedShape}`,
						`${selectedCarat}`,
						`${selectedClarity}`,
						`${selectedColor}`,
						`${selectedCut}`,
						data
					);
					break;
				default:
					cutClicked = false;
					defaultUI(this, id);
			}
			lastClickedCutId = id;
			console.log("after", this);

			gemSubHeading.innerHTML = `<b>${cutResult}%</b> of  ${selectedShape}, ${selectedCarat}ct, ${selectedClarity}, ${selectedColor}, ${selectedCut}<br> diamonds graded by <b>GIA</b> fall into this range`;
			logData();
		}
	});
}
