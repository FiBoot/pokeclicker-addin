'use strict';

const COLORS = {
	WHITE: '#FFF',
	GREEN: '#3F1',
	ORANGE: '#F81',
	RED: '#F31',
};
const TIMESPANS = [1, 2, 4, 5, 8, 10];
const DEFAULT_TIMESPAN = TIMESPANS[1];
const POKEMON_RANKING = [
	490, 130, 489, 289, 787, 786, 746.02, 785, 746.01, 788, 518, 454, 36, 103.01, 631, 673, 103, 465, 719, 59, 781, 40,
	780, 760, 779, 618, 770, 738.01, 468, 26.01, 26, 463, 430, 555.1, 765, 693, 777.01, 556, 589, 143.1, 143, 775, 336,
	727, 614, 324, 233, 217, 776, 701, 89.01, 89, 131, 724, 626, 777, 423.1, 460, 423, 199, 80, 234, 768, 750, 224, 646.2,
	646.1, 741.03, 741.02, 741.01, 741, 342, 350, 500, 766, 479.5, 479.4, 479.3, 479.2, 479.1, 561, 745.01, 591, 469, 730,
	467, 628, 606, 416, 455, 778.01, 740, 260, 126, 115, 466, 526, 567, 683, 332, 232, 203, 754.01, 503, 493, 384, 604,
	738, 717, 716, 184, 715, 530, 437, 55, 707, 699, 792, 791, 754, 323, 229, 448, 335, 365, 257, 357, 676.09, 676.08,
	676.06, 676.05, 676.04, 676.03, 676, 531, 621, 516, 514, 512, 340, 450, 395, 668, 774.07, 774.06, 774.05, 774.04,
	774.03, 774.02, 774.01, 473, 389, 644, 643, 483, 675, 709, 691, 538, 464, 405, 241, 646, 359, 127, 125, 745.02, 733,
	685, 435, 206, 745, 150.1, 687, 367, 637, 338, 337, 474, 617, 419, 407, 368, 123, 275, 487, 735.01, 286, 593, 558,
	317, 112, 110, 652, 584, 579, 214, 537, 181, 160, 352, 128, 630, 362, 210, 73, 484, 250, 230, 523, 297, 164, 169, 248,
	615, 713, 689, 598, 442, 221, 97, 78, 38, 735, 573, 150, 485, 625, 121, 462, 392, 134, 383, 382, 284, 42, 171, 87,
	6.1, 534, 157, 68, 6, 314, 313, 76.01, 76, 784.01, 723, 560, 3.1, 3, 542, 426, 295, 581, 569, 211, 620, 671.04,
	671.03, 671.02, 671.01, 9.1, 671, 9, 149, 38.01, 486, 697, 553, 71, 632, 114, 373, 623, 571, 334, 192, 409, 62, 358,
	778, 244, 272, 565, 45, 31, 586.03, 586.02, 586.01, 586, 549, 452, 195, 417, 348, 346, 154, 146, 34, 521, 319, 310,
	119, 635, 729, 330, 186, 212, 764, 137, 758.01, 476, 205, 91, 658, 655, 376, 226, 136, 142, 596, 178, 539, 441, 700,
	445, 752.01, 752, 288, 478, 472, 344, 702, 508, 481, 262, 168, 182, 176, 424, 145, 35, 254, 22, 706, 758, 499, 461,
	321, 663, 222, 108, 726, 413, 277, 18, 475, 282, 482, 587, 198, 400, 398, 354, 249, 326, 49, 144, 784, 351.3, 351.2,
	351.1, 351, 479.6, 749, 479, 243, 800, 600, 647.1, 647, 639, 497, 505, 245, 695, 555, 502, 457, 82, 57, 24, 139, 208,
	200, 124, 547, 421, 364, 85, 763, 609, 315, 369, 327, 525, 601, 471, 711, 510, 721, 720, 640, 638, 603, 99, 28, 660,
	77, 645, 414, 774, 428, 737, 162, 185, 227, 801, 197, 678, 432, 388, 264, 429, 193, 141, 256, 67, 550.01, 550, 20.02,
	528, 402, 47, 251.1, 494, 492, 385, 251, 151, 759, 594, 196, 545, 576, 648, 394, 279, 259, 219, 94, 311, 207, 83, 563,
	492.1, 379, 117, 70, 718, 649, 303, 20.01, 748, 743, 680, 44, 470, 453, 291, 105.02, 533, 769, 703, 105.01, 802, 159,
	105, 682, 672, 301, 135, 648.1, 381, 771, 413.2, 391, 101, 20, 237, 107, 446.1, 446, 480, 642, 641, 53.01, 2.1, 566,
	53, 2, 75.01, 75, 667, 331, 312, 215, 122, 106, 413.1, 807, 654, 773, 722, 605, 202, 58, 302, 8.1, 756, 651, 8, 488,
	378, 377, 662, 728, 692, 629, 772, 517, 541, 5.1, 491, 380, 156, 153, 5, 320, 559, 477, 421.1, 583, 536, 294, 267,
	88.01, 459, 88, 666.19, 666.18, 666.17, 666.16, 666.15, 666.14, 666.13, 666.12, 666.11, 666.1, 666.09, 666.08, 666.07,
	666.06, 666.05, 666.04, 666.03, 666.02, 666.01, 666, 612, 627, 240, 216, 65, 28.01, 698, 496, 308, 180, 677, 657, 520,
	507, 274, 253, 422.1, 684, 422, 306, 674, 578, 575, 527, 341, 231, 79, 25.06, 25.05, 25.04, 25.03, 25.02, 25.01, 39,
	25, 705, 725, 366, 404, 356, 690, 111, 736, 588, 386, 30, 387, 322, 239, 190, 681, 271, 17, 189, 93, 33, 613, 592,
	590, 427, 109, 43, 732, 411, 12, 634, 696, 608, 564, 61, 739, 501, 393, 228, 15, 619, 585.03, 585.02, 585.01, 650,
	624, 585, 498, 418, 258, 255, 102, 86, 69, 54, 247, 804, 372, 540, 710, 434, 209, 170, 66, 670.04, 670.03, 670.02,
	670.01, 51.01, 670, 345, 636, 166, 285, 425, 148, 1.3, 1.2, 1.1, 225, 158, 96, 1, 51, 305, 708, 529, 456, 328, 616,
	287, 397, 595, 515, 513, 511, 363, 152, 48, 29, 572, 552, 269, 386.3, 570, 7.1, 757, 679, 568, 390, 316, 177, 7,
	386.1, 783, 375, 544, 532, 104, 449, 747, 656, 580, 557, 361, 325, 318, 444, 386.2, 408, 329, 74.01, 74, 712, 582,
	299, 118, 611, 347, 622, 4.1, 653, 599, 179, 155, 4, 64, 201.25, 201.24, 201.23, 201.22, 201.21, 201.2, 201.19,
	201.18, 201.18, 201.17, 201.17, 201.16, 201.15, 201.14, 201.14, 201.13, 201.12, 201.11, 201.1, 201.09, 201.08, 201.08,
	201.07, 201.06, 201.05, 201.04, 201.03, 201.03, 201.02, 201.02, 201.01, 201, 661, 524, 669.04, 669.03, 669.02, 669.01,
	669, 577, 535, 495, 252, 223, 204, 132, 120, 138, 353, 140, 688, 686, 431, 339, 72, 46, 744, 519, 25.11, 25.09, 25.08,
	25.1, 755, 551, 548, 522, 333, 309, 399, 174, 173, 188, 607, 554, 451, 81, 56, 751, 504, 300, 167, 742, 694, 458, 433,
	420, 84, 133.1, 304, 133, 734, 506, 37.01, 574, 100, 37, 32, 175.2, 175.1, 163, 406, 509, 403, 343, 238, 90, 23, 283,
	803, 597, 370, 218, 92, 60, 27, 753, 602, 293, 116, 98, 731, 21, 183, 95, 52, 633, 443, 276, 16, 562, 246, 175, 52.01,
	447, 360, 410, 242, 704, 610, 147, 762, 396, 290, 41, 436, 307, 220, 782, 371, 438, 543, 161, 546, 296, 659, 261, 165,
	281, 278, 27.01, 439, 19.01, 273, 270, 263, 19, 374, 714, 187, 412, 298, 63, 172, 415, 194, 664, 265, 355, 761, 236,
	412.2, 412.1, 235, 401, 13, 10, 268, 266, 665, 280, 129, 14, 113, 11, 746, 50.01, 767, 191, 790, 50, 213, 349, 292,
	789, 440,
];
let dockShortcutAdded = false;
let autoClickerActivated = false;
let clickerInterval;

function log(message) {
	const date = new Date();
	const formatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	const formatTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	const logStyle = `color: ${COLORS.ORANGE}; font-weight: bold;`;
	console.log(`[${formatDate} ${formatTime}] ` + `%cAutoClicker: ${message}.`, logStyle);
}

function triggerAutoClick(event, timespan) {
	autoClickerActivated = !autoClickerActivated;
	event.srcElement.style.color = autoClickerActivated ? COLORS.GREEN : COLORS.WHITE;
	clearInterval(clickerInterval);
	log(autoClickerActivated ? `started at ${1000 / timespan} click/sec` : `stopped`);
	if (autoClickerActivated) {
		clickerInterval = setInterval(() => autoClick(event), timespan);
	}
}

function autoClick(event) {
	try {
		document.querySelector('img.enemy').click();
	} catch (error) {
		// log(`error: ${error.message}`);
		// triggerAutoClick(event);
	}
}

function setPokemonRank(node, rank) {
	const span = node.querySelector('span');
	const matches = /^([\w() \-]+)( #)?/.exec(span.innerHTML);
	if (matches && matches.length > 1) {
		span.innerHTML = `${matches[1]} <b style="color: ${COLORS.GREEN}">#${rank}</b>`;
	}
}

function addDockShortcut() {
	if (dockShortcutAdded) return;
	const dockBtn = document.createElement('button');
	dockBtn.innerHTML = 'Dock';
	dockBtn.classList = 'btn btn-block btn-primary m-0';
	dockBtn.onclick = (event) => {
		document.querySelector('[data-town=Dock]').dispatchEvent(new Event('click'));
	};
	const tr = document.createElement('tr');
	const td = document.createElement('td');
	td.className = 'p-0';
	td.append(dockBtn);
	tr.append(td);
	document.querySelector('#shortcutsBody > table > tbody').append(tr);
	dockShortcutAdded = true;
}

function setUpRanking(event) {
	const nodes = document.querySelectorAll('#breeding-pokemon li');

	for (const node of nodes) {
		const src = node.querySelector('img').src;
		const matches = /\/(\d+(.\d+)?)\.png$/.exec(src);

		const pokemonNumber = matches && matches.length > 1 ? parseInt(matches[1]) : 0;
		const pokemonRank = POKEMON_RANKING.indexOf(pokemonNumber) + 1;

		if (pokemonRank > 0) {
			setPokemonRank(node, pokemonRank);
		}
	}

	if (nodes.length) {
		event.srcElement.innerHTML = nodes.length;
		event.srcElement.style.color = COLORS.GREEN;
		setTimeout(() => {
			event.srcElement.innerHTML = 'Rank';
			event.srcElement.style.color = COLORS.WHITE;
		}, 1000 * 5); // 5sec
		log(`${nodes.length} ranks successfully added`);
	} else {
		event.srcElement.style.color = COLORS.RED;
		log(`Can't find list -> Open Hatchery List once first !`);
	}
}

function main() {
	const timespan = TIMESPANS.includes(TIMESPAN) ? TIMESPAN : DEFAULT_TIMESPAN;

	// MAIN DIV
	const mainDiv = document.createElement('div');
	mainDiv.style.cssText = `
        position: absolute;
        top: 0;
        right: 180px;
	`;
	document.body.appendChild(mainDiv);

	// RANK BTN
	const rankBtn = document.createElement('button');
	rankBtn.innerHTML = 'Rank';
	rankBtn.style.cssText = `
		margin-right: 6px;
        padding: 6px 16px;
        border: none;
        border-radius: 6px;
        background-color: #555;
        font-family: pokemonFont,"Helvetica Neue",sans-serif;
        font-size: 16px;
        color: #FFF;
	`;
	rankBtn.onclick = (event) => {
		addDockShortcut();
		setUpRanking(event);
	};
	mainDiv.append(rankBtn);

	// AUTO BTN
	const autoBtn = document.createElement('button');
	autoBtn.innerHTML = 'Auto';
	autoBtn.style.cssText = `
		margin-right: 6px;
        padding: 6px 16px;
        border: none;
        border-radius: 6px;
        background-color: #555;
        font-family: pokemonFont,"Helvetica Neue",sans-serif;
        font-size: 16px;
        color: #FFF;
	`;
	autoBtn.onclick = (event) => triggerAutoClick(event, timespan);
	mainDiv.append(autoBtn);

	log(`component added (timespan: ${timespan})`);
}
