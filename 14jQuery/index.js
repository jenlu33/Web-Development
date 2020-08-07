$(document).keydown((e) => {
  $("h1").html(e.key)
})

$("h1").on("mouseover", () => {
  $("h1").css("color", "purple")
})

$("button").on("click", () => {
  $("h1").slideUp().slideDown().animate({opacity: 0.5}) // animate can only add css with a numeric value
})