function initSimulation() {
	$("#sortable").sortable({
        items: 'tr:not(tr:first-child)',
        axis: 'y',
        cursor: "grab",
        start: start,
        stop: stop,
    });
}

function start(event, ui) {
    $(".square-column").css("visibility", "hidden")
    $(".position-column").css("visibility", "hidden")
}

function stop(event, ui) {
    updateTable()
    handleGroup(selectedGroup, false)
    $(".square-column").css("visibility", "visible")
    $(".position-column").css("visibility", "visible")
    updateBracket()
}

function updateTable() {
	$("tr").each(function(index, tr) {
        if(index == 0) {
            return // skip header
        }
        let acronym = $(tr).attr("acronym")
        let team = selectedGroup["teams"].find(function(element) {
            return element["acronym"] == acronym
        })
        team["position"] = index
    })
}

function updateBracket() {
	switch(selectedGroup) {
		case a:
			let sourceFirstA = findSourceTeam(a, 1)
			let sourceSecondA = findSourceTeam(a, 2)
			let firstA = findDestinationTeam("1a")
			let secondA = findDestinationTeam("2a")
			updateTeam(sourceFirstA, firstA)
			updateTeam(sourceSecondA, secondA)
			break;
		case b:
			let sourceFirstB = findSourceTeam(b, 1)
			let sourceSecondB = findSourceTeam(b, 2)
			let firstB = findDestinationTeam("1b")
			let secondB = findDestinationTeam("2b")
			updateTeam(sourceFirstB, firstB)
			updateTeam(sourceSecondB, secondB)
			break;
		case c:
			let sourceFirstC = findSourceTeam(c, 1)
			let sourceSecondC = findSourceTeam(c, 2)
			let firstC = findDestinationTeam("1c")
			let secondC = findDestinationTeam("2c")
			updateTeam(sourceFirstC, firstC)
			updateTeam(sourceSecondC, secondC)
			break;
		case d:
			let sourceFirstD = findSourceTeam(d, 1)
			let sourceSecondD = findSourceTeam(d, 2)
			let firstD = findDestinationTeam("1d")
			let secondD = findDestinationTeam("2d")
			updateTeam(sourceFirstD, firstD)
			updateTeam(sourceSecondD, secondD)
			break;
		case e:
			let sourceFirstE = findSourceTeam(e, 1)
			let sourceSecondE = findSourceTeam(e, 2)
			let firstE = findDestinationTeam("1e")
			let secondE = findDestinationTeam("2e")
			updateTeam(sourceFirstE, firstE)
			updateTeam(sourceSecondE, secondE)
			break;
		case f:
			let sourceFirstF = findSourceTeam(f, 1)
			let sourceSecondF = findSourceTeam(f, 2)
			let firstF = findDestinationTeam("1f")
			let secondF = findDestinationTeam("2f")
			updateTeam(sourceFirstF, firstF)
			updateTeam(sourceSecondF, secondF)
			break;
		case g:
			let sourceFirstG = findSourceTeam(g, 1)
			let sourceSecondG = findSourceTeam(g, 2)
			let firstG = findDestinationTeam("1g")
			let secondG = findDestinationTeam("2g")
			updateTeam(sourceFirstG, firstG)
			updateTeam(sourceSecondG, secondG)
			break;
		case h:
			let sourceFirstH = findSourceTeam(h, 1)
			let sourceSecondH = findSourceTeam(h, 2)
			let firstH = findDestinationTeam("1h")
			let secondH = findDestinationTeam("2h")
			updateTeam(sourceFirstH, firstH)
			updateTeam(sourceSecondH, secondH)
			break;
	}
}

function findSourceTeam(group, position) {
	let teams = group["teams"]
	return teams.find(team => team["position"] == position)
}

function findDestinationTeam(id) {
	let matches = round16["matches"]
	let firstTeams = matches.flatMap(match => match["first_team"])
	let secondTeams = matches.flatMap(match => match["second_team"])
	return firstTeams.concat(secondTeams).find(team => team["source"] == id)
}

function updateTeam(source, destination) {
	destination["name"] = source["name"]
	destination["acronym"] = source["acronym"]
}
