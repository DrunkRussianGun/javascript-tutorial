const cellEditingClass = "cell-editing";
const editInputClass = "edit-input";

const table = document.querySelector("table");
allowTableEditing(table);

function allowTableEditing(table) {
	const currentCellKey = Symbol("Current cell being edited");
	table.addEventListener(
		"focusout",
		() => {
			const cellEditing = table[currentCellKey];
			if (cellEditing)
				stopEditing(cellEditing);
			table[currentCellKey] = null;
		});
	table.addEventListener(
		"click",
		event => {
			const cellClicked = event.target.closest("td");
			if (!table.contains(cellClicked))
				return;

			const cellEditing = table[currentCellKey];
			if (cellEditing === cellClicked)
				return;
			if (cellEditing) {
				stopEditing(cellEditing);
				table[currentCellKey] = null;
			}

			table[currentCellKey] = cellClicked;
			startEditing(cellClicked);
		});
}

function startEditing(cell) {
	const input = createInput(cell);

	cell.innerHTML = "";
	cell.classList.add(cellEditingClass);
	cell.append(input);
	input.focus();
}

function createInput(cell) {
	const input = document.createElement("textarea");
	input.innerHTML = cell.innerHTML;
	input.className = editInputClass;
	input.style.width = cell.clientWidth + 'px';
	input.style.height = cell.clientHeight + 'px';

	return input;
}

function stopEditing(cell) {
	const input = cell.querySelector("textarea");
	input.remove();

	cell.classList.remove(cellEditingClass);
	cell.innerHTML = input.value;
}
