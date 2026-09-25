///////////// ACCORDION - PANELS OPEN ONE AT A TIME ////////////////

function accordion() {
	const $headers = $(".header");

	$headers.click(function (element) {
		const $this = $(this);
		const $prev = $(this).prevAll(".header").slice(0, 1);
		const $prevRemove = $(this).prevAll(".header").slice(0, 0);
		const $accordion = $(this).closest(".accordion");
		const $contents = $accordion.find(".content");
		const currentIndex = $headers.index($this);

		// Check if this is the first panel
		if (currentIndex === 0) {
			openPanel();
			return;
		}

		// Check if the previous panel has the class "changes-ui-called"
		const $prevContent = $prev.next(".content");
		if ($prevContent.find(".slider").hasClass("changes-ui-called")) {
			openPanel();
		} else {
			closePanel();
		}

		function openPanel() {
			const $prevContent = $prev.next(".content");

			element.preventDefault();
			element.stopPropagation();

			$this.toggleClass("show-panel");
			$this.find(".fa-info-circle").toggleClass("toggle-info");

			$headers.not($this).removeClass("show-panel");
			$headers
				.not($this)
				.find(".fa-info-circle")
				.removeClass("toggle-info");

			$contents.not($this.next()).stop().slideUp(350);
			$this.next().stop().slideToggle(350);

			if ($prevContent.find(".slider").hasClass("changes-ui-called")) {
				$prev.find(".fa-check").addClass("checkmark");
			}

			// Toggle .hide-panel class on the next panel
			const $nextContent = $this.next(".content");
			const $nextHeaders = $nextContent.prev(".header");

			if (
				$nextHeaders.length > 0 &&
				$nextContent.find(".slider").hasClass("changes-ui-called")
			) {
				$nextContent.removeClass("hide-panel");
			}
		}

		function closePanel() {
			$this.removeClass("show-panel");
			$this.find(".fa-info-circle").removeClass("toggle-info");
			$this.next().stop().slideUp(350);

			if ($prevContent.find(".slider").hasClass("changes-ui-called")) {
				$prev.find(".fa-check").removeClass("checkmark");
			}
		}
	});
}

accordion();

//////////////////// slider - carousel rotating right and left /////////////////////////////////

// function rotate(a, b, c) {
//     var lastChild = $(a).clone();
//     $(c).removeClass("firstSlide");
//     $(a).remove();
//     $(b).prepend(lastChild);
//     $(lastChild).addClass("firstSlide");
// }

// function unrotate(a, b) {
//     var firstChild = $(a).clone();
//     $(firstChild).addClass("firstSlide");
//     $(firstChild).removeClass("firstSlide");
//     $(b).append(firstChild);
//     $(a).addClass("firstSlide");
//     $(a).remove();
// }

// //next - adding class specific for each carousel;

// $(".chevron-right-shape").click(function () {
//     rotate(".shape div:last-child", ".shape", ".shape div:first-child");
// });

// $(".chevron-right-weight").click(function () {
//     rotate(".carat div:last-child", ".carat", ".weight div:first-child");
// });

// $(".chevron-right-clarity").click(function () {
//     rotate(".clarity div:last-child", ".clarity", ".clarity div:first-child");
// });

// $(".chevron-right-color").click(function () {
//     rotate(".color div:last-child", ".color", ".color div:first-child");
// });

// $(".chevron-right-cut").click(function () {
//     rotate(".cut div:last-child", ".cut", ".cut div:first-child");
// });

// $(".chevron-left-shape").click(function () {
//     unrotate(".shape div:first-child", ".shape");
// });

// $(".chevron-left-weight").click(function () {
//     unrotate(".carat div:first-child", ".carat");
// });

// $(".chevron-left-clarity").click(function () {
//     unrotate(".clarity div:first-child", ".clarity");
// });

// $(".chevron-left-color").click(function () {
//     unrotate(".color div:first-child", ".color");
// });

// $(".chevron-left-cut").click(function () {
//     unrotate(".cut div:first-child", ".cut");
// });

function rotate(a, b, c) {
	var lastChild = $(a).clone();
	$(c).removeClass("firstSlide");
	$(a).remove();
	$(b).prepend(lastChild);
	$(lastChild).addClass("firstSlide");
}

function unrotate(a, b) {
	var firstChild = $(a).clone();
	$(firstChild).addClass("firstSlide");
	$(firstChild).removeClass("firstSlide");
	$(b).append(firstChild);
	$(a).addClass("firstSlide");
	$(a).remove();
}

//next - adding class specific for each carousel;

$(".chevron-right").click(function () {
	rotate(".shape div:last-child", ".shape", ".shape div:first-child");
});

$(".chevron-right").click(function () {
	rotate(".carat div:last-child", ".carat", ".weight div:first-child");
});

$(".chevron-right").click(function () {
	rotate(".clarity div:last-child", ".clarity", ".clarity div:first-child");
});

$(".chevron-right").click(function () {
	rotate(".color div:last-child", ".color", ".color div:first-child");
});

$(".chevron-right").click(function () {
	rotate(".cut div:last-child", ".cut", ".cut div:first-child");
});

$(".chevron-left").click(function () {
	unrotate(".shape div:first-child", ".shape");
});

$(".chevron-left").click(function () {
	unrotate(".carat div:first-child", ".carat");
});

$(".chevron-left").click(function () {
	unrotate(".clarity div:first-child", ".clarity");
});

$(".chevron-left").click(function () {
	unrotate(".color div:first-child", ".color");
});

$(".chevron-left").click(function () {
	unrotate(".cut div:first-child", ".cut");
});

$(".chevron-right").click(function () {
	$(".slider").addClass("rotate-left");
});

$(".chevron-left").click(function () {
	$(".slider").addClass("rotate-right");
});

$(".slider").on(
	"transitionend webkitTransitionEnd oTransitionEnd",
	function () {
		$(this).removeClass("rotate-left rotate-right");
	}
);

function shapeRendering(carat, clarity) {
	carat.forEach(function (itemWeight) {
		var box = document.querySelector(`.carat .${itemWeight.className}`);
		$(box).attr("data-id", `${itemWeight.dataId}`);
		$(box).attr("id", `${itemWeight.id}`);
		$(box).text(`${itemWeight.dataId}`);
	});

	/////// CLARITY ARRAY /////

	clarity.forEach(function (itemClarity) {
		var box = document.querySelector(`.clarity .${itemClarity.className}`);
		$(box).attr("data-id", `${itemClarity.dataId}`);
		$(box).attr("id", `${itemClarity.id}`);
		$(box).text(`${itemClarity.dataId}`);
	});
}

////////////// RESET BUTTON ////////

function resetClick() {
	$("#clear-gem").click(function () {
		$(".accordion").reset();
	});
}

resetClick();
