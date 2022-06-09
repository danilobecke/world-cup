let isFirstTimeSortingGroups = true
let isFirstTimeSortingBracket = true

// Sortable set up
function initSimulation() {
	$("#sortable").sortable({
        items: 'tr:not(tr:first-child)',
        axis: 'y',
        cursor: "grab",
        start: start,
        stop: stop,
        disabled: true
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
	let sourceFirst
	let sourceSecond
	let destinationFirst
	let destinationSecond
	switch(selectedGroup) {
		case a:
			sourceFirst = findSourceTeam(a, 1)
			sourceSecond = findSourceTeam(a, 2)
			destinationFirst = findDestinationTeam("1a")
			destinationSecond = findDestinationTeam("2a")
			break;
		case b:
			sourceFirst = findSourceTeam(b, 1)
			sourceSecond = findSourceTeam(b, 2)
			destinationFirst = findDestinationTeam("1b")
			destinationSecond = findDestinationTeam("2b")
			break;
		case c:
			sourceFirst = findSourceTeam(c, 1)
			sourceSecond = findSourceTeam(c, 2)
			destinationFirst = findDestinationTeam("1c")
			destinationSecond = findDestinationTeam("2c")
			break;
		case d:
			sourceFirst = findSourceTeam(d, 1)
			sourceSecond = findSourceTeam(d, 2)
			destinationFirst = findDestinationTeam("1d")
			destinationSecond = findDestinationTeam("2d")
			break;
		case e:
			sourceFirst = findSourceTeam(e, 1)
			sourceSecond = findSourceTeam(e, 2)
			destinationFirst = findDestinationTeam("1e")
			destinationSecond = findDestinationTeam("2e")
			break;
		case f:
			sourceFirst = findSourceTeam(f, 1)
			sourceSecond = findSourceTeam(f, 2)
			destinationFirst = findDestinationTeam("1f")
			destinationSecond = findDestinationTeam("2f")
			break;
		case g:
			sourceFirst = findSourceTeam(g, 1)
			sourceSecond = findSourceTeam(g, 2)
			destinationFirst = findDestinationTeam("1g")
			destinationSecond = findDestinationTeam("2g")
			break;
		case h:
			sourceFirst = findSourceTeam(h, 1)
			sourceSecond = findSourceTeam(h, 2)
			destinationFirst = findDestinationTeam("1h")
			destinationSecond = findDestinationTeam("2h")
			break;
	}
	let nextStageAndRenderActionTuples = [
		{"stage": quarters, "action": null},
		{"stage": semi, "action": null},
		{"stage": final, "action": null}
	]
	if(sourceFirst["acronym"] != destinationFirst["acronym"]) {
		removeTeam(destinationFirst["acronym"], nextStageAndRenderActionTuples)
		destinationFirst["winner"] = false
	}
	if(sourceSecond["acronym"] != destinationSecond["acronym"]) {
		removeTeam(destinationSecond["acronym"], nextStageAndRenderActionTuples)
		destinationSecond["winner"] = false
	}
	updateTeam(sourceFirst, destinationFirst)
	updateTeam(sourceSecond, destinationSecond)
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

// Reset
function resetSimulationButton() {
	$(".edit").removeClass("active")
	$("#sortable").sortable("disable")
	$(".winner").attr("editing", false)
	renderBrackets()
}

function removeTeam(acronym, nextStageAndRenderActionTuples) {
	if(!acronym || acronym == "unknown") { return }
	nextStageAndRenderActionTuples.forEach(function(tuple) {
		let matches = tuple["stage"]["matches"]
		let isFirstTeam
		let match = matches.find(function(current) {
			let firstTeam = current["first_team"]
			if(firstTeam) { 
				if(firstTeam["acronym"] == acronym) { 
					isFirstTeam = true
					return true 
				}
			}
			let secondTeam = current["second_team"]
			if(secondTeam) {
				if(secondTeam["acronym"] == acronym) { 
					isFirstTeam = false
					return true 
				}	
			}
			return false
		})
		if(match) {
			if(isFirstTeam) {
				match["first_team"] = null
			} else {
				match["second_team"] = null
			}
		}
		if(tuple["action"]) {
			tuple["action"]()
		}
	})
}

// Groups simulation
function toggleEditingGroup(evt) {
	if(isFirstTimeSortingGroups) {
		isFirstTimeSortingGroups = false
		window.alert("Arraste e reordene os times para simular as classificações finais.")
	}
    let target = $(evt.target)
    let wasActive = target.hasClass("active")
    target.toggleClass("active")
    let sortable = $("#sortable")
    if(wasActive) {
    	sortable.sortable("disable")
    } else {
    	sortable.sortable("enable")
    }
}

// Bracket simulation
function startEditing(evt, rawStage) {
	if(isFirstTimeSortingBracket) {
		window.alert("Selecione ◀ para simular o vencedor da partida.")
		isFirstTimeSortingBracket = false
	}
    let target = $(evt.target)
    let wasActive = target.hasClass("active")
    target.toggleClass("active");

    switch(rawStage) {
        case 'round16':
            toggleEditing(!wasActive, extractCards("#round-16"), round16)
            break;
        case 'quarters':
            toggleEditing(!wasActive, extractCards("#quarters"), quarters)
            break;
        case 'semi':
            toggleEditing(!wasActive, extractCards("#semi"), semi)
            break;
        case 'final':
            toggleEditing(!wasActive, extractCards("#final"), final)
            break;
    }
}

function toggleEditing(isEditing, cards, stage) {
    $(cards).each(function(index, card) {
    	$(card).children().each(function(index, child){
    		if(index == 0) { return } // Date row
    		let acronym = $(child).attr("acronym")
    		let visibility
    		if(!acronym || acronym == "unknown") { 
    			visibility = isEditing ? "visible" : "hidden"
    		} else {
    			let team = findTeam(stage, acronym)
    			visibility = team["winner"] ? "visible" : (isEditing ? "visible" : "hidden")
    		}
    		let winner = $(child).find(".winner");
    		$(winner).css({"visibility": visibility})
            $(winner).attr("editing", isEditing);
    	})
    })
}

function selectWinner(evt, rawStage) {
    let target = $(evt.target)
    let teamRow = target.parent().parent()
    let acronym = teamRow.attr("acronym")
    if(acronym == "unknown") {
    	return // empty team, do nothing
    }
    let cardRow = teamRow.parent()
    let team;
    let cardIndex;
    let currentStage;
    let nextStage;
    let renderAction;
    let nextStageAndRenderActionTuples;
    switch(rawStage) {
        case 'round-16':
        	team = findTeam(round16, acronym)
        	cardIndex = indexOf(cardRow, "#round-16")
        	currentStage = round16
        	nextStage = quarters
        	renderAction = renderQuarters
        	nextStageAndRenderActionTuples = [
        		{"stage": semi, "action": renderSemi},
        		{"stage": final, "action": renderFinal},
        	]
            break;
        case 'quarters':
			team = findTeam(quarters, acronym)
        	cardIndex = indexOf(cardRow, "#quarters")
        	currentStage = quarters
        	nextStage = semi
        	renderAction = renderSemi
        	nextStageAndRenderActionTuples = [
        		{"stage": final, "action": renderFinal},
        	]
            break;
        case 'semi':
        	team = findTeam(semi, acronym)
        	cardIndex = indexOf(cardRow, "#semi")
        	currentStage = semi
        	nextStage = final
        	renderAction = renderFinal
        	nextStageAndRenderActionTuples = []
            break;
        case 'final':
        	team = findTeam(final, acronym)
        	cardIndex = indexOf(cardRow, "#final")
        	currentStage = final
        	nextStage = null
        	resetSimulationButton()
        	renderAction = renderBrackets
        	nextStageAndRenderActionTuples = []
            break;
    }
    team["winner"] = true
    moveToNextStage(team, cardIndex, nextStage)
    cardRow.children().each(function(index, row) {
    	if(index == 0) { return } // Skip date
    	if($(row).attr("acronym") == acronym) {
    		return // skip selected team
    	} else {
    		let otherAcronym = $(row).attr("acronym")
    		if(!otherAcronym || otherAcronym == "unknown") { return }
    		let otherTeam = findTeam(currentStage, otherAcronym)
    		let wasSelected = otherTeam["winner"]
    		otherTeam["winner"] = false
    		if(wasSelected) {
    			removeTeam(otherAcronym, nextStageAndRenderActionTuples)
    		}
    	}
    })
    renderAction() 
}

function indexOf(cardRow, id) {
	return extractCards(id).index(cardRow)
}

function findTeam(stage, acronym) {
	let matches = stage["matches"]
	let firstTeams = matches.flatMap(match => match["first_team"])
	let secondTeams = matches.flatMap(match => match["second_team"])
	return firstTeams.concat(secondTeams).find(function(team) {
		if(!team) { return false }
		return team["acronym"] == acronym
	})
}

function moveToNextStage(team, cardIndex, nextStage) {
	if(!nextStage) { return }
	let teamCopy = Object.assign({}, team);
	teamCopy["winner"] = false
	let index = Math.floor(cardIndex / 2)
	let match = nextStage["matches"][index]
	if(cardIndex % 2 == 0) {
		match["first_team"] = teamCopy
	} else {
		match["second_team"] = teamCopy
	}
}
