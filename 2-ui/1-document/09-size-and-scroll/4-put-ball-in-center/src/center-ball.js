centerBall("field", "ball");

function centerBall(fieldId, ballId) {
	const field = document.getElementById(fieldId);
	if (!field)
		throw new Error(`Field with id "${fieldId}" was not found`);

	const ball = document.getElementById(ballId);
	if (!ball)
		throw new Error(`Ball with id "${ballId}" was not found`);

	const centeredBallPosition = getCenteredBallPosition(
		{width: field.clientWidth, height: field.clientHeight},
		{width: ball.offsetWidth, height: ball.offsetHeight});
	ball.style.left = centeredBallPosition.left + "px";
	ball.style.top = centeredBallPosition.top + "px";
}

function getCenteredBallPosition(fieldSize, ballSize) {
	const fieldCenter = getCenter(fieldSize);
	const ballLocalCenter = getCenter(ballSize);
	return {
		left: fieldCenter.left - ballLocalCenter.left,
		top: fieldCenter.top - ballLocalCenter.top
	};
}

function getCenter({width, height}) {
	return {
		left: width / 2,
		top: height / 2
	};
}
